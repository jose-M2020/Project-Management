import { Box, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/form/Input';
import Header from '../../components/Header';
import AutoComplete from '../../components/form/AutoComplete';
import { gql, useQuery } from '@apollo/client';
import { GET_CLIENTSNAME } from '../../graphql/queries/clientQueries';
import { GET_DEVSNAME } from '../../graphql/queries/devsQueries';

const initialValues={
    name: '',
    description: '',
    repository: '',
    url: '',
    type: '',
    status: '',
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

const tagsOptions = [
  { title: 'JavaScript', tag: 'NodeJS' },
  { title: 'ReactJS', tag: 'NodeJS' },
  { title: 'Angular', tag: 'NodeJS' },
  { title: 'HTML', tag: 'NodeJS' },
  { title: 'VUE', tag: 'NodeJS' },
  { title: 'PHP', tag: 'NodeJS' },
]

const ProjectForm = () => {
  const { loading, error, data: {clients, developers} } = useQuery(gql`
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
  console.log(clients)

//   if(true) {
//       const optionsClients = (data?.clients).reduce((acc, current) => (
//         [
//           ...acc,
//           {
//             label: (current.firstname + current.lastname),
//             value: current._id
//           }
//         ]
//       ), [])
//       console.log(optionsClients);
//   }


  const onSubmit = async (values, actions) => {
    console.log(values);
    // actions.resetForm();
  }

  return (
    <Box m="20px">
      <Header title="NEW PROJECT" subtitle="Fill the fields to create new project" />
      <Formik
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
              {/* <Input select label="Type" name="clientID" options={} /> */}
              <AutoComplete label="Tags" 
                            name="tags" 
                            options={tagsOptions} 
                            multiple
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
      </Formik>
    </Box>
  )
}

export default ProjectForm