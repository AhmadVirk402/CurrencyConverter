import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
//import{fetchCurrencyLatest,convertCurrencyAPI} from './api';

 const currencyConverterEndPoint = "https://api.frankfurter.app"

 const fetchCurrencyLatest= ()=>{
  return fetch(`${currencyConverterEndPoint}/latest`)
   .then(response => response.json())
  .then(data => Object.keys(data.rates))
}

 const convertCurrencyAPI=(amount,sourceCurrency,targetCurrency)=>{
 return fetch(`${currencyConverterEndPoint}/latest?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`) .then(response => response.json())
 }

const App = () => {

  const [currencyList,setCurrencyList]=useState([]);
  const [open,setOpen]=useState(false);
  const [targetOpen,setTargetOpen]=useState(false);

   const [sourceAmount,setSourceAmount]=useState("0");
   const [sourceCurrency,setSourceCurrency]=useState("");
   const [targetAmount,setTargetAmount]=useState("0");
   const [targetCurrency,setTargetCurrency]=useState("");
   const [loading,setLoading]=useState(false);

  useEffect(()=>{
    fetchCurrencyLatest()
    .then(list => setCurrencyList(list))

  },[])

const convertCurrency = (amount,sourceCurrency,targetCurrency) => {
  setLoading(true);
  convertCurrencyAPI(amount,sourceCurrency,targetCurrency)
  .then(data => {
    const {rates} = data;
    setTargetAmount(String(rates[targetCurrency]));
    setLoading(false);
    

  })
}

  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.mainContainer}>
            
            
             <View>
              <Text style={{
                textAlign:'center',
                color:"#fff",
                fontSize:25,
                fontWeight:"600",
                marginTop:20,
                marginBottom:30,
              }}>: Currency Converter :</Text>
              </View>
          
          
          
           <View>
            <Text style={styles.text}>Source Amount</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={value=>setSourceAmount(value)}
            value={sourceAmount}
            />

            <Text style={styles.text} >Select Source Currency</Text>
            <DropDownPicker
            style={styles.textInput}
            onChangeText={value=>setSourceCurrency(value)}
            open={open}
            value={sourceCurrency}
            items={currencyList.map(currency =>({
              lable:currency,
              value:currency,

            }))}
            setOpen={setOpen}
            setValue={setSourceCurrency}
            
            />
              
         </View>

        
          <View>
              <Text  style={styles.text}>Target Amount</Text>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={targetAmount}
                />

                <Text style={styles.text} >Select Target Currency</Text>
                <DropDownPicker
            style={styles.textInput}
            onChangeText={value=>setTargetCurrency(value)}
            open={targetOpen}
            value={targetCurrency}
            items={currencyList.map(currency =>({
              lable:currency,
              value:currency,

            }))}
            setOpen={setTargetOpen}
            setValue={setTargetCurrency}
            
            />
          </View>
        <View>
          {
            loading 
            ?<ActivityIndicator color={"#000"} size={"large"}/>
             :<Button 
           onPress={()=> convertCurrency(sourceAmount,sourceCurrency,targetCurrency)} 
           title="Convert"
           color={"#000"}
           />
          }
        </View>   

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
     padding:20,
     height:700,
     backgroundColor:"#fe7d77"


  },

  textInput:{
    backgroundColor:"#fff",
    marginBottom:10, 
    borderRadius:10,
    borderWidth:2,
    borderColor:"#fff",
    color:"red"
    
  },
  text:{
    color:"#000",
  }
});

export default App;
