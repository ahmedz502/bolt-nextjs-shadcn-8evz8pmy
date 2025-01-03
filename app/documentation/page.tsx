import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Documentation</h1>
      <Tabs defaultValue="getting-started">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="api-reference">API Reference</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
        </TabsList>
        <TabsContent value="getting-started">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Learn how to get started with ProgrammaticContent</CardDescription>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Sign up for an account</li>
                <li>Choose your plan</li>
                <li>Set up your first project</li>
                <li>Configure your content preferences</li>
                <li>Start generating content</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="api-reference">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Detailed information about our API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Available Endpoints</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>GET /api/content - Retrieve generated content</li>
                <li>POST /api/content - Generate new content</li>
                <li>GET /api/projects - List all projects</li>
                <li>POST /api/projects - Create a new project</li>
                <li>GET /api/stats - Retrieve usage statistics</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tutorials">
          <Card>
            <CardHeader>
              <CardTitle>Tutorials</CardTitle>
              <CardDescription>Step-by-step guides to help you make the most of ProgrammaticContent</CardDescription>
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Popular Tutorials</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Creating your first content generation project</li>
                <li>Optimizing your content for SEO</li>
                <li>Integrating ProgrammaticContent with your CMS</li>
                <li>Advanced techniques for content customization</li>
                <li>Analyzing and improving your content performance</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

