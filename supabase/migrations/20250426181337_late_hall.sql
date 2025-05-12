/*
  # Add Skills Section Metadata

  1. Updates
    - Add default skills section metadata structure
    
  2. Changes
    - Updates the skills section with initial metadata values
*/

UPDATE admin_sections
SET meta = '{
  "title": "My Skills",
  "description": "I''ve mastered a diverse set of design tools and techniques throughout my career. Here''s a glimpse of my creative expertise and proficiency levels.",
  "skills": [
    {
      "name": "Adobe Photoshop",
      "level": 95,
      "category": "design"
    },
    {
      "name": "Adobe Illustrator",
      "level": 90,
      "category": "design"
    },
    {
      "name": "Adobe XD",
      "level": 85,
      "category": "design"
    },
    {
      "name": "Figma",
      "level": 90,
      "category": "design"
    },
    {
      "name": "UI/UX Design",
      "level": 88,
      "category": "design"
    },
    {
      "name": "Brand Design",
      "level": 85,
      "category": "design"
    },
    {
      "name": "Motion Graphics",
      "level": 80,
      "category": "tools"
    },
    {
      "name": "Typography",
      "level": 85,
      "category": "design"
    },
    {
      "name": "Color Theory",
      "level": 90,
      "category": "design"
    },
    {
      "name": "Sketch",
      "level": 75,
      "category": "tools"
    },
    {
      "name": "3D Design",
      "level": 70,
      "category": "other"
    },
    {
      "name": "Print Design",
      "level": 80,
      "category": "other"
    },
    {
      "name": "Web Design",
      "level": 85,
      "category": "design"
    },
    {
      "name": "Responsive Design",
      "level": 88,
      "category": "design"
    },
    {
      "name": "Design Systems",
      "level": 82,
      "category": "design"
    }
  ]
}'::jsonb
WHERE section_id = 'skills';