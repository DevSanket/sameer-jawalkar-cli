import { Button, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";

const { width, height } = Dimensions.get("screen");
import YouTubePlayer from "react-native-youtube-iframe";

export default function VideosContainer() {
    
  const newdata = [
    {
      key: "https://www.youtube.com/watch?v=Ipn80aLyhgs",
      url: "Ipn80aLyhgs",
    },
    {
      key: "https://www.youtube.com/watch?v=T2mfWhK8QnU",
      url: "T2mfWhK8QnU",
    },
  ];

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={newdata}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item, index }) => {
          return (
            <View 
            key={index}
            style={{width,alignItems:'center',justifyContent:'center',padding:10}}>
               
               <YouTubePlayer
                height={height * 0.25}
                width={width * 0.9}
                videoId={item.url}
                />
        </View>
          );
        }}
      />
    </View>
  );
}


