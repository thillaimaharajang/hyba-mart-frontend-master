/* eslint-disable array-callback-return */
/* eslint-disable */
import React from 'react'
import { Container, Grid, Box } from '@mui/material'
import VectorIcon from '../../assets/images/vectorIcon.svg'
import SingleProduct from '../productStore/SingleProduct'
import Image1 from '../../assets/images/img1.svg'

const RelatedProducts = (props) => {
    const data = [
        {
            name: 'Japanese T-Shirt',
            price: '$43.00',
            imagePath: Image1
        },
        {
            name: 'Japanese T-Shirt',
            price: '$43.00',
            imagePath: Image1
        },
        {
            name: 'Japanese T-Shirt',
            price: '$43.00',
            imagePath: Image1
        },
        {
            name: 'Japanese T-Shirt',
            price: '$43.00',
            imagePath: Image1
        }
    ]
  return (
   <Box>
    <Container className='container-bg'>
    <Grid container>
        <Grid item >
            <h1 style={{margin: '20px 0'}}>Related Products</h1>
        </Grid>
    </Grid>
    <Grid container>
        <Grid>
            {data.map((product, i)=> (
                <SingleProduct key={i} type='relatedProduct' productData={product} />
            ))}
        </Grid>
    </Grid>
    </Container>
   </Box>
  )
}

export default RelatedProducts
