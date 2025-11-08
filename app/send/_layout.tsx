import { Stack } from 'expo-router';
import Header from '../../components/Header/Header';
import colors from '../../constants/theme';

export default function SendLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'Send To',
        header: (props) => <Header {...props} />,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
