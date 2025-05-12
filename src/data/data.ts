import { Project, Skill, Experience, SocialLink } from '../types';

export const personalInfo = {
  name: "Haseeb",
  title: "CEO of Hasphix",
  description: "I create exceptional visual experiences that captivate and inspire. Specializing in brand identity, UI/UX design, and creative digital solutions.",
  location: "Pakistan",
  email: "CEO@hasphix.com",
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Brand Identity System",
    description: "Complete brand identity design including logo, typography, color palette, and brand guidelines for a luxury fashion retailer.",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Branding", "Logo Design", "Typography", "Guidelines"],
    link: "https://example.com/brand-identity",
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    description: "Modern and intuitive user interface design for a fitness tracking mobile application, focusing on user experience and accessibility.",
    image: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["UI/UX", "Mobile Design", "Prototyping", "Figma"],
    link: "https://example.com/app-design",
  },
  {
    id: 3,
    title: "Marketing Campaign",
    description: "Comprehensive digital marketing campaign including social media graphics, web banners, and email templates for a product launch.",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Social Media", "Digital Marketing", "Web Design"],
    link: "https://example.com/marketing-campaign",
  },
  {
    id: 4,
    title: "3D Product Visualization",
    description: "Photorealistic 3D renderings and animations of product designs for an e-commerce platform's marketing materials.",
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["3D Design", "Animation", "Product Design"],
    link: "https://example.com/3d-visualization",
  }
];

export const skills: Skill[] = [
  { name: "Adobe Photoshop", level: 95, category: "design" },
  { name: "Adobe Illustrator", level: 90, category: "design" },
  { name: "Adobe XD", level: 85, category: "design" },
  { name: "Figma", level: 90, category: "design" },
  { name: "UI/UX Design", level: 88, category: "design" },
  { name: "Brand Design", level: 85, category: "design" },
  { name: "Motion Graphics", level: 80, category: "design" },
  { name: "Typography", level: 85, category: "design" },
  { name: "Color Theory", level: 90, category: "design" },
  { name: "Sketch", level: 75, category: "design" },
  { name: "3D Design", level: 70, category: "design" },
  { name: "Print Design", level: 80, category: "design" },
  { name: "Web Design", level: 85, category: "design" },
  { name: "Responsive Design", level: 88, category: "design" },
  { name: "Design Systems", level: 82, category: "design" },
];

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Creative Studio X",
    position: "Senior Graphic Designer",
    duration: "Jan 2022 - Present",
    description: [
      "Led the creative direction for major brand redesigns, resulting in 40% increase in client engagement",
      "Developed comprehensive brand identity systems for 15+ enterprise clients",
      "Created innovative UI/UX designs for mobile and web applications",
      "Mentored junior designers and conducted weekly design workshops",
    ],
  },
  {
    id: 2,
    company: "Digital Arts Agency",
    position: "UI/UX Designer",
    duration: "Mar 2019 - Dec 2021",
    description: [
      "Designed user interfaces for 20+ mobile and web applications",
      "Increased user engagement by 45% through intuitive design solutions",
      "Created and maintained design systems for enterprise clients",
      "Collaborated with development teams to ensure pixel-perfect implementation",
    ],
  },
  {
    id: 3,
    company: "Design Innovation Lab",
    position: "Graphic Designer",
    duration: "Jun 2017 - Feb 2019",
    description: [
      "Designed marketing materials for social media and print campaigns",
      "Created motion graphics for digital advertising campaigns",
      "Developed brand guidelines and visual identity systems",
      "Collaborated with marketing teams to create engaging content strategies",
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/username",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/username",
    icon: "Linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/username",
    icon: "Twitter",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/username",
    icon: "Instagram",
  },
];