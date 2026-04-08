# 🚀 Quick Start Guide - Ajmeri Industries LetterPad

## ✅ What's Already Done

Your app is **fully built and running**! Here's what's ready:

✅ Professional letterhead design (exact format you specified)
✅ Bank Guarantee Letter template (pre-built)
✅ Custom Template Builder (create unlimited templates)
✅ High-quality PDF generation (A4, Times New Roman)
✅ Signature & Stamp upload system
✅ WhatsApp sharing
✅ Responsive design (mobile + desktop)
✅ PWA ready (installable app)

## 🎯 What You Need to Do Now

### 1. View Your App

The development server is **already running** at:
👉 **http://localhost:5173**

Click the preview button in your tool panel to open the app.

### 2. Set Up Supabase (5 minutes)

**Why?** To save templates and upload signature/stamp images.

**Follow this guide:** [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

**Quick Steps:**
1. Create free account at https://supabase.com
2. Create new project
3. Run 2 SQL commands (creates table + storage policies)
4. Create 2 storage buckets: `signatures` and `stamps`
5. Copy your Project URL and Anon Key
6. Create `.env` file with your credentials

**Need the SQL?** Here it is:

```sql
-- Create table
CREATE TABLE letter_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  fields JSONB NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Storage policies
CREATE POLICY "Public Access Signatures" ON storage.objects 
FOR SELECT USING (bucket_id = 'signatures');
CREATE POLICY "Upload Access Signatures" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'signatures');
CREATE POLICY "Public Access Stamps" ON storage.objects 
FOR SELECT USING (bucket_id = 'stamps');
CREATE POLICY "Upload Access Stamps" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'stamps');
```

### 3. Create .env File

In the `ajmeri-letterpad` folder, create a file named `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual Supabase credentials.

### 4. Restart the App

After creating `.env`, restart:

```bash
# Stop the current server (Ctrl+C)
# Then start again
npm run dev
```

## 📖 How to Use the App

### Generate a Bank Letter

1. **Select Template**: Click "Bank Guarantee Letter"
2. **Fill the Form**:
   - Date
   - Bank Name, Branch, District
   - Amounts, Duration
   - Milling Years
3. **Preview**: See live preview on the right
4. **Upload Signature** (optional): Click to upload your signature image
5. **Upload Stamp** (optional): Click to upload company stamp
6. **Generate PDF**: Click the blue button
7. **Share**: Click WhatsApp button to share

### Create a New Template

1. Click **"+ Create New Template"**
2. Enter template name (e.g., "Official Letter")
3. **Add Form Fields**:
   - Click "+ Add Field"
   - Enter field label (e.g., "Recipient Name")
   - Choose type (text, number, date, textarea)
   - Mark as required if needed
4. **Add Content Blocks**:
   - Click "+ Text" for short text
   - Click "+ Paragraph" for long text
   - Click "+ Subject" for subject line
   - Use `{{field_key}}` for dynamic values
5. Click **"Save Template"**
6. Use it immediately!

## 🎨 Customization

### Change Company Details

Edit `src/config/company.js`:

```javascript
export const COMPANY = {
  name: 'AJMERI INDUSTRIES',
  address: 'Paragaondih, Tahsil Bindranavagarh, Distt. Gariaband',
  gstNo: '22ACCFA0106H1ZB',
  mobile: '9981048601',
  footerText: 'For AJMERI INDUSTRIES',
  footerSubtext: '(Authorized Signatory)'
};
```

### Change Colors

Edit `tailwind.config.js` - the primary colors are already set to blue (#1e3a8a).

## 📱 Deploy to Production

When you're ready to go live:

### Option 1: Netlify (Easiest)

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Option 2: Vercel

```bash
npm install -g vercel
vercel --prod
```

### Option 3: GitHub Pages

1. Push code to GitHub
2. Settings → Pages
3. Source: `dist` folder
4. Save

## 🐛 Troubleshooting

### App won't start
```bash
npm install
npm run dev
```

### PDF not generating
- Check browser console for errors (F12)
- Make sure all required fields are filled

### Signature/Stamp not uploading
- Make sure Supabase is set up
- Check `.env` has correct credentials
- Verify storage buckets exist

### Template not saving
- Supabase table must exist
- Check SQL was run correctly

## 📂 Project Files

```
ajmeri-letterpad/
├── src/
│   ├── components/         # All UI components
│   ├── config/            # Company details
│   ├── templates/         # Letter templates
│   ├── utils/             # PDF generator, Supabase client
│   └── App.jsx            # Main app
├── public/                # Static files
├── .env.example          # Environment template
├── package.json          # Dependencies
├── vite.config.js        # Vite + PWA config
├── tailwind.config.js    # Styling config
├── README.md             # Full documentation
└── SUPABASE_SETUP.md     # Supabase guide
```

## 🎓 Next Steps

1. ✅ Test the app locally
2. ✅ Set up Supabase
3. ✅ Upload your signature and stamp
4. ✅ Generate test PDFs
5. ✅ Create custom templates
6. ✅ Deploy to production

## 💡 Tips

- **PDF Quality**: The PDF uses Times New Roman font and precise positioning for professional output
- **Mobile Friendly**: Works perfectly on phones and tablets
- **Offline Ready**: PWA allows offline use after first visit
- **Unlimited Templates**: Create as many letter types as you need
- **Auto-save**: Templates are saved to Supabase automatically

## 📞 Support

If you need help:
- Check `README.md` for full documentation
- Check `SUPABASE_SETUP.md` for backend setup
- Review browser console (F12) for errors

---

**You're all set! Start generating professional letters now!** 🎉
