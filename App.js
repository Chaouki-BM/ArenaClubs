import 'react-native-gesture-handler';
import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Reset from './screens/RestScreen'
import SignUp from './screens/RegisterScreen'
//import home from './screens/HomePage';
import NextRegister from './screens/NextRegister';
import TabNavigation from './Navigations/TabNavigation'
import PostsAlbum from './screens/PostsAlbum'
import RegisterClub from './screens/RegisterClub';
const Stack = createNativeStackNavigator();
import store from './components/Store';
import UserTabBottom from './screens/UserScreens/UserTabBottom';
function App() {

  const [log, setlog] = store.useState("log")
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
            //headerStyle: { backgroundColor: '#f66723'},
          }}
        >

          < Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Reset" component={Reset} />
          <Stack.Screen name="Sign-Up" component={SignUp} />
          <Stack.Screen name="Sign Up" component={NextRegister} />
          <Stack.Screen name="RegisterClub" component={RegisterClub} />
          <Stack.Screen name="UserTabBottom" component={UserTabBottom} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="PostsAlbum" component={PostsAlbum} />



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