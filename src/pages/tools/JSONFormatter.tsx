import React, { useState } from 'react';
import { Copy, Download, Upload, Check, Trash2, Code } from 'lucide-react';
import Button from '../../components/ui/Button';

const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('{"name": "John", "age": 30, "city": "New York"}');
  const [output, setOutput] = useState('');
  const [indentation, setIndentation] = useState(2);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const formatJSON = () => {
    try {
      const parsedJSON = JSON.parse(input);
      const formattedJSON = JSON.stringify(parsedJSON, null, indentation);
      setOutput(formattedJSON);
      setError('');
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setOutput('');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  
  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };
  
  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInput(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-950 pb-16">
      <div className="bg-gray-900/50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-3xl font-bold text-white">JSON Formatter</h1>
          <p className="text-gray-400">Format, validate and beautify your JSON data.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Input Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-medium text-white">Input JSON</h2>
              <div className="flex space-x-2">
                <label className="cursor-pointer rounded-md bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-700">
                  <Upload size={14} className="mr-1 inline" />
                  Upload
                  <input 
                    type="file" 
                    accept=".json,application/json" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
                <button 
                  onClick={handleClear}
                  className="rounded-md bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-700"
                >
                  <Trash2 size={14} className="mr-1 inline" />
                  Clear
                </button>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-800 bg-gray-900">
              <textarea
                value={input}
                onChange={handleInputChange}
                className="min-h-[300px] w-full rounded-lg border-0 bg-gray-900 p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                placeholder="Paste your JSON here..."
              ></textarea>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                size="md" 
                onClick={formatJSON}
                icon={<Code size={16} />}
              >
                Format & Validate
              </Button>
              
              <div className="flex items-center rounded-md border border-gray-700 bg-gray-800 px-3">
                <span className="mr-2 text-sm text-gray-400">Spaces:</span>
                <select
                  value={indentation}
                  onChange={(e) => setIndentation(Number(e.target.value))}
                  className="rounded-md border-0 bg-gray-800 py-1 text-sm text-white focus:outline-none focus:ring-0"
                >
                  <option value={0}>0</option>
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Output Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-medium text-white">Result</h2>
              {output && (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleCopy}
                    className="rounded-md bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-700"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="mr-1 inline text-green-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="mr-1 inline" />
                        Copy
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="rounded-md bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-700"
                  >
                    <Download size={14} className="mr-1 inline" />
                    Download
                  </button>
                </div>
              )}
            </div>
            
            <div className="rounded-lg border border-gray-800 bg-gray-900">
              {error ? (
                <div className="min-h-[300px] w-full rounded-lg bg-red-900/20 p-4 text-red-400">
                  {error}
                </div>
              ) : output ? (
                <pre className="min-h-[300px] w-full overflow-auto rounded-lg bg-gray-900 p-4 text-green-400">
                  {output}
                </pre>
              ) : (
                <div className="flex min-h-[300px] w-full items-center justify-center rounded-lg bg-gray-900 p-4 text-gray-500">
                  Format your JSON to see the result here
                </div>
              )}
            </div>
            
            {output && !error && (
              <div className="mt-4 rounded-md bg-green-900/20 p-3 text-sm text-green-400">
                <Check size={16} className="mr-1 inline" />
                Valid JSON format
              </div>
            )}
          </div>
        </div>
        
        {/* Tips Section */}
        <div className="mt-8 rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl font-medium text-white">JSON Formatting Tips</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-4">
              <h3 className="mb-2 text-lg font-medium text-white">Common JSON Errors</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Missing or extra commas between elements</li>
                <li>• Using single quotes instead of double quotes</li>
                <li>• Trailing commas in arrays or objects</li>
                <li>• Unquoted property names</li>
              </ul>
            </div>
            
            <div className="rounded-lg bg-gray-800 p-4">
              <h3 className="mb-2 text-lg font-medium text-white">JSON Data Types</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• String: <code className="text-purple-400">"text"</code></li>
                <li>• Number: <code className="text-green-400">42, 3.14</code></li>
                <li>• Boolean: <code className="text-blue-400">true, false</code></li>
                <li>• Null: <code className="text-red-400">null</code></li>
                <li>• Array: <code className="text-yellow-400">[1, 2, 3]</code></li>
                <li>• Object: <code className="text-pink-400">{"{"}"name": "value"{"}"}</code></li>
              </ul>
            </div>
            
            <div className="rounded-lg bg-gray-800 p-4">
              <h3 className="mb-2 text-lg font-medium text-white">Best Practices</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Use consistent indentation (2 or 4 spaces)</li>
                <li>• Keep property names simple and descriptive</li>
                <li>• Validate JSON before using in production</li>
                <li>• Consider minification for production use</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;