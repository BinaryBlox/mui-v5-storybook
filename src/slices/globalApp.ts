import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from '../store';
import {
  DynamicBackdropIcon,
  DynamicBackdropProps,
} from '../components/global/backdrop';
import { ReactFragment } from 'react';

/**
 * Redux & Interfaces
 */
interface GlobalApp {
  isLoaded?: boolean;
  backDropProps: DynamicBackdropProps | null;
}

interface GlobalAppState extends GlobalApp {}

const initialState: GlobalAppState = {
  isLoaded: false,
  backDropProps: {
    title: '',
    visible: false,
    subTitle: undefined,
    iconType: 'load',
  },
};

const slice = createSlice({
  name: 'globalApp',
  initialState,
  reducers: {
    toggleBackdropState(
      state: GlobalAppState,
      action: PayloadAction<GlobalApp>
    ): void {
      const globalApp = action.payload;
      state.backDropProps = globalApp.backDropProps;
    },
  },
});

export const { reducer: globalReducer } = slice;

/**
 * Method
 */
export const toggleBackdrop =
  (
    backdropVisible: boolean = false,
    backdropTitle: string = undefined,
    backdropIcon: DynamicBackdropIcon = 'load',
    backdropSubTitle: string = undefined
  ): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(
      slice.actions.toggleBackdropState({
        backDropProps: {
          visible: backdropVisible,
          title: backdropTitle,
          iconType: backdropIcon,
          subTitle: backdropSubTitle,
        },
      })
    );
  };

export default slice;
