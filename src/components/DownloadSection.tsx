import { useState } from 'react';
import { Download, Check, Image as ImageIcon } from 'lucide-react';
import { Component } from '../types/component';

interface DownloadSectionProps {
  component: Component;
}

export default function DownloadSection({ component }: DownloadSectionProps) {
  const [downloadedImage, setDownloadedImage] = useState<string | null>(null);

  const downloadImage = async (imagePath: string, imageName: string) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = imageName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadedImage(imagePath);
      setTimeout(() => setDownloadedImage(null), 2000);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <ImageIcon className="text-blue-500" size={24} />
        <h3 className="text-xl font-semibold">Download Images</h3>
      </div>
      
      <p className="text-gray-400 mb-6">
        Download image assets for this component.
      </p>

      {component.images && component.images.length > 0 ? (
        <div className="space-y-3">
          {component.images.map((image) => (
            <button
              key={image.path}
              onClick={() => downloadImage(image.path, image.name)}
              className="w-full flex items-center justify-between p-4 bg-dark-bg border border-dark-border rounded-lg hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ImageIcon size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                <div className="text-left">
                  <div className="font-medium text-white">{image.name}</div>
                  {image.description && (
                    <div className="text-sm text-gray-400">{image.description}</div>
                  )}
                </div>
              </div>
              {downloadedImage === image.path ? (
                <div className="flex items-center gap-2 text-green-400">
                  <Check size={18} />
                  <span className="text-sm">Downloaded!</span>
                </div>
              ) : (
                <Download size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <ImageIcon size={48} className="mx-auto mb-3 opacity-50" />
          <p>No images available for this component.</p>
        </div>
      )}
    </div>
  );
}

