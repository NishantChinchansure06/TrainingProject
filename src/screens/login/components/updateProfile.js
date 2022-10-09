import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import * as yup from 'yup';
import {connect, Formik} from 'formik';
import {AuthContext} from '../../../navigation/authProvider';

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
//49VdsHCeDTVQFttdFMWzQsKLazg2
const UpdateProfileModal = props => {
  const [selectedGender, setSelectedGender] = useState(0);
  const {update} = useContext(AuthContext);

  console.log('Inside update profileModal: ', props);
  const startingValues = props.user || {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    gender: '',
  };
  console.log('Inside update profileModal: ', props, startingValues);
  const onUpdatePressed = values => {
    update(values.userId, values);
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <Formik
        initialValues={startingValues}
        validationSchema={loginValidationSchema}
        onSubmit={values => {
          onUpdatePressed(values);
          console.log('values: ', values);
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
            <Text style={{color: 'black', fontWeight: 'bold', marginLeft: 10}}>
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
                        values.gender === 'Male' ? 'black' : 'white'
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
                        values.gender === 'Female' ? 'black' : 'white'
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
                        values.gender === 'Other' ? 'black' : 'white'
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
                <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
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
              </TouchableOpacity>
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
              )} */}
              <View style={{marginTop: 15}}>
                <Button
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Update"
                />
              </View>
            </View>

            {/* <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
              <Text>Already an user? </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Home');
                }}>
                <Text style={{color: 'blue'}}>Login</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UpdateProfileModal;
