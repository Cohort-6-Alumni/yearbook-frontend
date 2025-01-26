import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from '@material-tailwind/react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import PropTypes from 'prop-types';
import { resizeImage } from '../utils/Helper.js';

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

  if (!modalIsOpen) return null;

  // Ensure document.body is available
  if (typeof document === 'undefined' || !document.body) {
    return null;
  }

  return ReactDOM.createPortal(
    <Dialog size="sm" open={modalIsOpen} handler={closeModal}>
      <DialogHeader className="flex flex-col items-center m-0 p-0">
        <Typography className="text-black text-lg font-semibold mt-2 mb-2">
          Crop Photo
        </Typography>
      </DialogHeader>

      <DialogBody className="overflow-auto max-h-[60vh] " divider>
        <Cropper ref={cropperRef} src={image} className={'cropper'} aspectRatio={1} />
      </DialogBody>

      <DialogFooter className="flex justify-end mt-4 gap-2">
        <Button color="blue" fullWidth onClick={cropImage}>
          Crop
        </Button>
        <Button color="red" fullWidth variant="filled" onClick={closeModal}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>,
    document.body
  );
};

ImageCropper.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  uploadImageData: PropTypes.string.isRequired,
  setImageSrc: PropTypes.func.isRequired,
};

export default ImageCropper;