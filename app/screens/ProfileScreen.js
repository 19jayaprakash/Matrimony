import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import ProfileImageComponent from './ProfilePicEdit';
 
 
const beautifyLabel = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
 
const capitalizeValue = (val) => {
  if (!val || typeof val !== 'string') {
    // Handle arrays
    if (Array.isArray(val)) {
      if (val.length === 0) return 'Not specified';
      return val.map(item =>
        typeof item === 'string' ?
        item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() :
        item
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
 
// Fields to exclude from display
const excludedFields = [
  'createdBy',
  'updatedBy',
  'userId',
  'profileId',
  'id',
  '_id',
  'createdAt',
  'updatedAt',
  'created_by',
  'updated_by',
  'user_id',
  'created_at',
  'updated_at',
  '__v',
  'version',
  'isDeleted',
  'is_deleted',
  'status',
  'password',
  'token',
  'refreshToken',
  'refresh_token',
  'interestId',
  'isBasicProfileSubmitted',
  'familyId',
  'preferenceId',
  'careerId',
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
        const hasValue = value !== null &&
                        value !== undefined &&
                        value !== '' &&
                        !(Array.isArray(value) && value.length === 0);
       
        if (hasValue) {
          filtered[key] = value;
        }
      }
    }
  });
 
  return filtered;
};
 
const ProfileEdit = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    basic: {},
    professional: {},
    family: {},
    preference: {},
    other: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    async function fetchAllProfileData() {
      try {
        setLoading(true);
        setError(null);
       
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
 
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
 
        const apiEndpoints = [
          { key: 'basic', url: 'http://stu.globalknowledgetech.com:5003/user/user-profile' },
          { key: 'professional', url: 'http://stu.globalknowledgetech.com:5003/user/get-professional-details' },
          { key: 'family', url: 'http://stu.globalknowledgetech.com:5003/family/family-details' },
          { key: 'preference', url: 'http://stu.globalknowledgetech.com:5003/partnerpreference/get-preference' },
          { key: 'other', url: 'http://stu.globalknowledgetech.com:5003/Interests/user-interests' },
        ];
 
        const responses = await Promise.allSettled(
          apiEndpoints.map(endpoint =>
            fetch(endpoint.url, { headers }).then(res => {
              if (!res.ok) {
                throw new Error(`Failed to fetch ${endpoint.key}: ${res.status}`);
              }
              return res.json();
            })
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
 
  // Method 1: Store data in AsyncStorage before navigation
  const handleNavigateWithAsyncStorage = async (sectionKey, pageRoute) => {
    try {
      await AsyncStorage.setItem('editData', JSON.stringify(profileData[sectionKey]));
      router.push({
        pathname: pageRoute,
        params: { isEdit: true }
      });
    } catch (error) {
      console.error('Error storing edit data:', error);
    }
  };
 
  // Method 2: Pass data as URL parameters (for small data sets)
  // const handleNavigateWithParams = (sectionKey, pageRoute) => {
  //   const sectionData = profileData[sectionKey];
  //   router.push({
  //     pathname: pageRoute,
  //     params: {
  //       isEdit: true,
  //       editData: JSON.stringify(sectionData)
  //     }
  //   });
  // };
 
  // Method 3: Use a global state management solution (Context/Redux)
  // This would require setting up a context provider
 
  const renderSection = (title, data = {}, pageRoute, sectionKey, showEmptyFields = false) => {
    const filteredData = filterDisplayData(data, showEmptyFields);
    const hasData = Object.keys(filteredData).length > 0;
   
    return (
      <View className="bg-white p-5 rounded-2xl shadow-md mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
          <Pressable onPress={() => {
            // Store the actual data (not filtered) for editing
            console.log('Storing data for edit:', data); // Debug log
            handleNavigateWithAsyncStorage(sectionKey, pageRoute);
          }}>
            <Pencil size={22} color="#3B82F6" />
          </Pressable>
        </View>
       
        {hasData ? (
          Object.entries(filteredData).map(([key, value]) => (
            <View key={key} className="flex-row justify-between items-start py-2 border-b border-gray-100">
              <Text className="text-gray-500 w-1/2">{beautifyLabel(key)}</Text>
              <Text className="text-gray-800 font-medium w-1/2 text-right">
                {capitalizeValue(value) || 'N/A'}
              </Text>
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
          onPress={() => {
            setError(null);
          }}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </Pressable>
      </View>
    );
  }
 
  return (
    <SafeAreaView className='flex-1'>
    <ScrollView className=" bg-gray-100 px-4 pt-10" contentContainerStyle={{ paddingBottom: 60 }}>
      <Text className="text-2xl font-extrabold mb-6 text-center text-gray-900">Edit Profile</Text>
 
      <View className="items-center mb-6">
        {/* <View className="w-28 h-28 rounded-full overflow-hidden shadow-md bg-gray-200 mb-2">
          <Image
            source={require('@/assets/images/kavya.jpg')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View> */}
        <ProfileImageComponent
                  size={120}
                  // defaultImage={require('../../assets/images/kavya.jpg')}
                  />
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
 