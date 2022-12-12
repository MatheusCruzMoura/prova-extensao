import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button, Icon, Input } from "react-native-elements";
import axios from 'axios';

import { API_HOST } from '@env';
const API_URL = `http://${API_HOST}/`

export default function CadastroUsuario({ navigation }) {

    const [getNome, setNome] = useState('');
    const [getLogin, setLogin] = useState('');
    const [getSenha, setSenha] = useState('');
    const [getSenhaRepetida, setSenhaRepetida] = useState('');
    const [getVisivel, setVisivel] = useState();
    const [getEye, setEye] = useState('');
    const [getLock, setLock] = useState('');
    const [getErroSenhasDiferentes, setErroSenhasDiferentes] = useState();
    const [getErroInputNuloNome, setErroInputNuloNome] = useState();
    const [getErroInputNuloLogin, setErroInputNuloLogin] = useState();
    const [getErroInputNuloSenha, setErroInputNuloSenha] = useState();
    const [getErroInputSenhaRepetida, setErroInputSenhaRepetida] = useState();

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

    var validarInput = {
        nome(value) {
            setNome(value)
            if (value.length > 0) {
                setErroInputNuloNome(0)
            } else {
                setErroInputNuloNome(1)
            }
        },
        login(value) {
            setLogin(value)
            if (value.length > 0) {
                setErroInputNuloLogin(0)
            } else {
                setErroInputNuloLogin(1)
            }
        },
        senha(value) {
            setSenha(value)
            if (value.length > 0) {
                setErroInputNuloSenha(0)

                if (getSenhaRepetida != undefined && getSenhaRepetida != value) {
                    setErroSenhasDiferentes(1)
                    setErroInputSenhaRepetida('As senhas são diferentes!')
                } else {
                    setErroSenhasDiferentes(0)
                }

            } else {
                setErroInputNuloSenha(1)
            }
        },
        senhaRepetida(value) {
            setSenhaRepetida(value)
            if (getSenha === value) {
                setErroSenhasDiferentes(0)
            } else if (value.length > 0) {
                setErroSenhasDiferentes(1)
                setErroInputSenhaRepetida('As senhas são diferentes!')
            } else {
                setErroSenhasDiferentes(1)
                setErroInputSenhaRepetida('Campo obrigatório!')
            }
        }
    }

    async function salvar() {
        if (getNome == undefined) {
            setErroInputNuloNome(1)
        } else if (getLogin == undefined) {
            setErroInputNuloLogin(1)
        } else if (getSenha == undefined) {
            setErroInputNuloSenha(1)
        } else if (getSenhaRepetida == undefined) {
            setErroSenhasDiferentes(1)
            setErroInputSenhaRepetida('Campo obrigatório!')
        } else if (getSenha == getSenhaRepetida) {
            // await axios.post(API_URL, {
            //     nome: getNome,
            //     login: getLogin,
            //     senha: getSenha
            // }).then(function (response) {
            //     navigation.navigate('Index')
            // }).catch(function (error) {
            //     console.log(error);
            // });
        }
    }

    useEffect(() => {
        setVisivel(true)
        setEye('eye')
        setLock('lock')
        setErroInputNuloNome(0)
        setErroInputNuloLogin(0)
        setErroSenhasDiferentes(0)
        setErroInputNuloSenha(0)
    }, [])

    return (
        <Fragment>
            <View style={styles.container}>
                <Header
                    backgroundColor='#333B78'
                    containerStyle={styles.header}
                    leftComponent={
                        <Button
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                paddingVertical: 0,
                                paddingHorizontal: 10
                            }}
                            icon={
                                <Icon
                                    name='angle-left'
                                    type='font-awesome'
                                    color='#fff'
                                    size={30}
                                />
                            }
                            onPress={() => navigation.goBack()}
                        />

                    }
                    centerComponent={
                        { text: 'Cadastro de Usuário', style: { color: '#fff', fontSize: 20 } }
                    }
                />

                <Input
                    placeholder="Nome"
                    value={getNome}
                    onChangeText={value => { validarInput.nome(value) }}
                    errorStyle={{ opacity: getErroInputNuloNome }}
                    errorMessage='Campo obrigatório!'
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    containerStyle={[styles.inputs, { marginTop: 50 }]}
                    inputContainerStyle={styles.inputContainer}
                    style={styles.input}
                />

                <Input
                    placeholder="Login"
                    value={getLogin}
                    onChangeText={value => { validarInput.login(value) }}
                    errorStyle={{ opacity: getErroInputNuloLogin }}
                    errorMessage='Campo obrigatório!'
                    leftIcon={{ type: 'font-awesome', name: 'shield' }}
                    containerStyle={styles.inputs}
                    inputContainerStyle={styles.inputContainer}
                    style={styles.input}
                />

                <Input
                    placeholder="Senha"
                    value={getSenha}
                    onChangeText={value => { validarInput.senha(value) }}
                    errorStyle={{ opacity: getErroInputNuloSenha }}
                    errorMessage='Campo obrigatório!'
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

                <Input
                    placeholder="Repetir Senha"
                    value={getSenhaRepetida}
                    onChangeText={value => { validarInput.senhaRepetida(value) }}
                    errorStyle={{ opacity: getErroSenhasDiferentes }}
                    errorMessage={getErroInputSenhaRepetida}
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
                    title="Cadastrar-se"
                    buttonStyle={[styles.button, { backgroundColor: '#1D99FA' }]}
                    containerStyle={{ marginTop: 30 }}
                    onPress={() => navigation.navigate('Index')}
                />

            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        color: '#fff',
        fontSize: 20,
        marginVertical: 30
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
