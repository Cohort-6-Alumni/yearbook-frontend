import { useState, useContext } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/logo.png';
import { login } from '../../api';
import { AppContext } from '../../context/contextApi';
import { Link, useNavigate } from 'react-router';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setSession, setUserData } = useContext(AppContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await login(values.username, values.password);
      if (response.status === 200) {
        setSession(response.headers.authorization);
        setUserData(response.data);
        navigate('/home');
      } else {
        setLoginError(response.data.message);
      }
    },
  });

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="flex justify-center mb-6">
            <Link to="/"> <img src={Logo} alt="Graduation Icon" className="w-16 h-16"/></Link>

          </div>

          <Typography variant="h3" className="text-center mb-8">
            Welcome Back!
          </Typography>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <div className="relative">
              <Input
                type="text"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && formik.errors.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm">{formik.errors.username}</div>
              ) : null}
            </div>

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
            {loginError && <div className="text-red-500 text-sm text-center">{loginError}</div>}

            <Button type="submit" fullWidth className="bg-purple-500 hover:bg-purple-600">
              Login
            </Button>

            <div className="text-center">
              <Typography color="gray" className="text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="text-purple-500 font-medium hover:text-purple-600">
                  Contact Admin for access
                </a>
              </Typography>
            </div>
          </form>
        </Card>
      </div>

      {/* Right Side - Content */}
      <div className="w-1/2 bg-purple-500 p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md text-center">
          <Card className="w-full p-8 bg-white mb-8">
            <Typography variant="h2" className="text-purple-500">
              Obsidi Academy
            </Typography>
            <Typography variant="h2" className="mb-5 text-purple-500">
              Graduate Yearbook
            </Typography>
            <Typography className="">
              This year book aims to celebrate our beginnings, showcase our growth and inspire
              future tech enthusiast through shared stories and lasting connections.
            </Typography>
          </Card>
          <Typography variant="h3" className="mb-6">
            Connect, Share, Inspire
          </Typography>
          <Typography>
            To be the blueprint that inspires others to embark on their tech journey, proving
            through our stories that with dedication, even the hardest challenges can be overcome.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
