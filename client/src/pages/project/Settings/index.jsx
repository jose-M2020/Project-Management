import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_PROJECT } from '../../../graphql/queries/projectQueries';
import SettingsContainer from './components/SettingsContainer';

const Settings = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(
    GET_PROJECT,
    { variables: { id } }
  );
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occurred</p>;
  
  return (
    <SettingsContainer projectData={data} />
  )
};

export default Settings;