import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const ProfileImageComponent = ({ 
  size = 150, 
  defaultImage = null,
  onImageChange = () => {},
  style = {} 
}) => {
  const [profileImage, setProfileImage] = useState(defaultImage);

  // Request permissions
  const requestPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    return {
      camera: cameraPermission.status === 'granted',
      mediaLibrary: mediaLibraryPermission.status === 'granted'
    };
  };

  // Show action sheet to choose between camera and library
  const showImagePickerOptions = () => {
    Alert.alert(
      'Select Profile Photo',
      'Choose an option to set your profile photo',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {
          text: 'Photo Library',
          onPress: () => openImageLibrary(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  // Open camera to take photo
  const openCamera = async () => {
    try {
      const permissions = await requestPermissions();
      
      if (!permissions.camera) {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
        onImageChange(imageUri);
      }
    } catch (error) {
      console.error('Error opening camera:', error);
      Alert.alert('Error', 'Failed to open camera. Please try again.');
    }
  };

  // Open image library
  const openImageLibrary = async () => {
    try {
      const permissions = await requestPermissions();
      
      if (!permissions.mediaLibrary) {
        Alert.alert(
          'Permission Required',
          'Photo library permission is required to select photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
        onImageChange(imageUri);
      }
    } catch (error) {
      console.error('Error opening image library:', error);
      Alert.alert('Error', 'Failed to open photo library. Please try again.');
    }
  };

  return (
    <SafeAreaView>
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={[
          styles.imageContainer, 
          { width: size, height: size, borderRadius: size / 2 }
        ]}
        onPress={showImagePickerOptions}
        activeOpacity={0.8}
      >
        {profileImage ? (
          <Image 
            source={{uri: profileImage }} 
            style={[
              styles.profileImage, 
              { width: size, height: size, borderRadius: size / 2 }
            ]}
            resizeMode="cover"
          />
        ) : (
          <View 
            style={[
              styles.placeholderContainer, 
              { width: size, height: size, borderRadius: size / 2 }
            ]}
          >
            <Text style={styles.placeholderText}>+</Text>
            <Text style={styles.placeholderSubText}>Add Photo</Text>
          </View>
        )}
        
        {/* Edit overlay */}
        <View style={styles.editOverlay}>
          <Text style={styles.editText}>✎</Text>
        </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    backgroundColor: '#f0f0f0',
  },
  placeholderContainer: {
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 24,
    color: '#888',
    fontWeight: '300',
  },
  placeholderSubText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProfileImageComponent;