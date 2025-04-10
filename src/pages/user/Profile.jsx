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
import { GoPencil } from 'react-icons/go';
import { IoSaveOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import { updateProfile, getProfile, getAllMembers } from '../../api';
import { useParams } from 'react-router';
import { convertBase64 } from '../../utils/Helper.js';
import ImageCropper from '../../components/ImageCropper';
import Loader from '../../components/Loader.jsx';
import useAuth from '../../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Define the list of required fields
const REQUIRED_FIELDS = [
  'previousField',
  'currentRole',
  'favoriteCodingSnack',
  // 'lastWords',
  // 'adviceForFutureCohort',
  'bio',
  'hobbies',
  'interests',
  'favoriteQuote',
  // 'mostMemorableBootcampMoment',
  // 'biggestChallenge',
  // 'howYouOvercameIt',
  'mostLikelyToQuestion',
  'mostLikelyToAnswer',
];

const Profile = () => {
  const [open, setOpen] = useState(-1);
  const { profileId } = useParams();
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploadImageData, setUploadImageData] = useState(undefined);
  const [imageSrc, setImageSrc] = useState(AvatarPlaceHolder);
  // Track empty required fields
  const [emptyFields, setEmptyFields] = useState({});
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
      // Update initial form data to match current form data
      setInitialFormData({...formData});
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast.error('An error occurred. Please try again');
    }
  });

  // Set form data when profile data is loaded
  useEffect(() => {
    if (profile && JSON.stringify(profile) !== JSON.stringify(formData)) {
      setFormData(profile);
      setInitialFormData(profile);
      
      // Initialize empty fields tracking
      const newEmptyFields = {};
      REQUIRED_FIELDS.forEach(field => {
        newEmptyFields[field] = !profile[field];
      });
      setEmptyFields(newEmptyFields);
    }
  }, [profile]);

  // Set image src when formData.picture changes
  useEffect(() => {
    if (formData?.picture && formData.picture !== imageSrc) {
      setImageSrc(formData.picture);
    }
  }, [formData?.picture]);

  // Handle outside clicks for the dropdown menu
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

  // Set document title once
  useEffect(() => {
    document.title = 'Edit Profile | Yearbook';
  }, []);

  const handleOpen = (value) => setOpen(open === value ? -1 : value);

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    
    // Update empty fields tracking only if it's a required field
    if (REQUIRED_FIELDS.includes(id)) {
      setEmptyFields(prev => ({
        ...prev,
        [id]: !value
      }));
    }
  };

  const handleSubmit = () => {
    // Check if any required fields are empty
    const newEmptyFields = {};
    let hasEmptyFields = false;
    
    REQUIRED_FIELDS.forEach(field => {
      const isEmpty = !formData[field];
      newEmptyFields[field] = isEmpty;
      if (isEmpty) hasEmptyFields = true;
    });
    
    setEmptyFields(newEmptyFields);

    if (hasEmptyFields) {
      toast.error('Please complete all required fields');
      return;
    }

    updateProfileMutation.mutate(formData);
  };

  // Check if form data has changed to enable/disable save button
  const hasFormChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData);

  // Helper function to determine if a field is required and if it's empty
  const isFieldRequired = (id) => REQUIRED_FIELDS.includes(id);
  const isFieldEmpty = (id) => emptyFields[id];

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

  // Handle select change for mostLikelyToQuestion
  const handleSelectChange = (val) => {
    handleChange({ target: { id: 'mostLikelyToQuestion', value: val } });
  };

  if (isProfileLoading || updateProfileMutation.isPending) {
    return <Loader />;
  }

  // Basic information fields data
  const basicInfoFields = [
    { id: 'currentRole', label: 'Current Role', placeholder: 'Product Management' },
    { id: 'previousField', label: 'Previous Field', placeholder: 'Product Management' },
    { id: 'bio', label: 'Bio', placeholder: 'I live for positive impact' },
    { id: 'hobbies', label: 'Hobbies', placeholder: 'Cooking, reading' },
    { id: 'interests', label: 'Interests', placeholder: 'Public speaking, Tech' },
    { id: 'favoriteCodingSnack', label: 'Favorite Coding Snack', placeholder: 'coffee, water' },
  ];
  
  // Social media fields data
  const socialMediaFields = [
    { id: 'instagram', label: 'Instagram', placeholder: 'www.instagram.com/username/' },
    { id: 'linkedIn', label: 'LinkedIn', placeholder: 'www.linkedin.com/in/firstname-lastname' },
  ];
  
  // Yearbook content fields data
  const yearbookContentFields = [
    { id: 'favoriteQuote', label: 'Favorite Quote' },
    { id: 'mostMemorableBootcampMoment', label: 'Most memorable bootcamp moment?' },
    { id: 'lastWords', label: 'Last words?' },
    { id: 'adviceForFutureCohort', label: 'Advice for future cohort?' },
    { id: 'biggestChallenge', label: 'Biggest challenge?' },
    { id: 'howYouOvercameIt', label: 'How did you overcame it?' },
  ];

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
      <UserBanner />
      <div className="flex flex-col px-4 md:px-6">
        <div className="w-full max-w-4xl mx-auto">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-6 mt-4">
            <img
              className="w-[120px] h-[120px] rounded-full border border-gray-300 object-cover shadow-sm hover:border-purple-600 hover:border-2 cursor-pointer"
              src={imageSrc}
              alt="Avatar"
              onClick={(e) => {
                e.preventDefault();
                imageSelectRef.current.click();
              }}
            />
            <button
              className="flex items-center gap-2 px-4 py-2 mt-3 text-sm cursor-pointer hover:text-purple-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                imageSelectRef.current.click();
              }}
            >
              <GoPencil /> Change
            </button>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={onSelectFile}
              ref={imageSelectRef}
              className="hidden"
            />
            <p className="text-lg font-medium mt-2">
              {`${user?.firstName || ''} ${user?.lastName || ''}`}
            </p>
            <p className="text-sm text-gray-600">{formData?.currentRole || ''}</p>
          </div>

          {/* Basic Information Section */}
          <div className="w-full bg-white rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-800">Basic Information</h2>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {basicInfoFields.map(({ id, label, placeholder }) => {
                  const required = isFieldRequired(id);
                  const isEmpty = isFieldEmpty(id);
                  
                  return (
                    <div key={id}>
                      <label 
                        htmlFor={id} 
                        className={`block text-sm font-medium mb-1 ${
                          required && isEmpty ? 'text-red-500' : 'text-gray-700'
                        }`}
                      >
                        {label} {required && '*'}
                      </label>
                      <input
                        type="text"
                        id={id}
                        placeholder={placeholder}
                        value={formData[id] || ''}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${
                          required && isEmpty
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                        } px-4 py-2.5 text-sm`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="w-full bg-white rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-800">Social Media</h2>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {socialMediaFields.map(({ id, label, placeholder }) => {
                  const required = isFieldRequired(id);
                  const isEmpty = isFieldEmpty(id);
                  
                  return (
                    <div key={id}>
                      <label 
                        htmlFor={id} 
                        className={`block text-sm font-medium mb-1 ${
                          required && isEmpty ? 'text-red-500' : 'text-gray-700'
                        }`}
                      >
                        {label} {required && '*'}
                      </label>
                      <input
                        type="text"
                        id={id}
                        placeholder={placeholder}
                        value={formData[id] || ''}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${
                          required && isEmpty
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                        } px-4 py-2.5 text-sm`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Most Likely To Section */}
          <div className="w-full bg-white rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-800">Most Likely To</h2>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="mostLikelyToQuestion"
                    className={`block text-sm font-medium mb-1 ${
                      isFieldEmpty('mostLikelyToQuestion') ? 'text-red-500' : 'text-gray-700'
                    }`}
                  >
                    Question *
                  </label>
                  <Select
                    id="mostLikelyToQuestion"
                    size="md"
                    label="Select Question"
                    animate={{ mount: { y: 0 }, unmount: { y: 50 } }}
                    value={formData?.mostLikelyToQuestion || ''}
                    onChange={handleSelectChange}
                    className={`w-full bg-white text-gray-900 text-sm ${
                      isFieldEmpty('mostLikelyToQuestion') ? 'border-red-300' : ''
                    }`}
                    containerProps={{ className: 'min-w-0' }}
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
                    className={`block text-sm font-medium mb-1 ${
                      isFieldEmpty('mostLikelyToAnswer') ? 'text-red-500' : 'text-gray-700'
                    }`}
                  >
                    Answer *
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
                      className={`mt-1 block w-full rounded-md border ${
                        isFieldEmpty('mostLikelyToAnswer')
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                      } px-4 py-2.5 text-sm`}
                      disabled={formData?.mostLikelyToQuestion === null}
                    />
                    {openMenu && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                        {filteredOptions.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setFormData({ ...formData, mostLikelyToAnswer: option });
                              setEmptyFields(prev => ({
                                ...prev,
                                mostLikelyToAnswer: false
                              }));
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
            </div>
          </div>

          {/* Yearbook Content Section with Accordions */}
          <div className="w-full bg-white rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-800">Yearbook Content</h2>
            </div>

            <div className="p-5">
              {yearbookContentFields.map(({ id, label }, index) => {
                const required = isFieldRequired(id);
                const isEmpty = isFieldEmpty(id);
                
                return (
                  <Accordion
                    key={id}
                    open={open === index}
                    icon={<CiEdit className="h-5 w-5" />}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(index)}
                      className={`text-base font-medium px-0 py-3 ${
                        required && isEmpty ? 'text-red-500' : 'text-gray-800'
                      }`}
                    >
                      {label} {required && '*'}
                    </AccordionHeader>
                    <AccordionBody className="px-0">
                      <textarea
                        id={id}
                        placeholder="Enter your response here..."
                        rows="4"
                        value={formData[id] || ''}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${
                          required && isEmpty
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                        } px-4 py-2.5 text-sm`}
                      />
                    </AccordionBody>
                  </Accordion>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mb-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!hasFormChanged || updateProfileMutation.isPending}
              className={`flex items-center justify-center gap-2 py-2.5 px-6 
                        ${!hasFormChanged || updateProfileMutation.isPending
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700'
                        } text-white rounded-md transition-colors text-sm sm:text-base`}
            >
              <IoSaveOutline className="h-5 w-5" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
