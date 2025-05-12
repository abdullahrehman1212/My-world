/*
  # Update admin sections table with enhanced metadata

  1. Changes
    - Add SEO metadata
    - Add layout configuration
    - Add theme settings
    - Add analytics data
    - Add revision tracking

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE admin_sections
ADD COLUMN IF NOT EXISTS revision_history jsonb[] DEFAULT '{}';

-- Update existing rows with enhanced metadata structure
UPDATE admin_sections
SET meta = jsonb_set(
  COALESCE(meta, '{}'::jsonb),
  '{seo}',
  '{"title": "", "description": "", "keywords": []}'::jsonb
)
WHERE meta->>'seo' IS NULL;

UPDATE admin_sections
SET meta = jsonb_set(
  COALESCE(meta, '{}'::jsonb),
  '{layout}',
  '{"type": "default", "columns": 1, "spacing": 16}'::jsonb
)
WHERE meta->>'layout' IS NULL;

UPDATE admin_sections
SET meta = jsonb_set(
  COALESCE(meta, '{}'::jsonb),
  '{theme}',
  '{"primaryColor": "#4A90E2", "secondaryColor": "#2C3E50", "fontFamily": "Inter"}'::jsonb
)
WHERE meta->>'theme' IS NULL;

UPDATE admin_sections
SET meta = jsonb_set(
  COALESCE(meta, '{}'::jsonb),
  '{analytics}',
  '{"views": 0, "lastUpdated": null}'::jsonb
)
WHERE meta->>'analytics' IS NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_admin_sections_section_id ON admin_sections(section_id);
CREATE INDEX IF NOT EXISTS idx_admin_sections_updated_at ON admin_sections(updated_at);