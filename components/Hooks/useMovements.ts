import { useReducer } from 'react';
import { ACTION_TYPES } from '../../model/table/enums/ActionsTable';
import { ActionsTable, InitialState } from '../../model/table/interfaces/ActionsTable';

export const useMovementReducer = (games: string[]) => {
  const initialState: InitialState = { size: 20, loading: true, currentGame: games[0] };

  function reducer(state: InitialState, actions: ActionsTable): InitialState {
    switch (actions.type) {
      case ACTION_TYPES.SHOW_MORE:
        return {
          ...state,
          size: actions.payload,
        };
      case ACTION_TYPES.CURRENT_GAME:
        return {
          ...state,
          currentGame: actions.payload,
        };
      case ACTION_TYPES.LOADING:
        return {
          ...state,
          loading: actions.payload,
        };
      case ACTION_TYPES.SIZE:
        return {
          ...state,
          size: 20,
        };
      default:
        throw Error('Unknown action.');
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
