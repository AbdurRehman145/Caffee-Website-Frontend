import React from 'react'
import About from '../about/About'
import Contact from '../Contact/Contact'
import Banner from '../../components/Banner/Banner'
import Discover from '../../components/Discover/Discover'
import Menu from '../Menu/Menu'
import Why from '../../components/Why/Why'
import Order from '../../components/Order/Order'
import Feedback from '../../components/Feedback/Feedback'
import Subscribe from '../../components/Subscribe/Subscribe'
import Categories from '../../components/Categories/Categories'

const Home = () => {
  return (
   <>
   <Banner />
   <About />
   <Categories/>
   <Menu />
   <Why />
   <Order />
   <Feedback />
   <Subscribe/>
   <Contact />
   </>
  )
}
export default Home
