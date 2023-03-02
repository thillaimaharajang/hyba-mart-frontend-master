import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';

const Breadcrumb = ({breadcrumbs,separator}) => {
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator={separator} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}

export default Breadcrumb
