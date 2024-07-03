import React, { useState,useEffect } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LottieSplashScreen from "react-native-lottie-splash-screen";

import SearchScreen from './src/SearchScreen';
import HistoryScreen from './src/HistoryScreen';

import {LogBox,Dimensions} from 'react-native';
import CustomDrawer from './src/CustomDrawer';
import { navigationRef } from './src/RootNavigation';

const App = () => {

const Drawer = createDrawerNavigator();

  useEffect(() => {
    LottieSplashScreen.hide();
    LogBox.ignoreAllLogs();
  }, []);


//
//clicked? styles.pullHigher:'',, clicked?styles.bgTransparent:'']
//,clicked?styles.bgTransparent:''
// injectedJavaScript={}       setLoading(true);



  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator 
        screenOptions={{
        drawerStyle: {
        backgroundColor: '#000',
        width: Dimensions.get('window').width,
        },
            }}

        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen options={{headerShown: false}}  name="Search" component={SearchScreen} />
        <Drawer.Screen options={{headerShown: false}}  name="History" component={HistoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
//onLoadEnd={onLoadEnd}

/*
style={{display:'flex',flex:1,width: '98%',justifyContent:'center',alignSelf:'center',
        alignItems:'flex-start',flexGrow:1,marginTop:34}}
        */



export default App;
