import { useState, useContext, useEffect, useRef } from 'react';
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
import { AppContext } from '../../context/contextApi.jsx';
import { updateProfile, getProfile, getAllMembers } from '../../api';
// import ProfileData from '../../data/ProfileData.js';
import { useParams } from 'react-router';
import { convertBase64 } from '../../utils/Helper.js';
import ImageCropper from '../../components/ImageCropper';
import Loader from '../../components/Loader.jsx';
import { s } from 'framer-motion/client';

const Profile = () => {
  const [open, setOpen] = useState(-1);
  const { getUserData, getSession, setMembersListCxt, getMembersListCxt } = useContext(AppContext);
  const { profileId } = useParams();
  const [formData, setFormData] = useState({});
  const [openMenu, setOpenMenu] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [uploadImageData, setUploadImageData] = useState(undefined);
  const [imageSrc, setImageSrc] = useState(AvatarPlaceHolder);
  const imageSelectRef = useRef();
  const menuRef = useRef(null);
  // const [membersList, setMembersList] = useState([]);
  const token = getSession();
  //  useEffect(() => {

  //  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetchMembers();
      const profile = fetchProfile();
      setFormData(profile);
    };

    fetchData();
  }, []);

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
      setImageSrc(formData?.picture);
    }
  }, [formData?.picture]);

  const fetchMembers = async () => {
    setIsFetching(true);
    try {
      const res = await getAllMembers(token);
      setMembersListCxt(res?.data);
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchProfile = async () => {
    setIsFetching(true);
    try {
      const response = await getProfile(profileId);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };
  const handleOpen = (value) => setOpen(open === value ? -1 : value);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      formData.previousField === '' ||
      formData.currentRole === '' ||
      formData.favoriteCodingSnack === '' ||
      formData.lastWords === '' ||
      formData.adviceForFutureCohort === '' ||
      formData.bio === '' ||
      formData.hobbies === '' ||
      formData.interests === ''
      // formData.biggestChallenge === '' ||
      // formData.mostMemorableBootcampMoment === '' ||
      // formData.mostLikelyToQuestion === '' ||
      // formData.mostLikelyToAnswer === '' ||
      // formData.favoriteQuote === ''
      // formData.linkedin === '' ||
      // formData.instagram === ''
      // formData.picture === ''
    ) {
      toast.error('Please complete all fields');
    } else {
      try {
        const token = getSession();
        const response = await updateProfile(token, formData);
        if (response.status === 200) {
          toast.success('Profile updated successfully');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred. Please try again');
      }
    }
  };

  const options = getMembersListCxt();

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(formData?.mostLikelyToAnswer?.toLowerCase())
  );
  const closeModal = () => {
    setUploadImageData(undefined);
    if (!formData?.picture) {
      setFormData((prevData) => ({
        ...prevData,
        picture: undefined,
      }));
    }
    setIsOpen(false);
  };

  const onSelectFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setUploadImageData(base64);
      setIsOpen(true);
    }
  };

  if (isFetching) {
    return <Loader />;
  }
  return (
    <>
      {modalIsOpen && uploadImageData && (
        <ImageCropper
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          uploadImageData={uploadImageData}
          setImageSrc={setImageSrc}
        />
      )}
      <div className={'w-full flex flex-col'}>
        <UserBanner />
        <div className="full flex flex-col ">
          <div className={'flex w-full justify-between items-center'}>
            <div className={'flex justify-center space-x-4'}>
              <div className="">
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

              <div className={'flex pt-6'}>
                <div>
                  <p
                    className={'text-[14px] font-semibold mb-1'}
                  >{`${getUserData().firstName} ${getUserData().lastName}`}</p>
                  <p className={'text-[14px] font-light'}>{formData?.currentRole || ''}</p>
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
                <div>
                  <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700">
                    Current Role *
                  </label>
                  <input
                    type="text"
                    id="currentRole"
                    placeholder="Product Management"
                    value={formData?.currentRole || ''}
                    onChange={handleChange}
                    className={
                      'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                    }
                  />
                </div>
                {/* Previous Field */}
                <div>
                  <label
                    htmlFor="previousField"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Previous Field *
                  </label>
                  <input
                    type="text"
                    id="previousField"
                    placeholder="Product Management"
                    value={formData?.previousField || ''}
                    onChange={handleChange}
                    className={
                      'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                    }
                  />
                </div>

                {/* Hobbies */}
                <div>
                  <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">
                    Hobbies *
                  </label>
                  <input
                    type="text"
                    id="hobbies"
                    placeholder="Cooking, reading"
                    value={formData?.hobbies || ''}
                    onChange={handleChange}
                    className={
                      'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                    }
                  />
                </div>

                {/* Interest */}
                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                    Interests *
                  </label>
                  <input
                    type="text"
                    id="interests"
                    placeholder="Public speaking, Tech"
                    value={formData?.interests || ''}
                    onChange={handleChange}
                    className={
                      'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                    }
                  />
                </div>

                {/* Favourite */}
                <div>
                  <label
                    htmlFor="favoriteCodingSnack"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Favorite coding snack *
                  </label>
                  <input
                    type="text"
                    id="favoriteCodingSnack"
                    placeholder="coffee, water"
                    value={formData?.favoriteCodingSnack || ''}
                    onChange={handleChange}
                    className={
                      'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                    }
                  />
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio *
                  </label>
                  <input
                    type="text"
                    id="bio"
                    placeholder="I live for positive impact"
                    value={formData?.bio || ''}
                    onChange={handleChange}
                    className={
                      'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                    }
                  />
                </div>
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                    Instagram
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    placeholder="profileName"
                    value={formData?.instagram || ''}
                    onChange={handleChange}
                    className={
                      'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                    }
                  />
                </div>
                <div>
                  <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    id="linkedIn"
                    placeholder="www.linkedin.com/in/firstname-lastname"
                    value={formData?.linkedIn || ''}
                    onChange={handleChange}
                    className={
                      'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                    }
                  />
                </div>
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
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 50 },
                    }}
                    value={formData?.mostLikelyToQuestion || ''}
                    onChange={(val) =>
                      handleChange({ target: { id: 'mostLikelyToQuestion', value: val } })
                    }
                    className="w-full text-gray-900 text-[18px] px-4 truncate"
                    containerProps={{
                      className: 'min-w-0 [&>button>span]:!static',
                    }}
                  >
                    <Option value=""> </Option>
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
                      bring up &quot;the good old days&quot; in every conversation
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
                      value={formData?.mostLikelyToAnswer || ''}
                      onChange={handleChange}
                      onClick={() => setOpenMenu(true)}
                      className="mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3"
                      disabled={formData?.mostLikelyToQuestion === ''}
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

              {/* <div className={'w-full flex flex-col m-20'}>
              <div className={'w-full flex justify-center items-center'}>
                <p className={'font-medium text-[26px] mb-8'}>Favourite Quote</p>
              </div>
              <div className={'flex w-full items-center'}>
                <p className={'font-extralight text-[22px] italic'}>
                  Impacting lives is the greatest legacy, and the pursuit of knowledge is the hidden
                  gem that unlocks endless possibilities.
                </p>
              </div>
            </div> */}

              <div className={'w-full p-6 mb-20 mt-20'}>
                <Accordion open={open === 0} icon={<CiEdit id={0} open={open} size={30} />}>
                  <AccordionHeader
                    onClick={() => handleOpen(0)}
                    className={'text-[18px] font-medium'}
                  >
                    Favorite Quote
                  </AccordionHeader>
                  <AccordionBody>
                    <textarea
                      id="favoriteQuote"
                      placeholder="Enter your message"
                      rows="4"
                      className="mt-1 block w-full text-gray-900 text-[18px]  focus:ring-transparent focus:border-transparent px-4 "
                      value={formData?.favoriteQuote || ''}
                      onChange={handleChange}
                    />
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 2} icon={<CiEdit id={2} open={open} size={30} />}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className={'text-[18px] font-medium'}
                  >
                    Most memorable bootcamp moment?
                  </AccordionHeader>
                  <AccordionBody>
                    <textarea
                      id="mostMemorableBootcampMoment"
                      placeholder="Enter your message"
                      rows="4"
                      className="mt-1 block w-full text-gray-900 text-[18px]  focus:ring-transparent focus:border-transparent px-4 "
                      value={formData?.mostMemorableBootcampMoment || ''}
                      onChange={handleChange}
                    />
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 3} icon={<CiEdit id={3} open={open} size={30} />}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className={'text-[18px] font-medium'}
                  >
                    Last words?
                  </AccordionHeader>
                  <AccordionBody>
                    <textarea
                      id="lastWords"
                      placeholder="Enter your message"
                      rows="4"
                      value={formData?.lastWords || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full text-gray-900 text-[18px]  focus:ring-transparent focus:border-transparent px-4 "
                    />
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 4} icon={<CiEdit id={4} open={open} size={30} />}>
                  <AccordionHeader
                    onClick={() => handleOpen(4)}
                    className={'text-[18px] font-medium'}
                  >
                    Advice for future cohort?
                  </AccordionHeader>
                  <AccordionBody>
                    <textarea
                      id="adviceForFutureCohort"
                      placeholder="Enter your message"
                      rows="4"
                      value={formData?.adviceForFutureCohort || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full text-gray-900 text-[18px]  focus:ring-transparent focus:border-transparent px-4 "
                    />
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 5} icon={<CiEdit id={5} open={open} size={30} />}>
                  <AccordionHeader
                    onClick={() => handleOpen(5)}
                    className={'text-[18px] font-medium'}
                  >
                    Biggest challenge and how you overcame it?
                  </AccordionHeader>
                  <AccordionBody>
                    <textarea
                      id="biggestChallenge"
                      placeholder="Enter your message"
                      rows="4"
                      value={formData?.biggestChallenge || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full text-gray-900 text-[18px]  focus:ring-transparent focus:border-transparent px-4 "
                    />
                  </AccordionBody>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
