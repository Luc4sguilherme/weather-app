import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

import conditions from '../../utils/conditions';
import convertTime from '../../utils/convertTime';

const styles = StyleSheet.create({
  header: {
    width: '95%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  date: {
    color: '#fff',
    fontSize: 17,
  },
  city: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  temp: {
    color: '#fff',
    fontSize: 80,
    fontWeight: 'bold',
  },
});

export default function Header({
  background,
  weather,
  city,
  country,
  sizeIcon,
}) {
  const icon = conditions(
    weather.current.weather[0].main,
    convertTime(weather.current.dt, weather.timezone_offset).horary
  );

  return (
    <LinearGradient style={styles.header} colors={background}>
      <Text style={styles.date}>
        {convertTime(weather.current.dt, weather.timezone_offset).date.format(
          'L'
        )}
      </Text>
      <Text style={styles.city}>
        {city} - {country}
      </Text>
      <Ionicons name={icon.name} color="#fff" size={sizeIcon} />
      <Text style={styles.temp}>{weather.current.temp.toFixed(0)}°</Text>
    </LinearGradient>
  );
}
