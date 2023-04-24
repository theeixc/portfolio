import React from 'react'
import { motion } from 'framer-motion'


// 动画 wrapper
const MotionWrap = (Component, className) => function HOC() {
  return (
    <motion.div
      className={`${className} app__flex`}
      whileInView={{ opacity: [0, 0, 1], y: [100, 50, 0] }}
      transition={{ duration: 0.5 }}
    >
      <Component />
    </motion.div>
  )
}

export default MotionWrap