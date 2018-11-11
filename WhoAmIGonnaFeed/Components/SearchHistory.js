import React from 'react'
import {ScrollView,Text,StyleSheet,FlatList} from 'react-native'
import {connect} from 'react-redux'
import SearchHistoryItem from './SearchHistoryItem'

class SearchHistory extends React.Component{

// Navigate to the Results View
  _goToResults = (data) => {
    this.props.navigation.navigate('Results', {gameData:data})
  }

  render(){
    return(
      <ScrollView style={styles.mainContainer}>
        <FlatList
        data= {this.props.searchHistory}
        keyExtractor={(item) => item.toString()}
        renderItem={({item}) => <SearchHistoryItem
                                  goToResults={this._goToResults}
                                  sumName={item}
                                />}
        />
      </ScrollView>
    )
  }
}

// StyleSheet

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor: 'black'
  }
})

// Connect to the store
const mapStateToProps = state =>{
  return{
    searchHistory : state.searchHistory
  }
}

export default connect(mapStateToProps)(SearchHistory)
