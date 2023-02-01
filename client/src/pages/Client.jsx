import { useQuery } from '@apollo/client';
import { Box, useTheme } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";
import Header from '../components/Header'
import Spinner from '../components/Spinner';
import { GET_CLIENTS } from '../queries/clientQueries';
import { tokens } from '../theme';

const Client = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  if (error) return <p>Something Went Wrong</p>;

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    
  ];

  return (
    <Box m="20px">
      <Header title="CLIENTS" subtitle="List of clients" />
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
          <DataGrid checkboxSelection rows={data.clients} columns={columns} />
        </Box>
      )}
    </Box>
  )
};

export default Client;