import React, { Fragment, useRef,useState,useEffect,useCallback } from 'react';

import {  
  SafeAreaView,Linking,StyleSheet,TextInput,Button,ScrollView,
  Text,Image,Platform,View,ActivityIndicator,FlatList,TouchableOpacity,
  Animated, Dimensions, Easing, Keyboard, LogBox,KeyboardAvoidingView
} from 'react-native';

import { WebView } from 'react-native-webview';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import markdownit from 'markdown-it';

import SvgArrowRight from './svgComponents/SvgArrowRight';
import SvgAnswerIcon from './svgComponents/SvgAnswerIcon';
import MenuIcon from './svgComponents/MenuIcon';
import { useIsFocused } from "@react-navigation/native";
import Prism from "prismjs";

import { topQueries } from './topQueries';
import {save_history_item_to_async_storage,remove_history_items_from_async_storage}  from './utils/utils';
import destr from 'destr';

const HistoryScreen = ({route, navigation}) => {

  // const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const [resultsloaded, setResultsLoaded] = useState(false); 
  const [results2, setResults2] = useState([]);
  const [results2Loaded,setResults2Loaded] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [relatedQuestionsLoaded, setRelatedQuestionsLoaded] = useState(false);
  const [loading,setLoading] = useState(false);

let {query} = route.params;
let {queryResponse} = route.params;
//{query, queryResponse}  = ;

console.log('route-params',route.params);

console.log('passedQuery',query);



const webViewRef = useRef();
let isFocused = false;
//useIsFocused();

const answerRef = React.createRef();
const sourcesRef = React.createRef();
const relatedRef = React.createRef();


const [webViewHeight, setWebViewHeight] = useState(0);
const [htmlString, setHtmlString] = useState('');
const [htmlStringLoaded,setHtmlStringLoaded] = useState(false);

const [topthree,setTopThree] = useState([]);
const [topthreeloaded,setTopThreeLoaded] = useState(false);

const [myquery, setMyQuery] = useState('');


  const [clicked,setClicked] = useState(false);

//  const animatedValue = useRef(new Animated.Value(0)).current;

    const [isTop, setIsTop] = useState(true);

isFocused = !!isFocused;


useEffect(() => {


async function initstr() {

try {

let  qrr = JSON.parse(queryResponse);
console.log('PARSED-QRR==',qrr);

//setResults(qrr[0].text);
//setResultsLoaded(true);

//setResults2(qrr[1].text);
//setRelatedQuestions(qrr[2].text);

//setRelatedQuestionsLoaded(true);
// setResults2Loaded(true);
//<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism-okaidia.min.css" rel="stylesheet" />

//let hstr = '';
//  str = md2.render(results);
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-darcula.min.css" integrity="sha512-K5Xw18pkHMgNX5vlIERxh6YIuU6AiTUUE+yXZAartEQi5dWOjnoVjldVw9hU60zbgxz/Hh/JR9gJ49xf+LG0Cw==" crossorigin="anonymous" referrerpolicy="no-referrer" />


let hstr = `
<!DOCTYPE html>
  <html lang="en" data-bs-theme="dark">
  <head>
    
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
   <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>

    <script src="https://use.fontawesome.com/c6435311fd.js"></script>

<link rel="stylesheet" href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/line-numbers/prism-line-numbers.min.css"></link>    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand">

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />



    <style>
          body { background-color: black; color: white;margin:0 auto; margin-bottom:60;bg-color:'#000000';
          font-size: 80%;font-family:Quicksand; }
          p {margin-left:5px;}
          pre {margin-left:5px;}
         h1 {font-size:60px;}   
          h2 {font-size:50px;}   
          h3 {font-size:40px;}  
          h4 {font-size:30px;}  

code[class*="language-"],
pre[class*="language-"] {
  font-size: 90%;font-family:Quicksand
}

.ag-format-container {
  width: 1100x;
  margin: 0 auto;
  flex-direction:'row';
  align-items:'flex-start';
  justify-content:'flex-start';
  flex-wrap: wrap;
}

.ag-courses_box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;

  padding: 50px 0;
}
.ag-courses_item {
  -ms-flex-preferred-size: calc(33.33333% - 30px);
  flex-basis: calc(33.3333% - 30px);

  margin: 0 15px 30px;

  overflow: hidden;

  border-radius: 28px;
}
.ag-courses-item_link {
  display: block;
  padding: 30px 20px;
  background-color: #121212;

  overflow: hidden;

  position: relative;
}
.ag-courses-item_link:hover,
.ag-courses-item_link:hover .ag-courses-item_date {
  text-decoration: none;
  color: #FFF;
}

.ag-courses-item_title {
  min-height: 87px;
  margin: 0 0 25px;

  overflow: hidden;

  font-weight: bold;
  font-size: 30px;
  color: #FFF;

  z-index: 2;
  position: relative;
}
.ag-courses-item_date-box {
  font-size: 18px;
  color: #FFF;

  z-index: 2;
  position: relative;
}
.ag-courses-item_date {
  font-weight: bold;
  color: #f9b234;

  -webkit-transition: color .5s ease;
  -o-transition: color .5s ease;
  transition: color .5s ease
}

@media only screen and (max-width: 979px) {
  .ag-courses_item {
    -ms-flex-preferred-size: calc(50% - 30px);
    flex-basis: calc(50% - 30px);
  }
  .ag-courses-item_title {
    font-size: 24px;
  }
}

@media only screen and (max-width: 767px) {
  .ag-format-container {
    width: 96%;
  }

}
@media only screen and (max-width: 639px) {
  .ag-courses_item {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
  }
  .ag-courses-item_title {
    min-height: 72px;
    line-height: 1;

    font-size: 24px;
  }
  .ag-courses-item_link {
    padding: 22px 40px;
  }
  .ag-courses-item_date-box {
    font-size: 16px;
  }
}

  

.modal {
  width:100% !important;
  max-width:100% !important;
  border-width:7px;
  border-color:rgb(113 113 122);
  border-radius:20px;
  border-style:solid;
}


.qheader {
    padding: 2px;
    cursor: pointer;
    font-weight: bold;
    clear:both;
    background-color: '#000';
    color:'#fff';

}
#answer {
    display: block;
    padding : 5px;
}
.close-modal {
  width: 50px !important;
  height: 50px !important;
  margin-top:10px;
  margin-right:10px;
}

        </style>



  </head>
  <body class="line-numbers" style="font-size: 50px">
  <div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0&appId=1169474053825828" nonce="qRM9RQDb"></script>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Function to send message to React Native
      function sendMessageToReactNative(message) {
        window.ReactNativeWebView.postMessage(message);
      }

      // Example of sending a message to React Native
    //  sendMessageToReactNative('Hello from the Web!');

      // Function to handle messages from React Native
      window.ReactNativeWebView.onMessage = function(event) {
        alert('Message from React Native: ' + event.data);
      };


type Message = { action: string; payload: any };

const sendMessageToRN = (message: Message) => {
  window.ReactNativeWebView.postMessage(JSON.stringify(message);
}



    });
  </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/line-numbers/prism-line-numbers.js"></script>





<div class="qheader"> <p style="font-size:50px;font-family:'Quicksand-SemiBold';">`
+
query.substring(0,100)
+
`<i class="fa fa-angle-down" style="float:right;" data-toggle="collapse" href="#collapse1" class="collapsed" aria-expanded="false"></i>
</p></div><div>`+ query.substring(150,query.length) +`</div> 


<div style='margin-left:10px;justify-content:flex-start;align-items:center;display:flex;flex-direction:row;width:100%;height:70px;'>
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot "><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
<h3 class='display-2 fw-bold'>&nbsp;Answer</h3></div>  

<div class="answer">`; 


if (qrr[0].text === '' || qrr[0].text === 'undefined')  {
  hstr += `<dotlottie-player src="https://lottie.host/7e5fa803-37fa-49e7-b2ac-fb914ab89fb3/QOgqPILnK3.json" background="transparent" speed="1" style="width: 300px; height: 300px;" direction="1" playMode="normal" loop autoplay></dotlottie-player>`;
}

else hstr += qrr[0].text;


hstr += `</div><br><br><div style='margin-left:10px;justify-content:flex-start;align-items:center;display:flex;flex-direction:row;width:100%;height:70px;'><svg xmlns="http://www.w3.org/2000/svg" width="50" 
height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text "><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 
0V5a2 2 0 1 0-4 0v3h4"></path><path d="M19 17V5a2 2 0 0 0-2-2H4"></path><path d="M15 8h-5"></path><path d="M15 12h-5"></path></svg>&nbsp;<h3 class='display-2 fw-bold'>Sources</h3></div><br/>`;


if (qrr[1].text === '' || qrr[1].text === 'undefined')  {
  hstr += `<dotlottie-player src="https://lottie.host/7e5fa803-37fa-49e7-b2ac-fb914ab89fb3/QOgqPILnK3.json" background="transparent" speed="1" style="width: 300px; height: 300px;" direction="1" playMode="normal" loop autoplay></dotlottie-player>`;
}

else hstr += qrr[1].text;


 hstr += `<hr style='height:5px'><br><div style='margin-left:10px;justify-content:flex-start;align-items:center;display:flex;flex-direction:row;width:100%;height:70px;'>
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square "><path d="M12 6V2H8"></path><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"></path><path d="M2 12h2"></path><path d="M9 11v2"></path><path d="M15 11v2"></path><path d="M20 12h2"></path></svg>
&nbsp;<h3 class='display-2 fw-bold'>Related</h3></div>
`;

if (qrr[2].text === '' || qrr[2].text === 'undefined')  {
  hstr += `<dotlottie-player src="https://lottie.host/7e5fa803-37fa-49e7-b2ac-fb914ab89fb3/QOgqPILnK3.json" background="transparent" speed="1" style="width: 300px; height: 300px;" direction="1" playMode="normal" loop autoplay></dotlottie-player>`;
}

else hstr += qrr[2].text;


 hstr += `<script>
$( document ).ready(function() {
  
  $("#mycopybtn").click(function(){
      $("#mysharebtnspan").text('copied!');
          setTimeout(function(){
              $('#mysharebtnspan').text('');
          }, 2000);


  });

$(".qheader").click(function () {

    $header = $(this);
    //getting the next element
    $content = $header.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(500, function () {
        //execute this after slideToggle is done
        //change text of header based on visibility of content div
        $header.text(function () {
            //change text based on condition
          //  return $content.is(":visible") ? "Collapse" : "Expand";
        });
    });

});

$(".fa").on("click",function(){
   $(this).toggleClass("fa-angle-up");
   $(this).toggleClass("fa-angle-down");
});

  console.log( "ready!" );
  FB.init({
 appId: 'YOUR_APP_ID',
 version: 'v10.0',
});

});

function shareOnFacebook() {
 FB.ui({
 method: 'share',
 href: 'https://www.xdash.ai',
 }, function(response){});
}

</script>  

</body>
  </html>` ;
setHtmlString(hstr); 
setHtmlStringLoaded(true);

  }

catch(e) {console.log('error parsing--',e)}



}

initstr();
}, [isFocused,query,queryResponse,htmlString,htmlStringLoaded]);


 function LoadingIndicatorView() {
  console.log('loading webbview...');
    return <ActivityIndicator color='#009b88' size='large' />
  }

    
onWebViewMessage = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  const sendMessageToWeb = () => {
    const script = `window.postMessage('Hello from React Native!')`;
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(script);
    }
  };


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 const handleMessage = useCallback((event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;


       // Assuming the data is a JSON string containing the paragraph text
    console.log('my-message-received222222',data);
    try {
      const message = JSON.parse(data);
     // console.log('my-message-received',message);

console.log('my-message-type==>>',message.type);


      if (message.type === 'paragraphClick' && message.text) {
        handleParagraphClick(message.text);
      }
      else if (message.type === 'updateHtml'  ) {
        //setHtmlString(...htmlString,htmlString+message.text);
    //  answer.current.innerHTML = message.text;
      	try {

      	save_history_item_to_async_storage(JSON.stringify({query:message.query,queryResponse:message.queryResponse},['query','queryResponse','type','text']));		

      	}
       
      	catch (e) { console.log('save history async store error',e);}


    //   console.log('RECEIVED-->',message.queryResponse);
        setHtmlStringLoaded(true);
       //  webViewRef?.current.reload();
      }
      
      else if (message.type === 'updateAnswer'  ) {

          console.log('UPDATEDANSWER//',message.text);
          answerRef.current.innerHTML = message.text;

      }  
      else if (message.type === 'dimensions' && message.text) {
            const { height } = message;
            setWebViewHeight(height);
            console.log('webview-HEIGHT==',height);
            console.log('webview-HEIGHTmessage==',message);
      }
    } catch (error) {
      console.error('Failed to parse message from WebView:', error);
    }
  },[]) ;


      
 const handleParagraphClick = (text) => {
    // Function to handle the paragraph click
    console.log('Paragraph clicked', `Text: ${text}`);
    setLoading(false);
    setHtmlStringLoaded(true);
    let newq = text.replace("'",'') ;
   // setQuery(newq); 
    console.log('newq=',newq);
    //getStreamData(newq); 
    navigation.navigate('Search',{xquery:newq} );
    webViewRef?.current.reload();
  };

 const injectedJavaScript = `
    (function() {
      document.getElementById('related').addEventListener('click', function(event) {
        const element = event.target;
        if (element.tagName === 'P') {
         event.preventDefault(); 
         window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'paragraphClick', text: element.innerText }));
        }
      });
    })();
  `;
//injectedJavaScript={injectedJavaScript} 
  /*

{htmlStringLoaded && <View style={{display:'flex',marginTop:0,width:'100%',flexDirection:'row',backgroundColor:'black',alignSelf:'flex-start',alignItems:'center',justifyContent:'flex-start'}} >
<SvgAnswerIcon style={{width: 24, height: 24,color:'white'}} />

  <Text style={{color:'white',fontWeight:'normal',fontSize:32}} >Answer</Text>   
  
</View> }
  */

function displaySpinner() {
  return (
     <View style={[ styles.indicatorWrapper,{marginTop:-1000,flex:1,flexGrow:1}]}>
      <ActivityIndicator size="large" style={styles.indicator}/>
      <Text style={styles.indicatorText}>Loading response...</Text>
    </View>
  );
}

//setAnswerContent('');setSourcesContent('');setRelatedContent('');   loadHtml(); setHtmlStringLoaded(true);setLoading(false); setCurrQuery(query); setClicked(true);Keyboard.dismiss();

  return (

   <View style={{flex:1,marginTop:0}} >
   	
     <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignSelf:'center',paddingTop:10,paddingBottom:5,backgroundColor:'black',width:'100%'}} >
<MenuIcon onPress={()=> navigation.openDrawer() } style={{position:'absolute',left:7,top:7, width: 22, height: 22,marginLeft:10,marginTop:8}} />
<View style={{width:150,alignSelf:'center',marginTop:-5}} >
<Text style={{textAlign:'center',alignSelf:'center',color:'white',fontSize:23,fontFamily:'Quicksand-SemiBold'}} >xdash.ai</Text>
</View>
</View>      
      
<View style={{flex:1,marginTop:-4,marginBottom:-55}} >

{ htmlStringLoaded && (
      
<WebView  ref={(ref) => webViewRef.current = ref}
          originWhitelist={['*']}
          source={{  html: htmlString }}
          scalesPageToFit={true}
          startInLoadingState={true}                 
          onMessage={handleMessage}
          injectedJavaScript={injectedJavaScript} 
          javaScriptEnabled={true}
          renderLoading={() => displaySpinner() }
          domStorageEnabled={true}
          style={{flexGrow:1,height:600,marginTop:0,paddingTop:5,marginBottom:40,fontSize:15}}        
></WebView>

        )}
   
</View>
<KeyboardAvoidingView style={[styles.searchContainer ]} keyboardVerticalOffset={80} >
 

        <TextInput placeholderTextColor={'#7e7979'}
          style={styles.input}
          placeholder="Ask XDash AI anything..."
          value={myquery}
          id='myQuery'
          onChangeText={setMyQuery}          
        />
        <TouchableOpacity style={{width:50,xIndex:190,height:50,borderRadius:25,color:'white',borderWidth:1,
        justifyContent:'center',alignItems:'center' ,borderColor:'#5e5b5b',backgroundColor:'black'}}
          onPress={() => { navigation.navigate('Search',{xquery:myquery} )  } } >

          <SvgArrowRight style={{width: 24, zIndex:90,height: 24,color:'white'}} />
        
        </TouchableOpacity>
        
      </KeyboardAvoidingView>


 </View>


  );
};
export default HistoryScreen;


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
    marginTop:-5,
    paddingBottom: 10,
    backgroundColor:'#000000',
  },
  bgTransparent:{
    backgroundColor:'transparent',
  },
mainViewStyle: {

display:'flex',
backgroundColor:'#000000',
color:'#ffffff',
justifyContent:'center',
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
    paddingBottom:600,
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
