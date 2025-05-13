import React from 'react'
import About from '../about/About'
import Banner from '../../components/Banner/Banner'
import CoffeeMenu from '../../components/CoffeeMenu/CoffeeMenu'
import TestimonialSlider from '../../components//TestimonialSlider/TestimonialSlider'
import HomeProducts from '../../components/HomeProducts/HomeProducts'
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
   <TestimonialSlider/>
   <HomeProducts/>
   </>
  )
}
export default Home
