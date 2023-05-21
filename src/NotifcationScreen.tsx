import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import Alarm from './icons/alarm.svg';

import styles from './NotifcationScreen.module.scss';
import { useEffect, useState } from 'react';
import { getNotifications, getSensorData } from '../api/connect';
import { useRecoilState } from 'recoil';
import { userIdState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotifcationScreen = ({ navigation }: any) => {
  const [userId, setUserId] = useRecoilState(userIdState);
  const [notifications, setAlarmNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchAlarmData = async () => {
      const getStorage = await AsyncStorage.getAllKeys();
      getStorage.forEach(async (key) => {
        const value = await AsyncStorage.getItem(key);
        console.log('key', key);
        console.log('value', value);
      });
      let localUserId: any = userId;
      if (!localUserId) {
        localUserId = await AsyncStorage.getItem('userId');
      }
      console.log('localUserId', localUserId);
      if (localUserId) {
        setUserId(localUserId);
        getNotifications(localUserId).then((data) => {
          console.log('notifications', data);
          setAlarmNotifications(data);
        });
      } else {
        setUserId('');
        Alert.alert('Error', 'Please login again', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      }
    };

    fetchAlarmData();
  }, [userId]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle={'dark-content'} />
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Notifcations</Text>
        <ScrollView
          style={{
            height: '100%',
            marginTop: 20,
          }}
        >
          {notifications.length ? (
            notifications.map((notification) => (
              <View style={styles.notification} key={notification._id}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Alarm
                    style={{
                      marginRight: 20,
                    }}
                    width={40}
                    height={40}
                    fill={notification.isOn ? '#FF6666' : '#555'}
                  />
                  <View>
                    <Text>Move: {notification.isMove ? 'Yes' : 'No'}</Text>
                    <Text>Sound: {notification.isSound ? 'Yes' : 'No'}</Text>
                    <Text>Temperature: {notification.temperature} C</Text>
                  </View>
                </View>
                <Text>{new Date(notification.createdAt).toDateString()}</Text>
              </View>
            ))
          ) : (
            <Text>No notifications</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotifcationScreen;
