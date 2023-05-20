import {
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

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <Text style={styles.helloMessage}>Welcome, Eugene</Text>
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
          <TouchableOpacity activeOpacity={0.7} style={styles.alarm}>
            <View style={styles.alarmContent}>
              <Text style={styles.textAlarm}>Set Alarm</Text>
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
                <Text style={styles.widgetText}>22°C</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.widget}>
              <MotionIcon width={40} height={70} fill="#fff" />
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 20,
                }}
              >
                <Text style={styles.widgetText}>Motion</Text>
                <Text style={styles.widgetText}>Detected</Text>
                <Text style={styles.widgetText}>22:05</Text>
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
                <Text style={styles.widgetText}>Not Detected</Text>
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
                <Text style={styles.widgetText}>Not Detected</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.widgetTitleContainer}>
          <Text style={styles.sectionTitle}>Devices</Text>
        </View>
        <View style={styles.devicesContainer}>
          <TouchableOpacity style={styles.device}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DeviceIcon />
              <Text style={styles.deviceText}>Control Device</Text>
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
          <TouchableOpacity style={styles.device}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DeviceIcon fill="#6b37bb" />
              <Text style={styles.deviceText}>Wifi Connect</Text>
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
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#6b37bb',
              padding: 12,
              borderRadius: 10,
              margin: 20,
            }}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
