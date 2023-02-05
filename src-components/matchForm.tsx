import { useState, Dispatch, SetStateAction } from "react";


export default function MatchForm() {
    const [matchState, setMatchState] = useState<MatchState>('before')
    
    
    switch (matchState) {
        case 'before':
        return (
            <>
            <div>Before</div>
            {Nav(setMatchState, 'auto', 'Start Match')}
            
            </>
        )
        case 'auto':
            return (
                <>
                {Nav(setMatchState, 'before', 'Back')}
                <div>auto</div>
                {Nav(setMatchState, 'tele', 'Start Tele')}
                </>
            )
        
        case 'tele':
         return (
            <>
            {Nav(setMatchState, 'auto', 'Back')}
            <div>tele</div>
            {Nav(setMatchState, 'endgame', 'Start Endgame')}
            </>
         )
        
        case 'endgame':
         return (
            <>
            {Nav(setMatchState, 'tele', 'Back')}
            <div>endgame</div>
            {Nav(setMatchState, 'review', 'Review')}
            </>
         )
         case 'review':
            return (
               <>
               {Nav(setMatchState, 'endgame', 'Back')}
               <div>Your team was x, Scored y points</div>
               <button onClick={(e) => {e.preventDefault(); }}>Submit</button>
               </>
            )
        

    }
}

function Nav(setMatchState: Dispatch<SetStateAction<MatchState>>, path: MatchState, text: string) {
    return(
        <button onClick={(e) => {e.preventDefault(); setMatchState(path)}}>{text}</button>
    )
}

type MatchState = 'before' | 'auto' | 'tele' | 'endgame' | 'review'