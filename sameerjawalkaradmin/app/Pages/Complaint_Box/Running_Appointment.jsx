import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Firebase from "../../config/firebase";
import ActivityIndicator from "../../Components/ActivityIndicator/ActivityIndicator";
import Screen from "../../Components/Screen/Screen";
import BackButton from "../../Components/BackButton/BackButton";
import PendingComplaintCard from "../../Components/PendingComplaintCard/PendingComplaintCard";
import Toast from "react-native-root-toast";
import AppText from "../../Components/AppText/AppText";

export default function RunningAppointments({ navigation }) {
  const [getData, setData] = useState([]);
  const db = Firebase.firestore();
  const [loading, setLoading] = useState(false);

  const RefreshData = () => {
    db.collection("ComplaintBoxRunning")
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
                imgUrl:doc.data().imgUrl,
                location:doc.data().location
              };
          
          })
        );
      });
  };

  useEffect(() => {
    setLoading(true);
    RefreshData();
    setLoading(false);
  });

  const handleCheck = (item) => {
    try {
      db.collection("ComplaintBoxHistory").doc(item.id).set({
        id: item.id,
        name: item.name,
        address: item.address,
        contact: item.contact,
        details: item.details,
        status: "Done",
      });
      RefreshData();
      db.collection("ComplaintBoxRunning").doc(item.id).delete();
      Toast.show("Added To History", Toast.durations.SHORT);
    } catch (error) {
      console.log(error);
      Toast.show("Cannot Change Right Now!");
    }
  };

  const handleDelete = (item) => {
    try {
      db.collection("ComplaintBoxRunning").doc(item.id).delete();
      RefreshData();
      Toast.show("Deleted Successfully", Toast.durations.SHORT);
    } catch (error) {
      console.log(error);
      Toast.show("Cannot Change Right Now!");
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <ScrollView style={{ width: "100%", padding: 10 }}>
          <BackButton onPress={() => navigation.goBack()} />
          {getData.length > 0 ? (
            getData.map((data) => {
              return (
                <PendingComplaintCard
                  key={data.id}
                  handleCheck={() => handleCheck(data)}
                  navigation={navigation}
                  handleDelete={() => handleDelete(data)}
                  data={data}
                />
              );
            })
          ) : (
            <AppText style={{ alignSelf: "center" }}>
              No Running Appoinments
            </AppText>
          )}
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});
