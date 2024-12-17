import Navbar from "../components/Navbar.jsx";
import PropTypes from "prop-types";

const NavLayout = ({ children }) => {
    return (
        <div className={'flex flex-col min-h-screen hide-scrollbar'}>
            <Navbar/>
            <main className="flex-grow mt-12">{children}</main>
        </div>
    );
}
export default NavLayout;


NavLayout.propTypes = {
    children: PropTypes.node.isRequired
};