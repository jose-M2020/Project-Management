import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../../graphql/queries/projectQueries';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import Spinner from '../../../components/Spinner';
import Header from '../../../components/Header';
import CustomButton from '../../../components/CustomButton';
import ProjectCard from './components/ProjectCard';

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  
  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant='h3' mt={4}>Something Went Wrong</Typography>
    </Box>
  );

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PROJECTS" subtitle="Managing projects" />
        <CustomButton
          text='Add Project'
          link='/projects/add'
          btnstyle="primary"
        />
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        data.projects.length > 0 ? (
          <Grid2 container spacing={3}>
            {data.projects.map((project) => (
              <Grid2 key={project._id} sm={6} lg={4} sx={{width: '100%'}}>
                <ProjectCard project={project} />
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <Box sx={{
            marginTop: 3,
            textAlign: 'center'
          }}>
            <Typography variant='h2'>No Projects</Typography>
          </Box>
        )
      )}
    </Box>
  );
}

export default Projects;