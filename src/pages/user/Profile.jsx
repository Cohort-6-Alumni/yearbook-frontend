import { useState } from 'react';
import UserBanner from '../../components/UserBanner.jsx';
import avatar from '../../assets/avatar.png';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import { CiEdit } from 'react-icons/ci';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [formData, setFormData] = useState({
    previousField: '',
    hobbies: '',
    interest: '',
    favourite: '',
    bio: '',
    mostLikely: '',
    memorableMoment: '',
    lastWords: '',
    advice: '',
    biggestChallenge: '',
  });

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
      formData.firstName === '' &&
      formData.lastName === '' &&
      formData.lastWords === '' &&
      formData.advice === '' &&
      formData.bio === '' &&
      formData.hobbies === '' &&
      formData.biggestChallenge === '' &&
      formData.memorableMoment === '' &&
      formData.interest === '' &&
      formData.mostLikely === '' &&
      formData.previousField
    ) {
      toast.error('Please enter all fields');
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
                <p className={'text-[14px] font-semibold mb-1'}>Amy Amara</p>
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
                  Interest
                </label>
                <input
                  type="text"
                  id="interest"
                  placeholder="Public speaking, Tech"
                  value={formData.interest}
                  onChange={handleChange}
                  className={
                    'mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3'
                  }
                />
              </div>

              {/* Favourite */}
              <div>
                <label htmlFor="favourite" className="block text-sm font-medium text-gray-700">
                  Favourite coding snack
                </label>
                <input
                  type="text"
                  id="favourite"
                  placeholder="java,javascript"
                  value={formData.favourite}
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
                    id="mostLikely"
                    placeholder="Enter your message"
                    rows="4"
                    className="mt-1 block w-full text-gray-900 text-[18px]  focus:ring-transparent focus:border-transparent px-4 "
                    value={formData.mostLikely}
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
                    id="memorableMoment"
                    placeholder="Enter your message"
                    rows="4"
                    className="mt-1 block w-full text-gray-900 text-[18px]  focus:ring-transparent focus:border-transparent px-4 "
                    value={formData.memorableMoment}
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
                    id="advice"
                    placeholder="Enter your message"
                    rows="4"
                    value={formData.advice}
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

const ProfileModal = ({openProp}) => {
  const [open, setOpen] = useState(openProp);

  const handleOpen = () => setOpen(openProp);

  return (
    <>
      {/* <Button onClick={handleOpen}>Notification</Button> */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Your Attention is Required!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            You should read this!
          </Typography>
          <Typography className="text-center font-normal">
            A small river named Duden flows by their place and supplies it with the necessary
            regelialia.
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={handleOpen}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Profile;

//
//
// import {useState} from "react";
// import UserBanner from "../../components/UserBanner.jsx";
// import avatar from "../../assets/avatar.png";
// import {
//     Accordion,
//     AccordionHeader,
//     AccordionBody, Button,
// } from "@material-tailwind/react";
// import {CiEdit} from "react-icons/ci";
//
//
// const Profile = () => {
//     const [open, setOpen] = useState(0);
//     const handleOpen = (value) => setOpen(open === value ? 0 : value);
//
//     const [formData, setFormData] = useState({
//         previousField: "",
//         hobbies: "",
//         interest: "",
//         favourite: "",
//         bio: "",
//         mostLikely: "",
//         memorableMoment: "",
//         lastWords: "",
//         advice: "",
//         biggestChallenge: "",
//     });
//
//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [id]: value,
//         }));
//     };
//
//     const handleSubmit = () => {
//         console.log("Form Data:", formData);
//     };
//
//     return (
//         <div className={"w-full flex flex-col"}>
//             <UserBanner />
//             <div className="full flex flex-col ">
//                 <div className={"flex w-full justify-between items-center"}>
//                     <div className={"flex justify-center space-x-4"}>
//                         <div>
//                             <img
//                                 className="w-[120px] h-[120px] rounded-full border border-gray-300"
//                                 src={avatar}
//                                 alt="Avatar"
//                             />
//                         </div>
//
//                         <div className={"flex pt-6"}>
//                             <div>
//                                 <p className={"text-[14px] font-semibold mb-1"}>Amy Amara</p>
//                                 <p className={"text-[14px] font-light"}>Product Designer</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div>
//                         <Button size="lg" className="bg-[#118B50]" onClick={handleSubmit}>
//                             Save
//                         </Button>
//                     </div>
//                 </div>
//
//                 <div className="w-full">
//                     <div className="container mx-auto p-8">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label htmlFor="previousField" className="block text-sm font-medium text-gray-700">
//                                     Previous Field
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="previousField"
//                                     placeholder="Product Management"
//                                     className="mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3"
//                                     value={formData.previousField}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//
//                             <div>
//                                 <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">
//                                     Hobbies
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="hobbies"
//                                     placeholder="Cooking, reading"
//                                     className="mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3"
//                                     value={formData.hobbies}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//
//                             <div>
//                                 <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
//                                     Interest
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="interest"
//                                     placeholder="Public speaking, Tech"
//                                     className="mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3"
//                                     value={formData.interest}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//
//                             <div>
//                                 <label htmlFor="favourite" className="block text-sm font-medium text-gray-700">
//                                     Favourite coding snack
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="favourite"
//                                     placeholder="java, javascript"
//                                     className="mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3"
//                                     value={formData.favourite}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//
//                             <div>
//                                 <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//                                     Bio
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="bio"
//                                     placeholder="I live for positive impact"
//                                     className="mt-1 block w-full rounded-md border-[1px] focus:ring-[transparent] border-[#B7B7B7] px-4 py-3"
//                                     value={formData.bio}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="w-full p-6 mb-20">
//                             <Accordion open={open === 1} icon={<CiEdit size={30} />}>
//                                 <AccordionHeader onClick={() => handleOpen(1)} className="text-[18px] font-medium">
//                                     Who is most likely to?
//                                 </AccordionHeader>
//                                 <AccordionBody>
//                                     <textarea
//                                         id="mostLikely"
//                                         placeholder="Enter your message"
//                                         rows="4"
//                                         className="mt-1 block w-full text-gray-900 text-[18px] focus:ring-transparent focus:border-transparent px-4"
//                                         value={formData.mostLikely}
//                                         onChange={handleChange}
//                                     />
//                                 </AccordionBody>
//                             </Accordion>
//
//                             {/* Repeat for other textareas */}
//                             {/* Adjust IDs and state values accordingly */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Profile;
