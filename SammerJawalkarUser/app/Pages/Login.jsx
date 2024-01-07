import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '../components/Screen';
import {GoogleSignin,GoogleSigninButton} from '@react-native-google-signin/google-signin';
import useAuth from '../config/auth/useAuth';



export default function Login() {
    const [stateLoading,setStateLoading] = useState(false);
    const auth = useAuth();
    const SignIn = async () => {
        setStateLoading(true);
        try {
          GoogleSignin.configure({
            scopes: ['profile'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
              '134248830234-939818qqvqhd5q219eaihkh4d3dpq73k.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true,
          });
    
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo.user);
          const {email,name,photo} = userInfo.user;
          auth.logIn({email,name,photo,language : 'English'});
        } catch (error) {
          console.log(error);
        }
        setStateLoading(false);
      };

  return (
    <Screen style={styles.container}>
      <Image 
      style={styles.image}
      source={require('../img/profile1.jpg')}
      />
    <GoogleSigninButton
  size={GoogleSigninButton.Size.Standard}
  color={GoogleSigninButton.Color.Dark}
  onPress={SignIn}
  disabled={stateLoading}
/>

    </Screen>
  )
}

const styles = StyleSheet.create({
    container :{
        alignItems :'center',
        justifyContent : 'center',
        
    },
    image :{
        height: 200,
        width : 200,
        borderRadius : 100,
        marginBottom : 40
    }

})