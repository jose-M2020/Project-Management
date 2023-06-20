import React from 'react'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange';
import 'react-circular-progressbar/dist/styles.css';

import Header from '../../../components/Header'
import { tokens } from '../../../theme'
import TaskPie from './components/chart/TaskPie';
import CustomButton from '../../../components/CustomButton';
import ProgressCard from './components/ProgressCard';
import { useProject } from '../../../context/ProjectContext';

const Overview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { _id } = useProject();
  console.log(_id)
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
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            // gridAutoRows="160px"
            marginBottom={4}
            gap="20px"
            // sx={{
            //   "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
            // }}
          >
            <Box
              gridColumn="span 6"
            >
              <ProgressCard
                title='Days left'
                subtitle={'Due date: 12-34-2033'}
                progress={{ value: 66, text: '344' }} />
            </Box>
            <Box
              gridColumn="span 6"
            >
              <ProgressCard
                title='Completed tasks'
                subtitle={'5/33'}
                progress={{ value: 13, text: '13%' }} />
            </Box>
            <Box
              gridColumn="span 6"
            >
              <ProgressCard
                title='Bugs fixed'
                subtitle={'1/3'}
                progress={{ value: 33, text: '33%' }} />
            </Box>
            <Box
              gridColumn="span 6"
            >
              <ProgressCard
                title='Completed tasks'
                subtitle={'5/33'}
                progress={{ value: 13, text: '13%' }} />
            </Box>
          </Box>
          <Box
            bgcolor={colors.primary[400]}
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
              <CustomButton text='View tasks' link={`/projects/${_id}/board`} />
            </Box>
            <Box height='400px' >
              <TaskPie />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box bgcolor={colors.primary[400]} p='12px' height='100%' >

          </Box>
        </Grid>
      </Grid>

    </Box>
  )
}

export default Overview