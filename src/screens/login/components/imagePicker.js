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
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ImagePickerComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const onSelectImagePressed = () => {
    const options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    setShowModal(true);

    // ImagePicker.showImagePicker(options, res => {
    //   console.log('Response = ', res);
    //   if (res.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (res.error) {
    //     console.log('ImagePicker Error: ', res.error);
    //   } else if (res.customButton) {
    //     console.log('User tapped custom button: ', res.customButton);
    //     alert(res.customButton);
    //   } else {
    //     let source = res;
    //     this.setState({
    //       resourcePath: source,
    //     });
    //   }
    // });
  };
  return (
    <View>
      <Button title="Choose Image" onPress={onSelectImagePressed} />
      <>
        {showModal ? (
          <Modal
            style={{
              margin: 20,
              justifyContent: 'center',
              borderRadius: 10,
              alignItems: 'center',
            }}
            isVisible={showModal}
            onBackdropPress={() => setShowModal(false)}>
            <View
              style={{
                height: '30%',
                width: '90%',
                backgroundColor: 'red',
                borderRadius: 5,
              }}></View>
          </Modal>
        ) : (
          <></>
        )}
      </>
    </View>
  );
};

export default ImagePickerComponent;
