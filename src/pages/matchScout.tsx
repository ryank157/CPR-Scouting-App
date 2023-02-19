import { type NextPage } from "next";
import { useState, useEffect, useReducer} from "react";

import { TimeReducer, initialTimeState } from "@/utils/matchScout/time";

import BeforeScout from "src-components/matchScout/before";
import AutoScout from "src-components/matchScout/auto";
import {TeleScout} from "src-components/matchScout/tele";
import { MatchEventsReducer, initialMatchState } from "@/utils/matchScout/events";
import ScoutHeader from "src-components/matchScout/header";


export type ScoringGrid = "nothing" | "auto-cone" | "auto-cube" | "tele-cone" | "tele-cube"

const MatchScout: NextPage = () => {
  //Relating to time and page
  const [timeState, timeDispatch] = useReducer(TimeReducer, initialTimeState);

  // useEffect(() => {
  //   if (timeState.activeMatch) {
  //     const interval = setInterval(() => {
  //       timeDispatch({ type: 'ADJUST_TIME', increase: 1000 });
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [timeState.activeMatch]);

  
  //Relating to scoring
  const grid: string[][] = Array(3).fill(null).map(() => Array(9).fill(null));
  const [scoredGrid, setScoredGrid] = useState<ScoringGrid[]>(Array(27).fill("nothing"))
  const [selectedCell, setSelectedCell] = useState(-1)
  const [cellToggle, setCellToggle] = useState(true)
  const [cycleToggle, setCycleToggle] = useState(true)

  
  useEffect(() => {
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
      } 

      if (cubes.includes(selectedCell)) {
        if(t[selectedCell] === 'nothing'){
          value = "auto-cube"
        } else if (t[selectedCell] === 'auto-cube'){
          value = "nothing"
        }
      }
      
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

  //Relating to match events
 
  
  const [matchEvents, matchDispatch] = useReducer(MatchEventsReducer, initialMatchState)

  return(
    <div className="flex flex-col h-screen">
    <ScoutHeader timeState={timeState} timeDispatch={timeDispatch}/>
    <ScoutingBody />
    </div>
  )


  function ScoutingBody(){
    switch (timeState.matchPage) {
      case 'before':
      return BeforeScout({
        matchEvents,
        matchDispatch
      })
  
      case 'auto':
        return AutoScout({
          cellToggle, 
          setCellToggle, 
          setSelectedCell, 
   
          matchEvents, 
          matchDispatch,
          timeState,
          timeDispatch,
        })
  
      case 'tele':
       return TeleScout({
        
        grid, 
        scoredGrid, 
        cellToggle, 
        setCellToggle, 
        setSelectedCell, 
        
        matchEvents, 
        matchDispatch, 
        cycleToggle, 
        setCycleToggle,
        timeState,
        timeDispatch,
      })
  
      case 'endgame':
       return (
          <div className="border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
          <div className="self-start p-2 border border-cpr-blue" onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'tele'})}>Back</div>
          <div>endgame</div>
          <div>
          <div>Solo vs Double vs Triple</div>
          <div>If double, go first or second?</div>
          <div>Start Timer</div>
          <div>End Timer</div>
          <div>Success/Fail</div>
          </div>
          <div className="p-2 border border-cpr-blue" onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'review'})}>Review Match</div>
          </div>
       )
       case 'review':
          return (
            <div className="border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
             <div className="absolute top-4 left-4 p-2 border border-cpr-blue" onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'endgame'})}>Back</div>
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
  }


  
  
}};



export default MatchScout;




 