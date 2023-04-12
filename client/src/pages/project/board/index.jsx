import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_BOARDBYPROJECT } from '../../../graphql/queries/boardQueries'
import BoardContainer from './components/BoardContainer';

const Board = () => {
  const { id: projectId } = useParams();
  const { loading, error, data } = useQuery(
    GET_BOARDBYPROJECT,
    { variables: { projectId } }
  );
  // useEffect(() => {
  //   if(!loadingTasks){
  //     const orderedTasks = tasks.tasks.reduce((acc, item) => {
  //       acc[item.status]?.push(item);
  //       return acc;
  //     }, {
  //       'Not Started': [],
  //       'In Progress': [],
  //       'Completed': [],
  //     })
        
  //     const columData = {
  //       'column-1': {
  //         ...columns['column-1'],
  //         items: orderedTasks['Not Started']
  //       },
  //       'column-2': {
  //         ...columns['column-2'],
  //         items: orderedTasks['In Progress']
  //       },
  //       'column-3': {
  //         ...columns['column-3'],
  //         items: orderedTasks['Completed']
  //       },
  //     }
    
  //     setColumns(columData)
  //   }
  // }, [tasks])
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occurred</p>;

  return (
    <BoardContainer board={data.boardByProject} projectId={projectId} />
  )
}

export default Board