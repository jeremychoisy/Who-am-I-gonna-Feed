import React from 'react'
import {ScrollView, View,Text,StyleSheet,Image,ActivityIndicator,FlatList} from 'react-native'
import SummonerItem from './SummonerItem'
import game from '../Data/gameData'
import {Font} from 'expo'

class Results extends React.Component{
  constructor(props){
    super(props)
    this.gameType = ""
    this.state={
      summoners : [],
      isLoading: true,
    }
  }

  // get data from Search View once the component is mounted
  componentDidMount(){
    const {gameData} = this.props.navigation.state.params
    this.gameType = game[game.findIndex(item => item.id == gameData.gameQueueConfigId)].type;

    this.setState({
      summoners : gameData.participants,
      isLoading:false
    })
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

  // Render
  render(){
    return(
      <ScrollView style={styles.mainContainer}>
        {this._displayLoading()}
        <Text style={styles.textHeader}>{this.gameType}</Text>
        <View style={styles.secondContainer}>
          <View style={styles.teamOne}>
            <FlatList
              data={this.state.summoners.filter((sum)=> sum.teamId == 100)}
              keyExtractor={(item) => item.summonerId.toString()}
              renderItem={({item}) => <SummonerItem summoner={item}/>}
            />
          </View>
          <View style={styles.versus}>
            <Text style={styles.textVersusV}> V </Text>
            <Text style={styles.textVersusS}> S </Text>
          </View>
          <View style={styles.teamTwo}>
          <FlatList
            data={this.state.summoners.filter((sum)=> sum.teamId == 200)}
            keyExtractor={(item) => item.summonerId.toString()}
            renderItem={({item}) => <SummonerItem summoner={item}/>}
          />
          </View>
        </View>
      </ScrollView>
    )
  }
}
 // StyleSheet
const styles=StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'black'
  },
  secondContainer:{
    flexDirection:'row'
  },
  teamOne:{
    flex:3,
    backgroundColor:'rgb(0, 0, 102)',

  },
  versus:{
    flex:1,
    borderColor:'black',
    borderWidth: 1,
    justifyContent:'center'
  },
  textVersusV:{
    fontSize:35,
    color:'yellow',
    textAlign:'left'
  },
  textVersusS:{
    fontSize:35,
    color:'yellow',
    textAlign:'right'
  },
  teamTwo:{
    flex:3,
    backgroundColor:'rgb(153, 0, 0)',
  },
  textHeader:{
    textAlign:"center",
    fontSize:16,
    fontWeight:'bold',
    color:'yellow'
  },
  image:{
    width:50,
    height:50
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Results
