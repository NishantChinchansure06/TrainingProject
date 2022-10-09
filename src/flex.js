import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

const Flex = () => {
  return (
    <View style={{backgroundColor: 'red', flex: 1}}>
      <View style={{backgroundColor: 'green', flex: 1}}></View>
      <View style={{backgroundColor: 'pink', flex: 4}}></View>
      <View>
        <Text>Hii</Text>
      </View>
    </View>
  );
};
export default Flex;
