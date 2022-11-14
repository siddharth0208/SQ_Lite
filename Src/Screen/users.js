import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {UserCardComponent} from '../components/userCardComponent';
import {useSelector} from 'react-redux';
import {openDatabase} from 'react-native-sqlite-storage';
import {set} from 'immer/dist/internal';
let db = openDatabase({name: 'UserDatabase1.db'});

export const Users = ({navigation}) => {
  const [userList, setUserList] = useState([]);
  console.log('userlist', userList);
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM table_user', [], (tx, res) => {
        var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          console.log(res.rows.item(i));
          temp.push(res.rows.item(i));
        }
        setUserList(temp);
      });
    });
  }, []);
  const {userData} = useSelector(state => state.user);
  console.log('userData', userData);
  const renderItem = ({item}) => {
    return (
      <UserCardComponent
        navigation={navigation}
        fname={item.user_fname}
        lname={item.user_lname}
        phone={item.user_contact}
        email={item.user_email}
        pass={item.user_pass}
        gender={item.user_gender}
        education={item.user_education}
        DOB={item.user_DOB}
      />
    );
  };
  return (
    <View style={{height: '100%'}}>
      <Text style={styles.head}>Users</Text>
      <View style={styles.border}></View>
      <View style={styles.midView}>
        <FlatList
          data={userList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register');
        }}
        style={styles.button}>
        <Text style={styles.buttonTitle}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  head: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  border: {
    borderWidth: 0.5,
    borderColor: 'grey',
    marginTop: 20,
    marginBottom: 5,
    opacity: 0.5,
  },
  button: {
    backgroundColor: '#003153',
    height: 62,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 22,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  midView: {
    flex: 1,
  },
});
