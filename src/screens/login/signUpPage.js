import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {connect, Formik} from 'formik';
import Modal from 'react-native-modal';
import * as yup from 'yup';
import {AuthContext} from '../../navigation/authProvider';
import ImagePickerComponent from './components/imagePicker';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/database';
import {SceneView} from 'react-navigation';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  gender: yup.string().required('Gender required'),
});

const SignUpPage = props => {
  const [selectedGender, setSelectedGender] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const {register} = useContext(AuthContext);
  const [imageURI, setImageURI] = useState('');

  const startingValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    gender: '',
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
      }
    });
  };

  // database()
  //   .ref('/users/123')
  //   .once('value')
  //   .then(snapshot => {
  //     console.log('User data: ', snapshot.val());
  //   });

  // const signUpUser = async values => {
  //   console.log('Submit Pressed 1', values);
  //   await setDoc(doc(db, 'users', 'LA'), {
  //     ...values,
  //   })
  //     .then(() => {
  //       register(values.email, values.password);
  //       console.log('User added successfully');
  //     })
  //     .catch(err => {
  //       console.log('Error Adding User: ', err);
  //     });
  // };

  const signUpUser = async values => {
    register({...values, img_url: imageURI});
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            elevation: 3,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
            SignUp Form
          </Text>
        </View>
        <Formik
          initialValues={startingValues}
          validationSchema={loginValidationSchema}
          onSubmit={values => {
            signUpUser(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            isValid,
          }) => (
            <View style={{marginTop: 5, height: '90%'}}>
              <View>
                <Text
                  style={{color: 'black', fontWeight: 'bold', marginLeft: 10}}>
                  First Name
                </Text>
                <TextInput
                  name="firstName"
                  style={{borderWidth: 0.5, borderRadius: 5, marginTop: 5}}
                  placeholder="Enter First Name"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
              </View>
              <View>
                <Text
                  style={{color: 'black', fontWeight: 'bold', marginLeft: 10}}>
                  Last Name
                </Text>
                <TextInput
                  name="lastName"
                  style={{borderWidth: 0.5, borderRadius: 5, marginTop: 5}}
                  placeholder="Enter Last Name"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />
              </View>
              <Text
                style={{color: 'black', fontWeight: 'bold', marginLeft: 10}}>
                Gender
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '70%',
                  marginTop: 3,
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    flex: 0.3,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text>Male</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedGender(1);
                      setFieldValue('gender', 'Male');
                    }}
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 75,
                      borderWidth: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 5,
                    }}>
                    <View
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 75,

                        backgroundColor: `${
                          selectedGender === 1 ? 'black' : 'white'
                        }`,
                      }}></View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 0.3,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text>Female</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedGender(2);
                      setFieldValue('gender', 'Female');
                    }}
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 75,
                      borderWidth: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 5,
                    }}>
                    <View
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 75,

                        backgroundColor: `${
                          selectedGender === 2 ? 'black' : 'white'
                        }`,
                      }}></View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 0.3,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text>Other</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedGender(3);
                      setFieldValue('gender', 'Other');
                    }}
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 75,
                      borderWidth: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 5,
                    }}>
                    <View
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 75,

                        backgroundColor: `${
                          selectedGender === 3 ? 'black' : 'white'
                        }`,
                      }}></View>
                  </TouchableOpacity>
                </View>

                {/* <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              /> */}
              </View>
              {/* <TextInput
              name="gender"
              placeholder="Gender"
              onChangeText={handleChange('gender')}
              onBlur={handleBlur('gender')}
              value={values.gender}
            /> */}
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginTop: 10,
                  }}>
                  Email
                </Text>
                <TextInput
                  name="email"
                  style={{borderWidth: 0.5, borderRadius: 5, marginTop: 5}}
                  placeholder="Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.email}
                  </Text>
                )}
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginTop: 10,
                  }}>
                  Mobile Number
                </Text>
                <TextInput
                  name="mobileNumber"
                  style={{borderWidth: 0.5, borderRadius: 5, marginTop: 5}}
                  placeholder="Enter Mobile Number"
                  onChangeText={handleChange('mobileNumber')}
                  onBlur={handleBlur('mobileNumber')}
                  value={values.mobileNumber}
                  keyboardType="numeric"
                />
              </View>

              <View>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginTop: 10,
                  }}>
                  Password
                </Text>
                <TextInput
                  name="password"
                  style={{borderWidth: 0.5, borderRadius: 5, marginTop: 5}}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.password}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 10}}>
                {/* <Button
                title="choose image"
                onPress={() => {
                  setShowModal(true);
                }}
              /> */}
                {/* <TouchableOpacity
                  onPress={() => {
                    setShowModal(true);
                  }}
                  style={{
                    backgroundColor: '#bdbbbb',
                    width: '30%',
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 3,
                  }}>
                  <Text>Choose Image</Text>
                </TouchableOpacity> */}
                {showModal && (
                  <Modal
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    isVisible={showModal}
                    onBackdropPress={() => setShowModal(false)}>
                    <View
                      style={{
                        height: '25%',
                        width: '80%',
                        justifyContent: 'space-around',
                        backgroundColor: 'white',
                      }}>
                      {imageURI ? (
                        <Image
                          source={{uri: imageURI}}
                          style={{height: '100%', width: '100%'}}
                        />
                      ) : (
                        <>
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
                                setShowModal(false);
                              }}>
                              <Text>Cancel</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </View>
                  </Modal>
                )}
                <View style={{marginTop: 15}}>
                  <Button
                    onPress={handleSubmit}
                    disabled={!isValid}
                    title="Sign In"
                  />
                </View>
              </View>

              <View
                style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
                <Text>Already an user? </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Home');
                  }}>
                  <Text style={{color: 'blue'}}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default SignUpPage;
