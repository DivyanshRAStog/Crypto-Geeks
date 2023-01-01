import React from 'react'
import { AppBar, Container, makeStyles, Select } from '@material-ui/core'
import {Box,Toolbar,Menu as MenuIcon,IconButton,Typography,Button,MenuItem} from '@material-ui/core'
import { createTheme, ThemeProvider} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from './CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';
const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontSize:27,
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft:-138
  },
}));
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
const Header = () => {
  const classes=useStyles();
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
const {currency,setcurrency,user}=CryptoState()
console.log(currency)
  return (
    <ThemeProvider theme={darkTheme}>
    <div>
      <Box >
      <AppBar position="static" color='transparent' >
        <Container>
        <Toolbar>
          <Typography variant="h6" onClick={handleClick} className={classes.title} >
           Crypto Geeks
          </Typography>
          <Select variant="outlined"  style={{
            width:100,
            height:40,
            marginRight:15,
          }}value={currency}
          onChange={(e)=>setcurrency(e.target.value)}
          >
          <MenuItem value={'INR'}>INR</MenuItem>
          <MenuItem value={'USD'}>Dollar</MenuItem>
        </Select>
    {user?<UserSidebar/>:<AuthModal/>}
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
    </div>
    </ThemeProvider>
  )
}

export default Header