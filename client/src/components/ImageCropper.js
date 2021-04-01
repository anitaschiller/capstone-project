import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../lib/cropImage';
import styled from 'styled-components';

export default function ImageCropper({
  setOpenImageCropper,
  selectedFileURL,
  setSelectedFileURL,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  console.log('croppedAreaPixels', croppedAreaPixels);
  const [croppedImage, setCroppedImage] = useState(null);

  /* const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    window.localStorage.setItem(
      'croppedAreaPixels',
      JSON.stringify(croppedAreaPixels)
    );
  }, []); */

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    console.log('showCroppedImage');
    try {
      const croppedImage = await getCroppedImg(
        selectedFileURL,
        croppedAreaPixels
      );
      console.log('donee', { croppedImage });
      setCroppedImage(croppedImage);
      setOpenImageCropper(false);
      setSelectedFileURL(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <>
      <div>
        <Cropper
          image={selectedFileURL}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <Button onClick={showCroppedImage}>Show Result</Button>
      </div>
    </>
  );
}

const Button = styled.button`
  position: absolute;
  z-index: 100;
`;
