import { useState, useEffect, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Item from "./item.jsx"

const PREM = "GB1"

let tempArr = []
for (let i = 0; i <= 19; i++){
  tempArr[i] = i + 1
}
const TEST_ARR = tempArr


// STEP 1: fetch all the players in the prem
// STEP 2: 

function App() {

  const [standings, setStandings] = useState( [] )
  const [players, setPlayers] = useState( [] )

  useEffect(() => {
    // fetching all the data somehow 
    fetch("https://transfermarkt-api.vercel.app/openapi.json").then(res => res.json()).then( (clubdata) => {
      // get all the club id's adn stuff to get the players
      console.log(clubdata)
      /*for (const i in clubdata.clubs){
        fetch( `https://transfermarkt-api.vercel.app/clubs/${clubdata.clubs[i].id}/players` ).then(res => res.json()).then( (playerdata) => {
          for (const j in playerdata.players){
            if (players.length < 50){
              const chosenPlayer = playerdata.players[j]
              setPlayers( prev => [...prev, {  name : chosenPlayer.name, marketValue : chosenPlayer.marketValue }] )
            }
          } 

        } )
      }*/

    })
  }, [])

  return (
    <>
    <h1> Web Football </h1>
    {
      players.length > 0 ? player.map((val, i) => ( <h1>{val.name}</h1> )) : "loading"
    }
    </>
  )
}

export default App
