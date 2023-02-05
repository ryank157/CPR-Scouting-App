import { type NextPage } from "next";
import { useState} from "react";
import  type {Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Button from "src-components/button";
import Image from "next/image";


const MatchScout: NextPage = () => {
  
  const [cycleToggle, setCycleToggle] = useState(false)
  const [matchState, setMatchState] = useState<MatchState>('before')
  const grid = Array(3)
  .fill(null)
  .map(() => Array(9).fill(null));

  
    
  switch (matchState) {
    case 'before':
    return (
      
        <div className="border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
          <Link className='self-start'href="/">
              <Button text="Home" className="mt-10"/>                
              </Link>
        <div className="">Before the Match Starts</div> 
        <div>Robot Position - Robot team Number</div>
        <div>Starting Location or no show</div>
        {Nav(setMatchState, 'auto', 'Start Match')}
        
        </div>
        
    )
    case 'auto':
        return (
          <div className="h-screen relative w-full">
            <div className="absolute top-4 left-4">{Nav(setMatchState, 'before', 'Back')}</div>
            <div className=" h-full flex flex-col p-4 items-center ">
              <div className="text-4xl mb-5">Scouting Team: 3663</div>
              <div>               
                <div className="grid grid-rows-3  grid-cols-9 bg-scoring-grid bg-cover bg-center bg-no-repeat w-[900px] h-[300px] p-1">
                  {grid.map((row, i) =>
                    row.map((_, j) => (
                      <div key={i * 9 + j} className='border-2 border-red-500 ' />
                    ))
                  )}
                </div>
              </div>
              <div>Charge Station Scoring</div>
              {Nav(setMatchState, 'tele', 'Start Tele')}
            </div>
          </div>
        )
    
    case 'tele':
     return (
        
        

        <div className="h-screen relative w-full">
            <div className="absolute top-4 left-4">{Nav(setMatchState, 'auto', 'Back')}</div>
            <div className=" h-full flex flex-col p-4 items-center ">
              <div className="text-4xl mb-5">Scouting Team: 3663</div>
              <div>               
                <div className="grid grid-rows-3  grid-cols-9 bg-scoring-grid bg-cover bg-center bg-no-repeat w-[900px] h-[300px] p-1">
                  {grid.map((row, i) =>
                    row.map((_, j) => (
                      <div key={i * 9 + j} className='border-2 border-red-500 ' />
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
    

}
  


};


function Nav(setMatchState: Dispatch<SetStateAction<MatchState>>, path: MatchState, text: string) {
  return(
      <button className="p-2 border border-cpr-blue"onClick={(e) => {e.preventDefault(); setMatchState(path)}}>{text}</button>
  )
}

type MatchState = 'before' | 'auto' | 'tele' | 'endgame' | 'review'

export default MatchScout;
