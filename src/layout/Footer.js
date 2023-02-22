/* eslint-disable array-callback-return */
/* eslint-disable */
import React from 'react'
import { Grid, Box, Typography, List, ListItem, Stack, FormControl, InputLabel, OutlinedInput,InputAdornment, IconButton } from '@mui/material'
import Logo from '../assets/images/logo.svg'
import FacebookLogo from '../assets/images/facebook.svg'
import InstagramLogo from '../assets/images/insta.svg'
import LinkedInLogo from '../assets/images/linkedIn.svg'
import Messenger from '../assets/images/messenger.svg'
import Pinterest from '../assets/images/pinterest.svg'
import Skype from '../assets/images/skype.svg'
import Twitter from '../assets/images/twitter.svg'
import Whatsapp from '../assets/images/whatsapp.svg'
import Youtube from '../assets/images/youtube.svg'
import SendIcon from '@mui/icons-material/Send';

const Footer = (props) => {

    const LogosUrl = [FacebookLogo, InstagramLogo, LinkedInLogo, Messenger, Pinterest, Skype, Twitter, Whatsapp, Youtube]
 
  return (
   <Box>
    <Grid container spacing={2} style={{padding: '20px 100px',backgroundColor: '#ECECEC'}}>
            <Grid item xs={4}>
                <div style={{display: 'flex'}}>
                    <img src={Logo} width="50px" style={{paddingRight: 20, borderRight: '2px solid #23254B'}} />
                    <h4 style={{display: 'inline-flex', paddingLeft: 20}}>HYBA MART</h4>
                </div>
            </Grid>
            <Grid item xs={8}>
            <List component={Stack} direction="row">
                {LogosUrl.map((item, i)=> (
                    <ListItem key={i}>
                        <img src={item} width="40px" />
                    </ListItem>
                ))}
            </List>
            </Grid>
        </Grid>
        <Grid container spacing={2} style={{padding: '20px 100px',backgroundColor: '#2B2B2B'}}>
            <Grid item xs={3}>
                <Typography gutterBottom variant="subtitle2" component="div" color="#FC9F66">
                    <b>HYBA MART</b>
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#FFFFFF">
                Posuere in netus a eu varius vdosn
                sdjnvksd dskbjck lknaosnc ldnckv
                ksdj kv asdncl kna nalskncj skcnx
                dckjakjckjnak jasnk jnadjbiqwnkjv
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography gutterBottom variant="subtitle2" component="div" color="#FFFFFF">
                    <b>Newsletter</b>
                </Typography>
                <FormControl sx={{ mt: 1, width: '90%' }} className="footer-input" variant="outlined">
                    {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                    <OutlinedInput
                        id="otlined-email"
                        placeholder="Your email"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="email"
                            edge="end"
                            >
                             <SendIcon />
                            </IconButton>
                        </InputAdornment>
                        }
                        label="email"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <Typography gutterBottom variant="subtitle2" component="div" color="#FFFFFF">
                    <b>Info</b>
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#FFFFFF">
                    Media Kit
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#FFFFFF">
                    Terms & Conditon
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#FFFFFF">
                    Privacy Policy
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#FFFFFF">
                    Contact Us
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography gutterBottom variant="subtitle2" component="div" color="#FFFFFF">
                    <b>Contact Info</b>
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#FFFFFF">
                    Ajman Industrial 2 P.O.BOX 
                    9000 U.A.E 
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#FFFFFF">
                    +971 56 4798830
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#FFFFFF">
                    support@hybamart.ae
                </Typography>
            </Grid>
        </Grid>
        <div className='footer-copyright'>&#169; 2022 Hybamart. Designd By Hybamart, All Rights Reserved.</div>
   </Box>
  )
}

export default Footer
