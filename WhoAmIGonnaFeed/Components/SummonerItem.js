import React from 'react'
import {View,Text,Image, StyleSheet, ActivityIndicator} from 'react-native'
import {getSumIcon,getSum,getLeague,getChampIcon,getRuneIcon, getRunes} from '../API/RIOTApi'
import champs from '../Data/ChampsData'

class SummonerItem extends React.Component{
  constructor(props){
    super(props)
    getRunes().then(data => this.runes = data)
    this.state = {
      sumData:undefined,
      leagueData: undefined,
      isLoading:true,
      dataLoaded:false
    }
  }

// API calls once the component is mounted
  componentDidMount(){
    getSum(this.props.summoner.summonerName).then((sumData)=>{
      getLeague(this.props.summoner.summonerId).then((data)=>{
        this.setState({
          sumData:sumData,
          leagueData:data,
          isLoading:false,
          dataLoaded:true
        })
      })
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

// display champion and runes
  _displayChampAndRunes(){
    if(this.runes !== undefined){
      const champIndex = champs.findIndex(item => item.id == this.props.summoner.championId)
      const mainRuneIndex = this.runes.findIndex(item => item.id == this.props.summoner.perks.perkStyle)
      const mainTalentIndex = this.runes[mainRuneIndex].slots[0].runes.findIndex(item => item.id == this.props.summoner.perks.perkIds[0])
      const secondaryRuneIndex = this.runes.findIndex(item => item.id == this.props.summoner.perks.perkSubStyle)

      return(
        <View style={styles.champAndRunes}>
          <View style={styles.champ}>
            <Image
              style={styles.imageChamp}
              source={{uri: getChampIcon(champs[champIndex].name)}}
            />
          </View>
          <View style={styles.mainRune}>
            <Image
              style={styles.iconMainRune}
              source={{uri: getRuneIcon(this.runes[mainRuneIndex].slots[0].runes[mainTalentIndex].icon)}}
            />
          </View>
          <View style={styles.secondaryRune}>
            <Image
                style={styles.iconSecondaryRune}
                source={{uri: getRuneIcon(this.runes[secondaryRuneIndex].icon)}}
            />
          </View>
        </View>
      )
    }
  }

 // Display league and rank
  _displayRank(){
    if(this.state.leagueData !== undefined){
      if(this.state.leagueData.length !== 0 && this.state.leagueData[0].tier !== undefined ){
        return(
          <View style={styles.sumRank}>
            <Text style={styles.league}> {this.state.leagueData[0].tier} {this.state.leagueData[0].rank} </Text>
            {this._displayLeagueIcon()}
            <Text style={styles.ratio}>  {this.state.leagueData[0].wins} W / {this.state.leagueData[0].losses} L </Text>
          </View>
        )
      }
      else{
        return(
          <View style={styles.sumRank}>
            {this._displayLeagueIcon()}
            <Text style={styles.league}> UNRANKED </Text>
            <Text style={styles.ratio}> 0 W / 0 L</Text>
          </View>
        )
      }
    }
  }
// Display the league icon
  _displayLeagueIcon(){
    const {leagueData} = this.state
    if(leagueData !== undefined){
      if(leagueData.length !== 0){
        switch(this.state.leagueData[0].tier){
         case 'BRONZE':
          return <Image
                source={require('../Images/leagues_icons/bronze.png')}
                style={styles.icon}
                />
         case 'SILVER':
          return <Image
                source={require('../Images/leagues_icons/silver.png')}
                style={styles.icon}
              />
         case 'GOLD':
          return <Image
              source={require('../Images/leagues_icons/gold.png')}
              style={styles.icon}
            />
         case 'PLATINUM':
          return <Image
              source={require('../Images/leagues_icons/platinum.png')}
              style={styles.icon}
            />
         case 'DIAMOND' :
          return <Image
            source={require('../Images/leagues_icons/diamond.png')}
            style={styles.icon}
          />
         case 'CHALLENGER' :
          return <Image
            source={require('../Images/leagues_icons/challenger.png')}
            style={styles.icon}
          />
         case 'MASTER':
          return <Image
            source={require('../Images/leagues_icons/master.png')}
            style={styles.icon}
          />
         default :
          return <Image
            source={require('../Images/leagues_icons/provisional.png')}
            style={styles.icon}
          />
        }
      }
      else {
        return(
          <Image
            source={require('../Images/leagues_icons/provisional.png')}
            style={styles.icon}
          />
        )
      }
    }
  }

// View summoner
  _displaySummoner(){

    const {sumData} = this.state
    const champIndex = champs.findIndex(item => item.id == this.props.summoner.championId)

    if(this.state.dataLoaded){
      return(
        <View style={styles.scrollviewContainer}>
          <View style={styles.summoner}>
            <Image
              style={styles.image}
              source={{uri: getSumIcon(this.state.sumData.profileIconId)}}
            />
            <View style={styles.sumInfo}>
              <View style={styles.sumDetails}>
                <Text style={styles.name} numberOfLines={1}> {this.state.sumData.name} </Text>
                <Text style={styles.lvl}>  Lvl : {this.state.sumData.summonerLevel} </Text>
              </View>
              {this._displayRank()}
            </View>
              {this._displayChampAndRunes()}
          </View>
        </View>
      )
    }
  }


  render(){
    return(
      <View style={styles.mainContainer}>
        {this._displayLoading()}
        {this._displaySummoner()}
      </View>
    )
  }
}

//StyleSheet
const styles = StyleSheet.create({
  mainContainer:{
    flex:1
  },
  scrollviewContainer:{
    height:110,
    flex:1,
    borderWidth:1,
    borderColor:'black'
  },
  summoner:{
    flex:1,
    flexDirection:'row'
  },
  image:{
    width:100,
    height:110
  },
  // Summoner infos
  sumInfo:{
    flex:2,
    flexDirection:'column',
    alignItems:'center'
  },
  sumDetails:{
    alignItems:'center',
    flex:1,
    marginBottom:10
  },
  name:{
    fontWeight:'bold',
    color:'white'
  },
  lvl:{
    fontWeight:'bold',
    color:'white'
  },
  // Summoner rank
  sumRank:{
    alignItems:'center',
    flex:2
  },
  league:{
    flex:1,
    color:'white'
  },
  ratio:{
    flex:1,
    fontSize:10,
    color:'white'
  },
  league:{
    flex:1,
    color:'white'
  },
  // Champ & runes
  champAndRunes:{
    flex:1,
  },
  champ:{
    alignItems:'flex-end',
    marginBottom: 10
  },
  mainRune:{
    alignItems: 'center'
  },
  secondaryRune:{
    alignItems:'flex-end'
  },
  imageChamp:{
    width:45,
    height:50
  },
  iconMainRune:{
    width:25,
    height:25
  },
  iconSecondaryRune:{
    width:10,
    height:10
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
  icon:{
    width:30,
    height:20
  }
})

export default SummonerItem
