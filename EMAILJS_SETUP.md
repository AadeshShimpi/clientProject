# EmailJS Setup Guide (Free Email Service - No Backend Required)

## Overview
The contact form now uses **EmailJS**, a free client-side email service. This means:
- ✅ **No Node.js backend needed** for email
- ✅ **Works on static hosts** like GoDaddy, Netlify, Vercel
- ✅ **Free tier** with 200 emails/month
- ✅ **No server credentials exposed**
- ✅ **Works with any email provider** (Gmail, Outlook, etc.)

## Step-by-Step Setup

### 1. Create an EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click **Sign Up** (or **Try for Free**)
3. Create an account using Email/Google/GitHub
4. Verify your email

### 2. Add Your Email Service (Gmail)
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail** from the list
4. Name it: `Gmail Service` (or any name)
5. Click **Create Service** (this opens Gmail authorization)
6. Sign in with your Gmail account: `aashirwadshimpi@gmail.com`
7. Allow EmailJS to access your Gmail
8. Copy the **Service ID** (format: `service_xxxxx`)

### 3. Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Name it: `Contact Form Template`
4. Set **From Email**: `aashirwadshimpi@gmail.com`
5. Set **To Email**: `{{to_email}}`
6. Set **Reply To**: `{{reply_to}}`
7. Use this **Email Template**:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**HTML Content:**
```html
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
<hr>
<p><em>Sent from: P.P. Patel Metal Powders Pvt Ltd Website</em></p>
```

8. Click **Save**
9. Copy the **Template ID** (format: `template_xxxxx`)

### 4. Get Your Public Key
1. Go to **Account** in the dashboard
2. Find **Public Key** section
3. Copy your **Public Key** (format: `xxxxxxxxxxxxxxxxxxxxx`)

### 5. Update `.env.local`
Replace the placeholder values in `.env.local`:

```env
# EmailJS Configuration (Free Email Service - No Backend Needed)
# Get these from: https://www.emailjs.com/
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_xxx
CONTACT_EMAIL=shimpiaadesh14@gmail.com
```

Replace:
- `service_xxxxx` with your Gmail Service ID
- `template_xxxxx` with your Template ID
- `your_public_key_xxx` with your Public Key
- `shimpiaadesh14@gmail.com` with your admin email (where form submissions go)

### 6. Test Locally
```powershell
npm run dev
```

1. Go to `http://localhost:3000/contact`
2. Fill out the form and click **Send Message**
3. Check your Gmail inbox for the submission
4. Check your spam folder if not received

## Deployment to GoDaddy

### Option A: Keep Using EmailJS (Recommended)
Since EmailJS is client-side, it works everywhere:
1. Upload your entire project to GoDaddy
2. `.env.local` must be on the server with EmailJS credentials
3. Run `npm install` and `npm run build`
4. Start with `npm run start`
5. Contact form will work immediately

### Option B: Optional - Keep Node.js API (with .env.local)
If you want both options, keep the API route as a fallback. The contact form will:
1. First try EmailJS (client-side)
2. Fall back to API route if needed (server-side)

## Free Tier Limits
- **200 emails/month** (free plan)
- **Unlimited templates**
- **Unlimited services**
- Upgrade to Pro for more emails

## Troubleshooting

### Issue: "Service not found" error
- Check that Service ID is correct in `.env.local`
- Restart `npm run dev`

### Issue: "Template not found" error
- Verify Template ID matches what's in EmailJS dashboard
- Make sure template is published

### Issue: Emails going to spam
- Add `aashirwadshimpi@gmail.com` to your contacts
- Check Gmail's "SPF/DKIM" settings in EmailJS dashboard

### Issue: Need to send to multiple emails
- Modify the template in EmailJS to send to multiple recipients
- Or update the template variables in `contact/page.tsx`

## Advantages Over Node.js API

| Feature | EmailJS | Node.js API |
|---------|---------|------------|
| Backend Required | ❌ No | ✅ Yes |
| Works on Static Hosts | ✅ Yes | ❌ No |
| GoDaddy Compatibility | ✅ Yes | ⚠️ Requires Node.js |
| Exposed Credentials | ❌ Safe | ⚠️ Risky |
| Cost | Free (200/mo) | Free |
| Setup Time | 5 minutes | 15 minutes |

## Support
- EmailJS Docs: https://www.emailjs.com/docs/
- Issues? Check the browser console for error messages

---

**Status:** ✅ Contact form now uses EmailJS - works everywhere, no backend needed!
