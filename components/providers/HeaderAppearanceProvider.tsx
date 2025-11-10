import React, { PropsWithChildren, useMemo, useState } from 'react';
import colors from '@/constants/theme';
import {
  HeaderAppearanceContext,
  type HeaderAppearanceState,
  type HeaderAppearanceContextValue,
} from '@/context/HeaderAppearanceContext';

const HeaderAppearanceProvider = ({ children }: PropsWithChildren): React.ReactElement => {
  const [state, setState] = useState<HeaderAppearanceState>({
    backgroundColor: colors.background,
    tintColor: colors.text,
  });

  const value = useMemo<HeaderAppearanceContextValue>(
    () => ({
      backgroundColor: state.backgroundColor,
      tintColor: state.tintColor,
      setAppearance: (bg, tint) => setState({ backgroundColor: bg, tintColor: tint || colors.text }),
    }),
    [state]
  );

  return (
    <HeaderAppearanceContext.Provider value={value}>
      {children}
    </HeaderAppearanceContext.Provider>
  );
};

export default HeaderAppearanceProvider;
