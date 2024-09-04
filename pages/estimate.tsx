import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/Estimate.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

const EstimatePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<CarAnalysis | null>(null);
  const [history, setHistory] = useState<CarAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem('carAnalysisHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }

    return () => {
      localStorage.removeItem('carAnalysisHistory');
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
      setSelectedFile(file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      console.log('Sending request to analyze image...');
      console.log('File being sent:', selectedFile.name, 'Size:', selectedFile.size, 'Type:', selectedFile.type);
      const response = await fetch('/api/analyzeImage', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (response.ok) {
        try {
          const result: CarAnalysis = JSON.parse(responseText);
          console.log('Analysis result:', result);
          setAnalysisResult(result);
          setHistory(prevHistory => {
            const newHistory = [result, ...prevHistory];
            localStorage.setItem('carAnalysisHistory', JSON.stringify(newHistory));
            return newHistory;
          });
        } catch (parseError) {
          console.error('Error parsing JSON response:', parseError);
          alert('Error parsing the analysis result. Please try again.');
        }
      } else {
        console.error('Image analysis failed');
        console.error('Error details:', responseText);
        alert(`Image analysis failed: ${responseText}`);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeImage = () => {
    setSelectedFile(null);
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Estimate Your Car's Value</h1>
        <p className={styles.description}>
          Upload a photo of your car and get an instant AI-powered valuation.
        </p>
        <div className={styles.uploadSection}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            className={styles.fileInput}
          />
          {!uploadedImage ? (
            <button onClick={handleCameraCapture} className={styles.cameraButton}>
              Take Photo or Upload Image
            </button>
          ) : (
            <div className={styles.buttonGroup}>
              <button onClick={handleUpload} disabled={isLoading} className={`${styles.analyzeButton} ${styles.redButton}`}>
                {isLoading ? 'Analyzing...' : 'Analyze Image'}
              </button>
              <button onClick={handleChangeImage} className={`${styles.changeButton} ${styles.redButton}`}>
                Change Image
              </button>
            </div>
          )}
        </div>
        {uploadedImage && (
          <div className={styles.imagePreview}>
            <Image src={uploadedImage} alt="Uploaded car" width={300} height={200} objectFit="cover" />
            {isLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.spinner}></div>
              </div>
            )}
          </div>
        )}
        {analysisResult && (
          <div className={styles.analysisResult}>
            <h2>Analysis Result</h2>
            <p><strong>Manufacturer:</strong> {analysisResult.manufacturer}</p>
            <p><strong>Model:</strong> {analysisResult.model}</p>
            <p><strong>Year:</strong> {analysisResult.year}</p>
            <p><strong>Condition:</strong> {analysisResult.condition}</p>
            <p className={styles.priceEstimate}>
              Estimated Value Range: ${analysisResult.estimatedValue.low.toLocaleString()} - ${analysisResult.estimatedValue.high.toLocaleString()}
            </p>
            <h3>Features:</h3>
            <ul className={styles.featuresList}>
              {analysisResult.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        {history.length > 0 && (
          <div className={styles.history}>
            <h2>Recent Analyses</h2>
            <ul className={styles.historyList}>
              {history.map((item, index) => (
                <li key={index}>
                  {item.year} {item.manufacturer} {item.model}: 
                  ${item.estimatedValue.low.toLocaleString()} - ${item.estimatedValue.high.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EstimatePage;