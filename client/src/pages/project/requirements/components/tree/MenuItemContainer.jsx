import { forwardRef } from "react"
import { Box, ListItem, useTheme } from "@mui/material"
import { NavLink } from "react-router-dom"
import { tokens } from "../../../../../theme";

const MenuItemContainer = ({
  className,
  onClick,
  link,
  children,
  ...props
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{
      '&:hover': {
        color: colors.greenAccent[400],
        cursor: 'pointer',
        transition: '.2s',
        '.MuiSvgIcon-root' : {
          color: colors.greenAccent[400],
          transition: '.2s',
        }
      }
    }}>
      <ListItem
        className={className}
        children={children}
        

        // Link component
        {...(!link || typeof link !== "string") ? (
          { onClick: onClick }
        ) : ({
          component: forwardRef((props, ref) => (
            <NavLink exact {...props} innerRef={ref} />
          )),
          to: link
        })}
        
        {...props}
      />
    </Box>
  )
}

export default MenuItemContainer
