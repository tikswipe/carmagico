import React, { useState, useEffect } from 'react';
import styles from '../styles/Estimate.module.css';

interface ButtonGroupProps {
  handleUploadClick: () => void;
  handleCameraCapture: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  handleUploadClick,
  handleCameraCapture,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.buttonGroup}>
      <button onClick={handleUploadClick} className={`${styles.cameraButton} ${styles.uploadButton}`}>
        Upload Image
      </button>
      <button onClick={handleCameraCapture} className={`${styles.cameraButton} ${styles.photoButton}`}>
        Take Photo
      </button>
    </div>
  );
};

export default ButtonGroup;