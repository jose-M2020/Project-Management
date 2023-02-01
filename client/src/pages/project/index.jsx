import Spinner from '../../components/Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../queries/projectQueries';
import { Box, Button, useTheme } from '@mui/material';
import Header from '../../components/Header';
import ProjectCard from '../../components/ProjectCard';
import { tokens } from '../../theme';

export default function Project() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (error) return <p>Something Went Wrong</p>;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PROJECTS" subtitle="Managing projects" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Add Project
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        data.projects.length > 0 ? (
          <div className=''>
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p>No Projects</p>
        )
      )}
    </Box>
  );
}