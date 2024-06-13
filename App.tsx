import React, { Fragment, useRef,useState,useEffect,useCallback } from 'react';

import {  
  SafeAreaView,Linking,StyleSheet,TextInput,Button,ScrollView,
  Text,Image,Platform,View,ActivityIndicator,FlatList,TouchableOpacity,
  Animated, Dimensions, Easing, Keyboard, LogBox
} from 'react-native';

import LottieSplashScreen from "react-native-lottie-splash-screen";
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';
import { WebView } from 'react-native-webview';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import SvgArrowRight from './svgComponents/SvgArrowRight';
//import SvgSourcesIcon from './svgComponents/SvgSourcesIcon';
import SvgAnswerIcon from './svgComponents/SvgAnswerIcon';
//import SvgRelatedIcon from './svgComponents/SvgRelatedIcon'; 

import RenderHtml from 'react-native-render-html';

import markdownit from 'markdown-it';
import myhljs from 'highlight.js/lib/core';
import highlightjs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import Prism from "prismjs";

import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Spinner from 'react-native-loading-spinner-overlay';

import { topQueries } from './topQueries';

const App = () => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const [resultsloaded, setResultsLoaded] = useState(false); 
  const [results2, setResults2] = useState([]);
  const [results2Loaded,setResults2Loaded] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [relatedQuestionsLoaded, setRelatedQuestionsLoaded] = useState(false);
  const [loading,setLoading] = useState(false);




const webViewRef = useRef();

const [webViewHeight, setWebViewHeight] = useState(0);
const [htmlString, setHtmlString] = useState('');
const [htmlStringLoaded,setHtmlStringLoaded] = useState(false);

const [topthree,setTopThree] = useState([]);
const [topthreeloaded,setTopThreeLoaded] = useState(false);

  const [clicked,setClicked] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

    const [isTop, setIsTop] = useState(true);


const onMessage = (event) => {
  setWebViewHeight(Number(event.nativeEvent.data));
}
const injectedJavaScript2=`
  window.ReactNativeWebView.postMessage(
    Math.max(document.body.offsetHeight, document.body.scrollHeight)
  )`;



  useEffect(() => {
    LottieSplashScreen.hide();
    LogBox.ignoreAllLogs();
  }, []);

//LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
//Ignore all log notifications

//style="background-color:#232222;border-radius:20px;margin-top:10px;margin-bottom:5px;padding:10;'
/*
useEffect(() => {

if (htmlStringLoaded) {
webViewRef?.current.reload();
console.log('executed reload for webview');

}


},[htmlStringLoaded,relatedQuestions,relatedQuestionsLoaded]);
*/

//<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    

/*

onclick=sendMessageToRN(`+{'myqry':relatedQuestions[index].question}+`)>

*/


useEffect(() => {

 
const myRelatedQuestions = () => {

let rqstr = '';
 if (relatedQuestionsLoaded) {

  for (let index=0;index<relatedQuestions.length;index++) {
        console.log('RQQQ==',relatedQuestions[index].question);
        rqstr += `<p>` + relatedQuestions[index].question + `</p><hr>`;
  }   
 }
 console.log('RQSTR=',rqstr);
  return rqstr;
};


const pickRandomElements = (array, count) => {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
const mytopthree = pickRandomElements(topQueries, 3);
console.log('TOPTHERE==',mytopthree);
setTopThree(mytopthree);
setTopThreeLoaded(true);

 const newSources = () => {



 let sstr = '<div class="ag-format-container"><div class="ag-courses_box">';
if (results2Loaded) { 
for (let index=0;index<results2.length;index++) {

//<a href="`+ results2[index].url +`" target="_blank" style="text-decoration: none">
//</a>

sstr += `<div class="ag-courses_item">
      <a href="` + results2[index].url + `" target="_blank" class="ag-courses-item_link">
               <div class="ag-courses-item_title">
    ` + results2[index].name +`</div>
<div class="ag-courses-item_date-box">
   <img style="position:relative;float:right;margin-right:10px;" width="40px" height="40px" 
 src="https://www.google.com/s2/favicons?domain=` + results2[index].url + `">
          <span class="ag-courses-item_date">
           `
 + (index+1) + " - " + new URL(results2[index].url).hostname +` 
          </span>
        </div>
      </a>
    </div>`;

}
sstr += `</div></div>`;
}
//console.log('SSTR=',sstr);
return sstr;
};

let hstr = '';
if (resultsloaded){
//  str = md2.render(results);
hstr = `
<!DOCTYPE html>
  <html lang="en" data-bs-theme="dark">
  <head>
    
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
    









        </style>

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

  </head>
  <body class="line-numbers" style="font-size: 50px">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/plugins/line-numbers/prism-line-numbers.js"></script>
 ` + md2.render(results)  + `<br><br><div style='margin-left:10px;justify-content:flex-start;align-items:center;display:flex;flex-direction:row;width:100%;height:70px;'><svg xmlns="http://www.w3.org/2000/svg" width="50" 
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

//,topthree,topthreeloaded



/*
//related.............


*/

//<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>


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
        outputRange: [0, Dimensions.get('window').height - 100],
        extrapolate: 'clamp'
    })
//const md = new MarkdownIt().use(highlightjs);

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
      setHtmlStringLoaded(true);
      }
    } catch (error) {
      console.error(error);
      hl = md2.utils.escapeHtml(str);
    }
console.log('transformed markdown==',hl);
console.log('language passed',lang);
setHtmlStringLoaded(true);
    return `<pre class="line-numbers language-${lang}"><code class="language-${lang}">${hl}</code></pre>`;
  },
  typographer:true,
});



const handleSearch = async () => {
/*
   let body = {
        "query": query,
        "search_uuid":createQueryHash2(query) ,    
        "visitor_uuid": "bcd25493385e2512be48176f9e1a58ed"
  }  
  console.log('body==',body);
*/
    try {
      
        console.log('my query is ',query);

        axios.post('https://www.xdash.ai/api/query',{ "query": query,
                                "search_uuid":createQueryHash2(query) ,    
            "visitor_uuid": "bcd25493385e2512be48176f9e1a58ed"}).then((response) => {
        setLoading(false);
        let ltdata  = response.data.substring(0,response.data.indexOf('__LLM_RESPONSE__'));
        let dtarr = JSON.parse(ltdata);
        setResults2(dtarr); 
        setResults2Loaded(true);  

        console.log('REPOSNSE',response.data);
        
        let ftdata  = response.data.substring(response.data.indexOf('__LLM_RESPONSE__')+16,response.data.indexOf('__RELATED_QUESTIONS__'));

        setResults(ftdata); 
        setResultsLoaded(true);


        let rqdata = response.data.substring(response.data.indexOf('__RELATED_QUESTIONS__')+21,response.data.length); 
        

        let rqarr = JSON.parse(rqdata);
        setRelatedQuestions(rqarr);
        setRelatedQuestionsLoaded(true);
    //    console.log('ftdata',ftdata);

        }, (error) => {
                        console.log('error=',error);
                      });
     
        } catch (error) {
              console.error('Error fetching data: ', error);
        }
  };

const handleSearch2 = async (qr,qrhs) => {


setHtmlString('');
setHtmlStringLoaded(false);
setResults2([]);
setResults2Loaded(false);
setResults('');
setResultsLoaded(false);
setRelatedQuestions([]);
setRelatedQuestionsLoaded(false);
setQuery('');


    let body = {
    "query": qr,
    "search_uuid": qrhs,    
    "visitor_uuid": "bcd25493385e2512be48176f9e1a58ed"
    }  
    console.log('body==',body);

        try {
      
            console.log('my query is ',qr);
                axios.post('https://www.xdash.ai/api/query',{ "query": qr,
                            "search_uuid":qrhs ,    
                  "visitor_uuid": "bcd25493385e2512be48176f9e1a58ed"}).then((response) => {

                         
                          let ltdata  = response.data.substring(0,response.data.indexOf('__LLM_RESPONSE__'));
                          let dtarr = JSON.parse(ltdata);
                          setResults2(dtarr);
                          setResults2Loaded(true);  
                          console.log('REPOSNSE',response.data);
                          let ftdata  = response.data.substring(response.data.indexOf('__LLM_RESPONSE__')+16,response.data.indexOf('__RELATED_QUESTIONS__'));
                          setResults(ftdata); 
                          let rqdata = response.data.substring(response.data.indexOf('__RELATED_QUESTIONS__')+21,response.data.length); 
                          setResultsLoaded(true);
                       //   console.log('rqdata=',rqdata);
                          let rqarr = JSON.parse(rqdata);
                          setRelatedQuestions(rqarr);
                          setRelatedQuestionsLoaded(true);
                          setLoading(false);
                      //    console.log('ftdata',ftdata);
              }, (error) => {
                          console.log('error',error);
                        });
     
              } catch (error) {
                          console.error('Error fetching data: ', error);
              }
  };


const createQueryHash2 = (qr) => {
    const fullHash = CryptoJS.SHA256(qr).toString(CryptoJS.enc.Hex);
    return fullHash.substring(0, 21);
};

const setQueryAndFetchResult = (q) => {

     /*
      setHtmlString('');
      setHtmlStringLoaded(false);
      setResults('');
      setResultsLoaded(false);
      setResults2([]);
      setResults2Loaded(false);
      setRelatedQuestions([]);
      setRelatedQuestionsLoaded(false);
      setLoading(true);
*/
      setQuery(q);
    
      console.log('myqr=='+q);
      handleSearch2(q,createQueryHash2(q));

} 


const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultText}>{item.name}</Text> 
      <Text style={styles.resultText}>{item.url}</Text> 
      <Text style={styles.resultText}>{item.snippet.substring(0,50)}</Text> 
    </View>
  );

onWebViewMessage = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  const sendMessageToWeb = () => {
    const script = `window.postMessage('Hello from React Native!')`;
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(script);
    }
  };


 const handleMessage = useCallback((event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;
    // Assuming the data is a JSON string containing the paragraph text
    console.log('my-message-received222222',data);
    try {
      const message = JSON.parse(data);
      console.log('my-message-received',message);
      if (message.type === 'paragraphClick' && message.text) {
        handleParagraphClick(message.text);
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
    setHtmlStringLoaded(false);
handleSearch2(`${text}`,createQueryHash2(text));

  };

 const injectedJavaScript = `
    (function() {
      document.addEventListener('click', function(event) {
        const element = event.target;
      //  alert('clicked'+element.tagName);
        if (element.tagName === 'P') {
         // alert('clicked222');
          event.preventDefault(); // Prevent any default behavior
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'paragraphClick', text: element.innerText }));
        }
      });
    })();
  `;



//{/* onPress={Keyboard.dismiss()}*/}


//renderLoading={() => {
  //      return displaySpinner();
   //   }}              
        



function displaySpinner() {
  return (
     <View>      
      <ActivityIndicator color='#009b88' size='large' />
    </View>
  );
}

//
//clicked? styles.pullHigher:'',, clicked?styles.bgTransparent:'']
//,clicked?styles.bgTransparent:''
  return (
    <>
  <React.Fragment >

<Text style={{paddingTop:10,paddingBottom:5,textAlign:'center',backgroundColor:'black',color:'white',fontSize:23,fontFamily:'Quicksand-SemiBold'}} >xdash ai</Text>
      
      <Animated.View style={[styles.searchContainer,{ transform: [{ translateY }] }]}>

        <TextInput placeholderTextColor={'#7e7979'}
          style={styles.input}
          placeholder="Ask XDash AI anything..."
          value={query}
          onChangeText={setQuery}
          onFocus={() => startAnimation2(isTop ? 0 : 1)}
        />
        <TouchableOpacity style={{width:50,xIndex:190,height:50,borderRadius:25,color:'white',borderWidth:1,
        justifyContent:'center',alignItems:'center' ,borderColor:'#5e5b5b',backgroundColor:'black'}}
          onPress={() => {setLoading(true);handleSearch();startAnimation(isTop ? 1 : 0); setClicked(true); } } >

          <SvgArrowRight style={{width: 24, zIndex:90,height: 24,color:'white'}} />
        
        </TouchableOpacity>
        
      </Animated.View>
    
             

{ topthreeloaded && !clicked &&
<View style={[styles.mainViewStyle, styles.pullLower]} >


{(topthreeloaded && !clicked)? topthree.map((item, index) => { 
          return (
<TouchableOpacity onPress={()=> {handleSearch2(item.querytext,createQueryHash2(item.querytext));startAnimation(isTop ? 1 : 0);setClicked(true); } } style={{borderWidth:1,alignSelf:'center',borderColor:'#5e5b5b',borderRadius:15,padding:5,marginBottom:5,}} key={index} >
  <Text style={{fontSize:13,color:'#7e7979',fontFamily:'Quicksand-Regular'}} >{item.querytext}</Text>
</TouchableOpacity>
        )}):(<></>)}



</View>
}


      

{resultsloaded && <View style={{display:'flex',marginTop:-62 ,width:'100%',flexDirection:'row',backgroundColor:'black',alignSelf:'flex-start',alignItems:'flex-start'}} >
<SvgAnswerIcon style={{width: 24, height: 24,color:'white'}} />

  <Text style={{color:'white',fontWeight:'bold',fontSize:25}} >Answer</Text>   
  
</View> }


        { (htmlStringLoaded && resultsloaded && results2Loaded && relatedQuestionsLoaded)? (             
        
      
<WebView  ref={(ref) => webViewRef.current = ref}
          originWhitelist={['*']}
          source={{ html: htmlString }}
            scalesPageToFit={true}
            startInLoadingState={true}
         onMessage={handleMessage}
 injectedJavaScript={injectedJavaScript}
            style={{flexGrow:1,height:600,marginTop:0,paddingTop:5,marginBottom:40,fontSize:15}}        
></WebView>



        
       
        
        ):(<View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" style={styles.indicator}/>
      <Text style={styles.indicatorText}>Loading response...</Text>
    </View>) }


 </React.Fragment>



</>
  );
};
//onLoadEnd={onLoadEnd}

/*
style={{display:'flex',flex:1,width: '98%',justifyContent:'center',alignSelf:'center',
        alignItems:'flex-start',flexGrow:1,marginTop:34}}
        */


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
paddingTop:20,
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
    marginRight: 8,
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
  },
  indicator: {},
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
  },
});

export default App;
