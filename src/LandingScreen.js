import React, { Fragment, useRef,useState,useEffect,useCallback } from 'react';

import {  
  SafeAreaView,Linking,StyleSheet,TextInput,Button,ScrollView,
  Text,Image,Platform,View,ActivityIndicator,FlatList,TouchableOpacity,
  Animated, Dimensions, Easing, Keyboard, LogBox
} from 'react-native';

import { WebView } from 'react-native-webview';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import markdownit from 'markdown-it';

import SvgArrowRight from './svgComponents/SvgArrowRight';
import SvgAnswerIcon from './svgComponents/SvgAnswerIcon';
import MenuIcon from './svgComponents/MenuIcon';

import Prism from "prismjs";

import { topQueries } from './topQueries';
import {save_history_item_to_async_storage,remove_history_items_from_async_storage}  from './utils/utils';
import destr from 'destr';

const LandingScreen = ({route, navigation}) => {


const [clicked,setClicked] = useState(false);
const [query, setQuery] = useState('');

const [topthree,setTopThree] = useState([]);
const [topthreeloaded,setTopThreeLoaded] = useState(false);


useEffect(() => {

const pickRandomElements = (array, count) => {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
const mytopthree = pickRandomElements(topQueries, 3);
console.log('TOPTHERE==',mytopthree);
setTopThree(mytopthree);
setTopThreeLoaded(true);


}, []);




return (
   <View style={{flex:1,display:'flex',height:Dimensions.get('window').height+100,backgroundColor:'#000'}} >

<View style={{backgroundColor:'#000',height:clicked?35:'30%'}} >
<MenuIcon onPress={()=> navigation.openDrawer() } style={{position:'absolute',left:7,top:10, width: 22, height: 22,marginLeft:10,marginTop:8}} />  
</View>

   	 <View style={{paddingTop:30,display:'flex',flexDirection:'row',justifyContent:'center',alignSelf:'center',paddingTop:10,paddingBottom:5,backgroundColor:'black',width:'100%'}} >
<Text style={{marginBottom:4,textAlign:'center',alignSelf:'center',color:'white',fontSize:23,fontFamily:'Quicksand-SemiBold'}} >xdash.ai</Text>
</View>

<View style={{backgroundColor:'#000'}} >
<Text style={{marginBottom:10,textAlign:'center',alignSelf:'center',color:'white',fontSize:16,fontFamily:'Quicksand-Light'}} >Optimize Your Productivity & Time</Text>
</View>  

     
 
 <View style={[styles.searchContainer]}>
 

        <TextInput placeholderTextColor={'#7e7979'}
          style={styles.input}
          placeholder="Ask XDash AI anything..."
          value={query}
          id='myQuery'
          onChangeText={setQuery}          
        />
        <TouchableOpacity style={{width:50,xIndex:190,height:50,borderRadius:25,color:'white',borderWidth:1,
        justifyContent:'center',alignItems:'center' ,borderColor:'#5e5b5b',backgroundColor:'black'}}
          onPress={() => { navigation.navigate('Search',{xquery:query} ) } } >

          <SvgArrowRight style={{width: 24, zIndex:90,height: 24,color:'white'}} />
        
        </TouchableOpacity>
        
      </View>
   

             

{ topthreeloaded && !clicked &&
<View style={[styles.mainViewStyle, styles.pullLower]} >


{(topthreeloaded && !clicked) && topthree.map((item, index) => { 
          return (
<TouchableOpacity onPress={()=> { navigation.navigate('Search',{ xquery:item.querytext}) }} style={{borderWidth:1,alignSelf:'center',borderColor:'#5e5b5b',borderRadius:15,padding:5,marginBottom:5,}} key={index} >
  <Text style={{fontSize:13,color:'#7e7979',fontWeight:700,fontFamily:'Quicksand-SemiBold'}} >{item.querytext}</Text>
</TouchableOpacity>
        )})}



</View>
}


</View>




  );
};
export default LandingScreen;


const cstyles = StyleSheet.create({
  container: {
    flex: 1,flexGrow:1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    maxHeight: 0,
    maxWidth: 0,
        backgroundColor: '#F5FCFF',
  },
   ccontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 50,
    maxWidth: '95%',
    backgroundColor: '#F5FCFF',
  },
});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
   spinnerTextStyle: {
    color: '#000'
  },
  itemContainer:{

    backgroundColor:'#232222',
    borderRadius:20,marginTop:10,marginBottom:5,
    padding:10,
  },
  searchContainer: {
    flexDirection: 'row',
    zIndex:90,
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor:'#000000'
  },
  bgTransparent:{
    backgroundColor:'transparent',
  },
mainViewStyle: {

display:'flex',
backgroundColor:'#000000',
color:'#ffffff',
justifyContent:'center',
alignSelf:'flex-start',
width:Dimensions.get('window').width-50,
alignItems:'center',
paddingTop:10,
paddingBottom:10
},
  pullHigher: {
    marginTop:-62,
  },
pullNone: {
    paddingBottom:30,
  },
 pullLower: {
    paddingBottom:400,
  },
  itemName: {
    color:'white',
fontFamily:'Quicksand-Regular',
    fontSize:14,
  },
  itemSnippet: {
    color:'white',
    fontSize:11,
    fontFamily:'Quicksand-Light'
  },
  itemUrl: {color: '#7e7979',fontSize:16,fontFamily:'Quicksand-Regular',
alignSelf:'flex-start',justifyContent:'flex-start',marginLeft: 'auto'},

  input: {
    flex: 1,
    borderColor: '#5e5b5b',
    borderWidth: 1,
    fontFamily:'Quicksand-Light',
    borderRadius: 25,
    paddingHorizontal: 8,
    backgroundColor:'black',
    marginRight: 3,
    marginLeft: 2,    
    color:'white',
    zIndex:90,
  },
  resultsContainer: {
    flex: 1,marginBottom:50,
    marginTop:80,
    height:250,
  },
  resultItem: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  resultText:{
    color:'white'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
   indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginTop:-57,
  },
  indicator: {},
  indicatorText: {
    fontSize: 18,
    color:'#f5f5f5',
    marginTop: 12,
  },
});





