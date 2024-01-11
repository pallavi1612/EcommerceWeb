import React, { useContext } from 'react'
import HeroSection from './components/HeroSection'
import { useProductContext } from './context/ProductContext'

const About = () => {
  const data ={
    name : "Pallavi Ecommerce"
  }
  const {myName} = useProductContext();
  return (
    <>
    {myName}
    <HeroSection myData={data} />
    </>
  )
}

export default About