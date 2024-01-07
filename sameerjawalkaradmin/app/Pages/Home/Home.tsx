import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Screen from '../../Components/Screen/Screen';
import AppText from '../../Components/AppText/AppText';
import Menu from '../../Components/Menu/Menu';
import colors from '../../config/colors';

export default function Home({navigation}: any) {
  return (
    <Screen style={{paddingTop: 0}}>
      <ScrollView>
        <View style={styles.baseContainer}>
          <View style={styles.ImageContainer}>
            <View style={{elevation: 4}}>
              <Image
                style={{height: 40, width: 40}}
                source={require('../../img/bjp.png')}
              />
            </View>
          </View>
        </View>
        <View style={{padding: 10}}>
          <View style={{height: 70, alignItems: 'center'}}>
            <View style={styles.ImageContent}>
              <Image
                style={styles.image}
                source={require('../../img/profile1.jpg')}
              />
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <AppText style={styles.NameText}>Mr. Sameer Jawalker</AppText>
            <AppText style={styles.details}>
              Vice President - BJP Pimpri Chichwad City (District){' '}
            </AppText>
          </View>
          <Menu navigation={navigation} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.lightBlue,
    padding: 10,
    paddingTop: 40,
    height: 200,
    zIndex: -1,
  },
  ImageContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  ImageContent: {
    padding: 5,
    width: 130,
    height: 130,
    backgroundColor: colors.background,
    marginTop: -70,
    borderRadius: 80,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 80,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  NameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 15,
  },
});
