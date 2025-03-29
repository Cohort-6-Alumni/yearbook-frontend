import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchProfile from '../../hooks/useFetchProfile.jsx';
import Loader from '../../components/Loader.jsx';
import AvatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import instagramLogo from '../../assets/instagram.png';
import linkedinLogo from '../../assets/linkedin.png';
import { Card, CardBody, CardHeader, Typography, Alert } from '@material-tailwind/react';
import DOMPurify from 'dompurify';

const ReadOnlyProfile = () => {
  const { profileId } = useParams();
 
  const { data: profile, isLoading, error } = useFetchProfile(profileId);

  useEffect(() => {
    // Update document title when profile data loads
    if (profile) {
      document.title = `${profile.firstName} ${profile.lastName} | Yearbook`;
    } else {
      document.title = 'Profile | Yearbook';
    }
    
    return () => {
      document.title = 'Yearbook';
    };
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="red" className="mx-auto my-8 max-w-lg">
        <Typography className="font-medium">Error loading profile</Typography>
        <Typography className="mt-2 text-sm opacity-80">
          {error.message || "There was an error retrieving this profile. Please try again later."}
        </Typography>
      </Alert>
    );
  }

  if (!profile) {
    return (
      <Alert color="amber" className="mx-auto my-8 max-w-lg">
        <Typography className="font-medium">Profile not found</Typography>
        <Typography className="mt-2 text-sm opacity-80">
          The profile you&apos;re looking for doesn&apos;t exist or has been removed.
        </Typography>
      </Alert>
    );
  }

  return (
    <div className="w-full flex flex-col px-2 sm:px-4 md:px-6">
      {/* Profile Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
        {/* Profile Picture and Name */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row lg:flex-col lg:items-start 
                     space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-4
                     p-4 bg-white rounded-lg shadow-sm">
          <img
            className="w-[100px] h-[100px] sm:w-[80px] sm:h-[80px] lg:w-[120px] lg:h-[120px] 
                     rounded-full border border-gray-300 object-cover"
            src={profile?.picture || AvatarPlaceholder}
            alt={`${profile?.firstName || 'User'}'s avatar`}
          />

          <div className="flex flex-col text-center sm:text-left">
            <p className="text-xl font-bold text-gray-800">{`${profile?.firstName || ''} ${profile?.lastName || ''}`}</p>
            <p className="text-md text-gray-600">{profile?.currentRole}</p>
            <div className="mt-2">
              <p className="text-sm font-semibold">Bio:</p>
              <p className="text-sm text-gray-600 mt-1">{profile?.bio || 'No bio available'}</p>
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm">
          <div className="mb-3">
            <p className="text-sm font-semibold">Previous Field:</p>
            <p className="text-sm text-gray-600">{profile?.previousField || 'Not specified'}</p>
          </div>
          <div className="mb-3">
            <p className="text-sm font-semibold">Interests:</p>
            <p className="text-sm text-gray-600">{profile?.interests || 'Not specified'}</p>
          </div>
          {(profile?.instagram || profile?.linkedIn) && (
            <div className="flex items-center">
              <p className="text-sm font-semibold mr-2">Social:</p>
              <div className="flex space-x-3">
                {profile?.instagram && (
                  <a 
                    href={profile?.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    className="transition-transform hover:scale-110"
                  >
                    <img src={instagramLogo} alt="Instagram" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                )}
                {profile?.linkedIn && (
                  <a 
                    href={DOMPurify.sanitize(profile?.linkedIn)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="transition-transform hover:scale-110"
                  >
                    <img src={linkedinLogo} alt="LinkedIn" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Personal Info */}
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm">
          <div className="mb-3">
            <p className="text-sm font-semibold">Hobbies:</p>
            <p className="text-sm text-gray-600">{profile?.hobbies || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Favourite coding snack:</p>
            <p className="text-sm text-gray-600">{profile?.favoriteCodingSnack || 'Not specified'}</p>
          </div>
        </div>
      </div>

      {/* Favorite Quote - Preserve most of the original styling but make text responsive */}
      <div className="my-8 sm:my-12 px-4 py-6 sm:py-8 bg-gray-50 rounded-lg shadow-sm">
        <div className="text-center mb-4">
          <Typography variant="h5" className="font-medium text-gray-800">Favourite Quote</Typography>
        </div>
        <div className="flex justify-center text-center">
          <Typography variant="paragraph" className="font-light text-lg sm:text-xl italic max-w-2xl">
            &ldquo;{profile?.favoriteQuote || 'No quote available'}&rdquo;
          </Typography>
        </div>
      </div>

      {/* Q&A Cards - Adjust columns for different screen sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card className="overflow-hidden">
          <CardHeader 
            shadow={false} 
            floated={false} 
            className="bg-white py-2 sm:py-3 px-3 sm:px-4 border-b"
          >
            <Typography variant="h6" className="text-sm sm:text-base">
              Most Likely To {profile?.mostLikelyToQuestion || ''}?
            </Typography>
          </CardHeader>
          <CardBody className="bg-gray-50 p-3 sm:p-4">
            <Typography className="text-gray-700 text-sm sm:text-base">
              {profile?.mostLikelyToAnswer || 'Not answered'}
            </Typography>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader 
            shadow={false} 
            floated={false} 
            className="bg-white py-2 sm:py-3 px-3 sm:px-4 border-b"
          >
            <Typography variant="h6" className="text-sm sm:text-base">
              Most memorable Bootcamp moment?
            </Typography>
          </CardHeader>
          <CardBody className="bg-gray-50 p-3 sm:p-4">
            <Typography className="text-gray-700 text-sm sm:text-base">
              {profile?.mostMemorableBootcampMoment || 'Not answered'}
            </Typography>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader 
            shadow={false} 
            floated={false} 
            className="bg-white py-2 sm:py-3 px-3 sm:px-4 border-b"
          >
            <Typography variant="h6" className="text-sm sm:text-base">
              Last words
            </Typography>
          </CardHeader>
          <CardBody className="bg-gray-50 p-3 sm:p-4">
            <Typography className="text-gray-700 text-sm sm:text-base">
              {profile?.lastWords || 'Not answered'}
            </Typography>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader 
            shadow={false} 
            floated={false} 
            className="bg-white py-2 sm:py-3 px-3 sm:px-4 border-b"
          >
            <Typography variant="h6" className="text-sm sm:text-base">
              Advice for future cohort
            </Typography>
          </CardHeader>
          <CardBody className="bg-gray-50 p-3 sm:p-4">
            <Typography className="text-gray-700 text-sm sm:text-base">
              {profile?.adviceForFutureCohort || 'Not answered'}
            </Typography>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader 
            shadow={false} 
            floated={false} 
            className="bg-white py-2 sm:py-3 px-3 sm:px-4 border-b"
          >
            <Typography variant="h6" className="text-sm sm:text-base">
              Biggest Challenge?
            </Typography>
          </CardHeader>
          <CardBody className="bg-gray-50 p-3 sm:p-4">
            <Typography className="text-gray-700 text-sm sm:text-base">
              {profile?.biggestChallenge || 'Not answered'}
            </Typography>
          </CardBody>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader 
            shadow={false} 
            floated={false} 
            className="bg-white py-2 sm:py-3 px-3 sm:px-4 border-b"
          >
            <Typography variant="h6" className="text-sm sm:text-base">
              How you overcame it?
            </Typography>
          </CardHeader>
          <CardBody className="bg-gray-50 p-3 sm:p-4">
            <Typography className="text-gray-700 text-sm sm:text-base">
              {profile?.howYouOvercameIt || 'Not answered'}
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ReadOnlyProfile;