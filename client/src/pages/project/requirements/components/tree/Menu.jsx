import React, { useEffect, useState } from "react"
import { List } from "@mui/material"

import MenuItem from "./MenuItem"
import buildTree from "../../../../../helpers/buildTree";
import { treeData } from "../../../../../fakeData";
import generateUniqueId from "../../../../../helpers/generateUniqueId";

const Menu = () => {
  const [data, setData] = useState(treeData)
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    setMenuItems(buildTree(data));
  }, [data])
  
  const handleInsertChild = (parentId) => {
    if(data?.length){
      const newData = [
        ...data,
        {
          id: generateUniqueId(),
          parentId: parentId,
          name: "Functional 1.2.2",
        },
      ]
      setData(newData)
    }
  }
  
  const handleDeleteItem = (itemId) => {
    const updatedTree = data.filter(
      (item) => !isItemOrChild(item, itemId)
    );
    setMenuItems(buildTree(updatedTree));
  };

  const isItemOrChild = (item, itemId) => {
    if (item.id === itemId) {
      return true;
    }
    console.log(item)
    return item.items.some((child) => isItemOrChild(child, itemId));
  };

  return (
    <List component="nav" sx={{ width: "100%" }} disablePadding>
      {menuItems?.map((item, index) => (
        <MenuItem
          key={index}
          itemData={item}
          handleInsertChild={handleInsertChild}
          handleDeleteItem={handleDeleteItem}
        />
      ))}
    </List>
  )
}

export default Menu
