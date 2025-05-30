// EmailJS Configuration
// Replace these with your actual EmailJS credentials

export const EMAIL_CONFIG = {
  // Your EmailJS Service ID
  SERVICE_ID: "service_tgysc5k",

  // Your EmailJS Template ID
  TEMPLATE_ID: "template_4jqubg3",

  // Your EmailJS Public Key
  PUBLIC_KEY: "user_def456",

  // Your email address where you want to receive messages
  TO_EMAIL: "syedtariq358@gmail.com",
}

// EmailJS Setup Instructions:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with these variables:
//    - {{from_name}} - Sender's name
//    - {{from_email}} - Sender's email
//    - {{subject}} - Email subject
//    - {{message}} - Email message
//    - {{to_email}} - Your email (where you receive messages)
// 4. Get your Service ID, Template ID, and Public Key
// 5. Replace the values above with your actual credentials

// Example Email Template:
/*
Subject: New Portfolio Contact: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
*/
