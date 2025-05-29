import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { axiosPublic } from '../api/constant';
import ProfileImageComponent from './ProfilePicEdit';
 
const beautifyLabel = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
 
const capitalizeValue = (val) => {
  if (!val || typeof val !== 'string') {
    if (Array.isArray(val)) {
      if (val.length === 0) return 'Not specified';
      return val.map(item =>
        typeof item === 'string'
          ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
          : item
      ).join(', ');
    }
    return val;
  }
  if (!isNaN(Date.parse(val)) || /^\d/.test(val)) return val;
  return val
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
 
const excludedFields = [
  'createdBy', 'updatedBy', 'userId', 'profileId', 'id', '_id',
  'createdAt', 'updatedAt', 'created_by', 'updated_by', 'user_id',
  'created_at', 'updated_at', '__v', 'version', 'isDeleted', 'is_deleted',
  'status', 'password', 'token', 'refreshToken', 'refresh_token', 'interestId',
  'isBasicProfileSubmitted', 'familyId', 'preferenceId', 'careerId',
];
 
const filterDisplayData = (data, showEmptyFields = false) => {
  if (!data || typeof data !== 'object') return {};
  const filtered = {};
  Object.entries(data).forEach(([key, value]) => {
    const shouldExclude = excludedFields.some(excludedKey =>
      key.toLowerCase() === excludedKey.toLowerCase()
    );
    if (!shouldExclude) {
      if (showEmptyFields) {
        filtered[key] = value;
      } else {
        const hasValue = value !== null && value !== undefined && value !== '' &&
                         !(Array.isArray(value) && value.length === 0);
        if (hasValue) filtered[key] = value;
      }
    }
  });
  return filtered;
};
 
const ProfileEdit = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    basic: {}, professional: {}, family: {}, preference: {}, other: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    async function fetchAllProfileData() {
      try {
        setLoading(true);
        setError(null);
 
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
 
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
 
        const apiEndpoints = [
          { key: 'basic', url: '/user/user-profile' },
          { key: 'professional', url: '/user/get-professional-details' },
          { key: 'family', url: '/family/family-details' },
          { key: 'preference', url: '/partnerpreference/get-preference' },
          { key: 'other', url: '/Interests/user-interests' },
        ];
 
        const responses = await Promise.allSettled(
          apiEndpoints.map(endpoint =>
            axiosPublic.get(endpoint.url, { headers }).then(res => res.data)
          )
        );
 
        const newProfileData = {};
        responses.forEach((response, index) => {
          const key = apiEndpoints[index].key;
          if (response.status === 'fulfilled') {
            newProfileData[key] = response.value || {};
          } else {
            console.error(`Error fetching ${key}:`, response.reason);
            newProfileData[key] = {};
          }
        });
 
        setProfileData(newProfileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
 
    fetchAllProfileData();
  }, []);
 
  const handleNavigateWithAsyncStorage = async (sectionKey, pageRoute) => {
    try {
      await AsyncStorage.setItem('editData', JSON.stringify(profileData[sectionKey]));
      router.push({ pathname: pageRoute, params: { isEdit: true } });
    } catch (error) {
      console.error('Error storing edit data:', error);
    }
  };
 
  const renderSection = (title, data = {}, pageRoute, sectionKey, showEmptyFields = false) => {
    const filteredData = filterDisplayData(data, showEmptyFields);
    const hasData = Object.keys(filteredData).length > 0;
 
    return (
      <View className="bg-white p-5 rounded-2xl shadow-md mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
          <Pressable onPress={() => handleNavigateWithAsyncStorage(sectionKey, pageRoute)}>
            <Pencil size={22} color="#3B82F6" />
          </Pressable>
        </View>
 
        {hasData ? (
          Object.entries(filteredData).map(([key, value]) => (
            <View key={key} className="py-2 border-b border-gray-100">
              {key === 'sibilings' && Array.isArray(value) ? (
                <View className="space-y-4 mt-2">
                  {value.map((sibling, idx) => (
                    <View key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                      <Text className="text-blue-600 font-semibold mb-2">Sibling {idx + 1}</Text>
                      {Object.entries(sibling).map(([subKey, subVal]) => (
                        <View key={subKey} className="flex-row justify-between mb-1">
                          <Text className="text-gray-600 font-medium">{beautifyLabel(subKey)}</Text>
                          <Text className="text-gray-800 text-right">{capitalizeValue(subVal)}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              ) : (
                <View className="flex-row justify-between items-start">
                  <Text className="text-gray-500 w-1/2">{beautifyLabel(key)}</Text>
                  <Text className="text-gray-800 font-medium w-1/2 text-right">
                    {capitalizeValue(value) || 'N/A'}
                  </Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text className="text-gray-400 text-center py-4 italic">No data available</Text>
        )}
      </View>
    );
  };
 
 
 
 
  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4">Loading profile data...</Text>
      </View>
    );
  }
 
  if (error) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center px-4">
        <Text className="text-red-500 text-center mb-4">Error loading profile data</Text>
        <Text className="text-gray-600 text-center">{error}</Text>
        <Pressable
          className="bg-blue-500 px-6 py-3 rounded-lg mt-4"
          onPress={() => setError(null)}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </Pressable>
      </View>
    );
  }
 
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="bg-gray-100 px-4 pt-10" contentContainerStyle={{ paddingBottom: 60 }}>
        <Text className="text-2xl font-extrabold mb-6 text-center text-gray-900">Edit Profile</Text>
 
        <View className="items-center mb-6">
          <ProfileImageComponent size={120} />
          <Text className="text-lg font-semibold text-gray-800">
            {capitalizeValue(profileData?.basic?.firstName || '')} {capitalizeValue(profileData?.basic?.lastName || '')}
          </Text>
        </View>
 
        {renderSection('Basic Info', profileData.basic, '/profile/BasicDetails', 'basic', true)}
        {renderSection('Professional Info', profileData.professional, '/profile/ProfessionalDetails', 'professional', true)}
        {renderSection('Family Details', profileData.family, '/profile/FamilyDetails', 'family', true)}
        {renderSection('Partner Preferences', profileData.preference, '/profile/PartnerPreference', 'preference', true)}
        {renderSection('User Preference', profileData.other, '/profile/UserInterest', 'other', true)}
      </ScrollView>
    </SafeAreaView>
  );
};
 
export default ProfileEdit;
 
 