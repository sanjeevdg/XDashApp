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

const HistoryScreen = ({route, navigation}) => {

  // const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const [resultsloaded, setResultsLoaded] = useState(false); 
  const [results2, setResults2] = useState([]);
  const [results2Loaded,setResults2Loaded] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [relatedQuestionsLoaded, setRelatedQuestionsLoaded] = useState(false);
  const [loading,setLoading] = useState(false);


const {query, queryResponse}  = route.params;


console.log('route-params',route.params);

console.log('passedQuery',query);


const webViewRef = useRef();


const answerRef = React.createRef();
const sourcesRef = React.createRef();
const relatedRef = React.createRef();


const [webViewHeight, setWebViewHeight] = useState(0);
const [htmlString, setHtmlString] = useState('');
const [htmlStringLoaded,setHtmlStringLoaded] = useState(false);

const [topthree,setTopThree] = useState([]);
const [topthreeloaded,setTopThreeLoaded] = useState(false);

  const [clicked,setClicked] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

    const [isTop, setIsTop] = useState(true);


useEffect(() => {

async function clearStore() {
try {
await remove_history_items_from_async_storage();

}
catch(e) { console.log('error at clearstore',e);}

}
//clearStore();
}, []);


const md2 = markdownit({
    highlight(str, lang) {
    let hl;
//console.log('prism-langsfor jsx==',Prism.languages['javascript']);
    //lang !== 'markdown' &&
    try {
      if ( !(lang === 'undefined')   || (lang !== 'markdown')) {
        if(lang === 'jsx')  lang = 'javascript';
        if(lang === 'undefined') lang = 'javascript';
        if (lang === 'null') lang = 'javascript';
      hl = Prism.highlight(str, Prism.languages[lang]);
      }
    } catch (error) {
      console.error(error);
      hl = md2.utils.escapeHtml(str);
    }
console.log('transformed markdown==',hl);
console.log('language passed',lang);

    return `<pre class="line-numbers language-${lang}"><code class="language-${lang}">${hl}</code></pre>`;
  },
  typographer:true,
});




useEffect(() => {


console.log('qres',queryResponse);

let qrr = [];
try {
  qrr = destr(queryResponse);
}

catch(e) {console.log('error parsing--',e)}

console.log('PARSED-QRR==',qrr);

setResults(qrr[0].text);
setResultsLoaded(true);
//setResults2(JSON.parse(qrr[1].text));
setResults2Loaded(true);


//setRelatedQuestions(JSON.parse(qrr[2].text));
setRelatedQuestionsLoaded(true);

const myRelatedQuestions = () => {

 return qrr[2].text;
};


 const newSources = () => {
    return qrr[1].text;
};

let hstr = '';
if (resultsloaded){
//  str = md2.render(results);
hstr = `
<!DOCTYPE html>
  <html lang="en" data-bs-theme="dark">
  <head>
    
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
   <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>

    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism-okaidia.min.css" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/line-numbers/prism-line-numbers.min.css"></link>    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand">
    <style>
          body { background-color: black; color: white;margin:0 auto; margin-bottom:60;bg-color:'#000000';
          font-size: 80%;font-family:Quicksand; }
          p {margin-left:5px;}
          pre {margin-left:5px;}


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
   .ui-dialog {

    border-width:3px;
    border-style:solid;
    border-radius:30px;
    background: rgb(107 114 128);


 }

.rounded-corners .ui-corner-all {
    border-radius: 30px;
    color: rgb(107 114 128);
}

.ui-widget-header {
    background: rgb(107 114 128);
    font-weight: normal;
}

.ui-widget-header .ui-button {
    width: 50px;
    height: 50px;
}


.close-resize .ui-dialog-titlebar-close .ui-icon-closethick {
  width: 50px !important;
    height: 50px !important;

}
 
 
.ui-icon-closethick {
  -ms-transform: scale(2); /* IE 9 */
  -webkit-transform: scale(2); /* Chrome, Safari, Opera */
  transform: scale(2);
}
  

        </style>



  </head>
  <body class="line-numbers" style="font-size: 50px">
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
 ` + results  + `<br><br><div style='margin-left:10px;justify-content:flex-start;align-items:center;display:flex;flex-direction:row;width:100%;height:70px;'><svg xmlns="http://www.w3.org/2000/svg" width="50" 
height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text "><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 
0V5a2 2 0 1 0-4 0v3h4"></path><path d="M19 17V5a2 2 0 0 0-2-2H4"></path><path d="M15 8h-5"></path><path d="M15 12h-5"></path></svg>&nbsp;<h2 class='display-2 fw-bold'>Sources</h2></div><br/>`
 + newSources() + `<hr style='height:5px'><br><div style='margin-left:10px;justify-content:flex-start;align-items:center;display:flex;flex-direction:row;width:100%;height:70px;'>
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square "><path d="M12 6V2H8"></path><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"></path><path d="M2 12h2"></path><path d="M9 11v2"></path><path d="M15 11v2"></path><path d="M20 12h2"></path></svg>
&nbsp;<h2 class='display-2 fw-bold'>Related</h2></div>
` + myRelatedQuestions() +
  `</body>
  </html>
  ` ;
  
setHtmlString(hstr); 
setHtmlStringLoaded(true);


    

};

}, [query,results,resultsloaded,results2,results2Loaded,relatedQuestions,relatedQuestionsLoaded,htmlString,htmlStringLoaded]);


const getStreamData = (myqry) => {
  
  //setQuery('');
let newqry = myqry.replace("'",'');
console.log('newqry',newqry);

    const injectScript = `
    (async()=>{      
      const postMessage = window.ReactNativeWebView.postMessage;     
      const response = await fetch('http://192.168.100.83:5000/queryXdashApi', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',  
          responseType: 'stream',
         }, 
      body:JSON.stringify({query: '${newqry}' })
    });

      async function *streamAsyncIterable(stream) {
          const reader = stream.getReader()
          try {
              while (true) {
                  const {done, value} = await reader.read()
                  if (done) {
                      return
                  }
                  yield value
              }
          } finally {
              reader.releaseLock()
          }
      }

      for await(const chunk of streamAsyncIterable(response?.body)) {
          const str = new TextDecoder().decode(chunk);
        
      
      let jobj = [{type:'answer',text:''},{type:'sources',text:''},{type:'related',text:''}];
      //;
      
        try {
          jobj = JSON.parse(str);
      } catch (e) { alert('error parsing...'+str); }
        //alert('jobj='+jobj.type);



         if (jobj[0].type==='answer') {

          const answerjs = document.getElementById('answer').innerHTML=jobj[0].text;
          }
         if (jobj[1].type==='sources'){
          const sourcesjs = document.getElementById('sources').innerHTML=jobj[1].text;

          }
         if (jobj[2].type==='related'){
          const relatedjs = document.getElementById('related').innerHTML=jobj[2].text;
        }
         
         window.ReactNativeWebView.postMessage(JSON.stringify({type: "updateHtml" ,query:'${newqry}' ,queryResponse : str}));
      }
    })();    
    `;

    webViewRef?.current?.injectJavaScript(injectScript);
   // setQuery('');
  //  webViewRef?.current?.reload();
  };



 function LoadingIndicatorView() {
  console.log('loading webbview...');
    return <ActivityIndicator color='#009b88' size='large' />
  }

    const startAnimation = toValue => {
        Animated.timing(animatedValue, {
            toValue,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => {
          //  setIsTop(!isTop);

        })
    }
const startAnimation2 = toValue => {
        Animated.timing(animatedValue, {
            toValue,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => {
          //  setIsTop(!isTop);

        })
    }
    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Dimensions.get('window').height - 110],
        extrapolate: 'clamp'
    })


onWebViewMessage = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  const sendMessageToWeb = () => {
    const script = `window.postMessage('Hello from React Native!')`;
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(script);
    }
  };

useEffect(() => {

const pickRandomElements = (array, count) => {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
const mytopthree = pickRandomElements(topQueries, 3);
console.log('TOPTHERE==',mytopthree);
setTopThree(mytopthree);
setTopThreeLoaded(true);


}, [])

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
    sleep(500).then(() => { getStreamData(newq); });
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

function displaySpinner() {
  return (
     <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" style={styles.indicator}/>
      <Text style={styles.indicatorText}>Loading response...</Text>
    </View>
  );
}


  return (
   <React.Fragment >
   	 <View style={{paddingTop:300,display:'flex',flexDirection:'row',justifyContent:'center',alignSelf:'center',paddingTop:10,paddingBottom:5,backgroundColor:'black',width:'100%'}} >
<MenuIcon onPress={()=> navigation.openDrawer() } style={{position:'absolute',left:7,top:7, width: 22, height: 22,marginLeft:10,marginTop:8}} />
<Text style={{marginBottom:10,textAlign:'center',alignSelf:'center',color:'white',fontSize:23,fontFamily:'Quicksand-SemiBold'}} >xdash ai</Text>

</View>      
      

{htmlStringLoaded && <View style={{display:'flex',marginTop:-57,width:'100%',flexDirection:'row',backgroundColor:'black',alignSelf:'flex-start',alignItems:'center',justifyContent:'flex-start'}} >
<SvgAnswerIcon style={{width: 24, height: 24,color:'white'}} />

  <Text style={{color:'white',fontWeight:'normal',fontSize:32}} >Answer</Text>   
  
</View> }

{ htmlStringLoaded && (
      
<WebView  ref={(ref) => webViewRef.current = ref}
          originWhitelist={['*']}
          source={{  html: htmlString }}
          scalesPageToFit={true}
          startInLoadingState={true}                 
          onMessage={handleMessage}
          javaScriptEnabled={true}
          renderLoading={() => {  displaySpinner(); }}
          domStorageEnabled={true}
          style={{flexGrow:1,height:600,marginTop:0,paddingTop:5,marginBottom:40,fontSize:15}}        
></WebView>

        )}
       
 </React.Fragment>


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
