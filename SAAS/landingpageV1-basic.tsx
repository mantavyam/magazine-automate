import { Button } from "@/components/ui/button"
import { ArrowRight, Twitter } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">MAGDB</h1>
          <p className="text-2xl md:text-4xl font-semibold whitespace-pre-line">
            {"Your Files\nYour Design\nFaster than Ever"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold"
            onClick={() => {
              // Implement Google OAuth login here
              console.log("Initiating Google OAuth login")
            }}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold"
            asChild
          >
            <Link href="https://x.com/mantavyam" target="_blank" rel="noopener noreferrer">
              Follow Us
              <Twitter className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="text-center text-sm">
          <Link href="/terms" className="text-gray-400 hover:text-white mr-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
