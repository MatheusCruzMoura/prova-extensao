import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Header, Button, Icon, Text, Card } from "react-native-elements";
import axios from 'axios';

import { API_HOST } from '@env';
const API_URL_PRODUTOS = `http://${API_HOST}/produtos`
const API_URL_AUTH = `http://${API_HOST}/usuarios/auth`

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default function Home({ route, navigation }) {

    const [getToken, setToken] = useState();
    const [getData, setData] = useState([]);

    async function validarToken(token) {
        await axios.get(API_URL_AUTH, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (response) {
            if (response.data.erro) {
                navigation.navigate('Index')
            }
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        if (route.params) {
            const { token } = route.params;
            setToken(token)
        }

        if (getToken != undefined) {
            validarToken(getToken);
        }

        async function resgatarDados() {
            const result = await axios(API_URL_PRODUTOS)
            setData(result.data);
        }
        resgatarDados();
    })

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('CadastroProduto', { id: item.id, nome: item.nome, imagem: item.imagem, capacidade: item.capacidade, preco: item.preco })}
        >
            <Card containerStyle={{ padding: 0, borderRadius: 20, overflow: 'hidden' }}>
                <Card.Image
                    source={{ uri: item.imagem }}
                    style={{ width: 300, height: 200, resizeMode: 'contain', borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                </Card.Image>
                <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Produto: </Text>{item.nome}</Text>
                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Armazenameno: </Text>{item.capacidade}GB</Text>
                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Valor: R$ {item.preco}</Text></Text>
                </View>
            </Card>
        </TouchableOpacity>
    )

    return (
        <Fragment>
            <View style={styles.container}>
                <Header
                    backgroundColor='#333B78'
                    containerStyle={styles.header}
                    rightComponent={
                        <Button
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                paddingVertical: 0,
                                paddingHorizontal: 10
                            }}
                            icon={
                                <Icon
                                    name='plus'
                                    type='font-awesome'
                                    color='#fff'
                                    size={30}
                                />
                            }
                            onPress={() => navigation.navigate('CadastroProduto')}
                        />
                    }
                    centerComponent={
                        { text: 'Lista de Produtos', style: { color: '#fff', fontSize: 20 } }
                    }
                />

                <FlatList
                    keyExtractor={keyExtractor}
                    data={getData}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        fle: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
