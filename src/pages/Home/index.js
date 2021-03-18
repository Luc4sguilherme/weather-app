import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Alert } from 'react-native';

import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Menu from '../../components/Menu';
import api from '../../services/api';
import convertTime from '../../utils/convertTime';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0ff',
    paddingTop: '5%',
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
  },
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [background, setBackground] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert('Permission denied');
        setLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const geoInfo = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        const response = await api.get(
          `/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude=hourly,minutely`
        );

        setWeather(response.data);
        setCity(geoInfo[0].city ? geoInfo[0].city : geoInfo[0].subregion);
        setCountry(geoInfo[0].isoCountryCode);

        if (
          convertTime(response.data.current.dt, response.data.timezone_offset)
            .horary === 'night'
        ) {
          setBackground(['#0c3741', '#0f2f61']);
        } else {
          setBackground(['#1ed6ff', '#97c1ff']);
        }

        setLoading(false);
      } catch (error) {
        Alert('Occured error!');
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header
        background={background}
        weather={weather}
        city={city}
        country={country}
        sizeIcon={150}
      />
      <Conditions
        weather={{
          wind_speed: weather.current.wind_speed,
          sunrise: weather.current.sunrise,
          sunset: weather.current.sunset,
          humidity: weather.current.humidity,
          timezone: weather.timezone_offset,
        }}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ paddingBottom: '5%' }}
        style={styles.list}
        data={weather.daily}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <Forecast data={{ ...item, timezone: weather.timezone_offset }} />
        )}
      />
    </SafeAreaView>
  );
}
