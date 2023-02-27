
export type TimeState = {
  activeMatch: boolean;
  startTime: number;
  matchTime: number;
  endTime: number;
  adjustment: number;
  matchPage: MatchPage;
  cycleStart: number;
};

export type MatchPage = 'before' | 'auto' | 'tele' | 'endgame' | 'review'

export type TimeAction =
  | { type: 'START_MATCH' }
  | { type: 'ADJUST_TIME'; increase: number }
  | { type: 'CHANGE_PAGE'; page: MatchPage} 
  | { type: 'END_MATCH' }
  | { type: 'SET_CYCLE_START'; timeStamp: number }
  | { type: 'ADJUST_CYCLE_TIME'; timeStamp: number, adjustment: number}

export const initialTimeState: TimeState = {
  activeMatch: false,
  startTime: new Date().getTime(),
  matchTime: new Date().getTime(),
  endTime: new Date().getTime() + 138000,
  adjustment: 0,
  matchPage: 'before',
  cycleStart: 120,
};

export const TimeReducer = (state: TimeState, action: TimeAction) => {
  switch (action.type) {
    case 'START_MATCH':
      return {
        ...state,
        activeMatch: true,
        matchTime: state.startTime,
        endTime: state.startTime + 138000,
        adjustment: 0,
        matchPage: 'auto' as MatchPage
      };
    case 'ADJUST_TIME':
        let matchPage = undefined
      if(state.matchTime - state.startTime=== 17000) {
        matchPage = 'tele' as MatchPage
      }
      return {
        ...state,
        matchTime: state.matchTime + action.increase,
        matchPage: matchPage ? matchPage : state.matchPage
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        matchPage: action.page,
      }
    case 'END_MATCH':
      return {
        ...state,
        activeMatch: false,
        matchPage: 'before' as MatchPage, 
      };
    case 'SET_CYCLE_START':
      return {
        ...state,
        cycleStart: action.timeStamp,
      }
    case 'ADJUST_CYCLE_TIME':
      let newCycleTime = action.timeStamp + action.adjustment
      if(action.timeStamp + action.adjustment > 120) {
        newCycleTime = 120
      } else if (action.timeStamp + action.adjustment < 0){
        newCycleTime = 0
      } 

      return {
        ...state,
        cycleStart: newCycleTime,
      }
    default:
      return state;
  }
};