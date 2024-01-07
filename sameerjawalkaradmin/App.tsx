import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import authStorage from './app/config/storage';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from './app/config/context';
import MainNavigator from './app/Navigator/MainNavigator';
import AuthNavigator from './app/Navigator/AuthNavigator';
import {admin} from './app/config/types';
import {RootSiblingParent} from 'react-native-root-siblings';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  const [adminData, setAdminData] = useState<null | admin>(null);

  const restoreUser = async () => {
    const user = await authStorage.getData();
    if (user) {
      setAdminData(JSON.parse(user));
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
          <AuthContext.Provider value={{adminData, setAdminData}}>
            <NavigationContainer>
              {adminData ? <MainNavigator /> : <AuthNavigator />}
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
