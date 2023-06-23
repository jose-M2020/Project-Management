import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Box, Step, StepContent, StepLabel, Stepper, TextField, useTheme } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CustomButton from '../../../components/CustomButton';
import Input from '../../../components/form/Input';
import Header from '../../../components/Header';
import AutoComplete from '../../../components/form/AutoComplete';
import { ADD_PROJECT } from '../../../graphql/mutations/projectMutations';
import { GET_PROJECTS } from '../../../graphql/queries/projectQueries';
import { tagsOptions } from '../../../data';
import { tokens } from '../../../theme';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  repository: yup.string().url(),
  url: yup.string().url(),
  type: yup.string().required(),
  team: yup.array(),
  clientID: yup.string(),
  tags: yup.array().required(),
});

const ProjectForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [activeSteps, setActiveSteps] = useState(false);
  
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const initialValues = {
    name: '',
    description: '',
    repository: '',
    url: '',
    type: '',
    status: 'Not Started',
    team: [],
    clientId: null,
    tags: [],
    duration: [],
  };

  const [createProject, { loading }] = useMutation(ADD_PROJECT, {
    update: (cache, { data }) => {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS
      })
      const newProjects = [data.createProject, ...projects]
      
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: newProjects
        }
      })
    }
	});

  const onSubmit = async (values, actions) => {
    const newValues = {
      ...values,
      duration: [startDate, endDate]
    }
    await createProject({ variables: newValues});
    actions.resetForm();
    navigate('/projects');
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }} p='20px'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        gap={5}
        minHeight='84vh'
      >
        <Box
          flex='1 1 0'
          display={{ xs: 'none', md: 'block' }}
          maxWidth='500px'
        >
          <img
            src='/img/project.png'
            alt='project'
            width='100%'
          />
        </Box>
        <Box
          flex='1 1 0'
          maxWidth='500px'
        >
          <Box
            p={4}
            bgcolor={colors.primary[400]}
            borderRadius={5}
          >
            <Header title="NEW PROJECT" subtitle="Project Creation Form: Enter the Required Information Below" />
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={onSubmit}
            >
              {({values, setFieldValue}) => (
                <Form>
                  <Stepper orientation="vertical" 
                    sx={{
                      marginX: 'auto',
                      marginBottom: '10px'
                    }}
                  >
                    <Step active={(activeStep === 0) || activeSteps}>
                      <StepLabel>
                        General Information
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                          <Input label="Name*" name="name" />
                          <Input label="Description*" name="description" multiline rows={4} />
                          {!activeSteps && (
                            <Box>
                              <CustomButton text='Continue' onClick={handleNext} btnstyle="primary" />
                            </Box>
                          )}
                        </Box>
                      </StepContent>
                    </Step>
                    {/* <Step active={(activeStep === 1) || activeSteps}>
                      <StepLabel>
                        Add client and collaborators
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                          <AutoComplete 
                            label="Client" 
                            name="clientId" 
                            options={clientData?.clients}
                            // defaultValue={data.clients.find((option) => (
                            //   option._id === values?.clientId
                            // )) || null}
                            setLabel={(option) => `${option.firstname} ${option.lastname}`}
                            valueField='_id'
                            async={true}
                            open={clientFieldOpen}
                            setOpen={setOpenClient}
                            loading={loadingClients}
                          />
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
                          {!activeSteps && (
                            <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
                              <CustomButton text='Back' onClick={handleBack} btnstyle="secondary" />
                              <CustomButton text='Continue' onClick={handleNext} btnstyle="primary" />
                            </Box>
                          )}
                        </Box>
                      </StepContent>
                    </Step> */}
                    <Step active={(activeStep === 1) || activeSteps}>
                      <StepLabel>
                        Project Details
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                          <Input label="Type" name="type" />
                          <Box display='flex' gap={2} alignItems='center'>
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              selectsStart
                              startDate={startDate}
                              endDate={endDate}
                              minDate={new Date()}
                              customInput={<ExampleCustomInput label="Start date" />}
                            />
                            <span>-</span>
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              selectsEnd
                              startDate={startDate}
                              endDate={endDate}
                              minDate={startDate}
                              customInput={<ExampleCustomInput label="End date" />}
                            />
                          </Box>
                          <AutoComplete
                            value={ values.tags }
                            onChange={(_, value) => {
                              setFieldValue('tags', 
                                value.map(item => (
                                  (typeof item === 'string') ? item : (item.value)
                                ))
                              )
                            }}
                            label="Tags" 
                            name="tags"
                            options={tagsOptions} 
                            multiple
                            freeSolo
                          />
                          {/* <Input label="Repository" name="repository" 
                                icon={<LanguageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} 
                                variant="standard"     
                          />
                          <Input label="URL" name="url" 
                                icon={<LanguageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} 
                                variant="standard"     
                          />     */}
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {!activeSteps && (
                              <CustomButton text='Back' onClick={handleBack} btnstyle="secondary" />
                            )} 
                            <CustomButton 
                              text='Create project'
                              onClick={async () => {
                                const isValid = await schema.isValid(values);
                                !isValid && setActiveSteps(true);
                              }} 
                              type="submit"
                              btnstyle="primary"
                              loading={ loading }
                            />
                          </Box>
                        </Box>
                      </StepContent>
                    </Step>
                  </Stepper>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const ExampleCustomInput = forwardRef(({ value, onClick, ...props }, ref) => (
  <TextField
    value={value}
    variant='outlined'
    onFocus={onClick}
    // helperText={(meta.touched && meta.error) && meta.error}
    // error={meta.touched && !!(meta.error)}
    {...props}
  />
));

export default ProjectForm