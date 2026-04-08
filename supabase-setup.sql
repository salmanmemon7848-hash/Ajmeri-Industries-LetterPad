-- ============================================
-- AJMERI INDUSTRIES LETTERPAD - SUPABASE SQL
-- ============================================
-- Run these commands in Supabase SQL Editor
-- ============================================

-- 1. CREATE LETTER TEMPLATES TABLE
CREATE TABLE letter_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  fields JSONB NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. CREATE STORAGE POLICIES FOR SIGNATURES
CREATE POLICY "Public Access Signatures" ON storage.objects 
FOR SELECT USING (bucket_id = 'signatures');

CREATE POLICY "Upload Access Signatures" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'signatures');

-- 3. CREATE STORAGE POLICIES FOR STAMPS
CREATE POLICY "Public Access Stamps" ON storage.objects 
FOR SELECT USING (bucket_id = 'stamps');

CREATE POLICY "Upload Access Stamps" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'stamps');

-- ============================================
-- DONE! Your database is ready to use.
-- ============================================
