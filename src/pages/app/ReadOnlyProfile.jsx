import { useParams } from 'react-router';
import useFetchProfile from '../../hooks/useFetchProfile.jsx';
import Loader from '../../components/Loader.jsx';
import AvatarPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';

const ReadOnlyProfile = () => {
  const params = useParams();
  const { profile, loading, error } = useFetchProfile(params.profileId);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.error(error);
  }

  return (
    <div className={'w-full flex flex-col'}>
      <div className="grid  grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={'flex space-x-2'}>
          <img
            className="w-[120px] h-[120px] rounded-full border border-gray-300"
            src={profile?.picture || AvatarPlaceholder}
            alt="Avatar"
          />

          <div className="ml-4 w-full pt-8 flex flex-col">
            <div className="flex items-center ">
              <p className="text-medium text-gray-800 font-bold mb-1">{`${profile?.firstName || 'FirstName'} ${profile?.lastName || 'LastName'}`}</p>
            </div>
            <p className="text-sm font-normal text-wrap">{profile?.currentRole}</p>
            <div className={'flex space-x-1 text-nowrap'}>
              <p className={'text-sm font-semibold'}>Bio:</p>
              <p className={'text-sm font-normal text-wrap'}>{profile?.bio}</p>
            </div>
          </div>
        </div>
        <div className={'flex flex-col pt-8 w-full'}>
          <div className={'flex space-x-2 mb-2'}>
            <p className={'text-sm font-semibold'}>Previous Field:</p>
            <p className={'text-sm font-normal'}>{` ${profile?.previousField}`}</p>
          </div>
          <div className={'flex space-x-2 '}>
            <p className={'text-sm font-semibold'}>Interests:</p>
            <p className={'text-sm font-normal'}>{` ${profile?.interests}`}</p>
          </div>
        </div>

        <div className={'flex flex-col pt-8 w-full'}>
          <div className={'flex space-x-2 mb-2'}>
            <p className={'text-sm font-semibold'}>Hobbies:</p>{' '}
            <p className={'text-sm font-normal'}>{` ${profile?.hobbies}`}</p>
          </div>
          <div className={'flex space-x-1 text-nowrap'}>
            <p className={'text-sm font-semibold'}>Favourite coding snack:</p>
            <p className={'text-sm font-normal text-wrap'}>{`${profile?.favoriteCodingSnack || ''}`}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center my-8">
        <p className={'font-medium text-2xl'}>Favorite Quote</p>
        <div className={'w-full flex justify-center mt-4'}>
          <p className={'italic'}>{profile?.favoriteQuote}</p>
        </div>
      </div>

      <div className={'w-full flex flex-col'}>
        <div className={'mb-4'}>
          <p className={'mb-2 text-lg'}>{profile?.mostLikelyToQuestion}</p>
          <div className={'bg-[#F6F6F6] rounded-md p-4'}>
            <p className={'text-sm'}>{profile?.mostLikelyToAnswer}</p>
          </div>
        </div>

        <div className={'mb-4'}>
          <p className={'mb-2 text-lg'}>Most memorable bootcamp moment?</p>
          <div className={'bg-[#F6F6F6] rounded-md p-4'}>
            <p className={'text-sm'}>{profile?.mostMemorableBootcampMoment}</p>
          </div>
        </div>

        <div className={'mb-4'}>
          <p className={'mb-2 text-lg'}>Last word</p>
          <div className={'bg-[#F6F6F6] rounded-md p-4'}>
            <p className={'text-sm'}>{profile?.lastWords}</p>
          </div>
        </div>

        <div className={'mb-4'}>
          <p className={'mb-2 text-lg'}>Advice for future cohort</p>
          <div className={'bg-[#F6F6F6] rounded-md p-4'}>
            <p className={'text-sm'}>{profile?.adviceForFutureCohort}</p>
          </div>
        </div>

        <div className={'mb-4'}>
          <p className={'mb-2 text-lg'}>Biggest Challenge?</p>
          <div className={'bg-[#F6F6F6] rounded-md p-4'}>
            <p className={'text-sm'}>{profile?.biggestChallenge}</p>
          </div>
        </div>

        <div className={'mb-4'}>
          <p className={'mb-2 text-lg'}>How you overcame it</p>
          <div className={'bg-[#F6F6F6] rounded-md p-4'}>
            <p className={'text-sm'}>{profile?.howYouOvercameIt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadOnlyProfile;
