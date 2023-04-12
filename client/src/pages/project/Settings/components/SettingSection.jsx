import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'

const SettingSection = ({title, icon, children}) => {

  return (
    <Box>
      <Divider />              
      <Grid container mt={1}>
        <Grid 
          item 
          xs={12} 
          md={3}
        >
          <Box
            sx={{ 
              mb: {xs: 3, md: 0},
              position: 'sticky',
              top: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            {icon}
            <Typography
              variant="h4" 
            >
              { title }
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          { children }
        </Grid>
      </Grid>
    </Box>
  )
}

export default SettingSection