import { useState } from 'react';

interface EstimateDisplayProps {
  estimate: { min: number; max: number };
  imagePreview: string;
  onGetExactRange: () => void;
}

export default function EstimateDisplay({ estimate, imagePreview, onGetExactRange }: EstimateDisplayProps) {
  // Round to nearest thousand
  const roundedMin = Math.round(estimate.min / 1000) * 1000;
  const roundedMax = Math.round(estimate.max / 1000) * 1000;

  // Increase the range to make it more ambiguous
  const ambiguousMin = roundedMin - 2000;
  const ambiguousMax = roundedMax + 2000;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 flex flex-col items-center">
      <div className="mb-4 flex justify-center items-center">
        <img 
          src={imagePreview} 
          alt="Car Preview" 
          className="w-full h-auto object-cover rounded-lg border-2 border-dark-orange max-w-[200px] max-h-[150px] sm:max-w-[250px] sm:max-h-[180px]"
        />
      </div>
      <div className="text-center">
        <p className="text-lg mb-2">Your car's estimated value range:</p>
        <p className="text-2xl sm:text-3xl font-bold text-dark-orange">
          ${ambiguousMin.toLocaleString()} - ${ambiguousMax.toLocaleString()}
        </p>
        <div className="mt-6">
          <p className="text-lg mb-2">Want an exact price range?</p>
          <p className="text-sm text-gray-600 mb-4">
            Upload 2 more images in the next step for a more accurate valuation.
          </p>
          <button 
            onClick={onGetExactRange}
            className="bg-gradient-orange-purple from-dark-orange to-purple-600 text-white font-bold py-2 px-6 rounded-full hover:from-dark-orange hover:to-purple-700 transition duration-300"
          >
            Get Exact Price Range
          </button>
        </div>
      </div>
    </div>
  );
}