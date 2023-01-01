import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/Homepage";
import "./App.css";
import { BrowserRouter, Route ,Routes } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import  Header from "./Components/Header"
import Alert from "./Components/Alert";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes> 
        <Route path="/"  exact element={<Homepage/>} />
        <Route path="/coins/:id" exact element={<CoinPage/>}  />
        </Routes>
      </div>
    <Alert/>

    </BrowserRouter>
  );
}

export default App;