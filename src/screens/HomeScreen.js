import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import FeaturedProducts from '../components/FeaturedProducts'
import OurFurniture from '../components/OurFurniture'
import Partners from '../components/Partners'
import Skills from '../components/SkillsSection'
import Services from '../components/Services'
import Navbar from '../components/Navbar'

import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_LIST_RESET,
} from '../constants/productConstants'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handlePopButton = () => {
    if (history.action === 'POP') {
      console.log('POP')
      dispatch({ type: PRODUCT_DETAILS_RESET })
      dispatch({ type: PRODUCT_LIST_RESET })
    }
  }

  useEffect(() => {
    handlePopButton()
    // eslint-disable-next-line
  }, [history])
  return (
    <>
      <Navbar />
      <section id='banner' className='banner d-flex align-items-center  pl-3'>
        {/* background image taken from "https://www.pexels.com/photo/brown-wooden-center-table-584399"
      photographer - Skitterphoto */}
        <div className='banner-info'>
          <h1 className='text-slanted text-capitalize mb-0'>minimilist</h1>
          <h1 className='font-weight-bold'>interior styles</h1>
          <a href='#our-products' className='btn btn-banner'>
            view collection
          </a>
        </div>
      </section>
      <OurFurniture />
      <Services />
      <FeaturedProducts />
      <Partners />
      <Skills />
    </>
  )
}

export default HomeScreen
