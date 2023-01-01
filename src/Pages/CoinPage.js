
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { useEffect } from 'react';
import ReactHtmlParser from "react-html-parser";
import { useLocation, useParams } from 'react-router-dom';
import { SingleCoin } from '../Config/api';
import { numberWithCommas } from "../Components/CoinsTable";
import { CryptoState } from '../Components/CryptoContext';
import CoinInfo from "../Components/CoinInfo";

const parse = require('html-react-parser');
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CoinPage = () => {
  const classes=useStyles();
  const {id}=useParams();
const location=useLocation();
console.log("location " ,location)
  const [coins, setcoins] = useState([]);
  const {currency,symbol}=CryptoState();
  console.log(id)
 console.log(coins)
  useEffect(() => {
    const fetchCoinItem=async()=>{
        const data= await fetch((SingleCoin(id)),{
        method:'GET',
        })
      const result=await data.json();
      console.log("This is result", result)
      setcoins(result);
    }
   fetchCoinItem(); 
  }, [])
  console.log("This is coins " , coins)
  
  if (!coins) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container} >
       <div className={classes.sidebar} >
      <img src={location.state.image} style={{
        height:200,
          width:200,
      }}/>
        <Typography variant="h3" className={classes.heading}>
          {coins?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coins?.description?.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}> 
          <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
            {coins.market_cap_rank}
            </Typography>
            </span> 
            <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
            {symbol}{" "}
  
             {coins?.market_data?.current_price?.[currency.toLowerCase()].toLocaleString()}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              
                {coins?.market_data?.market_cap?.[currency.toLowerCase()].toLocaleString().slice(0, -6)}
              
              
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coins} />
      </div>
  )
}

export default CoinPage
