import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import snapsortLogo from '/Snapsort.png';
import './Header.scss';

const Header = () => {

  const logoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if(logoRef.current) {
      gsap.fromTo(logoRef.current, {y: -100, opacity: 0, rotation: -1080}, {duration: 2, y: 0, opacity: 1, rotation: 0})
    }   
  }, [])
  

  return (
    <header>
        <img ref={logoRef} src={snapsortLogo} alt="Snapsort logo" className="header__logo" />
        <h1 className="header__title">Snapsort</h1>
        <p className="header__subtitle">Easy-to-use photo sorting utility</p>
    </header>
  )
}

export default Header