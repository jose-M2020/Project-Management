import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { 
  Box, Stack, useTheme
} from '@mui/material';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/form/Input';
import { CREATE_DEV, UPDATE_DEV } from '../../graphql/mutations/developerMutations';
import { GET_DEV, GET_DEVS } from '../../graphql/queries/devsQueries';
import { tokens } from '../../theme';

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.number().required().positive().integer(),
  position: yup.string().required(),
});

const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // TODO: Query by condition
  const { loading: devLoading, data: devData } = useQuery(GET_DEV, { variables: { id } });
  
  let initialValues
  
  if(id){
    // projectData?.project.team = projectData?.project.team.map(item => item._id)
    initialValues = {
      ...devData?.project,
      team: devData?.project.team.map(item => item._id),
    };
  }else { 
    initialValues = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      position: '',
    };
  }
  
  const [createDev, { postLoading }] = useMutation(CREATE_DEV, {
		refetchQueries: [{
			query: GET_DEVS,
		},
			"getDevelopers",
		],
	});
  const [updateDeveloper] = useMutation(UPDATE_DEV, {
    refetchQueries: [{ 
      query: GET_DEVS, variables: { id } 
    }],
  });

  const onSubmit = async (values, actions) => {
    if(id) {
      updateDeveloper({variables: values});
      navigate(`/team/${id}`);
    } else {
      createDev({ variables: values});
      actions.resetForm();
      navigate('/team');
    }
  }

  return (
    <Box m="20px">
      <Header title="NEW PROJECT" subtitle="Fill the fields to create new project" />
      { (!devLoading) && (
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({values}) => (
            <Form>
              <Stack 
                sx={{
                  padding: 4,
                  maxWidth: '600px',
                  marginX: 'auto',
                  marginBottom: '10px',
                  // backgroundColor: colors.primary[600],
                }}
                spacing={2}
              >
                <Input label="First name*" name="firstname" />
                <Input label="Last name*" name="lastname" />
                <Input label="Email*" name="email" />
                <Input label="Phone*" name="phone" />
                <Input label="Position*" name="position" />
                <Box>
                  <CustomButton 
                    text={id ? 'Update developer' : 'Create developer'}
                    type="submit"
                    btnstyle="primary"
                    loading={postLoading}
                  />
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  )
}

export default TeamForm