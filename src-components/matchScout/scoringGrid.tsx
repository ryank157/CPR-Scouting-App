import {useState} from 'react'

import type { ScoringGrid } from "@/pages/matchScout"
import type {Dispatch} from 'react'

import type { TimeAction, TimeState, MatchPage } from "@/utils/matchScout/time"
import Button from 'src-components/button'
import Link from 'next/link'
import TimerButton from 'src-components/timerButton'


import type { MatchEventsState, MatchAction, ScoredObject, ScoringTypes } from "@/utils/matchScout/events"

interface ScoringGridProps {
    timeState: TimeState,
    timeDispatch: Dispatch<TimeAction>,
    matchEvents: MatchEventsState,
    matchDispatch: Dispatch<MatchAction>
}


export default function ScoringGrid({matchEvents, matchDispatch}: ScoringGridProps) {
    const grid: string[][] = Array(3).fill(Array(9).fill(''));
    const {scoredObjects} = matchEvents
  
    return (
      <div className="relative flex flex-wrap justify-center">
        <div className="transform -rotate-90 text-3xl absolute left-0 top-1/2">Feeder Station</div>
        <div className="flex flex-col">
        {grid.map((row, rowIndex) => (
            <div key={rowIndex+100} className="flex gap-1.25 pb-1.25">
                {row.map((cell, cellIndex) => {
                if(rowIndex === 0 || rowIndex === 1) {

                    const gridLoc = rowIndex * 9 + cellIndex;
                    return (
                        <div 
                        key={gridLoc} 
                        className={cellClasses(gridLoc,scoredObjects)} 
                        onClick={() => 
                            matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {
                            cycleTime: 15,
                            type: scoredType(gridLoc),
                            scoredLoc: gridLoc,
                            }})
                          }>
                        
                        </div>
                    );
                } else {
                    const gridLoc = rowIndex * 9 + cellIndex*2;

                    return (
                        // Bug here with div only selecting one option
                        <div key={gridLoc}  className={`${cellClasses(gridLoc,scoredObjects)} relative overflow-hidden `}>
                            <div className="h-[150px] w-[150px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 grid grid-cols-2 grid-rows-1">
                                <div 
                                    className="" 
                                    onClick={() => 
                                        matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {
                                        cycleTime: 15,
                                        type: scoredType(gridLoc),
                                        scoredLoc: gridLoc,
                                    }})}>

                                </div>
                                <div 
                                    className="" 
                                    onClick={() => 
                                        matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {
                                        cycleTime: 15,
                                        type: scoredType(gridLoc+1),
                                        scoredLoc: (gridLoc+1),
                                    }})}>

                                </div>
                                </div>
                        </div>

                    )
                }
                })}
            </div>
            ))}
        </div>
        <div className="transform rotate-90 text-3xl absolute right-0 top-1/2">Void</div>




      </div>
    );
  }

  function cellClasses(gridLoc: number, scoredObjects: ScoredObject[]) {
    //Need to cut the renders WAY down somehow
    const cones = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17];
    const cubes = [1, 4, 7, 10, 13, 16];
    const groundCones = [18, 20, 22, 24, 26, 28, 30, 32, 34];
    const groundCubes = [19, 21, 23, 25, 27, 29, 31, 33, 35];
  
    let bgImage = "";
    
  
    if (scoredObjects.length !== 0) {
      scoredObjects.forEach((score) => {
        if (score.scoredLoc === gridLoc) {
          if (cones.includes(gridLoc)) {
            bgImage =
              
                 "bg-cone-filled"
                
          } else if (cubes.includes(gridLoc)) {
            bgImage =
              
                 "bg-cube-filled"
                
          } else if (groundCones.includes(gridLoc)) {
            
            bgImage =
              
                 "bg-bottom-cone"
                
          } else  {
            
            bgImage =
              
               "bg-bottom-cube"
              
          }
        }
      });
    }
  
    if (bgImage === "") {
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
  
    if ((gridLoc + 1) % 3 === 0 && gridLoc < 17) {
      styling += " mr-4";
    } else if (gridLoc === 22 || gridLoc === 28) {
      styling += " mr-4";
    }
  
    return styling;
  }
  

function scoredType(gridLoc: number): ScoringTypes {
    const cones = [0,2,3,5,6,8,9,11,12,14,15,17]
    const cubes = [1,4,7,10,13,16]
    const groundCones = [18,20,22,24,26,28,30,32,34]
    const groundCubes = [19,21,23,25,27,29,31,33,35]

    let scoredType: ScoringTypes = undefined

    if(cones.includes(gridLoc) || groundCones.includes(gridLoc)) {
        scoredType = 'tele-cone'
    }else if(cubes.includes(gridLoc) || groundCubes.includes(gridLoc)) {
        scoredType = 'tele-cube'
    }
    return scoredType
}
    


