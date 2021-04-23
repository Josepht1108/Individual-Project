import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Global from '../Global';
import globalStyles from '../globalStyles';

export default function Lobby({navigation}) {
  const [TOPICS, setTOPICS] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(Global.x_auth_token);
    console.log(Global.x_refresh_token);

    Global.webSocket = new WebSocket(`ws://localhost:8080/api/im/${Global.x_auth_token}/${Global.x_refresh_token}`)
    
    fetch("http://localhost:8080/api/manage/topic/list", {
      method: 'GET',
      headers: {
        'x-auth_token': Global.x_auth_token,
        'x-refresh_token': Global.x_refresh_token,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.msg == "Success"){
        console.log("topics list: ", json.data);
        setTOPICS(json.data);
      }
    })

    fetch("http://localhost:8080/api/manage/profile", {
      method: 'GET',
      headers: {
        "x-auth_token": Global.x_auth_token,
        "x-refresh_token": Global.x_refresh_token,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      Global.email = json.data.email;
      Global.firstname = json.data.firstname;
      Global.surname = json.data.surname;
    })

  },[])

  enterTopic = (topicId, topicName) => {
    Global.currentTopicId = topicId;
    Global.currentTopicName = topicName;

    //get topics users API
    fetch(`http://localhost:8080/api/manage/topic/users/${topicId}`, {
      method: 'GET',
      headers: {
          "x-auth_token": Global.x_auth_token,
          "x-refresh_token": Global.x_refresh_token,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.msg == "Success"){
        Global.currentTopicUserList = json.data;
      } else{
        alert("Get user list error!");
      }
    });

    //pullMsg API
    fetch(`http://localhost:8080/api/manage/message/pull?isGroupMessage=true&page=1&pageSize=10&topicId=${topicId}`, {
      method: 'GET',
      headers: {
          "x-auth_token": Global.x_auth_token,
          "x-refresh_token": Global.x_refresh_token,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.msg == "Success"){
        Global.currentTopicMsgList = json.data.msg;
      } else{
        alert("Pull message error! Please retry.");
      }
    })

    navigation.navigate("ChattingRoom");
    console.log("selected topicID: ", topicId);
  }

  refreshTopicsList = () => {
    setIsLoading(true);

    setTimeout(() => {
      fetch("http://localhost:8080/api/manage/topic/list", {
        method: 'GET',
        headers: {
          'x-auth_token': Global.x_auth_token,
          'x-refresh_token': Global.x_refresh_token,
        }
      })
      .then((response) => response.json())
      .then((json) => {
        if(json.msg == "Success"){
          console.log("refreshed list: ", json.data);
          setTOPICS(json.data);
        }
      })
      .catch((error) => console.error("Error: ", error))

      setIsLoading(false)
    }, 2000);
  }

  return (
      <SafeAreaView style={globalStyles.safeContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.searchContainer}>
            <TextInput 
              style={styles.searchBar}
              placeholder="Search Topics Here"
            />
            <TouchableOpacity 
              style={{marginTop: -2}} 
              onPress={() => {navigation.push("CreateTopic")}}
            >
              <Ionicons name={"add-circle-outline"} size={32} color={"white"} />
            </TouchableOpacity>
          </View>
          <View style={styles.topicsContainer}>
            <FlatList 
              style={styles.flatListStyle}
              data={TOPICS}
              keyExtractor={(item) => item.id.toString()}
              extraData={selectedID}
              renderItem={({ item }) => {
                if(item.id === selectedID) {
                  enterTopic(selectedID, item.name)
                  setSelectedID(null);
                }

                return(
                  <TouchableOpacity onPress={() => setSelectedID(item.id)} style={styles.itemContainer}>
                      <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              }
              refreshing={isLoading}
              onRefresh={refreshTopicsList}
            />
          </View>
        </View>
      </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  searchContainer: {
    width: Dimensions.get('window').width*0.85,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop:15,
  },
  searchBar: {
    backgroundColor: 'white',
    height: 30,
    width: 300,
  },
  topicsContainer: {
    marginTop: 30,
    width: Dimensions.get('window').width*0.85,
    height: Dimensions.get('window').height*0.76,
  },
  flatListStyle: {
    height: Dimensions.get('window').height*0.8,
  },  
  itemContainer: {
    backgroundColor: '#A5ACAF',
    height: 70,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})