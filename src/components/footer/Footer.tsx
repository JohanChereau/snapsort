import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const ICONS_SIZE = 1.8;

  return (
    <footer>
      <p className="footer__software-version darken-text">Snapsort version 1.0.0</p>
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
