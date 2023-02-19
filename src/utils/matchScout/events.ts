export interface MatchEventsState {
    startingLoc: number | undefined,
    mobility: Mobility;
    scoredObjects: ScoredObject[];
    autoBalancing: AutoBalance;
    endgameBalancing: string | undefined,
    fouls: Foul[];
    defense: string[];
  }

export type Mobility = 'yes' | 'no' | 'failed' | undefined
export type ScoringTypes = "auto-cone" | "auto-cube" | "tele-cone" | "tele-cube" | undefined
export type PickupLocation = 'feeder' | 'middle' | 'community' | undefined
export type PickupOrientation = 'side' | 'upright' | 'cube' | undefined
export type Delayed = 'defended' | 'obstructed' | undefined
export type AutoBalance = 'docked' | 'engaged' | 'failed' | undefined
export type Foul = 'crossed half line' | 'too many pieces' | 'other' | undefined
export type ScoredObject = {
  cycleTime?: number | undefined,
  pickupLoc?: PickupLocation,
  pickupOrient?: PickupOrientation,
  delayed?: Delayed,
  type?: ScoringTypes,
  scoredLoc?: number,
}



export type MatchAction =
    | {type: 'SET_STARTING_LOC'; location: number}
    | {type: 'SET_MOBILITY'; mobility: Mobility}
    | {type: 'SET_AUTO_BALANCING'; autoBalance: AutoBalance}
    | {type: 'SET_ENDGAME_BALANCING';}
    | {type: 'FOUL_TOGGLE'; newFoul: Foul;}
    | {type: 'ADD_SCORE_DETAILS'; newScore: ScoredObject;}
    | {type: 'EDIT_SCORE';}


export const initialMatchState: MatchEventsState = {
    startingLoc: undefined,
    mobility: undefined,
    scoredObjects: [],
    autoBalancing: undefined,
    endgameBalancing: undefined,
    fouls: [],
    defense: [],
  };

export const MatchEventsReducer = (state: MatchEventsState, action: MatchAction): MatchEventsState => {
    switch (action.type) {
      case 'SET_STARTING_LOC': 
        return {
          ...state,
          startingLoc: action.location
        }
      case 'SET_MOBILITY':
        return {
          ...state,
          mobility: action.mobility ,
        };
      case 'SET_AUTO_BALANCING':
        if(action.autoBalance === state.autoBalancing) {
          return {
            ...state,
            autoBalancing: undefined,
          }
        }
        return {
          ...state,
          autoBalancing: action.autoBalance,
        };
      case 'SET_ENDGAME_BALANCING':
        //SOME CODE
        return {
          ...state
        }
      case 'FOUL_TOGGLE':
        const index = state.fouls.indexOf(action.newFoul);
        if (index !== -1) {
          return {
            ...state,
            fouls: [...state.fouls.slice(0, index), ...state.fouls.slice(index + 1)],
          };
        } else {
          return {
            ...state,
            fouls: [...state.fouls, action.newFoul],
          };
        }
      case 'ADD_SCORE_DETAILS':
        //TODO Need to rework the grid display so that it colors data based on matchEvents scoring array
        //Add Check for only unique scores. Or no double scores on bottom level
        const newestScore = state.scoredObjects[state.scoredObjects.length] || {
          cycleTime: undefined,
          pickupLoc: undefined,
          pickupOrient: undefined,
          delayed: undefined,
          type: undefined,
          scoredLoc: undefined,
        }
        
        newestScore.cycleTime = action.newScore.cycleTime !== undefined ? action.newScore.cycleTime : newestScore?.cycleTime;
        newestScore.pickupLoc = action.newScore.pickupLoc !== undefined ? action.newScore.pickupLoc : newestScore?.pickupLoc;
        newestScore.pickupOrient = action.newScore.pickupOrient !== undefined ? action.newScore.pickupOrient : newestScore?.pickupOrient;
        newestScore.delayed = action.newScore.delayed !== undefined ? action.newScore.delayed : newestScore?.delayed;
        newestScore.type = action.newScore.type !== undefined ? action.newScore.type : newestScore?.type;
        newestScore.scoredLoc = action.newScore.scoredLoc !== undefined ? action.newScore.scoredLoc : newestScore?.scoredLoc;

        
        if(state.scoredObjects.length === 0){
          return {
            ...state,
            scoredObjects: [newestScore]
          }
        } else{
          return {
            ...state,
            scoredObjects: [...state.scoredObjects, newestScore]
          }
        }


      case 'EDIT_SCORE':
        //some code
        return {
          ...state
        }
        
      default:
        return state;
    }

  };

