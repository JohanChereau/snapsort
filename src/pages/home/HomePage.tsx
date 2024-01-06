import { useEffect, useRef } from 'react';
import {gsap} from 'gsap';
import Footer from '@/components/footer/Footer';
import ToolBox from '@/components/toolBox/ToolBox';
import './HomePage.scss';

const HomePage = () => {

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if(titleRef.current) {
      gsap.fromTo(titleRef.current, {x: -150, opacity: 0}, {duration: .5, x: 0, opacity: 1});
    }
  }, [])
  

  return (
    <>
      <main>
        <section className="home-section">
          <h2 ref={titleRef}>Welcome</h2>
          <ToolBox />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
