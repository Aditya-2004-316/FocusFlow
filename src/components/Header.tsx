import "./Header.css"; // Import the new Header.css file

const Header = () => (
    <header className="header-container">
        <img
            src="/logo.svg"
            alt="FocusFlow"
            className="header-logo"
            style={{ width: 40, height: 40 }}
        />
        <span className="header-title">FocusFlow</span>
    </header>
);

export default Header;
