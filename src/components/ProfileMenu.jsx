import React, { createElement } from 'react';
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from '@material-tailwind/react';
import { IoPersonCircleOutline, IoCogSharp, IoPowerSharp } from 'react-icons/io5';
import AvatarPlaceholder from '../assets/Profile_avatar_placeholder_large.png';
import PropTypes from 'prop-types';
import { AppContext } from '../context/contextApi';
import { useNavigate } from 'react-router';



const ProfileMenu = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { logout } = React.useContext(AppContext);
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  // profile menu component
  const profileMenuItems = [
    {
      label: 'My Account',
      icon: IoPersonCircleOutline,
      onClick: () => navigate('/user/details'),
    },
    {
      label: 'Edit Profile',
      icon: IoCogSharp,
      onClick: () => closeMenu(),
    },
    {
      label: 'Sign Out',
      icon: IoPowerSharp,
      onClick: () => handleLogout(),
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="user image"
            className="border border-gray-900 p-0.5 w-12 h-12"
            src={AvatarPlaceholder}
          />
          <div className="flex flex-col">
            <Typography
              variant="paragraph"
              className="hidden lg:block text-sm text-black font-semibold"
            >
              {user?.username}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="hidden lg:block text-xs text-left"
            >
              {user?.role}
            </Typography>
          </div>
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={onClick}
              className={`flex items-center gap-2 rounded ${
                isLastItem ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10' : ''
              }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

ProfileMenu.propTypes = {
  user: PropTypes.object,
};

export default ProfileMenu;
