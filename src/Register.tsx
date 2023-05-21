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

const Register = ({ navigation }: any) => {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userId, setUserId] = useRecoilState(userIdState);

  useEffect(() => {
    setUserId('');
  }, []);

  const regExEmailValidation = `^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$`;

  const submitCreateUser = async () => {
    const isValidated = () => {
      if (!fullName) {
        Alert.alert('Error', 'Please enter your full name');
        return false;
      }
      if (!email) {
        Alert.alert('Error', 'Please enter your email');
        return false;
      }
      if (!email.match(regExEmailValidation)) {
        Alert.alert('Error', 'Please enter a valid email');
        return false;
      }
      if (!country) {
        Alert.alert('Error', 'Please enter your country');
        return false;
      }
      if (!password) {
        Alert.alert('Error', 'Please enter your password');
        return false;
      }
      if (password?.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');

        return false;
      }
      return true;
    };
    const isValid = isValidated();
    if (!isValid) {
      return;
    }
    const user = await createUser({
      fullName,
      password,
      country,
      email,
    });
    if (user) {
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Something went wrong, please try again later');
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
              value={email}
              onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
              style={styles.input}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry={true}
            />
            <Text style={styles.label}>County:</Text>
            <TextInput
              value={country}
              onChangeText={(text) => setCountry(text)}
              style={styles.input}
            />
            <Text style={styles.label}>Full Name:</Text>
            <TextInput
              value={fullName}
              onChangeText={(text) => setFullName(text)}
              style={styles.input}
            />
            <View style={styles.button}>
              <Button onPress={submitCreateUser} title="Create Account" />
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

export default Register;
