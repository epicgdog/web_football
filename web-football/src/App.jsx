import { useState, useEffect, Suspense } from 'react'
import './App.css'
import Dropdown from "./dropdown.jsx"
const PREM = "GB1"

let tempArr = []
for (let i = 0; i <= 19; i++){
  tempArr[i] = i + 1
}
const TEST_ARR = tempArr

// turn to false if u have wifi to wokr with
const OFFLINE = false

const OFFLINE_TEAMS = {
  "Manchester City": "1",
  "Manchester United" : "2", 
  "Liverpool" : "3", 
  "Chelsea" : "4", 
  "Arsenal" : "5", 
  "Tottenham Hotspur" : "6"
}

let offlinePlayers  = {}
function generateName(numOfChars) {
  let str = ""
  for (let i = 0; i < numOfChars; i++){
    const num = Math.floor( Math.random() * 26 + 1 )
    str = str + String.fromCharCode(97 + num)
  }
  return str
}

if (OFFLINE){
  for (let index in OFFLINE_TEAMS){
    let players = []
    for (let i = 0; i < 10; i++ ){
      players[i] = { name : generateName(5) + " " +  generateName(9),  marketValue : Math.floor(Math.random() * 10 + 1) * 1000000 }
    }
    offlinePlayers[OFFLINE_TEAMS[index]] = players
  }
}

function convertFromMarketVal(mValue){
  let multiplier = 1000
  if (mValue.match("m")){
    multiplier = 1_000_000
  }
  return parseFloat(mValue.replace("€", "")) * multiplier
}

function quickSort(arr){
  // choosing pivot
  if (arr.length <= 1 ){ return arr; }
  const pivot = convertFromMarketVal(arr[0].mValue)
  // divide and conquer
  let left = []
  let right = []
  let same = []

  // looping through each item and if it is less than pivot we put in left array else in right array
  for (let i = 1; i < arr.length; i++){
    const val = convertFromMarketVal(arr[i].mValue)
    if (val > pivot){
      right.push(arr[i])
    } else if( val < pivot){
      left.push(arr[i])
    } else if (val == pivot){
      same.push(arr[i])
    }
  }

  return [...quickSort(left), arr[0], ...same, ...quickSort(right)]
}

function App() {

  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState({})
  const [selectedTeam, setSelectedTeam] = useState("")
  const [plrsLoading, setPlrsLoading] = useState(false)
  const [sortType, setSortType] = useState("lowest")

  useEffect(() => {
    // fetching all the data somehow 
    if (OFFLINE) { setTeams(OFFLINE_TEAMS); return; }
    fetch("https://cors-anywhere.herokuapp.com/https://transfermarkt-api.vercel.app/competitions/GB1/clubs").then(res => res.json()).then( (clubdata) => {
      // get all the club id's adn stuff to get the players
      setTeams( (prev) => {
        let obj = {}
        for (const i in clubdata.clubs){
          obj[clubdata.clubs[i].name] = clubdata.clubs[i].id;
        }
        console.log(obj)
        return obj
      })
    })
  }, [])

  useEffect(() => {
    if (OFFLINE && selectedTeam.length > 0){
      const arr = offlinePlayers[OFFLINE_TEAMS[selectedTeam]]
      for (let i = 0; i < arr.length; i++){
        
      }
      setPlayers( offlinePlayers[OFFLINE_TEAMS[selectedTeam]] )

    } else if (selectedTeam.length > 0){
      setPlrsLoading(true)
      fetch(`https://cors-anywhere.herokuapp.com/https://transfermarkt-api.vercel.app/clubs/${teams[selectedTeam]}/players`).then(res => res.json()).then( (club) => {
        const players = club.players
        let arr = []
        for (let i = 0; i < players.length; i++){
          const name = players[i].name
          const mValue = players[i].marketValue
          arr.push({name: name, mValue : mValue})
        }
        setPlayers( quickSort(arr) )
        setPlrsLoading(false)
      } )
    }
  }, [selectedTeam])

  return (
    <>
    <h1 className="title"> Web Football </h1>
    <div>
      <div>
        {
          Object.keys(teams).length > 0 ? Object.keys(teams).map((val) => (<button onClick={ () => setSelectedTeam(val) }> {val} </button>)) : "loading"
        }
      </div>
      <div>
        <br></br>
        <Dropdown buttonText="Sort by...">
          <button onClick={ () => {setPlayers(prev => [...prev].reverse()); setSortType(prev => prev == "highest" ? "lowest" : prev == "lowest" ? "highest" : "highest" )} }> {sortType == "lowest" ? "highest" : "lowest"} market value</button>
        </Dropdown>
        {
          plrsLoading ? "loading" : players.map((val) => ( <p>{val.name} | {val.mValue}</p>  ))
        }
      </div>
    </div>
    </>
  )
}

export default App
