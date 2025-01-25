import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router';

const ErrorPage = ({ code, message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Typography variant="h1" color="red" className="mb-0">
        {code}
      </Typography>
      <Typography variant="h5" color="gray">
        {message}
      </Typography>
      <Link to="/" className="text-blue-500 mt-1 hover:underline">
        Go back to home
      </Link>
    </div>
  );
};

ErrorPage.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string,
};

export default ErrorPage;
