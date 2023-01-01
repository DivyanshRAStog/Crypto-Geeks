import React, { createContext } from 'react'
import { Children } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Pages/firebase";
import axios from "axios";
import { CoinList } from '../Config/api'
import { onSnapshot, doc } from "firebase/firestore";
const crypto=createContext()
const CryptoContext = ({children}) => {
    const [currency, setcurrency] = useState("INR")
    const [symbol, setsymbol] = useState("₹") 
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
      open: false,
      message: "",
      type: "success",
    });
    const [watchlist, setWatchlist] = useState([]);  
  const [user,setUser]=useState(null);
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
    useEffect(() => {
       if(currency=="INR")
       setsymbol("₹")
       else if(currency=="USD")
       setsymbol("$")
    }, [currency])
  return (
  <crypto.Provider value={{symbol,currency,setcurrency,alert,
    setAlert,
    user,
    coins,
    loading,
    watchlist,}}>
    {children}
  </crypto.Provider>
  )
}

export default CryptoContext;


export const CryptoState=()=>{
   return useContext(crypto);
}