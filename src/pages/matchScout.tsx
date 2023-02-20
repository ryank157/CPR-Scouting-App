import { type NextPage } from "next";
import { useState, useEffect, useReducer} from "react";

import { TimeReducer, initialTimeState } from "@/utils/matchScout/time";

import BeforeScout from "src-components/matchScout/before";
import AutoScout from "src-components/matchScout/auto";
import {TeleScout} from "src-components/matchScout/tele";
import { MatchEventsReducer, initialMatchState } from "@/utils/matchScout/events";
import ScoutHeader from "src-components/matchScout/header";
import { EndgameScout } from "src-components/matchScout/endgame";
import { ReviewScout } from "src-components/matchScout/review";


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
        matchEvents, 
        matchDispatch, 
        timeState,
        timeDispatch,
      })
  
      case 'endgame':
       return (
          EndgameScout({
            matchEvents,
            matchDispatch,
            timeState,
            timeDispatch,
          })
       )
       case 'review':
          return (
            ReviewScout({
              matchEvents,
              matchDispatch,
              timeState,
              timeDispatch,
            })
          )    
  }


  
  
}};



export default MatchScout;




 