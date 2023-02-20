
import type {Dispatch } from 'react'
import type { TimeState, TimeAction } from "@/utils/matchScout/time"
import type {MatchAction, MatchEventsState } from "@/utils/matchScout/events"

import TeleButton from 'src-components/teleButton'
import EndgameButton from 'src-components/endgameButton'

interface ReviewProps {

    matchEvents: MatchEventsState,
    matchDispatch: Dispatch<MatchAction>,

    timeState: TimeState,
    timeDispatch: Dispatch<TimeAction>,
}

export const ReviewScout: React.FC<ReviewProps> = (props: ReviewProps) => {
  
const {
    matchEvents,
    matchDispatch,
    timeState,
    timeDispatch
    } = props

    const teleTime = (timeState.endTime - timeState.matchTime) / 1000;  
    


return (
<div className="flex justify-center w-full pt-[35px] "> 
  Todo   
</div>
  

        )
}


