
import type {Dispatch} from 'react'

import type { TimeAction, TimeState } from "@/utils/matchScout/time"

import ScoringGrid from "./scoringGrid"
import type { MatchEventsState, MatchAction } from "@/utils/matchScout/events"
import AutoButton from 'src-components/autoButton'
interface AutoProps {

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
    matchEvents,
    matchDispatch,
    timeState,
    timeDispatch
    } = props
return (
        
  <div className="flex flex-col justify-center w-full">                           
    <ScoringGrid timeState={timeState} timeDispatch={timeDispatch} matchEvents={matchEvents} matchDispatch={matchDispatch}/>
        
    <div className="h-full w-full justify-center gap-[22px] flex mt-4 pb-10">
      <div className="flex flex-col gap-2.5 w-[310px] ">
        <div className="text-xl font-semibold text-center -mb-1.25">Mobility</div>
        <AutoButton icon={['bg-auto-mob-score', 'bg-auto-mob-score-s']} variant={matchEvents.mobility === 'yes'} onClick={() => matchDispatch({ type: 'SET_MOBILITY', mobility: 'yes' })}>Scored</AutoButton>
        <AutoButton icon={['bg-auto-mob-no', 'bg-auto-mob-no-s']} variant={matchEvents.mobility === 'no'} onClick={() => matchDispatch({ type: 'SET_MOBILITY', mobility: 'no' })}>No</AutoButton>
        <AutoButton icon={['bg-auto-mob-failed', 'bg-auto-mob-failed-s']} variant={matchEvents.mobility === 'failed'} onClick={() => matchDispatch({ type: 'SET_MOBILITY', mobility: 'failed' })}>Failed</AutoButton>      
      </div>
      <div className="flex flex-col gap-2.5 w-[310px] ">
        <div className="text-xl font-semibold text-center -mb-1.25">Balancing</div>
        <AutoButton icon={['bg-auto-engaged', 'bg-auto-engaged-s']} variant={matchEvents.autoBalancing === 'engaged'} onClick={() => matchDispatch({ type: 'SET_AUTO_BALANCING', autoBalance: 'engaged' })}>Engaged</AutoButton>
        <AutoButton icon={['bg-auto-docked', 'bg-auto-docked-s']} variant={matchEvents.autoBalancing === 'docked'} onClick={() => matchDispatch({ type: 'SET_AUTO_BALANCING', autoBalance: 'docked' })}>Docked</AutoButton>
        <AutoButton icon={['bg-auto-bal-na', 'bg-auto-bal-na-s']} variant={matchEvents.autoBalancing === 'failed'} onClick={() => matchDispatch({ type: 'SET_AUTO_BALANCING', autoBalance: 'failed' })}>Failed</AutoButton>
      </div>

      <div className="flex flex-col gap-2.5 w-[310px] ">
        <div className="text-xl font-semibold text-center -mb-1.25">Fouls</div>
        <AutoButton icon={['bg-auto-foul-cross', 'bg-auto-foul-cross-s']} variant={matchEvents.fouls.includes('crossed half line')} onClick={() => matchDispatch({ type: 'FOUL_TOGGLE', newFoul: 'crossed half line' })}>Cross Half Line</AutoButton>
        <AutoButton icon={['bg-auto-foul-pieces', 'bg-auto-foul-pieces-s']} variant={matchEvents.fouls.includes('too many pieces')} onClick={() => matchDispatch({ type: 'FOUL_TOGGLE', newFoul: 'too many pieces' })}>2+ Game Pieces</AutoButton>
        <AutoButton icon={['bg-auto-foul-other', 'bg-auto-foul-other-s']} variant={matchEvents.fouls.includes('other')} onClick={() => matchDispatch({ type: 'FOUL_TOGGLE', newFoul: 'other' })}>Other</AutoButton>
      </div>
    </div>
    
  </div>

        )
}




