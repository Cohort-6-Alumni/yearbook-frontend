import { useEffect } from 'react';
import { useParams } from 'react-router';
import useFetchProfile from '../../hooks/useFetchProfile.jsx';
import Loader from '../../components/Loader.jsx';
import AvatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import instagramLogo from '../../assets/instagram.png';
import linkedinLogo from '../../assets/linkedin.png';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';

const ReadOnlyProfile = () => {
  const params = useParams();
  const { profile, loading, error } = useFetchProfile(params.profileId);

  useEffect(() => {
    document.title = 'Profile | Yearbook';
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.error(error);
  }

  return (
    <div className={'w-full flex flex-col'}>
      <div className="grid  grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={'flex space-x-2 pt-6'}>
          <img
            className="w-[120px] h-[120px] rounded-full border border-gray-300"
            src={profile?.picture || AvatarPlaceholder}
            alt="Avatar"
          />

          <div className="ml-4 w-full flex flex-col">
            <div className="flex items-center ">
              <p className="text-medium text-gray-800 font-bold mb-1">{`${profile?.firstName || ''} ${profile?.lastName || ''}`}</p>
            </div>
            <p className="text-sm font-normal text-wrap">{profile?.currentRole}</p>
            <div className={'flex space-x-1 text-nowrap'}>
              <p className={'text-sm font-semibold'}>Bio:</p>
              <p className={'text-sm font-normal text-wrap'}>{profile?.bio || ''}</p>
            </div>
          </div>
        </div>
        <div className={'flex flex-col w-full pt-6'}>
          <div className={'flex space-x-2 mb-2'}>
            <p className={'text-sm font-semibold'}>Previous Field:</p>
            <p className={'text-sm font-normal'}>{` ${profile?.previousField || ''}`}</p>
          </div>
          <div className={'flex space-x-2 mb-2'}>
            <p className={'text-sm font-semibold'}>Interests:</p>
            <p className={'text-sm font-normal'}>{` ${profile?.interests || ''}`}</p>
          </div>
          {(profile?.instagram || profile?.linkedIn) && (
            <div className={'flex space-x-2 '}>
              <p className={'text-sm font-semibold'}>Social:</p>
              {profile?.instagram && (
                <a href={profile?.instagram} target="_blank" rel="noreferrer">
                  <img src={instagramLogo} alt="Instagram" className="w-5 h-5" />
                </a>
              )}
              {profile?.linkedIn && (
                <a href={profile?.linkedIn} target="_blank" rel="noreferrer">
                  <img src={linkedinLogo} alt="LinkedIn" className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className={'flex flex-col w-full pt-6'}>
          <div className={'flex space-x-2 mb-2'}>
            <p className={'text-sm font-semibold'}>Hobbies:</p>{' '}
            <p className={'text-sm font-normal'}>{` ${profile?.hobbies || ''}`}</p>
          </div>
          <div className={'flex space-x-1 text-nowrap'}>
            <p className={'text-sm font-semibold'}>Favourite coding snack:</p>
            <p
              className={'text-sm font-normal text-wrap'}
            >{`${profile?.favoriteCodingSnack || ''}`}</p>
          </div>
        </div>
      </div>
      <div className={'w-full flex flex-col m-20'}>
        <div className={'w-full flex justify-center items-center'}>
          <p className={'font-medium text-[26px] mb-8'}>Favourite Quote</p>
        </div>
        <div className={'flex w-full items-center justify-center text-center'}>
          <p className={'font-extralight text-[22px] italic'}>{profile?.favoriteQuote || ''}</p>
        </div>
      </div>

      <div className={'w-full flex flex-col'}>
        <Card className="mb-4">
          <CardHeader floated={false} shadow={false} className="m-3">
            <Typography variant="h6" color="black">
              Most Likely To {profile?.mostLikelyToQuestion || ''}?
            </Typography>
          </CardHeader>
          <hr className="border-1" />
          <CardBody className={'bg-[#F6F6F6] p-3'}>
            <Typography variant="body2" color="gray">
              {profile?.mostLikelyToAnswer || ''}
            </Typography>
          </CardBody>
        </Card>
        <Card className={'mb-4'}>
          <CardHeader floated={false} shadow={false} className="m-3">
            <Typography variant="h6" color="black">
              Most memorable training program moment?
            </Typography>
          </CardHeader>
          <hr className="border-1" />
          <CardBody className={'bg-[#F6F6F6] p-3'}>
            <Typography variant="body2" color="gray">
              {profile?.mostMemorableTrainingProgramMoment || ''}
            </Typography>
          </CardBody>
        </Card>

        <Card className={'mb-4'}>
          <CardHeader floated={false} shadow={false} className="m-3">
            <Typography variant="h6" color="black">
              Last words
            </Typography>
          </CardHeader>
          <hr className="border-1" />
          <CardBody className={'bg-[#F6F6F6] p-3'}>
            <Typography variant="body2" color="gray">
              {profile?.lastWords || ''}
            </Typography>
          </CardBody>
        </Card>

        <Card className={'mb-4'}>
          <CardHeader floated={false} shadow={false} className="m-3">
            <Typography variant="h6" color="black">
              Advice for future cohort
            </Typography>
          </CardHeader>
          <hr className="border-1" />
          <CardBody className={'bg-[#F6F6F6] p-3'}>
            <Typography variant="body2" color="gray">
              {profile?.adviceForFutureCohort || ''}
            </Typography>
          </CardBody>
        </Card>

        <Card className={'mb-4'}>
          <CardHeader floated={false} shadow={false} className="m-3">
            <Typography variant="h6" color="black">
              Biggest Challenge?
            </Typography>
          </CardHeader>
          <hr className="border-1" />
          <CardBody className={'bg-[#F6F6F6] p-3'}>
            <Typography variant="body2" color="gray">
              {profile?.biggestChallenge || ''}
            </Typography>
          </CardBody>
        </Card>

        <Card className={'mb-4'}>
          <CardHeader floated={false} shadow={false} className="m-3">
            <Typography variant="h6" color="black">
              How you overcame it?
            </Typography>
          </CardHeader>
          <hr className="border-1" />
          <CardBody className={'bg-[#F6F6F6] p-3'}>
            <Typography variant="body2" color="gray">
              {profile?.howYouOvercameIt || ''}
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ReadOnlyProfile;
