import {DefaultTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';

const getOrderId = async orderDetails => {
  var instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_SECRET',
  });

  instance.orders.create({
    amount: 50000,
    currency: 'INR',
    receipt: 'receipt#1',
    notes: {
      key1: 'value3',
      key2: 'value2',
    },
  });
  //   try {
  //     const res = await fetch(
  //       'https://api.razorpay.com/v1/orders',
  //       requestOptions,
  //     ).then(response => {
  //       response.json().then(data => {
  //         Alert.alert('Post created at : ', data.createdAt);
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
};
export default getOrderId;
