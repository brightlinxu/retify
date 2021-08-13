import { useEffect, useState } from 'react';
import ManualLogin from './ManualLogin.js';
import { getWindowSize } from './WindowSize.js';

const Navbar = () => {
  return (
    <nav style={{width: `${getWindowSize().width - 20}px`}}>
      <a href='/' >
        <img src='/images/logo (black).png' style={{width: '80px', height: '40px'}} id='center'/>
      </a>
      <ul>
        <li>about</li>
        {<li><ManualLogin displayStyle={'inline'}/></li>}
      </ul>
    </nav>
  );
}

export default Navbar;