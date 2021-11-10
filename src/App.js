import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Layout from './components/Layout';
import Navigator from './navigator';
import { LightTheme, DarkTheme } from './themes';
import store from './redux/store';

const config = {
  screens: {
    Home: {
      path: 'quotes/:id?',
      parse: {
        id: (id) => `${id}`,
      },
    },
    QuoteListing: 'list-all',
    Settings: 'settings',
  },
};
const linking = {
  prefixes: [
    'https://sameer-j.github.io/quote-delight/',
    'quote-delight://app',
  ],
  config,
};

const App = () => {
  // const systemTheme = useColorScheme();
  const systemTheme = 'light';

  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <NavigationContainer
          linking={linking}
          theme={systemTheme === 'dark' ? DarkTheme : LightTheme}>
          <Layout>
            <Navigator />
          </Layout>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
