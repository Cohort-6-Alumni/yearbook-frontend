import { Card, CardBody, CardFooter, Typography, Tooltip, CardHeader } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
// import { useContext } from 'react';
// import { AppContext } from '../context/contextApi.jsx';
import instagramLogo from '../assets/instagram.png';
import linkedinLogo from '../assets/linkedin.png';

const ProfileCard = ({
  firstName,
  lastName,
  picture,
  id,
  currentRole,
  instagram = '',
  linkedIn = '',
}) => {
  const navigate = useNavigate();
  //   const { getUserProfilesCxt } = useContext(AppContext);

  const handleClick = () => {
    navigate(`/profile/${id}`);
  };
  return (
    <Card className="max-w-xs mx-auto h-80 cursor-pointer" onClick={handleClick}>
      <CardBody className="text-center pt-6">
        <img
          src={picture}
          alt="profile-picture"
          className="object-cover w-[200px] h-[150px] mx-auto rounded-t-lg"
        />
        <Typography variant="h6" color="blue-gray" className="my-1">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography color="blue-gray" className="font-light text-sm">
          {currentRole}
        </Typography>
      </CardBody>
      {/* <CardFooter className="flex justify-center gap-4 pb-4 pt-1">
        {linkedIn && (
          <Tooltip content="LinkedIn">
            <a href={linkedIn} target="_blank" rel="noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" className="w-5 h-5" />
            </a>
          </Tooltip>
        )}
        {instagram && (
          <Tooltip content="Instagram">
            <a href={instagram} target="_blank" rel="noreferrer">
              <img src={instagramLogo} alt="Instagram" className="w-5 h-5" />
            </a>
          </Tooltip>
        )}
      </CardFooter> */}
      <CardFooter className="flex justify-center gap-4 pb-4 pt-1">
        <Tooltip content="LinkedIn">
          <a
            href={linkedIn || '#'}
            target={linkedIn ? '_blank' : '_self'}
            rel="noreferrer"
            className={!linkedIn ? 'opacity-50 pointer-events-none' : ''}
          >
            <img src={linkedinLogo} alt="LinkedIn" className="w-5 h-5" />
          </a>
        </Tooltip>
        <Tooltip content="Instagram">
          <a
            href={instagram || '#'}
            target={instagram ? '_blank' : '_self'}
            rel="noreferrer"
            className={!instagram ? 'opacity-50 pointer-events-none' : ''}
          >
            <img src={instagramLogo} alt="Instagram" className="w-5 h-5" />
          </a>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;

ProfileCard.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  picture: PropTypes.string,
  id: PropTypes.string,
  currentRole: PropTypes.string,
  instagram: PropTypes.string,
  linkedIn: PropTypes.string,
};
