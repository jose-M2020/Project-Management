import { useState } from 'react'
import { Avatar, Box, Fab, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Stack, Typography, useTheme } from '@mui/material';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import TocIcon from '@mui/icons-material/Toc';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, Formik } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomModal from '../../../../components/CustomModal';
import { tokens } from '../../../../theme';
import Input from '../../../../components/form/Input';
import StyledEditor from '../styles/StyledEditor';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dropdown from '../../../../components/Dropdown';
import CustomButton from '../../../../components/CustomButton';
import AutoComplete from '../../../../components/form/AutoComplete';
import ProfileRow from '../../../../components/ProfileRow';
import useAsyncAutocomplete from '../../../../hooks/useAsyncAutocomplete';
import { GET_PROJECTNAMES } from '../../../../graphql/queries/projectQueries';
import { GET_DEVNAMES } from '../../../../graphql/queries/devsQueries';
import { schema } from '../TaskValidation';

const FormItem = ({icon, title, children}) => (
  <Stack gap={1} direction='row' >
    <Typography>
      {icon}
    </Typography>
    <Box flexGrow={1} minWidth={0} >
      {title && (
        <Typography mb={1} >
            {title}
        </Typography>
      )}
      {children}
    </Box>
  </Stack>
);

const TaskModal = ({taskDetailsModal, setTaskDetailsModal}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editorcontent, setEditorContent] = useState(taskDetailsModal.data?.description || '')
  const [date, setDate] = useState();

  const {
    data: projectData,
    loading: loadingProjects,
    open,
    setOpen
  } = useAsyncAutocomplete(GET_PROJECTNAMES);
  const {
    data: devData,
    loading: loadingDevs,
    open: devFieldOpen,
    setOpen: setOpenDev
  } = useAsyncAutocomplete(GET_DEVNAMES);

  const handleUpdate = (values, actions) => {
    actions.resetForm();
  }

  return (
    <CustomModal
        width='800px'
        open={taskDetailsModal.isOpen}
        handleClose={
          () => setTaskDetailsModal({
            isOpen: false,
            data: {}
          })
        }
      >
        <Grid container spacing={2} >
          <Grid item md={9}>
            <Formik
              initialValues={taskDetailsModal.data}
              validationSchema={schema}
              onSubmit={handleUpdate}
            >
              {() => (
                <Form>
                  <Stack spacing={3}
                  >
                    <FormItem
                      icon={<SubtitlesIcon />}
                    >
                      <Stack spacing={2}>
                        <Box mb={1}>
                            <Input
                              name="title"
                              variant="standard"
                              value={taskDetailsModal.data?.title}
                            />
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker
                                sx={{ width: '50%'}}
                                // label="Due date"
                                onChange={(newDate) => setDate(newDate)}
                                format="LL"
                              />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel value="Low" control={<Radio />} label="Low" />
                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                            <FormControlLabel value="High" control={<Radio />} label="High" />
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                    </FormItem>
                    <FormItem
                      icon={<TocIcon />}
                      title='Description'
                    >
                      <StyledEditor>
                          <CKEditor
                              editor={ ClassicEditor }
                              data={ editorcontent }
                              onChange={ ( event, editor ) => {
                                  const data = editor.getData();
                                  console.log( { event, editor, data } );
                              } }
                              onBlur={ ( event, editor ) => {
                                  console.log( 'Blur.', editor );
                              } }
                              onFocus={ ( event, editor ) => {
                                  console.log( 'Focus.', editor );
                              } }
                          />
                      </StyledEditor>
                    </FormItem>
                    <FormItem
                      icon={<PeopleAltIcon />}
                      title='Members'
                    >
                      <Stack spacing={2}>
                        <Dropdown 
                          button={
                            <Fab size="small" color="secondary" aria-label="add">
                              <AddIcon />
                            </Fab>
                          }
                          width='250px'
                        >
                          <AutoComplete 
                            label="Team" 
                            name="team" 
                            options={devData?.developers}
                            setLabel={(option) => `${option?.firstname} ${option?.lastname}`}
                            valueField='_id'
                            multiple
                            async={true}
                            open={devFieldOpen}
                            setOpen={setOpenDev}
                            loading={loadingDevs}
                          />
                        </Dropdown>
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                          <ProfileRow user={{firstname: 'Jhon', lastname: 'Ruiz Hernandez', position: 'Front-end'}} />
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                          <ProfileRow user={{firstname: 'Jhon Luis', lastname: 'Ruiz Hernandez', position: 'Front-end'}} />
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Stack>
                    </FormItem>
                    {/* <CustomButton 
                      text='Create task' 
                      type="submit"
                      btnstyle="primary"
                      loading={postLoading}
                    /> */}
                  </Stack>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid item md={3}>
            <Stack>
              <Typography>Add user</Typography>
              <Typography>Delete</Typography>
              <Typography>Move</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CustomModal>
  )
}

export default TaskModal