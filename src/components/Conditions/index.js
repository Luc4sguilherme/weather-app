import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import convertTime from '../../utils/convertTime';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-around',
    borderRadius: 8,
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff',
  },
  condition: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Conditions({ weather }) {
  return (
    <View style={styles.container}>
      <View style={styles.condition}>
        <Feather name="wind" size={23} color="#1ed6ff" />
        <Text>{weather.wind_speed} km/h</Text>
      </View>

      <View style={styles.condition}>
        <MaterialCommunityIcons
          name="weather-sunset-up"
          size={23}
          color="#1ed6ff"
        />
        <Text>
          {convertTime(weather.sunrise, weather.timezone).date.format('LT')}
        </Text>
      </View>

      <View style={styles.condition}>
        <MaterialCommunityIcons
          name="weather-sunset-down"
          size={23}
          color="#1ed6ff"
        />
        <Text>
          {convertTime(weather.sunset, weather.timezone).date.format('LT')}
        </Text>
      </View>

      <View style={styles.condition}>
        <Feather name="droplet" size={23} color="#1ed6ff" />
        <Text>{weather.humidity}</Text>
      </View>
    </View>
  );
}
