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
import MoreVertIcon from '@mui/icons-material/MoreVert';

import MenuItemContainer from "./MenuItemContainer";
import Dropdown from "../../../../../components/Dropdown";

export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array
}

const MenuItem = ({ itemData, handleInsertChild, handleDeleteItem }) => {
  const { id, name, link, items = [] } = itemData;
  const isExpandable = items && items.length > 0
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const MenuItemRoot = (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      sx={{
        '& .addIcon': { display: 'none' },
        '&:hover .addIcon': { display: 'block' }
      }}
    >
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
          '.MuiListItemButton-root:hover': {
            bgColor: 'transparent'
          }
        }}
      >
        {/* Display an icon if any */}
        {/* {!!Icon && (
          <ListItemIcon sx={{ minWidth: '33px' }}>
            <Icon />
          </ListItemIcon>
        )} */}
        <ListItemIcon sx={{ minWidth: '33px' }}>
          {isExpandable && (
            !open ? <ExpandMoreIcon /> : <ExpandLessIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={name}  />
        {/* Display the expand menu if the item has children */}
        {/* {isExpandable && (
          !open ? <ExpandMoreIcon /> : <ExpandLessIcon />
        )} */}
      </MenuItemContainer>
      <Box className='addIcon' sx={{ '&:hover': { cursor: 'pointer' } }}>
        {/* <ControlPointIcon onClick={() => handleInsertChild(id)} /> */}
        <Dropdown
          button={<MoreVertIcon />}
          options={[
            {title: 'Add Children', onClick: () => handleInsertChild(id) },
            {title: 'Delete', onClick: () => handleDeleteItem(id) }
          ]}
        />
      </Box>
    </Box>
  )

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} sx={{ pl: '20px' }} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            itemData={item}
            handleInsertChild={handleInsertChild}
            handleDeleteItem={handleDeleteItem}
          />
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
