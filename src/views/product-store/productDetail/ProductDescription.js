import React, {useState} from 'react';
import {Tab, Box, List, ListItem, Typography,Container } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { observer } from 'mobx-react-lite';
import RootStore from '../../../mobx-store/RootStore';

const ProductDescription = (props) => {
    const [value, setValue] = useState('1');
    let { productStore } = RootStore;
    const productDescription = productStore?.products[0]?.description.replace("n","").replace("\",");
    console.log(productDescription)

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <Container>
        <TabContext value={value}>
          <Box>
            <TabList className='desc-tab' onChange={handleChange} aria-label="description tabs">
              <Tab label="Description" value="1" />
              <Tab label="Additional Info" value="2" />
              <Tab label="Reviews" value="3" />
              <Tab label="Video" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1"><div dangerouslySetInnerHTML={{ __html: productDescription}} /></TabPanel>
          {/* <TabPanel value="1">
                <Typography gutterBottom variant="subtitle2" component="div" color="#000">
                    <b>Varius tempor.</b>
                </Typography>
                <Typography gutterBottom variant="caption" component="div" color="#A9ACC6">
                    Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .
                </Typography>
                
                <Typography gutterBottom variant="subtitle2" component="div" color="#000" style={{marginTop: 25}}>
                    <b>More Details</b>
                </Typography>
                <List>
                    <ListItem style={{fontSize: 13, paddingLeft: 0, color: '#A9ACC6'}}><ArrowForwardIcon className='desc-icon' /> Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</ListItem>
                    <ListItem style={{fontSize: 13, paddingLeft: 0, color: '#A9ACC6'}}><ArrowForwardIcon className='desc-icon' /> Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</ListItem>
                    <ListItem style={{fontSize: 13, paddingLeft: 0, color: '#A9ACC6'}}><ArrowForwardIcon className='desc-icon' /> Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</ListItem>
                    <ListItem style={{fontSize: 13, paddingLeft: 0, color: '#A9ACC6'}}><ArrowForwardIcon className='desc-icon' /> Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</ListItem>
                </List>
          </TabPanel> */}
          {/* <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item Three</TabPanel> */}
        </TabContext>
      </Container>
  
   )
 }
 
 export default observer(ProductDescription)