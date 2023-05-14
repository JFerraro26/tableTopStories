import { NavLink } from 'react-router-dom';
import NavMyContent from './NavMyContent';

function Nav() {
    return (
        <nav>
          <div className='navbar flex items-center w-full h-16 px-2 gap-4'>
              <NavLink className="text-2xl font-semibold hover:text-red-500" to="/">Home</NavLink>
              <NavMyContent />
          </div>
        </nav>
    )
}

export default Nav;
