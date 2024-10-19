import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Menu, X, Check, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">MAGDB</Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">How It Works</Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md"
            >
              Log in
            </motion.button>
          </nav>
          <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <Link href="#features" className="text-2xl" onClick={() => setIsMenuOpen(false)}>Features</Link>
              <Link href="#how-it-works" className="text-2xl" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md"
              >
                Log in
              </motion.button>
            </div>
            <Button variant="ghost" className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">From Classroom to Canvas</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">Create Beautiful PDFs Faster than Ever!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-8 rounded-md inline-flex items-center"
              onClick={() => {
                console.log("Initiating Google OAuth login")
              }}
            >
              Get started for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </section>

        <section id="features" ref={ref} className="bg-gray-100 dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Revolutionize Your Workflow
            </motion.h2>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { title: "Lightning Fast", description: "Convert PPTX to PDF in seconds" },
                { title: "Beautiful Design", description: "Professionally styled templates" },
                { title: "Time-Saving", description: "Automate your document workflow" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              How It Works
            </motion.h2>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8"
            >
              {[
                { step: "1", title: "Upload", description: "Select your PPTX file from Google Drive" },
                { step: "2", title: "Customize", description: "Add YouTube videos and images to enhance your content" },
                { step: "3", title: "Generate", description: "Create a beautifully formatted PDF with WeasyPrint" },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center max-w-xs"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              className="bg-black dark:bg-white text-white dark:text-black p-12 rounded-lg text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Teaching?</h2>
              <p className="text-xl mb-8">Join thousands of educators already using MAGDB</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-black text-black dark:text-white font-bold py-3 px-8 rounded-md inline-flex items-center"
                onClick={() => {
                  console.log("Initiating Google OAuth login")
                }}
              >
                Get started now
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Stay Updated
            </motion.h2>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              className="max-w-md mx-auto"
            >
              <form className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow rounded-md"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-black dark:bg-white text-white dark:text-black font-bold py-2 px-4 rounded-md"
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Tutorials</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300  hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">MAGDB</div>
            <p className="text-gray-600 dark:text-gray-300">&copy; {new Date().getFullYear()} MAGDB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
