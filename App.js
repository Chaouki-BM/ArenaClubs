import 'react-native-gesture-handler';
import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Reset from './screens/RestScreen'
import SignUp from './screens/RegisterScreen'
import HomePage from './screens/HomePage';
import NextRegister from './screens/NextRegister';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: true,
            //headerStyle: { backgroundColor: '#f66723'},
          }}
        >

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Reset" component={Reset} />
          <Stack.Screen name="Sign-Up" component={SignUp} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Sign Up" component={NextRegister} />
        </Stack.Navigator>
      </NavigationContainer>

    </View>


  )
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});


export default App