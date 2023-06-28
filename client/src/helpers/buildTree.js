// const buildTree = (data, parentId = null) => {
//   const tree = [];
  
//   for (const item of data) {
//     if (item.parentId === parentId) {
//       const children = buildTree(data, item.id);
//       if (children.length > 0) {
//         item.items = children;
//       }
//       tree.push(item);
//     }
//   }

//   // const tree = data.forEach(item => {
//   //   if (item.parentId === parentId) {
//   //     const children = buildTree(data, item.id);
//   //     if (children.length > 0) {
//   //       item.children = children;
//   //     }
//   //     return item;
//   //   }
//   // });
  
//   return tree;
// }

// buildTree - V2

const buildTree = (data) => {
  const treeMap = {};
  const tree = [];

  data.forEach((item) => {
    const { id, parentId, name } = item;
    treeMap[id] = { id, parentId, name, items: [] };
  });

  data.forEach((item) => {
    const { id, parentId } = item;
    if (parentId) {
      const parent = treeMap[parentId];
      if (parent) {
        parent.items.push(treeMap[id]);
      }
    } else {
      tree.push(treeMap[id]);
    }
  });

  return tree;
};

export default buildTree;