import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableNativeFeedback,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import defaultStyle from "../config/styles";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  import colors from "../config/colors";
  import AppText from "../components/AppText/AppText";
  import Spacer from "../components/spacer/spacer";
  import CircleButton from "../components/CircleButton/CircleButton";
  import Toast from "react-native-root-toast";
  import ActivityIndicator from "../components/ActivityIndicator/ActivityIndicator";
  import BackButton from "../components/BackButton/BackButton";
  import useAuth from "../config/auth/useAuth";
  import jsonData from '../VoterId.json';
import Screen from "../components/Screen";
  
  
  export default function AllVotersDetails({navigation}) {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const auth = useAuth();
  
  
    const fetchAllData = async () => {
      setLoading(true);
        let newData = [];
        for(i = 0;i<200;i++){
          newData.push(jsonData["users"][i]);
        }
        setData(newData);
      setLoading(false);
    };
  
    useEffect(() => {
      
      fetchAllData();
      
    }, []);
  
    const getSearchedVoter = async () => {
      if (search.length < 1) {
        return Toast.show("Please Type your name", Toast.durations.SHORT);
      }
      setLoading(true);
      const datas = String(search).toLowerCase().split(' ');
      
        let newData= [];
        jsonData["users"].map(user => {
  
            const splited = String(user["Voter Name"]).toLowerCase().split(' ');
           
            const checkArr = [];
             datas.some(item => {
                checkArr.push(splited.some(item2 => {
                   return item2.startsWith(item);
                }));
                
            });
  
            let value = checkArr.reduce((check1,check2) => check1 + check2,0);
    
            if(value === datas.length){
                newData.push(user);
            }
            
          });
  
      setData(newData);
  
      setLoading(false);
    };
  
    return (
      <Screen>
        
        <View style={styles.SearchContainer}>
        <BackButton onPress={() => navigation.goBack()} />
          <View
            style={[styles.InputContainer, { width: "65%", overflow: "scroll",
          backgroundColor:'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            alignItems:'center',
            elevation: 7}]}
          >
            <MaterialIcons
              name="search"
              size={20}
              color={defaultStyle.colors.medium}
              style={styles.icon}
            />
  
            <TextInput
              placeholderTextColor={defaultStyle.colors.medium}
              onChangeText={(e) => setSearch(e)}
              value={search}
              placeholder="search here"
              style={[
                defaultStyle.text,
                {
                  marginLeft: 10,
                  width: "60%",
                  marginBottom: -6,
                  alignContent: "flex-start"
                },
              ]}
            />
          </View>
          <TouchableNativeFeedback onPress={() => getSearchedVoter()}>
            <View
              style={{
                padding: 15,
                borderRadius: 5,
                backgroundColor: colors.lightBlue,
              }}
            >
              <MaterialIcons name="search" size={20} color="white" />
            </View>
          </TouchableNativeFeedback>
        </View>
        <Spacer />
        <View
          style={{
            flexDirection: "row",
            padding: 5,
            alignItems: "center",
            backgroundColor: colors.white,
          }}
        >
          <AppText
            style={{ width: "15%", fontSize: 15, alignSelf: "flex-start" }}
          >
            Sr. No
          </AppText>
          <AppText
            style={{
              width: "70%",
              fontSize: 15,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Voter Name{" "}
          </AppText>
        </View>
        <Spacer />
        <ActivityIndicator visible={loading} />
        <ScrollView showsHorizontalScrollIndicator={false}>
          {data.length <= 0 && (
            <AppText style={{ alignSelf: "center" }}> No Data found!</AppText>
          )}
          {data &&
            data.map((voter) => {
              return (
                <View key={voter["Voter No"]}>
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AppText
                      style={{ width: "15%", fontSize: 12, marginLeft: 3 }}
                    >
                      {voter["Voter No"]}
                    </AppText>
                    <AppText style={{ fontSize: 12, width: "70%" }}>
                      {voter["Voter Name"]}
                    </AppText>
                    <CircleButton onPress={() => navigation.push('VoterDetails',{voter})} style={styles.CircleButton} size={25} />
                  </View>
                  <Spacer />
                </View>
              );
            })}
        </ScrollView>
      </Screen>
    );
  }
  
  const styles = StyleSheet.create({
    InputContainer: {
      alignSelf: "center",
      backgroundColor: defaultStyle.colors.light,
      borderRadius: 15,
      flexDirection: "row",
      alignItems:'center',
      padding: 5,
      marginVertical: 10,
      elevation: 4,
    },
    icon: {
      marginRight: 10,
      marginLeft:5,
      paddingTop: 15,
      alignSelf: "flex-start",
    },
    SearchContainer: {
      padding:5,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    CircleButton: {
      height: 25,
      width: 25,
      alignContent: "center",
      margin: 8,
    },
  });
  