import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SingleProduct = ({productData, type}) => {
  return (
    <Card sx={{ width: 260 }} className='product-style'>
      <CardMedia
        sx={{ height: 290 }}
        image={productData.imagePath}
        title="green iguana"
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
      
    </Card>
  );
}

export default SingleProduct
