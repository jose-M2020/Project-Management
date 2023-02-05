import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import ClientInfo from '../../components/ClientInfo';
import DeleteProjectButton from '../../components/DeleteProjectButton';
import EditProjectForm from '../../components/EditProjectForm';
import { GET_PROJECT } from '../../graphql/queries/projectQueries';

const ProjectDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (error) return <p>Something Went Wrong</p>;

  return (
    <Box m="20px">
      <Header title="PROJECT" subtitle="Details project" />
      {loading ? (
        <Spinner />
      ) : (
        <Box>
        <div className='mx-auto w-75  p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>

          <ClientInfo client={data.project.client} />

          {/* <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} /> */}
        </div>
        </Box>
      )}
    </Box>
  )
};

export default ProjectDetails;