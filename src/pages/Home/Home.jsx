import React from 'react'
import About from '../about/About'
import Contact from '../Contact/Contact'
import Banner from '../../components/Banner/Banner'
import Discover from '../../components/Discover/Discover'
import CoffeeMenu from '../../components/CoffeeMenu/CoffeeMenu'
import Why from '../../components/Why/Why'
import Order from '../../components/Order/Order'
import Feedback from '../../components/Feedback/Feedback'
import Subscribe from '../../components/Subscribe/Subscribe'
import Categories from '../../components/Categories/Categories'
import Coffeepromo from '../../components/Coffeepromo/Coffeepromo'

const Home = () => {
  return (
   <>
   <Banner />
   <About />
   <Categories/>
   <Coffeepromo/>
   <CoffeeMenu />

   <Feedback />
   <Subscribe/>
   <Contact />
   </>
  )
}
export default Home
