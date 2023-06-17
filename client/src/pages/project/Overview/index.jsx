import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange';
import Header from '../../../components/Header'
import StatusCard from './components/StatusCard'
import { tokens } from '../../../theme'
import TaskPie from './components/chart/TaskPie';
import CustomButton from '../../../components/CustomButton';

const Overview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="OVERVIEW" subtitle="General project details and key aspects." />
      {/* <Grid item xs={4}>
              <CircularProgressWithLabel
                label="Task completed"
                progress={44}
                marginBottom={3}
              />
              <Typography variant="h3">Tasks</Typography>
              <Divider />
              <Box>
                <List>
                  {data.project.tasks.lenght ? (
                    (data.project.tasks).map( (item, i) => (
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            {statusIcon[item.title].icon}
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  ) : (
                    <Typography>No Tasks</Typography>
                  )}                
                </List>
              </Box>
            </Grid> */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        // sx={{
        //   "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        // }}
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatusCard
            title="200 days"
            subtitle="Due date"
            progress="0.75"
            increase="+14%"
            icon={
              <DateRangeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "45px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatusCard
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <DateRangeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "45px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatusCard
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <DateRangeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "45px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatusCard
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <DateRangeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "45px" }}
              />
            }
          />
        </Box>
      </Box>
      <Box
        bgcolor={colors.primary[400]}
        width='50%'
        borderRadius='6px'
        p='20px 20px 8px'
      >
        <Box display='flex' justifyContent='space-between' alignItems='center' >
          <Box>
            <Typography component='h3' >
              Tasks Summary
            </Typography>
            <Typography component='span' color={colors.grey[200]} >
              23 tasks
            </Typography>
          </Box>
          <CustomButton text='View tasks' />
        </Box>
        <Box height='400px' >
          <TaskPie />
        </Box>
      </Box>
    </Box>
  )
}

export default Overview