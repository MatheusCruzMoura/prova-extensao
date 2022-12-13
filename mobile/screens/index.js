import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Avatar, Input, Button, Icon } from "react-native-elements";
import axios from 'axios';

import { API_HOST } from '@env';
const API_URL = `http://${API_HOST}/usuarios/login`

export default function Index({ navigation }) {

    const [getLogin, setLogin] = useState('');
    const [getSenha, setSenha] = useState('');
    const [getVisivel, setVisivel] = useState();
    const [getEye, setEye] = useState('');
    const [getLock, setLock] = useState('');

    function revelarSenha(visivel) {
        if (visivel) {
            setVisivel(false)
            setEye('eye')
            setLock('unlock')
        } else {
            setVisivel(true)
            setEye('eye-slash')
            setLock('lock')
        }
    }

    async function login() {
        if (getLogin != undefined && getSenha != undefined) {
            await axios.post(API_URL, {
                login: getLogin,
                senha: getSenha
            }).then(function (response) {
                setLogin('')
                setSenha('')
                if (response.data.token != undefined) {
                    navigation.navigate('Home', { token: response.data.token })
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        setVisivel(true)
        setEye('eye-slash')
        setLock('lock')
    }, [])

    return (
        <View style={styles.container}>
            <Avatar
                size="xlarge"
                rounded
                icon={{ size: 96, name: 'user', type: 'font-awesome' }}
                activeOpacity={1}
                containerStyle={styles.avatar}
            />

            <Input
                placeholder="Login"
                value={getLogin}
                onChangeText={(value) => { setLogin(value) }}
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                containerStyle={styles.inputs}
                inputContainerStyle={styles.inputContainer}
                style={styles.input}
            />

            <Input
                placeholder="Senha"
                value={getSenha}
                onChangeText={(value) => { setSenha(value) }}
                leftIcon={
                    <Icon
                        name={getLock}
                        type='font-awesome'
                    />
                }
                rightIcon={
                    <Icon
                        name={getEye}
                        type='font-awesome'
                        onPress={() => revelarSenha(getVisivel)}
                    />

                }
                secureTextEntry={getVisivel}
                containerStyle={styles.inputs}
                inputContainerStyle={styles.inputContainer}
                style={styles.input}
            />

            <Button
                title="Entrar"
                buttonStyle={[styles.button, { backgroundColor: '#1D99FA' }]}
                containerStyle={{ marginTop: 30 }}
                onPress={() => login()}
            />

            <Button
                title="Cadastrar-se"
                type="outline"
                buttonStyle={[styles.button, { backgroundColor: 'rgba(255, 255, 255, 0.075)' }]}
                containerStyle={{ marginTop: 20 }}
                onPress={() => navigation.navigate('CadastroUsuario')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight
    },
    avatar: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginTop: 100,
        marginBottom: 30
    },
    inputs: {
        alignItems: 'center'
    },
    inputContainer: {
        width: 300
    },
    input: {
        marginLeft: 10
    },
    button: {
        width: 250
    }
});
