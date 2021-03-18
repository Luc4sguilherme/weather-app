import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';

import Conditions from '../../components/Conditions';
import Loader from '../../components/Loader';
import api from '../../services/api';
import conditions from '../../utils/conditions';
import convertTime from '../../utils/convertTime';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: '#e8f0ff',
  },
  backButton: {
    flexDirection: 'row',
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBox: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ddd',
    width: '90%',
    height: 50,
    borderRadius: 8,
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 7,
  },
  icon: {
    width: '15%',
    backgroundColor: '#1ed6ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    width: '90%',
  },
  infos: {
    padding: '5%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    color: '#fff',
    fontSize: 16,
  },
  city: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  temp: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 80,
  },
  error: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 18,
  },
});

export default function Search() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [background, setBackground] = useState([]);

  async function handleSearch() {
    try {
      setLoading(true);
      const response = await api.get(`/weather?q=${input}`);
      setCity(response.data);
      setLoading(false);
      setInput('');
      Keyboard.dismiss();

      if (
        convertTime(response.data.dt, response.data.timezone).horary === 'night'
      ) {
        setBackground(['#0c3741', '#0f2f61']);
      } else {
        setBackground(['#1ed6ff', '#97c1ff']);
      }
    } catch (err) {
      setError('City not found!');
      setInput('');
      setCity(null);
      Keyboard.dismiss();
    }
  }

  if (city) {
    const icon = conditions(
      city.weather[0].main,
      convertTime(city.dt, city.timezone).horary
    );

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather name="chevron-left" size={32} color="#000" />
          <Text style={{ fontSize: 22 }}>Back</Text>
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <TextInput
            value={input}
            onChangeText={(valor) => setInput(valor)}
            placeholder="Ex: New York, US"
            style={styles.input}
          />
          <TouchableOpacity style={styles.icon} onPress={handleSearch}>
            <Feather name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.header}
          onPress={() =>
            navigation.push('Details', {
              latitude: city.coord.lat,
              longitude: city.coord.lon,
              city: city.name,
              country: city.sys.country,
            })
          }
        >
          <LinearGradient style={styles.infos} colors={background}>
            <Text style={styles.date}>
              {convertTime(city.dt, city.timezone).date.format('L')}
            </Text>
            <Text style={styles.city}>
              {city.name} - {city.sys.country}
            </Text>
            <View style={{ alignItems: 'center' }}>
              <Ionicons name={icon.name} color="#fff" size={150} />
              <Text style={styles.temp}>{city.main.temp.toFixed(0)}°</Text>
            </View>
            <Conditions
              weather={{
                wind_speed: city.wind.speed,
                sunrise: city.sys.sunrise,
                sunset: city.sys.sunset,
                humidity: city.main.humidity,
                timezone: city.timezone,
              }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Feather name="chevron-left" size={32} color="#000" />
        <Text style={{ fontSize: 22 }}>Back</Text>
      </TouchableOpacity>

      <View style={styles.searchBox}>
        <TextInput
          value={input}
          onChangeText={(valor) => setInput(valor)}
          placeholder="Ex: New York, US"
          style={styles.input}
        />
        <TouchableOpacity style={styles.icon} onPress={handleSearch}>
          <Feather name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading && !error && <Loader />}
      {error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
}
