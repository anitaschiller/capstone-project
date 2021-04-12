import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getCroppedImg from '../lib/cropImage';

export default function ImageCropper({
  member,
  setMember,
  setOpenImageCropper,
  selectedFileURL,
  setSelectedFileURL,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedFileURL,
        croppedAreaPixels
      );
      setOpenImageCropper(false);
      setSelectedFileURL(croppedImage);
      setMember({ ...member, image: croppedImage });
    } catch (event) {
      console.error(event);
    }
  }, [croppedAreaPixels]);

  return (
    <>
      <CropperWrapper>
        <Cropper
          image={selectedFileURL}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <ButtonWrapper>
          <Button onClick={showCroppedImage}>SAVE</Button>
        </ButtonWrapper>
      </CropperWrapper>
    </>
  );
}

const CropperWrapper = styled.div`
  .reactEasyCrop_Container {
    background: var(--white);
    overflow: visible;
  }
`;

const Button = styled.button`
  font-size: 14px;
  color: var(--white);
  background: var(--primary);
  margin: 1rem 0;
  padding: 0.5rem 0.7rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 5rem;
  right: 155px;
`;

ImageCropper.propTypes = {
  member: PropTypes.object,
  setMember: PropTypes.func,
  setOpenImageCropper: PropTypes.func,
  selectedFileURL: PropTypes.string,
  setSelectedFileURL: PropTypes.func,
};
