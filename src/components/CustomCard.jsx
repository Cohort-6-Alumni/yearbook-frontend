import { useContext } from 'react';
import { useNavigate } from 'react-router';
import instagramLogo from '../assets/instagram.png';
import linkedin from '../assets/linkedin.png';
import { AppContext } from '../context/contextApi.jsx';
import PropTypes from 'prop-types';

const CustomCard = ({
  bio,
  previousField,
  hobbies,
  instagram,
  firstName,
  lastName,
  picture,
  id,
}) => {
  const navigate = useNavigate();
  const { getUserProfilesCxt } = useContext(AppContext);
  console.log('CUSTOM CARD', getUserProfilesCxt());

  const handleClick = () => {
    navigate(`/public_profile/${id}`);
  };

  return (
    <div
      className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center mb-2">
        <img
          className="w-[120px] h-[120px] rounded-full border border-gray-300"
          src={picture}
          alt="Avatar"
        />
        <div className="ml-4 w-full">
          <div className="flex items-center gap-2">
            <h5 className="text-lg text-gray-800 font-bold mb-1">{firstName}</h5>
            <h5 className="text-lg text-gray-800 font-bold mb-1">{lastName}</h5>
          </div>

          <p className="text-sm text-gray-500">Software Engineer</p>
          <div className={'w-full space-x-1'}>
            <span className="text-gray-500 text-[12px]">Bio:</span>
            <span className="text-gray-500 text-[12px]">{bio}</span>
          </div>
        </div>
      </div>

      <div className=" w-full flex items-center mb-2 space-x-2 text-left">
        <p className="text-[14px] font-semibold tracking-tight text-gray-800">Previous field:</p>
        <p className="text-[14px] font-medium text-gray-800">{previousField}</p>
      </div>

      <div className=" w-full flex items-center mb-2 text-left space-x-2 pl-8">
        <p className="text-[14px] font-semibold tracking-tight text-gray-800 ">Hobbies:</p>
        <div className={' flex items-center'}>
          <p className="text-[14px] font-medium text-gray-800">{hobbies}</p>
        </div>
      </div>

      <div className=" w-full flex justify-center items-center space-x-2">
        <div className={' flex items-center space-x-1'}>
          <img
            className="w-[14px] h-[14px] rounded-full border border-gray-300"
            src={linkedin}
            alt="Avatar"
          />
          <p className="text-[13px] font-light tracking-tight text-gray-800 ">Ammyforreal</p>
        </div>

        <div className={' flex items-center space-x-1'}>
          <img
            className="w-[14px] h-[14px] rounded-full border border-gray-300"
            src={instagramLogo}
            alt="Avatar"
          />
          <p className="text-[13px] font-light tracking-tight text-gray-800 ">{instagram}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;

CustomCard.propTypes = {
  bio: PropTypes.string,
  previousField: PropTypes.string,
  hobbies: PropTypes.array,
  instagram: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  picture: PropTypes.string,
  id: PropTypes.string,
};
