import { DashboardLayout } from '@/components/DashboardLayout'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BulkURLChecker } from '@/components/BulkURLChecker'

export default function BulkURLCheckerPage() {
  return (
    <DashboardLayout>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bulk URL Status Checker Tool</CardTitle>
        </CardHeader>
      </Card>

      <BulkURLChecker />

      <Card className="mt-6">
        <CardContent>
          <h3 className="text-xl font-semibold mt-6 mb-2">What Does This Tool Do?</h3>
          <p>Managing website URLs can be time-consuming, especially if you have a large number to check. Our tool allows you to import a CSV file containing a list of URLs, and it quickly checks the status of each one in bulk. With just a few clicks, you can:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Identify which URLs are returning 200 OK (success).</li>
            <li>Spot those returning 404 Not Found (errors).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Why Is This Important?</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Save Time: Eliminate the need to check URLs one by one manually.</li>
            <li>Improve SEO: Ensure your website links are working and avoid dead links that harm user experience and SEO rankings.</li>
            <li>Optimize Maintenance: Quickly identify broken links and prioritize repairs.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">How It Works</h3>
          <ol className="list-decimal list-inside mb-4">
            <li>Upload Your File: Import your CSV file containing the URLs you want to check.</li>
            <li>Bulk Scan: Our tool processes all URLs and identifies their status codes.</li>
            <li>View Results: Download a detailed report or view results directly on our platform.</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-2">Who Can Benefit?</h3>
          <ul className="list-disc list-inside mb-4">
            <li>SEO Professionals: Keep your client's websites error-free.</li>
            <li>Web Developers: Ensure websites are clean and functional.</li>
            <li>Content Managers: Manage links effectively across your pages.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Key Features</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Fast, accurate bulk URL checking.</li>
            <li>Support for large CSV files.</li>
            <li>Exportable reports for easy sharing and tracking.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Get Started Today!</h3>
          <p>Upload your CSV file now and let our tool do the heavy lifting. Stay ahead with efficient website maintenance and improve your online presence!</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

