import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '@/constants/theme';
import { Image } from 'expo-image';

const Home = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/branding/penguin-mark.svg')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Penguin Pay!</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
});

export default Home;
