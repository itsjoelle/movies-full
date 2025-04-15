import React, { ChangeEvent, useEffect, useState } from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPowerOff, FaSearch } from 'react-icons/fa';
import { LuMenu } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { useViewport } from '../../customHooks/useViewport';
import { setSearchContent, updateSearch } from '../../state/search/searchSlice';
import { AppDispatch } from '../../state/store';
import { useDebounce } from '../../customHooks/useDebounce';
import { logout } from '../../state/auth/authSlice';
import { data } from '../../data/dataFields';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [navbarDark, setNavbarDark] = useState(false);
  const [searchItem, setSearchItem] = useState<string>('');
  const windowSize = useViewport();
  const debouncedSearchValue = useDebounce(searchItem, 500);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const searchValue = (target as HTMLInputElement).value;
    setSearchItem(searchValue);
  };

  const logOut = () => {
    navigate('/signup');
    dispatch(logout());
  };

  const navigateGenre = (genre: string) => {
    genre === 'TV Shows'
      ? navigate('/tv')
      : genre === 'Movies'
      ? navigate('/movies')
      : genre === 'Favorites'
      ? navigate('/favorites')
      : navigate('/');

    dispatch(updateSearch(''));
  };

  useEffect(() => {
    const handleNavbarOnScroll = () => {
      if (window.scrollY > 40) {
        setNavbarDark(true);
      } else {
        setNavbarDark(false);
      }
    };

    window.addEventListener('scroll', handleNavbarOnScroll);

    return () => window.removeEventListener('scroll', handleNavbarOnScroll);
  }, []);

  useEffect(() => {
    dispatch(updateSearch(debouncedSearchValue));
    dispatch(setSearchContent(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  useEffect(() => {
    if (windowSize >= 810) {
      setShowOverlay(false);
    }
  }, [windowSize]);

  return (
    <div className="container-navbar">
      <div className={`nav flex ${navbarDark ? 'dark' : ''}`}>
        <div className="left flex a-center gap navContainer">
          <div className="brand flex a-center j-center">
            {/* <img src={logo} alt="" /> */}
            <div className="logoname">
              CINEMATIC{' '}
              <span>
                {' '}
                <FaPlay />
              </span>
            </div>
          </div>

          <div
            className="overlay"
            style={
              showOverlay
                ? { transform: 'translateX(-32px)' }
                : { transform: 'translateX(100%)' }
            }
          >
            {showOverlay && (
              <ul className="links-mobile">
                {data.linksMobile.map((item, i) => {
                  return (
                    <li key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                      <div
                        onClick={
                          i === 4 ? logOut : () => navigateGenre(item.name)
                        }
                        className="field"
                      >
                        {i === 4 && (
                          <span className="signout-list">
                            <FaPowerOff size={16} />
                          </span>
                        )}
                        {item.name}
                      </div>

                      <div className="separator"></div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <ul className="links flex">
            {data.links.map((item, i) => {
              return (
                <li key={i}>
                  <div onClick={() => navigateGenre(item.name)}>
                    {item.name}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch && 'show-search'}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
            >
              <FaSearch size={18} />
            </button>
            <input
              type="text"
              placeholder="Search"
              name="password"
              value={searchItem}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
            ></input>
          </div>

          <button className="signout" onClick={logOut}>
            <span>
              <FaPowerOff size={16} />
            </span>
            <span>Sign out</span>
          </button>

          <div
            className="hamburger"
            onClick={() => setShowOverlay((prev) => !prev)}
          >
            <LuMenu size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
