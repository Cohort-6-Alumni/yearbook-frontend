import { useState, useRef } from 'react';
// import Modal from 'react-modal';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import PropTypes from 'prop-types';
import { resizeImage } from '../utils/Helper.js';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';

const ImageCropper = ({ modalIsOpen, closeModal, uploadImageData, setImageSrc }) => {
  const cropperRef = useRef();
  const [image] = useState(uploadImageData);

  const cropImage = async () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      const resizedImage = await resizeImage(canvas.toDataURL());
      setImageSrc(resizedImage);
      closeModal();
    }
  };
  return (
    <Dialog size="xs" open={modalIsOpen} handler={closeModal}>
      <DialogHeader className="flex flex-col items-center">
        <Typography className="text-gray-600 text-lg font-semibold mt-2 mb-2">
          Crop Photo
        </Typography>
      </DialogHeader>

      <DialogBody>
        <Cropper ref={cropperRef} src={image} className={'cropper'} aspectRatio={1} />
      </DialogBody>

      <DialogFooter className="flex justify-end mt-8 gap-2">
        <Button color="blue" fullWidth onClick={cropImage}>
          Crop
        </Button>
        <Button color="red" fullWidth variant="filled" onClick={closeModal}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

ImageCropper.propTypes = {
  modalIsOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  uploadImageData: PropTypes.string,
  setImageSrc: PropTypes.func,
};

export default ImageCropper;
