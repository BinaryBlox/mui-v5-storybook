// Generated with util/create-slice.js
import React from 'react';

import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityState,
  EntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../../store';

export interface StartUp {
  status: string | undefined; 
}

// interface GlobalApp {
//     isLoaded?: boolean;
//     backDropProps: DynamicBackdropProps | null;
//   }

//   interface GlobalAppState extends GlobalApp {
//   }

//   const initialState: GlobalAppState = {
//     isLoaded: false,
//     backDropProps: { title: '', visible: false },
//   };

export interface StartUpState extends StartUp {
  allItemsLoaded: boolean | null;
  isLoading: boolean;
  isUpdating: boolean;
  statusMessage: string | undefined;
  error: any;
}

export const initialState: StartUpState = {
  status: undefined, 
  allItemsLoaded: false,
  isLoading: false,
  isUpdating: false,
  statusMessage: undefined,
  error: null,
};
 
const slice = createSlice({
  name: 'startUp',
  initialState,
  reducers: {
    getStartUps(state: StartUpState) { 
      console.log(`Fetching startup state`);
      state = { ...state, statusMessage: 'fetching' };
      return state;
    },
    getStartUpsSuccess(state: StartUpState, action: PayloadAction<any[]>) {
      state = {
        ...state,
        isLoading: false,
        error: null,
        statusMessage: 'success',
      }; 
      console.log(`State for startups adapter success`); 
      return state;
    },
    getStartUpsFailure(state: StartUpState, action: PayloadAction<string>) {
      console.log(
        `Error State for adapter ${JSON.stringify(action.payload, null, '	')}`
      );
      state = {
        ...state,
        isLoading: false,
        error: action.payload,
        statusMessage: 'failure',
      };
      return state;
    },
  },
});
 

// Entity Actions
export const { actions } = slice;

// Entity Reducer
export const reducer = slice.reducer;

export const selectStartUpsLoaded = (state: { startUps: { allItemsLoaded: any; }; }) => state.startUps.allItemsLoaded;

export default slice;
