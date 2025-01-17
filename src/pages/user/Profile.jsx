import { useState, useContext, useEffect } from 'react';
import UserBanner from '../../components/UserBanner.jsx';
import avatar from '../../assets/avatar.png';
import { Accordion, AccordionHeader, AccordionBody, Button } from '@material-tailwind/react';
import { CiEdit } from 'react-icons/ci';
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context/contextApi.jsx';
import { updateProfile, getProfile } from '../../api';
import ProfileData from '../../data/ProfileData.js';
import { useParams } from 'react-router';

const Profile = () => {
  const [open, setOpen] = useState(0);
  const { getUserData, getSession } = useContext(AppContext);
  const { profileId } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log('Profile ID:', profileId);
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile(profileId);
      console.log("data",response.data);
      setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log('Form Data:', formData);

    if (
      formData.lastWords === '' ||
      formData.adviceForFutureCohort === '' ||
      formData.bio === '' ||
      formData.hobbies === '' ||
      formData.biggestChallenge === '' ||
      formData.mostMemorableBootcampMoment === '' ||
      formData.interests === '' ||
      // formData.mostLikelyToQuestion === '' ||
      // formData.mostLikelyToAnswer === '' ||
      formData.previousField === '' ||
      formData.favouriteCodingSnack === ''
      // formData.favoriteQuote === ''
      // formData.linkedin === '' ||
      // formData.instagram === '' ||
      // formData.picture === ''
    ) {
      toast.error('Please complete all fields');
    } else {
      try {
        const token = getSession();
        const response = await updateProfile(token, formData);
        console.log(response);
        if (response.status === 200) {
          toast.success('Profile updated successfully');
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred. Please try again');
      }
    }
  };

  return (
    <div className={'w-full flex flex-col'}>
      <UserBanner />
      <div className="full flex flex-col ">
        <div className={'flex w-full justify-between items-center'}>
          <div className={'flex justify-center space-x-4'}>
            <div>
              <img
                className="w-[120px] h-[120px] rounded-full border border-gray-300"
                src={avatar}
                alt="Avatar"
              />
            </div>

            <div className={'flex pt-6'}>
              <div>
                <p
                  className={'text-[14px] font-semibold mb-1'}
                >{`${getUserData().firstName} ${getUserData().lastName}`}</p>
                <p className={'text-[14px] font-light'}>Product Designer</p>
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
              {/* Previous Field */}
              <div>
                <label htmlFor="previousField" className="block text-sm font-medium text-gray-700">
                  Previous Field
                </label>
                <input
                  type="text"
                  id="previousField"
                  placeholder="Product Management"
                  value={formData.previousField}
                  onChange={handleChange}
                  className={
                    'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                  }
                />
              </div>

              {/* Hobbies */}
              <div>
                <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">
                  Hobbies
                </label>
                <input
                  type="text"
                  id="hobbies"
                  placeholder="Cooking, reading"
                  value={formData.hobbies}
                  onChange={handleChange}
                  className={
                    'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                  }
                />
              </div>

              {/* Interest */}
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                  Interests
                </label>
                <input
                  type="text"
                  id="interests"
                  placeholder="Public speaking, Tech"
                  value={formData.interests}
                  onChange={handleChange}
                  className={
                    'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                  }
                />
              </div>

              {/* Favourite */}
              <div>
                <label htmlFor="favouriteCodingSnack" className="block text-sm font-medium text-gray-700">
                  Favourite coding snack
                </label>
                <input
                  type="text"
                  id="favouriteCodingSnack"
                  placeholder="java,javascript"
                  value={formData.favouriteCodingSnack}
                  onChange={handleChange}
                  className={
                    'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                  }
                />
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <input
                  type="text"
                  id="bio"
                  placeholder="I live for positive impact"
                  value={formData.bio}
                  onChange={handleChange}
                  className={
                    'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                  }
                />
              </div>
            </div>

            <div className={'w-full flex flex-col m-20'}>
              <div className={'w-full flex justify-center items-center'}>
                <p className={'font-medium text-[26px] mb-8'}>Favourite Quote</p>
              </div>
              <div className={'flex w-full items-center'}>
                <p className={'font-extralight text-[22px] italic'}>
                  Impacting lives is the greatest legacy, and the pursuit of knowledge is the hidden
                  gem that unlocks endless possibilities.
                </p>
              </div>
            </div>

            <div className={'w-full p-6 mb-20'}>
              <Accordion open={open === 1} icon={<CiEdit id={1} open={open} size={30} />}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className={'text-[18px] font-medium'}
                >
                  Who is most likely to?
                </AccordionHeader>
                <AccordionBody>
                  <textarea
                    id="mostLikelyToQuestion"
                    placeholder="Enter your message"
                    rows="4"
                    className="mt-1 block w-full text-gray-900 text-[18px]  focus:ring-transparent focus:border-transparent px-4 "
                    value={formData.mostLikelyToQuestion}
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
                    value={formData.mostMemorableBootcampMoment}
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
                    value={formData.lastWords}
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
                    value={formData.adviceForFutureCohort}
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
                    value={formData.biggestChallenge}
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
  );
};

export default Profile;