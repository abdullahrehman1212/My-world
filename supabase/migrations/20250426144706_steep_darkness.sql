/*
  # Create admin sections table

  1. New Tables
    - `admin_sections`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `section_id` (text)
      - `images` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `admin_sections` table
    - Add policy for authenticated users to manage sections
*/

CREATE TABLE IF NOT EXISTS admin_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  section_id text NOT NULL,
  images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage sections"
  ON admin_sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial sections
INSERT INTO admin_sections (title, section_id, content) VALUES
  ('Hero Section', 'hero', 'Edit hero section content here'),
  ('About Section', 'about', 'Edit about section content here'),
  ('Projects Section', 'projects', 'Edit projects section content here'),
  ('Skills Section', 'skills', 'Edit skills section content here'),
  ('Experience Section', 'experience', 'Edit experience section content here'),
  ('Contact Section', 'contact', 'Edit contact section content here');