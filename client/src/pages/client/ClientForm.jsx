import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { 
  Box,
  Step,
  StepContent,
  StepLabel,
  Stepper 
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/form/Input';
import AutoComplete from '../../components/form/AutoComplete';
import { ADD_PROJECT, UPDATE_PROJECT } from '../../graphql/mutations/projectMutations';
import { GET_PROJECT, GET_PROJECTNAMES, GET_PROJECTS } from '../../graphql/queries/projectQueries';

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.number().required().positive().integer(),
  // company: yup.object().shape({
  // })
  
  name: yup.string().required(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),    
  website: yup.string().url(),
});

const ClientForm = () => {
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
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      company: {
        name: '',
        website: '',
        country: '',
        state: '',
        city: ''
      }
    };
  }
  
  const [getProjects, { loading, data = [] }] = useLazyQuery(GET_PROJECTNAMES);
  
  const [createProject, { postLoading }] = useMutation(ADD_PROJECT, {
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

  // Form Events

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

  // Async Autocomplete

  const [open, setOpen] = useState(false);
  const loadingData = open && (data?.length === 0);
  
  useEffect(() => {
    let active = true;
    if (!loadingData) {
      return undefined;
    };

    (async () => {
      if (active && !loading) {
        await getProjects();
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingData, getProjects, loading]);

  useEffect(() => {
    if (!open) {
      // setOptions([]);
    }
  }, [open]);



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
                    User data
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                      <Input label="First name*" name="firstname" />
                      <Input label="Last name*" name="lastname" />
                      <Input label="Email*" name="email" />
                      <Input label="Phone*" name="phone" />
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
                    Company data
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                      <Input label="Name*" name="name" />
                      <AutoComplete 
                        label="Country" 
                        name="country" 
                        options={data?.projects}
                        setLabel={(option) => `${option?.name}`}
                        valueField='_id'
                        async={true}
                        open={open}
                        setOpen={setOpen}
                        loading={loadingData}
                      />
                      <AutoComplete 
                        label="State" 
                        name="state" 
                        options={[]}
                        // setLabel={(option) => `${option?.name}`}
                        valueField='_id'
                        // async={true}
                        // open={open}
                        // setOpen={setOpen}
                        // loading={loadingData}
                      />
                      <AutoComplete 
                        label="City" 
                        name="city" 
                        options={[]}
                        // setLabel={(option) => `${option?.name}`}
                        valueField='_id'
                        // async={true}
                        // open={open}
                        // setOpen={setOpen}
                        // loading={loadingData}
                      />
                      <Input 
                        label="Website" 
                        name="website" 
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

export default ClientForm