import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';

export const UserCardComponent = props => {
  return (
    <View>
      <View style={styles.flexView}>
        <Avatar.Image size={70} style={styles.image} />
        <View style={styles.textView}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Modal', {props});
            }}>
            <Text style={styles.nameView}>{props?.fname}</Text>
            <Text style={styles.educationView}>{props?.education}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.border}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  border: {
    borderWidth: 0.5,
    borderColor: 'grey',
    marginTop: 10,
    marginBottom: 25,
    opacity: 0.5,
  },
  flexView: {
    flexDirection: 'row',
  },
  image: {
    marginLeft: 12,
  },
  textView: {
    marginLeft: 18,
    paddingTop: 12,
  },
  nameView: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  educationView: {
    fontSize: 18,
    color: 'grey',
  },
});
