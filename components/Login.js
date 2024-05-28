import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function Login({ setIsAuthenticated }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const handleLogIn = async () => {
    try {
      const response = await axios.post('http://10.221.8.39:3000/login', { username, password });
      setMessage(response.data);
      setIsAuthenticated(true);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error occurred:', error);
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred');
      }
    }
  };
    
  const handleSignUpPress = () => {
    navigation.navigate('Register');
  };
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar style='light'/>
      <Image style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} source={require('../img/background.png')} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', top: 0, left: 0, width: '100%' }}>
        <Image style={{ height: 255, width: 90 }} source={require('../img/light.png')} />
        <Image style={{ height: 205, width: 65 }} source={require('../img/light.png')} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 2, fontSize: 40, top: 50}}>
          Login
        </Text>
      </View>
      <View style={{ alignItems: 'center', marginHorizontal: 20, marginBottom: 20 }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10, width: '100%' }}>
          <TextInput 
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
            placeholderTextColor='gray' 

          />
        </View>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10, width: '100%', marginTop: 10 }}>
          <TextInput 
            placeholder='Password' 
            value = {password}
            onChangeText={setPassword}
            placeholderTextColor='gray' 
            secureTextEntry 
          />
        </View>
        {message ? <Text style = {{fontSize:20, color: 'red'}}>{message}</Text> : null}
        <Button mode='contained' style={{ width: '100%', marginTop: 20 }} onPress={handleLogIn}>
          Login
        </Button>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity  onPress={handleSignUpPress}>
            <Text style={{ color: '#007bff' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}