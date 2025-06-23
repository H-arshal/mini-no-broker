import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, ActivityIndicator,Image,
  TouchableOpacity, RefreshControl, TextInput, ScrollView, Alert
} from 'react-native';
import axios from 'axios';
import config from '../config';

const ViewPropertiesScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let query = [];
      if (city) query.push(`city=${encodeURIComponent(city)}`);
      if (type) query.push(`type=${encodeURIComponent(type)}`);
      if (minRent) query.push(`minRent=${minRent}`);
      if (maxRent) query.push(`maxRent=${maxRent}`);

      const queryString = query.length ? `?${query.join('&')}` : '';
      const response = await axios.get(`${config.BASE_URL}/api/properties${queryString}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      Alert.alert('Error', 'Failed to fetch properties. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProperties();
  };



const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.card}>
    {/* Image Section */}
    {item.imageUrls && item.imageUrls.length > 0 && (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageScrollContainer}
      >
        {item.imageUrls.map((url, idx) => (
          <Image
            key={idx}
            source={{ uri: url }}
            style={styles.propertyImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    )}

    {/* Textual Details */}
    <View style={styles.cardContent}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>City: </Text>{item.city}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Rent: </Text>₹{item.rent.toLocaleString()}
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Type: </Text>{item.type}
        </Text>
      </View>
      <Text style={styles.desc} numberOfLines={3}>
        {item.description}
      </Text>
    </View>
  </TouchableOpacity>
);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Available Properties</Text>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter Properties</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Bangalore"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 2BHK"
            value={type}
            onChangeText={setType}
          />
        </View>
        <View style={styles.rentRangeContainer}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Min Rent (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="10000"
              value={minRent}
              onChangeText={setMinRent}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Max Rent (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="30000"
              value={maxRent}
              onChangeText={setMaxRent}
              keyboardType="numeric"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={fetchProperties}
        >
          <Text style={styles.filterButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a6fa5" />
          <Text style={styles.loadingText}>Loading properties...</Text>
        </View>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#4a6fa5']}
              tintColor="#4a6fa5"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No properties found matching your criteria</Text>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={fetchProperties}
              >
                <Text style={styles.refreshButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // Header Styles
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 20,
    textAlign: 'center',
  },

  // Filter Section Styles
  filterContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  imageScrollContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },

  propertyImage: {
    width: 200,
    height: 140,
    marginRight: 10,
    borderRadius: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  rentRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#4a6fa5',
    padding: 16,
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
  filterButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Property List Styles
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: '#2c3e50',
  },
  detailLabel: {
    fontWeight: '500',
    color: '#7f8c8d',
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },

  // Loading & Empty States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#4a6fa5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default ViewPropertiesScreen;