/* eslint-disable array-callback-return */
/* eslint-disable */
import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import RootStore from "../../mobx-store/RootStore";
import { observer } from "mobx-react-lite";

import { Container, Grid, Box } from '@mui/material';
import VectorIcon from '../../assets/images/vectorIcon.svg';
import SingleProduct from './SingleProduct';
import ProductHelper from "../../helpers/ProductHelper";

const AllProducts = (props) => {
  const { productStore } = RootStore;
  let data = productStore?.products;

  return (
   <Box>
    <Container className='container-bg'>
    <Grid container>
        <Grid item className='title-header'>
            <h1 className='title-text'>All Products</h1>
            <div className='title-vector'>
                <img src={VectorIcon} width="120px" />
            </div>
        </Grid>
    </Grid>
    <Grid container>
        <Grid>
            {
            data.map((product, i)=> (
                <SingleProduct key={i} type='all' productData={product} />
            ))}
        </Grid>
    </Grid>
    </Container>
   </Box>
  )
}

export default observer(AllProducts)
