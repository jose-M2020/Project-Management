import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { Box, Fab, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import EditableText from '../../../../../components/EditableText';
import { CREATE_COLUMN } from '../../../../../graphql/mutations/columnMutations';
import { GET_BOARDBYPROJECT } from '../../../../../graphql/queries/boardQueries';
import { useBoard } from '../../context/BoardContext';
import { getAppendedItemPos } from '../../../../../helpers/itemPosition';
import { hexToRgba } from '../../../../../helpers/colors';
import { tokens } from '../../../../../theme';

const NewColumn = ({ columns }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newColumn, setNewColumn] = useState(false)
  const { projectId, boardId } = useBoard();

  const [ createColumn ] = useMutation(CREATE_COLUMN, {
    update: (cache, { data }) => {
      const { boardByProject } = cache.readQuery({
        query: GET_BOARDBYPROJECT,
        variables: {
          projectId
        },
      })

      const newColumns = [...boardByProject?.columns, data.createColumn]

      cache.writeQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
        data: {
          boardByProject: {
            ...boardByProject,
            columns: newColumns
          }
        }
      })
    }
  });

  const onAccept = async (value) => {
    if(!value) return;

    await createColumn({ variables: {
      title: value,
      boardId,
      order: getAppendedItemPos(columns)
    }});

    setNewColumn(false);

    return true;
  }

  return (
    <Box ml={2}>
      {newColumn ? (
        <Box
          sx={{
            backgroundColor: hexToRgba(colors.primary[400], .7),
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            height: '233px',
            flexShrink: 0,
            minWidth: '290px',
            maxWidth: '290px',
          }}
        >
          <Box
            padding='10px'
            borderBottom={`.5px solid ${colors.blueAccent[400]}`}
            mb='8px'
            sx={{
              backdropFilter: 'blur(20px)',
            }}
            zIndex={100}
          >
            <EditableText
              onAccept={onAccept}
              onCancel={() => setNewColumn(false)}
              mode="input"
              padding="12px 5px"
            />
          </Box>
        </Box>
      ) : (
        <Fab 
          onClick={() => setNewColumn(true)}
          size="small"
          color="secondary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  )
}

export default NewColumn