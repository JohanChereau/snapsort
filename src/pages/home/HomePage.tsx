import './HomePage.scss';
import Footer from '@/components/footer/Footer';
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
