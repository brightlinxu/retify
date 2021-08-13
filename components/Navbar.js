import ManualLogin from './ManualLogin.js';
import { getUrl } from './AuthUrl.js'

const Navbar = () => {
  return (
    <nav>
      <img src='/images/logo (black).png' style={{width: '80px', height: '40px'}}/>
      <ul>
        <li>about</li>
        {<li><ManualLogin displayStyle={'inline'}/></li>}
      </ul>
    </nav>
  );
}

export default Navbar;