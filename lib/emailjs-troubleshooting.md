# EmailJS Troubleshooting Guide

## Common Issues & Solutions

### 1. **Not Receiving Emails**

**Check Spam/Junk Folder First!**
- EmailJS emails often end up in spam initially
- Mark as "Not Spam" to train your email filter

### 2. **Configuration Issues**

**Service ID, Template ID, Public Key:**
\`\`\`javascript
// Make sure these are your actual values, not placeholders
SERVICE_ID: "service_tgysc5k"     // From EmailJS dashboard
TEMPLATE_ID: "template_4jqubg3"   // From your template
PUBLIC_KEY: "user_def456"        // From Account > API Keys
\`\`\`

### 3. **Email Service Connection**

**Gmail Setup:**
1. Go to EmailJS Dashboard > Email Services
2. Add Gmail service
3. Authorize with your Google account
4. Make sure the service is "Connected" (green status)

**Outlook/Other Providers:**
- Follow similar steps for your email provider
- Ensure proper authentication

### 4. **Template Configuration**

**Required Template Variables:**
\`\`\`
{{from_name}}    - Sender's name
{{from_email}}   - Sender's email  
{{subject}}      - Email subject
{{message}}      - Email content
{{to_email}}     - Your email (syedtariq358@gmail.com)
\`\`\`

**Example Template:**
\`\`\`
Subject: Portfolio Contact: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
Reply to: {{from_email}}
\`\`\`

### 5. **Rate Limits**

**Free Tier Limits:**
- 200 emails/month
- 50 emails/day
- Check your usage in EmailJS dashboard

### 6. **Testing Steps**

1. **Test in EmailJS Dashboard:**
   - Go to your template
   - Click "Test" button
   - Send a test email

2. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for error messages
   - Check Network tab for failed requests

3. **Verify Service Status:**
   - EmailJS Dashboard > Email Services
   - Ensure service shows "Connected"

### 7. **Alternative Solutions**

If EmailJS continues to have issues:

**Formspree (Free Alternative):**
\`\`\`html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
\`\`\`

**Netlify Forms (If hosting on Netlify):**
\`\`\`html
<form netlify>
  <!-- form fields -->
</form>
\`\`\`

### 8. **Debug Checklist**

- [ ] EmailJS account created and verified
- [ ] Email service connected and active
- [ ] Template created with correct variables
- [ ] Service ID, Template ID, Public Key updated in code
- [ ] Test email sent from EmailJS dashboard
- [ ] Checked spam/junk folder
- [ ] Browser console shows no errors
- [ ] Form submission shows success message

### 9. **Contact for Help**

If still having issues:
1. Check EmailJS documentation
2. Contact EmailJS support
3. Use alternative contact methods (direct email, social media)
