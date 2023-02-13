import type { ScoringGrid } from "@/pages/matchScout"
import type {Dispatch} from 'react'

import type { TimeAction, TimeState } from "@/utils/matchScout/time"


import type { MatchEventsState, MatchAction } from "@/utils/matchScout/events"
interface AutoProps {
    
    grid: string[][],
    scoredGrid: ScoringGrid[],
    cellToggle: boolean,
    setCellToggle: Dispatch<boolean>,
    setSelectedCell: Dispatch<number>,


    
    matchEvents: MatchEventsState,
    matchDispatch: Dispatch<MatchAction>,
    timeState: TimeState,
    timeDispatch: Dispatch<TimeAction>,
}

export default function AutoScout(props: AutoProps) {
    
const {
    grid, 
    scoredGrid,
    cellToggle,
    setCellToggle,
    setSelectedCell,
    
    
    matchEvents,
    matchDispatch,
    timeState,
    timeDispatch
    } = props

   
    const autoTime = (timeState.endTime - timeState.matchTime - 123000) / 1000; 
    

return (
          <div className="h-screen relative w-full">
            <div className="absolute top-4 left-4 p-2 border border-cpr-blue" onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'before'})}>Back</div>
            
            <div className=" h-full flex flex-col p-4 items-center ">
              <div className="flex justify-around items-center w-full mb-5">

                <div className="text-4xl ">Auto: 3663</div>
            
                <div className="flex">
                {autoTime > 0 && (<div className="border px-2 py-1 cursor-pointer" onClick={() => timeDispatch({ type: 'ADJUST_TIME', increase: 1000 })}>-</div>)}
                <div className="text-4xl mx-2">{
                  
                autoTime > 0 ? autoTime : 
                autoTime > -3 ? 'Switching' : "Complete"
                
                }</div>
                {autoTime > 0 && (<div className="border px-2 py-1 cursor-pointer" onClick={() => timeDispatch({ type: 'ADJUST_TIME', increase: -1000 })}>+</div>)}
                </div>
              </div>
              <div>               
                <div className="grid grid-rows-3  grid-cols-9 bg-scoring-grid bg-cover bg-center bg-no-repeat w-[900px] h-[300px] p-1">
                {/* //TODO Need to rework the grid display so that it colors data based on matchEvents scoring array */}
                {/* TODO rework how the grid/scored grid thing works */}
                  {grid.map((row, i) =>
                    row.map((_, j) => (
                      
                        <div key={i * 9 + j}  className={
                            scoredGrid[i*9+j] === 'auto-cone' ? 'bg-orange-700 border-2 border-red-500 ': 
                            scoredGrid[i*9+j] === 'auto-cube' ? 'bg-blue-700 border-2 border-red-500 ': 
            
                            scoredGrid[i*9+j] === 'tele-cone' ? 'bg-orange-300 border-2 border-red-500 ': 
                            scoredGrid[i*9+j] === 'tele-cube' ? 'bg-blue-300 border-2 border-red-500 ': 
                            'border-2 border-red-500' }
                            
                            onClick={() => {
                              setSelectedCell(i*9+j); 
                              setCellToggle(!cellToggle)
                              matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {
                                type: 'auto-cone',
                                scoredLoc: i*9 + j,
                              }})
                            }} 
            
                            />
                    ))
                  )}
                </div>
                
              </div>
              
              <div className="h-full w-full justify-around flex mt-4">
                      <div className="flex flex-col gap-2 w-1/5">
                        <div className="text-2xl font-semibold mb-4 text-center">Mobility</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${matchEvents.mobility === 'yes' ? 'bg-blue-200' : ''}`}
                            onClick={() => matchDispatch({ type: 'SET_MOBILITY', mobility: 'yes' })}
                        >Yes</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${matchEvents.mobility === 'no' ? 'bg-blue-200' : ''}`}
                            onClick={() => matchDispatch({ type: 'SET_MOBILITY', mobility: 'no' })}
                        >No</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${matchEvents.mobility === 'no but moved' ? 'bg-blue-200' : ''}`}
                            onClick={() => matchDispatch({ type: 'SET_MOBILITY', mobility: 'no but moved' })}
                        >No but Moved</div>
                        
                      </div>
                      <div className="flex flex-col gap-2 w-1/5 ">
                        <div className="text-2xl font-semibold mb-4 text-center">Balancing</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${matchEvents.autoBalancing === 'docked' ? 'bg-blue-200' : ''}`}
                            onClick={() => matchDispatch({ type: 'SET_AUTO_BALANCING', autoBalance: 'docked' })}
                        >Docked</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${matchEvents.autoBalancing === 'engaged' ? 'bg-blue-200' : ''}`}
                            onClick={() => matchDispatch({ type: 'SET_AUTO_BALANCING', autoBalance: 'engaged' })}
                        >Engaged</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${matchEvents.autoBalancing === 'failed' ? 'bg-blue-200' : ''}`}
                            onClick={() => matchDispatch({ type: 'SET_AUTO_BALANCING', autoBalance: 'failed' })}
                        >Failed</div>
                        
                      </div>
                      <div className="flex flex-col gap-2 w-1/5 ">
                        <div className="text-2xl font-semibold mb-4 text-center">Fouls</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${matchEvents.fouls.includes('crossed auto line') ? 'bg-blue-200' : ''}`}
                            onClick={() => matchDispatch({ type: 'FOUL_TOGGLE', newFoul: 'crossed auto line' })}
                        >Crossed Auto Line</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${matchEvents.fouls.includes('too many pieces')  ? 'bg-blue-200' : ''}`}
                            onClick={() => matchDispatch({ type: 'FOUL_TOGGLE', newFoul: 'too many pieces' })}
                        >Too Many Pieces</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${matchEvents.fouls.includes('other') ? 'bg-blue-200' : ''}`}
                            onClick={() => matchDispatch({ type: 'FOUL_TOGGLE', newFoul: 'other' })}
                        >Other</div>
                      </div>
              </div>
              <div className="p-2 border border-cpr-blue" onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'tele'})}>Start Tele</div>
            </div>
          </div>
        )
}


