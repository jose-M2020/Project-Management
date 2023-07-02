import WidgetsIcon from '@mui/icons-material/Widgets';

export const treeData = [
  {
    id: 1,
    parentId: null,
    name: "Functional requirements",
    // link: "/",
    Icon: WidgetsIcon
  },
  {
    id: 2,
    parentId: null,
    name: "Non-functional requirements",
    Icon: WidgetsIcon
  },

  {
    id: 3,
    parentId: 1,
    name: "Functional 1.1",
  },
  {
    id: 4,
    parentId: 1,
    name: "Functional 1.2",
  },
  {
    id: 5,
    parentId: 1,
    name: "Functional 1.3",
  },

  {
    id: 6,
    parentId: 4,
    name: "Functional 1.2.1",
  },
  {
    id: 7,
    parentId: 4,
    name: "Functional 1.2.2",
  },


  
  // {
  //   id: 5,
  //   name: "Nested Pages",
  //   Icon: WidgetsIcon,
  //   items: [
  //     {
  //       id: 6,
  //       name: "Level 2",
  //       Icon: WidgetsIcon
  //     },
  //     {
  //       id: 7,
  //       name: "Level 2 - Nested Pages",
  //       items: [
  //         {
  //           id: 8,
  //           name: "Level 3"
  //         },
  //         {
  //           id: 9,
  //           name: "Level 3"
  //         },
  //         {
  //           id: 10,
  //           name: "Level 3- Nested Pages",
  //           // Icon: WidgetsIcon,
  //           items: [
  //             {
  //               id: 11,
  //               name: "Level 4"
  //             },
  //             {
  //               id: 12,
  //               name: "Level 4 - Nested Pages",
  //               items: [
  //                 {
  //                   id: 13,
  //                   name: "Level 5"
  //                 },
  //                 {
  //                   id: 14,
  //                   name: "Level 5"
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
]