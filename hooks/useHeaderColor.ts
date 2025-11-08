import { useLayoutEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import useHeaderAppearance from '@/hooks/useHeaderAppearance';

const useHeaderColor = (backgroundColor: string, tintColor?: string) => {
  const { setAppearance } = useHeaderAppearance();

  useLayoutEffect(() => {
    setAppearance(backgroundColor, tintColor ?? '');
  }, [setAppearance, backgroundColor, tintColor]);

  useFocusEffect(
    useCallback(() => {
      setAppearance(backgroundColor, tintColor ?? '');
      return undefined;
    }, [setAppearance, backgroundColor, tintColor])
  );
};

export default useHeaderColor;
