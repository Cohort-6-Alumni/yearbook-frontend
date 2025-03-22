import { useState, useEffect, useRef, Fragment } from 'react';
import UserBanner from '../../components/UserBanner.jsx';
import AvatarPlaceHolder from '../../assets/Profile_avatar_placeholder_large.png';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Select,
  Option,
} from '@material-tailwind/react';
import { CiEdit } from 'react-icons/ci';
import { toast } from 'react-hot-toast';
import { updateProfile, getProfile, getAllMembers } from '../../api';
import { useParams } from 'react-router';
import { convertBase64 } from '../../utils/Helper.js';
import ImageCropper from '../../components/ImageCropper';
import Loader from '../../components/Loader.jsx';
import useAuth from '../../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Profile = () => {
  const [open, setOpen] = useState(-1);
  const { profileId } = useParams();
  const [formData, setFormData] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploadImageData, setUploadImageData] = useState(undefined);
  const [imageSrc, setImageSrc] = useState(AvatarPlaceHolder);
  const imageSelectRef = useRef();
  const menuRef = useRef(null);
  const { user, getToken } = useAuth();
  const queryClient = useQueryClient();
  const token = getToken();

  // Fetch members query
  const { data: membersList = [] } = useQuery({
    queryKey: ['membersList'],
    queryFn: async () => {
      try {
        const response = await getAllMembers(token);
        return response?.data || [];
      } catch (err) {
        console.error('Error fetching members:', err);
        return [];
      }
    },
    enabled: !!token,
  });

  // Fetch profile query
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      try {
        const response = await getProfile(profileId);
        return response.data;
      } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
    },
    enabled: !!profileId,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      return await updateProfile(token, data);
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast.error('An error occurred. Please try again');
    }
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    if (formData?.picture) {
      setImageSrc(formData.picture);
    }
  }, [formData?.picture]);

  useEffect(() => {
    document.title = 'User Profile | Yearbook';
  }, []);

  const handleOpen = (value) => setOpen(open === value ? -1 : value);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    const requiredFields = [
      'previousField',
      'currentRole',
      'favoriteCodingSnack',
      'lastWords',
      'adviceForFutureCohort',
      'bio',
      'hobbies',
      'interests',
      'favoriteQuote',
      'mostMemorableBootcampMoment',
      'biggestChallenge',
      'howYouOvercameIt',
      'mostLikelyToQuestion',
      'mostLikelyToAnswer',
    ];

    const isFormValid = requiredFields.every((field) => formData[field]);

    if (!isFormValid) {
      toast.error('Please complete all fields');
      return;
    }

    updateProfileMutation.mutate(formData);
  };

  const filteredOptions = membersList.filter((option) =>
    option.toLowerCase().includes(formData?.mostLikelyToAnswer?.toLowerCase() || '')
  );

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSelectFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setUploadImageData(base64);
      setModalIsOpen(true);
    }
  };

  const handleSetImageSrc = (croppedImage) => {
    setImageSrc(croppedImage);
    setFormData((prevData) => ({
      ...prevData,
      picture: croppedImage,
    }));
  };

  if (isProfileLoading || updateProfileMutation.isPending) {
    return <Loader />;
  }

  return (
    <Fragment>
      {modalIsOpen && uploadImageData && (
        <ImageCropper
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          uploadImageData={uploadImageData}
          setImageSrc={handleSetImageSrc}
        />
      )}
      <div className="w-full flex flex-col overflow-auto">
        <UserBanner />
        <div className="full flex flex-col">
          <div className="flex w-full justify-between items-center">
            <div className="flex justify-center space-x-4">
              <div>
                <img
                  className="w-[120px] h-[120px] rounded-full border border-gray-300 hover:border-purple-600 hover:border-2 cursor-pointer"
                  src={imageSrc}
                  alt="Avatar"
                  onClick={(e) => {
                    e.preventDefault();
                    imageSelectRef.current.click();
                  }}
                />
                <input
                  type="file"
                  accept="image/jpeg"
                  onChange={onSelectFile}
                  ref={imageSelectRef}
                  className="hidden"
                />
              </div>
              <div className="flex pt-6">
                <div>
                  <p className="text-[14px] font-semibold mb-1">
                    {`${user?.firstName || ''} ${user?.lastName || ''}`}
                  </p>
                  <p className="text-[14px] font-light">{formData?.currentRole || ''}</p>
                </div>
              </div>
            </div>
            <div>
              <Button size="lg" className="bg-[#118B50]" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </div>
          <div className="w-full">
            <div className="container mx-auto p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'currentRole', label: 'Current Role *', placeholder: 'Product Management' },
                  {
                    id: 'previousField',
                    label: 'Previous Field *',
                    placeholder: 'Product Management',
                  },
                  { id: 'hobbies', label: 'Hobbies *', placeholder: 'Cooking, reading' },
                  { id: 'interests', label: 'Interests *', placeholder: 'Public speaking, Tech' },
                  {
                    id: 'favoriteCodingSnack',
                    label: 'Favorite coding snack *',
                    placeholder: 'coffee, water',
                  },
                  { id: 'bio', label: 'Bio *', placeholder: 'I live for positive impact' },
                  {
                    id: 'instagram',
                    label: 'Instagram',
                    placeholder: 'www.instagram.com/username/',
                  },
                  {
                    id: 'linkedIn',
                    label: 'LinkedIn',
                    placeholder: 'www.linkedin.com/in/firstname-lastname',
                  },
                ].map(({ id, label, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type="text"
                      id={id}
                      placeholder={placeholder}
                      value={formData[id] || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3"
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="mostLikelyToQuestion"
                    className="block text-sm font-medium text-gray-700 mb-3"
                  >
                    Most Likely To
                  </label>
                  <Select
                    id="mostLikelyToQuestion"
                    size="lg"
                    label="Select Question"
                    animate={{ mount: { y: 0 }, unmount: { y: 50 } }}
                    value={formData?.mostLikelyToQuestion || ''}
                    onChange={(val) =>
                      handleChange({ target: { id: 'mostLikelyToQuestion', value: val } })
                    }
                    className="w-full bg-white text-gray-900 text-[18px] px-4 truncate"
                    containerProps={{ className: 'min-w-0 [&>button>span]:!static' }}
                  >
                    <Option value={null}> </Option>
                    <Option value="become a reality TV star">become a reality TV star</Option>
                    <Option value="survive a zombie apocalypse using just their wits">
                      survive a zombie apocalypse using just their wits
                    </Option>
                    <Option value="show up to a reunion with a crazy success story">
                      show up to a reunion with a crazy success story
                    </Option>
                    <Option value="arrive late to their own wedding">
                      arrive late to their own wedding
                    </Option>
                    <Option value='bring up "the good old days" in every conversation'>
                      bring up &ldquo;the good old days&rdquo; in every conversation
                    </Option>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="mostLikelyToAnswer"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Answer
                  </label>
                  <div className="relative" ref={menuRef}>
                    <input
                      type="text"
                      id="mostLikelyToAnswer"
                      placeholder="Type to search..."
                      value={
                        formData?.mostLikelyToQuestion === null
                          ? ''
                          : formData?.mostLikelyToAnswer || ''
                      }
                      onChange={handleChange}
                      onClick={() => setOpenMenu(true)}
                      className="mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3"
                      disabled={formData?.mostLikelyToQuestion === null}
                    />
                    {openMenu && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                        {filteredOptions.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setFormData({ ...formData, mostLikelyToAnswer: option });
                              setOpenMenu(false);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full p-6 mb-20 mt-20">
                {[
                  { id: 'favoriteQuote', label: 'Favorite Quote' },
                  { id: 'mostMemorableBootcampMoment', label: 'Most memorable bootcamp moment?' },
                  { id: 'lastWords', label: 'Last words?' },
                  { id: 'adviceForFutureCohort', label: 'Advice for future cohort?' },
                  { id: 'biggestChallenge', label: 'Biggest challenge?' },
                  { id: 'howYouOvercameIt', label: 'How did you overcame it?' },
                ].map(({ id, label }, index) => (
                  <Accordion
                    key={id}
                    open={open === index}
                    icon={<CiEdit id={index} open={open} size={30} />}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(index)}
                      className="text-[18px] font-medium"
                    >
                      {label}
                    </AccordionHeader>
                    <AccordionBody>
                      <textarea
                        id={id}
                        placeholder="Enter your message"
                        rows="4"
                        value={formData[id] || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full text-gray-900 text-[18px] focus:ring-transparent focus:border-transparent px-4"
                      />
                    </AccordionBody>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
