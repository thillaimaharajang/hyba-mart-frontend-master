/* eslint-disable array-callback-return */
/* eslint-disable */
import React from 'react'
import Advertisement from './Advertisement'
import NewArrivals from './NewArrivals'
import AllProducts from './AllProducts'
import Footer from '../../layout/Footer'
const Dashboard = (props) => {
 
  return (
    <>
    <Advertisement />
    <NewArrivals />
    <AllProducts />
    <Footer />
    </>
  )
}

export default Dashboard
