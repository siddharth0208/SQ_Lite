import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {TextComponent} from '../components/textComponent';
import {TextInputcomponent} from '../components/textInputComponent';
import {
  checkPasswordValidity,
  emailValidation,
} from '../validation/passwordvalidation';
import {openDatabase} from 'react-native-sqlite-storage';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';

let db = openDatabase({name: 'UserDatabase1.db'});

const educationData = [
  {label: 'Post Graduate', value: '1'},
  {label: 'Graduate', value: '2'},
  {label: 'HSC/Diploma', value: '3'},
  {label: 'SSC', value: '4'},
];

export const Register = ({navigation}) => {
  const [checkpass, setCheckpass] = useState('');
  const [checkemail, setCheckemail] = useState('');
  const [checked, setChecked] = useState('Male');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  console.log('value', value);

  const [data, setData] = useState({
    fname: '',
    lname: '',
    Phonenumber: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [isvalid, setIsvalid] = useState({
    fname: false,
    lname: false,
    Phonenumber: false,
    email: false,
    password: false,
    confirmpassword: false,
  });
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_fname VARCHAR(20), user_lname VARCHAR(20), user_contact INT(10), user_email VARCHAR(255), user_pass VARCHAR(255),user_gender VARCHAR(255),user_education VARCHAR(255), user_DOB VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  const onfnameChange = fname => {
    if (fname.length == 0 || fname.length < 3) {
      setIsvalid({...isvalid, fname: false});
      setData({...data, fname});
    } else {
      setIsvalid({...isvalid, fname: true});
      setData({...data, fname});
    }
  };
  const onlnameChange = lname => {
    if (lname.length == 0 || lname.length < 3) {
      setIsvalid({...isvalid, lname: false});
      setData({...data, lname});
    } else {
      setIsvalid({...isvalid, lname: true});
      setData({...data, lname});
    }
  };
  const onPhonenumberChange = Phonenumber => {
    if (Phonenumber.length === 0 || Phonenumber.length < 10) {
      setIsvalid({...isvalid, Phonenumber: false});
      setData({...data, Phonenumber});
    } else {
      setData({...data, Phonenumber});
      setIsvalid({...isvalid, Phonenumber: true});
    }
  };
  const onemailChange = email => {
    var checkEmailMsg = emailValidation(email);
    console.log('checkEmailMsg=>', checkEmailMsg);
    setCheckemail(checkEmailMsg);
    if (checkEmailMsg) {
      setIsvalid({...isvalid, email: false});
      setData({...data, email});
    } else {
      setIsvalid({...isvalid, email: true});
      setData({...data, email});
    }
  };
  const onpasswordChange = password => {
    var checkpassword = checkPasswordValidity(password);
    setCheckpass(checkpassword);

    if (checkpassword) {
      setData({...data, password});
      setIsvalid({...isvalid, password: false});
    } else {
      setIsvalid({...isvalid, password: true});
      setData({...data, password});
    }
  };
  const onconfirmpasswordeChange = confirmpassword => {
    if (data.password === confirmpassword) {
      setData({...data, confirmpassword});
      setIsvalid({...isvalid, confirmpassword: true});
    } else {
      setIsvalid({...isvalid, confirmpassword: false});
      setData({...data, confirmpassword});
    }
  };

  const cleanInputData = () => {
    setData({
      fname: '',
      lname: '',
      Phonenumber: '',
      email: '',
      password: '',
      confirmpassword: '',
    });
    setIsvalid({
      fname: false,
      lname: false,
      Phonenumber: false,
      email: false,
      password: false,
      confirmpassword: false,
    });
  };
  const onSubmit = () => {
    if (
      isvalid.fname != false &&
      isvalid.lname != false &&
      isvalid.email != false &&
      isvalid.password != false &&
      isvalid.confirmpassword != false &&
      isvalid.Phonenumber != false
    ) {
      db.transaction(function (txn) {
        txn.executeSql(
          'INSERT INTO table_user(user_fname , user_lname , user_contact , user_email, user_pass,user_gender,user_education,user_DOB ) VALUES (?,?,?,?,?,?,?,?)',
          [
            data.fname,
            data.lname,
            data.Phonenumber,
            data.email,
            data.password,
            checked,
            value,
            date.toLocaleDateString(),
          ],
          (tex, res) => {
            if (res.rowsAffected == 1) {
              cleanInputData();
              navigation.navigate('Users');
            } else {
              console.log('res', res);
            }
          },
          error => {
            console.log('error', error);
          },
        );
      });
    } else {
      Alert.alert('Please Fill all field carefully');
    }
  };
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'black'}]}>
          Education
        </Text>
      );
    }
    return null;
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Text style={styles.head}>Register</Text>
      <View style={styles.border}></View>

      <TextComponent text="First Name*" />
      <TextInputcomponent
        placeholder="Enter your first name here"
        value={data.fname}
        onChangeText={value => {
          onfnameChange(value);
        }}
        img={require('../assets/user.jpeg')}
      />
      {isvalid.fname ? (
        []
      ) : (
        <Text style={styles.helpTextStyle}>First name can't be empty</Text>
      )}
      <TextComponent text="Last Name*" />
      <TextInputcomponent
        placeholder="Enter your last name here"
        value={data.lname}
        onChangeText={value => {
          onlnameChange(value);
        }}
        img={require('../assets/user.jpeg')}
      />
      {isvalid.lname ? (
        []
      ) : (
        <Text style={styles.helpTextStyle}>Last name can't be empty</Text>
      )}
      <TextComponent text="Phone Number*" />
      <TextInputcomponent
        placeholder="Enter your Phone number here"
        value={data.Phonenumber}
        onChangeText={value => {
          onPhonenumberChange(value);
        }}
        img={require('../assets/telephone.jpeg')}
      />
      {isvalid.Phonenumber ? (
        []
      ) : (
        <Text style={styles.helpTextStyle}>Phonenumber can't be empty</Text>
      )}
      <TextComponent text="Email*" />
      <TextInputcomponent
        placeholder="Enter your Email here"
        value={data.email}
        onChangeText={value => {
          onemailChange(value);
        }}
        img={require('../assets/mail.jpeg')}
      />
      {isvalid.email ? (
        []
      ) : data.email.length === 0 ? (
        <Text style={styles.helpTextStyle}>Email can't be empty</Text>
      ) : (
        <Text style={styles.helpTextStyle}>{checkemail}</Text>
      )}

      <TextComponent text="Gender*" />
      <View
        style={{
          marginBottom: 30,
          marginLeft: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.gender}>Male</Text>
        <RadioButton
          value="Male"
          status={checked === 'Male' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Male')}
        />
        <Text style={styles.gender}>Female</Text>
        <RadioButton
          value="Female"
          status={checked === 'Female' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Female')}
        />
      </View>
      <View>
        <TextComponent text="Password*" />
        <TextInputcomponent
          placeholder="Enter Password  here"
          value={data.password}
          onChangeText={value => {
            onpasswordChange(value);
          }}
          img={require('../assets/lock.jpg')}
        />
        {isvalid.password ? (
          []
        ) : data.password.length == 0 ? (
          <Text style={styles.helpTextStyle}>password can't be empty</Text>
        ) : (
          <Text style={{color: 'red'}}>{checkpass} </Text>
        )}
        <TextComponent text="Confirm Password*" />
        <TextInputcomponent
          placeholder="Enter Confirm Password here"
          value={data.confirmpassword}
          onChangeText={value => {
            onconfirmpasswordeChange(value);
          }}
          img={require('../assets/lock.jpg')}
        />
        {isvalid.confirmpassword ? (
          []
        ) : (
          <Text style={styles.helpTextStyle}>Field can't be empty</Text>
        )}
      </View>
      <TextComponent text="Education*" />
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: 'black'}}
          data={educationData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? value : 'Select'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.label);
            setIsFocus(false);
          }}
        />
      </View>
      <TextComponent text="Date Of Birth" />
      <View style={styles.dateInput}>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}>
          <Text style={{fontSize: 17, color: 'black'}}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          onSubmit();
        }}
        style={styles.button}>
        <Text style={styles.buttonTitle}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
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
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 10,
    marginBottom: 25,
    opacity: 0.5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#003153',
    height: '5%',
    width: '83%',
    marginBottom: '10%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  gender: {
    fontSize: 15,
    color: 'black',
    paddingLeft: 10,
  },
  helpTextStyle: {
    color: 'red',
    paddingLeft: '10%',
    paddingBottom: '4%',
  },
  //Dropdwon component style
  container: {
    alignSelf: 'center',
    width: '90%',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'balck',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  icon: {
    paddingLeft: 30,
    height: 25,
    width: 20,
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  dateInput: {
    marginTop: 10,
    width: '82%',
    alignSelf: 'center',
    height: 50,
    marginBottom: 7,
    borderWidth: 1,
    padding: 10,
  },
});
