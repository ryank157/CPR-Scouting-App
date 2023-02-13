import type { ScoringGrid } from "@/pages/matchScout"
import type {Dispatch } from 'react'
import type { TimeState, TimeAction } from "@/utils/matchScout/time"
import type {MatchAction, MatchEventsState } from "@/utils/matchScout/events"

interface TeleProps {
    grid: string[][],
    scoredGrid: ScoringGrid[],
    cellToggle: boolean,
    setCellToggle: Dispatch<boolean>,
    setSelectedCell: Dispatch<number>,
    
    matchEvents: MatchEventsState,
    matchDispatch: Dispatch<MatchAction>,
    cycleToggle: boolean,
    setCycleToggle: Dispatch<boolean>,
    timeState: TimeState,
    timeDispatch: Dispatch<TimeAction>,
}

export const TeleScout: React.FC<TeleProps> = (props: TeleProps) => {
  
const {
    
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
    timeDispatch
    } = props

  
    const teleTime = (timeState.endTime - timeState.matchTime) / 1000;  
    


return (
    <div className="h-screen relative w-full">
    <div className="absolute top-4 left-4 p-2 border border-cpr-blue" onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'auto'})}>Back</div>
    <div className=" h-full flex flex-col p-4 items-center ">
      <div className="flex justify-around items-center w-full mb-5">
        <div className="text-4xl">Tele: 3663</div>
        <div className="flex">
        <div className="border px-2 py-1 cursor-pointer" onClick={() => timeDispatch({ type: 'ADJUST_TIME', increase: 1000 })}>-</div>
        <div className="text-4xl mx-2">{
        teleTime > 120 ? 'In Auto' :
        teleTime > 0 ? teleTime : "Complete"                
        }</div>
        <div className="border px-2 py-1 cursor-pointer" onClick={() => timeDispatch({ type: 'ADJUST_TIME', increase: -1000 })}>+</div>
        </div>
      </div>
      
                  
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
                    cycleTime: 123-teleTime,
                    type: 'tele-cone',
                    scoredLoc: i*9 + j,
                  }})
                }} 

                />
            ))
          )}
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
              <div className="grid grid-cols-4 justify-center items-center border py-2">
                <div className="px-2 col-span-1 flex flex-col items-center w-full">
                  <div>Time of Current Cycle</div>
                  <div>Minus or Plus to adjust</div>
                </div>
                <div className="px-2 col-span-1 flex flex-col  items-center border-r border-l w-full">
                  <div>Pickup Location</div>
                  <div>Feeder, Middle, Community</div>
                </div>
                <div className="px-2 col-span-1 flex flex-col  items-center border-r border-l w-full">
                  <div>Pickup Orientation</div>
                  <div>(Cones Only)</div>
                </div>
                <div className="flex col-span-1 px-2 w-full justify-center">Obstructed/Defended</div>
              </div>
              <div className="text-center p-2 m-2">Submit is on grid click</div>
            
              <div className="grid grid-cols-4 justify-center items-center border py-2">
                <div className="col-span-1 px-2 flex items-center justify-center w-full gap-x-2">
                    <div>-</div>
                  <div>{123 - teleTime}</div>
                  <div>+</div>
                </div>
                <div className="col-span-1 px-2 flex justify-center gap-x-4  items-center border-r border-l w-full">
                  <div className="w-8 border text-center" onClick={() => matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {pickupLoc: 'feeder'}})}>F</div>
                  <div className="w-8 border text-center" onClick={() => matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {pickupLoc: 'middle'}})}>M</div>
                  <div className="w-8 border text-center" onClick={() => matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {pickupLoc: 'community'}})}>C</div>
                </div>
                <div className="col-span-1 flex justify-center gap-x-4">
                  <div className="py-2 w-8 border text-center" onClick={() => matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {pickupOrient: 'upright'}})}>U</div>
                  <div className="py-2 w-8 border text-center" onClick={() => matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {pickupOrient: 'side'}})}>S</div>
                </div>
                <div className="col-span-1 flex justify-center gap-x-4">
                  <div className="py-2 w-8 border text-center" onClick={() => matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {delayed: 'obstructed'}})}>O</div>
                  <div className="py-2 w-8 border text-center" onClick={() => matchDispatch({type: 'ADD_SCORE_DETAILS', newScore: {delayed: 'defended'}})}>D</div>
                </div>
              </div>
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

      <div className="p-2 border border-cpr-blue" onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'endgame'})}>Start EndGame</div>
      </div>
    </div>
        )
}


