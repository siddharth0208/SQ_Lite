import React, {useState} from 'react';

import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
export const modalScreen = ({navigation, route}) => {
  const {props} = route.params;
  console.log('route', props);
  return (
    <View style={{flex: 1, marginTop: 0}}>
      <Modal transparent={false}>
        <View style={styles.modalView}>
          <View
            style={{
              marginTop: 70,
              marginLeft: 40,
              marginRight: 40,
              marginBottom: 70,
              backgroundColor: 'white',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <View>
              <Text style={styles.detailsTxt}>First Name - {props.fname} </Text>
              <Text style={styles.detailsTxt}>Last Name - {props.lname} </Text>
              <Text style={styles.detailsTxt}>
                Phonenumber - {props.phone}{' '}
              </Text>
              <Text style={styles.detailsTxt}>Email - {props.email} </Text>
              <Text style={styles.detailsTxt}>Gender - {props.gender} </Text>
              <Text style={styles.detailsTxt}>
                Education - {props.education}{' '}
              </Text>
              <Text style={styles.detailsTxt}>DOB - {props.DOB}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Users');
              }}
              style={styles.button}>
              <Text style={styles.buttonTitle}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 10,
  },
  modalView: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#003153',
    height: '5%',
    width: '45%',
    marginBottom: '10%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 180,
    borderRadius: 12,
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
  },
  detailsTxt: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black',
    fontWeight: '600sid',
  },
});
