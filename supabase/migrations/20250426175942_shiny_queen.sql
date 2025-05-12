/*
  # Add Projects Section Metadata

  1. Updates
    - Add default projects section metadata structure
    
  2. Changes
    - Updates the projects section with initial metadata values including projects array
*/

UPDATE admin_sections
SET meta = '{
  "title": "My Projects",
  "description": "Here are some of my recent projects. Each one was carefully crafted to solve real problems while delivering exceptional user experiences.",
  "projects": [
    {
      "id": 1,
      "title": "Brand Identity System",
      "description": "Complete brand identity design including logo, typography, color palette, and brand guidelines for a luxury fashion retailer.",
      "image": "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
      "tags": ["Branding", "Logo Design", "Typography", "Guidelines"],
      "link": "https://example.com/brand-identity",
      "github": "https://github.com/username/brand-identity"
    }
  ]
}'::jsonb
WHERE section_id = 'projects';