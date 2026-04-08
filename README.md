# Ajmeri Industries LetterPad

A premium professional letter generator with official company letterhead for Ajmeri Industries.

## Features

✅ **Professional Letterhead Design**
- GST Number, Company Name, Address, Mobile Number
- Clean, minimal, government-ready format

✅ **Custom Template Builder**
- Create unlimited letter templates
- Dynamic form fields (text, number, date, textarea)
- Flexible content blocks

✅ **High-Quality PDF Generation**
- A4 size with precise positioning
- Times New Roman font (professional)
- Proper margins and spacing
- Signature & stamp placement

✅ **Pre-built Bank Letter Template**
- Bank Guarantee letters
- Auto-generated content with dynamic values

✅ **Signature & Stamp Management**
- Upload signature image
- Upload company stamp
- Auto-place in PDF footer

✅ **WhatsApp Sharing**
- Generate and share letters instantly
- Download PDF for manual sharing

✅ **Responsive Design**
- Works on mobile and desktop
- Installable PWA app

## Setup Instructions

### 1. Install Dependencies

```bash
cd ajmeri-letterpad
npm install
```

### 2. Setup Supabase

1. Go to https://supabase.com
2. Create a new project: "Ajmeri Industries LetterPad"
3. Copy your Project URL and Anon Key

4. Create database table (run in SQL Editor):

```sql
CREATE TABLE letter_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  fields JSONB NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

5. Create storage buckets:
   - Go to Storage → Create bucket: `signatures` (public)
   - Create bucket: `stamps` (public)

6. Set storage policies (run in SQL Editor):

```sql
CREATE POLICY "Public Access Signatures" ON storage.objects 
FOR SELECT USING (bucket_id = 'signatures');

CREATE POLICY "Upload Access Signatures" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'signatures');

CREATE POLICY "Public Access Stamps" ON storage.objects 
FOR SELECT USING (bucket_id = 'stamps');

CREATE POLICY "Upload Access Stamps" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'stamps');
```

### 3. Configure Environment Variables

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env and add your Supabase credentials:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

The app will open at http://localhost:5173

### 5. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## Deployment

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to GitHub Pages

1. Push code to GitHub
2. Go to Settings → Pages
3. Set source to `dist` folder
4. Save

## Usage

1. **Select Template**: Choose from existing templates or create a new one
2. **Fill Form**: Enter the required details in the form
3. **Preview**: See real-time preview of your letter
4. **Upload Signature & Stamp**: (Optional) Add your signature and company stamp
5. **Generate PDF**: Click "Generate PDF" to download
6. **Share on WhatsApp**: Click to share via WhatsApp

## Project Structure

```
ajmeri-letterpad/
├── src/
│   ├── components/
│   │   ├── Letterhead.jsx          # Company letterhead
│   │   ├── LetterForm.jsx          # Dynamic form generator
│   │   ├── LetterPreview.jsx       # Real-time preview
│   │   ├── TemplateBuilder.jsx     # Create templates
│   │   ├── TemplateManager.jsx     # Template selector
│   │   ├── SignatureManager.jsx    # Signature upload
│   │   └── StampManager.jsx        # Stamp upload
│   ├── config/
│   │   └── company.js              # Company details
│   ├── templates/
│   │   └── bankLetter.js           # Bank letter template
│   ├── utils/
│   │   ├── pdfGenerator.js         # PDF generation
│   │   └── supabase.js             # Supabase client
│   ├── App.jsx                     # Main app
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Styles
├── public/
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **PDF Generation**: pdf-lib
- **Backend**: Supabase (Database + Storage)
- **PWA**: vite-plugin-pwa

## Company Details

**AJMERI INDUSTRIES**
- Address: Paragaondih, Tahsil Bindranavagarh, Distt. Gariaband
- GST NO: 22ACCFA0106H1ZB
- Mobile: 9981048601

## License

© 2026 Ajmeri Industries. All rights reserved.
