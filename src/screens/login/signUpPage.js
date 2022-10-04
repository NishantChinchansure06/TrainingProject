import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Pressable,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {doc, setDoc} from 'firebase/firestore';
import database from '@react-native-firebase/database';
import {AuthContext} from '../../navigation/authProvider';
import {db} from '../../firebaseConfig/config';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const SignUpPage = () => {
  const [selectedGender, setSelectedGender] = useState(0);
  const {register} = useContext(AuthContext);

  const startingValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    gender: '',
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
    register(values);
  };

  return (
    <View>
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
          <>
            <TextInput
              name="firstName"
              style={{borderWidth: 0.5, borderRadius: 5, marginTop: 10}}
              placeholder="Enter First Name"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
            />
            <TextInput
              name="lastName"
              style={{borderWidth: 0.5, borderRadius: 5, marginTop: 10}}
              placeholder="Enter Last Name"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
            />
            <View
              style={{
                flexDirection: 'row',
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
              <Text>Female</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGender(2);
                  setFieldValue('gender', 'Male');
                }}
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 75,
                  borderWidth: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
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
              <Text>Other</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGender(3);
                  setFieldValue('gender', 'Male');
                }}
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 75,
                  borderWidth: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
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
            <TextInput
              name="email"
              style={{borderWidth: 0.5, borderRadius: 5, marginTop: 10}}
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
            )}

            <TextInput
              name="mobileNumber"
              style={{borderWidth: 0.5, borderRadius: 5, marginTop: 10}}
              placeholder="Enter Mobile Number"
              onChangeText={handleChange('mobileNumber')}
              onBlur={handleBlur('mobileNumber')}
              value={values.mobileNumber}
              keyboardType="numeric"
            />
            <TextInput
              name="password"
              style={{borderWidth: 0.5, borderRadius: 5, marginTop: 10}}
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

            <Button
              onPress={handleSubmit}
              disabled={!isValid}
              title="Sign In"
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpPage;
