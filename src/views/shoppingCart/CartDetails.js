import React, {useState} from 'react';
import {Grid, Typography, Container, ButtonGroup, Button, TextField } from '@mui/material';
import Premium from '../../assets/images/premium.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CartDetails = (props) => {
    const [count, setCount] = useState(1);
    return (
    <Container style={{background: 'white', boxShadow: '0px 0px 25px 10px #F6F4FD'}}>
        <Grid container>
            <Grid item xs={8}>
                <div>
                    <table className='cart-table'>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        <tr>
                            <td style={{display: 'flex'}}>
                                <img alt="complex" src={Premium} width="80px" height="80px" style={{marginRight: 20}}/>
                                <div>
                                <Typography gutterBottom variant="caption" component="div" color="#000">Ut diam consequat</Typography>
                                <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Color: Brown</Typography>
                                <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Size: XL</Typography>
                                </div>
                            </td>
                            <td><Typography gutterBottom variant="caption" component="div" color="#000">$100</Typography></td>
                            <td>
                                <ButtonGroup size="small" aria-label="small button group">
                                    <Button key="one" onClick={()=> setCount(count-1)}>-</Button>
                                    <Button key="two">{count}</Button>
                                    <Button key="three" onClick={()=> setCount(count+1)}>+</Button>
                                </ButtonGroup>
                            </td>
                            <td><Typography gutterBottom variant="caption" component="div" color="#000">$100</Typography></td>
                        </tr>
                        <tr>
                            <td style={{display: 'flex'}}>
                                <img alt="complex" src={Premium} width="80px" height="80px" style={{marginRight: 20}}/>
                                <div>
                                <Typography gutterBottom variant="caption" component="div" color="#000">Ut diam consequat</Typography>
                                <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Color: Brown</Typography>
                                <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Size: XL</Typography>
                                </div>
                            </td>
                            <td><Typography gutterBottom variant="caption" component="div" color="#000">$100</Typography></td>
                            <td>
                                <ButtonGroup size="small" aria-label="small button group">
                                    <Button key="one" onClick={()=> setCount(count-1)}>-</Button>
                                    <Button key="two">{count}</Button>
                                    <Button key="three" onClick={()=> setCount(count+1)}>+</Button>
                                </ButtonGroup>
                            </td>
                            <td><Typography gutterBottom variant="caption" component="div" color="#000">$100</Typography></td>
                        </tr>
                        <tr>
                            <td style={{display: 'flex'}}>
                                <img alt="complex" src={Premium} width="80px" height="80px" style={{marginRight: 20}}/>
                                <div>
                                <Typography gutterBottom variant="caption" component="div" color="#000">Ut diam consequat</Typography>
                                <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Color: Brown</Typography>
                                <Typography gutterBottom variant="caption" component="div" color="#A1A8C1">Size: XL</Typography>
                                </div>
                            </td>
                            <td><Typography gutterBottom variant="caption" component="div" color="#000">$100</Typography></td>
                            <td>
                                <ButtonGroup size="small" aria-label="small button group">
                                    <Button key="one" onClick={()=> setCount(count-1)}>-</Button>
                                    <Button key="two">{count}</Button>
                                    <Button key="three" onClick={()=> setCount(count+1)}>+</Button>
                                </ButtonGroup>
                            </td>
                            <td><Typography gutterBottom variant="caption" component="div" color="#000">$100</Typography></td>
                        </tr>
                    </table>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="contained" className='pinkBtn' style={{marginTop:15}}>Update Cart</Button>
                    <Button variant="contained" className='pinkBtn' style={{marginTop:15}}>Clear Cart</Button>
                    </div>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div>
                    <Grid container>
                        <Grid item xs={12} style={{margin: "10px 10px 20px 10px"}}>
                            <Typography gutterBottom variant="subtitle2" component="div" color="#000" style={{ textAlign: 'center'}}>
                                <b>Cart Totals</b>
                            </Typography>
                            <Grid container item style={{backgroundColor: '#F4F4FC', padding: 25, borderRadius: 5}}>
                                <div className='cartBox'>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                    Subtotals:
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                        £219.00
                                    </Typography>
                                </div>
                                <div className='cartBox'>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                        Totals:
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="span" color="#000">
                                        £219.00
                                    </Typography>
                                </div>
                                <Typography gutterBottom variant="caption" component="div" color="#000">
                                    <CheckCircleIcon fontSize='12px'  style={{fill: '#19D16F'}}/> Shipping & taxes calculated at checkout
                                </Typography>
                                <Button variant="contained" className='greenBtn' style={{marginTop:15}}>Proceed To Checkout</Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{margin: "20px 10px"}}>
                            <Typography gutterBottom variant="subtitle2" component="div" color="#000" style={{ textAlign: 'center'}}>
                                <b>Calculate Shopping</b>
                            </Typography>
                            <Grid container item style={{backgroundColor: '#F4F4FC', padding: 25, borderRadius: 5}}>
                                <TextField id="City" label="City" className='cart-test-field' variant="standard" />
                                <TextField id="Place" label="Address" className='cart-test-field' variant="standard" />
                                <TextField id="Code" label="Postal Code" className='cart-test-field'  variant="standard" />
                                <Button variant="contained" className='pinkBtn' style={{marginTop:15}}>Calculate Shiping</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    </Container>
   )
 }
 
 export default CartDetails