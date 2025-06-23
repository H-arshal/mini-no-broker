
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UploadImagesToCloudinary from '../components/ImageUpload';
import config from '../config';

const AddPropertyScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [rent, setRent] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddProperty = async () => {
    if (!title || !city || !rent || !type || !description || imageUrls.length === 0) {
      Alert.alert('Validation Error', 'All fields and at least one image are required');
      return;
    }

    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Authentication', 'User not logged in');
        return;
      }

      const response = await axios.post(
        `${config.BASE_URL}/api/properties`,
        { title, city, rent, type, description, imageUrls: imageUrls },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      Alert.alert('Success', 'Property listed successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Add Property Error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to add property';
      Alert.alert('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>List Your Property</Text>
          <Text style={styles.subtitle}>Fill in the details below</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Property Title*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Spacious 2BHK Apartment"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Bangalore"
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Rent (₹)*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 15000"
              value={rent}
              onChangeText={setRent}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Property Type*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 2BHK, 3BHK, Villa"
              value={type}
              onChangeText={setType}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe amenities, location, etc."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Property Images*</Text>
            <UploadImagesToCloudinary
              onUploadComplete={setImageUrls}
              onUploadStart={() => setIsUploading(true)}
              onUploadEnd={() => setIsUploading(false)}
              buttonStyle={styles.uploadButton}  // Pass the style to the component
              buttonTextStyle={styles.uploadButtonText}  // Pass the text style
            />
            {imageUrls.length > 0 && (
              <View style={styles.imagesContainer}>
                {imageUrls.map((url, index) => (
                  <Image
                    key={index}
                    source={{ uri: url }}
                    style={styles.thumbnail}
                  />
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.button, (isLoading || isUploading) && styles.buttonDisabled]}
            onPress={handleAddProperty}
            disabled={isLoading || isUploading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Submitting...' :
               isUploading ? 'Uploading Images...' : 'List Property'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    paddingTop: 15,
  },
  button: {
    backgroundColor: '#4a6fa5',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#4a6fa5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  uploadButton: {
    backgroundColor: '#4a6fa5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#4a6fa5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    marginTop: 8,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});

export default AddPropertyScreen;