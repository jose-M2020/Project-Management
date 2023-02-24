import { useQuery } from '@apollo/client';
import { Box, useTheme } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header'
import Spinner from '../../components/Spinner';
import { GET_CLIENTS } from '../../graphql/queries/clientQueries';
import { tokens } from '../../theme';

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  if (error) return <p>Something Went Wrong</p>;

  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "firstname",
      headerName: "First name",
      flex: 1,
      cellClassName: "firstname-column--cell",
      editable: true
    },
    {
      field: "lastname",
      headerName: "Last name",
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
    
  ];

  const handleEdit = (params) => {
    console.log(params);
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLIENTS" subtitle="List of clients" />
        <CustomButton
          text='Add Client'
          link='/clients/add'
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
            rows={data.clients}
            columns={columns}
            getRowId={(row) => row._id} 
            onCellEditCommit={handleEdit}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  )
};

export default Clients;