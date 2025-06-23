import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const CLOUD_NAME = 'dqwgunrka';
const UPLOAD_PRESET = 'mini-no-broker';

const UploadImagesToCloudinary = ({
  onUploadComplete,
  onUploadStart,
  onUploadEnd,
  buttonStyle,
  buttonTextStyle
}) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const pickImages = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });

      if (!images || images.length === 0) {
        Alert.alert('No images selected', 'Please select at least one image.');
        return;
      }

      setIsUploading(true);
      if (onUploadStart) onUploadStart();

      const uploadPromises = images.map(async (image) => {
        const formData = new FormData();
        formData.append('file', {
          uri: image.path,
          type: image.mime || 'image/jpeg',
          name: `upload_${Date.now()}.jpg`,
        });
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          return response.data.secure_url;
        } catch (error) {
          console.error('Single image upload failed:', error.message);
          return null;
        }
      });

      const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);

      if (uploadedUrls.length === 0) {
        throw new Error('All uploads failed');
      }

      setImageUrls(uploadedUrls);
      onUploadComplete?.(uploadedUrls);
      Alert.alert('Upload Successful', `${uploadedUrls.length} images uploaded!`);
    } catch (error) {
      console.error('Upload error:', error?.response?.data || error.message);
      Alert.alert('Upload failed', error.message || 'Please try again later.');
    } finally {
      setIsUploading(false);
      if (onUploadEnd) onUploadEnd();
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[buttonStyle, isUploading && { opacity: 0.7 }]}
        onPress={pickImages}
        disabled={isUploading}
      >
        <Text style={buttonTextStyle}>
          {isUploading ? 'Uploading...' : 'Pick & Upload Images'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadImagesToCloudinary;