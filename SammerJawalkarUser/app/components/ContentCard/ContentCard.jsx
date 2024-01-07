import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../config/colors";
import AppText from "../AppText/AppText";
import Spacer from "../spacer/spacer";

export default function ContentCard({content,img,details,navigation}) {
  return (
    <View style={styles.card}>
      <View style={styles.ImageContainer}>
        <Image
          source={{uri:img}}
          style={{ height: 100, width: 100, borderRadius: 50 }}
        />
        </View>
        <View>
        
          <AppText style={{textAlign:'center'}}>
           {details}
          </AppText>
        
        
        <View style={styles.buttonContainer}>
        <Spacer />
          <TouchableOpacity onPress={() => navigation.push("BlogDetails",{data:content})}>
            <View style={styles.button}>
              <AppText style={{fontSize:15}}>View More </AppText> 
            </View>
          </TouchableOpacity>
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    padding: 10,
    marginTop:40,
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginBottom:10
  },
  ImageContainer: {
    height:130,
    width:130,
    backgroundColor: colors.white,
    marginTop: -25,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100
  },
  buttonContainer: {
    padding: 10,
    justifyContent:'center',
    alignItems: "center",
  },
  button: {
    padding:5,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
  },
});
