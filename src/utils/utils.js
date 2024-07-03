import React,{useState,useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const save_history_item_to_async_storage = async (value) => {
  try {
    let qrhisarr = [];
    let qrhisarray2 = [];
  //  const jsonValue = JSON.parse(value);
  //  console.log('typeof qr obj==', typeof jsonValue);
  //  console.log('valueof qr obj==', jsonValue.queryResponse);
    //const sfied = JSON.stringify(jsonValue.queryResponse);
  //  jsonValue.queryResponse = sfied;
  //  console.log('myjsonval==',jsonValue);
    console.log('typeof obj==', typeof value);
  //  console.log('valueof obj==', value);
    qrhisarr.push(JSON.parse(value));

    let prevHist = await get_history_items_from_async_storage();
    console.log('typeof prevHist==', typeof prevHist);
    //console.log('valueof prevHist==', prevHist);
    let prevHistObj = JSON.parse(prevHist);

    if (prevHistObj) {
    qrhisarray2 =  [...new Set([...prevHistObj ,...qrhisarr])];

    //qrhisarr.push(JSON.parse(newHist));
    }
    else {
      qrhisarray2 = qrhisarr;      
    }
   
  //  console.log('STORE-HISTORY>>>>',qrhisarray2);
      
//console.log('NEWHISTORY>>>>',newHist);
    await AsyncStorage.setItem('@XDashQueryHistory', JSON.stringify(qrhisarray2));

  } catch (e) {
    // saving error
    console.log('error saving to async storage',e);
  }
  console.log('SAVE-SUCCESS');


}
 
export const get_history_items_from_async_storage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@XDashQueryHistory');
   // console.log('async contains-->',jsonValue);
    return jsonValue != null ? jsonValue : null;
  } catch(e) {
    // error reading value
    console.log('error reading from async storage');

  }
}

export const get_count_of_history_items_from_async_storage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@XDashQueryHistory');
    console.log('async contains-->',jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue).length : 0;
  } catch(e) {
    // error reading value
    console.log('error reading from async storage');

  }
}

export const getAsyncStoreData = async () => {

try {
AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (error, stores) => {
    stores.map((result, i, store) => {
      console.log({ [store[i][0]]: store[i][1] });
      return true;
    });
  });
});

}
catch(e) {console.log('error gettig async data',e)}

}

export const remove_history_items_from_async_storage = async () => {
  try {
    await AsyncStorage.removeItem('@XDashQueryHistory')
  } catch (e) {
    // saving error
    console.log('error removing fromto async storage');
  }
}