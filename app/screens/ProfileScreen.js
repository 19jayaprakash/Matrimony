// import { useRouter } from 'expo-router';
// import { Pencil } from 'lucide-react-native';
// import { Pressable, ScrollView, Text, View } from 'react-native';
 
// const profileData = {
//   page1: {
//     fullName: 'Rahul Sharma',
//     gender: 'Male',
//     dateOfBirth: '1995-06-15',
//     age: '29',
//     height: '5ft 10in',
//     weight: '70kg',
//     maritalStatus: 'Single',
//     religion: 'Hindu',
//     caste: 'Brahmin',
//     motherTongue: 'Hindi',
//   },
//   page2: {
//     education: 'MBA',
//     college: 'Delhi University',
//     employedIn: 'Private',
//     occupation: 'Software Engineer',
//     company: 'Infosys',
//     income: '₹12,00,000',
//     workLocation: 'Bangalore',
//     workType: 'Remote',
//     experience: '5 Years',
//     noticePeriod: '1 Month',
//   },
//   page3:{
//     familyType:'Nuclear',
//     familyValue:'Traditional',
//     familyStatus:'Middle Class',
//     fatherOccupation:'Employed',
//     motherOccupation:'Employed',
//   }
// };
 
// const ProfileEdit = () => {
//   const router = useRouter();
 
//   const renderSection = (title, data, pageRoute) => (
//     <View className="bg-white p-4 rounded-xl shadow-md mb-6">
//       <View className="flex-row justify-between items-center mb-2">
//         <Text className="text-lg font-semibold text-gray-800">{title}</Text>
//         <Pressable onPress={() => router.push(pageRoute)}>
//           <Pencil size={20} color="#2563EB" />
//         </Pressable>
//       </View>
//       {Object.entries(data).map(([key, value]) => (
//         <View key={key} className="flex-row justify-between py-1 border-b border-gray-100">
//           <Text className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</Text>
//           <Text className="text-gray-700 font-medium">{value}</Text>
//         </View>
//       ))}
//     </View>
//   );
 
//   return (
//     <ScrollView className="flex-1 bg-gray-50 px-4 pt-10">
//       <Text className="text-2xl font-bold mb-6 text-center">Edit Profile</Text>
 
//       {/* Profile image placeholder */}
//       <View className="items-center mb-6">
//         <View className="w-28 h-28 rounded-full bg-gray-300" />
//         <Text className="mt-2 text-gray-700">Rahul Sharma</Text>
//       </View>
 
//       {renderSection('Page 1 - Basic Info', profileData.page1, '/profile/page1')}
//       {renderSection('Page 2 - Professional Info', profileData.page2, '/profile/page2')}
//       {renderSection('Page 3 - Family Info', profileData.page3, '/profile/page2')}
 
//       {/* Add more sections like Page 3 etc. as needed */}
//     </ScrollView>
//   );
// };
 
// export default ProfileEdit;
 
 
import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
 
const profileData = {
  page1: {
    fullName: 'Rahul Sharma',
    gender: 'Male',
    dateOfBirth: '1995-06-15',
    age: '29',
    height: '5ft 10in',
    weight: '70kg',
    maritalStatus: 'Single',
    religion: 'Hindu',
    caste: 'Brahmin',
    motherTongue: 'Hindi',
    bloodGroup: 'B+',
  },
  page2: {
    education: 'MBA',
    college: 'Delhi University',
    employedIn: 'Private',
    occupation: 'Software Engineer',
    company: 'Infosys',
    income: '₹12,00,000',
    workLocation: 'Bangalore',
    workType: 'Remote',
    experience: '5 Years',
    noticePeriod: '1 Month',
  },
  family: {
    fatherName: 'Mr. Suresh Sharma',
    motherName: 'Mrs. Anjali Sharma',
    siblings: '1 Brother, 1 Sister',
    familyType: 'Nuclear',
    familyStatus: 'Upper Middle Class',
    familyValues: 'Traditional',
    fatherOccupation: 'Retired Govt. Officer',
    motherOccupation: 'Homemaker',
    nativePlace: 'Jaipur, Rajasthan',
    currentCity: 'Bangalore',
  },
  preference: {
    preferredAge: '25 - 30',
    preferredHeight: '5ft 2in - 5ft 8in',
    preferredReligion: 'Hindu',
    preferredCaste: 'Any',
    preferredEducation: 'Graduate and above',
    preferredProfession: 'IT / Non-IT',
    preferredLocation: 'Anywhere in India',
    preferredLanguage: 'Hindi, English',
    dietaryPreference: 'Vegetarian',
    smokingDrinking: 'Non-Smoker / Non-Drinker',
  },
  other: {
    hobbies: 'Reading, Traveling',
    interests: 'Tech, Finance',
    languagesKnown: 'Hindi, English',
    personality: 'Introvert',
    beliefs: 'Spiritual',
    health: 'Fit and Active',
    disability: 'None',
    covidVaccinated: 'Yes',
    petFriendly: 'Yes',
    passport: 'Yes',
  },
};
 
const beautifyLabel = (key) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
 
const ProfileEdit = () => {
  const router = useRouter();
  const [profile,setProfile] = useState('');
 
  useEffect(() => {
    async function fetchDetails() {
      try {
        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTc0Nzg5MzM0MywiZXhwIjoxNzQ3OTAwNTQzfQ.NxXIw_9nQ8k2JYI0mWi5aWwMm7DezFJDSNLkbJrLazg"
        const response = await fetch('http://stu.globalknowledgetech.com:5003/user/user-profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // <- Attach token here
          },
        });
 
        const data = await response.json();
        console.log('User Profile:', data);
 
        if (data && Array.isArray(data)) {
          setProfile(data);
          console.log(profile);
         
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
 
    fetchDetails();
  }, []);
 
 
  const renderSection = (title, data, pageRoute) => (
    <View className="bg-white p-5 rounded-2xl shadow-md mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
        <Pressable onPress={() => router.push(pageRoute)}>
          <Pencil size={22} color="#3B82F6" />
        </Pressable>
      </View>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} className="flex-row justify-between items-start py-2 border-b border-gray-100">
          <Text className="text-gray-500 w-1/2">{beautifyLabel(key)}</Text>
          <Text className="text-gray-800 font-medium w-1/2 text-right">{value}</Text>
        </View>
      ))}
    </View>
  );
 
  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-10" contentContainerStyle={{ paddingBottom: 60 }}>
      <Text className="text-2xl font-extrabold mb-6 text-center text-gray-900">Edit Profile</Text>
       <View className="items-center mb-6">
        <View className="w-28 h-28 rounded-full overflow-hidden shadow-md bg-gray-200 mb-2">
          <Image
            source={require('@/assets/images/kavya.jpg')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
        <Text className="text-lg font-semibold text-gray-800">Rahul Sharma</Text>
        {/*<Text className="text-lg font-semibold text-gray-800">
      {profile?.page1?.fullName || 'Loading...'}
    </Text>*/}
      </View>
 
      {/* Sections */}
      {renderSection('Basic Info', profileData.page1, '/profile/BasicDetails')}
      {renderSection('Professional Info', profileData.page2, '/profile/ProfessionalDetails')}
      {renderSection('Family Details', profileData.family, '/profile/FamilyDetails')}
      {renderSection('Partner Preferences', profileData.preference, '/profile/UserPreference')}
      {renderSection('Other Information', profileData.other, '/profile/other')}
    </ScrollView>
  );
};
 
export default ProfileEdit;
 
 