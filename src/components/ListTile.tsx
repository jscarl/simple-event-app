import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const ListTile: React.FC<{
  // thumbnail: string;
  title: string;
  subtitle: string;
  onPress: Function;
}> = ({title, subtitle, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress}>
      <View
        style={[
          styles.sectionContainer,
          {
            flexDirection: 'row',
          },
        ]}>
        <TouchableHighlight style={styles.thumbnailContainer}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/150',
            }}
            style={styles.thumbnailImage}
          />
        </TouchableHighlight>
        <View style={[styles.sectionInformation, {flexDirection: 'column'}]}>
          <Text> {title} </Text>
          <Text> {subtitle} </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  thumbnailContainer: {
    marginRight: 10,
    height: 80,
    width: 80,
    overflow: 'hidden',
  },
  thumbnailImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  sectionContainer: {
    backgroundColor: 'red',
    flex: 1,
    padding: 8,
  },
  sectionInformation: {},
});

export default ListTile;
