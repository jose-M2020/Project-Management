import React from "react"
import { List } from "@mui/material"
import WidgetsIcon from '@mui/icons-material/Widgets';

import MenuItem from "./MenuItem"

const appMenuItems = [
  {
    name: "Dashboard",
    // link: "/",
    Icon: WidgetsIcon
  },
  {
    name: "Orders",
    Icon: WidgetsIcon
  },
  {
    name: "Customers",
    Icon: WidgetsIcon
  },
  {
    name: "Reports",
    Icon: WidgetsIcon
  },
  {
    name: "Nested Pages",
    Icon: WidgetsIcon,
    items: [
      {
        name: "Level 2",
        Icon: WidgetsIcon
      },
      {
        name: "Level 2 - Nested Pages",
        items: [
          {
            name: "Level 3"
          },
          {
            name: "Level 3"
          },
          {
            name: "Level 3- Nested Pages",
            // Icon: WidgetsIcon,
            items: [
              {
                name: "Level 4"
              },
              {
                name: "Level 4 - Nested Pages",
                items: [
                  {
                    name: "Level 5"
                  },
                  {
                    name: "Level 5"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Nested Pages",
    Icon: WidgetsIcon,
    items: [
      {
        name: "Level 2",
        Icon: WidgetsIcon
      },
      {
        name: "Level 2 - Nested Pages",
        items: [
          {
            name: "Level 3"
          },
          {
            name: "Level 3"
          },
          {
            name: "Level 3- Nested Pages",
            // Icon: WidgetsIcon,
            items: [
              {
                name: "Level 4"
              },
              {
                name: "Level 4 - Nested Pages",
                items: [
                  {
                    name: "Level 5"
                  },
                  {
                    name: "Level 5"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
]

const Menu = () => {
  return (
    <List component="nav" sx={{ width: "100%" }} disablePadding>
      {/* <AppMenuItem {...appMenuItems[0]} /> */}
      {appMenuItems.map((item, index) => (
        <MenuItem {...item} key={index} />
      ))}
    </List>
  )
}

// const drawerWidth = 240

// const useStyles = makeStyles(theme =>
//   createStyles({
//     appMenu: {
//       width: "100%"
//     },
//     navList: {
//       width: drawerWidth
//     },
//     menuItem: {
//       width: drawerWidth
//     },
//     menuItemIcon: {
//       color: "#97c05c"
//     }
//   })
// )

export default Menu
