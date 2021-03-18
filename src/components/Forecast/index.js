import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import conditions from '../../utils/conditions';
import convertTime from '../../utils/convertTime';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: 12,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  date: {
    fontSize: 15,
  },
  temp: {
    alignItems: 'center',
  },
});

export default function Forecast({ data }) {
  const icon = conditions(data.weather[0].main);
  const date = convertTime(data.dt, data.timezone).date.format('MM/DD');

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Ionicons name={`${icon.name}-outline`} color={icon.color} size={25} />
      <View style={styles.temp}>
        <Text>{data.temp.min.toFixed(0)}°</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {data.temp.max.toFixed(0)}°
        </Text>
      </View>
    </View>
  );
}
