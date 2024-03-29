import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createUser, loginUser } from '../api/connect';
import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useRecoilState } from 'recoil';
import { userIdState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [userId, setUserId] = useRecoilState(userIdState);

  useEffect(() => {
    const clearUserId = async () => {
      await AsyncStorage.setItem('userId', '');
      setUserId('');
    };

    clearUserId();
  }, []);

  const submitLogin = async () => {
    // { email: userEmail, password: userPassword }
    const res = await loginUser({
      email: userEmail,
      password: userPassword,
    });
    console.log('res');
    console.log(res._id);
    if (res) {
      await AsyncStorage.setItem('userId', res._id);
      setUserEmail('');
      setUserPassword('');
      setUserId(res._id);
      navigation.navigate('MainApp');
    } else {
      Alert.alert('Error', 'Wrong email or password');
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <Image
        style={{
          width: '100%',
          height: 200,
        }}
        source={{
          uri: 'https://i.pinimg.com/564x/20/5c/de/205cdef9d009ce7188354aa398e15abc.jpg',
        }}
      />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          flex: 1,
          paddingTop: 50,
        }}
      >
        <View style={styles.MainSection}>
          <View style={styles.inputsContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              value={userEmail}
              onChangeText={(text) => setUserEmail(text.toLocaleLowerCase())}
              style={styles.input}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              value={userPassword}
              onChangeText={(text) => setUserPassword(text)}
              style={styles.input}
              secureTextEntry={true}
            />
            <View style={styles.button}>
              <Button onPress={submitLogin} title="Enter" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  MainSection: {
    paddingHorizontal: 24,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'left',
    width: '100%',
  },
  inputsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 32,
  },
  button: {
    marginVertical: 20,
  },
});

export default Login;
