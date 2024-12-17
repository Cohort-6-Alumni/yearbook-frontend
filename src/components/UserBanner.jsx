import { Card, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import CurveImage1 from '../assets/curve-1.png';
import CurveImage2 from '../assets/curve-2.png';

const UserBanner = () => {
  return (
    <Card className="m-6 bg-gradient-to-r from-purple-500 to-blue-500 relative">
      <CardBody>
        <img src={CurveImage1} alt="..." className="absolute top-0 right-0 rounded-tr-md size-32" />

        <Typography variant="caption" className="mb-2 text-blue-gray-200">
          {new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        <Typography variant="h3" color="white" className="mb-2">
          Welcome back, John!
        </Typography>
        <Typography variant="body2" color="white"></Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <img
          src={CurveImage2}
          alt="..."
          className="absolute bottom-0 left-0 rounded-bl-md size-28"
        />
        <div className='mr-16'>
          <Typography variant="caption" className="mb-2 text-blue-gray-200">
            Take full control of your Profile
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserBanner;
