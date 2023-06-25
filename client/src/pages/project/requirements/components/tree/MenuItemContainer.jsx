import { forwardRef } from "react"
import { ListItem, ListItemButton } from "@mui/material"
import { NavLink } from "react-router-dom"

const MenuItemContainer = props => {
  const { className, onClick, link, children } = props

  // If link is not set return the orinary ListItem
  if (!link || typeof link !== "string") {
    return (
      <ListItemButton
        className={className}
        children={children}
        onClick={onClick}
        {...props}
      />
    )
  }

  // Return a LitItem with a link component
  return (
    <ListItem
      button
      className={className}
      children={children}
      component={forwardRef((props, ref) => (
        <NavLink exact {...props} innerRef={ref} />
      ))}
      to={link}
    />
  )
}

export default MenuItemContainer
