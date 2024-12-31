import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Typography, Avatar } from '@material-tailwind/react';

const ContributorCard = ({ avatarUrl, fullName, githubHandle }) => {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg">
      <CardBody className="flex items-center gap-4">
        <Avatar
          src={avatarUrl}
          alt={`Avatar of ${fullName}`}
          className="w-16 h-16 border-2 border-gray-300"
        />
        <div className="flex flex-col">
          <Typography variant="h6" className="font-semibold">
            {fullName || githubHandle}
          </Typography>
          <Typography variant="small" className="text-gray-600">
            @{githubHandle}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

ContributorCard.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  fullName: PropTypes.string,
  githubHandle: PropTypes.string.isRequired,
};

export default ContributorCard;
