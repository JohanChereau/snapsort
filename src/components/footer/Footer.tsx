import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  const ICONS_SIZE = 1.8;

  const [applicationVersion, setApplicationVersion] = useState<string | null>(
    null
  );
  const footerRef = useRef<HTMLDivElement | null>(null);

  const getAppVersion = async () => {
    const version = await window.electron.application.getVersion();

    if (version) {
      setApplicationVersion(version);
    }
  };

  useEffect(() => {
    getAppVersion();

    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        { duration: 1, opacity: 1 }
      );
    }
  }, []);

  return (
    <footer ref={footerRef}>
      <p className="footer__software-version darken-text">{`Snapsort - BETA version ${
        applicationVersion || "unknown"
      }`}</p>
      <p className="footer__copyrights">Copyright © 2024 Johan Chereau</p>

      <ul className="social__list">
        <li className="social__item">
          <a href="#" className="social__link" target="_blank">
            <FaGlobe size={`${ICONS_SIZE}em`} />
          </a>
        </li>

        <li className="social__item">
          <a
            href="https://github.com/JohanChereau/snapsort"
            className="social__link"
            target="_blank"
          >
            <FaGithub size={`${ICONS_SIZE}em`} />
          </a>
        </li>

        <li className="social__item">
          <a
            href="https://fr.linkedin.com/in/johan-chereau"
            className="social__link"
            target="_blank"
          >
            <FaLinkedin size={`${ICONS_SIZE}em`} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
