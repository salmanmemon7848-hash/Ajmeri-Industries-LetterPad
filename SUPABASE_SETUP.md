# Supabase Setup Guide for Ajmeri Industries LetterPad

Follow these steps to set up your Supabase backend.

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project" or "New Project"
3. Sign in / Sign up (use GitHub, Google, or Email)
4. Click "New Project"
5. Fill in:
   - **Project Name**: Ajmeri Industries LetterPad
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you (e.g., Asia East - Singapore)
6. Click "Create new project"
7. Wait 1-2 minutes for setup to complete

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon in left sidebar)
2. Click on **API**
3. Copy these two values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 3: Create Database Table

1. Go to **SQL Editor** (database icon in left sidebar)
2. Click **New query**
3. Paste this SQL and click **Run**:

```sql
CREATE TABLE letter_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  fields JSONB NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. You should see "Success. No rows returned"

## Step 4: Create Storage Buckets

### Create Signatures Bucket

1. Go to **Storage** (folder icon in left sidebar)
2. Click **New bucket**
3. Enter name: `signatures`
4. Toggle **Public bucket** to ON
5. Click **Create bucket**

### Create Stamps Bucket

1. Click **New bucket** again
2. Enter name: `stamps`
3. Toggle **Public bucket** to ON
4. Click **Create bucket**

## Step 5: Set Storage Policies

1. Go to **SQL Editor**
2. Click **New query**
3. Paste this SQL and click **Run**:

```sql
-- Allow public read access to signatures
CREATE POLICY "Public Access Signatures" ON storage.objects 
FOR SELECT USING (bucket_id = 'signatures');

-- Allow uploads to signatures
CREATE POLICY "Upload Access Signatures" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'signatures');

-- Allow public read access to stamps
CREATE POLICY "Public Access Stamps" ON storage.objects 
FOR SELECT USING (bucket_id = 'stamps');

-- Allow uploads to stamps
CREATE POLICY "Upload Access Stamps" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'stamps');
```

4. You should see "Success. No rows returned" (4 times)

## Step 6: Configure Your App

1. In your project folder `ajmeri-letterpad`, create a `.env` file:

```bash
# Copy the example file
cp .env.example .env
```

2. Open `.env` and add your credentials:

```env
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace:
- `your-project-url` with your actual project URL
- `your-anon-key-here` with your actual anon public key

## Step 7: Test Connection

1. Restart your development server:
```bash
npm run dev
```

2. Open the app in browser
3. If you see the app loading without errors, Supabase is connected!

## Optional: View Your Data

### View Templates
1. Go to **Table Editor** (table icon in left sidebar)
2. Click on `letter_templates` table
3. You'll see templates saved here when users create them

### View Uploaded Files
1. Go to **Storage**
2. Click on `signatures` or `stamps` bucket
3. You'll see uploaded images here

## Troubleshooting

### Error: "Invalid API key"
- Check your `.env` file has correct values
- Make sure you copied the **anon public** key (not service_role key)
- Restart your dev server after changing `.env`

### Error: "Policy violation"
- Make sure you ran all the SQL policies in Step 5
- Check that bucket names are exactly `signatures` and `stamps`

### Error: "Table does not exist"
- Make sure you ran the CREATE TABLE SQL in Step 3
- Check Table Editor to confirm `letter_templates` exists

## Security Notes

✅ **Safe**: The `anon` key is meant for browser/client use
✅ **Safe**: Storage policies limit access to specific buckets
✅ **Safe**: Row Level Security (RLS) is enabled by default

❌ **Never expose** the `service_role` key in your frontend code

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com

---

**Setup Complete!** Your backend is ready to use. 🎉
