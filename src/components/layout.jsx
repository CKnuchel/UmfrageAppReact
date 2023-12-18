import PropTypes from 'prop-types';
import Navbar from "./navbar";

/**
 * Komponente für das Layout der Anwendung.
 * 
 * @param {Object} props - Die Eigenschaften der Komponente.
 * @param {React.ReactNode} props.children - Die untergeordneten Elemente der Komponente.
 * @returns {React.ReactNode} Das gerenderte Layout.
 */
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
