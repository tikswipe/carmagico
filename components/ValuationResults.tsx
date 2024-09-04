import React from 'react';

interface ValuationResultProps {
  valuation: {
    estimatedValue: number;
    currency: string;
  };
}

const ValuationResult: React.FC<ValuationResultProps> = ({ valuation }) => {
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8">
      <p className="font-bold">Estimated Car Value:</p>
      <p className="text-2xl">{valuation.currency} {valuation.estimatedValue.toLocaleString()}</p>
    </div>
  );
}

export default ValuationResult;