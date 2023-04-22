import { useState } from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import TocIcon from '@mui/icons-material/Toc';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';

import StyledEditor from '../../../styles/StyledEditor';
import CustomModal from '../../../../../../components/CustomModal';
import EditInput from '../../../../../../components/form/EditInput';
import Editor from '../../../../../../components/form/Editor';

import { UPDATE_TASK } from '../../../../../../graphql/mutations/taskMutations';
import { GET_BOARDBYPROJECT } from '../../../../../../graphql/queries/boardQueries';
import ModalSection from './ModalSection';
import ModalHeader from './ModalHeader';
import TaskDetails from './TaskDetails';
import { useBoard } from '../../../context/BoardContext';

const TaskModal = ({task, closeTaskModal}) => {
  const [date, setDate] = useState(task.dueDate && dayjs(+task.dueDate));
  const [priority, setPriority] = useState(task.priority);
  const { projectId } = useBoard();
  const [
    updateTask,
    { loadingTaskUpdate, taskUpdateError }
  ] = useMutation(UPDATE_TASK, {
    update: (cache, { data: { updateTask } }) => {
      const { boardByProject } = cache.readQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
      })
      const clonedTasks = [...boardByProject?.tasks];

      const index = clonedTasks.findIndex(item => item._id === task._id);
      clonedTasks.splice(index, 1, updateTask);

      cache.writeQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
        data: {
          boardByProject: {
            ...boardByProject,
            tasks: clonedTasks,
          }
        }
      })

      // cache.modify({
      //   fields: {
      //     getProjects: (existingProjects, { readField }) => {
      //       console.log(existingProjects);
      //       if (data) {
      //         return existingProjects.filter(
      //           (projectRef) => projectId !== readField('_id', projectRef)
      //         );
      //       }
      //     }
      //   },
      // });
    },
	});
  console.log('rendering TaskModal...', task);
  const handleUpdate = async (value, name) => {
    await updateTask({variables: {
      _id: task._id,
      [name]: value
    }});
    // toast.success(`${name} updated!`)

    return true;
  }

  const handleDateChange = (newDate) => {
    setDate(newDate)
    handleUpdate(newDate, 'dueDate');
  }

  return (
    <CustomModal
        width='1000px'
        open={!!task}
        handleClose={
          () => closeTaskModal()
        }
        p='0'
      >
        <ModalHeader task={task} />
        <Grid container spacing={5} p={4} >
          <Grid item md={8}>
            <Stack spacing={3}>
              <ModalSection
                icon={<SubtitlesIcon />}
              >
                <Stack spacing={2}>
                  <Box mb={1}>
                      <EditInput
                        name="title"
                        variant="standard"
                        value={task?.title}
                        onAccept={handleUpdate}
                      />
                  </Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          sx={{ width: '50%'}}
                          // label="Due date"
                          value={date}
                          onChange={handleDateChange}
                          format="LL"
                        />
                      </DemoContainer>
                  </LocalizationProvider>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                    <RadioGroup
                      value={priority}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={({target: { value }}) => {
                        setPriority(value);
                        handleUpdate(value, 'priority');
                      }}
                    >
                      <FormControlLabel value="Low" control={<Radio />} label="Low" />
                      <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                      <FormControlLabel value="High" control={<Radio />} label="High" />
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </ModalSection>
              <ModalSection
                icon={<TocIcon />}
                title='Description'
              >
                <StyledEditor>
                    <Editor
                      name='description'
                      value={task.description}
                      onAccept={handleUpdate}
                    />
                </StyledEditor>
              </ModalSection>
            </Stack>
          </Grid>
          <Grid item md={4}>
            <TaskDetails data={task} />
          </Grid>
        </Grid>
      </CustomModal>
  )
}

export default TaskModal