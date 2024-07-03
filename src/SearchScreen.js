import React, { Fragment, useRef,useState,useEffect,useCallback } from 'react';

import {  
  SafeAreaView,Linking,StyleSheet,TextInput,Button,ScrollView,
  Text,Image,Platform,View,ActivityIndicator,FlatList,TouchableOpacity,
  Animated, Dimensions, Easing, Keyboard, LogBox
} from 'react-native';


import { WebView } from 'react-native-webview';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import SvgArrowRight from './svgComponents/SvgArrowRight';
import SvgAnswerIcon from './svgComponents/SvgAnswerIcon';
import MenuIcon from './svgComponents/MenuIcon';

import Prism from "prismjs";
import destr from 'destr';
import { topQueries } from './topQueries';
import {save_history_item_to_async_storage,remove_history_items_from_async_storage}  from './utils/utils';

import Clipboard from '@react-native-community/clipboard';

const SearchScreen = ({ navigation}) => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const [resultsloaded, setResultsLoaded] = useState(false); 
  const [results2, setResults2] = useState([]);
  const [results2Loaded,setResults2Loaded] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [relatedQuestionsLoaded, setRelatedQuestionsLoaded] = useState(false);
  const [loading,setLoading] = useState(false);

  const [question, setQuestion] = useState('');
const webViewRef = useRef();


const origmarkRef = useRef();


const [copyclicked,setCopyClicked] = useState(false);


const [relatedContent,setRelatedContent] = useState('');
const [sourcesContent,setSourcesContent] = useState('');
const [answerContent,setAnswerContent] = useState('');

const [showloading, setShowLoading] = useState(false);

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
  

const loadHtml = () => { 

let myhstr =`<!DOCTYPE html>
  <html lang="en" data-bs-theme="dark">
  <head>
    
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
   <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>
<script src="https://use.fontawesome.com/c6435311fd.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism-okaidia.min.css" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/line-numbers/prism-line-numbers.min.css"></link>    
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand">
    
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />

  <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>

    <style>
          body { background-color: black; color: white;margin:0 auto; 
          font-size: 90%;font-family:Quicksand; }
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
  transition: color .5s ease;
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

.modal {
  width:100% !important;
  max-width:100% !important;
  border-width:7px;
  border-color:rgb(113 113 122);
  border-radius:20px;
  border-style:solid;
}

.qheader {
    background-color:#d3d3d3;
    padding: 2px;
    cursor: pointer;
    font-weight: bold;
    background-color:  rgb(39 39 42);
    color:rgb(161 161 170);
}
#answer {
    display: none;
    padding : 5px;
}
      </style>

 
  </head>

  <body class="line-numbers" style="font-size: 50px">
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0&appId=1169474053825828" nonce="qRM9RQDb"></script>

<div style='margin-left:10px;justify-content:flex-start;align-items:center;display:flex;flex-direction:row;width:100%;height:70px;'>
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot "><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
&nbsp;<h2 class='display-2 fw-bold'>Answer</h2></div><br/>  

<div class="qheader"> <p style="font-size:40px;">`+ question +`
<i class="fa fa-angle-down" style="float:right;" data-toggle="collapse" href="#collapse1" class="collapsed" aria-expanded="false"></i>
</p></div> 
 
 <div id="answer" class="line-numbers">`;


if (answerContent === '') {
  myhstr += `<dotlottie-player src="https://lottie.host/7e5fa803-37fa-49e7-b2ac-fb914ab89fb3/QOgqPILnK3.json" background="transparent" speed="1" style="width: 300px; height: 300px;" direction="1" playMode="normal" loop autoplay></dotlottie-player>`;
}

else myhstr += answerContent;

//
//</span>
myhstr += `</div><br>
<span id="mysharebtn" class="fb-share-button" data-href="https://xdash.ai" data-layout="" data-size="" style="float:left;margin-left:20px;background-color:black;">
<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="share" class="svg-inline--fa fa-share fa-fw fa-1x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><path fill="currentColor" d="M27 22.5H18a13.5 13.5 0 0 0 -13.012 9.89 15 15 0 0 1 -0.488 -3.89 12 12 0 0 1 12 -12h12.75c1.246 0 2.25 -1.004 2.25 -2.25V9.366l11.26 10.134 -11.26 10.134v-4.884c0 -1.246 -1.004 -2.25 -2.25 -2.25zm0 4.5v6c0 1.182 0.694 2.26 1.782 2.738s2.344 0.282 3.224 -0.506l15 -13.5c0.628 -0.572 0.994 -1.378 0.994 -2.232s-0.356 -1.66 -0.994 -2.232l-15 -13.5c-0.882 -0.796 -2.146 -0.994 -3.224 -0.506S27 4.818 27 6v6H16.5A16.5 16.5 0 0 0 0 28.5c0 7.312 3.618 11.832 6.44 14.26 0.384 0.328 0.76 0.618 1.096 0.872 0.3 0.224 0.582 0.412 0.834 0.582 0.422 0.282 0.778 0.478 1.012 0.61s0.496 0.178 0.76 0.178a1.85 1.85 0 0 0 1.846 -1.846c0 -0.638 -0.338 -1.238 -0.778 -1.696l-0.132 -0.132a6 6 0 0 1 -0.722 -0.806 6 6 0 0 1 -0.468 -0.74c-0.496 -0.91 -0.89 -2.146 -0.89 -3.768 0 -4.968 4.032 -9 9 -9h9z"/></svg>
<a style="text-decoration:none;color:white;" onClick="shareOnFacebook()" target="_blank" href="#" class="fb-xfbml-parse-ignore">Share</a>
</span>
<span id="mycopybtn" style="float:right;background-color:black;margin-right:20px;">
<svg class="icon" viewBox="0 0 384 512" width="32pt" height="32pt" fill="#c5c8c6"><path d="M280 240H168c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0 96H168c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 232c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 48c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm144 408c0 4.4-3.6 8-8 8H56c-4.4 0-8-3.6-8-8V120c0-4.4 3.6-8 8-8h40v32c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16v-32h40c4.4 0 8 3.6 8 8v336z"></path></svg>
<span id="mysharebtnspan" style="font-size:32px;"></span></span><br/>
<hr style="background-color:rgb(71 85 105);"/>
<br><div style='margin-left:10px;justify-content:flex-start;align-items:center;display:flex;flex-direction:row;width:100%;height:70px;'>
<svg xmlns="http://www.w3.org/2000/svg" width="50" 
height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text "><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 
0V5a2 2 0 1 0-4 0v3h4"></path><path d="M19 17V5a2 2 0 0 0-2-2H4"></path><path d="M15 8h-5"></path><path d="M15 12h-5"></path>
</svg>&nbsp;<h2 class='display-2 fw-bold'>Sources</h2></div><br/>

<div id="sources" style="display:block;width:100%;">`;



if (sourcesContent === '') {
  myhstr += `<dotlottie-player src="https://lottie.host/7e5fa803-37fa-49e7-b2ac-fb914ab89fb3/QOgqPILnK3.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="normal" loop autoplay></dotlottie-player>`;
}

else myhstr += sourcesContent;


myhstr +=`</div>
 <br><div style='margin-left:10px;justify-content:flex-start;align-items:center;display:flex;flex-direction:row;width:100%;height:70px;'>
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square "><path d="M12 6V2H8"></path><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"></path><path d="M2 12h2"></path><path d="M9 11v2"></path><path d="M15 11v2"></path><path d="M20 12h2"></path></svg>
&nbsp;<h2 class='display-2 fw-bold'>Related</h2></div>

<div id="related" style="display:block;width:100%;">`;

if (relatedContent === '') {
  myhstr += `<dotlottie-player src="https://lottie.host/7e5fa803-37fa-49e7-b2ac-fb914ab89fb3/QOgqPILnK3.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="normal" loop autoplay></dotlottie-player>`;
}

else myhstr += relatedContent;

myhstr +=  `</div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/line-numbers/prism-line-numbers.js"></script>
    



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

function sendMessageToRN = (message: Message) => {
  window.ReactNativeWebView.postMessage(message);
}

    });
  </script>


<script>
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

  </html>`;

 return myhstr;

}


const lottieplayertag = () => {

return `<dotlottie-player src="https://lottie.host/7e5fa803-37fa-49e7-b2ac-fb914ab89fb3/QOgqPILnK3.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="normal" loop autoplay></dotlottie-player>`;


}


const getStreamData2 = (myqry) => {
  
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
          alert('returnedFROMserver>>'+str);
          setTimeout(function () {
          window.ReactNativeWebView.postMessage(JSON.stringify({type: "updateHtml" ,query:'${newqry}' ,queryResponse : str}));         
           }, 1000)
      }

    })();    
    `;

//window.ReactNativeWebView.postMessage

    webViewRef?.current?.injectJavaScript(injectScript);
    setQuery('');
  //  webViewRef?.current?.reload();
  };



const getStreamData = async (myqry) => {

console.log('q pass==',myqry);
let newqry = myqry?.replace("'",'');
console.log('newqry',newqry);

setQuestion(newqry);

try {

const response = await fetch('http://192.168.100.83:5000/queryXdashApi', { method: 'POST',
          headers: {
          'Content-Type': 'application/json',  
          responseType: 'stream',
         }, 
      body:JSON.stringify({query: newqry }),
      reactNative: { textStreaming: true } });


/*
  .then(response => response.body)
  .then(stream => { res.write('mystream');})
*/

const rbody = await response.text();

console.log('FINAL-OUPUT',rbody);

 let aum = destr(rbody);

        setRelatedContent(aum[2].text);
        setSourcesContent(aum[1].text);
        setAnswerContent(aum[0].text);





        origmarkRef.current = aum[3].text;
        aum.splice(3, 1);
        setShowLoading(false);
        console.log('saving history',aum);
        saveHistoryItem(myqry,aum);

}
catch(e) {
console.log('error while fetching data',e);
}


}






const testJsInject = () => {



}




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
        outputRange: [0, Dimensions.get('window').height - 175],
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
      const message = destr(data);
     // console.log('my-message-received',message);

console.log('my-message-type==>>',message.type);


      if (message.type === 'paragraphClick' && message.text) {
             handleParagraphClick(message.text);
      }
      else if (message.type === 'updateHtml'  ) {
     
       try {


        let aum = destr(message.queryResponse);
console.log('message',message.queryResponse);
console.log('destryields',aum[0].text);

        setRelatedContent(aum[2].text);
        setSourcesContent(aum[1].text);
        setAnswerContent(aum[0].text);


        origmarkRef.current = aum[3].text;
        setShowLoading(false);
        saveHistoryItem(message.query,aum[3].text);
      //  webViewRef?.current.reload();
      	}
       

      	catch (e) { console.log('save history async store error',e); alert('Internal error - '+e)}

      }
      
      else if (message.type === 'copyClick'  ) {


    if (origmarkRef.current) Clipboard.setString(origmarkRef.current);
    console.log('copied now!');


                  
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

const saveHistoryItem = (q,qr) => {
  console.log('saving history333',q);
  try {
  save_history_item_to_async_storage(JSON.stringify({query:q,queryResponse:qr},['query','queryResponse','type','text']));
} catch (e) { console.log('error saving history',e);}

}
      
 const handleParagraphClick = (text) => {
    // Function to handle the paragraph click
    //console.log('Paragraph clicked', `Text: ${text}`);
       setAnswerContent('');setSourcesContent('');setRelatedContent('');
    setLoading(false);
    setHtmlStringLoaded(true);
    let newq = text.replace("'",'') ;
    setQuery(newq); 
    //console.log('newq=',newq);
    sleep(800).then(() => { getStreamData(newq); });
  //  webViewRef?.current.reload();
  };

 const injectedJavaScript =  `(
function() {
      document.getElementById('related').addEventListener('click', function(event) {
        const element = event.target;
        if (element.tagName === 'P') {
         event.preventDefault(); 
         window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'paragraphClick', text: element.innerText }));
        }
      });
      document.getElementById('mysharebtn').addEventListener('click', function(event) {
        const element = event.target;
         event.preventDefault(); 
         window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'shareClick', text: 'my post contents...' }));      
      });
      document.getElementById('mycopybtn').addEventListener('click', function(event) {
         event.preventDefault(); 
         window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'copyClick', text: 'spoof' })); 
      });
    })();
  `;
     


function displaySpinner() {
  return (
     <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" style={styles.indicator}/>
      <Text style={styles.indicatorText}>Loading response...</Text>
    </View>
  );
}


  return (
   <View style={{flex:1,display:'flex',height:Dimensions.get('window').height+100}} >

<View style={{backgroundColor:'#000',height:clicked?35:'30%'}} >
<MenuIcon onPress={()=> navigation.openDrawer() } style={{position:'absolute',left:7,top:10, width: 22, height: 22,marginLeft:10,marginTop:8}} />  
</View>

   	 <View style={{paddingTop:30,display:'flex',flexDirection:'row',justifyContent:'center',alignSelf:'center',paddingTop:10,paddingBottom:5,backgroundColor:'black',width:'100%'}} >
<Text style={{marginBottom:4,textAlign:'center',alignSelf:'center',color:'white',fontSize:23,fontFamily:'Quicksand-SemiBold'}} >xdash ai</Text>
</View>

<View style={{backgroundColor:'#000'}} >
<Text style={{marginBottom:10,textAlign:'center',alignSelf:'center',color:'white',fontSize:16,fontFamily:'Quicksand-Light'}} >Optimize Your Productivity & Time</Text>
</View>  

      <Animated.View style={[styles.searchContainer,{ transform: [{ translateY }] }]}>
 

        <TextInput placeholderTextColor={'#7e7979'}
          style={styles.input}
          placeholder="Ask XDash AI anything..."
          value={query}
          id='myQuery'
          onChangeText={setQuery}
          onFocus={() => startAnimation2(isTop ? 0 : 1)}
        />
        <TouchableOpacity style={{width:50,xIndex:190,height:50,borderRadius:25,color:'white',borderWidth:1,
        justifyContent:'center',alignItems:'center' ,borderColor:'#5e5b5b',backgroundColor:'black'}}
          onPress={() => { setAnswerContent('');setSourcesContent('');setRelatedContent('');   loadHtml(); setHtmlStringLoaded(true);setLoading(false); startAnimation(isTop ? 1 : 0); sleep(300).then(() => { getStreamData(query); }); setClicked(true);Keyboard.dismiss(); } } >

          <SvgArrowRight style={{width: 24, zIndex:90,height: 24,color:'white'}} />
        
        </TouchableOpacity>
        
      </Animated.View>
    

             

{ topthreeloaded && !clicked &&
<View style={[styles.mainViewStyle, styles.pullLower]} >


{(topthreeloaded && !clicked) && topthree.map((item, index) => { 
          return (
<TouchableOpacity onPress={()=> {setShowLoading(true); setHtmlStringLoaded(true); startAnimation(isTop ? 1 : 0);setClicked(true);setLoading(true);sleep(800).then(() => { getStreamData(item.querytext); }); }} style={{borderWidth:1,alignSelf:'center',borderColor:'#5e5b5b',borderRadius:15,padding:5,marginBottom:5,}} key={index} >
  <Text style={{fontSize:13,color:'#7e7979',fontFamily:'Quicksand-SemiBold'}} >{item.querytext}</Text>
</TouchableOpacity>
        )})}



</View>
}

<View style={{flex:1,marginTop:-73,marginBottom:-70}} >
{ htmlStringLoaded && (

<WebView  ref={(ref) => webViewRef.current = ref}
          originWhitelist={['*']}
          source={{ html: loadHtml() }}
            scalesPageToFit={true}
            startInLoadingState={true}
            injectedJavaScript={injectedJavaScript}             
         onMessage={handleMessage}
         javaScriptEnabled={true}
         allowFileAccess={true}
         renderLoading={() => {  displaySpinner(); }}
          domStorageEnabled={true}
          style={{flexGrow:1,width:Dimensions.get('window').width,height:Dimensions.get('window').height,marginTop:2,paddingTop:5,marginBottom:100,fontSize:15}}        
></WebView>

        )}
     
 </View>
</View>

  );
};
export default SearchScreen;


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
