import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import BackButton from '../components/BackButton/BackButton'
import AppTextInput from '../components/AppTextInput/AppTextInput'
import useAuth from '../config/auth/useAuth'
import CircleButton from '../components/CircleButton/CircleButton'
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator'
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-root-toast'
import AppText from '../components/AppText/AppText'

export default function TeamUp({navigation}) {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [Address,setAddress] = useState("");
  const [Refrence,setRefrence] = useState("");
  const [loading,setLoading] = useState(false);
  const db = firestore();
  const [compaint, checkComplaint] = useState([]);

 

  const CreateTeamUp = async() => {
    if(!name || !contact || !Address || !Refrence){
      return Toast.show("Please Fill All Fields", Toast.durations.SHORT);
    }

    if (name.length < 8) {
      return Toast.show("Please Enter Full Name", Toast.durations.SHORT);
    }

    if (compaint.length) {
      return Toast.show("Your one Request is Active", Toast.durations.SHORT);
    }

    setLoading(true);
    try {
      await db.collection('TeamUp').add({
        name,
        contact,
        Address,
        Refrence
      });
      Toast.show("Your Team Request Added", Toast.durations.SHORT);
      setAddress('');
      setName('');
      setRefrence('');
    } catch (error) {
      console.log(error);
      Toast.show("Data Not Added", Toast.durations.SHORT);
    }
    setLoading(false);
  }
  
  return (
    <>
    <ActivityIndicator visible={loading} />
    <Screen>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <AppText style={{fontSize:18}}>Team UP</AppText>
        <AppTextInput
            placeholder="Full Name"
            icon="supervised-user-circle"
            value={name}
            onChangeText={(e) => setName(e)}
          />
           <AppTextInput
            placeholder="Contact"
            icon="phone"
            value={contact}
            onChangeText={e => setContact(e)}
            selectTextOnFocus={false}
          />
          <AppTextInput
              placeholder="Address"
              icon="event-note"
              value={Address}
              onChangeText={e => setAddress(e)}
            />
             <AppTextInput
              placeholder="Refrence"
              icon="comment"
              value={Refrence}
              onChangeText={e => setRefrence(e)}
            />
          <CircleButton onPress={() => CreateTeamUp()} />
        </View>
    </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  }
})