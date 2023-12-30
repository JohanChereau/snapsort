import snapsortLogo from '/Snapsort.png';
import './Header.scss';

const Header = () => {
  return (
    <header>
        <img src={snapsortLogo} alt="Snapsort logo" className="header__logo" />
        <h1 className="header__title">Snapsort</h1>
        <p className="header__subtitle">Easy-to-use photo sorting utility</p>
    </header>
  )
}

export default Header