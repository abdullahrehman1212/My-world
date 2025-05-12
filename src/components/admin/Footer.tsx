import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface MenuItem {
  label: string;
  url: string;
}

interface Menu {
  title: string;
  items: MenuItem[];
}

interface FooterData {
  logo: string;
  menus: Menu[];
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  copyright: string;
}

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData>({
    logo: '',
    menus: [],
    socialLinks: [],
    copyright: '© 2025 All rights reserved'
  });

  const fetchFooterData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'footer')
        .single();

      if (error) {
        console.error('Error fetching footer data:', error.message);
        return;
      }

      if (data?.meta) {
        setFooterData({
          logo: data.meta.logo || '',
          menus: Array.isArray(data.meta.menus) ? data.meta.menus.map(menu => ({
            title: menu.title || '',
            items: Array.isArray(menu.items) ? menu.items.map(item => ({
              label: item.label || '',
              url: item.url || '#'
            })) : []
          })) : [],
          socialLinks: Array.isArray(data.meta.socialLinks) ? data.meta.socialLinks : [],
          copyright: data.meta.copyright || '© 2025 All rights reserved'
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Logo */}
        {footerData.logo && (
          <div className="mb-6 text-center">
            <img src={footerData.logo} alt="Footer Logo" className="h-10 mx-auto" />
          </div>
        )}

        {/* Menus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {footerData.menus.map((menu, index) => (
            <div key={index} className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-2">{menu.title}</h3>
              <ul className="space-y-2">
                {menu.items.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.url}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        {footerData.socialLinks.length > 0 && (
          <div className="flex justify-center gap-4 mb-6">
            {footerData.socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
          {footerData.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;