import { GoogleGenerativeAI } from '@google/generative-ai';

console.log('API Key:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

interface CarAnalysis {
  manufacturer: string;
  model: string;
  year: string;
  estimatedValue: {
    low: number;
    high: number;
  };
  condition: string;
  features: string[];
}

function extractJSONFromMarkdown(text: string): string {
  const jsonRegex = /```json\n([\s\S]*?)\n```/;
  const match = text.match(jsonRegex);
  if (match && match[1]) {
    return match[1].trim();
  }
  throw new Error("No JSON found in the response");
}

export async function analyzeCarImage(imageBuffer: Buffer): Promise<CarAnalysis> {
  console.log('Entering analyzeCarImage function');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Analyze this car image and provide the following information:
  1. Manufacturer
  2. Model
  3. Estimated year
  4. Estimated value range (low and high)
  5. Apparent condition
  6. Notable features

  Format the response as a JSON object with the following structure:
  {
    "manufacturer": "Brand Name",
    "model": "Model Name",
    "year": "YYYY",
    "estimatedValue": {
      "low": 00000,
      "high": 00000
    },
    "condition": "Condition description",
    "features": ["feature 1", "feature 2", ...]
  }

  Wrap the JSON response in a markdown code block with the language specified as json.`;

  const imagePart = {
    inlineData: {
      data: imageBuffer.toString('base64'),
      mimeType: 'image/webp' // or 'image/jpeg' or 'image/png' depending on the uploaded file type
    }
  };

  try {
    console.log('Sending request to Gemini API');
    const result = await model.generateContent([prompt, imagePart]);
    console.log('Received response from Gemini API');
    const response = await result.response;
    const text = response.text();
    console.log('Raw response text:', text);
    const jsonString = extractJSONFromMarkdown(text);
    const parsedData = JSON.parse(jsonString);

    if (!parsedData.manufacturer || !parsedData.model) {
      throw new Error("Invalid response format");
    }

    return parsedData;
  } catch (error) {
    console.error('Error in Gemini API call:', error);
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse the API response. Please try again.');
    }
    if (error instanceof Error && error.message.includes('model')) {
      throw new Error('Issue with the AI model. Please try again later or contact support.');
    }
    throw new Error('Failed to analyze the image. Please try again.');
  }
}