import React from 'react'
import {TouchableOpacity, Text, StyleSheet, View, Image, Alert} from 'react-native'
import {getSum, getCurrentMatch} from '../API/RIOTApi'
import {connect} from 'react-redux'

class SearchHistoryItem extends React.Component{

// call Api then navigate to the Results View
  _displayResults = (nomSum) =>{
    getSum(nomSum).then((sumData)=>{
      getCurrentMatch(sumData.id).then((gameData)=>{
        if(gameData.participants === undefined){
          Alert.alert("This summoner is not currently in game.")
        }
        else
        {
          this.props.goToResults(gameData)
        }
      })
    })
  }

// Remove summoner name from the store
  _removeItem(nomSum){
      const action = { type: "REMOVE_ITEM", value: nomSum }
      this.props.dispatch(action)
  }


  render(){
    return(
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.viewSummonerName} onPress={()=>this._displayResults(this.props.sumName)}>
          <Text style={styles.textSummonerName}> {this.props.sumName}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteSummonerName} onPress={()=>this._removeItem(this.props.sumName)}>
          <Image
          style={styles.icon}
          source={require('../Images/ic_remove.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

// StyleSheet
const styles = StyleSheet.create({
  mainContainer:{
    height:30,
    flex:1,
    flexDirection:'row',
    marginBottom:5
  },
  viewSummonerName:{
    flex:1,
    justifyContent:'center',
  },
  textSummonerName:{
    fontSize:15,
    textAlign:'center',
    fontWeight:'bold',
    color:'rgb(240,219,77)'
  },
  deleteSummonerName:{
    backgroundColor:'rgb(240,219,77)',
    width:30
  },
  icon:{
    height:30,
    width:30
  }
})

// Connect to the store
const mapStateToProps = state =>{
  return{
    searchHistory : state.searchHistory
  }
}

export default connect(mapStateToProps)(SearchHistoryItem)
