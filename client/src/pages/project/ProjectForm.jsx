import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Box, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/form/Input';
import Header from '../../components/Header';
import AutoComplete from '../../components/form/AutoComplete';
import { ADD_PROJECT, UPDATE_PROJECT } from '../../graphql/mutations/projectMutations';
import { GET_PROJECT, GET_PROJECTS } from '../../graphql/queries/projectQueries';
import { GET_DEVNAMES } from '../../graphql/queries/devsQueries';
import useAsyncAutocomplete from '../../hooks/useAsyncAutocomplete';
import { GET_CLIENTNAMES } from '../../graphql/queries/clientQueries';

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

// const transformData = (data, field) => {
//   if(data){
//     return (data[field]).map((item) =>(
//       {
//         label: `${item.firstname} ${item.lastname}`,
//         value: item._id
//       }
//     ))
//   }
// }

const tagsOptions = [
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'ReactJS', value: 'ReactJS' },
  { label: 'Angular', value: 'Angular' },
  { label: 'HTML', value: 'HTML' },
  { label: 'VUE', value: 'VUE' },
  { label: 'PHP', value: 'PHP' },
]

// const flatData = (data, field) => {
//   if(data){
//     const array = data[field].map((item) => (item._id))
//     data[field] = array;
//     return data;
//   }
// }

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [activeSteps, setActiveSteps] = useState(false);

  // TODO: Query by condition
  const { loading: projectLoading, data: projectData } = useQuery(GET_PROJECT, { variables: { id } });
  
  let initialValues
  
  if(id){
    // projectData?.project.team = projectData?.project.team.map(item => item._id)
    initialValues = {
      ...projectData?.project,
      team: projectData?.project.team.map(item => item._id),
    };
  }else { 
    initialValues = {
      name: '',
      description: '',
      repository: '',
      url: '',
      type: '',
      status: 'Not Started',
      team: [],
      clientId: null,
      tags: []
    };
  }

  const {
    data: devData,
    loading: loadingDevs,
    open: devFieldOpen,
    setOpen: setOpenDev
  } = useAsyncAutocomplete(GET_DEVNAMES)
  
  const {
    data: clientData,
    loading: loadingClients,
    open: clientFieldOpen,
    setOpen: setOpenClient
  } = useAsyncAutocomplete(GET_CLIENTNAMES)
  
  const [createProject, { postLoading, postError }] = useMutation(ADD_PROJECT, {
		refetchQueries: [{
			query: GET_PROJECTS,
		},
			"getProjects",
		],
	});
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ 
      query: GET_PROJECT, variables: { id } 
    }],
  });


  const onSubmit = async (values, actions) => {
    if(id) {
      updateProject({variables: values});
      navigate(`/projects/${id}`);
    } else {
      createProject({ variables: values});
      actions.resetForm();
      navigate('/projects');
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  useEffect(()=>{
		if(id){
      setActiveSteps(true)
    }
	}, [id, projectData])

  return (
    <Box m="20px">
      <Header title="NEW PROJECT" subtitle="Fill the fields to create new project" />
      { (!projectLoading) && (
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
                </Step>
                <Step active={(activeStep === 2) || activeSteps}>
                  <StepLabel>
                    Project Details
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                      <AutoComplete 
                        label="Tags" 
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
                          text={id ? 'Update project' : 'Create project'} 
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