import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigation from './src/navigations/RootNavigation';
import store from './src/store';

declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
