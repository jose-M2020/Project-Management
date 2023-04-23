import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_BOARDBYPROJECT } from '../../../graphql/queries/boardQueries'
import BoardContainer from './components/BoardContainer';
import Spinner from '../../../components/Spinner';
import { Box, Typography } from '@mui/material';
import { BoardProvider } from './context/BoardContext';
import { ModalProvider } from './context/ModalContext';

const Board = () => {
  const { id: projectId } = useParams();
  const { loading, error, data } = useQuery(
    GET_BOARDBYPROJECT,
    { variables: { projectId } }
  );
  
  
  if (loading) return <Spinner />
  if (error) return <p>An error occurred</p>;

  return (
    <>
      <BoardProvider value={{
        projectId,
        boardId: data.boardByProject._id
      }}>
        <ModalProvider>
          <BoardContainer board={data.boardByProject} projectId={projectId} />
          {!!(!data.boardByProject) && (
            <Box>
              <Typography>No board</Typography>
            </Box>
          )}
        </ModalProvider>
      </BoardProvider>
    </>
  )
}

export default Board