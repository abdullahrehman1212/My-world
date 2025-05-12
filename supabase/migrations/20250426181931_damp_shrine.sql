/*
  # Add Experience Section Metadata

  1. Updates
    - Add default experience section metadata structure
    
  2. Changes
    - Updates the experience section with initial metadata values
*/

UPDATE admin_sections
SET meta = '{
  "title": "Work Experience",
  "description": "My professional journey has equipped me with a diverse skill set and valuable experience working across different environments and technologies.",
  "experiences": [
    {
      "id": 1,
      "company": "Creative Studio X",
      "position": "Senior Graphic Designer",
      "duration": "Jan 2022 - Present",
      "description": [
        "Led the creative direction for major brand redesigns, resulting in 40% increase in client engagement",
        "Developed comprehensive brand identity systems for 15+ enterprise clients",
        "Created innovative UI/UX designs for mobile and web applications",
        "Mentored junior designers and conducted weekly design workshops"
      ]
    },
    {
      "id": 2,
      "company": "Digital Arts Agency",
      "position": "UI/UX Designer",
      "duration": "Mar 2019 - Dec 2021",
      "description": [
        "Designed user interfaces for 20+ mobile and web applications",
        "Increased user engagement by 45% through intuitive design solutions",
        "Created and maintained design systems for enterprise clients",
        "Collaborated with development teams to ensure pixel-perfect implementation"
      ]
    },
    {
      "id": 3,
      "company": "Design Innovation Lab",
      "position": "Graphic Designer",
      "duration": "Jun 2017 - Feb 2019",
      "description": [
        "Designed marketing materials for social media and print campaigns",
        "Created motion graphics for digital advertising campaigns",
        "Developed brand guidelines and visual identity systems",
        "Collaborated with marketing teams to create engaging content strategies"
      ]
    }
  ]
}'::jsonb
WHERE section_id = 'experience';