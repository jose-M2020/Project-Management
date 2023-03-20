import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
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
import { Country, State, City }  from 'country-state-city';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/form/Input';
import AutoComplete from '../../components/form/AutoComplete';
import { CREATE_CLIENT, UPDATE_CLIENT } from '../../graphql/mutations/clientMutations';
import { GET_CLIENT, GET_CLIENTS } from '../../graphql/queries/clientQueries';

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
  const { loading: clientLoading, data: clientData } = useQuery(GET_CLIENT, { variables: { id } });
  
  let initialValues
  
  if(id){
    initialValues = clientData?.client;
  }else { 
    initialValues = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      name: '',
      website: '',
      country: '',
      state: '',
      city: ''
    };
  }
  
  const [createClient, { postLoading }] = useMutation(CREATE_CLIENT, {
		refetchQueries: [{
			query: GET_CLIENTS,
		},
			"getClients",
		],
	});
  const [updateClient] = useMutation(UPDATE_CLIENT, {
    refetchQueries: [{ 
      query: GET_CLIENT, variables: { id } 
    }],
  });

  // Form Events

  const onSubmit = async (values, actions) => {
    if(id) {
      // updateProject({variables: values});
      // navigate(`/projects/${id}`);
    } else {
      createClient({ variables: values});
      actions.resetForm();
      navigate('/clients');
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
	}, [id])

  return (
    <Box m="20px">
      <Header title="NEW CLIENT" subtitle="Fill the fields to create a new client" />
      { (!clientLoading) && (
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
                        options={Country.getAllCountries()}
                        setLabel={(option) => option?.name}
                        valueField='isoCode'
                        // async={true}
                        // open={open}
                        // setOpen={setOpen}
                        // loading={loadingData}
                      />
                      <AutoComplete 
                        label="State" 
                        name="state" 
                        options={State.getStatesOfCountry(values.country)}
                        setLabel={(option) => option?.name}
                        valueField='isoCode'
                        // async={true}
                        // open={open}
                        // setOpen={setOpen}
                        // loading={loadingData}
                      />
                      <AutoComplete 
                        label="City" 
                        name="city" 
                        options={City.getCitiesOfState(values.country, values.state)}
                        setLabel={(option) => option?.name}
                        valueField='name'
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