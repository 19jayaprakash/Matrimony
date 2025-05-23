// import {
//     Heart,
//     Home,
//     User2
// } from 'lucide-react-native';
// import React from 'react';
// import { Image, ScrollView, Text, View } from 'react-native';
 
// export default function PreferredProfileView() {
//   const profile = {
//     image: require('@/assets/images/profileimage.jpg'),
//     name: 'Priya Sharma',
//     age: 26,
//     height: '5\'5"',
//     gender: 'Female',
//     location: 'Mumbai, India',
//     education: 'MBA',
//     college: 'IIM Ahmedabad',
//     occupation: 'Marketing Manager',
//     company: 'Hindustan Unilever',
//     income: '₹12,00,000',
//     family: {
//       father: 'Businessman',
//       mother: 'Homemaker',
//       siblings: '1 brother, 1 sister',
//     },
//     preferences: {
//       ageRange: '25-30',
//       education: 'Graduate or above',
//       location: 'Metro cities',
//       religion: 'Hindu',
//     },
//   };
 
//   return (
//     <View className="flex-1 bg-white">
//       {/* Fixed Image */}
//       <View className="w-full h-64 relative z-0">
//         <Image
//           source={profile.image}
//           className="w-full h-full"
//           resizeMode="cover"
//         />
//       </View>
 
//       {/* Scrollable Content */}
//       <ScrollView
//         className="px-4 pt-4 -mt-14 bg-white rounded-t-3xl z-10"
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Name, Age, Height, Gender */}
//         <View className="items-center mb-6">
//           <Text className="text-xl font-bold text-pink-600">{profile.name}</Text>
//           <Text className="text-base text-gray-700">
//             {profile.age} yrs | {profile.height} | {profile.gender}
//           </Text>
//           <Text className="text-sm text-gray-500">{profile.location}</Text>
//         </View>
 
//         {/* Section - Basic & Professional */}
//         <View className="mb-6">
//           <View className="flex-row items-center mb-2">
//             <User2 size={18} color="#EC4899" />
//             <Text className="ml-2 text-lg font-semibold text-pink-600">Profile Details</Text>
//           </View>
//           <View className="space-y-1">
//             <Text>Education: {profile.education}</Text>
//             <Text>College: {profile.college}</Text>
//             <Text>Occupation: {profile.occupation}</Text>
//             <Text>Company: {profile.company}</Text>
//             <Text>Income: {profile.income}</Text>
//           </View>
//         </View>
 
//         {/* Section - Family */}
//         <View className="mb-6">
//           <View className="flex-row items-center mb-2">
//             <Home size={18} color="#3B82F6" />
//             <Text className="ml-2 text-lg font-semibold text-blue-600">Family Information</Text>
//           </View>
//           <View className="space-y-1">
//             <Text>Father: {profile.family.father}</Text>
//             <Text>Mother: {profile.family.mother}</Text>
//             <Text>Siblings: {profile.family.siblings}</Text>
//           </View>
//         </View>
 
//         {/* Section - Partner Preferences */}
//         <View className="mb-10">
//           <View className="flex-row items-center mb-2">
//             <Heart size={18} color="#10B981" />
//             <Text className="ml-2 text-lg font-semibold text-green-600">Partner Preferences</Text>
//           </View>
//           <View className="space-y-1">
//             <Text>Age Range: {profile.preferences.ageRange}</Text>
//             <Text>Education: {profile.preferences.education}</Text>
//             <Text>Preferred Location: {profile.preferences.location}</Text>
//             <Text>Religion: {profile.preferences.religion}</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
//make the light gradient background colour for the text with the icons add some css to the text inside the profile details
import { Heart, Home, User2 } from 'lucide-react-native';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
 
const screenHeight = Dimensions.get('window').height;
 
export default function PreferredProfileView() {
  const profile = {
   image: require('@/assets/images/priya.jpg'),
    name: 'Priya Sharma',
    age: 26,
    height: '5\'5"',
    gender: 'Female',
    location: 'Mumbai, India',
    education: 'MBA',
    college: 'IIM Ahmedabad',
    occupation: 'Marketing Manager',
    company: 'Hindustan Unilever',
    income: '₹12,00,000',
    experience: '5 years',
    workType: 'Hybrid',
    religion: 'Hindu',
    maritalStatus: 'Single',
    motherTongue: 'Hindi',
    family: {
      father: 'Businessman',
      mother: 'Homemaker',
      siblings: '1 brother, 1 sister',
      familyType: 'Nuclear',
      values: 'Moderate',
    },
    preferences: {
      ageRange: '25-30',
      heightRange: '5\'2" - 5\'9"',
      education: 'Graduate or above',
      occupation: 'Professional / Govt. Service',
      location: 'Metro cities',
      religion: 'Hindu',
      diet: 'Vegetarian',
      lifestyle: 'Non-smoker, Non-drinker',
    },
  };
 
  return (
    
    <View className="flex-1 relative">
      {/* Background Image */}
      <Image
        source={profile.image}
        className="absolute w-full h-[400px]"
        resizeMode="cover"
      />
 
      {/* Scrollable Content Container */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 320, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-t-3xl bg-white px-6 pt-8 pb-10 shadow-lg">
          {/* Basic Info */}
          <View className="items-center mb-8">
            <Text className="text-2xl font-bold text-pink-600">{profile.name}</Text>
            <Text className="text-base text-gray-700 mt-1">
              {profile.age} yrs | {profile.height} | {profile.gender}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">{profile.location}</Text>
          </View>
 
          {/* Profile Details */}
          <View className="mb-8">
            <View className="flex-row items-center mb-3">
              <User2 size={20} color="#EC4899" />
              <Text className="ml-2 text-lg font-semibold text-pink-600">Profile Details</Text>
            </View>
            <View className="px-4 py-2 space-y-3">
            <View className="grid grid-cols-[1fr_20px_1fr]">
    <Text className="text-base text-gray-700">Education</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.education}</Text>
  </View>
  <View className="grid grid-cols-[1fr_20px_1fr] ">
    <Text className="text-base text-gray-700">Occupation</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.occupation}</Text>
  </View>
 
  <View className="grid grid-cols-[1fr_20px_1fr]">
    <Text className="text-base text-gray-700">College</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.college}</Text>
  </View>
 
  <View className="grid grid-cols-[1fr_20px_1fr]">
    <Text className="text-base text-gray-700">Company</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.company}</Text>
  </View>
 
  <View className="grid grid-cols-[1fr_20px_1fr]">
    <Text className="text-base text-gray-700">Experience</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.experience}</Text>
  </View>
 
  <View className="grid grid-cols-[1fr_20px_1fr]">
    <Text className="text-base text-gray-700">Annual Income</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.income}</Text>
  </View>
 
  <View className="grid grid-cols-[1fr_20px_1fr]">
    <Text className="text-base text-gray-700">Work Type</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.workType}</Text>
  </View>
 
  <View className="grid grid-cols-[1fr_20px_1fr]">
    <Text className="text-base text-gray-700">Marital Status</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.maritalStatus}</Text>
  </View>
 
  <View className="grid grid-cols-[1fr_20px_1fr]">
    <Text className="text-base text-gray-700">Religion</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.religion}</Text>
  </View>
 
  <View className="grid grid-cols-[1fr_20px_1fr]">
    <Text className="text-base text-gray-700">Mother Tongue</Text>
    <Text className="text-base text-gray-700">:</Text>
    <Text className="text-base text-gray-700">{profile.motherTongue}</Text>
  </View>
</View>
 
         {/*   <View className="space-y-3 grid grid-cols-1 gap-3 px-4 py-2">
              <Text className="grid grid-cols-2 "><Text>Education               :</Text> <Text> {profile.education}</Text></Text>
              <Text>College: {profile.college}</Text>
              <Text>Occupation: {profile.occupation}</Text>
              <Text>Company: {profile.company}</Text>
              <Text>Experience: {profile.experience}</Text>
              <Text>Annual Income: {profile.income}</Text>
              <Text>Work Type: {profile.workType}</Text>
              <Text>Marital Status: {profile.maritalStatus}</Text>
              <Text>Religion: {profile.religion}</Text>
              <Text>Mother Tongue: {profile.motherTongue}</Text>
            </View> */}
          </View>
 
          {/* Family Info */}
          <View className="mb-8">
            <View className="flex-row items-center mb-3">
              <Home size={20} color="#3B82F6" />
              <Text className="ml-2 text-lg font-semibold text-blue-600">Family Information</Text>
            </View>
 
            <View className="px-4 py-2 space-y-3">
                <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Father</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.family.father}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Mother</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.family.mother}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Siblings</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.family.siblings}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Family Type</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.family.familyType}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Family Values</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.family.values}</Text>
          </View>
         
            </View>
            {/*<View className="space-y-3">
              <Text>Father: {profile.family.father}</Text>
              <Text>Mother: {profile.family.mother}</Text>
              <Text>Siblings: {profile.family.siblings}</Text>
              <Text>Family Type: {profile.family.familyType}</Text>
              <Text>Family Values: {profile.family.values}</Text>
            </View> */}
          </View>
 
          {/* Preferences */}
          <View className="mb-2">
            <View className="flex-row items-center mb-3">
              <Heart size={20} color="#10B981" />
              <Text className="ml-2 text-lg font-semibold text-green-600">Partner Preferences</Text>
            </View>
            <View className="px-4 py-2 space-y-3">
            <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Age Range</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.preferences.ageRange}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Height Range</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.preferences.heightRange}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Education</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.preferences.education}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Occupation</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.preferences.occupation}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Location</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.preferences.location}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Religion</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.preferences.religion}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Diet</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.preferences.diet}</Text>
          </View>
          <View className="grid grid-cols-[1fr_20px_1fr]">
                <Text className="text-base text-gray-700">Lifestyle</Text>
                <Text className="text-base text-gray-700">:</Text>
                <Text className="text-base text-gray-700">{profile.preferences.lifestyle}</Text>
          </View>
          </View>
            {/*
            <View className="space-y-3">
              <Text>Age Range: {profile.preferences.ageRange}</Text>
              <Text>Height Range: {profile.preferences.heightRange}</Text>
              <Text>Education: {profile.preferences.education}</Text>
              <Text>Occupation: {profile.preferences.occupation}</Text>
              <Text>Location: {profile.preferences.location}</Text>
              <Text>Religion: {profile.preferences.religion}</Text>
              <Text>Diet: {profile.preferences.diet}</Text>
              <Text>Lifestyle: {profile.preferences.lifestyle}</Text>
            </View> */}
          </View>
         </View>
      </ScrollView>
    </View>
  );
}
 
 