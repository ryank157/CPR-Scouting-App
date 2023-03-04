export interface MatchEventsState {
  startingLoc: number | undefined;
  mobility: Mobility;
  scoredObjects: ScoredObject[];
  autoBalancing: AutoBalance;
  endgameBalancing: Endgame;
  fouls: Foul[];
  defense: string[];
  feedback: string | undefined;
  scouter: string | undefined;
  robotId: number | undefined;
  station: number | undefined;
  alliance: string | undefined;
  matchId: number | undefined;
}

export type Mobility = "yes" | "no" | "failed" | undefined;
export type ScoringTypes =
  | "auto-cone"
  | "auto-cube"
  | "tele-cone"
  | "tele-cube"
  | undefined;
export type PickupLocation = "feeder" | "middle" | "community" | undefined;
export type PickupOrientation = "side" | "upright" | "cube" | undefined;
export type Delayed = "defended" | "obstructed" | undefined;
export type AutoBalance = "docked" | "engaged" | "failed" | undefined;
export type Foul =
  | "crossed half line"
  | "too many pieces"
  | "other"
  | undefined;
export type ScoredObject = {
  cycleTime?: number | undefined;
  pickupLoc?: PickupLocation;
  pickupOrient?: PickupOrientation;
  delayed?: Delayed;
  type?: ScoringTypes;
  scoredLoc?: number;
};

export type Endgame = {
  numberOfRobots: 1 | 2 | 3 | undefined;
  order: 1 | 2 | 3 | undefined;
  result: "balance" | "dock" | "fail" | undefined;
};

export type MatchAction =
  | { type: "SET_STARTING_LOC"; location: number }
  | { type: "SET_MOBILITY"; mobility: Mobility }
  | { type: "SET_AUTO_BALANCING"; autoBalance: AutoBalance }
  | { type: "SET_ENDGAME_BALANCING"; endgame: Endgame }
  | { type: "FOUL_TOGGLE"; newFoul: Foul }
  | { type: "ADD_SCORE_DETAILS"; newScore: ScoredObject }
  | { type: "EDIT_SCORE" }
  | { type: "SET_FEEDBACK"; message: string }
  | { type: "RESET_MATCH" }
  | { type: "SET_SCOUTER"; scouterId: string }
  | {
      type: "SET_ROBOT";
      robotInfo: {
        robotId: number;
        alliance: string;
        station: number;
        matchId: number;
      };
    };

const blankScore = {
  cycleTime: undefined,
  pickupLoc: undefined,
  pickupOrient: undefined,
  delayed: undefined,
  type: undefined,
  scoredLoc: undefined,
};

export const initialMatchState: MatchEventsState = {
  startingLoc: undefined,
  mobility: undefined,
  scoredObjects: [blankScore],
  autoBalancing: undefined,
  endgameBalancing: {
    numberOfRobots: undefined,
    order: undefined,
    result: undefined,
  },
  fouls: [],
  defense: [],
  feedback: undefined,
  scouter: undefined,
  robotId: undefined,
  station: undefined,
  alliance: undefined,
  matchId: undefined,
};

export const MatchEventsReducer = (
  state: MatchEventsState,
  action: MatchAction
): MatchEventsState => {
  switch (action.type) {
    case "SET_STARTING_LOC":
      return {
        ...state,
        startingLoc: action.location,
      };
    case "SET_MOBILITY":
      return {
        ...state,
        mobility: action.mobility,
      };
    case "SET_AUTO_BALANCING":
      if (action.autoBalance === state.autoBalancing) {
        return {
          ...state,
          autoBalancing: undefined,
        };
      }
      return {
        ...state,
        autoBalancing: action.autoBalance,
      };
    case "SET_ENDGAME_BALANCING":
      const endGame = state.endgameBalancing;
      endGame.numberOfRobots =
        action.endgame.numberOfRobots !== undefined
          ? action.endgame.numberOfRobots
          : endGame.numberOfRobots;
      endGame.order =
        action.endgame.order !== undefined
          ? action.endgame.order
          : endGame.order;
      endGame.result =
        action.endgame.result !== undefined
          ? action.endgame.result
          : endGame?.result;
      console.log(endGame);

      return {
        ...state,
        endgameBalancing: { ...endGame },
      };
    case "FOUL_TOGGLE":
      const index = state.fouls.indexOf(action.newFoul);
      if (index !== -1) {
        return {
          ...state,
          fouls: [
            ...state.fouls.slice(0, index),
            ...state.fouls.slice(index + 1),
          ],
        };
      } else {
        return {
          ...state,
          fouls: [...state.fouls, action.newFoul],
        };
      }
    case "ADD_SCORE_DETAILS":
      //TODO Need to rework the grid display so that it colors data based on matchEvents scoring array
      //Add Check for only unique scores. Or no double scores on bottom level

      const currentLength = state.scoredObjects.length;

      const newestScore = state.scoredObjects[currentLength] || {
        cycleTime: undefined,
        pickupLoc: undefined,
        pickupOrient: undefined,
        delayed: undefined,
        type: undefined,
        scoredLoc: undefined,
      };

      newestScore.cycleTime =
        action.newScore.cycleTime !== undefined
          ? action.newScore.cycleTime
          : newestScore?.cycleTime;
      newestScore.pickupLoc =
        action.newScore.pickupLoc !== undefined
          ? action.newScore.pickupLoc
          : newestScore?.pickupLoc;
      newestScore.pickupOrient =
        action.newScore.pickupOrient !== undefined
          ? action.newScore.pickupOrient
          : newestScore?.pickupOrient;
      newestScore.delayed =
        action.newScore.delayed !== undefined
          ? action.newScore.delayed
          : newestScore?.delayed;
      newestScore.type =
        action.newScore.type !== undefined
          ? action.newScore.type
          : newestScore?.type;
      newestScore.scoredLoc =
        action.newScore.scoredLoc !== undefined
          ? action.newScore.scoredLoc
          : newestScore?.scoredLoc;

      //Update Data
      if (newestScore.scoredLoc === undefined) {
        if (currentLength === 1) {
          return {
            ...state,
            scoredObjects: [newestScore],
          };
        } else {
          state.scoredObjects[currentLength - 1] = newestScore;
          return {
            ...state,
            scoredObjects: [...state.scoredObjects],
          };
        }
        //Log score
      } else if (newestScore.scoredLoc !== undefined) {
        if (currentLength === 1) {
          return {
            ...state,
            scoredObjects: [newestScore, blankScore],
          };
        } else {
          state.scoredObjects[currentLength - 1] = newestScore;
          return {
            ...state,
            scoredObjects: [...state.scoredObjects, blankScore],
          };
        }
      }

    case "EDIT_SCORE":
      //some code
      console.log("edit score");
      return {
        ...state,
      };

    case "SET_FEEDBACK":
      return {
        ...state,
        feedback: action.message,
      };

    case "RESET_MATCH":
      return {
        ...initialMatchState,
        endgameBalancing: {
          numberOfRobots: undefined,
          order: undefined,
          result: undefined,
        },
        scoredObjects: [blankScore],
      };
    case "SET_SCOUTER":
      return {
        ...state,
        scouter: action.scouterId,
      };
    case "SET_ROBOT":
      return {
        ...state,
        robotId: action.robotInfo.robotId,
        station: action.robotInfo.station,
        alliance: action.robotInfo.alliance,
        matchId: action.robotInfo.matchId,
      };

    default:
      return state;
  }
};
