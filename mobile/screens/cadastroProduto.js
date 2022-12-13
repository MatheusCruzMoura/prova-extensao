import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Button, Icon, Input } from "react-native-elements";
import axios from 'axios';

import { API_HOST } from '@env';
const API_URL = `http://${API_HOST}/produtos/`

export default function CadastroProduto({ route, navigation }) {

    const [getId, setId] = useState();
    const [getNome, setNome] = useState('');
    const [getImagem, setImagem] = useState('');
    const [getCapacidade, setCapacidade] = useState('');
    const [getPreco, setPreco] = useState('');
    const [getAcao, setAcao] = useState();
    const [getExiste, setExiste] = useState();

    async function inserirDados() {
        await axios.post(API_URL, {
            nome: getNome,
            imagem: getImagem,
            capacidade: getCapacidade,
            preco: getPreco
        }).then(function (response) {
            navigation.navigate('Home')
        }).catch(function (error) {
            console.log(error);
        });
    }

    async function alterarDados() {
        await axios.put(API_URL + getId, {
            nome: getNome,
            imagem: getImagem,
            capacidade: getCapacidade,
            preco: getPreco
        }).then(function (response) {
            navigation.navigate('Home')
        }).catch(function (error) {
            console.log(error);
        });
    }

    function excluirDados() {
        axios.delete(API_URL + getId)
            .then(function (response) {
                navigation.navigate('Home')
            }).catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        setAcao('Cadastrar Produto');
        setExiste(false)

        if (route.params) {
            const { id } = route.params;
            const { nome } = route.params;
            const { imagem } = route.params;
            const { capacidade } = route.params;
            const { preco } = route.params;

            setId(id);
            setNome(nome);
            setImagem(imagem);
            setCapacidade(`${capacidade}`);
            setPreco(`${preco}`);
            setAcao('Editar Produto');
            setExiste(true)
        }
    }, []);

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
                        { text: getAcao, style: { color: '#fff', fontSize: 20 } }
                    }
                />

                <Input
                    placeholder="Nome"
                    onChangeText={(value) => setNome(value)}
                    value={getNome}
                    leftIcon={{ type: 'font-awesome', name: 'mobile' }}
                    containerStyle={[styles.inputs, { paddingTop: 50 }]}
                    inputContainerStyle={styles.inputContainer}
                    style={styles.input}
                />

                <Input
                    placeholder="Imagem"
                    onChangeText={(value) => setImagem(value)}
                    value={getImagem}
                    leftIcon={{ type: 'font-awesome', name: 'image' }}
                    containerStyle={styles.inputs}
                    inputContainerStyle={styles.inputContainer}
                    style={styles.input}
                />

                <Input
                    placeholder="Capacidade"
                    onChangeText={(value) => setCapacidade(value)}
                    value={getCapacidade}
                    leftIcon={{ type: 'font-awesome', name: 'database' }}
                    containerStyle={styles.inputs}
                    inputContainerStyle={styles.inputContainer}
                    style={styles.input}
                    keyboardType='numeric'
                />

                <Input
                    placeholder="Preço"
                    onChangeText={(value) => setPreco(value)}
                    value={getPreco}
                    leftIcon={{ type: 'font-awesome', name: 'dollar' }}
                    containerStyle={styles.inputs}
                    inputContainerStyle={styles.inputContainer}
                    style={styles.input}
                    keyboardType='numeric'
                />

                {getExiste ? (
                    <Fragment>
                        <Button
                            title="Editar"
                            onPress={() => alterarDados()}
                            buttonStyle={styles.button}
                            containerStyle={{ marginTop: 20 }}
                        />
                        <Button
                            title="Excluir"
                            onPress={() => excluirDados()}
                            buttonStyle={[styles.button, { backgroundColor: '#ff3933' }]}
                            containerStyle={{ marginTop: 20 }}
                        />
                    </Fragment>
                ) : (
                    <Button
                        title="Salvar"
                        onPress={() => inserirDados()}
                        buttonStyle={styles.button}
                        containerStyle={{ marginTop: 20 }}
                    />
                )
                }

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
    inputs: {
        paddingBottom: 5,
        alignItems: 'center'
    },
    inputContainer: {
        width: 300
    },
    input: {
        marginLeft: 10
    },
    button: {
        width: 250,
        backgroundColor: '#1D99FA'
    }
});
