// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, {useState,useEffect,useCallback} from 'react';
import {
  SafeAreaView,RefreshControl,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,FlatList,TouchableOpacity
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import * as RootNavigation from './RootNavigation.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import {get_count_of_history_items_from_async_storage,getAsyncStoreData,remove_history_items_from_async_storage,get_history_items_from_async_storage} from 'utils/utils';

import AiLogo from './svgComponents/AiLogo';
import Bullet from './svgComponents/Bullet';

const CustomDrawer = ({props}) => {

const isFocused = useIsFocused();

const [queryHistory,setQueryHistory] = useState(null);
const [refreshing, setRefreshing] = React.useState(false);

const [forcerefresh,setForceRefresh] = useState(false);

const [numItems,setNumItems] = useState(0);

const [loaded,setLoaded] = useState(false);


let navigation = useNavigation();

useEffect(() => {



async function fetchHistoryFromAsyncStore() {

 try {
    const jsonValue = await AsyncStorage.getItem('@XDashQueryHistory');
  //  console.log('async contains-->',jsonValue);
    let qrhis = jsonValue != null ? jsonValue : null;
    if (qrhis!==null) { setQueryHistory(JSON.parse(jsonValue));setLoaded(true);
      setNumItems(JSON.parse(jsonValue).length);
console.log('mylength',JSON.parse(jsonValue).length);

    }
  } catch(e) {
    // error reading value
    console.log('error reading from async storage',e);

  }


}
fetchHistoryFromAsyncStore();
//getCountHistoryItems();

}, [isFocused,refreshing,forcerefresh]);

 


async function clearStore() {
 try {
    await AsyncStorage.removeItem('@XDashQueryHistory');
   setForceRefresh(true);
   setQueryHistory(null);
  } catch (e) {
    // saving error
    console.log('error removing fromto async storage');
  }

}


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';







//<AiLogo style={{alignSelf:'center',width: 75, zIndex:90,height: 75,color:'white'}} />

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#121212',color:'#fff'}}>
      {/*Top Large Image */}
     


      <DrawerContentScrollView {...props} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } style={{color:'#fff'}}>
        

        <View style={{width:'99%'}}>




          
<Text style={{marginLeft:10,marginTop:10,fontSize:25,color:'#f5f5f5',fontFamily:'Quicksand-SemiBold',marginBottom:20}} >Your History</Text>

          {(queryHistory !==null) && queryHistory.map((obj,idx) => {
             
            let rtpms =  {'query':obj.query,'queryResponse':obj.queryResponse};
            if (obj.query !=='') {  
            return (
              <TouchableOpacity 
 onPress={()=>{navigation.navigate('History',rtpms);}} 
                key={idx} style={{backgroundColor:(idx%2===0)?'rgb(30 41 59)':'rgb(100 116 139)',marginLeft:10,marginBottom:5,flexDirection:'row',width:'100%',flexDirection:'column'}} >
                
                <Text style={{fontSize:18,lineHeight:30,color:'white',fontFamily:'Quicksand-Light'}}>

<Bullet style={{width: 15, height: 15,color:'white'}} />
                  {obj.query}</Text>
              </TouchableOpacity>
            );
          }})}
        
{(queryHistory===null) && <Text style={{marginLeft:10,fontSize:14,color:'white',fontFamily:'Quicksand-Light'}}>
  Nothing here yet.
</Text>}
          
        </View>

<TouchableOpacity 
  style={{backgroundColor:'#121212',marginTop:25,alignItems:'center',justifyContent:'center',width:120,height:40,borderWidth:1,borderColor:'#5f5f5',borderRadius:10 }} 
  onPress={() => clearStore()} >
  
<Text style={{fontSize:14,color:'white',fontFamily:'Quicksand-SemiBold'}}>Clear History</Text>

</TouchableOpacity>



      </DrawerContentScrollView>
      

      <Text
        onPress={() => setLoaded(!loaded)}
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'white'
        }}>
        www.xdash.ai
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomDrawer;
