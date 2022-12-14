import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Header, Button, Icon, Text, Card } from "react-native-elements";
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

import FlashMessage, { showMessage } from 'react-native-flash-message';

import { API_HOST } from '@env';

export default function Home({ route, navigation }) {

    const [getToken, setToken] = useState();
    const [getData, setData] = useState([]);
    const refresh = useIsFocused();

    async function validarToken(token) {
        await axios.get(`http://${API_HOST}/usuarios/auth`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function (response) {
            if (response.data.erro) {
                showMessage({
                    message: "Token de autenticção expirado!",
                    type: "danger",
                });
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
            const result = await axios(`http://${API_HOST}/produtos`)
            setData(result.data);
        }
        resgatarDados();
    }, [refresh])

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('CadastroProduto', { id: item.id, nome: item.nome, imagem: item.imagem, capacidade: item.capacidade, preco: item.preco })}
        >
            <Card containerStyle={{ padding: 0, borderRadius: 20, overflow: 'hidden' }}>
                <Card.Image
                    source={{ uri: `${item.imagem}` }}
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
            <FlashMessage position="center"></FlashMessage>
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
