import { Link } from 'react-router-dom';
import './HomePage.scss';
import Footer from '@/components/footer/Footer';

const HomePage = () => {
  return (
    <>
      <main>
        <section className="home-section">
          <h2>Welcome</h2>
          <Link to="/sorting-tool">Start</Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
