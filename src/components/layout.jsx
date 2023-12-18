import PropTypes from 'prop-types';
import Navbar from "./navbar";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="container">
                {children}
            </div>
        </>
    );
};

// Gemäss Doku von react-router-dom muss children ein node sein
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
