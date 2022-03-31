import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import type { SettingsContextValue } from '../contexts/SettingsContext';

export const useSettings = (): SettingsContextValue => useContext(SettingsContext);
