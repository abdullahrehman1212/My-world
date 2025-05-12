/*
  # Add Hero Section Metadata

  1. Updates
    - Add default hero section metadata structure
    
  2. Changes
    - Updates the hero section with initial metadata values
*/

UPDATE admin_sections
SET meta = '{
  "title": "Hello, I''m",
  "subtitle": "Alex Johnson",
  "description": "Full Stack Developer",
  "primaryCTA": {
    "text": "View My Work",
    "url": "#projects"
  },
  "secondaryCTA": {
    "text": "Contact Me",
    "url": "#contact"
  }
}'::jsonb
WHERE section_id = 'hero';