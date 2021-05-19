import React from 'react';
import {AsyncStorage, StatusBar, StyleSheet, View} from 'react-native';

import {Headline, Paragraph, TextInput, Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {fetchEvents} from '../../events/event_action';
import {IEventModel} from '../../events/event_types';
import {kStorageUsernameKey} from '../../utils/constants';
import deviceStorage from '../../utils/storage_config';

export type kStorageModel = {
  username: string;
  recordedEvents: IEventModel[];
};

export const AuthScreen: React.FC<any> = props => {
  const dispatch: Dispatch = useDispatch();
  const [name, setName] = React.useState('');

  const checkAuth = async (username: string) => {
    deviceStorage
      .load({
        key: kStorageUsernameKey,
      })
      .then((val: kStorageModel[]) => {
        console.log(val);
        if (val.some(e => e.username == username)) {
          console.log(username);
        } else {
          deviceStorage.save({
            key: kStorageUsernameKey,
            data: [...val, {username: username, recordedEvents: []}],
          });
        }
      })
      .catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            deviceStorage.save({
              key: kStorageUsernameKey,
              data: [{username: username, recordedEvents: []}],
            });
            break;
          case 'ExpiredError':
            deviceStorage.save({
              key: kStorageUsernameKey,
              data: [{username: username, recordedEvents: []}],
            });
            break;
        }
      });
  };

  return (
    <View style={styles.base}>
      <>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      </>

      <View style={styles.header}>
        <Headline style={styles.appTitle}>Event Tracking</Headline>
        <Paragraph style={styles.appDesc}>
          Simple application event tracking
        </Paragraph>
      </View>

      <>
        <View style={styles.divider} />
        <TextInput
          value={name}
          onChangeText={value => setName(value)}
          label="Enter your name"
        />
      </>
      <>
        <View style={styles.divider} />
        <Button
          disabled={false}
          style={styles.btn}
          mode="contained"
          onPress={async () => {
            try {
              checkAuth(name?.toLocaleLowerCase().trim());
              dispatch(fetchEvents());
              // deviceStorage.remove({key: kStorageUsernameKey});
            } catch (error) {
              console.error(error);
            }
            props.navigation.replace('eventScreen', {
              loggedName: name?.toLowerCase(),
            });
          }}>
          Enter Application
        </Button>

        <View style={styles.divider} />
        <View style={styles.divider} />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  divider: {
    height: 16,
  },
  headline: {
    fontSize: 30,
  },
  appDesc: {
    textAlign: 'center',
  },
  header: {
    padding: 32,
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 35,
    lineHeight: 35,
    fontWeight: '700',
  },
  btn: {
    height: 50,
    paddingTop: 6,
    marginBottom: 12,
  },
});
