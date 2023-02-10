import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Box, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/form/Input';
import Header from '../../components/Header';
import AutoComplete from '../../components/form/AutoComplete';
import { ADD_PROJECT } from '../../graphql/mutations/projectMutations';
import { GET_PROJECT, GET_PROJECTS } from '../../graphql/queries/projectQueries';
import { useParams } from 'react-router-dom';

let initialValues = {
    name: '',
    description: '',
    repository: '',
    url: '',
    type: '',
    status: 'Not Started',
    team: [],
    clientID: '',
    tags: []
};

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  repository: yup.string().url(),
  url: yup.string().url(),
  type: yup.string().required(),
  team: yup.array(),
  clientID: yup.string(),
  tags: yup.array().required(),

//   phone: yup.number().required().positive().integer(),
//   email: yup.string().email(),
});

const transformData = (data, field) => {
  if(data){
    return (data[field]).map((item) =>(
      {
        label: `${item.firstname} ${item.lastname}`,
        value: item._id
      }
    ))
  }
}

const tagsOptions = [
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'ReactJS', value: 'ReactJS' },
  { label: 'Angular', value: 'Angular' },
  { label: 'HTML', value: 'HTML' },
  { label: 'VUE', value: 'VUE' },
  { label: 'PHP', value: 'PHP' },
]

const ProjectForm = () => {
  const { id } = useParams();
  const { loading: projectLoading, data: projectData } = useQuery(GET_PROJECT, { variables: { id } });
  initialValues = projectData?.project;

  const [activeStep, setActiveStep] = useState(0);
  const [activeSteps, setActiveSteps] = useState(false);
  const { loading, data } = useQuery(gql`
    query {
      developers {
        _id
        firstname
        lastname
      }
      clients {
        _id
        firstname
        lastname
      }
    }
  `);
  
  const [createProject, { postLoading, postError }] = useMutation(ADD_PROJECT, {
		refetchQueries: [
			{
				query: GET_PROJECTS,
			},
			"getProjects",
		],
	});

  const clientsOptions = transformData(data, 'clients');
  const devsOptions = transformData(data, 'developers');

  const onSubmit = async (values, actions) => {
    console.log(values);
    createProject({ variables: values});
    // console.log(postLoading);
    actions.resetForm();
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box m="20px">
      <Header title="NEW PROJECT" subtitle="Fill the fields to create new project" />
      {/* <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({setFieldValue}) => (
          <Form>
            <Typography variant='h3'>Project</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: [3],
                maxWidth: '550px',
                marginX: 'auto',
                marginBottom: '10px'
              }}
            >
              <Input label="Name*" name="name" />
              <Input label="Description*" name="description" multiline rows={4} />
              <Input label="Type" name="type" />
              {!loading && (
                <>
                  <AutoComplete label="Client" 
                              name="clientID" 
                              options={clientsOptions}
                  />
                  <AutoComplete label="Team" 
                              name="team" 
                              options={devsOptions}
                              multiple
                  />
                </>
              )}
              <AutoComplete label="Tags" 
                            name="tags" 
                            options={tagsOptions} 
                            multiple
                            freeSolo
                />
              <Input label="Repository" name="repository" 
                     icon={<LanguageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} 
                     variant="standard"     
              />
              <Input label="URL" name="url" 
                     icon={<LanguageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} 
                     variant="standard"     
              />              
              <CustomButton text='Create project' type="submit" />
            </Box>
          </Form>
        )}
      </Formik> */}

      { !projectLoading && (
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({values}) => (
            <Form>
              <Stepper orientation="vertical" 
                sx={{
                  maxWidth: '600px',
                  marginX: 'auto',
                  marginBottom: '10px'
                }}
              >
                <Step active={(activeStep === 0) || activeSteps}>
                  <StepLabel>
                    Set project
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                      <Input label="Name*" name="name" />
                      <Input label="Description*" name="description" multiline rows={4} />
                      <Input label="Type" name="type" />
                      {!activeSteps && (
                        <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
                          <CustomButton text='Continue' onClick={handleNext} btnstyle="primary" />
                        </Box>
                      )}
                    </Box>
                  </StepContent>
                </Step>
                <Step active={(activeStep === 1) || activeSteps}>
                  <StepLabel>
                    Add client and collaborators
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                      {!loading && (
                        <>
                          <AutoComplete label="Client" 
                                      name="clientID" 
                                      options={clientsOptions}
                          />
                          <AutoComplete label="Team" 
                                      name="team" 
                                      options={devsOptions}
                                      multiple
                          />
                        </>
                      )}
                      {!activeSteps && (
                        <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
                          <CustomButton text='Back' onClick={handleBack} btnstyle="secondary" />
                          <CustomButton text='Continue' onClick={handleNext} btnstyle="primary" />
                        </Box>
                      )}
                    </Box>
                  </StepContent>
                </Step>
                <Step active={(activeStep === 2) || activeSteps}>
                  <StepLabel>
                    Project Details
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                      <AutoComplete label="Tags" 
                                    name="tags" 
                                    options={tagsOptions} 
                                    multiple
                                    freeSolo
                        />
                      <Input label="Repository" name="repository" 
                            icon={<LanguageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} 
                            variant="standard"     
                      />
                      <Input label="URL" name="url" 
                            icon={<LanguageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} 
                            variant="standard"     
                      />    
                        <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
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
                            loading={postLoading}
                          />
                        </Box>
                    </Box>
                  </StepContent>
                </Step>
              </Stepper>
            </Form>
          )}
        </Formik>

      )}

      
      
    </Box>
  )
}

export default ProjectForm