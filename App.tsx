import React from 'react';
import Login from './src/Login';
import { NavigationContainer } from '@react-navigation/native';
import PlaceHolder from './src/PlaceHolder';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/HomeScreen';
import NotifcationScreen from './src/NotifcationScreen';

const StackLogin = createNativeStackNavigator();

function LoginFlowScreen(): JSX.Element {
  return (
    <StackLogin.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <StackLogin.Screen name="Welcome" component={PlaceHolder} />
      <StackLogin.Screen name="Login" component={Login} />
    </StackLogin.Navigator>
  );
}
const StackHome = createNativeStackNavigator();

function HomeFlowScreen(): JSX.Element {
  return (
    <StackHome.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainPage"
    >
      <StackHome.Screen name="MainPage" component={HomeScreen} />
    </StackHome.Navigator>
  );
}
const StackNotification = createNativeStackNavigator();

function NotificationsFlowScreen(): JSX.Element {
  return (
    <StackNotification.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Notification"
    >
      <StackNotification.Screen
        name="Notification"
        component={NotifcationScreen}
      />
    </StackNotification.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Account"
      >
        <Tab.Screen name="Home" component={HomeFlowScreen} />
        <Tab.Screen name="Notifications" component={NotificationsFlowScreen} />
        <Tab.Screen name="Log Out" component={LoginFlowScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
