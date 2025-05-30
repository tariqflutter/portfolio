"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_tgysc5k",
  TEMPLATE_ID: "template_cd7l50i",
  PUBLIC_KEY: "xuMLHpeMt2DSU75Qj",
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [emailJsLoaded, setEmailJsLoaded] = useState(false)
  const formRef = useRef(null)
  const { toast } = useToast()

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
    script.async = true
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
        setEmailJsLoaded(true)
      }
    }
    script.onerror = () => {
      setSubmitStatus("error")
      setSubmitMessage("Failed to load email service. Please try again later.")
    }
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      if (!emailJsLoaded || !window.emailjs) {
        throw new Error("EmailJS not loaded")
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.firstName,
        last_name: formData.lastName,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "syedtariq358@gmail.com",
        reply_to: formData.email,
      }

      // Send email using EmailJS
      const response = await window.emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)

      if (response.status === 200) {
        setSubmitStatus("success")
        setSubmitMessage("Thank you for your message! I'll get back to you soon.")

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        })

        // Show success toast
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll respond as soon as possible.",
        })
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")

      let errorMessage = "Sorry, there was an error sending your message. "

      if (error.text) {
        errorMessage += `Error: ${error.text}`
      } else if (error.message) {
        errorMessage += `Error: ${error.message}`
      } else {
        errorMessage += "Please try again or contact me directly."
      }

      setSubmitMessage(errorMessage)

      // Show error toast
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly at syedtariq358@gmail.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Status Messages */}
      {submitStatus === "success" && (
        <Alert className="mb-6 bg-emerald-50 text-emerald-800 border-emerald-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{submitMessage}</AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitMessage}</AlertDescription>
        </Alert>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject *
          </Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Project Inquiry"
            className={errors.subject ? "border-red-500" : ""}
          />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
        </div>

        <div>
          <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell me about your project..."
            className={errors.message ? "border-red-500" : ""}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  )
}
