import TopLeftRight from '../assets/curve-1.png';
import BottomLeft from '../assets/curve-2.png';
import PropTypes from 'prop-types';

const UserBanner = () => {
  return (
    <div className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 relative rounded-lg shadow-md p-6">
      <img
        src={TopLeftRight}
        alt="Top Left"
        className="absolute top-0 right-0 w-24 rounded-tr-lg"
      />
      <div className="pl-24 text-left">
        <p className="text-gray-300">
          {new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <h2 className="text-4xl font-medium mb-2 text-white">Welcome Back {`${name}!`}</h2>
        <p className="text-gray-300">Take full control of your profile.</p>
      </div>
      <img
        src={BottomLeft}
        alt="Bottom Left"
        className="absolute bottom-0 left-0 w-24 rounded-bl-lg"
      />
    </div>
  );
};

UserBanner.propTypes = {
  name: PropTypes.string.isRequired,
};

export default UserBanner;
