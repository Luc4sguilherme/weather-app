import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Details from './pages/Details';
import Home from './pages/Home';
import Search from './pages/Search';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function SearchStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Search" component={SearchStackScreen} />
    </Drawer.Navigator>
  );
}
