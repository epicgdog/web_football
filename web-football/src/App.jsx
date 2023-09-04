import { useState, useEffect, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Item from "./item.jsx"
import Player from "./player.jsx"

const PREM = "GB1"

let tempArr = []
for (let i = 0; i <= 19; i++){
  tempArr[i] = i + 1
}
const TEST_ARR = tempArr


// STEP 1: fetch all the players in the prem
// STEP 2: 

function App() {

  const [topPlayers, setTopPlayers] = useState([])
  const [teams, setTeams] = useState([])

  useEffect(() => {
    // fetching all the data somehow 
    fetch("https://cors-anywhere.herokuapp.com/https://transfermarkt-api.vercel.app/competitions/GB1/clubs").then(res => res.json()).then( (clubdata) => {
      // get all the club id's adn stuff to get the players
      console.log(clubdata)
      for (const i in clubdata.clubs){
        setTeams( prev => [...prev, clubdata.clubs[i].name] )
      }

      // save all clubs names in a variable

      // getting top 3 most valuable players in prem
      for (let i = 0; i < 3; i++){
        fetch( `https://cors-anywhere.herokuapp.com/https://transfermarkt-api.vercel.app/clubs/${clubdata.clubs[i].id}/players` ).then(res => res.json()).then( (playerdata) => {
          let topPlayer = ""
          let topMarketValue = 0
          for (const j in playerdata.players){
            const chosenPlayer = playerdata.players[j]
            const marketValue = chosenPlayer.marketValue.replace("€", "").replace("m", "0000").replace(".", "").replace("k", "000")
            console.log(marketValue)
            if ( parseFloat(marketValue) > topMarketValue || topPlayer == ""){
              topMarketValue = parseFloat(marketValue)
              topPlayer = chosenPlayer.name
            }
          } 
          setTopPlayers( prev => [...prev, { name: topPlayer, value : topMarketValue }])
        } )
      }

    })
  }, [])

  return (
    <>
    <h1> Web Football </h1>
    <div>
      <h3> Filter </h3>
      <button> Select Teams </button>
      <ul>
        {
          teams.map((val) => (<li> {val} </li>) )
        }


      </ul>
    </div>

    <div>
      <h2> Top 3 Most Valuable Players </h2>
      {
        topPlayers.length > 0 ? topPlayers.map((val, i) => ( <Player data={val}/>)) : "loading"
      }
    </div>
    </>
  )
}

export default App
