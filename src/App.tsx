import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function App() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(60);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const presetColors = [
    { name: 'Classic', bg: '#ffffff', fg: '#000000' },
    { name: 'Blue', bg: '#ffffff', fg: '#1e40af' },
    { name: 'Green', bg: '#f0fdf4', fg: '#166534' },
    { name: 'Purple', bg: '#faf5ff', fg: '#6b21a8' },
    { name: 'Red', bg: '#fef2f2', fg: '#991b1b' },
    { name: 'Dark', bg: '#1f2937', fg: '#ffffff' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">QR Code Generator</h1>
          <p className="text-gray-600">Create custom QR codes with colors and logos</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text or URL
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Size Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size: {size}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>128px</span>
                <span>512px</span>
              </div>
            </div>

            {/* Color Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preset Colors
              </label>
              <div className="grid grid-cols-3 gap-2">
                {presetColors.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setBgColor(preset.bg);
                      setFgColor(preset.fg);
                    }}
                    className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 hover:border-blue-400 transition-all"
                    style={{ backgroundColor: preset.bg, color: preset.fg }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foreground
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Overlay
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all"
                >
                  {logo ? 'Change Logo' : 'Upload Logo'}
                </button>
                {logo && (
                  <button
                    onClick={() => setLogo(null)}
                    className="px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                  >
                    Remove
                  </button>
                )}
              </div>
              {logo && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Size: {logoSize}px
                  </label>
                  <input
                    type="range"
                    min="30"
                    max={Math.min(size / 2, 120)}
                    value={logoSize}
                    onChange={(e) => setLogoSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Preview</h2>
            <div
              className="flex-1 flex items-center justify-center rounded-xl p-8"
              style={{ backgroundColor: bgColor }}
            >
              <div className="relative">
                <QRCodeCanvas
                  value={text || ' '}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={false}
                />
                {logo && (
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-1 shadow-md"
                    style={{
                      width: logoSize + 8,
                      height: logoSize + 8,
                    }}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Download QR Code
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Tip: Use high contrast colors for better scanability</p>
        </div>
      </div>
    </div>
  );
}
