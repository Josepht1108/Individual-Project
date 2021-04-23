import React, { useEffect, useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Modal, 
  TouchableHighlight, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';

import globalStyles from '../globalStyles';
// import API from '../api';

const {width, height} = Dimensions.get("window");

export default function Register({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

  })

  registerPressed = () => {
    fetch('http://localhost:8080/api/manage/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "firstname": firstName,
        "password": password,
        "surname": surName
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if(json.msg == "User register success")
        setModalVisible(true);
      else
        setModal2Visible(true);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <Modal
        animationType='slide'
        visible={modalVisible}
        transparent='true'
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You have an account now!</Text>
            <TouchableHighlight
              style={{ ...styles.loginButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('LoginPage');
              }}
            >
              <Text style={styles.textStyle}>Login Now!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal
        animationType='slide'
        visible={modal2Visible}
        transparent='true'
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Account Already Exist!</Text>
            <TouchableHighlight
              style={{ ...styles.loginButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModal2Visible(!modal2Visible);
              }}
            >
              <Text style={styles.textStyle}>Back</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.titleText}>Register</Text>
        <View style={styles.inputContainer}>
          <Text style={globalStyles.normalText}>Firstname: </Text>
          <TextInput style={styles.inputStyle} clearButtonMode="while-editing" onChangeText={(text) => {setFirstName(text);}}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={globalStyles.normalText}>Surname: </Text>
          <TextInput style={styles.inputStyle} clearButtonMode="while-editing" onChangeText={(text) => {setSurName(text);}}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={globalStyles.normalText}>E-mail: </Text>
          <TextInput 
            style={styles.inputStyle} 
            clearButtonMode="while-editing" 
            textContentType="emailAddress"
            onChangeText={(text) => {setEmail(text);}}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={globalStyles.normalText}>Password: </Text>
          <TextInput 
            style={styles.inputStyle} 
            clearButtonMode="while-editing" 
            secureTextEntry={true} 
            onChangeText={(text) => {setPassword(text);}}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={{color: "#fff", lineHeight: 15, fontSize: 12}}>Already have an account?</Text>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Text style={{
              color: "#fff", 
              lineHeight: 15, 
              fontSize: 12, 
              textDecorationLine: 'underline'}}>Back to Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={registerPressed}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 15,
    width: 250,
    height: 200,
  },
  loginButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height,
    marginTop: '-17%'
  },
  titleText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 25
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width/5*4,
    marginTop: 10,
  },
  inputStyle: {
    backgroundColor: "#fff",
    width: 180,
    height: 30,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width/5*4,
    marginTop: 5,
  },
  registerContainer: {
    width: 140,
    alignItems: 'center',
    marginTop: 15
  },
  registerButton: {
    backgroundColor: "#fff",
    height: 35,
    width: 140,
    borderRadius: 15,
  },
  registerButtonText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 35
  },
})


// Modal的transparent属性: 设为true后弹出的modal背景会是透明的，就不会挡住原本的页面

