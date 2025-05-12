import React, { useState, useRef } from 'react';
import { Download, Share2, Settings, Check } from 'lucide-react';
import Button from '../../components/ui/Button';

const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState('https://example.com');
  const [qrSize, setQrSize] = useState(200);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [showSettings, setShowSettings] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  
  const handleGenerate = () => {
    // In a real implementation, we would generate the QR code here
    // For this example, we're just simulating it
    console.log('Generating QR code for', url);
  };
  
  const handleDownload = () => {
    // In a real implementation, we would download the QR code here
    console.log('Downloading QR code');
  };
  
  const handleShare = () => {
    // In a real implementation, we would share the QR code here
    console.log('Sharing QR code');
  };
  
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  
  return (
    <div className="min-h-screen bg-gray-950 pb-16">
      <div className="bg-gray-900/50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-3xl font-bold text-white">QR Code Generator</h1>
          <p className="text-gray-400">Generate customizable QR codes for any URL or text.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="mb-8 w-full lg:mb-0 lg:w-1/2">
            <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
              <h2 className="mb-4 text-xl font-medium text-white">Enter Your Content</h2>
              
              <div className="mb-4">
                <label htmlFor="url" className="mb-2 block text-sm font-medium text-gray-400">
                  URL or Text
                </label>
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="https://example.com"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              
              <Button 
                variant="primary" 
                size="md" 
                fullWidth
                onClick={handleGenerate}
              >
                Generate QR Code
              </Button>
              
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={toggleSettings}
                  className="flex items-center text-sm text-gray-400 hover:text-white"
                >
                  <Settings size={16} className="mr-1" />
                  {showSettings ? 'Hide' : 'Show'} Advanced Settings
                </button>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleDownload}
                    className="flex items-center text-sm text-gray-400 hover:text-white"
                  >
                    <Download size={16} className="mr-1" />
                    Download
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center text-sm text-gray-400 hover:text-white"
                  >
                    <Share2 size={16} className="mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
            
            {showSettings && (
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-4 text-xl font-medium text-white">Customization</h2>
                
                <div className="mb-4">
                  <label htmlFor="size" className="mb-2 block text-sm font-medium text-gray-400">
                    Size: {qrSize}px
                  </label>
                  <input
                    type="range"
                    id="size"
                    min="100"
                    max="500"
                    step="10"
                    value={qrSize}
                    onChange={(e) => setQrSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="fgColor" className="mb-2 block text-sm font-medium text-gray-400">
                    Foreground Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="fgColor"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="h-10 w-10 rounded-md border border-gray-700 bg-gray-800"
                    />
                    <input
                      type="text"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="ml-3 w-24 rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="bgColor" className="mb-2 block text-sm font-medium text-gray-400">
                    Background Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="bgColor"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="h-10 w-10 rounded-md border border-gray-700 bg-gray-800"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="ml-3 w-24 rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Error Correction
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Low', 'Medium', 'Quartile', 'High'].map((level) => (
                      <button
                        key={level}
                        className="flex items-center justify-center rounded-md border border-gray-700 bg-gray-800 py-2 text-sm text-white hover:border-purple-500 hover:bg-gray-700"
                      >
                        {level === 'Medium' && <Check size={14} className="mr-1 text-purple-500" />}
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="secondary" 
                  size="md" 
                  fullWidth
                  onClick={handleGenerate}
                >
                  Apply Changes
                </Button>
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
              <h2 className="mb-4 text-xl font-medium text-white">Your QR Code</h2>
              
              <div 
                ref={qrRef}
                className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-800 p-8"
                style={{ minHeight: `${qrSize}px` }}
              >
                {/* This would be the actual QR code in a real implementation */}
                <div 
                  className="flex items-center justify-center rounded-md" 
                  style={{ 
                    width: `${qrSize}px`, 
                    height: `${qrSize}px`, 
                    backgroundColor: backgroundColor
                  }}
                >
                  <div className="grid grid-cols-5 gap-2">
                    {Array(25).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className={`${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'} rounded-sm`}
                        style={{ 
                          width: `${qrSize/10}px`, 
                          height: `${qrSize/10}px`, 
                          backgroundColor: foregroundColor
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
                  <h3 className="mb-2 text-lg font-medium text-white">Tips for Better QR Codes</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">•</span>
                      Keep your URL short for faster scanning
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">•</span>
                      Ensure good contrast between foreground and background colors
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">•</span>
                      Test your QR code with different devices before printing
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">•</span>
                      Use higher error correction for printed materials
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button 
                    variant="outline" 
                    size="md" 
                    fullWidth
                    icon={<Download size={16} />}
                    onClick={handleDownload}
                  >
                    Download as PNG
                  </Button>
                  <Button 
                    variant="outline" 
                    size="md" 
                    fullWidth
                    icon={<Download size={16} />}
                    onClick={handleDownload}
                  >
                    Download as SVG
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;