import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import Home from './components/Home';
import Search from './components/Search';
import History from './components/History';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Login"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } 
              else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              }
              else if (route.name === 'History'){
                iconName = focused ? 'clipboard' : 'clipboard-outline';
              }
              else if (route.name === "Profile"){
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: { display: route.name === 'Login' || route.name === 'Register' ? "none" : "flex" },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          {isAuthenticated ? (
            <>
              <Tab.Screen name = "Home"    component = {Home} />
              <Tab.Screen name = "Search"  component = {Search}/>
              <Tab.Screen name = "History" component = {History}/>
              <Tab.Screen name = "Profile" component = {Profile}/>
            </>
          ) : (
            <>
              <Tab.Screen name="Login">
                {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
              </Tab.Screen>
              <Tab.Screen name = "Register" component = {Register} />
            </>
          )}
        </Tab.Navigator>
    </NavigationContainer>
  );
}