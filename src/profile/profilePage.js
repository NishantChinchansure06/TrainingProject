import React, {useState, UseEffect, useEffect} from 'react';
import {useContext} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../navigation/authProvider';
import {usersRef} from '../firebaseConfig/config';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/database';
import NavigationHeader from '../navigationHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import SignUpPage from '../screens/login/signUpPage';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import UpdateProfileModal from '../screens/login/components/updateProfile';
import {ScrollView} from 'react-native-gesture-handler';

const ProfilePage = props => {
  const {logout, user, update} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [imageURI, setImageURI] = useState('');
  const [showEditProfile, setShowEditProfile] = useState(false);

  const currentUserId = user._user.uid;
  const getCurrentUser = async () => {
    const tempuser = await firestore()
      .collection('users')
      .doc(String(currentUserId))
      .get();

    setCurrentUser(tempuser._data);
    console.log('Current User is: ', tempuser._data, currentUserId);
  };

  const onCameraPressed = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = {uri: res.uri};
        console.log('response : ', JSON.stringify(res), source);
      }
    });
  };

  const getUrl = async URL => {
    console.log('inside get URL');

    const filename = URL.substring(URL.lastIndexOf('/') + 1);

    const reference = await firebase
      .storage()
      .ref(filename)
      .putFile(URL)
      .then(snapshot => {
        console.log('snapshot Image uploaded: ', snapshot);
      })
      .catch(error => {
        console.log('Error in uploading', error);
      });

    const url = await storage().ref(filename).getDownloadURL();
    setImageURI(url);
    onEditImagePressed();
    console.log('response : 1: 2 ', reference, url);
  };

  const onGallaryPressed = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = {uri: res.uri};
        console.log(
          'response : ',
          JSON.parse(JSON.stringify(res)),
          JSON.stringify(res),
          res.assets[0].uri,
        );

        getUrl(res.assets[0].uri);
        setShowEdit(false);
      }
    });
  };

  const onEditImagePressed = () => {
    update(currentUserId, {...currentUser, img_url: imageURI});
  };

  let t = new Date();
  console.log('current time is: ', t);

  useEffect(() => {
    getCurrentUser();
  }, [user]);

  return (
    <>
      {!currentUser ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <NavigationHeader navigation={props.navigation} isProfile={true} />
          <View style={{height: '95%'}}>
            <View
              style={{
                backgroundColor: '#f2f2f9',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 2,
                marginTop: 5,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '68%',
                  height: '100%',
                  borderRadius: 150,
                }}>
                <Image
                  source={{
                    uri: `${currentUser.img_url}`,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 150,
                  }}
                />
                <View
                  style={{
                    backgroundColor: 'transparent',
                    width: '30%',
                    height: '30%',
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowEdit(true);
                    }}
                    style={{
                      height: '50%',
                      width: '50%',
                      backgroundColor: '#e6e3e3',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: 'white',
                    }}>
                    <Icon name="camera" size={25} />
                  </TouchableOpacity>
                  {showEdit && (
                    <Modal
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      isVisible={showEdit}
                      onBackdropPress={() => setShowEdit(false)}>
                      <View
                        style={{
                          height: '25%',
                          width: '80%',
                          justifyContent: 'space-around',
                          backgroundColor: 'white',
                        }}>
                        <TouchableOpacity
                          onPress={onCameraPressed}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="camerao"
                            size={30}
                            style={{marginLeft: 10}}
                          />
                          <Text style={{fontSize: 20, marginLeft: 10}}>
                            Camera
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={onGallaryPressed}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="camerao"
                            size={30}
                            style={{marginLeft: 10}}
                          />
                          <Text style={{fontSize: 20, marginLeft: 10}}>
                            Gallary
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            flexDirection: 'row',

                            justifyContent: 'flex-end',
                            marginRight: 20,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              setShowEdit(false);
                            }}>
                            <Text>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  )}
                </View>
              </View>
            </View>
            <View style={{flex: 3}}>
              <View style={{marginHorizontal: 10, marginTop: 10}}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text>Profile</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowEditProfile(true);
                    }}>
                    <Icon name="edit" size={20} />
                  </TouchableOpacity>
                </View>

                <Text>{`Name: ${currentUser.firstName} ${currentUser.lastName}`}</Text>
                <Text>{`Email: ${currentUser.email}`}</Text>
                <Text>{`Gender: ${currentUser.gender}`}</Text>
                <Text>{`Mobile Number: ${currentUser.mobileNumber}`}</Text>
              </View>
              {showEditProfile && (
                <Modal
                  isVisible={showEditProfile}
                  onBackdropPress={() => setShowEditProfile(false)}>
                  <UpdateProfileModal user={currentUser} />
                </Modal>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Products');
                  }}
                  style={{
                    backgroundColor: '#ff8d6d',
                    height: 30,
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                  }}>
                  <Text style={{color: 'white'}}>Products</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    logout();
                  }}
                  style={{
                    backgroundColor: '#ff8d6d',
                    height: 30,
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                  }}>
                  <Text style={{color: 'white'}}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
export default ProfilePage;
