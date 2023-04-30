import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, useTheme } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";

import CustomButton from '../../../components/CustomButton';
import Header from '../../../components/Header'
import Spinner from '../../../components/Spinner';
import { GET_DEVS } from '../../../graphql/queries/devsQueries';
import { tokens } from '../../../theme';
import DeleteButton from './components/DeleteButton';
import { UPDATE_DEV } from '../../../graphql/mutations/developerMutations';

const TeamList = () => {
  const { loading, error, data } = useQuery(GET_DEVS);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedModel, setSelectedModel] = useState([])

  const [
    update,
    {loading: updating }
  ] = useMutation(UPDATE_DEV, {
    refetchQueries: ["getDevelopers"],
  });

  if (error) return <p>Something Went Wrong</p>;

  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "firstname",
      headerName: "Firstname",
      flex: 1,
      cellClassName: "firstname-column--cell",
      editable: true,
    },
    {
      field: "lastname",
      headerName: "Lastname",
      flex: 1,
      cellClassName: "lastname-column--cell",
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      editable: true
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      editable: true
    },
    {
      field: "delete",
      width: 1,
      sortable: false,
      disableColumnMenu: true,
      hideable: false,
      renderHeader: () => {
        return (
          <DeleteButton selectedItems={ selectedModel } />
        );
      }
    }
  ];

  const handleEdit = (params) => {
    update({variables: {
      _id: params.id,
      [params.field]: params.value
    }})
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" subtitle="Managing the team members" />
        <CustomButton
          text='Add member'
          link='/team/add'
          btnstyle="primary"
        />
      </Box>
      {loading || error ? (
        <Spinner />
      ) : (
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={data.developers}
            columns={columns}
            getRowId={(row) => row._id}
            onCellEditCommit={handleEdit}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(ids) => setSelectedModel(ids)}
          />
        </Box>
      )}
    </Box>
  )
};

export default TeamList;