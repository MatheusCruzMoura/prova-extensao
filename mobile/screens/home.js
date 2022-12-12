import React, { Fragment } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Button, Icon, Text, Card } from "react-native-elements";
import axios from 'axios';

import { API_HOST } from '@env';
const API_URL_AUTH = `http://${API_HOST}/`

export default function Home({ route, navigation }) {

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
                            onPress={() => navigation.navigate('Home')}
                        />
                    }
                    centerComponent={
                        { text: 'Lista de Produtos', style: { color: '#fff', fontSize: 20 } }
                    }
                />

                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ width: '100%', marginTop: 10, marginBottom: 50 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Index')}>
                            <Card containerStyle={{ padding: 0, borderRadius: 20, overflow: 'hidden', marginBottom: 10 }}>
                                <Card.Image
                                    source={{ uri: 'https://i.pinimg.com/originals/e4/34/2a/e4342a4e0e968344b75cf50cf1936c09.jpg' }}
                                    style={{ width: 300, height: 200 }}
                                >
                                </Card.Image>
                                <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Produto:</Text> WORLD</Text>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Armazenameno:</Text> WORLD</Text>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Valor: WORLD</Text></Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => navigation.navigate('Index')}>
                            <Card containerStyle={{ padding: 0, borderRadius: 20, overflow: 'hidden', marginBottom: 10 }}>
                                <Card.Image
                                    source={{ uri: 'https://i.pinimg.com/originals/e4/34/2a/e4342a4e0e968344b75cf50cf1936c09.jpg' }}
                                    style={{ width: 300, height: 200 }}
                                >
                                </Card.Image>
                                <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Produto:</Text> WORLD</Text>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Armazenameno:</Text> WORLD</Text>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Valor: WORLD</Text></Text>
                                </View>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Index')}>
                            <Card containerStyle={{ padding: 0, borderRadius: 20, overflow: 'hidden', marginBottom: 10 }}>
                                <Card.Image
                                    source={{ uri: 'https://i.pinimg.com/originals/e4/34/2a/e4342a4e0e968344b75cf50cf1936c09.jpg' }}
                                    style={{ width: 300, height: 200 }}
                                >
                                </Card.Image>
                                <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Produto:</Text> WORLD</Text>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Armazenameno:</Text> WORLD</Text>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Valor: WORLD</Text></Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

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
        justifyContent: 'center',
    }
});
