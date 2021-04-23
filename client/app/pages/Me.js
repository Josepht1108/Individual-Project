import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  SafeAreaView,
  View, 
  Text, 
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Global from '../Global';
import globalStyles from '../globalStyles';

export default function Me({navigation}) {
  // useEffect(() => {

  // },[])

  signOutPressed = () => {
    fetch("http://localhost:8080/api/manage/logout", {
      method: 'POST',
      headers: {
        'x-auth_token': Global.x_auth_token,
        'x-refresh_token': Global.x_refresh_token,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    navigation.navigate('LoginPage')
  }

  return (
      <SafeAreaView style={globalStyles.safeContainer}>
        <View style={styles.container}>
          <View style={styles.centerView}>
            <Text style={styles.title}>Account</Text>
            <View style={styles.info}>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Email: </Text>
                <Text style={styles.infoText}>{Global.email}</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Firstname: </Text>
                <Text style={styles.infoText}>{Global.firstname}</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Surname: </Text>
                <Text style={styles.infoText}>{Global.surname}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              {/* <TouchableOpacity style={styles.update}>
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity> */}
              <TouchableOpacity 
                style={styles.signOut}
                onPress={signOutPressed}
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height*0.8,
  },
  centerView: {
    backgroundColor: "#A5ACAF",
    width: Dimensions.get('window').width*0.9,
    height: Dimensions.get('window').height*0.7,
    borderRadius: 15, 
    alignItems: 'center',
  },
  title: {
    textAlign:'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 50
  },
  info: {
    width: Dimensions.get('window').width*0.7,
    height: 300,
    justifyContent: 'center',
  },
  infoTextContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  update: {
    width: 135,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateText: {
    fontSize: 18
  },
  signOut: {
    marginTop: 20
  },
  signOutText: {
    color: 'red',
    fontSize: 18,
    textDecorationLine: 'underline', 
  },
});

// Log out action function