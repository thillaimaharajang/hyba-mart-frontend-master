import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Function from "../../../utils/Function";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import RootStore from "../../../mobx-store/RootStore";
import Endpoints from "../../../services/Endpoints";

const SingleProduct = ({productData, type}) => {
  const navigate = useNavigate();
  let { productStore } = RootStore;

  const showProductDetails = async(product) => {
    // productStore.setProductDetails(product)
    console.log(Endpoints.ProductDetails+product.id)
    navigate(Endpoints.ProductDetails+product.id, { replace: true });
  }
  return (
    <Card sx={{ width: type ==='relatedProduct' ? 220 : 260 }} className='product-style'>
      <CardMedia
        sx={{ height: 290 }}
        image={Function.loadImagePath(productData.mainImage)}
        title="green iguana"
        onClick = {()=>{showProductDetails(productData)}}
      />
      {type === 'all' && (
        <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <Typography gutterBottom variant="body2" component="div">
                    {productData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {productData.desc}
                </Typography>
            </div>
            <IconButton aria-label="previous">
                <ArrowForwardIcon />
            </IconButton>
      </CardContent>
      )}
      {type === 'new' && (
        <CardContent style={{textAlign:"center"}}>
            <Typography gutterBottom variant="body2" component="div">
                {productData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {productData.desc}
            </Typography>
            <Typography variant="body2" color="#FC9F66">
                {productData.desc1}
            </Typography>
      </CardContent>
      )}
      {type ==='relatedProduct' && (
        <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
            <Typography gutterBottom variant="body2" component="div">
                {productData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {productData.price}
            </Typography>
        </div>
        <div>
          <StarIcon fontSize='15px' className='rating-yellow' />
          <StarIcon fontSize='15px' className='rating-yellow' />
          <StarIcon fontSize='15px' className='rating-yellow' />
          <StarIcon fontSize='15px' className='rating-yellow' />
          <StarIcon fontSize='15px' className='rating-yellow' />
        </div>
      </CardContent>
      )}
      
    </Card>
  );
}

export default SingleProduct
