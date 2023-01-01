import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Pagination from "@material-ui/lab/Pagination";
import { Container,createTheme,TableCell, LinearProgress, ThemeProvider, Typography, TextField, TableBody,TableRow,TableHead,TableContainer,Table,
Paper } from "@mui/material";                                      
import axios from "axios";
import { CoinList } from "../Config/api";
import { useNavigate } from 'react-router-dom';
import { CryptoState } from "./CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const useStyles=makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#8f8f8f",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",    //pasted from documentaiton

    },
  },
 });
export default function CoinsTable() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
console.log(coins)
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
        
  const handleSearch = () => {
    return coins.filter(  
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          sx={{input:{ color: "white", } }}
          style={{ marginBottom: 20, width: "100%" ,borderColor:'white'}}
          onChange={(e) => setSearch(e.target.value)}
        />
       <TableContainer>
       {
       loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ):(
            <Table style={{}}>
              <TableHead style={{ backgroundColor: "#8f8f8f" }}>
              <TableRow>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
 ))}
                </TableRow>
              </TableHead>
              <TableBody>
              {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                  const profit = row.price_change_percentage_24h > 0;
                  return(
                    <TableRow
                    onClick={() =>navigate(`/coins/${row.id}`,{
                      state:row
                    })}
                
                    className={classes.row}
                    key={row.name}
                    >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                color:"white",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{color:"white"}}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(3))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{color:"white"}}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          
                        </TableCell>
                    </TableRow>
                  )
              })}
              </TableBody>
            </Table>
          )
}
       </TableContainer>
       <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            color: "white",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}