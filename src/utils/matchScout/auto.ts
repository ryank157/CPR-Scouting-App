import { useReducer } from "react";
import type { Dispatch } from "react";

export interface AutoEventsState {
    mobility: string;
    balancing: string;
    fouls: string[];
  }
  
export interface Action {
    type: string;
    payload: string;
  }



export const autoEventsReducer = (state: AutoEventsState, action: Action): AutoEventsState => {
    switch (action.type) {
      case 'SET_MOBILITY':
        return {
          ...state,
          mobility: action.payload as string,
        };
      case 'SET_BALANCING':
        return {
          ...state,
          balancing: action.payload as string,
        };
      case 'FOUL_TOGGLE':
        const index = state.fouls.indexOf(action.payload as string);
        if (index !== -1) {
          return {
            ...state,
            fouls: [...state.fouls.slice(0, index), ...state.fouls.slice(index + 1)],
          };
        } else {
          return {
            ...state,
            fouls: [...state.fouls, action.payload as string],
          };
        }

      default:
        return state;
    }
  };

