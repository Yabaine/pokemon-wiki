import { ACTION_TYPES } from '../enums/ActionsTable';

export type ActionsTable =
  | { type: ACTION_TYPES.SHOW_MORE; payload: number }
  | { type: ACTION_TYPES.CURRENT_GAME; payload: string }
  | { type: ACTION_TYPES.LOADING; payload: boolean }
  | { type: ACTION_TYPES.SIZE };

export interface InitialState {
  size?: number;
  loading?: boolean;
  currentGame?: string;
}
