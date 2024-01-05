import Footer from '@/components/footer/Footer';
import './HomePage.scss';
import ToolBox from '@/components/toolBox/ToolBox';

const HomePage = () => {
  return (
    <>
      <main>
        <section className="home-section">
          <h2>Welcome</h2>
          <ToolBox />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
