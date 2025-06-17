import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddPropertyScreen from '../screens/AddPropertyScreen';
import ViewPropertiesScreen from '../screens/ViewPropertiesScreen';
import MyPropertiesScreen from '../screens/MyPropertiesScreen';
    import EditPropertyScreen from '../screens/EditPropertyScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddProperty" component={AddPropertyScreen} />
          <Stack.Screen name="ViewProperties" component={ViewPropertiesScreen} />
          <Stack.Screen name="MyProperties" component={MyPropertiesScreen} />
          <Stack.Screen name="EditProperty" component={EditPropertyScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
