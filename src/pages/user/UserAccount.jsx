import { useState, useRef, useEffect } from 'react';
import UserBanner from '../../components/UserBanner.jsx';
import { GoPencil } from 'react-icons/go';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validationSchema } from '../../utils/schema/profileSchema.js';
import { IoEyeOutline, IoEyeOffOutline, IoTrash, IoSaveOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import ImageCropper from '../../components/ImageCropper.jsx';
import { convertBase64 } from '../../utils/Helper.js';
import AvatarPlaceHolder from '../../assets/Profile_avatar_placeholder_large.png';
import { useAuth } from '../../hooks/useAuth'; // New import for React Query

const UserAccount = () => {
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isUserDetailsEditable, setIsUserDetailsEditable] = useState(false);
  const [modalIsOpen, setModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(AvatarPlaceHolder);
  const [uploadImageData, setUploadImageData] = useState(undefined);

  // Replace context with React Query hook
  const { user, updateUser, getToken } = useAuth();

  const imageSelectRef = useRef();
  const formikRef = useRef();

  useEffect(() => {
    const userPicture = user?.picture || AvatarPlaceHolder;
    setImageSrc(userPicture);
  }, [user]);

  useEffect(() => {
    if (imageSrc && imageSrc !== AvatarPlaceHolder) {
      formikRef.current?.setFieldValue('picture', imageSrc);
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
      <div className="flex flex-col px-4 md:px-6">
        <div className="w-full max-w-4xl mx-auto">
          <Formik
            innerRef={formikRef}
            initialValues={{
              firstName: user?.firstName || '',
              username: user?.username || '',
              lastName: user?.lastName || '',
              email: user?.emailId || '',
              password: '',
              picture: user?.picture || AvatarPlaceHolder,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                // Use React Query mutation to update user
                await updateUser(values);
                toast.success('Profile updated successfully');
                setIsUserDetailsEditable(false);
                setShowEditPassword(false);
                resetForm({ values });
              } catch (error) {
                toast.error(error.message || 'Failed to update profile');
                console.error(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, initialValues, isSubmitting }) => (
              <Form className="w-full">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center mb-6 mt-4">
                  <img
                    className="w-[120px] h-[120px] rounded-full border border-gray-300 object-cover shadow-sm"
                    src={imageSrc}
                    alt="Avatar"
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
                  <div className="hidden">
                    <Field type="text" name="picture" id="picture" />
                  </div>
                </div>

                {/* User Details Section */}
                <div className="w-full bg-white rounded-lg shadow-sm mb-6">
                  <div className="flex justify-between items-center px-5 py-4 border-b">
                    <h2 className="text-lg font-medium text-gray-800">User Details</h2>
                    <button
                      type="button"
                      disabled={isUserDetailsEditable}
                      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md
                        ${isUserDetailsEditable 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-100 transition-colors'}`}
                      onClick={() => setIsUserDetailsEditable((prev) => !prev)}
                    >
                      <GoPencil /> Edit
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* First Name */}
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          First Name
                        </label>
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          disabled={!isUserDetailsEditable}
                          className={`block w-full rounded-md border ${
                            isUserDetailsEditable
                              ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                              : 'border-gray-200 bg-gray-50'
                          } px-4 py-2.5 text-sm`}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Username */}
                      <div>
                        <label 
                          htmlFor="username" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Username
                        </label>
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          disabled
                          className="block w-full rounded-md border border-gray-200 
                                     bg-gray-50 px-4 py-2.5 text-sm cursor-not-allowed"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label 
                          htmlFor="lastName" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Last Name
                        </label>
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          disabled={!isUserDetailsEditable}
                          className={`block w-full rounded-md border ${
                            isUserDetailsEditable
                              ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                              : 'border-gray-200 bg-gray-50'
                          } px-4 py-2.5 text-sm`}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label 
                          htmlFor="email" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          disabled={!isUserDetailsEditable}
                          className={`block w-full rounded-md border ${
                            isUserDetailsEditable
                              ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                              : 'border-gray-200 bg-gray-50'
                          } px-4 py-2.5 text-sm`}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div className="w-full bg-white rounded-lg shadow-sm mb-6">
                  <div className="flex justify-between items-center px-5 py-4 border-b">
                    <h2 className="text-lg font-medium text-gray-800">Security</h2>
                    <button
                      type="button"
                      disabled={showEditPassword}
                      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md
                        ${showEditPassword 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gray-100 transition-colors'}`}
                      onClick={() => setShowEditPassword((prev) => !prev)}
                    >
                      <GoPencil /> Edit
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Password */}
                      <div>
                        <label 
                          htmlFor="password" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <Field
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            disabled={!showEditPassword}
                            className={`block w-full rounded-md border ${
                              showEditPassword
                                ? 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                                : 'border-gray-200 bg-gray-50'
                            } px-4 py-2.5 text-sm pr-10`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-2 flex items-center px-2 
                                      text-gray-500 hover:text-gray-700 focus:outline-none"
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
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit and Delete Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 mb-8">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-6 
                              bg-red-500 hover:bg-red-600 text-white rounded-md 
                              transition-colors text-sm sm:text-base"
                  >
                    <IoTrash className="h-5 w-5" /> Delete account
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || JSON.stringify(values) === JSON.stringify(initialValues)}
                    className={`flex items-center justify-center gap-2 py-2.5 px-6 
                              ${isSubmitting || JSON.stringify(values) === JSON.stringify(initialValues)
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700'
                              } text-white rounded-md transition-colors text-sm sm:text-base`}
                  >
                    <IoSaveOutline className="h-5 w-5" /> Save
                  </button>
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