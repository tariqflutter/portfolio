"use server"

import { z } from "zod"

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type FormState = {
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
    _form?: string[]
  }
  success?: boolean
}

export async function sendContactEmail(prevState: FormState, formData: FormData): Promise<FormState> {
  // Validate form data
  const validatedFields = formSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { firstName, lastName, email, subject, message } = validatedFields.data

  try {
    // In a real application, you would send an email here using a service like
    // SendGrid, Mailgun, AWS SES, or even a custom SMTP server

    // Example implementation (commented out as it requires actual API keys):
    /*
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: 'syedtariq358@gmail.com' }] }],
        from: { email: email },
        subject: `Portfolio Contact: ${subject}`,
        content: [{
          type: 'text/plain',
          value: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`
        }]
      }),
    });
    */

    // For now, we'll simulate a successful email send
    // In production, you would check the response from your email service

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
    }
  } catch (error) {
    return {
      errors: {
        _form: ["Failed to send email. Please try again later."],
      },
    }
  }
}
