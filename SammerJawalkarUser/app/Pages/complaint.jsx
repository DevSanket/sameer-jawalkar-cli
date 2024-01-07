import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  PermissionsAndroid
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import useAuth from "../config/auth/useAuth";
import AppText from "../components/AppText/AppText";
import AppTextInput from "../components/AppTextInput/AppTextInput";
import BackButton from "../components/BackButton/BackButton";
import CircleButton from "../components/CircleButton/CircleButton";
import firestore from '@react-native-firebase/firestore';
import Toast from "react-native-root-toast";
import ActivityIndicator from "../components/ActivityIndicator/ActivityIndicator";
import colors from "../config/colors";
import FontAwesome  from "react-native-vector-icons/FontAwesome";
import  EvilIcons  from "react-native-vector-icons/EvilIcons";
import Geolocation from 'react-native-geolocation-service';
import Language_Data from '../config/language';
import axios from "axios";

export default function Complaint({ navigation }) {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [compaint, checkComplaint] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion,setMapRegion] = useState({});
  const db = firestore();

const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
const circumference = (40075 / 360) * 1000;
const{language} = auth.userData;

  

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getAddress = async () => {
    setLoading(true);
    const result = requestLocationPermission();
    await result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
            axios.get(`https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then(res => {
              console.log(res.data);
              const data = res.data;
              const {display_name} = data
              console.log(display_name);
              setAddress(`${display_name}`)
        }).catch(err => {
          console.log("error");
        })
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);

      setLoading(false);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const HandleComplaint = async () => {
    if (!name || !contact || !address || !details) {
      return Toast.show(`${Language_Data[language]["Please_Fill_All_Fields"]}`, Toast.durations.SHORT);
    }

    if (name.length < 8) {
      return Toast.show("Please Enter Full Name", Toast.durations.SHORT);
    }

    if(!mapRegion){
        return Toast.show("Click on Location icon once", Toast.durations.SHORT);
    }

    if (compaint.length) {
      return Toast.show("Your one Complaint is Active", Toast.durations.SHORT);
    }
    setLoading(true);
    try {
      await db.collection("ComplaintBox")
      .add({
        name,
        contact,
        address,
        details,
        status: "Pending",
        location:mapRegion
      })
      .then((data) => {

        return Toast.show("Complaint Saved", Toast.durations.SHORT);
      });

    setAddress("");
    setDetails("");
    setName("");
    } catch (error) {
      console.log(error);
      Toast.show("Complaint Failed to Saved", Toast.durations.SHORT);
    }
    setLoading(false);
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <BackButton
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <AppText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {Language_Data[language]["Your_Complaint_Details"]}
          </AppText>
          <AppTextInput
            placeholder={Language_Data[language]["Full_Name"]}
            icon="supervised-user-circle"
            value={name}
            onChangeText={(e) => setName(e)}
          />
          <View style={styles.location}>
            <AppTextInput
              placeholder={Language_Data[language]["Address"]}
              icon="event-note"
              value={address}
              style={{width:'75%'}}
              
              onChangeText={e => setAddress(e)}
            />

            <TouchableOpacity
            onPress={() => getAddress()}
            style={{marginLeft:10}}>
     <View style={styles.social_menu}>
        <EvilIcons name="location"
        color="#D7417A"
        size={30}
        style={{padding:5}}
        /> 
      </View>
     </TouchableOpacity>
          </View>
          <AppTextInput
            placeholder="Contact"
            icon="phone"
            value={contact}
            onChangeText={e => setContact(e)}
            selectTextOnFocus={false}
          />
          <AppTextInput
            placeholder={Language_Data[language]["Complaint"]}
            icon="notes"
            value={details}
            onChangeText={(e) => setDetails(e)}
          />
          <CircleButton onPress={() => HandleComplaint()} />

          {errorMsg && <AppText>{errorMsg}</AppText>}

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "http://api.whatsapp.com/send?phone=91" + "9881467467"
              );
            }}
          >
            <View style={styles.WhatsAppButtonContainer}>
              <View style={styles.whatsappLogo}>
                <FontAwesome
                  name="whatsapp"
                  size={30}
                  color={colors.lightBlue}
                />
              </View>
              <AppText style={{ marginLeft: 10 }}>Whatsapp</AppText>
            </View>
          </TouchableOpacity>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  WhatsAppButtonContainer: {
    backgroundColor: colors.white,
    width: 200,
    alignSelf: "center",
    height: 40,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 7,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  whatsappLogo: {
    height: 60,
    width: 60,
    backgroundColor: colors.white,
    borderRadius: 50,
    marginTop: -10,
    shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 7,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  social_menu: {
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    backgroundColor: colors.white,
  },
  location:{
    flexDirection:"row",
    alignItems:'center'
  }
});
