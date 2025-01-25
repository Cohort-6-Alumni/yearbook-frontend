import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@material-tailwind/react';
import { forgotPassword } from '../../api';

import LogoImage from '../../assets/logo.png';

const ForgotPassword = () => {
  const [isFetching, setIsFetching] = useState(false);
  const formikRef = useRef();

  useEffect(() => {
    document.title = 'Forgot Password | Yearbook';
  }, []);

  const onFormSubmit = async (values, { setFieldValue }) => {
    if (!isFetching) {
      setIsFetching(true); // Prevent multiple submissions
      try {
        const response = await forgotPassword(values.email);
        if (response.status === 200) {
          setFieldValue('formMessage', 'Please check your email to reset the password.');
        } else {
          setFieldValue('formMessage', response.payLoad || 'An error occurred. Please try again.');
        }
      } catch (error) {
        setFieldValue('formMessage', 'An error occurred. Please try again.');
      } finally {
        setIsFetching(false);
      }
    }
  };

  // Validation schema for the form
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full mx-auto lg:w-full mt-20 md:mt-0 px-10 md:px-36">
          <div className="flex-1">
            <div className="text-center">
              <Formik
                innerRef={formikRef}
                initialValues={{
                  email: '',
                  formMessage: '',
                }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={onFormSubmit}
              >
                {({ values }) => (
                  <Form>
                    {values.formMessage && (
                      <div className="w-full md:w-1/2 mx-auto">
                        <div className="text-green-500 text-sm mt-4">{values.formMessage}</div>
                      </div>
                    )}
                    <img src={LogoImage} width={120} className="mx-auto mb-2" alt="Logo" />
                    <h2 className="text-4xl font-bold text-center text-gray-700">
                      Forgot Password?
                    </h2>

                    <p className="mt-3 text-gray-500 mb-10">
                      Enter your email below to get a reset link.
                    </p>

                    <div className="my-5 w-60 mx-auto">
                      <Field
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div className="my-5 w-60 mx-auto">
                      <Button
                        type="submit"
                        fullWidth
                        className="bg-purple-500 hover:bg-purple-600"
                        disabled={isFetching}
                      >
                        {isFetching ? 'Submitting...' : 'Request Link'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <Link
                to="/login"
                className="text-sm text-gray-400 focus:text-purple-500 hover:text-purple-500 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
