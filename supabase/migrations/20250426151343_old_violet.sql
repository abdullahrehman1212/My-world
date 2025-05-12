/*
  # Create website sections table with metadata

  1. New Tables
    - `admin_sections`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `section_id` (text)
      - `images` (text array)
      - `meta` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy for authenticated users
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS admin_sections;

-- Create new table with updated schema
CREATE TABLE admin_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  section_id text NOT NULL,
  images text[] DEFAULT '{}',
  meta jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_sections ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow authenticated users to manage sections"
  ON admin_sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial sections with metadata
INSERT INTO admin_sections (title, section_id, content, meta) VALUES
  (
    'Header',
    'header',
    'Website header content',
    '{
      "navigation": {
        "items": [
          {"label": "Home", "url": "#home"},
          {"label": "About", "url": "#about"},
          {"label": "Projects", "url": "#projects"},
          {"label": "Skills", "url": "#skills"},
          {"label": "Contact", "url": "#contact"}
        ]
      },
      "logo": "/hasphix-logo.svg",
      "contact": {
        "email": "contact@example.com",
        "phone": "+1234567890",
        "address": "123 Street, City, Country"
      }
    }'
  ),
  (
    'Hero Section',
    'hero',
    'Main hero section content',
    '{}'
  ),
  (
    'About Section',
    'about',
    'About section content',
    '{}'
  ),
  (
    'Projects Section',
    'projects',
    'Projects section content',
    '{}'
  ),
  (
    'Skills Section',
    'skills',
    'Skills section content',
    '{}'
  ),
  (
    'Experience Section',
    'experience',
    'Experience section content',
    '{}'
  ),
  (
    'Contact Section',
    'contact',
    'Contact section content',
    '{}'
  ),
  (
    'Footer',
    'footer',
    'Website footer content',
    '{
      "copyright": "© 2025 All rights reserved",
      "social": [
        {"platform": "GitHub", "url": "https://github.com", "icon": "Github"},
        {"platform": "LinkedIn", "url": "https://linkedin.com", "icon": "Linkedin"},
        {"platform": "Twitter", "url": "https://twitter.com", "icon": "Twitter"}
      ],
      "menus": [
        {
          "title": "Quick Links",
          "items": [
            {"label": "Home", "url": "#home"},
            {"label": "Services", "url": "#services"},
            {"label": "Portfolio", "url": "#portfolio"},
            {"label": "Contact", "url": "#contact"}
          ]
        }
      ]
    }'
  );