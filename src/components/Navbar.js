import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { NavLink,Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
// scroll hide navbar
  const [scrollData, setScrollData] = useState({
    y: 0,
    lastY: 0
});
const [hideNav, setHideNav] = useState(false);

useEffect(() => {
    const handleScroll = () => {
        setScrollData(lastState => {
            return {
                y: window.scrollY,
                lastY: lastState.y
            }
        })
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };


}, []);

useEffect(() => {
    if (scrollData.y > 1 && scrollData.y - scrollData.lastY > 0) { // scrollData.y - scrollData last > 0  this means we are scrolling UP
        setHideNav(true);
    } else {
        setHideNav(false);
    }

}, [scrollData])
// scroll hide navbar ends

  return (
    <>
      <nav className= {hideNav ? 'navBar hideNav' : 'navBar'}>
        <div className='navbar-container'>
          <Link to='/home' className='navbar-logo' onClick={closeMobileMenu}>
          <i className="fab fa-adn"></i>
             <h5>ntics</h5>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <NavLink to='/home' className='nav-links' onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/contact'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Contacts
              </NavLink>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
