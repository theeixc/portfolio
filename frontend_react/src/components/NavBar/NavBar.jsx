import React, { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'

import { images } from '../../constants';
import './NavBar.scss'

const NavBar = () => {

  const [toogle, setToogle] = useState(false);

  return (
    <nav className='app__navbar'>
      {/* 左侧 logo */}
      <div className='app__navbar-logo'>
        <img src={images.logo} alt="logo" />
      </div>
      {/* 顶部链接 */}
      <ul className='app__navbar-links'>
        {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
          <li key={`link-${item}`} className='app__flex p-text'>
            <div></div>
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
      {/* 右侧菜单按钮 */}
      <div className='app__navbar-menu'>
        <HiMenu onClick={() => setToogle(true)} />

        {toogle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToogle(false)} />
            <ul>
              {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToogle(false)}>{item}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default NavBar