export interface MatchEventsState {
  startingLoc?: number;
  mobility: Mobility;
  scoredObjects: ScoredObject[];
  autoBalancing: AutoBalance;
  endgameBalancing: Endgame;
  fouls: string[];
  defense: string[];
  feedback?: string;
  scouter?: string;
  robotId?: number;
  station?: number;
  alliance?: string;
  matchId?: number;
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
  endBalanceTime: number | undefined;
  endingLoc: number | undefined;
  numberOfRobots: number | undefined;
  order: number | undefined;
  result: "balance" | "dock" | "fail" | undefined;
};

export type MatchAction =
  | { type: "SET_STARTING_LOC"; location: number }
  | { type: "SET_MOBILITY"; mobility: Mobility }
  | { type: "SET_AUTO_BALANCING"; autoBalance: AutoBalance }
  | { type: "SET_ENDGAME_BALANCING"; endgame: Endgame }
  | { type: "FOUL_TOGGLE"; newFoul: string }
  | {
      type: "ADD_SCORE_DETAILS";
      newScore: ScoredObject;
    }
  | {
      type: "SET_CYCLE_TIME";
      payload: { newObjectIndex: number; cycleTime: number };
    }
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

export const initialMatchState: MatchEventsState = {
  startingLoc: undefined,
  mobility: undefined,
  scoredObjects: [
    {
      cycleTime: undefined,
      pickupLoc: undefined,
      pickupOrient: undefined,
      delayed: undefined,
      type: undefined,
      scoredLoc: undefined,
    },
  ],
  autoBalancing: undefined,
  endgameBalancing: {
    endBalanceTime: undefined,
    endingLoc: undefined,
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

      endGame.endingLoc =
        action.endgame.endingLoc !== undefined
          ? action.endgame.endingLoc
          : endGame.endingLoc;
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

      // Only allow unique scores
      const currentScoredLocs = state.scoredObjects.map(
        (score) => score.scoredLoc
      );
      const hasDuplicates =
        currentScoredLocs.length !== new Set(currentScoredLocs).size;
      if (hasDuplicates) {
        return {
          ...state,
          scoredObjects: state.scoredObjects
            .slice(0, currentLength - 1)
            .concat({
              cycleTime: undefined,
              pickupLoc: undefined,
              pickupOrient: undefined,
              delayed: undefined,
              type: undefined,
              scoredLoc: undefined,
            }),
        };
      }

      const newestScore = state.scoredObjects[currentLength - 1] || {
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
          const updatedScoredObjects = state.scoredObjects.map(
            (scoredObj, index) => {
              if (index === currentLength - 1) {
                return newestScore;
              }
              return scoredObj;
            }
          );

          return {
            ...state,
            scoredObjects: updatedScoredObjects,
          };
        }
      } else if (newestScore.scoredLoc !== undefined) {
        if (currentLength === 1) {
          return {
            ...state,
            scoredObjects: [
              newestScore,
              {
                cycleTime: undefined,
                pickupLoc: undefined,
                pickupOrient: undefined,
                delayed: undefined,
                type: undefined,
                scoredLoc: undefined,
              },
            ],
          };
        } else {
          const updatedScoredObjects = state.scoredObjects.map(
            (scoredObj, index) => {
              if (index === currentLength - 1) {
                return newestScore;
              }
              return scoredObj;
            }
          );

          return {
            ...state,
            scoredObjects: [
              ...updatedScoredObjects,
              {
                cycleTime: undefined,
                pickupLoc: undefined,
                pickupOrient: undefined,
                delayed: undefined,
                type: undefined,
                scoredLoc: undefined,
              },
            ],
          };
        }
      }

    case "EDIT_SCORE":
      //some code

      return {
        ...state,
      };
    case "SET_CYCLE_TIME":
      const { newObjectIndex, cycleTime } = action.payload;
      const scoredObjects = state.scoredObjects.slice(); // create a shallow copy of the scored objects array
      scoredObjects[newObjectIndex] = {
        // update the object at the given index
        ...scoredObjects[newObjectIndex], // keep the existing properties of the object
        cycleTime: cycleTime, // update the cycleTime property
      };

      return {
        ...state,
        scoredObjects: scoredObjects, // return the new array of scored objects
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
          endBalanceTime: undefined,
          endingLoc: undefined,
          numberOfRobots: undefined,
          order: undefined,
          result: undefined,
        },
        scoredObjects: [
          {
            cycleTime: undefined,
            pickupLoc: undefined,
            pickupOrient: undefined,
            delayed: undefined,
            type: undefined,
            scoredLoc: undefined,
          },
        ],
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
        matchId: action.robotInfo.matchId || undefined,
      };

    default:
      return state;
  }
};

function doubleCheck(scoredLoc: number, currentScores: number[]) {
  const doubles = [
    [18, 19],
    [20, 21],
    [22, 23],
    [24, 25],
    [26, 27],
    [28, 29],
    [30, 31],
    [32, 33],
    [34, 35],
  ];

  if (doubles.some((pair) => pair.includes(scoredLoc))) {
    const otherInPair = doubles
      .find((pair) => pair.includes(scoredLoc))!
      .find((num) => num !== scoredLoc)!;
    if (currentScores.includes(otherInPair)) {
      return false;
    }
    return true;
  }
  return true;

  return scoredLoc;
}
