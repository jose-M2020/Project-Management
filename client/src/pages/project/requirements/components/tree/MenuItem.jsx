import { useState } from "react"
import PropTypes from "prop-types"
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import MenuItemContainer from "./MenuItemContainer";

// React runtime PropTypes
export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array
}

const MenuItem = props => {
  const { name, link, Icon, items = [] } = props;
  const isExpandable = items && items.length > 0
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  const MenuItemRoot = (
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
        <ControlPointIcon onClick={() => console.log('add')} />
      </Box>
      {/* Display the expand menu if the item has children */}
      {/* {isExpandable && (
        !open ? <ExpandMoreIcon /> : <ExpandLessIcon />
      )} */}
    </MenuItemContainer>
  )

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} sx={{ pl: '20px' }} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <MenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  )
}

export default MenuItem
