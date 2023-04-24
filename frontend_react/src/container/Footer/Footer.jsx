import React, { useState } from 'react'

import { AppWrap, MotionWrap } from '../../wrapper'
import { images } from '../../constants'
import { client } from '../../client'
import './Footer.scss'

const Footer = () => {


  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSeeded, setIsSeeded] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }



  const handleSubmit = () => {
    setLoading(true);
    const { name, email, message } = form;

    const contact = {
      _type: 'contact',
      name,
      email,
      message
    }

    client.create(contact)
      .then(() => {
        setLoading(false);

        setIsSeeded(true);
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2 className='head-text'>Take a Coffe & Chat With Me</h2>

      {/* 电话和邮箱 */}
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:cxclimb@gamil.com" className='p-text'>cxclimb@gamil.com</a>
        </div>

        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +13080630016" className='p-text'>+13080630016 </a>
        </div>
      </div>

      {/* 根据是否已联系，展示表单 */}
      {!isSeeded ? (
        <div className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input type="text" className='p-text' name='name' placeholder='Your Name' value={form.name} onChange={(e) => handleInputChange(e)} />
          </div>

          <div className='app__flex'>
            <input type="email" className='p-text' name='email' placeholder='Your Email' value={form.email} onChange={(e) => handleInputChange(e)} />
          </div>

          <div>
            <textarea className='p-text' name='message' placeholder='Your Message' value={form.message} onChange={(e) => handleInputChange(e)}></textarea>
          </div>

          <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'Seeding...' : 'Seed Message'}</button>
        </div>
      )
        : (
          <div>
            <h3 className="head-text">
              Thank you for getting in touch!
            </h3>
          </div>
        )
      }
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)