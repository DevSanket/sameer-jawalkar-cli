import {StyleSheet, View, Image} from 'react-native';
import React, {useState} from 'react';
import colors from '../../config/colors';
import useAuth from '../../config/useAuth';
import AppTextInput from '../../Components/AppTextInput';
import CircleButton from '../../Components/CircleButton';
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-root-toast';

// import ImageInput from '../../Components/ImagePicker';
// import Menu from '../../Components/Menu/Menu';

export default function Login() {
  const [myusername, setMyUsername] = useState('');
  const [checkpassword, setCheckPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const HandleSignIn = () => {
    setLoading(true);
    firestore()
      .collection('Admin')
      .get()
      .then(snap => {
        snap.forEach(ele => {
          console.log(ele);
          const {username, password} = ele.data();
          if (username === myusername) {
            if (password === checkpassword) {
              Toast.show('Valid Details');
              //need to implement thing for moving to Home screen one time
              auth.logIn({username});
            } else {
              Toast.show('Invalid Username and Password');
            }
          } else {
            Toast.show('Invalid Username and Password');
          }
        });
        return null;
      });
    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <View
          style={{
            padding: 5,
            elevation: 4,
            borderRadius: 50,
            backgroundColor: 'white',
          }}>
          <Image
            style={{height: 100, width: 100, borderRadius: 50}}
            source={require('../../img/profile1.jpg')}
          />
        </View>

        <AppTextInput
          name="Username"
          icon="supervised-user-circle"
          placeholder="Username"
          value={myusername}
          onChangeText={(e: string) => setMyUsername(e)}
        />
        <AppTextInput
          name="Password"
          icon="lock-outline"
          placeholder="Password"
          value={checkpassword}
          onChangeText={(e: string) => setCheckPassword(e)}
          secureTextEntry={true}
        />
        <CircleButton onPress={HandleSignIn} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
