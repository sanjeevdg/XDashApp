import React, { useRef,useState,useEffect } from 'react';

import {  
  SafeAreaView,Linking,StyleSheet,WebView,TextInput,Button,ScrollView,
  Text,Image,Platform,View,ActivityIndicator,FlatList,TouchableOpacity,
  Animated, Dimensions, Easing,
} from 'react-native';

import CryptoJS from 'crypto-js';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';
//import Markdown from 'markdown-to-jsx';
import FaIcon from 'react-native-vector-icons/FontAwesome';
//import CodeBlock from "./CodeBlock";
import SvgArrowRight from './svgComponents/SvgArrowRight';
import SvgSourcesIcon from './svgComponents/SvgSourcesIcon';
import SvgAnswerIcon from './svgComponents/SvgAnswerIcon';
import SvgRelatedIcon from './svgComponents/SvgRelatedIcon'; 


import markdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import myhljs from 'highlight.js';

//require('highlight.js/styles/dark.css'); 


//, { MarkdownIt }
//import Prism from 'prismjs';
//require('./node_modules/prismjs/themes/prism-okaidia.css');
//require('./node_modules/prismjs/components/prism-jsx.js');
//require('./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js');
//require('./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css');

import { hljs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
//import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

import CodeBlock from './components/CodeBlock';

const App = () => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState();
 // const [mcodeblocks, setMCodeBlocks] = useState([]);
  const [resultsloaded, setResultsLoaded] = useState(false); 
  const [results2, setResults2] = useState([]);
  const [results2Loaded,setResults2Loaded] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [relatedQuestionsLoaded, setRelatedQuestionsLoaded] = useState(false);
  const [loading,setLoading] = useState(false);

  const [clicked,setClicked] = useState(false);



  const animatedValue = useRef(new Animated.Value(0)).current;
    const [isTop, setIsTop] = useState(true);

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

  //  useEffect(() => {
        
  //  }, [isTop]);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Dimensions.get('window').height - 130],
        extrapolate: 'clamp'
    })

const md = new markdownIt({
  highlight: function (str, lang) {
    if (lang && myhljs.getLanguage(lang)) {
      try {
        return myhljs.highlight(str, { language: lang, ignoreIllegals: true }).value ;
      } catch (__) {}
    }

    return '';
  }
});



const handleSearch = async () => {

  let rid = createQueryHash();   
  console.log('myrid=',rid); 

  let body = {
        "query": query,
        "search_uuid":createQueryHash() ,    
        "visitor_uuid": "bcd25493385e2512be48176f9e1a58ed"
  }  
  console.log('body==',body);

    try {
      
        console.log('my query is ',query);

        axios.post('https://www.xdash.ai/api/query',{ "query": query,
                                "search_uuid":createQueryHash() ,    
            "visitor_uuid": "bcd25493385e2512be48176f9e1a58ed"}).then((response) => {
        setLoading(false);
        let ltdata  = response.data.substring(0,response.data.indexOf('__LLM_RESPONSE__'));
        let dtarr = JSON.parse(ltdata);
        setResults2(dtarr); 
        setResults2Loaded(true);  

        console.log('REPOSNSE',response.data);
        
        let ftdata  = response.data.substring(response.data.indexOf('__LLM_RESPONSE__')+16,response.data.indexOf('__RELATED_QUESTIONS__'));

/*
let extractedBlocks = extractMarkdownContent(ftdata);

console.log('myresultstringarray==',extractedBlocks);*/
        setResults(ftdata); 
        setResultsLoaded(true);


        let rqdata = response.data.substring(response.data.indexOf('__RELATED_QUESTIONS__')+21,response.data.length); 
        

        let rqarr = JSON.parse(rqdata);
        setRelatedQuestions(rqarr);
        setRelatedQuestionsLoaded(true);
        console.log(ftdata);

        }, (error) => {
                        console.log(error);
                      });
     
        } catch (error) {
              console.error('Error fetching data: ', error);
        }
  };

const handleSearch2 = async (qr,qrhs) => {

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
                          setLoading(false);
                          let ltdata  = response.data.substring(0,response.data.indexOf('__LLM_RESPONSE__'));
                          let dtarr = JSON.parse(ltdata);
                          setResults2(dtarr); 
                          console.log('REPOSNSE',response.data);
                          let ftdata  = response.data.substring(response.data.indexOf('__LLM_RESPONSE__')+16,response.data.indexOf('__RELATED_QUESTIONS__'));
                          setResults(ftdata); 
                          let rqdata = response.data.substring(response.data.indexOf('__RELATED_QUESTIONS__')+21,response.data.length); 
                          setResultsLoaded(true);
                          console.log('rqdata=',rqdata);
                          let rqarr = JSON.parse(rqdata);
                          setRelatedQuestions(rqarr);
                          console.log(ftdata);
              }, (error) => {
                          console.log(error);
                        });
     
              } catch (error) {
                          console.error('Error fetching data: ', error);
              }
  };


const createQueryHash = () => {
    const fullHash = CryptoJS.SHA256(query).toString(CryptoJS.enc.Hex);
    return fullHash.substring(0, 21);
};

const createQueryHash2 = (qr) => {
    const fullHash = CryptoJS.SHA256(qr).toString(CryptoJS.enc.Hex);
    return fullHash.substring(0, 21);
};

const setQueryAndFetchResult = (q) => {

      setResultsLoaded(false);
      setResults([]);
      setResults2([]);
      setRelatedQuestions([]);

      setLoading(true);

      setQuery(q);
      let qrhs = createQueryHash2(q);
      console.log('myqr=='+q+'myqrhs=='+qrhs);
      handleSearch2(q,qrhs);

} 

//  style={mdstyles}
/*

style={{
          body: { fontSize: 16 },
          heading1: { fontSize: 24, fontWeight: 'bold' },
          code_block: { backgroundColor: '#282c34', borderRadius: 4, padding: 10 },
          code_inline: { backgroundColor: '#f0f0f0', borderRadius: 4, padding: 4, fontFamily: 'monospace' },
        }}

        */

const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultText}>{item.name}</Text> 
      <Text style={styles.resultText}>{item.url}</Text> 
      <Text style={styles.resultText}>{item.snippet}</Text> 
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>

<Text style={{textAlign:'center',color:'white',fontSize:26,fontFamily:'Quicksand-Regular'}} >XDash AI</Text>
      
      <Animated.View style={[styles.searchContainer, { transform: [{ translateY }] }]}>

        <TextInput placeholderTextColor={'#7e7979'}
          style={styles.input}
          placeholder="Ask XDash AI anything..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={{width:50,xIndex:190,height:50,borderRadius:25,color:'white',borderWidth:1,
        justifyContent:'center',alignItems:'center' ,borderColor:'#5e5b5b',backgroundColor:'black'}}
          onPress={() => {setLoading(true);handleSearch();startAnimation(isTop ? 1 : 0); setClicked(true); } } >

          <SvgArrowRight style={{width: 24, zIndex:90,height: 24,color:'white'}} />
        
        </TouchableOpacity>
        
      </Animated.View>
    

   {!clicked && 
<TouchableOpacity onPress={() => {setQueryAndFetchResult('Can AI be truly ethical?')}  } style={{borderWidth:1,alignSelf:'center',borderColor:'#5e5b5b',borderRadius:15,padding:5,marginBottom:6}} >
  <Text style={{fontSize:13,color:'#7e7979',fontFamily:'Quicksand-Regular'}} >Can AI be truly ethical?</Text>
</TouchableOpacity>
}
   {!clicked && 
<TouchableOpacity onPress={() => {setQueryAndFetchResult('What are the key obstacles to AI adoption in business?');}  } style={{borderWidth:1,alignSelf:'center',borderColor:'#5e5b5b',borderRadius:15,padding:5,marginBottom:6}} >
  <Text style={{fontSize:13,color:'#7e7979',fontFamily:'Quicksand-Regular'}} >What are the key obstacles to AI adoption in business? </Text>
</TouchableOpacity>
}
   {!clicked && 
<TouchableOpacity onPress={()=> setQueryAndFetchResult('How will AI affect equality in society?')} style={{borderWidth:1,alignSelf:'center',borderColor:'#5e5b5b',borderRadius:15,padding:5}} >
  <Text style={{fontSize:13,color:'#7e7979',fontFamily:'Quicksand-Regular'}} >How will AI affect equality in society?</Text>
</TouchableOpacity>
}


      <ScrollView style={styles.resultsContainer}>

        {loading && <ActivityIndicator style={{zIndex:99}} size={30} color={'#47cf54'}/>}
{resultsloaded?(<View style={{flexDirection:'row',alignItems:'center'}} >
<SvgAnswerIcon style={{width: 24, height: 24,color:'white'}} />

  <Text style={{color:'white',fontWeight:'bold',
  fontSize:25}} >Answer</Text>   
  
</View>
):(<></>) }


{/* */}{/*   */}

         { resultsloaded?   (             
        
          <Markdown allowDangerousHtml={false} escapeHtml={false} style={mdstyles} > 
         { results}
                    </Markdown>
        
        ):(<></>) }



{resultsloaded?(<View style={{flexDirection:'row',alignItems:'center'}} >
<SvgSourcesIcon style={{width: 24, height: 24,color:'white'}} />
  <Text style={{color:'white',fontWeight:'bold',
  fontSize:25}} >Sources</Text>
</View>
):(<></>)}
      <View>
         {results2Loaded? results2.map((item, index) => { return (
          <View key={index} style={styles.itemContainer}>
  
     
         <Text style={styles.itemName}>{item.name}</Text>
     
  <View style={{width:'100%',flexDirection:'row',display:'flex',justifyContent:'space-between',alignItems:'space-evenly'}} >
            <Text style={{color: '#7e7979',fontSize:16,fontFamily:'Quicksand-Regular',
alignSelf:'flex-start'}} onPress={() => Linking.openURL(item.url)}>
              {(index+1) +' - '+ new URL(item.url).hostname}
            </Text>
            <Image resizeMode="contain" style={{display:'flex',alignSelf:'flex-end',width:20,height:20}} 
  source={{ uri: 'https://www.google.com/s2/favicons?domain='+item.url}} />
</View>
  <Text style={styles.itemSnippet}>{item.snippet.substring(0,100)}</Text>
          </View>
        )}):(<></>)}
      </View>

      <View style={{marginTop:20}} >


    
{relatedQuestionsLoaded? (<View style={{flexDirection:'row',alignItems:'center'}} >
<SvgRelatedIcon style={{width: 24, height: 24,color:'white'}} />
 
  <Text style={{color:'white',fontWeight:'bold',
  fontSize:25}} >Related</Text>   
</View>
):(<></>)}


         {relatedQuestionsLoaded? relatedQuestions.map((item, index) => { 
          return (
<TouchableOpacity  onPress={() => {setQueryAndFetchResult(item.question)}  } key={index}> 
          <View  style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.question}</Text>
            
          </View>
          <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/></TouchableOpacity>
        )}):(<></>)}

      </View>




      </ScrollView>
      
    
    </SafeAreaView>
  );
};

const mdstyles = StyleSheet.create({

  // The main container
  body: {},

  // Headings
  heading1: {
    flexDirection: 'row',
    fontSize: 32,
  },
  heading2: {
    flexDirection: 'row',
    fontSize: 24,
  },
  heading3: {
    flexDirection: 'row',
    fontSize: 18,
  },
  heading4: {
    flexDirection: 'row',
    fontSize: 16,
  },
  heading5: {
    flexDirection: 'row',
    fontSize: 13,
  },
  heading6: {
    flexDirection: 'row',
    fontSize: 11,
  },

  // Horizontal Rule
  hr: {
    backgroundColor: '#000000',
    height: 1,
  },
 strong: {
    fontFamily:'Quicksand-Light',
    fontWeight:'bold',
    fontSize:18,
  },
  em: {
    fontStyle: 'italic',
  },
  s: {
    textDecorationLine: 'line-through',
  },

  // Blockquotes#F5F5F5
  blockquote: {
    backgroundColor: 'red',
    color:'#F5F5F5',
    borderColor: '#CCC',
    borderLeftWidth: 4,
    marginLeft: 5,
    paddingHorizontal: 5,
  },
  // Lists
  bullet_list: {},
  ordered_list: {},
  list_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_content: {
    flex: 1,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_content: {
    flex: 1,
  },

  // Code
  code_inline: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    color:'#b3b3b3',
    fontStyle:'italic',
    fontFamily:'Quicksand-SemiBold',
    fontSize:16,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  code_block: {
/*    borderWidth: 1,
    borderColor: '#CCCCCC', */
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  fence: {
    /*borderWidth: 1,
    borderColor: '#000000',  */
    backgroundColor: 'rgb(40, 42, 54)',
    color:'white',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },

  // Tables
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 5,
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
  },

  // Links
  link: {
    textDecorationLine: 'underline',
  },
  blocklink: {
    flex: 1,
    borderColor: '#000000',

    borderBottomWidth: 1,
  },

  // Images
  image: {
    flex: 1,
  },

  // Text Output
  text: {color:'white',fontFamily:'Quicksand-Regular'},

  textgroup: {},
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  hardbreak: {
    width: '100%',
    height: 1,
  },
  softbreak: {},

  // Believe these are never used but retained for completeness
  pre: {color:'red',},
  inline: {},
  span: {},



});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
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
    marginTop:20,
    marginBottom: 16,
    backgroundColor:'#000000',
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
    marginRight: 8,
    color:'white',
    zIndex:90,
  },
  resultsContainer: {
    flex: 1,marginBottom:50,
    marginTop:-80,
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
});

export default App;
