import { useState, useContext, useRef, useEffect } from 'react';
import UserBanner from '../../components/UserBanner.jsx';
import { GoPencil } from 'react-icons/go';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validationSchema } from '../../utils/schema/profileSchema.js';
import { IoEyeOutline, IoEyeOffOutline, IoTrash, IoSaveOutline } from 'react-icons/io5';
import { AppContext } from '../../context/contextApi';
import { updateAccount } from '../../api';
import toast from 'react-hot-toast';
import ImageCropper from '../../components/ImageCropper.jsx';
import { convertBase64 } from '../../utils/Helper.js';
import AvatarPlaceHolder from '../../assets/Profile_avatar_placeholder_large.png';

const UserAccount = () => {
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isUserDetailsEditable, setIsUserDetailsEditable] = useState(false);
  const [modalIsOpen, setModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(AvatarPlaceHolder);
  const [uploadImageData, setUploadImageData] = useState(undefined);

  const { getUserData, getSession, setUserData } = useContext(AppContext);

  const imageSelectRef = useRef();
  const formikRef = useRef();

  useEffect(() => {
    const userPicture = getUserData().picture || AvatarPlaceHolder;
    setImageSrc(userPicture);
  }, [getUserData]);

  useEffect(() => {
    if (imageSrc && imageSrc !== AvatarPlaceHolder) {
      formikRef.current.setFieldValue('picture', imageSrc);
    }
  }, [imageSrc]);

  useEffect(() => {
    document.title = 'User Details | Yearbook';
  }, []);

  const closeModal = () => {
    setUploadImageData(undefined);
    setModal(false);
  };

  const onSelectFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setUploadImageData(base64);
      setModal(true);
    }
  };

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
      <UserBanner />
      <div className="full flex flex-col p-6">
        <div className="w-full">
          <Formik
            innerRef={formikRef}
            initialValues={{
              firstName: getUserData().firstName,
              username: getUserData().username,
              lastName: getUserData().lastName,
              email: getUserData().emailId,
              password: '',
              picture: getUserData().picture || AvatarPlaceHolder,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = await updateAccount(getSession(), values);
                if (response.status === 200) {
                  setUserData(response.data);
                  toast.success('Profile updated successfully');
                  setIsUserDetailsEditable(false);
                  setShowEditPassword(false);
                  resetForm({ values: response.data });
                }
              } catch (error) {
                if (error.response) {
                  toast.error(error.response.data.message);
                }
                console.error(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, initialValues, isSubmitting }) => (
              <Form>
                <div>
                  <img
                    className="w-[120px] h-[120px] rounded-full border border-gray-300"
                    src={imageSrc}
                    alt="Avatar"
                  />
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-[14px] cursor"
                    onClick={(e) => {
                      e.preventDefault();
                      imageSelectRef.current.click();
                    }}
                  >
                    <GoPencil /> Change
                  </button>
                  <input
                    type="file"
                    accept="image/jpeg"
                    onChange={onSelectFile}
                    ref={imageSelectRef}
                    className="hidden"
                  />
                  <div className="hidden">
                    <Field type="text" name="picture" id="picture" />
                  </div>
                </div>
                <div className="container mx-auto p-8">
                  <div className="flex w-full justify-between mb-4">
                    <p>User Details</p>
                    <button
                      type="button"
                      disabled={isUserDetailsEditable}
                      className={`flex items-center gap-2 px-4 py-2 text-[14px] ${
                        isUserDetailsEditable && 'cursor-not-allowed'
                      }`}
                      onClick={() => setIsUserDetailsEditable((prev) => !prev)}
                    >
                      <GoPencil /> Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        disabled={!isUserDetailsEditable}
                        className={`mt-1 block w-full rounded-md border-[1px] ${
                          isUserDetailsEditable
                            ? 'focus:ring-blue-500 border-[#B7B7B7]'
                            : 'border-gray-300 bg-gray-100'
                        } px-4 py-3`}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-xs h-1"
                      />
                    </div>

                    {/* Username */}
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 ">
                        Username
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        disabled
                        className={`mt-1 block w-full rounded-md border-[1px] ${
                          isUserDetailsEditable
                            ? 'border-[#B7B7B7] focus:ring-purple-500 cursor-not-allowed'
                            : 'border-gray-300 bg-gray-100'
                        } px-4 py-3`}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-xs h-1"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        disabled={!isUserDetailsEditable}
                        className={`mt-1 block w-full rounded-md border-[1px] ${
                          isUserDetailsEditable
                            ? 'border-[#B7B7B7] focus:ring-blue-500'
                            : 'border-gray-300 bg-gray-100'
                        } px-4 py-3`}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-xs h-1"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        disabled={!isUserDetailsEditable}
                        className={`mt-1 block w-full rounded-md border-[1px] ${
                          isUserDetailsEditable
                            ? 'border-[#B7B7B7] focus:ring-blue-500'
                            : 'border-gray-300 bg-gray-100'
                        } px-4 py-3`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs h-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div className="container mx-auto p-8">
                  <div className="flex w-full justify-between mb-2">
                    <p>Security</p>
                    <button
                      type="button"
                      disabled={showEditPassword}
                      className={`flex items-center gap-2 px-4 py-2 text-[14px] ${
                        showEditPassword && 'cursor-not-allowed'
                      }`}
                      onClick={() => setShowEditPassword((prev) => !prev)}
                    >
                      <GoPencil /> Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative mt-1">
                        <Field
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          placeholder="Enter your password"
                          disabled={!showEditPassword}
                          className={`block w-full rounded-md border-[1px] ${
                            showEditPassword
                              ? 'border-[#B7B7B7] focus:ring-blue-500'
                              : 'border-gray-300 bg-gray-100'
                          } px-4 py-3`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          {showPassword ? (
                            <IoEyeOutline className="h-5 w-5" />
                          ) : (
                            <IoEyeOffOutline className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs h-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit and Delete Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                  <div className="flex w-full justify-between">
                    <div>
                      <button
                        type="button"
                        className="flex items-center gap-2 py-3 px-8 text-[14px] bg-[#EB5757] text-[#FFF] rounded-md justify-center"
                      >
                        <IoTrash className="h-5 w-5" /> Delete account
                      </button>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting || JSON.stringify(values) === JSON.stringify(initialValues)}
                        className={`flex items-center gap-2 py-3 px-20 text-[14px] ${
                          isSubmitting || JSON.stringify(values) === JSON.stringify(initialValues)
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#118B50]'
                        } text-[#FFF] rounded-md justify-center`}
                      >
                        <IoSaveOutline className="h-5 w-5" /> Save
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UserAccount;