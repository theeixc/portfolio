import React, { useState, useEffect, Fragment } from 'react'
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip'

import { AppWrap, MotionWrap } from '../../wrapper'
import { client, urlFor } from '../../client'
import { skillsQuery, expriencesQuery } from '../../utils/data'

import './Skills.scss'

const Skills = () => {


  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // 查询 skills
  useEffect(() => {
    const query = skillsQuery();

    client.fetch(query)
      .then((data) => setSkills(data))
  }, [])

  // 查询 experiences
  useEffect(() => {
    const query = expriencesQuery();

    client.fetch(query)
      .then((data) => {
        console.log(data);
        setExperiences(data)
      })
  }, [])



  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        {/* 左侧技能展示 */}
        <motion.div
          className="app__skills-list"
        >
          {skills.map((skill) => (
            <motion.div
              className="app__skills-item app__flex"
              key={skill.name}
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
            >
              <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>

              <p className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 右侧工作经历展示 */}
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div
              className="app__skills-exp-item"
              key={experience.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <Fragment key={work._key}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    {/* hover 时出现的提示词 */}
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
)