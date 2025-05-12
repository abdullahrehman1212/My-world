/*
  # Add Contact Section Metadata

  1. Updates
    - Add default contact section metadata structure
    
  2. Changes
    - Updates the contact section with initial metadata values including:
      - Title and description
      - Contact information (email, phone, address)
      - Social links
      - Form settings
*/

UPDATE admin_sections
SET meta = '{
  "title": "Get In Touch",
  "description": "Have a project in mind? Let''s discuss how we can work together to bring your ideas to life.",
  "email": "contact@example.com",
  "phone": "+1 (234) 567-890",
  "address": "123 Business Street, New York, NY 10001",
  "socialLinks": [
    {
      "platform": "linkedin",
      "url": "https://linkedin.com/company/example"
    },
    {
      "platform": "twitter",
      "url": "https://twitter.com/example"
    },
    {
      "platform": "github",
      "url": "https://github.com/example"
    }
  ],
  "formSettings": {
    "emailNotifications": true,
    "autoResponse": true,
    "responseMessage": "Thank you for your message. We will get back to you soon!"
  }
}'::jsonb
WHERE section_id = 'contact';