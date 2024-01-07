import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home/Home';
import AboutMe from '../Pages/About me/AboutMe';
import AddPhotos from '../Pages/AddPhotos/AddPhotos';
import Blog from '../Pages/Blog/Blog';
import AddBlog from '../Pages/Blog/AddBlog';
import SeeAllBlogs from '../Pages/Blog/SeeAllBlogs';
import UpdateBlog from '../Pages/Blog/updateBlog';
import TeamUp from '../Pages/TeamUp/TeamUp';
import FeedBack from '../Pages/FeedBack/FeedBack';
import MyHome from '../Pages/HomeSection/MyHome';
import SlideImage from '../Pages/HomeSection/SlideImage';
import BasicDetails from '../Pages/HomeSection/BasicDetails';
import SocialMedia from '../Pages/HomeSection/SocialMedia';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AboutMe" component={AboutMe} />
      <Stack.Screen name="HandlePhotos" component={AddPhotos} />
      <Stack.Screen name="Blog" component={Blog} />
      <Stack.Screen name="AddBlog" component={AddBlog} />
      <Stack.Screen name="seeAllBlogs" component={SeeAllBlogs} />
      <Stack.Screen name="updateBlog" component={UpdateBlog} />
      <Stack.Screen name="TeamUP" component={TeamUp} />
      <Stack.Screen name="FeedBack" component={FeedBack} />
      <Stack.Screen name="MyHome" component={MyHome} />
      <Stack.Screen name="SlideImage" component={SlideImage} />
      <Stack.Screen name="BasicDetails" component={BasicDetails} />
      <Stack.Screen name="SocialMedia" component={SocialMedia} />
    </Stack.Navigator>
  );
}
