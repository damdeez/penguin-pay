import { useContext } from 'react';
import {
  HeaderAppearanceContext,
  type HeaderAppearanceContextValue,
} from '@/context/HeaderAppearanceContext';

const useHeaderAppearance = (): HeaderAppearanceContextValue => {
  const ctx = useContext(HeaderAppearanceContext);
  if (!ctx) {
    throw new Error('useHeaderAppearance must be used within HeaderAppearanceProvider');
  }
  return ctx;
};

export default useHeaderAppearance;
