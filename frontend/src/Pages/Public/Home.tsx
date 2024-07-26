import React from 'react'
import Hero from './Hero'
import Features from './Features'
import Process from './Process'
import Contact from './Contact'

const Home = () => {
  return (
    <div className='home'>
        <Hero />
        <Features />
        <Process />
        <Contact />
    </div>
  )
}

export default Home