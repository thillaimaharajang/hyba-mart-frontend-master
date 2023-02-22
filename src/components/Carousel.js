import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
import '../styles/index.scss';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const AutoPlaySwipeableViews = SwipeableViews;

function Carousel({images}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1, position: 'relative' }}>
      <Button size="small" className="carousel-btn-back" style={{ position:'absolute', top: '45%', left: '-20%', padding: 10, backgroundColor: '#FADCCB' }} onClick={handleBack} disabled={activeStep === 0}>
        {theme.direction === 'rtl' ? (
            <ArrowForwardIosIcon />
        ) : (
            <ArrowBackIosIcon />
        )}
       </Button>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div className='carousel-box' key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                className='carousel-img'
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Button
            className="carousel-btn"
            style={{ position:'absolute', top: '45%', right: '-10%', padding: 10, backgroundColor: '#FADCCB' }}
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <ArrowBackIosIcon />
            ) : (
              <ArrowForwardIosIcon />
            )}
        </Button>
    </Box>
  );
}

export default Carousel;