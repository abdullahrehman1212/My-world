/*
  # Add About Section Metadata

  1. Updates
    - Add default about section metadata structure
    
  2. Changes
    - Updates the about section with initial metadata values
*/

UPDATE admin_sections
SET meta = '{
  "title": "About",
  "description": "I''m a creative professional with a keen eye for detail and a passion for excellence. My expertise spans across multiple domains, delivering exceptional results that make a lasting impact.",
  "secondaryDescription": "With a strong foundation in my field and modern tools, I specialize in creating unique solutions that help clients achieve their goals. From concept to execution, I ensure every project reflects excellence and innovation.",
  "image": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
  "personalInfo": {
    "name": "Alex Johnson",
    "location": "New York, USA",
    "email": "alex@example.com"
  }
}'::jsonb
WHERE section_id = 'about';