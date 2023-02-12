import type { ScoringGrid, MatchState } from "@/pages/matchScout"
import type {Dispatch,SetStateAction} from 'react'

import { Nav } from "@/pages/matchScout"
import type {Action, AutoEventsState } from "@/utils/matchScout/auto"
interface AutoProps {
    autoTime: number,
    grid: string[][],
    scoredGrid: ScoringGrid[],
    cellToggle: boolean,
    setCellToggle: Dispatch<boolean>,
    setSelectedCell: Dispatch<number>,
    adjustment: number,
    setAdjustment: Dispatch<number>
    setMatchState: Dispatch<SetStateAction<MatchState>>,
    autoEvents: AutoEventsState,
    dispatch: Dispatch<Action>,
}

export default function AutoScout(props: AutoProps) {
const {
    autoTime, 
    grid, 
    scoredGrid,
    cellToggle,
    setCellToggle,
    setSelectedCell,
    adjustment,
    setAdjustment,
    setMatchState,
    autoEvents,
    dispatch,
    } = props

   

    


return (
          <div className="h-screen relative w-full">
            
            <div className="absolute top-4 left-4">{Nav(setMatchState, 'before', 'Back')}</div>
            <div className=" h-full flex flex-col p-4 items-center ">
              <div className="flex justify-around items-center w-full mb-5">

                <div className="text-4xl ">Auto: 3663</div>
                <div className="flex">
                {autoTime > 0 && (<div className="border px-2 py-1 cursor-pointer" onClick={() => setAdjustment( adjustment - 1000)}>-</div>)}
                <div className="text-4xl mx-2">{
                  
                autoTime > 0 ? autoTime : 
                autoTime > -3 ? 'Switching' :
                autoTime <= -3 && autoTime >= -4 ? (setMatchState('tele'), 0) :
                "Complete"
                
                }</div>
                {autoTime > 0 && (<div className="border px-2 py-1 cursor-pointer" onClick={() => setAdjustment( adjustment + 1000)}>+</div>)}
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
              
              <div className="h-full w-full justify-around flex mt-4">
                      <div className="flex flex-col gap-2 w-1/5">
                        <div className="text-2xl font-semibold mb-4 text-center">Mobility</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.mobility === 'yes' ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'SET_MOBILITY', payload: 'yes' })}
                        >Yes</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.mobility === 'no' ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'SET_MOBILITY', payload: 'no' })}
                        >No</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.mobility === 'no but moved' ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'SET_MOBILITY', payload: 'no but moved' })}
                        >No but Moved</div>
                        
                      </div>
                      <div className="flex flex-col gap-2 w-1/5 ">
                        <div className="text-2xl font-semibold mb-4 text-center">Balancing</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.balancing === 'n/a' ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'SET_BALANCING', payload: 'n/a' })}
                        >N/A</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.balancing === 'docked' ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'SET_BALANCING', payload: 'docked' })}
                        >Docked</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.balancing === 'engaged' ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'SET_BALANCING', payload: 'engaged' })}
                        >Engaged</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.balancing === 'failed' ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'SET_BALANCING', payload: 'failed' })}
                        >Failed</div>
                        
                      </div>
                      <div className="flex flex-col gap-2 w-1/5 ">
                        <div className="text-2xl font-semibold mb-4 text-center">Fouls</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.fouls.includes('crossed auto line') ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'FOUL_TOGGLE', payload: 'crossed auto line' })}
                        >Crossed Auto Line</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.fouls.includes('too many pieces')  ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'FOUL_TOGGLE', payload: 'too many pieces' })}
                        >Too Many Pieces</div>
                        <div className={`px-5 py-3 border text-center cursor-pointer ${autoEvents.fouls.includes('other') ? 'bg-blue-200' : ''}`}
                            onClick={() => dispatch({ type: 'FOUL_TOGGLE', payload: 'other' })}
                        >Other</div>
                      </div>
              </div>
              {Nav(setMatchState, 'tele', 'Start Tele')}
            </div>
          </div>
        )
}


