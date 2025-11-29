import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`nav ${isScrolled ? 'affix' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="flex items-center gap-2">
            <img src="/icons8-space-60.png" alt="Freelancer Space" className="w-8 h-8" />
            <span>Freelancer Space</span>
          </Link>
        </div>
        
        <div id="mainListDiv" className={`main_list ${isMenuOpen ? 'show_list' : ''}`}>
          <ul className="navlinks">
            <li>
              <Link to="/login?intent=hire" onClick={closeMenu}>
                Hire Freelancers
              </Link>
            </li>
            <li>
              <Link to="/login?intent=work" onClick={closeMenu}>
                Find Work
              </Link>
            </li>
            <li>
              <Link to="/solutions" onClick={closeMenu}>
                Solutions
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeMenu}>
                Log In
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={closeMenu}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
        
        <span 
          className={`navTrigger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
