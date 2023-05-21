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
import { RecoilRoot } from 'recoil';
import Register from './src/Register';

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
      <StackLogin.Screen name="Register" component={Register} />
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

const MainApp = createBottomTabNavigator();
function MainAppScreen(): JSX.Element {
  return (
    <RecoilRoot>
      <MainApp.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
        tabBar={(props) => <BottomTabBar {...props} />}
      >
        <MainApp.Screen name="Home" component={HomeFlowScreen} />
        <MainApp.Screen
          name="Notifications"
          component={NotificationsFlowScreen}
        />
      </MainApp.Navigator>
    </RecoilRoot>
  );
}
const AppScreen = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer independent={true}>
        <AppScreen.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="LoginFlow"
        >
          <AppScreen.Screen name="LoginFlow" component={LoginFlowScreen} />
          <AppScreen.Screen name="MainApp" component={MainAppScreen} />
        </AppScreen.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
