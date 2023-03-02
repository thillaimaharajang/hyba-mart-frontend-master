/* eslint-disable array-callback-return */
/* eslint-disable */
import React, {useState} from 'react';
import { Grid, Typography, Container,FormControl, Select, MenuItem, Divider, OutlinedInput,InputAdornment, IconButton, List, ListItem, Stack  } from '@mui/material';
import HybaLogo from '../assets/images/hybaLogo.svg';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/index.scss';
import Tops from '../assets/images/top.svg'
import WomenTop from '../assets/images/women-top.svg'
import Skirt from '../assets/images/skirt.svg'

const SubHeader = (props) => {
    // const [language, setLanguage] = useState('English');

    const handleLangChange = (event) => {
        setLanguage(event.target.value);
    };
   return (
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <img src={HybaLogo} width="245px" height='49px' />
            </Grid>
            <Grid item xs={8} className='flexEnd'>
                <Typography gutterBottom variant="caption" component="span" className='cursor-pointer' color="#FB2E86" style={{marginRight: 20}}>
                   Home
                </Typography>
                <Select labelId="label" id="selectLanguage" value="Category" style={{top: '-3px'}} className='dropdown-border dropdown-icon' onChange={handleLangChange} MenuProps={{ style: { maxWidth: '100%', maxHeight: 300, position: 'absolute', color: '#FB2E86' }, disableScrollLock: true }}>
                    <MenuItem value="Category" tabIndex="0" style={{ display: 'none' }}>
                    <span className="cursor-pointer  flexCenter">
                        <div className="drop-label-black">Category</div>
                    </span>
                    </MenuItem>
                    <Grid container spacing={2}>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'self-start'}}>
                            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                                <img src={Tops} width="28%" />
                                <List direction="row" className='category-list'>
                                    <ListItem><b>WOMAN</b></ListItem>
                                    <ListItem>Knitwear</ListItem>
                                    <ListItem>Skirts</ListItem>
                                    <ListItem>Sweatshirts</ListItem>
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'self-start'}}>
                            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                            <img src={Tops} width="28%" />
                                <List direction="row" className='category-list'>
                                    <ListItem><b>WOMAN</b></ListItem>
                                    <ListItem>Knitwear</ListItem>
                                    <ListItem>Skirts</ListItem>
                                    <ListItem>Sweatshirts</ListItem>
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'self-start'}}>
                            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                                <img src={WomenTop} width="28%" />
                                <List direction="row" className='category-list'>
                                    <ListItem><b>KIDS</b></ListItem>
                                    <ListItem>T-Shirts</ListItem>
                                    <ListItem>Dungarees</ListItem>
                                    <ListItem>Shorts</ListItem>
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'self-start'}}>
                            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                                <img src={Skirt} width="28%" />
                                <List direction="row" className='category-list'>
                                    <ListItem><b>ACCESSORIES</b></ListItem>
                                    <ListItem>Scarf</ListItem>
                                    <ListItem>Hats</ListItem>
                                    <ListItem>Sunglasses</ListItem>
                                </List>
                            </div>
                        </Grid>
              </Grid>
                </Select>
                <Typography gutterBottom variant="caption" component="span" className='cursor-pointer' style={{marginRight: 20}}>
                   info
                </Typography>
                <FormControl sx={{ mt: 1, width: '40%' }} className='header-search'  variant="outlined">
                    <OutlinedInput
                        id="searchProduct"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="email"
                            edge="end"
                            className='search-icon'
                            >
                             <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        }
                        label="search"
                    />
                </FormControl>
            </Grid>
        </Grid>
    </Container>
  )
}

export default SubHeader
