import {
  Button,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './PlaceHolder.module.scss';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useEffect } from 'react';

const PlaceHolder = ({ navigation }: any) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={{
          uri: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2022/03/Black-and-blue-painted-room-ideas-Nathalie-I.jpg',
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            The Best App for make your Home safer
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonFirst}
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonSecond}
              onPress={() => {
                navigation.navigate('Register');
              }}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default PlaceHolder;
