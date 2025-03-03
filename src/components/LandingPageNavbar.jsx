import { useContext } from 'react';
import { Link } from 'react-router';
import { AppContext } from '../context/contextApi';

const LandingPageNavbar = () => {
  const { getSession, logout } = useContext(AppContext);


  return (
    <>
      <header className="max-w-xxl mx-auto bg-purple-600 bg-opacity-80 rounded-lg shadow-md">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                ></path>
              </svg>

              {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              {/* <Link
                to="/"
                className="block py-2 px-3 text-xl font-semibold text-white transition-all duration-200 hover:text-opacity-80"
                aria-current="page"
              >
                Home
              </Link> */}
              <Link
                to="/about"
                className="block py-2 px-3 text-xl font-semibold text-white transition-all duration-200 hover:text-opacity-80"
                aria-current="page"
              >
                About Us
              </Link>
              <Link
                to="/yearbook"
                className="block py-2 px-3 text-xl font-semibold text-white transition-all duration-200 hover:text-opacity-80"
                aria-current="page"
              >
                Yearbook
              </Link>
              {!getSession() ? (
                <Link
                  to="/login"
                  className="block py-2 px-3 text-xl font-semibold text-white transition-all duration-200 hover:text-opacity-80"
                  aria-current="page"
                >
                  Login
                </Link>
              ) : (
                <Link
                onClick={logout}
                  to="#"
                  className="block py-2 px-3 text-xl font-semibold text-white transition-all duration-200 hover:text-opacity-80"
                  aria-current="page"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default LandingPageNavbar;
