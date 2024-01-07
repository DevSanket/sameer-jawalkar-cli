import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Firebase from "../../config/firebase";
import ActivityIndicator from "../../Components/ActivityIndicator/ActivityIndicator";
import Screen from "../../Components/Screen/Screen";
import BackButton from "../../Components/BackButton/BackButton";
import PendingComplaintCard from "../../Components/PendingComplaintCard/PendingComplaintCard";
import Toast from "react-native-root-toast";
import AppText from "../../Components/AppText/AppText";

export default function GetAllComplaints({ navigation }) {
  const [getData, setData] = useState([]);
  const db = Firebase.firestore();
  const [loading, setLoading] = useState(false);

  const RefreshData = async () => {
    await db.collection("ComplaintBox")
      .get()
      .then((snapshot) => {
        setData(
          snapshot.docs.map((doc) => {
              return {
                id: doc._delegate._document["key"].path.segments[6],
                name: doc.data().name,
                address: doc.data().address,
                contact: doc.data().contact,
                details: doc.data().details,
                location:doc.data().location,
                imgUrl:doc.data().imgUrl
              };
       
          })
        );
      });
  };

  useEffect(() => {
    setLoading(true);
    RefreshData();
    setLoading(false);
  },[]);

  const handleCheck = (item) => {
    if(!item.imgUrl){
      return Toast.show("Image not Here",Toast.durations.SHORT);
    }
    try {
      db.collection("ComplaintBoxRunning").doc(item.id).set(item);
      RefreshData();
      db.collection("ComplaintBox").doc(item.id).delete();
      Toast.show("Updated Successfully", Toast.durations.SHORT);
    } catch (error) {
      console.log(error);
      Toast.show("Cannot Change Right Now!");
    }
  };

  const handleDelete = (item) => {
    try {
      db.collection("ComplaintBox").doc(item.id).delete();
      RefreshData();
      Toast.show("Deleted Successfully", Toast.durations.SHORT);
    } catch (error) {
      console.log(error);
      Toast.show("Cannot Change Right Now!");
    }
  };

  return (
    <>
      <Screen>
        <ActivityIndicator visible={loading} />
        <ScrollView style={{ width: "100%", padding: 10 }}>
          <BackButton onPress={() => navigation.goBack()} />
          {getData &&
            getData.map((data) => {
              return (
                <PendingComplaintCard
                  navigation={navigation}
                  key={data.id}
                  handleCheck={() => handleCheck(data)}
                  handleDelete={() => handleDelete(data)}
                  data={data}
                />
              );
            })}
          {!getData.length && (
            <AppText style={{ alignSelf: "center" }}>
              No Pending Appoinments
            </AppText>
          )}
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});
