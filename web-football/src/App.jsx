import { useState, useEffect, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Item from "./item.jsx"

let tempArr = []
for (let i = 0; i <= 19; i++){
  tempArr[i] = i + 1
}
const TEST_ARR = tempArr

function App() {

  const [standings, setStandings] = useState( [] )

  useEffect(() => {
    fetch("https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=2023&sort=asc").then( res => res.json() ).then( data => { console.log(data);setStandings(data.data.standings) })
  }, [])

  return (
    <>
    <h1> Web Football </h1>
    {
      standings.length > 0 ? standings.map((val, i) => ( <Item data={val}/> )) : "loading"
    }
    </>
  )
}

export default App
