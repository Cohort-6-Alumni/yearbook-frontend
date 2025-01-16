import { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TopRightElipse from '../../assets/top-right-elipse.png';
import BottomLeftElipse from '../../assets/bottom-left-elipse.png';
import { Link, useSearchParams, useNavigate } from 'react-router';
import { completeSignUp } from '../../api';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const CompleteSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await completeSignUp(token, values.password);
        if (response.status === 200) {
          toast.success('Account created successfully!');
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  const token = searchParams.get('token');

  return (
    <div className="min-h-screen bg-purple-500 flex items-center justify-center p-4 relative">
      <img src={TopRightElipse} alt="Top Right Elipse" className="absolute top-0 right-0 w-1/2" />
      <Card className="w-full max-w-md p-6">
        <Typography variant="h4" className="text-center mb-6">
          Complete Sign up
        </Typography>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
              icon={
                <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <IoEyeOutline className="h-5 w-5" />
                  ) : (
                    <IoEyeOffOutline className="h-5 w-5" />
                  )}
                </div>
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              label="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
              icon={
                <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <IoEyeOutline className="h-5 w-5" />
                  ) : (
                    <IoEyeOffOutline className="h-5 w-5" />
                  )}
                </div>
              }
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>

          <Button type="submit" fullWidth className="bg-purple-500 hover:bg-purple-600">
            Confirm
          </Button>

          <Typography color="gray" className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 font-medium hover:text-purple-600">
              Login
            </Link>
          </Typography>

          <Typography variant="small" color="gray" className="text-center text-xs">
            By proceeding, you agree to the Privacy Policy and the Terms and Conditions of this
            product and every other third party services.
          </Typography>
        </form>
      </Card>
      <img
        src={BottomLeftElipse}
        alt="Bottom Left Elipse"
        className="absolute bottom-0 left-0 w-1/2"
      />
    </div>
  );
};

export default CompleteSignUp;
