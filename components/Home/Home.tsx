import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/theme';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PenguinPay!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
});

export default Home;

