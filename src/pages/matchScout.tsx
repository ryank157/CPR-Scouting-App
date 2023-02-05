import { type NextPage } from "next";
import { useState} from "react";
import  type {Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Button from "src-components/button";


const MatchScout: NextPage = () => {
  

  const [matchState, setMatchState] = useState<MatchState>('before')
    
  switch (matchState) {
    case 'before':
    return (
      
        <div className="border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
          <Link className='self-start'href="/home">
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
            <div className="border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
              <div className="self-start">{Nav(setMatchState, 'before', 'Back')}</div>
              <div>Picture with CSS grid for scoring</div>
              <div>Mobility Boolean</div>
              <div>Charge Station Scoring</div>
              {Nav(setMatchState, 'tele', 'Start Tele')}
            </div>
        )
    
    case 'tele':
     return (
        <>
        

        <div className="border border-cpr-blue h-screen flex flex-col p-4 items-center justify-between">
              <div className="self-start">{Nav(setMatchState, 'auto', 'Back')}</div>
              <div>Picture with CSS grid for scoring</div>
              <div>
                <div> Cycle Scoring </div>
                <div>Timer</div>
                <div>Where did they pickup?</div>
                <div>Were they defended/obstructed</div>
                <div>Submit</div>
              </div>
              <div>Defense</div>
              <div>Something Break?</div>
              <div>Did they die?</div>
              {Nav(setMatchState, 'endgame', 'Start Endgame')}
            </div>
        </>
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
