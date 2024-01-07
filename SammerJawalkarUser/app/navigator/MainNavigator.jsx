import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import AllVotersDetails from '../Pages/AllVoterDetails';
import Complaint from '../Pages/complaint';
import AboutMe from '../Pages/AboutMe';
import Content from '../Pages/content';
import BlogDetails from '../Pages/BlogDetails';
import TeamUp from '../Pages/TeamUp';
import Gallary from '../Pages/Gallary';
import Feedback from '../Pages/Feedback';
import Settings from '../Pages/settings';


const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AllVoterPage" component={AllVotersDetails} />
        <Stack.Screen name="Complaint" component={Complaint} />
        <Stack.Screen name="AboutMe" component={AboutMe} />
        <Stack.Screen name="Blog" component={Content} />
        <Stack.Screen name="BlogDetails" component={BlogDetails} />
        <Stack.Screen name="TeamUp" component={TeamUp} />
        <Stack.Screen name="Gallary" component={Gallary} />
        <Stack.Screen name="FeedBack" component={Feedback} />
        <Stack.Screen name="settings" component={Settings} />
      </Stack.Navigator>
    );
}