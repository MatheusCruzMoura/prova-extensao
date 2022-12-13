import React, { Fragment } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from './screens';
import Home from './screens/home';
import CadastroUsuario from './screens/cadastroUsuario';
import CadastroProduto from './screens/cadastroProduto';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Fragment>
      <StatusBar style="auto" translucent backgroundColor="transparent" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
          <Stack.Screen name="CadastroProduto" component={CadastroProduto} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}
