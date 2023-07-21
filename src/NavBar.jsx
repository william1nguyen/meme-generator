import './NavBar.css';
import { ReactComponent as TrollFaceIcon } from './assets/TrollFace.svg';

const NavBar = () => {
    return (
        <div className='nav-bar'>
            <div className='main-title'>
                <TrollFaceIcon />
                Meme Generator
            </div>
            <div className='sub-title'>
                React Course - project3
            </div>
        </div>
    );
}

export default NavBar;