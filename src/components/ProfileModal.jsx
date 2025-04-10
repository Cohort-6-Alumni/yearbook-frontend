import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import { updateProfile } from '../api';
import { useNavigate } from 'react-router';
import ProfileData from '../data/ProfileData.js';
import useAuth from '../hooks/useAuth';

const ProfileModal = ({ openProp, onClose }) => {
  const [open, setOpen] = useState(openProp);
  const { setUserData, getToken } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const createProfile = async () => {
    const token = getToken();
    try {
      const response = await updateProfile(token, ProfileData);
      setUserData(response.data);
      const profileId = response.data.profileId;
      handleClose();
      navigate(`/user/profile/${profileId}/edit`);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  return (
    
      <Dialog open={open} handler={handleClose}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray" className="text-center">
            Your Attention is Required!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            You should read this!
          </Typography>
          <Typography className="text-center font-normal">
            Current user does not have a Profile, Would you like to create one?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleClose}>
            close
          </Button>
          <Button variant="gradient" onClick={createProfile}>
            Create profile
          </Button>
        </DialogFooter>
      </Dialog>
    
  );
};

ProfileModal.propTypes = {
  openProp: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ProfileModal;
