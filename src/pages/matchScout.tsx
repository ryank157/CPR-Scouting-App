import { type NextPage } from "next";
import { useState, useEffect, useReducer} from "react";
import  type {Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Button from "src-components/button";
import AutoScout from "src-components/matchScout/auto";
import type { AutoEventsState } from "@/utils/matchScout/auto";
import { autoEventsReducer } from "@/utils/matchScout/auto";


export type MatchState = 'before' | 'auto' | 'tele' | 'endgame' | 'review'
export type ScoringGrid = "nothing" | "auto-cone" | "auto-cube" | "tele-cone" | "tele-cube"

const MatchScout: NextPage = () => {
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [matchTime, setMatchTime] = useState(new Date().getTime())
  const [endTime, setEndTime] = useState(startTime + 138000)
  const [adjustment, setAdjustment] = useState(0)
  const [activeMatch, setActiveMatch] = useState(false)
  const autoTime = (endTime - matchTime + adjustment - 123000)/1000
  const teleTime = (endTime - matchTime + adjustment)/1000
  
  const [cycleToggle, setCycleToggle] = useState(true)
  const [matchState, setMatchState] = useState<MatchState>('before')

   
  
  const grid: string[][] = Array(3).fill(null).map(() => Array(9).fill(null));
  const [scoredGrid, setScoredGrid] = useState<ScoringGrid[]>(Array(27).fill("nothing"))
  const [selectedCell, setSelectedCell] = useState(-1)
  const [cellToggle, setCellToggle] = useState(true)
  
  //Advance Time
  useEffect(() => {
    const interval = setInterval(() => {
        setMatchTime(startTime => startTime + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //Update everything on match start
  useEffect(() => {
    setMatchTime(startTime); 
    setEndTime(startTime + 138000)
    setAdjustment(0)
  }, [startTime])
  
  
  
  useEffect(() => {
    console.log('render')
    if (selectedCell === -1) {
      return;
    }

    setScoredGrid(prev => {
      const t = [...prev]
      let value:ScoringGrid = "nothing"
      const cones =  [0,2,3,5,6,8,9,11,12,14,15,17]
      const cubes = [1,4,7,10,13,16]
      //Bottom Row
      if (selectedCell >= 18 && selectedCell <= 26) {
        if (t[selectedCell] === "auto-cone") {
          value = "auto-cube";
        } else if (t[selectedCell] === "nothing") {   
          value = "auto-cone";
        } else if (t[selectedCell] === "auto-cube") {
          value = "nothing";
        }
      
      //Cubes 
      } 
      if (cubes.includes(selectedCell)) {
        if(t[selectedCell] === 'nothing'){
          value = "auto-cube"
        } else if (t[selectedCell] === 'auto-cube'){
          value = "nothing"
        }
      }
      //Cones
      if (cones.includes(selectedCell)) {
        if(t[selectedCell] === 'nothing'){
          value = "auto-cone";
        } else if(t[selectedCell] = "auto-cone"){
          value = "nothing";
        }
      }
      t[selectedCell] = value
      return t;
    })
 
    
  },[selectedCell,cellToggle])


  const initialState: AutoEventsState = {
    mobility: '',
    balancing: '',
    fouls: [],
  };
  const [autoEvents, dispatch] = useReducer(autoEventsReducer, initialState);
  
  
    
  switch (matchState) {
    case 'before':
    return (
      
        <div className="relative border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
          <Link className='absolute top-4 left-4'href="/">
              <Button text="Home" className=""/>                
          </Link>
        <div className="text-4xl font-bold">Red 1 - 3663</div>
        <div className="w-[717px] h-[637px] bg-red-start bg-cover bg-center bg-no-repeat "></div>
        {!activeMatch && (
          <button className="p-2 border border-cpr-blue"onClick={() => { setMatchState('auto'); setStartTime(new Date().getTime()); setActiveMatch(true)}}>Start Match</button>
        )}
        {activeMatch && (
          <button className="p-2 border border-cpr-blue"onClick={() => { setMatchState('auto')}}>Continue Match</button>
        )}
        
        </div>
        
    )
    case 'auto':
      

      return AutoScout({autoTime, grid, scoredGrid, cellToggle, setCellToggle, setSelectedCell, adjustment, setAdjustment,setMatchState, autoEvents, dispatch})
      
      
    case 'tele':
     return (
        
        

        <div className="h-screen relative w-full">
            <div className="absolute top-4 left-4">{Nav(setMatchState, 'auto', 'Back')}</div>
            <div className=" h-full flex flex-col p-4 items-center ">
              <div className="flex justify-around items-center w-full mb-5">

                <div className="text-4xl">Tele: 3663</div>
                <div className="flex">
                <div className="border px-2 py-1 cursor-pointer" onClick={() =>  setAdjustment( adjustment - 1000)}>-</div>
                <div className="text-4xl mx-2">{
                teleTime > 120 ? 'In Auto' :
                teleTime > 0 ? teleTime : "Complete"                
                }</div>
                <div className="border px-2 py-1 cursor-pointer" onClick={() =>  setAdjustment( adjustment + 1000)}>+</div>
                </div>
                
              </div>
              
              <div>               
              <div className="grid grid-rows-3  grid-cols-9 bg-scoring-grid bg-cover bg-center bg-no-repeat w-[900px] h-[300px] p-1">
                  {grid.map((row, i) =>
                    row.map((_, j) => (
                      
                      <div onClick={() => {setSelectedCell(i*9+j); setCellToggle(!cellToggle)}} key={i * 9 + j} className={
                        scoredGrid[i*9+j] === 'auto-cone' ? 'bg-orange-500 border-2 border-red-500 ': 
                        scoredGrid[i*9+j] === 'auto-cube' ? 'bg-blue-500 border-2 border-red-500 ': 
                        'border-2 border-red-500' }/>
                    ))
                  )}
                </div>
              </div>

              <div className="self-start flex gap-2">
                <div>
                Cycle Mode
                </div>
                <div onClick={() => setCycleToggle(!cycleToggle)}>{cycleToggle ? "active" : "inactive"} </div>
              </div>
              {cycleToggle && (
                <>
                <div className="flex w-full px-4">
                  <div className="flex-col grow items-center px-4 ">
                    <div className="text-center py-4 font-bold text-xl">Current Cycle</div>
                      <div className="flex justify-center items-center border py-2">
                        <div className="px-2 flex flex-col items-center w-full">
                          <div>Time of Current Cycle</div>
                          <div>Minus or Plus to adjust</div>
                        </div>
                        <div className="px-2 flex flex-col  items-center border-r border-l w-full">
                          <div>Pickup Location</div>
                          <div>Feeder, Middle, Community</div>
                        </div>
                        <div className="flex px-2 w-full justify-center">Obstructed/Defended</div>
                      </div>
                      <div className="text-center p-2 m-2">Submit is on grid click</div>
                  </div>
                <div className="flex flex-col w-64 grow justify-start items-center px-4 ">
                  <div className="text-center py-4 font-bold text-xl">Cycle History</div>
                  <div className="flex w-full justify-between border p-2">
                    <div>#</div>
                    <div>Piece Scored</div>
                    <div>Time</div>
                    <div>Edit</div>
                  </div>

                </div>
                
                </div>
                </>
              )}
              {!cycleToggle && (
                <>
                  
                  <div>Defense</div>
                  <div>Fouls</div>
                  <div>Infrequent Scoring</div>
                </>
              )}
              
            </div>
              <div className="absolute bottom-4 left-0 w-full flex justify-center ">

              {Nav(setMatchState, 'endgame', 'Start Endgame')}
              </div>
            </div>
        
     )
    
    case 'endgame':
     return (
        <div className="border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
        <div className="self-start">{Nav(setMatchState, 'tele', 'Back')}</div>
        <div>endgame</div>
        <div>
        <div>Solo vs Double vs Triple</div>
        <div>If double, go first or second?</div>
        <div>Start Timer</div>
        <div>End Timer</div>
        <div>Success/Fail</div>
        </div>
        {Nav(setMatchState, 'review', 'Review')}
        </div>
     )
     case 'review':
        return (
          <div className="border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
           <div className="self-start">{Nav(setMatchState, 'endgame', 'Back')}</div>
           <div>
            <div> Your team was x, Scored y points in this way</div>
            <div>Auto: Pieces + Mobility + Balance = x points</div>
            <div>Tele: x Pieces placed at these spots for y points</div>
            <div>Endgame: Balanced/Docked/NA in this time for z points</div>
            <div>(robot number) scored xyz points.</div>
            </div>
           <button onClick={(e) => {e.preventDefault(); }}>Submit</button>
           </div>
        )    
}};

export function Nav(setMatchState: Dispatch<SetStateAction<MatchState>>, path: MatchState, text: string) {
  return(
      <button className="p-2 border border-cpr-blue"onClick={(e) => {e.preventDefault(); setMatchState(path)}}>{text}</button>
  )
}

export default MatchScout;




 