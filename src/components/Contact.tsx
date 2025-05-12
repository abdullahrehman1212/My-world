import React, { useState, useEffect } from 'react';
import { Send, AlertCircle, CheckCircle, Mail, MapPin, Phone, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactData {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactData, setContactData] = useState<ContactData>({});

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('meta')
        .eq('section_id', 'contact')
        .single();

      if (error) throw error;
      if (data?.meta) {
        setContactData(data.meta);
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setSubmitStatus('loading');

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="h-6 w-6" />;
      case 'linkedin':
        return <Linkedin className="h-6 w-6" />;
      case 'instagram':
        return <Instagram className="h-6 w-6" />;
      case 'youtube':
        return <Youtube className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {contactData.title || 'Get In Touch'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {contactData.description || "Have a project in mind? Let's discuss how we can work together to bring your ideas to life."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Email</h3>
                  <a 
                    href={`mailto:${contactData.email || 'contact@example.com'}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {contactData.email || 'contact@example.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Phone</h3>
                  <a 
                    href={`tel:${contactData.phone || '+1234567890'}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {contactData.phone || '+1 (234) 567-890'}
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {contactData.address || '123 Business Street, New York, NY 10001'}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {contactData.socialLinks && contactData.socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {contactData.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white dark:bg-gray-900 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.subject 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
                  placeholder="Project Inquiry"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'loading' || submitStatus === 'success'}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
                  submitStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } ${submitStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitStatus === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;