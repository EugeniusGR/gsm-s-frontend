import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import TempIcon from './icons/temperature.svg';
import MotionIcon from './icons/motion.svg';
import GasIcon from './icons/gas.svg';
import SoundIcon from './icons/sound.svg';
import DeviceIcon from './icons/device.svg';

import styles from './HomeScreen.module.scss';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userIdState } from '../store';

import { io } from 'socket.io-client';
import { getSensorData, getUserData, logSensorData } from '../api/connect';
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket = io('http://localhost:3007', {
  transports: ['websocket'],
});

const HomeScreen = ({ navigation }: any) => {
  const [isAlarm, setIsAlarm] = useState(false);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [alarmData, setAlarmData] = useState<any>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchUserId = async () => {
      let localUserId: any = userId;
      if (!localUserId) {
        localUserId = await AsyncStorage.getItem('userId');
        console.log('get Item', localUserId);
      }
      if (!localUserId) {
        return '';
      }
      console.log('userId homescreen', localUserId);
      if (localUserId) {
        setUserId(localUserId);
        const getUser = () => {
          console.log('localUserId', localUserId);
          getUserData(localUserId).then((res) => {
            console.log(localUserId);
            setUser(res);
          });

          getSensorData(localUserId).then((data) => {
            console.log('sensor', data);
            setAlarmData(data);
            setIsAlarm(data?.[0]?.isOn);
          });
        };

        socket.on('connect', () => {
          console.log(socket.id); // x8WIv7-mJelg7on_ALbx

          socket.on('sensor', (data) => {
            console.log('data sensor', data);
            console.log('data?.[0]?.isAlarm', data?.[0]?.isOn);
            setAlarmData(data);
            setIsAlarm(data?.[0]?.isOn);
          });
        });

        socket.on('connect_error', (err) => {
          console.log(`connect_error due to ${err.message}`);
        });

        socket.on('disconnect', () => {
          console.log('disconnect');
        });

        getUser();
      } else {
        setUserId('');
        navigation.navigate('Login');
      }
      return localUserId;
    };

    const userId = fetchUserId();

    if (!userId) {
      Alert.alert('Error', 'Please login first', [
        {
          text: 'Login',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]);
    } else {
    }
  }, [userId]);

  const updateAlarm = () => {
    logSensorData({
      ...alarmData[0],
      isOn: !isAlarm,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.helloMessage}>
          Welcome, {user?.fullName ? user?.fullName?.split(' ')[0] : 'User'}
        </Text>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
          source={{
            uri: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.alarmContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={!isAlarm ? styles.alarm : styles.alarmSet}
            onPress={updateAlarm}
          >
            <View
              style={!isAlarm ? styles.alarmContent : styles.alarmContentSet}
            >
              <Text style={!isAlarm ? styles.textAlarm : styles.textAlarmSet}>
                {!isAlarm ? 'Alert is off' : 'Alarm is on'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.widgetTitleContainer}>
          <Text style={styles.sectionTitle}>Widgets</Text>
        </View>
        <View style={styles.widgetsContainer}>
          <View style={styles.widgetRow}>
            <TouchableOpacity style={styles.widget}>
              <TempIcon width={40} height={70} fill="#fff" />
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Text style={styles.widgetText}>Temperature</Text>
                <Text style={styles.widgetText}>
                  {alarmData?.[0]?.temperature || 'No Data'}°C
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.widget}>
              <MotionIcon width={40} height={70} fill="#fff" />
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={styles.widgetText}>Motion</Text>
                <Text style={styles.widgetText}>
                  {alarmData?.[0]?.isMove ? 'Detected' : 'Not Detected'}
                </Text>
                {alarmData?.[0]?.createdAt && (
                  <Text style={styles.widgetText}>
                    {new Date(alarmData?.[0]?.createdAt).toDateString()}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.widgetRow}>
            <TouchableOpacity style={styles.widget}>
              <GasIcon width={40} height={70} fill="#fff" />
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                <Text style={styles.widgetText}>Gas Control</Text>
                <Text style={styles.widgetText}>
                  {alarmData?.[0]?.isGus ? 'Detected' : 'Not Detected'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.widget}>
              <SoundIcon width={40} height={70} fill="#fff" />
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                <Text style={styles.widgetText}>Sound</Text>
                <Text style={styles.widgetText}>
                  {alarmData?.[0]?.isSound ? 'Detected' : 'Not Detected'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.widgetTitleContainer}>
          <Text style={styles.sectionTitle}>Devices</Text>
        </View>
        <View style={styles.devicesContainer}>
          {alarmData?.length && alarmData[0]?._id ? (
            alarmData?.map((device: any) => (
              <TouchableOpacity style={styles.device} key={device._id}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <DeviceIcon />
                  <Text style={styles.deviceText}>{device._id}</Text>
                </View>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#2cae55',
                  }}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No devices</Text>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#6b37bb',
              padding: 12,
              borderRadius: 10,
              margin: 20,
            }}
            onPress={() =>
              Alert.alert(
                'Add Device',
                `Enter this ID to your device: 
                ${userId}

Do not share this ID to anyone!`
              )
            }
          >
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 16,
              }}
            >
              Add Device
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#f55',
              padding: 12,
              borderRadius: 10,
              margin: 20,
            }}
            onPress={async () => {
              setUserId('');
              await AsyncStorage.setItem('userId', '');
              navigation.navigate('Login');
            }}
          >
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
