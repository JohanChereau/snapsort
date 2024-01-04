import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './HomeButton.scss';

const HomeButton = () => {
  return (
    <Link to='/' aria-description='Go to home button' className="home-button__icon">
        <IoArrowBack size='2.6em' color='var(--clr-neutral-100)'/>
    </Link>
  )
}

export default HomeButton;