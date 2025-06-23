import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

const EditPropertyScreen = ({ route, navigation }) => {
  const { property } = route.params;

  const [formData, setFormData] = useState({
    title: property.title || '',
    city: property.city || '',
    rent: property.rent?.toString() || '',
    type: property.type || '',
    description: property.description || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleUpdateProperty = async () => {
  if (!formData.title || !formData.city || !formData.rent || !formData.type || !formData.description) {
    Alert.alert('Validation Error', 'All fields are required');
    return;
  }

  try {
    setIsSubmitting(true);

    await axios.put(
      `${config.BASE_URL}/api/properties/${property.id}`,
      {
        title: formData.title,
        city: formData.city,
        rent: parseInt(formData.rent),
        type: formData.type,
        description: formData.description
      }
    );


    Alert.alert('Success', 'Property updated successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('MyProperties')}
    ]);
  } catch (error) {
    console.error('Update Error:', error);
    const errorMsg = error.response?.data?.message || 'Failed to update property';

    Alert.alert('Error', errorMsg);
  } finally {
    setIsSubmitting(false);
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
          <Text style={styles.title}>Edit Property</Text>
          <Text style={styles.subtitle}>Update your property details</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Property Title*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Spacious 2BHK Apartment"
              value={formData.title}
              onChangeText={(text) => handleChange('title', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Bangalore"
              value={formData.city}
              onChangeText={(text) => handleChange('city', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Rent (₹)*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 15000"
              value={formData.rent}
              onChangeText={(text) => handleChange('rent', text)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Property Type*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 2BHK, 3BHK, Villa"
              value={formData.type}
              onChangeText={(text) => handleChange('type', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe amenities, location, etc."
              value={formData.description}
              onChangeText={(text) => handleChange('description', text)}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleUpdateProperty}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update Property</Text>
            )}
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditPropertyScreen;
