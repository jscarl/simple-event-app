import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import {useSelector} from 'react-redux';
import {kStorageModel} from '../../auth/screens/AuthScreen';
import {IAppState} from '../../store';
import {kDefaultFontSize, kStorageUsernameKey} from '../../utils/constants';
import deviceStorage from '../../utils/storage_config';
import {IEventModel} from '../event_types';

const EventScreen: React.FC<any> = props => {
  const {events, isLoading} = useSelector(
    (state: IAppState) => state.eventReducer,
  );
  const {loggedName} = props.route.params;
  const [eventTracked, setEventTracked] = React.useState<IEventModel[]>([]);

  const setupAsyncData = async () => {};

  const useMount = () => {
    setupAsyncData();
  };

  React.useEffect(() => {
    useMount();
    deviceStorage
      .load({key: kStorageUsernameKey})
      .then((val: kStorageModel[]) => {
        for (let i in val) {
          if (val[i].username == loggedName) {
            setEventTracked(val[i].recordedEvents);
          }
        }
      });
  }, []);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `Welcome ${loggedName}`,
      headerRight: () => (
        <IconButton
          icon="logout"
          onPress={() => props.navigation.replace('authScreen')}
        />
      ),
    });
  });

  const trackEventAction = async (username: string, event: IEventModel) => {
    const _storage: kStorageModel[] = await deviceStorage.load({
      key: kStorageUsernameKey,
    });
    if (_storage.length > 0) {
      for (let i in _storage) {
        if (_storage[i].username == username) {
          const _data = _storage[i].recordedEvents;
          if (_data.some(e => e.id == event.id)) {
            _data.splice(
              _data.findIndex(e => e.id == event.id),
              1,
            );
          } else {
            _data.push(event);
          }
          setEventTracked(_data);
        }
        console.log(_storage[i].recordedEvents);
        console.log(eventTracked, 'bakasdasdk');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={styles.loaderBase}>
          <ActivityIndicator animating size="large" color="blue" />
        </View>
      ) : (
        <FlatGrid
          itemDimension={130}
          data={events}
          style={styles.gridView}
          spacing={10}
          renderItem={({item}) => (
            <View style={[styles.itemContainer, {backgroundColor: '#16a085'}]}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <IconButton
                  icon={
                    eventTracked.some(e => e.id === item.id)
                      ? 'star'
                      : 'star-outline'
                  }
                  color="white"
                  onPress={() => trackEventAction(loggedName, item)}
                />
              </View>
              <View>
                <Text style={styles.itemName}>{item.displayName}</Text>
                <Text style={styles.itemCode}>{item.location?.city}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  loaderBase: {
    flex: 1,
    margin: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  itemContainer: {
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 10,
    height: 200,
  },
  itemName: {
    fontSize: kDefaultFontSize + 2,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: kDefaultFontSize,
    color: '#fff',
  },
});

export default EventScreen;
