
import logo from './assets/logo.png';
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle, ...props }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box mb="30px" {...props}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );

  // return (
  //   <nav className='navbar bg-light mb-4 p-0'>
  //     <div className='container'>
  //       <a className='navbar-brand' href='/'>
  //         <div className='d-flex'>
  //           <img src={logo} alt='logo' className='mr-2' />
  //           <div>ProjectMgmt</div>
  //         </div>
  //       </a>
  //     </div>
  //   </nav>
  // );
}

export default Header;