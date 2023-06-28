import { Box, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import MenuItemContainer from "./MenuItemContainer";

const MenuItemRoot = ({ 
  itemData,
  setOpen,
  open,
  setData,
  data
}) => {
  const { id, name, link, Icon, items = [] } = itemData;
  const isExpandable = items && items.length > 0

  const handleClick = () => {
    setOpen(!open)
  }

  const addItem = () => {
    console.log(data)
    if(data?.length){
      const res = [
        ...data,
        {
          id: 7,
          parentId: id,
          name: "Functional 1.2.2",
        },
      ]
      setData(res)
    }
  }

  return(
    <MenuItemContainer
      link={link}
      onClick={handleClick}
      sx={{
        '&.active': {
          background: 'rgba(0, 0, 0, 0.08)',
          '& .MuiListItemIcon-root': {
            color: '#fff',
          }
        },
        '& .addIcon': { display: 'none' },
        '&:hover .addIcon': { display: 'block' }
      }}
    >
      {/* Display an icon if any */}
      {/* {!!Icon && (
        <ListItemIcon sx={{ minWidth: '33px' }}>
          <Icon />
        </ListItemIcon>
      )} */}
      <ListItemIcon sx={{ color: "#97c05c", minWidth: '33px' }}>
        {isExpandable && (
          !open ? <ExpandMoreIcon /> : <ExpandLessIcon />
        )}
      </ListItemIcon>
      <ListItemText primary={name}  />
      <Box className='addIcon' >
        <ControlPointIcon onClick={addItem} />
      </Box>
      {/* Display the expand menu if the item has children */}
      {/* {isExpandable && (
        !open ? <ExpandMoreIcon /> : <ExpandLessIcon />
      )} */}
    </MenuItemContainer>

  )
}

export default MenuItemRoot;