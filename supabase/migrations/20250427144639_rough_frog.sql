/*
  # Remove Footer Section
  
  1. Changes
    - Delete footer section from admin_sections table
*/

DELETE FROM admin_sections WHERE section_id = 'footer';