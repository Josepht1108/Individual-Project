import React, { useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  Text,
  View, 
  TextInput, 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';

import Global from '../Global';
import globalStyles from '../globalStyles';

const {width} = Dimensions.get('window');

export default function Login({ navigation }) {
  const [xAuthToken, setXAuthToken] = useState("")
  const [xRefreshToken, setXRefreshToken] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginPressed = () => {
    if(email == "" || password == ""){
      alert("Email or Password can't be empty!")
    }
    else{
      fetch('http://localhost:8080/api/manage/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
        })
      })
      .then((response) => {
        if(response.headers.get("x-auth_token")){
          // setXAuthToken(response.headers.get("x-auth_token"));
          // setXRefreshToken(response.headers.get("x-refresh_token"));
          Global.x_auth_token = response.headers.get("x-auth_token");
          Global.x_refresh_token = response.headers.get("x-refresh_token")
        }
        return response.json()
      })
      .then((json) => {
        console.log(json);
        if(json.msg == "login success")
          navigation.navigate('TabNav');
        else{
          alert(json.msg);
        }
      })
      .catch((error) => console.log(error))
    }
  }

  return (
      <SafeAreaView style={globalStyles.safeContainer}>
        <View style={styles.container}>
          <Text style={styles.appTitle}>DEBATE TOOL</Text>
          <TextInput 
            style={styles.userName}
            placeholder=" Email"
            clearButtonMode="while-editing"
            onChangeText={(text) => {setEmail(text)}}
          />
          <TextInput 
            style={styles.password}
            placeholder=" Password"
            clearButtonMode="while-editing"
            secureTextEntry={true}
            onChangeText={(text) => {setPassword(text)}}
          />
          <View style={styles.registerContainer}>
            <Text style={{color: "#fff", lineHeight: 15, fontSize: 12}}>Don't have one?</Text>
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={() => navigation.push('RegisterPage')}
            >
              <Text style={{
                color: "#fff", 
                lineHeight: 15, 
                fontSize: 12, 
                textDecorationLine: 'underline'}}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginContainer}>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={loginPressed} 
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: 'center'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height*0.9,
    width,
  },
  appTitle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  userName: {
    height: 35, 
    width: Dimensions.get('window').width*0.66,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  password: {
    height: 35,
    width: Dimensions.get('window').width*0.66,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    height: 15,
    width: Dimensions.get('window').width*0.66,
    marginTop: 5,
    marginBottom: 10,
  },
  loginContainer: {
    width: 140,
    alignItems: 'center'
  },
  loginButton: {
    backgroundColor: "#fff",
    height: 35,
    width: 140,
    borderRadius: 15,
  },
  loginButtonText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 35
  }
})
