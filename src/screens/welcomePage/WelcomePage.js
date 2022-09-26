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
import NavigationHeader from '../../navigationHeader';

const WelcomePage = props => {
  return (
    <View style={{flex: 1}}>
      <NavigationHeader isHomepage={true} navigation={props.navigation} />
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: 'https://image.moengage.com/melorramoengage/202107222036323274414GERRTMelorraLogoNewpngmelorramoengage.png',
          }}
          style={{
            marginTop: 5,
            height: '70%',
            width: '100%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Button
          title="Checkout Products"
          color="#ff8d6d"
          onPress={() => {
            props.navigation.navigate('Products');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WelcomePage;
