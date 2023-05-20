import { SafeAreaView, StatusBar, Text, View } from 'react-native';

const NotifcationScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle={'dark-content'} />
      <View>
        <Text>Notifcations</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotifcationScreen;
