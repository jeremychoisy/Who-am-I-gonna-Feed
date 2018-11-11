import React from 'react'
import {View, TextInput, Text, StyleSheet, ActivityIndicator, Alert, Image,TouchableOpacity} from 'react-native'
import {getSum, getCurrentMatch} from '../API/RIOTApi'
import {connect} from 'react-redux'
import {Font} from 'expo'


class Search extends React.Component{
  constructor(props){
    super(props)
    this.searchedText=""
    this.state = {
      isLoading:false
    }
  }
// display loading icon
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _searchTextInputChanged(text){
    this.searchedText=text;
  }
// add summoner name to the Store
  _addSearchHistory(nomSum) {
    const action = { type: "ADD_ITEM", value: nomSum };
    this.props.dispatch(action)
  }

// Call API then navigate to the Results view
  _displayResults = (nomSum) =>{
    this.setState({
      isLoading:true
    });
    this._addSearchHistory(nomSum)
    getSum(nomSum).then((sumData)=>{
      getCurrentMatch(sumData.id).then((gameData)=>{
        this.setState({
          isLoading:false
        });
        if(gameData.participants === undefined){
          Alert.alert("This summoner is not currently in game.")
        }
        else
        {
          this.props.navigation.navigate("Results",{gameData : gameData})
        }
      })
    })
  }

// Render
  render(){
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.text}> Entrez votre nom d'invocateur : </Text>
        <View style={styles.inputContainer}>
        <TextInput
            placeholder="Summoner name"
            onChangeText={(text)=>this._searchTextInputChanged(text)}
            onSubmitEditing={()=>this._displayResults(this.searchedText)}
            underlineColorAndroid="transparent"/>
        </View>
        <TouchableOpacity style={styles.search} onPress={()=>this._displayResults(this.searchedText)}>
          <Image
          source={require('../Images/ic_search.png')}
          style={styles.icon}
          />
        </TouchableOpacity>
        <Image
          source={require('../Images/evil.jpg')}
          style={styles.image}
        />
      </View>
   )
  }
}


//StyleSheet

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'black',
  },
  text:{
    fontSize:18,
    marginBottom:10,
    color:'rgb(240,219,77)'
  },
  inputContainer:{
    backgroundColor:'white',
    marginBottom:20
  },
  search:{
    backgroundColor:'rgb(240,219,77)',
    alignItems:'center',
    height:30
  },
  icon:{
    width:30,
    height:30
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    marginTop:20,
    height:110
  }
})

// Connect to the Store
const mapStateToProps = state =>{
  return{
    searchHistory : state.searchHistory
  }
}

export default connect(mapStateToProps)(Search)
