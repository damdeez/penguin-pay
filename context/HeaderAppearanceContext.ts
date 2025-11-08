import React from 'react';

export interface HeaderAppearanceState {
  backgroundColor: string;
  tintColor: string;
}

export interface HeaderAppearanceContextValue extends HeaderAppearanceState {
  setAppearance: (bg: string, tint: string) => void;
}

export const HeaderAppearanceContext =
  React.createContext<HeaderAppearanceContextValue | null>(null);

