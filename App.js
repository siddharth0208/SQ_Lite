import React from 'react';
import {Register} from './Src/Screen/register';
import {Users} from './Src/Screen/users';
import {modalScreen} from './Src/Screen/modal';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './Src/Redux/store';
import {Provider} from 'react-redux';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="Modal" component={modalScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
