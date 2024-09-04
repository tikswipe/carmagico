import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { analyzeCarImage } from '../../lib/gemini';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Received POST request to /api/analyzeImage');
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        res.status(500).json({ error: 'Error parsing form data' });
        return;
      }

      console.log('Files received:', files);
      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      if (!file || !file.filepath) {
        console.error('No image file provided or filepath is undefined');
        res.status(400).json({ error: 'No valid image file provided' });
        return;
      }

      try {
        console.log('Reading file:', file.filepath);
        const imageBuffer = fs.readFileSync(file.filepath);
        console.log('Image buffer size:', imageBuffer.length);
        if (imageBuffer.length === 0) {
          throw new Error('Empty image buffer');
        }
        console.log('Calling analyzeCarImage function');
        const analysis = await analyzeCarImage(imageBuffer);
        console.log('Analysis result:', analysis);
        res.status(200).json(analysis);
      } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: 'Error analyzing image', details: error.message });
      } finally {
        try {
          fs.unlinkSync(file.filepath);
          console.log('Temporary file deleted');
        } catch (unlinkError) {
          console.error('Error deleting temporary file:', unlinkError);
        }
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}