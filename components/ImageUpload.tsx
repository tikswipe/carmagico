import React, { useState, useRef, useEffect } from 'react';

interface ImageUploadProps {
  step: number;
  onUpload: (file: File, preview: string) => void;
}

export default function ImageUpload({ step, onUpload }: ImageUploadProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      previewFile(file);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const confirmUpload = () => {
    if (fileInputRef.current?.files?.[0] && previewImage) {
      onUpload(fileInputRef.current.files[0], previewImage);
    } else if (cameraInputRef.current?.files?.[0] && previewImage) {
      onUpload(cameraInputRef.current.files[0], previewImage);
    }
  };

  const changePhoto = () => {
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="mb-8 text-center">
      <h2 className="text-xl font-bold mb-4">Step {step}: Upload Image</h2>
      {!previewImage ? (
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={triggerFileUpload}
            className="bg-gradient-orange-purple from-dark-orange to-purple-600 text-white font-bold py-2 px-6 rounded-full hover:from-dark-orange hover:to-purple-700 transition duration-300"
          >
            Upload Image
          </button>
          {isMobile && (
            <button 
              onClick={triggerCameraCapture}
              className="bg-gradient-orange-purple from-dark-orange to-purple-600 text-white font-bold py-2 px-6 rounded-full hover:from-dark-orange hover:to-purple-700 transition duration-300"
            >
              Take Picture
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <div className="max-w-sm mx-auto">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="w-full h-auto object-cover rounded-lg border-4 border-dark-orange shadow-lg"
            />
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={confirmUpload}
              className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              Submit
            </button>
            <button
              onClick={changePhoto}
              className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              {isMobile ? "Retake" : "Change"}
            </button>
          </div>
        </div>
      )}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
      {isMobile && (
        <input 
          type="file"
          ref={cameraInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          capture="environment"
          className="hidden"
        />
      )}
    </div>
  );
}