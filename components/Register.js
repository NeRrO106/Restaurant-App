import React, { useState } from 'react';
import { View, Text, Image, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Register() {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const [message, setMessage] = useState('');
  
  const handleRegister = async () => {
    if(password !== cpassword){
      setMessage('Parola nu este la fel');
      return;
    }
    try {
      const response = await axios.post('http://10.221.8.39:3000/register', {
        username, password, email
      });
      setMessage(response.data);
      navigation.navigate('Login');
    } 
    catch (error) {
      console.error('Error occurred:', error);
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred');
      }
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar style='light'/>
      <Image style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} source={require('../img/background.png')} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', top: 0, left: 0, width: '100%' }}>
        <Image style={{ height: 255, width: 90 }} source={require('../img/light.png')} />
        <Image style={{ height: 205, width: 65 }} source={require('../img/light.png')} />
        <Image style={{ height: 155, width: 45 }} source={require('../img/light.png')} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 2, fontSize: 40, marginTop: 180}}>
          Register
        </Text>
      </View>
      
      <View style={{ alignItems: 'center', marginHorizontal: 20, marginBottom: 20 }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10, width: '100%' }}>
          <TextInput 
            placeholder='Name' 
            placeholderTextColor='gray'
            onChangeText={setUsername} 
            value={username} 
            require
          />
        </View>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10, width: '100%', marginTop: 10}}>
          <TextInput 
            placeholder='Email' 
            placeholderTextColor='gray' 
            onChangeText={setEmail} 
            value={email} 
            require
          />
        </View>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10, width: '100%', marginTop: 10 }}>
          <TextInput 
            placeholder='Password' 
            placeholderTextColor='gray' 
            onChangeText={setPassword} 
            value={password} 
            secureTextEntry 
            require
          />
        </View>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10, width: '100%', marginTop: 10 }}>
          <TextInput 
            placeholder='Confirm Password' 
            placeholderTextColor='gray' 
            onChangeText={setCPassword}
            value={cpassword}
            secureTextEntry 
            require
            />
        </View>
        {message ? <Text style = {{fontSize:20, color: 'red'}}>{message}</Text> : null}
        <Button mode='contained' style={{ width: '100%', marginTop: 30 }} onPress={handleRegister}>
          Register
        </Button>
      </View>
    </View>
  )
}