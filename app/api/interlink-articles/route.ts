import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import os from 'os'

class HTMLInterlinker {
  private keywordLinks: Record<string, string>
  private usedLinks: Set<string>
  private inLink: boolean

  constructor(keywordLinks: Record<string, string>) {
    this.keywordLinks = keywordLinks
    this.usedLinks = new Set()
    this.inLink = false
  }

  interlink(html: string): string {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    this.processNode(doc.body)
    return doc.body.innerHTML
  }

  private processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      this.processTextNode(node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      if (element.tagName.toLowerCase() !== 'a') {
        for (const childNode of Array.from(element.childNodes)) {
          this.processNode(childNode)
        }
      }
    }
  }

  private processTextNode(node: Node) {
    const text = node.textContent || ''
    const sortedKeywords = Object.keys(this.keywordLinks).sort((a, b) => b.length - a.length)
    
    let currentText = text
    for (const keyword of sortedKeywords) {
      if (!keyword.trim()) continue
      const link = this.keywordLinks[keyword]
      if (this.usedLinks.has(link)) continue

      const regex = new RegExp(`\\b${keyword.trim()}\\b`, 'i')
      if (regex.test(currentText)) {
        const newNode = document.createElement('a')
        newNode.href = link
        newNode.textContent = keyword
        node.parentNode?.replaceChild(newNode, node)
        this.usedLinks.add(link)
        return
      }
    }
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const content = buffer.toString()

  const records = parse(content, { columns: true })

  // Collect all keywords and links
  const keywordLinks: Record<string, string> = {}
  for (const record of records) {
    const keywords = record.Keywords.split(',').map((k: string) => k.trim())
    const links = record.Links.split(',').map((l: string) => l.trim())
    
    if (keywords.length !== links.length) {
      console.warn('Warning: Mismatch in keywords and links count')
      continue
    }
    
    keywords.forEach((keyword: string, index: number) => {
      keywordLinks[keyword] = links[index]
    })
  }

  // Process each article
  const processedRecords = records.map((record: any) => {
    const interlinker = new HTMLInterlinker(keywordLinks)
    record['HTML Content'] = interlinker.interlink(record['HTML Content'])
    return record
  })

  // Convert processed records back to CSV
  const processedContent = stringify(processedRecords, { header: true })

  // Save processed content to a file
  const tempDir = await mkdir(path.join(os.tmpdir(), 'interlinked-articles'), { recursive: true })
  const outputFilename = `interlinked_articles_${Date.now()}.csv`
  const outputPath = path.join(tempDir, outputFilename)
  await writeFile(outputPath, processedContent)

  return NextResponse.json({ processedFile: outputFilename })
}

