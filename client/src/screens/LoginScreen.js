//import React, { useState } from 'react';
//import {
//  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
//} from 'react-native';
//import axios from 'axios';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//
//const LoginScreen = ({ navigation }) => {
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');
//
//  const handleLogin = async () => {
//    if (!email || !password) {
//      Alert.alert('Validation Error', 'Please enter both email and password');
//      return;
//    }
//
//    try {
//      const response = await axios.post(
//        'http://10.0.2.2:8080/api/auth/login',
//        { email, password },
//        {
//          headers: {
//            'Content-Type': 'application/json'
//          }
//        }
//      );
//
//      console.log("Login response:", response.data);
//
//      const token = response.data.token;
//      if (token) {
//        await AsyncStorage.setItem('token', token);
//        Alert.alert('Login Successful', 'You are now logged in.');
//         navigation.navigate('Home'); // Enable this after creating Home screen
//      } else {
//        console.warn('Token missing from response');
//        Alert.alert('Login Failed', 'Token not received from server.');
//      }
//
//    } catch (error) {
//      console.error("Login error:", error.response?.data || error.message);
//      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
//      Alert.alert('Login Error', errorMessage);
//    }
//  };
//  return (
//    <View style={styles.container}>
//      <Text style={styles.title}>Mini NoBroker - Login</Text>
//
//      <TextInput
//        style={styles.input}
//        placeholder="Email"
//        placeholderTextColor="#666"
//        value={email}
//        onChangeText={setEmail}
//        autoCapitalize="none"
//        keyboardType="email-address"
//      />
//
//      <TextInput
//        style={styles.input}
//        placeholder="Password"
//        placeholderTextColor="#666"
//        value={password}
//        onChangeText={setPassword}
//        secureTextEntry
//      />
//
//      <TouchableOpacity onPress={handleLogin} style={styles.button}>
//        <Text style={styles.buttonText}>Login</Text>
//      </TouchableOpacity>
//
//      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//        <Text style={styles.link}>Don't have an account? Register</Text>
//      </TouchableOpacity>
//    </View>
//  );
//};
//
//export default LoginScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f9f9f9'
//  },
//  title: {
//    fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center'
//  },
//  input: {
//    height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8,
//    paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fff'
//  },
//  button: {
//    backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center'
//  },
//  buttonText: {
//    color: '#fff', fontSize: 16, fontWeight: '600'
//  },
//  link: {
//    marginTop: 15, textAlign: 'center', color: '#007bff'
//  }
//});



import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const token = response.data.token;
      if (token) {
        await AsyncStorage.setItem('token', token);
        Alert.alert('Login Successful', 'You are now logged in.');
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'Token not received from server.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      Alert.alert('Login Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />

            <TouchableOpacity
              onPress={handleLogin}
              style={[styles.button, isLoading && styles.buttonDisabled]}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={styles.linkContainer}
            >
              <Text style={styles.linkText}>
                Don't have an account? <Text style={styles.linkHighlight}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 30,
    tintColor: '#4a6fa5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4a6fa5',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#4a6fa5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  linkText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#4a6fa5',
    fontWeight: '600',
  },
});