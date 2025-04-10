import { useState, useEffect } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/logo.png';
import { login } from '../../api';
import { Link, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setWithExpiry } from '../../utils/storage';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Create a mutation for login
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await login(username, password);
      if (response.status !== 200) {
        throw new Error(response.data?.message || 'Login failed');
      }
      return response;
    },
    onSuccess: (data) => {
      // Store token and user data in localStorage with expiry
      const ttl = 3600 * 1000; // 1 hour
      setWithExpiry('user_access', data.auth, ttl);
      setWithExpiry('app_user', data.data, ttl);
      
      // IMPORTANT: Set user data in cache BEFORE navigating
      queryClient.setQueryData(['userData'], data.data);
      
      // Navigate to yearbook page after cache is updated
      navigate('/yearbook');
    },
    onError: (error) => {
      setLoginError(error.message || 'An error occurred during login');
    }
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoginError('');
      loginMutation.mutate({ 
        username: values.username, 
        password: values.password 
      });
    },
  });

  useEffect(() => {
    document.title = 'Login | Yearbook';
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Login Form - Full width on mobile, half width on desktop */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex items-center justify-center flex-grow">
          <Card className="w-full max-w-md p-4 sm:p-8 shadow-lg my-auto border-t-4 border-purple-500">
            <div className="flex justify-center mb-4 sm:mb-6">
          <Link to="/" className="transition-transform hover:scale-105">
            <img src={Logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
          </Link>
            </div>

            <Typography variant="h4" className="text-center mb-6 text-gray-800">
          Welcome Back!
            </Typography>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 sm:gap-6">
          <div className="relative">
            <Input
              type="text"
              name="username"
              label="Username"
              size="lg"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              className="focus:border-purple-500"
            />
            {formik.touched.username && formik.errors.username && (
              <Typography color="red" className="text-xs mt-1">
            {formik.errors.username}
              </Typography>
            )}
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              size="lg"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              className="focus:border-purple-500"
              icon={
            <button
              type="button"
              className="text-gray-500 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <IoEyeOutline className="h-5 w-5" />
              ) : (
                <IoEyeOffOutline className="h-5 w-5" />
              )}
            </button>
              }
            />
            {formik.touched.password && formik.errors.password && (
              <Typography color="red" className="text-xs mt-1">
            {formik.errors.password}
              </Typography>
            )}
            
            <div className="flex justify-end mt-1">
              <Typography
            as={Link}
            to="/forgot_password"
            color="purple"
            className="text-xs sm:text-sm font-medium hover:underline"
              >
            Forgot Password?
              </Typography>
            </div>
          </div>

          {loginError && (
            <Typography color="red" className="text-sm text-center bg-red-50 p-2 rounded">
              {loginError}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            className="bg-purple-500 hover:bg-purple-600 shadow-md normal-case text-base"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              'Login'
            )}
          </Button>

          <div className="text-center mt-2">
            <Typography color="gray" className="text-xs sm:text-sm">
              Don&apos;t have an account?{' '}
              <a
            href="mailto:support@obsidialumniyearbook.com"
            rel="noreferrer"
            target="_blank"
            className="text-purple-500 font-medium hover:underline"
              >
            Contact Admin
              </a>
            </Typography>
          </div>
            </form>
          </Card>
        </div>

        {/* Right Side Content - Hidden on mobile, visible on md+ screens */}
      <div className="hidden md:flex w-1/2 bg-purple-500 p-8 flex-col justify-center items-center text-white">
        <div className="max-w-md text-center">
          <Card className="w-full p-6 bg-white mb-8 shadow-lg">
            <Typography variant="h3" className="text-purple-500 text-2xl md:text-3xl">
              Obsidi Academy
            </Typography>
            <Typography variant="h3" className="mb-4 text-purple-500 text-2xl md:text-3xl">
              Graduate Yearbook
            </Typography>
            <Typography className="text-gray-700 text-sm md:text-base">
              This yearbook aims to celebrate our beginnings, showcase our growth and inspire
              future tech enthusiasts through shared stories and lasting connections.
            </Typography>
          </Card>
          <Typography variant="h4" className="mb-4">
            Connect, Share, Inspire
          </Typography>
          <Typography className="text-sm md:text-base">
            To be the blueprint that inspires others to embark on their tech journey, proving
            through our stories that with dedication, even the hardest challenges can be overcome.
          </Typography>
        </div>
      </div>

      {/* Simplified branding footer for mobile only */}
      <div className="md:hidden bg-purple-100 p-4 mt-auto">
        <div className="text-center">
          <Typography variant="h6" className="text-purple-500 font-bold">
            Obsidi Academy Graduate Yearbook
          </Typography>
          <Typography variant="small" className="text-gray-700">
            Connect, Share, Inspire
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;