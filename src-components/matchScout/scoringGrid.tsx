import type { ScoringGrid } from "@/pages/matchScout"
import type {Dispatch} from 'react'
import type { MatchPage, TimeAction, TimeState } from "@/utils/matchScout/time"

import type { MatchEventsState, MatchAction, ScoredObject, ScoringTypes } from "@/utils/matchScout/events"
import { time } from "console"

interface ScoringGridProps {
    timeState: TimeState,
    timeDispatch: Dispatch<TimeAction>,
    matchEvents: MatchEventsState,
    matchDispatch: Dispatch<MatchAction>
}


export default function ScoringGrid({matchEvents, matchDispatch, timeState}: ScoringGridProps) {
    const grid: string[][] = Array(3).fill(Array(9).fill(''));
    const {scoredObjects} = matchEvents
    const {matchPage} = timeState


  
    return (
      <div className="relative flex flex-wrap justify-center">
        <div className="w-15 flex justify-center items-center">
        <div className="transform -rotate-90 text-3xl whitespace-nowrap">Feeder Station</div>
        </div>
        <div className="flex flex-col">
        {grid.map((row, rowIndex) => (
            <div key={rowIndex+100} className="flex gap-1.25 pb-1.25">
                {row.map((cell, cellIndex) => {
                if(rowIndex === 0 || rowIndex === 1) {

                    const gridLoc = rowIndex * 9 + cellIndex;
                    return (
                        <div 
                        key={gridLoc} 
                        className={cellClasses(gridLoc,scoredObjects, matchPage)} 
                        onClick={() => 
                            matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {
                            cycleTime: 15,
                            type: scoredType(gridLoc, matchPage),
                            scoredLoc: gridLoc,
                            }})
                          }>
                        
                        </div>
                    );
                } else {
                    const gridLoc = rowIndex * 9 + cellIndex*2;
                    const diagSlots = [gridLoc, gridLoc+1]
                    return (
                        <div key={gridLoc+1000}  className={`${cellClasses(gridLoc,scoredObjects, matchPage)} relative overflow-hidden `}>
                            <div className="h-[150px] w-[150px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 grid grid-cols-2 grid-rows-1">
                                {diagSlots.map((slotLoc) => {
                                return <div 
                                    key={slotLoc}
                                    className="" 
                                    onClick={() => 
                                        //If not scored already do add score details

                                        matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {
                                        cycleTime: 15,
                                        type: scoredType(slotLoc,matchPage),
                                        scoredLoc: slotLoc,
                                        }})

                                        //If page is auto, then do edit score and remove score


                                        //If page is tele && edit score button was pressed, then 
                                            //edit the specific entry
                                            //On submit, update the entry and start a new cycle

                                            //if delete pressed
                                                //remove from scoredObjects
                                    
                                    
                                    }>

                                </div>
                                })
                                }
                            </div>
                        </div>

                    )
                }
                })}
            </div>
            ))}
        </div>
        <div className="w-15 flex justify-center items-center">
        <div className="transform rotate-90 text-3xl whitespace-nowrap">Void</div>
        </div>
      </div>
    );
  }

  const cellClasses = (gridLoc: number, scoredObjects: ScoredObject[], matchPage: MatchPage) => {
    //Need to cut the renders WAY down somehow
    const cones = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17];
    const cubes = [1, 4, 7, 10, 13, 16];
    const groundCones = [18, 20, 22, 24, 26, 28, 30, 32, 34];
    const groundCubes = [19, 21, 23, 25, 27, 29, 31, 33, 35];
  
    let bgImage = "";
    const scoredLocsSet = new Set<number>();
    scoredObjects.forEach((score) => {
    if (typeof score.scoredLoc !== "undefined") {
        scoredLocsSet.add(score.scoredLoc);
    }
    });

    if (scoredLocsSet.size !== 0 ){
        if(matchPage === 'auto' && ((gridLoc > 17 && (scoredLocsSet.has(gridLoc) || scoredLocsSet.has(gridLoc+1))) || scoredLocsSet.has(gridLoc))) {
            bgImage = 'bg-inactive-border'
            //Bottom Row
        } else if(gridLoc > 17 && (scoredLocsSet.has(gridLoc) || scoredLocsSet.has(gridLoc+1))){
           scoredObjects.forEach((score) => {
                for(let i=0; i< groundCones.length; i++){
                    if(score.scoredLoc === groundCubes[i] && gridLoc === groundCones[i]){
                        bgImage = 'bg-bottom-cube'
                        break
                    } else if(score.scoredLoc === gridLoc){
                        bgImage = 'bg-bottom-cone'
                        break
                    } 
                }
            })
       //Top 2 Rows
        } else if(gridLoc <= 17 && scoredLocsSet.has(gridLoc) && bgImage === '') {
        if (cones.includes(gridLoc)) {
            bgImage ="bg-cone-filled"
          } else if (cubes.includes(gridLoc)) {
            bgImage = "bg-cube-filled"
          }
        //Default
        } else {
            if (cones.includes(gridLoc)) {
            bgImage = "bg-cone-empty";
            } else if (cubes.includes(gridLoc)) {
            bgImage = "bg-cube-empty";
            } else if (groundCones.includes(gridLoc)) {
            bgImage = "bg-bottom-empty";
            } else if (groundCubes.includes(gridLoc)) {
            bgImage = "bg-bottom-empty";
            }
        }   
        //Nothing Scored yet
    } else {
        if (cones.includes(gridLoc)) {
            bgImage = "bg-cone-empty";
        } else if (cubes.includes(gridLoc)) {
            bgImage = "bg-cube-empty";
        } else if (groundCones.includes(gridLoc)) {
            bgImage = "bg-bottom-empty";
        } else if (groundCubes.includes(gridLoc)) {
            bgImage = "bg-bottom-empty";
        }
    }
   
  
    let styling = `w-25 h-25 flex justify-center items-center border bg-cover bg-center ${bgImage}`;
  
    if ([2,5,11,14,22,28].includes(gridLoc)) {
      styling += " mr-4";
    } 
  
    return styling;
  }
  

function scoredType(gridLoc: number, matchPage: MatchPage): ScoringTypes {
    const cones = [0,2,3,5,6,8,9,11,12,14,15,17]
    const cubes = [1,4,7,10,13,16]
    const groundCones = [18,20,22,24,26,28,30,32,34]
    const groundCubes = [19,21,23,25,27,29,31,33,35]

    let scoredType: ScoringTypes = undefined

    if(cones.includes(gridLoc) || groundCones.includes(gridLoc)) {
        if(matchPage === 'auto') {
            scoredType = 'auto-cone'
        } else if (matchPage === 'tele') {
            scoredType = 'tele-cone'
        } else {
            scoredType = undefined
        }
    }else if(cubes.includes(gridLoc) || groundCubes.includes(gridLoc)) {
        if(matchPage === 'auto') {
            scoredType = 'auto-cube'
        } else if (matchPage === 'tele') {
            scoredType = 'tele-cube'
        } else {
            scoredType = undefined
        }
    }
    return scoredType
}

function scoringClick() {
    return undefined
}
    


