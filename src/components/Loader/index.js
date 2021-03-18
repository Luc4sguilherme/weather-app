import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={70} color="#1ed6ff" />
    </View>
  );
}
