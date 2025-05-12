import { Tool } from '../types';

export const tools: Tool[] = [
  {
    id: 'remove-bg',
    name: 'Remove Background',
    description: 'Remove background from images with just one click',
    icon: 'image-off',
    category: 'image',
    path: '/tools/remove-background',
    isPopular: true,
  },
  {
    id: 'qr-code',
    name: 'QR Code Generator',
    description: 'Generate customizable QR codes for any URL or text',
    icon: 'qr-code',
    category: 'generator',
    path: '/tools/qr-code-generator',
    isPopular: true,
  },
  {
    id: 'tiny-png',
    name: 'Image Compressor',
    description: 'Compress images without losing quality',
    icon: 'image-down',
    category: 'image',
    path: '/tools/image-compressor',
    isPopular: true,
  },
  {
    id: 'convertio',
    name: 'File Converter',
    description: 'Convert files between different formats',
    icon: 'file-symlink',
    category: 'conversion',
    path: '/tools/file-converter',
    isPopular: true,
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    description: 'Edit, merge, split and convert PDF files',
    icon: 'file-text',
    category: 'conversion',
    path: '/tools/pdf-tools',
    isNew: true,
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs',
    icon: 'text',
    category: 'generator',
    path: '/tools/lorem-ipsum',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate your JSON data',
    icon: 'braces',
    category: 'developer',
    path: '/tools/json-formatter',
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare and find differences between texts',
    icon: 'git-compare',
    category: 'text',
    path: '/tools/diff-checker',
  },
  {
    id: 'table-converter',
    name: 'Table Converter',
    description: 'Convert between different table formats',
    icon: 'table',
    category: 'conversion',
    path: '/tools/table-converter',
  },
  {
    id: 'compress-jpeg',
    name: 'JPEG Compressor',
    description: 'Compress JPEG images without losing quality',
    icon: 'image',
    category: 'image',
    path: '/tools/compress-jpeg',
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to any dimension',
    icon: 'scaling',
    category: 'image',
    path: '/tools/image-resizer',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URLs',
    icon: 'link',
    category: 'developer',
    path: '/tools/url-encoder-decoder',
  },
  {
    id: 'markdown-converter',
    name: 'Markdown to HTML',
    description: 'Convert Markdown to HTML',
    icon: 'file-code',
    category: 'conversion',
    path: '/tools/markdown-to-html',
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV to JSON format',
    icon: 'file-json',
    category: 'conversion',
    path: '/tools/csv-to-json',
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode or decode Base64 strings',
    icon: 'binary',
    category: 'developer',
    path: '/tools/base64',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters and sentences',
    icon: 'text-cursor',
    category: 'text',
    path: '/tools/word-counter',
  },
  {
    id: 'hex-rgb',
    name: 'HEX to RGB Converter',
    description: 'Convert HEX color codes to RGB and vice versa',
    icon: 'palette',
    category: 'developer',
    path: '/tools/hex-rgb-converter',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords',
    icon: 'key',
    category: 'generator',
    path: '/tools/password-generator',
    isNew: true,
  },
  {
    id: 'ai-summarizer',
    name: 'AI Text Summarizer',
    description: 'Summarize long texts using AI',
    icon: 'sparkles',
    category: 'text',
    path: '/tools/ai-summarizer',
    isUpcoming: true,
  },
  {
    id: 'code-beautifier',
    name: 'Code Beautifier',
    description: 'Format and beautify your code',
    icon: 'code',
    category: 'developer',
    path: '/tools/code-beautifier',
    isUpcoming: true,
  }
];

export const getToolsByCategory = (category: string) => {
  return tools.filter(tool => tool.category === category && !tool.isUpcoming);
};

export const getPopularTools = () => {
  return tools.filter(tool => tool.isPopular && !tool.isUpcoming);
};

export const getNewTools = () => {
  return tools.filter(tool => tool.isNew && !tool.isUpcoming);
};

export const getUpcomingTools = () => {
  return tools.filter(tool => tool.isUpcoming);
};

export const getToolById = (id: string) => {
  return tools.find(tool => tool.id === id);
};