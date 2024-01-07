import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {RootSiblingParent} from 'react-native-root-siblings';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import authStorage from './app/config/auth/storage';
import AuthContext from './app/config/auth/context';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './app/navigator/MainNavigator';
import AuthNavigator from './app/navigator/AuthNavigator';

export default function App() {
  const [userData, setUserData] = useState(null);

  const restoreUser = async () => {
    const user = await authStorage.getData();
    if (user) {
      setUserData(JSON.parse(user));
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    restoreUser();
  }, []);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{flex: 1}}>
        <RootSiblingParent>
          <AuthContext.Provider value={{userData, setUserData}}>
            <NavigationContainer>
              {userData ? <MainNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </AuthContext.Provider>
        </RootSiblingParent>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
