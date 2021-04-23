import React, { LogBox, useEffect, useRef, useState } from 'react';
import { 
    SafeAreaView,
    View, 
    Text, 
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import Global from '../Global';
import globalStyles from '../globalStyles';

function MessageList(props) {

    const items = props.items;
    const receiver = props.receiver;
    const listItems = items.map((item, index) => {
        return (
            <View key={index} style={[styles.chatMessage, receiver == item.name ? styles.chatReceiver : null]}>
                <Text style={styles.chatNameReceiver}>{item.name}</Text>
                <Text style={{fontSize: 16}}>{item.message}</Text>
            </View>
        );
    });
    return (
        <>{listItems}</>
    )
}

export default Chatting = ({navigation}) => {
    // const [msg, setMsg] = useState("");
    const scrollRef = useRef();
    const [inputText, setInputText] = useState("");

    const [receiver, setReceiver] = useState("girl");
    const [items, setItems] = useState([]);
    var msgs = [];
    const [questionList, setQuestionList] = useState([]);
    const [msg, setMsg] = useState({
        "topicId": 6,
        "groupMessage": true,
        "msgContent": "Testing"
    })
    const refref = useRef(null);
    let refrefref = useRef(null);

    useEffect(() => {
        // console.log(Global.currentTopicName);
        // console.log(Global.webSocket);
        // setItems(Global.currentTopicMsgList);
        const ac = new AbortController();

        //Generate the previous msg
        const timer1 = setTimeout(() => {
            if (Global.currentTopicMsgList) {
                Global.currentTopicMsgList.every(function(msgElement){
                    Global.currentTopicUserList.every(function(userElement){
                        if (msgElement.fromUserId == userElement.userId){
                            msgs.splice(0,0,{name: userElement.firstname+" "+userElement.surname, message: msgElement.msgcontent});
                            return false;
                        }
                        return true;
                    })
                    return true;
                })
                msgs = msgs.reverse();
                console.log(msgs);
                setItems(msgs);
                msgs = [];
                const timer2 = setTimeout(() => {
                    refref.current.scrollToEnd();
                }, 300);
            }
        }, 600);

        //Check if there is a new msg
        let interval = setInterval(() => {
            fetch(`http://localhost:8080/api/manage/message/pull?isGroupMessage=true&page=1&pageSize=10&topicId=${Global.currentTopicId}`, {
                method: 'GET',
                headers: {
                    "x-auth_token": Global.x_auth_token,
                    "x-refresh_token": Global.x_refresh_token,
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.msg == "Success" && json.data.msg){
                        json.data.msg.every(function(msgElement){
                            Global.currentTopicUserList.every(function(userElement){
                                if (msgElement.fromUserId == userElement.userId){
                                    msgs.splice(0,0,{name: userElement.firstname+" "+userElement.surname, message: msgElement.msgcontent});
                                    return false;
                                }
                                return true;
                            })
                            return true;
                        })
                        msgs = msgs.reverse();
                        setItems(msgs);
                        msgs = [];
                        
                    } else{
                        console.log("No data or Error retrieved");
                    }
                })
        }, 800);
        
        //enterTopic API
        fetch(`http://localhost:8080/api/manage/topic/enter/${Global.currentTopicId}`, {
            method: 'POST',
            headers: {
                "x-auth_token": Global.x_auth_token,
                "x-refresh_token": Global.x_refresh_token,
            }
        })
        .then((response) => response.json())
        .then((json) => console.log("enter topic msg: ", json))
        
        //prepared statements list API
        fetch(`http://localhost:8080/api/manage/topic/question/list?topicId=${Global.currentTopicId}`, {
            method: 'GET',
            headers: {
                "x-auth_token": Global.x_auth_token,
                "x-refresh_token": Global.x_refresh_token,        
            }
        })
        .then((response) => response.json())
        .then((json) => setQuestionList(json.data))

        //Clean up Interval
        return function cleanup() {
            console.log("Cleaning up... ...");
            clearInterval(interval);
            ac.abort();
        }
    },[])
    
    selectA = () => {
        Global.webSocket.send(JSON.stringify({
            "topicId": Global.currentTopicId,
            "groupMessage": true,
            "msgContent": "Do you agree?"
        }))
        
        fetch(`http://localhost:8080/api/manage/topic/question/answer?topicFaqId=${questionList[0].id}`, {
            method: 'GET',
            headers: {
                "x-auth_token": Global.x_auth_token,
                "x-refresh_token": Global.x_refresh_token,
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.msg == "Success"){
                Global.webSocket.send(JSON.stringify({
                    "fromUserId": json.data.userId,
                    "topicId": Global.currentTopicId,
                    "groupMessage": true,
                    "msgContent": json.data.answer
                }))
                setTimeout(() => {
                    refref.current.scrollToEnd();
                }, 300);
            }
        })
    }
    
    selectB = () => {
        Global.webSocket.send(JSON.stringify({
            "topicId": Global.currentTopicId,
            "groupMessage": true,
            "msgContent": "What's your opinion?"
        }))
        
        fetch(`http://localhost:8080/api/manage/topic/question/answer?topicFaqId=${questionList[1].id}`, {
            method: 'GET',
            headers: {
                "x-auth_token": Global.x_auth_token,
                "x-refresh_token": Global.x_refresh_token,
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.msg == "Success"){
                Global.webSocket.send(JSON.stringify({
                    "fromUserId": json.data.userId,
                    "topicId": Global.currentTopicId,
                    "groupMessage": true,
                    "msgContent": json.data.answer
                }))
                setTimeout(() => {
                    refref.current.scrollToEnd();
                }, 300);
            }
        })
    }
    
    selectC = () => {
        Global.webSocket.send(JSON.stringify({
            "topicId": Global.currentTopicId,
            "groupMessage": true,
            "msgContent": "Why is that the case?"
        }))
        
        fetch(`http://localhost:8080/api/manage/topic/question/answer?topicFaqId=${questionList[2].id}`, {
            method: 'GET',
            headers: {
                "x-auth_token": Global.x_auth_token,
                "x-refresh_token": Global.x_refresh_token,
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.msg == "Success"){
                Global.webSocket.send(JSON.stringify({
                    "fromUserId": json.data.userId,
                    "topicId": Global.currentTopicId,
                    "groupMessage": true,
                    "msgContent": json.data.answer
                }))
                setTimeout(() => {
                    refref.current.scrollToEnd();
                }, 300);
            }
        })
    }
    
    selectD = () => {
        Global.webSocket.send(JSON.stringify({
            "topicId": Global.currentTopicId,
            "groupMessage": true,
            "msgContent": "Do you have an example?"
        }))
        
        fetch(`http://localhost:8080/api/manage/topic/question/answer?topicFaqId=${questionList[3].id}`, {
            method: 'GET',
            headers: {
                "x-auth_token": Global.x_auth_token,
                "x-refresh_token": Global.x_refresh_token,
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.msg == "Success"){
                Global.webSocket.send(JSON.stringify({
                    "fromUserId": json.data.userId,
                    "topicId": Global.currentTopicId,
                    "groupMessage": true,
                    "msgContent": json.data.answer
                }))
                setTimeout(() => {
                    refref.current.scrollToEnd();
                }, 300);
            }
        })
    }
    
    sendMsg = () => {
        if(msg){
            console.log("msg in textinput: ", msg);
            Global.webSocket.send(JSON.stringify(msg))
            setMsg({
                "topicId": null,
                "groupMessage": true,
                "msgContent": ""
            });
            setInputText("");
            let scrollTimer = setTimeout(() => {
                refref.current.scrollToEnd();
            }, 500);
        } else{
            alert("Can't send blank message!");
        }
    }
    
    return (
        <SafeAreaView style={globalStyles.safeContainer}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("TabNav")}
            >
                <Ionicons 
                    style={styles.icon} 
                    name={"arrow-back"} 
                    size={40} 
                    color={"#EFE8E9"} 
                />
            </TouchableOpacity>
            {/* <KeyboardAvoidingView Ref={refrefref} behavior={'padding'}> */}
                <View style={styles.container}>
                    <View style={styles.topicContainer}>
                        {/* Show the topic */}
                        <Text style={styles.topicStyle}>{Global.currentTopicName}</Text>
                    </View>
                    <ScrollView ref={refref} style={styles.chatContainer} alwaysBounceVertical={true} keyboardDismissMode={"on-drag"}>
                        <View style={styles.chatBody}>
                            <View style={{height: 15}}></View>
                            <MessageList items={items} receiver={Global.firstname+" "+Global.surname} />
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.messageEdit}>
                    <Menu>
                        <MenuTrigger children={
                            <Ionicons 
                                style={styles.dropUpIcon}
                                name={"chevron-up-circle-outline"} 
                                size={35} 
                                color={"black"} 
                            />
                        }/>
                        <MenuOptions>
                            <MenuOption onSelect={selectA} text={"Do you agree?"} />
                            <MenuOption onSelect={selectB} text={"What's your opinion?"} />
                            <MenuOption onSelect={selectC} text={"Why is that the case?"} />
                            <MenuOption onSelect={selectD} text={"Do you have an example?"} />
                        </MenuOptions>
                    </Menu>
                    <TextInput 
                        style={styles.message} 
                        autoCapitalize={'none'}
                        multiline={true}
                        onChangeText={text => {
                            setMsg({
                                "topicId": Global.currentTopicId,
                                "groupMessage": true,
                                "msgContent": text
                            });
                            setInputText(text);
                        }}
                        value={inputText}
                    />
                    <TouchableOpacity onPress={sendMsg}>
                        <Ionicons
                            style={styles.sendButton}
                            name={"md-send-sharp"}
                            size={35}
                        />
                    </TouchableOpacity>
                </View>
            {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },  
    icon: {
        paddingLeft: 20
    },
    topicContainer: {
        height: 100,
        width: Dimensions.get('window').width*0.9,
        backgroundColor: '#A5ACAF',
        marginTop: 20,
        alignItems: 'center',
    },
    topicStyle: {
        textAlign: 'center',
        fontSize: 23,
        height: 90,
    },
    chatContainer: {
        marginTop: 5,
        height: 615,
        width: Dimensions.get('window').width,
    },
    chatBody: {
        padding: 10,
    },
    chatMessage: {
        position: 'relative',
        backgroundColor: '#B4C7E7',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 25,
    },
    chatReceiver: {
        marginLeft: 'auto',
        backgroundColor: '#95ec69',
    },
    chatNameReceiver: {
        fontSize: 12,
        position: 'absolute',
        top: -18,
        fontWeight: 'bold',
        marginLeft: 'auto',
        color: '#eee',
    },  
    messageEdit: {
        backgroundColor: '#E7E4E4',
        height: 70,
        flexDirection: 'row',
    },
    dropUpIcon: {
        marginTop: 10,
        marginLeft: 20,
    },
    message: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width*0.7,
        height: 30,
        marginTop: 15,
        marginLeft: 15,
    },
    sendButton: {
        marginTop: 10,
        marginLeft: 10,
    },
});