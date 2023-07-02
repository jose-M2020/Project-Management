import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import buildTree from '../../../../../helpers/buildTree';
import generateUniqueId from '../../../../../helpers/generateUniqueId';

const TreeItem = ({ item, handleInsertChild }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  return (
    <Box mb={2} ml={3}>
        <Box onClick={toggleMenu} display='flex' gap={2} >
          <div>{item.name}</div>
          <button onClick={() => handleInsertChild(item.id)}>Add Child</button>
        </Box>
        {openMenu && (
          item.children.map((child) => (
            <TreeItem key={child.id} item={child} handleInsertChild={handleInsertChild} />
          ))
        )}
      </Box>
  );
};

const TreeBuilder = ({ data }) => {
  const [d, setD] = useState(data)
  const [tree, setTree] = useState();

  useEffect(() => {
    setTree(buildTree(d))
  }, [d])
 

  const handleInsertChild = (parentId) => {
    const newItem = {
      id: generateUniqueId(),
      parentId: parentId,
      name: 'New Child',
      items: [],
    };

    setD([
      ...d,
      newItem
    ])

    // const updatedTree = [...tree];
    // findAndInsertChild(updatedTree, parentId, newItem);
    // setTree(updatedTree);
  };

  // const findAndInsertChild = (tree, parentId, newItem) => {
  //   for (let i = 0; i < tree.length; i++) {
  //     const item = tree[i];
  //     if (item.id === parentId) {
  //       item.children.push(newItem);
  //       break;
  //     } else if (item.children.length > 0) {
  //       findAndInsertChild(item.children, parentId, newItem);
  //     }
  //   }
  // };

  return (
    <div>
      {tree?.map((item) => (
        <TreeItem key={item.id} item={item} handleInsertChild={handleInsertChild} />
      ))}
    </div>
  );
};

export default TreeBuilder;
