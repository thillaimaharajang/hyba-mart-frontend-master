/* eslint-disable array-callback-return */
/* eslint-disable */
import React from 'react'
import { Container, Grid, Box } from '@mui/material'
import VectorIcon from '../../assets/images/vectorIcon.svg'
import SingleProduct from './SingleProduct'
import Image1 from '../../assets/images/img1.svg'

const NewArrivals = (props) => {
    const data = [
        {
            name: 'Japanese T-Shirt',
            desc: 'MEN',
            desc1: '200 AED',
            imagePath: Image1
        },
        {
            name: 'Japanese T-Shirt',
            desc: 'MEN',
            desc1: '200 AED',
            imagePath: Image1
        },
        {
            name: 'Japanese T-Shirt',
            desc: 'MEN',
            desc1: '200 AED',
            imagePath: Image1
        },
        {
            name: 'Japanese T-Shirt',
            desc: 'MEN',
            desc1: '200 AED',
            imagePath: Image1
        },{
            name: 'Japanese T-Shirt',
            desc: 'MEN',
            desc1: '200 AED',
            imagePath: Image1
        },
        {
            name: 'Japanese T-Shirt',
            desc: 'MEN',
            desc1: '200 AED',
            imagePath: Image1
        },{
            name: 'Japanese T-Shirt',
            desc: 'MEN',
            desc1: '200 AED',
            imagePath: Image1
        },
        {
            name: 'Japanese T-Shirt',
            desc: 'MEN',
            desc1: '200 AED',
            imagePath: Image1
        }
    ]
  return (
   <Box>
    <Container className='container-bg'>
    <Grid container>
        <Grid item className='title-header'>
            <h1 className='title-text'>New Arrivals</h1>
            <div className='title-vector'>
                <img src={VectorIcon} width="120px" />
            </div>
        </Grid>
    </Grid>
    <Grid container>
        <Grid>
            {data.map((product, i)=> (
                <SingleProduct key={i} type='new' productData={product} />
            ))}
        </Grid>
    </Grid>
    </Container>
   </Box>
  )
}

export default NewArrivals
