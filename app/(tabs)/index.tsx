import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pick Cam with Expo Go and React Native</Text>
      <Link href='/Camera' style={styles.link}>
        Pick
      </Link>
      <View style={styles.divider}></View>
      <Link href='/Image' style={styles.link}>
        View Image
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  link: {
    backgroundColor: '#6200ea',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    textAlign: 'center',
    textDecorationLine: 'none',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 15,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
});
