import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppText from '../AppText/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';

export default function Menu({navigation}: any) {
  return (
    <View>
      <View style={styles.MenuContainer}>
        <View style={styles.Menu}>
          <View style={styles.MenuImages}>
            <TouchableOpacity onPress={() => navigation.push('ComplaintBox')}>
              <MaterialIcons name="support-agent" size={40} color={'#000'} />
            </TouchableOpacity>
          </View>
          <AppText style={{fontSize: 12}}>Complaint</AppText>
        </View>
        <View style={styles.Menu}>
          <View style={styles.MenuImages}>
            <TouchableOpacity onPress={() => navigation.push('AboutMe')}>
              {/* <EvilIcons name="user" size={40} /> */}
              <MaterialIcons
                name="supervised-user-circle"
                size={40}
                color={'#000'}
              />
            </TouchableOpacity>
          </View>

          <AppText style={{fontSize: 12}}>About Me</AppText>
        </View>
        {/* <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity>
              <EvilIcons name="calendar" size={50} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>Appointment</AppText>
            </View> */}
        <View style={styles.Menu}>
          <View style={styles.MenuImages}>
            <TouchableOpacity onPress={() => navigation.push('Blog')}>
              <MaterialIcons name="event-note" size={40} color={'#000'} />
            </TouchableOpacity>
          </View>
          <AppText style={{fontSize: 12}}>Blog</AppText>
        </View>
        <View style={styles.Menu}>
          <View style={styles.MenuImages}>
            <TouchableOpacity onPress={() => navigation.push('TeamUP')}>
              <MaterialIcons name="chat" size={40} color={'#000'} />
            </TouchableOpacity>
          </View>
          <AppText style={{fontSize: 12}}>Team UP</AppText>
        </View>
        <View style={styles.Menu}>
          <View style={styles.MenuImages}>
            <TouchableOpacity onPress={() => navigation.push('FeedBack')}>
              {/* <EvilIcons name="share-apple" size={50} /> */}
              <MaterialIcons name="feedback" size={40} color={'#000'} />
            </TouchableOpacity>
          </View>
          <AppText style={{fontSize: 12}}>FeedBack</AppText>
        </View>
        <View style={styles.Menu}>
          <View style={styles.MenuImages}>
            <TouchableOpacity onPress={() => navigation.push('MyHome')}>
              <AntDesign name="home" size={30} color={'#000'} />
            </TouchableOpacity>
          </View>
          <AppText style={{fontSize: 12}}>Home</AppText>
        </View>
        <View style={styles.Menu}>
          <View style={styles.MenuImages}>
            <TouchableOpacity onPress={() => navigation.push('HandlePhotos')}>
              <MaterialIcons name="add-to-photos" size={30} color={'#000'} />
            </TouchableOpacity>
          </View>
          <AppText style={{fontSize: 12}}>Photos</AppText>
        </View>

        {/* <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity>

              <Ionicons name="videocam-outline" size={30} />
              </TouchableOpacity>
              
              </View>
              <AppText style={{fontSize:12}}>Videos</AppText>
            </View>
             */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    fontSize: 25,
    alignSelf: 'center',
  },
  MenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  Menu: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  MenuImages: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    elevation: 4,
    borderRadius: 50,
    margin: 15,
    backgroundColor: colors.white,
  },
});
