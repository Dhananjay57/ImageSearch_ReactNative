'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  FlatList,
  } from 'react-native';
  const pageNumber = 1
  const numColumns = 3
class ListItem extends React.PureComponent {
    
    _onPress = () => {
        this.props.onPressItem(this.props.index);
      }
      
    render() {
         const item = this.props.item;
         console.log("item##:"+item.largeImageURL);
      return (
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={{ uri: item.largeImageURL }} />
            </View>
        </TouchableHighlight>
      );
    }
  }

function urlForQueryAndPage(key, value, pageNumber) {
    const data = {
        key: '10985878-a2d1d5d0d80e8a93bba360918',
        page: pageNumber
    };
    data[key] = value;
  
    const querystring = Object.keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&');

    return 'https://pixabay.com/api/?' + querystring;
}
  
  type Props = {};
  export default class SearchPage extends Component<Props> {
    static navigationOptions = {
      title: 'ImageSearch',
    };
  
    constructor(props) {
      super(props);
      this.state = {
        searchString: 'london',
        isLoading: false,
        dataSource: null,
        searchNumber:'2',
        message: '',
      };
    }
  
    _onSearchTextChanged = (event) => {
      this.setState({ searchString: event.nativeEvent.text });
    };
    _onSearchNumberOfColumnChanged = (event) =>{
        this.setState({searchNumber: event.nativeEvent.text});
    };
  
    _executeQuery = (query) => {
      this.setState({ isLoading: true });
      fetch(query)
        .then(response => response.json())
        .then(json => this._handleResponse(json.hits))
        .catch(error =>
            this.setState({
              isLoading: false,
              message: 'Something bad happened ' + error
        }));
    };
  
    _onSearchPressed = () => {
      const query = urlForQueryAndPage('q', encodeURIComponent(this.state.searchString), pageNumber);
      this._executeQuery(query);
      this.setState({numColumns: this.state.searchNumber})
    };
  
    _handleResponse = (response) => {
      this.setState({ isLoading: false , message: '' });
      if (response) {
          this.setState({
              dataSource:response, isLoading:false
            
          })
        // this.props.navigation.navigate(
        //     'Results', {listings: response});
      } else {
        this.setState({ message: 'Location not recognized; please try again.'});
      }
    };
    _keyExtractor = (item, index) => index.toString();
    _renderItem = ({item, index}) => (
        <ListItem
          item={item}
          index={index}
        onPressItem={this._onPressItem}
        />
      );
      onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
          console.log('onEndReached()', this.state.dataSource)
          let dataSource = this.state.dataSource
          this._onSearchPressed('q', encodeURIComponent(this.state.searchString), pageNumber+1)
          let newData = dataSource.concat(this.dataSource)
          this.setState({dataSource: newData})
          console.log('newData##', newData)
          this.onEndReachedCalledDuringMomentum = true;
        }
      }
      _onPressItem = (index) => {
        console.log("Pressed row: "+index);
      }
  
    render() {
        const spinner = this.state.isLoading ?
        <ActivityIndicator size='large'/> : null;
        // const{params} = this.state.dataSource;
        // console.log("data :"+params);

      return (
        <View style={styles.container}>
          <Text style={styles.description}>
            Search images from Pixabay.com
          </Text>
          <View style={styles.flowRight}>
            <TextInput
              underlineColorAndroid={'transparent'}
              style={styles.searchInput}
              value={this.state.searchString}
              onChange={this._onSearchTextChanged}
              placeholder='Search images'/>
              <TextInput
              underlineColorAndroid= {'transparent'}
              style={styles.searchInput}
              value={this.state.searchNumber}
              onChange={this._onSearchNumberOfColumnChanged}
              placeholder='number'/>

            <Button
              onPress={this._onSearchPressed}
              color='#48BBEC'
              title='Go'
            />
          </View>
          {spinner}
          <Text style={styles.description}>{this.state.message}</Text>
           <FlatList
          numColumns={2}
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
         // onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
        />
        </View>
        
      );
    }
  }
  
  const styles = StyleSheet.create({
    description: {
      marginBottom: 10,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565'
    },
    container: {
      padding: 20,
      marginTop: 10,
      alignItems: 'center'
    },
    flowRight: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    searchInput: {
      height: 36,
      padding: 4,
      marginRight: 5,
      flexGrow: 1,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#48BBEC',
      borderRadius: 8,
      color: '#48BBEC',
    },
    image: {
        flex:1

    },
    rowContainer: {
        flexDirection: 'row',
        padding: 5
      },
      thumb: {
        width: 150,
        height:150,
        marginRight: 10
      },
  });