import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

import { AppWrap, MotionWrap } from '../../wrapper'
import { client, urlFor } from '../../client'
import { brandsQuery, testimonialQuery } from '../../utils/data'

import './Testimonial.scss'

const Testimonial = () => {

  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTest = testimonials[currentIndex];

  // 点击按钮的回调
  const handleClick = (index) => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const query = brandsQuery();

    client.fetch(query)
      .then((data) => {
        setBrands(data);
      })
  }, [])

  useEffect(() => {
    const query = testimonialQuery();

    client.fetch(query)
      .then((data) => {
        setTestimonials(data);
      })
  }, [])

  return (
    <>
      {/* 展示别人的评价 */}
      {testimonials.length && (
        <>
          <div className='app__testimonial-item app__flex'>
            <img src={urlFor(currentTest.imgurl)} alt="testimonial" />
            <div className='app__testimonial-content'>
              <p className='p-text'>{currentTest.feedback}</p>
              <div>
                <h4 className='bold-text'>{currentTest.name}</h4>
                <h5 className='p-text'>{currentTest.company}</h5>
              </div>
            </div>
          </div>

          {/* 按钮区 */}
          <div className='app__testimonial-btns app__flex'>
            <div className='app__flex' onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronDoubleLeft />
            </div>

            <div className='app__flex' onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronDoubleRight />
            </div>
          </div>

          {/* 展示工作过的公司 */}
          <div className='app__testimonial-brands app__flex'>
            {brands.map((brand) => (
              <motion.div
                key={brand._id}
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, type: 'tween' }}
              >
                <img src={urlFor(brand.imgUrl)} alt="brand" />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
)