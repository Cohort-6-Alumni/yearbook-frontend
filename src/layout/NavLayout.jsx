import Navbar from '../components/Navbar.jsx';
import PropTypes from 'prop-types';

const NavLayout = ({ children,showNav=false }) => {
  return (
    <div className={'flex flex-col min-h-screen hide-scrollbar'}>
      {showNav && <Navbar />}
      <div className="container mx-auto max-w-5xl px-4 ">
        <main className="flex-grow mt-12">{children}</main>
      </div>
    </div>
  );
};
export default NavLayout;

NavLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showNav: PropTypes.bool.isRequired,
};
