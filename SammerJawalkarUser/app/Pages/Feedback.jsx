import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import useAuth from '../config/auth/useAuth';
import AppText from '../components/AppText/AppText';
import AppTextInput from '../components/AppTextInput/AppTextInput';
import BackButton from '../components/BackButton/BackButton';
import CircleButton from '../components/CircleButton/CircleButton';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-root-toast';
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator';
import defaultStyle from '../config/styles';
import Language_Data from '../config/language';


export default function Feedback({navigation}) {
  console.log(navigation);
    const auth = useAuth();
    const [name,setName] = useState('');
    const [suggestion,setSuggestion] = useState('');
    const [loading,setLoading] = useState(false);
    const db = firestore();
    const{language} = auth.userData;
    

    const HandleComplaint = () => {
      setLoading(true);
        if(!name || !suggestion){
            return Toast.show(`${Language_Data[language]["Please_Fill_All_Fields"]}`,Toast.durations.SHORT);
        }

        

        db.collection('FeedBackBox').add({
            name,
            suggestion,
        }).then(data => {
           return Toast.show(`${Language_Data[language]["FeedBack_Saved"]}`,Toast.durations.SHORT);
        });
        
        setSuggestion('');
        setName('');
        setLoading(false);
    }

  return (
    <>
    <ActivityIndicator visible={loading} />
    <Screen>
    <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.container}>
            
            <AppText style={{
                fontSize:20,
                fontWeight:'bold',
                textTransform:'uppercase'
            }}>{Language_Data[language]["Your_FeedBack"]}</AppText>
            <AppTextInput 
                placeholder={Language_Data[language]["Name"]}
                icon="supervised-user-circle"
                value={name}
                onChangeText={e => setName(e)}
             />
            
             <TextInput
        multiline
        numberOfLines={4}
        style={[defaultStyle.text,styles.input]}
        onChangeText={e => setSuggestion(e)}
        value={suggestion}
        placeholder={Language_Data[language]["Your_Suggestion"]}
      />
       <CircleButton onPress={() => HandleComplaint()}/>
        </View>
        
    </Screen>
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        padding:10,
        justifyContent:'center',
        alignItems:"center"
    },
    input: {
        marginLeft:10,
        marginRight:10,
        width:'95%',
        margin:10,
        borderRadius:15,
        backgroundColor : 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        padding:10,
        textAlignVertical:'top'
      },
})