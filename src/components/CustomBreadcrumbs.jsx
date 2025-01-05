import { Breadcrumbs } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router';
import { IoHomeSharp } from 'react-icons/io5';

const CustomBreadcrumbs = () => {
    const location = useLocation();
  return (
    // <div className="container mx-auto px-4 py-2">
      <Breadcrumbs className="text-gray-500 px-0 text-sm mb-8 bg-white" fullWidth>
        <Link to="/" className="opacity-60 ">
          <IoHomeSharp className="inline-block h-4 w-4 " />
        </Link>
        {location.pathname.search('yearbook') !== -1 ? (
          <span className="text-gray-900 capitalize ">Yearbook</span>
        ) : (
          <Link to="/yearbook" className="opacity-60 text-gray-700 hover:text-light-blue-500">
            Yearbook
          </Link>
        )}

        {location.pathname.search('details') !== -1 && (
          <span className="text-gray-900 capitalize">User Details</span>
        )}
        {location.pathname.search('edit') !== -1 && (
          <span className="text-gray-900 capitalize">Edit Profile</span>
        )}
      </Breadcrumbs>
    // </div>
  );
}

export default CustomBreadcrumbs
