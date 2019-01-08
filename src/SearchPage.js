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
        message: '',
      };
    }
  
    _onSearchTextChanged = (event) => {
      this.setState({ searchString: event.nativeEvent.text });
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
      const query = urlForQueryAndPage('q', encodeURIComponent(this.state.searchString), 1);
      this._executeQuery(query);
    };
  
    _handleResponse = (response) => {
      this.setState({ isLoading: false , message: '' });
      if (response) {
          this.setState({
              dataSource:response, isLoading:true
            
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
            <Button
              onPress={this._onSearchPressed}
              color='#48BBEC'
              title='Go'
            />
          </View>
          {spinner}
          <Text style={styles.description}>{this.state.message}</Text>
           <FlatList
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        </View>
        
      );
    }
  }
  
  const styles = StyleSheet.create({
    description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565'
    },
    container: {
      padding: 30,
      marginTop: 65,
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
      width: 217,
      height: 138,
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
      },
      thumb: {
        
        width: width,
        height: 80,
        marginRight: 10
      },
  });