import React from 'react'

const NavigationDots = ({ active }) => {
  return (
    <div className='app__navigation'>
      {['home', 'about', 'work', 'skills', 'testimonial', 'contact'].map((item, index) => (
        <a
          className='app__navigation-dot'
          style={active === item ? { backgroundColor: "#313BAC" } : {}}
          href={`#${item}`}
          key={item + index}
        />
      ))}
    </div>
  )
}

export default NavigationDots