import React, { useState } from 'react';
import { 
    SafeAreaView, 
    View,
    Text, 
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Global from '../Global';
import globalStyles from '../globalStyles';

export default function CreateTopic({ navigation }) {
    const question1 = "Do you agree?";
    const question2 = "What's your opinion?";
    const question3 = "Why is that the case?";
    const question4 = "Do you have an example?";

    const [topic, setTopic] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");

    const CreateTopic = () => {
        fetch('http://localhost:8080/api/manage/topic/create', {
            method: 'POST',
            headers: {
                'x-auth_token': Global.x_auth_token,
                'x-refresh_token': Global.x_refresh_token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "questions": [
                    { 
                        "answer": answer1, 
                        "question": question1 
                    },
                    { 
                        "answer": answer2, 
                        "question":question2 
                    },
                    { 
                        "answer": answer3, 
                        "question": question3 
                    },
                    { 
                        "answer": answer4, 
                        "question": question4 
                    }
                ],
                "topic": topic
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.msg == "Success"){
                console.log(json.data)
                Global.topicId=json.data
                navigation.navigate("TabNav")
            }
        })

    }

    return (
        <SafeAreaView style={globalStyles.safeContainer}>
            <TouchableOpacity 
                onPress={() => {navigation.goBack()}}
            >
                <Ionicons 
                    style={styles.icon} 
                    name={"arrow-back"} 
                    size={40} 
                    color={"#EFE8E9"} 
                />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.title}>Create A New Topic</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.qContainer}>
                        <Text style={styles.qText}>Topic: </Text>
                        <TextInput 
                            style={styles.input} 
                            multiline={true}
                            onChangeText={(text) => {setTopic(text)}}
                        />
                    </View>
                    <View style={styles.qContainer}>
                        <Text style={styles.qText}>Do you agree? </Text>
                        <TextInput 
                            style={styles.input} 
                            multiline={true}
                            onChangeText={(text) => {setAnswer1(text)}}
                        />
                    </View>
                    <View style={styles.qContainer}>
                        <Text style={styles.qText}>What's your opinion? </Text>
                        <TextInput 
                            style={styles.input} 
                            multiline={true}
                            onChangeText={(text) => {setAnswer2(text)}}
                        />
                    </View>
                    <View style={styles.qContainer}>
                        <Text style={styles.qText}>Why is that the case? </Text>
                        <TextInput 
                            style={styles.input} 
                            multiline={true}
                            onChangeText={(text) => {setAnswer3(text)}}
                        />
                    </View>
                    <View style={styles.qContainer}>
                        <Text style={styles.qText}>Do you have an example? </Text>
                        <TextInput 
                            style={styles.input} 
                            multiline={true}
                            onChangeText={(text) => {setAnswer4(text)}}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={CreateTopic}
                    >
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    icon: {
        paddingLeft: 20
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get("window").height*0.8,
    },
    title: {
        fontSize: 33,
        color: 'white',
    },
    inputContainer: {

    },
    qContainer: {
        marginTop: 15
    },
    qText: {
        color: '#EFE8E9',
        fontSize: 17,
        marginBottom: 2,
    },
    input: {
        backgroundColor: 'white',
        height: 30,
        width: Dimensions.get("window").width*0.8,
    },
    buttonContainer: {
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 20,
    },
    button: {
        width: 120,
        height: 30,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center'
    },
});

// 点击create后去到聊天房间按返回会重回到本页，而不是lobby(因为chatting页是goback函数)