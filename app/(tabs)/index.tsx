import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <h1>Welcome to Pick Cam with expo go and react native </h1>
      <Link href='/Camera' style={styles.link}>
        Caméra
      </Link>
      <hr />
      <Link href='/Image' style={styles.link}>
        View image
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  h1:{
    color:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  link: {
    backgroundColor: '#6200ea', 
    color: '#ffffff',
    fontSize: 20, 
    fontWeight: '600', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: 'center', 
    textDecorationLine: 'none', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
