import React from 'react' 
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import { useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useState } from 'react'
import{CryptoState} from '../Components/CryptoContext'
import { TrendingCoins } from '../Config/api'
const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}))
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const Carousel = () => {
  const [trending, settrending] = useState([]);
  const classes=useStyles()
  const {currency,symbol}=CryptoState()
  const fetchTrendingCoins=async()=>{
   axios.get(TrendingCoins(currency)).then((response)=>{
    settrending(response.data)
   }).catch(error=>console.log(`error:${error}`))
  }
  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
   fetchTrendingCoins()
  }, [currency])
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
 
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
          onDragStart={handleDragStart} role="presentation"
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
 
  return (
    <div className= {`${classes}.carousel  alice-carousel__prev-btn-item`}>
      <AliceCarousel
      mouseTracking
      infinite
      keyboardNavigation
      animationType="fadeout"
      autoPlayStrategy='default'
      autoPlayInterval={1000}
      animationDuration={3000}
      disableDotsControls
      responsive={responsive}
      items={items }
      autoPlay
      />
    
  </div>
  )
}

export default Carousel
