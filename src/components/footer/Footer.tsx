import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';
import './Footer.scss';
import { useEffect, useState } from 'react';

const Footer = () => {
  const ICONS_SIZE = 1.8;

  const [applicationVersion, setApplicationVersion] = useState<string | null>(null);

  const getAppVersion = async () => {
    const version = await window.electron.application.getVersion();

    if(version) {
      setApplicationVersion(version);
    }
  }

  useEffect(() => {
    getAppVersion();
  
  }, [])
  

  return (
    <footer>
      <p className="footer__software-version darken-text">{`Snapsort - version ${applicationVersion || 'unknown'}`}</p>
      <p className="footer__copyrights">
        Copyright © 2024 Johan Chereau
      </p>

      <ul className="social__list">
        <li className="social__item">
          <a href="#" className="social__link">
            <FaGlobe size={`${ICONS_SIZE}em`} />
          </a>
        </li>

        <li className="social__item">
          <a href="#" className="social__link">
            <FaGithub size={`${ICONS_SIZE}em`} />
          </a>
        </li>

        <li className="social__item">
          <a href="#" className="social__link">
            <FaLinkedin size={`${ICONS_SIZE}em`} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
