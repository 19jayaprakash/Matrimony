// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import { Picker } from '@react-native-picker/picker';
// // import {
// //   Activity,
// //   Calendar,
// //   ChevronsRight,
// //   Coffee,
// //   Globe,
// //   Home,
// //   Phone,
// //   Star,
// //   User
// // } from 'lucide-react-native';
// // import React, { useEffect, useState } from 'react';
// // import {
// //   Platform,
// //   SafeAreaView,
// //   ScrollView,
// //   StatusBar,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   useWindowDimensions,
// //   View
// // } from 'react-native';
// // import { RadioButton } from 'react-native-paper';

// // const MatrimonialProfile = () => {
// //   const { width } = useWindowDimensions();
// //   const isWeb = Platform.OS === 'web';
// //   const isMobile = width < 768;

// //   const [formData, setFormData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     alternateEmail: '',
// //     dateOfBirth: new Date(),
// //     country: '',
// //     state: '',
// //     city: '',
// //     primaryContact: '',
// //     secondaryContact: '',
// //     gender: 'male',
// //     // otherGender: '',
// //     height: '',
// //     weight: '',
// //     bodyType: 'average',
// //     maritalStatus: 'never married',
// //     children: 'no children',
// //     wantChildren: 'undecided',
// //     religion: '',
// //     caste: '',
// //     subcaste: '',
// //     motherTongue: '',
// //     dietPreference: 'vegetarian',
// //     smokingHabits: 'non-smoker',
// //     drinkingHabits: 'non-drinker',
// //     zodiacSign: '',
// //     starSign: '',
// //   });


// //   const [motherTongueOptions, setMotherTongueOptions] = useState([]);


// //   useEffect(() => {
// //     async function fetchMotherTongue() {
// //       try {
// //         const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/mother-tongue');
// //         const data = await response.json();
// //         console.log('Mother tongue data:', data);

// //         if (data && Array.isArray(data)) {
// //           setMotherTongueOptions(data);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching mother tongue options:', error);
// //       }
// //     }

// //     fetchMotherTongue();
// //   }, []);


// //   const [Dietoptions, setDietOptions] = useState([]);
// //   useEffect(() => {
// //     async function fetchDietOption() {
// //       try {
// //         const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/diet-preferences');
// //         const data = await response.json();
// //         console.log('Diet Preference data:', data);

// //         if (data && Array.isArray(data)) {
// //           setDietOptions(data);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching mother tongue options:', error);
// //       }
// //     }

// //     fetchDietOption();
// //   }, []);



// //   // Add these state variables for castes and subcastes
// //   const [casteOptions, setCasteOptions] = useState([]);
// //   const [subcasteOptions, setSubcasteOptions] = useState([]);


// //   useEffect(() => {
// //     async function fetchCastes() {
// //       try {
// //         const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/castes');
// //         const data = await response.json();
// //         console.log('Caste data:', data);

// //         if (data && Array.isArray(data)) {
// //           setCasteOptions(data);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching caste options:', error);
// //       }
// //     }

// //     fetchCastes();
// //   }, []);

// //   // Add this effect to fetch subcastes when a caste is selected
// //   useEffect(() => {
// //     async function fetchSubcastes() {
// //       // Only fetch subcastes if a caste is selected
// //       if (!formData.caste) {
// //         setSubcasteOptions([]);
// //         return;
// //       }

// //       try {
// //         const response = await fetch(`http://stu.globalknowledgetech.com:5003/utility/sub-castes?caste=${formData.caste}`);
// //         const data = await response.json();
// //         console.log('Subcaste data:', data);

// //         if (data && Array.isArray(data)) {
// //           setSubcasteOptions(data);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching subcaste options:', error);
// //       }
// //     }

// //     fetchSubcastes();
// //   }, [formData.caste]); 



// //   // State for form fields - consolidated all form fields in one state object

// //   const [showDatePicker, setShowDatePicker] = useState(false);

// //   // Fixed handleChange function to properly update state
// //   const handleChange = (field, value) => {
// //     setFormData(prevData => ({
// //       ...prevData,
// //       [field]: value,
// //     }));
// //   };

// //   // Date picker change handler
// //   const handleDateChange = (event, selectedDate) => {
// //     setShowDatePicker(Platform.OS === 'ios');
// //     if (selectedDate) {
// //       handleChange('dateOfBirth', selectedDate);
// //     }
// //   };

  

// //   // zodiacSign (Zodiac) options
// //   const zodiacSignOptions = [
// //     'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)',
// //     'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)',
// //     'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)',
// //     'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
// //   ];

// //   // starSign options
// //   const starSignOptions = [
// //     'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
// //     'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
// //     'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
// //     'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
// //     'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
// //     'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
// //   ];

// //   // Country options (sample)
// //   const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Singapore'];


// //   // Add this with the other state variables at the top of the component
// // const [showToast, setShowToast] = useState(false);
// // const [toastMessage, setToastMessage] = useState('');

// // // Add this where the other options arrays are defined (near zodiacSignOptions)
// // const religionOptions = [
// //   'Hindu', 
// //   'Muslim', 
// //   'Christian', 
// //   'Sikh', 
// //   'Buddhist', 
// //   'Jain', 
// //   'Parsi', 
// //   'Jewish', 
// //   'Bahai', 
// //   'Other'
// // ];



// // const clearForm = () => {
// //   setFormData({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     alternateEmail: '',
// //     dateOfBirth: new Date(),
// //     country: '',
// //     state: '',
// //     city: '',
// //     primaryContact: '',
// //     secondaryContact: '',
// //     gender: 'male',
// //     height: '',
// //     weight: '',
// //     bodyType: 'average',
// //     maritalStatus: 'never married',
// //     children: 'no children',
// //     wantChildren: 'want childreb',
// //     religion: '',
// //     caste: '',
// //     subcaste: '',
// //     motherTongue: '',
// //     dietPreference: 'vegetarian',
// //     smokingHabits: 'non-smoker',
// //     drinkingHabits: 'non-drinker',
// //     zodiacSign: '',
// //     starSign: '',
// //   });
// // };


// // const handleSubmit = async () => {
// //   try {
// //     // Create a copy of formData with height and weight converted to integers
// //     const submissionData = {
// //       ...formData,
// //       height: formData.height ? parseInt(formData.height, 10) : null,
// //       weight: formData.weight ? parseInt(formData.weight, 10) : null,
// //     };

// //     console.log('Submitting profile:', submissionData);

// //     const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJpYXQiOjE3NDc4OTgyNTYsImV4cCI6MTc0NzkwNTQ1Nn0.uyf_jYMWXmxYDGFaCKsxUDa2PmTuU1AWhJXr2zK4aoI"    
// //     if (!authToken) {
// //       console.error('Auth token not found');
// //       setToastMessage('Authentication error. Please login again.');
// //       setShowToast(true);
      
// //       setTimeout(() => {
// //         setShowToast(false);
// //       }, 3000);
// //       return;
// //     }
    
// //     const response = await fetch('http://stu.globalknowledgetech.com:5003/user/add-Profile', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${authToken}` 
// //       },
// //       body: JSON.stringify(submissionData),
// //     });
    
// //     if (response.status === 200) {
// //       setToastMessage('Basic profile details have been added successfully!');
// //       setShowToast(true);
// //       clearForm();
// //       // Hide toast after 3 seconds
// //       setTimeout(() => {
// //         setShowToast(false);
// //       }, 1000);
      
// //       console.log('Profile created successfully');
// //     } else {
// //       console.error('Failed to create profile:', response.status);
// //       setToastMessage('Failed to add profile. Please try again.');
// //       setShowToast(true);
      
// //       // Hide toast after 3 seconds
// //       setTimeout(() => {
// //         setShowToast(false);
// //       }, 3000);
// //     }
// //   } catch (error) {
// //     console.error('Error submitting profile:', error);
// //     setToastMessage('Network error. Please try again.');
// //     setShowToast(true);
    
// //     // Hide toast after 3 seconds
// //     setTimeout(() => {
// //       setShowToast(false);
// //     }, 3000);
// //   }
// // };
// //   return (
// //     <>
// //     <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
// //       {/* Header */}
// //       <StatusBar barStyle="dark-content" />
// //       <View style={{
// //         width: '100%',
// //         backgroundColor: '#EC4899',
// //         paddingVertical: 10,
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.2,
// //         shadowRadius: 4,
// //         elevation: 3
// //       }}>
// //         <Text style={{
// //           color: 'white',
// //           fontSize: 20,
// //           fontWeight: 'bold',
// //           textAlign: 'center'
// //         }}>
// //           Create Profile
// //         </Text>
// //         <Text style={{
// //           color: 'white',
// //           textAlign: 'center',
// //           marginTop: 6,
// //           opacity: 0.9,
// //           fontSize: 18
// //         }}>
// //           Find your perfect match by completing your profile
// //         </Text>
// //       </View>

// //       <ScrollView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
// //         <View style={isWeb && !isMobile ?
// //           { maxWidth: 768, marginLeft: 'auto', marginRight: 'auto', padding: 24 } :
// //           { width: '100%', padding: 16 }
// //         }>

// //           {/* Personal Details */}
// //           <View style={{
// //             width: '100%',
// //             backgroundColor: 'white',
// //             borderRadius: 12,
// //             padding: 16,
// //             marginBottom: 24,
// //             shadowColor: '#000',
// //             shadowOffset: { width: 0, height: 2 },
// //             shadowOpacity: 0.1,
// //             shadowRadius: 4,
// //             elevation: 3
// //           }}>
// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
// //               <View style={{
// //                 backgroundColor: '#FCE7F3',
// //                 borderRadius: 9999,
// //                 padding: 8,
// //                 marginRight: 12
// //               }}>
// //                 <User size={24} color="#EC4899" />
// //               </View>
// //               <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
// //                 Personal Details
// //               </Text>
// //             </View>

// //             <View style={{ flexDirection: isWeb && !isMobile ? 'row' : 'column' }}>
// //               <View style={{ flex: 1, marginRight: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
// //                 <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>First Name</Text>
// //                 <TextInput
// //                   style={{
// //                     borderWidth: 1,
// //                     borderColor: '#D1D5DB',
// //                     borderRadius: 8,
// //                     padding: 12,
// //                     width: '100%',
// //                     backgroundColor: '#F9FAFB'
// //                   }}
// //                   value={formData.firstName}
// //                   onChangeText={(text) => handleChange('firstName', text)}
// //                   placeholder="Enter your first name"
// //                   // editable={false} 
// //                 />
// //               </View>
// //               <View style={{ flex: 1, marginLeft: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
// //                 <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Last Name</Text>
// //                 <TextInput
// //                   style={{
// //                     borderWidth: 1,
// //                     borderColor: '#D1D5DB',
// //                     borderRadius: 8,
// //                     padding: 12,
// //                     width: '100%',
// //                     backgroundColor: '#F9FAFB'
// //                   }}
// //                   value={formData.lastName}
// //                   onChangeText={(text) => handleChange('lastName', text)}
// //                   placeholder="Enter your last name"
// //                   // editable={false} 
// //                 />
// //               </View>
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Email</Text>
// //               <TextInput
// //                 style={{
// //                   borderWidth: 1,
// //                   borderColor: '#D1D5DB',
// //                   borderRadius: 8,
// //                   padding: 12,
// //                   width: '100%',
// //                   backgroundColor: '#F9FAFB'
// //                 }}
// //                 value={formData.email}
// //                 onChangeText={(text) => handleChange('email', text)}
// //                 placeholder="Enter your email address"
// //                 keyboardType="email-address"
// //                 autoCapitalize="none"
// //               />
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Alternate Email (Optional)</Text>
// //               <TextInput
// //                 style={{
// //                   borderWidth: 1,
// //                   borderColor: '#D1D5DB',
// //                   borderRadius: 8,
// //                   padding: 12,
// //                   width: '100%',
// //                   backgroundColor: '#F9FAFB'
// //                 }}
// //                 value={formData.alternateEmail}
// //                 onChangeText={(text) => handleChange('alternateEmail', text)}
// //                 placeholder="Enter alternate email address"
// //                 keyboardType="email-address"
// //                 autoCapitalize="none"
// //               />
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Date of Birth</Text>
// //               <TouchableOpacity
// //                 style={{
// //                   borderWidth: 1,
// //                   borderColor: '#D1D5DB',
// //                   borderRadius: 8,
// //                   padding: 12,
// //                   width: '100%',
// //                   backgroundColor: '#F9FAFB',
// //                   flexDirection: 'row',
// //                   alignItems: 'center',
// //                   justifyContent: 'space-between'
// //                 }}
// //                 onPress={() => setShowDatePicker(true)}
// //               >
// //                 <Text>{formData.dateOfBirth.toDateString()}</Text>
// //                 <Calendar size={20} color="#6B7280" />
// //               </TouchableOpacity>

// //               {showDatePicker && (
// //                 <DateTimePicker
// //                   value={formData.dateOfBirth}
// //                   mode="date"
// //                   display="default"
// //                   onChange={handleDateChange}
// //                 />
// //               )}
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Gender</Text>
// //               <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
// //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
// //                   <RadioButton
// //                     value="male"
// //                     status={formData.gender === 'male' ? 'checked' : 'unchecked'}
// //                     onPress={() => handleChange('gender', 'male')}
// //                     color="#EC4899"
// //                   />
// //                   <Text style={{ color: '#4B5563' }}>Male</Text>
// //                 </View>
// //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
// //                   <RadioButton
// //                     value="female"
// //                     status={formData.gender === 'female' ? 'checked' : 'unchecked'}
// //                     onPress={() => handleChange('gender', 'female')}
// //                     color="#EC4899"
// //                   />
// //                   <Text style={{ color: '#4B5563' }}>Female</Text>
// //                 </View>
// //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
// //                   <RadioButton
// //                     value="other"
// //                     status={formData.gender === 'other' ? 'checked' : 'unchecked'}
// //                     onPress={() => handleChange('gender', 'other')}
// //                     color="#EC4899"
// //                   />
// //                   <Text style={{ color: '#4B5563' }}>Other</Text>
// //                 </View>
// //               </View>

// //               {formData.gender === 'other' && (
// //                 <View style={{ marginTop: 8 }}>
// //                   <TextInput
// //                     style={{
// //                       borderWidth: 1,
// //                       borderColor: '#D1D5DB',
// //                       borderRadius: 8,
// //                       padding: 12,
// //                       width: '100%',
// //                       backgroundColor: '#F9FAFB'
// //                     }}
// //                     value={formData.otherGender}
// //                     onChangeText={(text) => handleChange('otherGender', text)}
// //                     placeholder="Please specify Gender"
// //                   />
// //                 </View>
// //               )}
// //             </View>
// //           </View>

// //           {/* Contact Information */}
// //           <View style={{
// //             width: '100%',
// //             backgroundColor: 'white',
// //             borderRadius: 12,
// //             padding: 16,
// //             marginBottom: 24,
// //             shadowColor: '#000',
// //             shadowOffset: { width: 0, height: 2 },
// //             shadowOpacity: 0.1,
// //             shadowRadius: 4,
// //             elevation: 3
// //           }}>
// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
// //               <View style={{
// //                 backgroundColor: '#FCE7F3',
// //                 borderRadius: 9999,
// //                 padding: 8,
// //                 marginRight: 12
// //               }}>
// //                 <Phone size={24} color="#EC4899" />
// //               </View>
// //               <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
// //                 Contact Information
// //               </Text>
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Primary Contact</Text>
// //               <TextInput
// //                 style={{
// //                   borderWidth: 1,
// //                   borderColor: '#D1D5DB',
// //                   borderRadius: 8,
// //                   padding: 12,
// //                   width: '100%',
// //                   backgroundColor: '#F9FAFB'
// //                 }}
// //                 value={formData.primaryContact}
// //                 onChangeText={(text) => handleChange('primaryContact', text)}
// //                 placeholder="Enter your primary contact number"
// //                 keyboardType="phone-pad"
// //               />
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Secondary Contact (Optional)</Text>
// //               <TextInput
// //                 style={{
// //                   borderWidth: 1,
// //                   borderColor: '#D1D5DB',
// //                   borderRadius: 8,
// //                   padding: 12,
// //                   width: '100%',
// //                   backgroundColor: '#F9FAFB'
// //                 }}
// //                 value={formData.secondaryContact}
// //                 onChangeText={(text) => handleChange('secondaryContact', text)}
// //                 placeholder="Enter your secondary contact number"
// //                 keyboardType="phone-pad"
// //               />
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Country</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 <Picker
// //                   selectedValue={formData.country}
// //                   onValueChange={(itemValue) => handleChange('country', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select an option" value="" />
// //                   {countries.map((country, index) => (
// //                     <Picker.Item key={index} label={country} value={country} />
// //                   ))}
// //                 </Picker>
// //               </View>
// //             </View>

// //             <View style={{ flexDirection: isWeb && !isMobile ? 'row' : 'column' }}>
// //               <View style={{ flex: 1, marginRight: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
// //                 <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>State</Text>
// //                 <TextInput
// //                   style={{
// //                     borderWidth: 1,
// //                     borderColor: '#D1D5DB',
// //                     borderRadius: 8,
// //                     padding: 12,
// //                     width: '100%',
// //                     backgroundColor: '#F9FAFB'
// //                   }}
// //                   value={formData.state}
// //                   onChangeText={(text) => handleChange('state', text)}
// //                   placeholder="Enter your state"
// //                 />
// //               </View>
// //               <View style={{ flex: 1, marginLeft: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
// //                 <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>City</Text>
// //                 <TextInput
// //                   style={{
// //                     borderWidth: 1,
// //                     borderColor: '#D1D5DB',
// //                     borderRadius: 8,
// //                     padding: 12,
// //                     width: '100%',
// //                     backgroundColor: '#F9FAFB'
// //                   }}
// //                   value={formData.city}
// //                   onChangeText={(text) => handleChange('city', text)}
// //                   placeholder="Enter your city"
// //                 />
// //               </View>
// //             </View>
// //           </View>

// //           {/* Physical Attributes */}
// //           <View style={{
// //             width: '100%',
// //             backgroundColor: 'white',
// //             borderRadius: 12,
// //             padding: 16,
// //             marginBottom: 24,
// //             shadowColor: '#000',
// //             shadowOffset: { width: 0, height: 2 },
// //             shadowOpacity: 0.1,
// //             shadowRadius: 4,
// //             elevation: 3
// //           }}>
// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
// //               <View style={{
// //                 backgroundColor: '#FCE7F3',
// //                 borderRadius: 9999,
// //                 padding: 8,
// //                 marginRight: 12
// //               }}>
// //                 <Activity size={24} color="#EC4899" />
// //               </View>
// //               <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
// //                 Physical Attributes
// //               </Text>
// //             </View>

// //             <View style={{ flexDirection: isWeb && !isMobile ? 'row' : 'column' }}>
// //               <View style={{ flex: 1, marginRight: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
// //                 <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Height (cm)</Text>
// //                 <TextInput
// //                   style={{
// //                     borderWidth: 1,
// //                     borderColor: '#D1D5DB',
// //                     borderRadius: 8,
// //                     padding: 12,
// //                     width: '100%',
// //                     backgroundColor: '#F9FAFB'
// //                   }}
// //                   value={formData.height}
// //                   onChangeText={(text) => handleChange('height', text)}
// //                   placeholder="Height in cm"
// //                   keyboardType="numeric"
// //                 />
// //               </View>
// //               <View style={{ flex: 1, marginLeft: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
// //                 <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Weight (kg)</Text>
// //                 <TextInput
// //                   style={{
// //                     borderWidth: 1,
// //                     borderColor: '#D1D5DB',
// //                     borderRadius: 8,
// //                     padding: 12,
// //                     width: '100%',
// //                     backgroundColor: '#F9FAFB'
// //                   }}
// //                   value={formData.weight}
// //                   onChangeText={(text) => handleChange('weight', text)}
// //                   placeholder="Weight in kg"
// //                   keyboardType="numeric"
// //                 />
// //               </View>
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Body Type</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 <Picker
// //                   selectedValue={formData.bodyType}
// //                   onValueChange={(itemValue) => handleChange('bodyType', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select an option" value="" />
// //                   <Picker.Item label="Slim" value="slim" />
// //                   <Picker.Item label="Athletic" value="athletic" />
// //                   <Picker.Item label="Average" value="average" />
// //                   <Picker.Item label="Heavy" value="heavy" />
// //                 </Picker>
// //               </View>
// //             </View>
// //           </View>

// //           {/* Family & Status */}
// //           <View style={{
// //             width: '100%',
// //             backgroundColor: 'white',
// //             borderRadius: 12,
// //             padding: 16,
// //             marginBottom: 24,
// //             shadowColor: '#000',
// //             shadowOffset: { width: 0, height: 2 },
// //             shadowOpacity: 0.1,
// //             shadowRadius: 4,
// //             elevation: 3
// //           }}>
// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
// //               <View style={{
// //                 backgroundColor: '#FCE7F3',
// //                 borderRadius: 9999,
// //                 padding: 8,
// //                 marginRight: 12
// //               }}>
// //                 <Home size={24} color="#EC4899" />
// //               </View>
// //               <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
// //                 Family & Status
// //               </Text>
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Marital Status</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 <Picker
// //                   selectedValue={formData.maritalStatus}
// //                   onValueChange={(itemValue) => handleChange('maritalStatus', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select an option" value="" />
// //                   <Picker.Item label="Never Married" value="never married" />
// //                   <Picker.Item label="Divorced" value="divorced" />
// //                   <Picker.Item label="Widowed" value="widowed" />
// //                   <Picker.Item label="Separated" value="separated" />
// //                 </Picker>
// //               </View>
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Children</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 <Picker
// //                   selectedValue={formData.children}
// //                   onValueChange={(itemValue) => handleChange('children', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select an option" value="" />
// //                   <Picker.Item label="No Children" value="no children" />
// //                   <Picker.Item label="Have Children living with me" value="having children living with me" />
// //                   <Picker.Item label="Have Children not living with me" value="having children not living with me" />
// //                 </Picker>
// //               </View>
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Want Children</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 <Picker
// //                   selectedValue={formData.wantChildren}
// //                   onValueChange={(itemValue) => handleChange('wantChildren', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select an option" value="" />
// //                   <Picker.Item label="Want Children" value="want children" />
// //                   <Picker.Item label="Don't Want Children" value="don't want children" />
// //                   {/* <Picker.Item label="Not Sure" value="undecided" /> */}
// //                 </Picker>
// //               </View>
// //             </View>
// //           </View>

// //           {/* Religion & Culture */}
// //           <View style={{
// //             width: '100%',
// //             backgroundColor: 'white',
// //             borderRadius: 12,
// //             padding: 16,
// //             marginBottom: 24,
// //             shadowColor: '#000',
// //             shadowOffset: { width: 0, height: 2 },
// //             shadowOpacity: 0.1,
// //             shadowRadius: 4,
// //             elevation: 3
// //           }}>
// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
// //               <View style={{
// //                 backgroundColor: '#FCE7F3',
// //                 borderRadius: 9999,
// //                 padding: 8,
// //                 marginRight: 12
// //               }}>
// //                 <Globe size={24} color="#EC4899" />
// //               </View>
// //               <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
// //                 Religion & Culture
// //               </Text>
// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //   <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Religion</Text>
// //   <View style={{
// //     borderWidth: 1,
// //     borderColor: '#D1D5DB',
// //     borderRadius: 8,
// //     overflow: 'hidden',
// //     backgroundColor: '#F9FAFB'
// //   }}>
// //     <Picker
// //       selectedValue={formData.religion}
// //       onValueChange={(itemValue) => handleChange('religion', itemValue)}
// //       style={{ width: '100%' }}
// //     >
// //       <Picker.Item label="Select Religion" value="" />
// //       {religionOptions.map((religion, index) => (
// //         <Picker.Item key={index} label={religion} value={religion} />
// //       ))}
// //     </Picker>
// //   </View>
// // </View>

// //             <View style={{ flexDirection: isWeb && !isMobile ? 'row' : 'column' }}>



// //               <View style={{ marginBottom: 16 }}>
// //                 <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Caste</Text>
// //                 <View style={{
// //                   borderWidth: 1,
// //                   borderColor: '#D1D5DB',
// //                   borderRadius: 8,
// //                   overflow: 'hidden',
// //                   backgroundColor: '#F9FAFB'
// //                 }}>
// //                   <Picker
// //                     selectedValue={formData.caste}
// //                     onValueChange={(itemValue) => {
// //                       // When caste changes, reset subcaste
// //                       handleChange('caste', itemValue);
// //                       handleChange('subcaste', '');
// //                     }}
// //                     style={{ width: '100%' }}
// //                   >
// //                     <Picker.Item label="Select Caste" value="" />
// //                     {casteOptions && casteOptions.length > 0 ?
// //                       casteOptions.map((caste, index) =>
// //                         caste ? <Picker.Item key={index} label={caste.toString()} value={caste.toString()} /> : null
// //                       ) :
// //                       null
// //                     }
// //                   </Picker>
// //                 </View>
// //                 {casteOptions.length === 0 && (
// //                   <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
// //                     Loading caste options...
// //                   </Text>
// //                 )}
// //               </View>

// //               <View style={{ marginBottom: 16 }}>
// //                 <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Subcaste</Text>
// //                 <View style={{
// //                   borderWidth: 1,
// //                   borderColor: '#D1D5DB',
// //                   borderRadius: 8,
// //                   overflow: 'hidden',
// //                   backgroundColor: '#F9FAFB'
// //                 }}>
// //                   <Picker
// //                     selectedValue={formData.subcaste}
// //                     onValueChange={(itemValue) => handleChange('subcaste', itemValue)}
// //                     style={{ width: '100%' }}
// //                     enabled={!!formData.caste} // Disable subcaste picker if no caste is selected
// //                   >
// //                     <Picker.Item label={formData.caste ? "Select Subcaste" : "Select Caste First"} value="" />
// //                     {subcasteOptions && subcasteOptions.length > 0 ?
// //                       subcasteOptions.map((subcaste, index) =>
// //                         subcaste ? <Picker.Item key={index} label={subcaste.toString()} value={subcaste.toString()} /> : null
// //                       ) :
// //                       null
// //                     }
// //                   </Picker>
// //                 </View>
// //                 {formData.caste && subcasteOptions.length === 0 && (
// //                   <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
// //                     Loading subcaste options...
// //                   </Text>
// //                 )}
// //               </View>

// //             </View>

// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Mother Tongue</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 {/* Changed from TextInput to Picker for mother tongue */}
// //                 <Picker
// //                   selectedValue={formData.motherTongue}
// //                   onValueChange={(itemValue) => handleChange('motherTongue', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select Mother Tongue" value="" />
// //                   {motherTongueOptions.map((tongue, index) => {
// //                     return (
// //                       (tongue ? <Picker.Item key={index} label={tongue} value={tongue} /> : null)
// //                     )
// //                   }

// //                   )}
// //                 </Picker>
// //               </View>
// //               {motherTongueOptions.length === 0 && (
// //                 <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
// //                   Loading mother tongue options...
// //                 </Text>
// //               )}
// //             </View>

// //           </View>
// //           {/* Horoscope Details */}
// //           <View style={{
// //             width: '100%',
// //             backgroundColor: 'white',
// //             borderRadius: 12,
// //             padding: 16,
// //             marginBottom: 24,
// //             shadowColor: '#000',
// //             shadowOffset: { width: 0, height: 2 },
// //             shadowOpacity: 0.1,
// //             shadowRadius: 4,
// //             elevation: 3
// //           }}>
// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
// //               <View style={{
// //                 backgroundColor: '#FCE7F3',
// //                 borderRadius: 9999,
// //                 padding: 8,
// //                 marginRight: 12
// //               }}>
// //                 <Star size={24} color="#EC4899" />
// //               </View>
// //               <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
// //                 Horoscope Details
// //               </Text>
// //             </View>

// //             {/* zodiacSign (Zodiac Sign) */}
// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>zodiacSign (Zodiac Sign)</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 <Picker
// //                   selectedValue={formData.zodiacSign}
// //                   onValueChange={(itemValue) => handleChange('zodiacSign', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select an option" value="" />
// //                   {zodiacSignOptions.map((zodiacSign, index) => (
// //                     <Picker.Item key={index} label={zodiacSign} value={zodiacSign} />
// //                   ))}
// //                 </Picker>
// //               </View>
// //             </View>

// //             {/* starSign (Star) */}
// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>starSign (Star)</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 <Picker
// //                   selectedValue={formData.starSign}
// //                   onValueChange={(itemValue) => handleChange('starSign', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select an option" value="" />
// //                   {starSignOptions.map((starSign, index) => (
// //                     <Picker.Item key={index} label={starSign} value={starSign} />
// //                   ))}
// //                 </Picker>
// //               </View>
// //             </View>
// //           </View>

// //           {/* Lifestyle Preferences */}
// //           <View style={{
// //             width: '100%',
// //             backgroundColor: 'white',
// //             borderRadius: 12,
// //             padding: 16,
// //             marginBottom: 24,
// //             shadowColor: '#000',
// //             shadowOffset: { width: 0, height: 2 },
// //             shadowOpacity: 0.1,
// //             shadowRadius: 4,
// //             elevation: 3
// //           }}>
// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
// //               <View style={{
// //                 backgroundColor: '#FCE7F3',
// //                 borderRadius: 9999,
// //                 padding: 8,
// //                 marginRight: 12
// //               }}>
// //                 <Coffee size={24} color="#EC4899" />
// //               </View>
// //               <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
// //                 Lifestyle Preferences
// //               </Text>
// //             </View>

// //             {/* Diet Preference */}
// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Diet Preference</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 {/* Changed from TextInput to Picker for mother tongue */}
// //                 <Picker
// //                   selectedValue={formData.dietPreference}
// //                   onValueChange={(itemValue) => handleChange('dietPreference', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select Your Diet" value="" />
// //                   {Dietoptions.map((Diet, index) => {
// //                     return (
// //                       (Diet ? <Picker.Item key={index} label={Diet} value={Diet} /> : null)
// //                     )
// //                   }

// //                   )}
// //                 </Picker>
// //               </View>
// //               {motherTongueOptions.length === 0 && (
// //                 <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
// //                   Loading mother tongue options...
// //                 </Text>
// //               )}
// //             </View>

// //             {/* smokingHabits Habits */}
// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>smokingHabits Habits</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 <Picker
// //                   selectedValue={formData.smokingHabits}
// //                   onValueChange={(itemValue) => handleChange('smokingHabits', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select an option" value="" />
// //                   <Picker.Item label="Non-Smoker" value="non-smoker" />
// //                   <Picker.Item label="Light Smoker" value="light-smoker" />
// //                   <Picker.Item label="Regular Smoker" value="regular-smoker" />
// //                 </Picker>
// //               </View>
// //             </View>

// //             {/* drinkingHabits Habits */}
// //             <View style={{ marginBottom: 16 }}>
// //               <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>drinkingHabits Habits</Text>
// //               <View style={{
// //                 borderWidth: 1,
// //                 borderColor: '#D1D5DB',
// //                 borderRadius: 8,
// //                 overflow: 'hidden',
// //                 backgroundColor: '#F9FAFB'
// //               }}>
// //                 <Picker
// //                   selectedValue={formData.drinkingHabits}
// //                   onValueChange={(itemValue) => handleChange('drinkingHabits', itemValue)}
// //                   style={{ width: '100%' }}
// //                 >
// //                   <Picker.Item label="Select an option" value="" />
// //                   <Picker.Item label="Non-Drinker" value="non-drinker" />
// //                   <Picker.Item label="Occasional Drinker" value="occasional-drinker" />
// //                   <Picker.Item label="Regular Drinker" value="regular-drinker" />
// //                 </Picker>
// //               </View>
// //             </View>
// //           </View>

// //           {/* Submit Button */}
// //           <TouchableOpacity
// //             style={{
// //               backgroundColor: '#DB2777',
// //               paddingVertical: 16,
// //               borderRadius: 8,
// //               marginBottom: 32,
// //               alignItems: 'center',
// //               shadowColor: '#000',
// //               shadowOffset: { width: 0, height: 2 },
// //               shadowOpacity: 0.2,
// //               shadowRadius: 4,
// //               elevation: 3
// //             }}
// //             // onPress={()=>{handleSubmit}}
// //             onPress={handleSubmit}
// //           >
// //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
// //               <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
// //                 Next
// //               </Text>
// //               <ChevronsRight size={24} color="white" style={{ marginLeft: 8 }} />
// //             </View>
// //           </TouchableOpacity>
// //         </View>
// //       </ScrollView>

// //       {showToast && (
// //   <View style={{
// //     position: 'absolute',
// //     bottom: 40,
// //     left: 20,
// //     right: 20,
// //     backgroundColor: toastMessage.includes('success') ? '#10B981' : '#EF4444',
// //     padding: 16,
// //     borderRadius: 8,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //     elevation: 5
// //   }}>
// //     <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
// //       {toastMessage}
// //     </Text>
// //   </View>
// // )}
// //     </SafeAreaView>
    
// //     </>
// //   );
// // };

// // export default MatrimonialProfile;




import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const MatrimonyHomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header with gradient background */}
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Regular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>PRIME ●</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchIcon}>
            <Feather name="search" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.profileLeft}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <View style={styles.cameraIcon}>
                <Feather name="camera" size={12} color="#FFF" />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Jaya Prakash</Text>
              <Text style={styles.appName}>VivaahAI Matrimony</Text>
              <View style={styles.membershipContainer}>
                <Text style={styles.membershipText}>Free Member</Text>
                <TouchableOpacity style={styles.upgradeButton}>
                  <Text style={styles.upgradeText}>Upgrade</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.profileRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={24} color="#FF6B6B" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="menu" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E8' }]}>
              <Feather name="camera" size={24} color="#4CAF50" />
              <View style={[styles.plusIcon, { backgroundColor: '#4CAF50' }]}>
                <Feather name="plus" size={12} color="#FFF" />
              </View>
            </View>
          </View>
          <Text style={styles.actionButtonText}>Add</Text>
          <Text style={styles.actionButtonSubText}>Photo(s)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Feather name="shield-check" size={24} color="#2196F3" />
              <View style={[styles.plusIcon, { backgroundColor: '#2196F3' }]}>
                <Feather name="plus" size={12} color="#FFF" />
              </View>
            </View>
          </View>
          <Text style={styles.actionButtonText}>Verify</Text>
          <Text style={styles.actionButtonSubText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
              <Feather name="star" size={24} color="#9C27B0" />
              <View style={[styles.plusIcon, { backgroundColor: '#9C27B0' }]}>
                <Feather name="plus" size={12} color="#FFF" />
              </View>
            </View>
          </View>
          <Text style={styles.actionButtonText}>Add</Text>
          <Text style={styles.actionButtonSubText}>Horoscope</Text>
        </TouchableOpacity>
      </View>

      {/* Recommendations Section */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.recommendationsSection}>
          <View style={styles.recommendationsHeader}>
            <View>
              <Text style={styles.recommendationsTitle}>💕 Daily Recommendations</Text>
              <Text style={styles.recommendationsSubtitle}>Recommended matches for today</Text>
            </View>
            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>⏰ Time left to view</Text>
              <Text style={styles.timerTime}>09h:35m:07s</Text>
            </View>
          </View>

          {/* Profile Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profileCardsContainer}>
            <View style={styles.profileCard}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616c9c1293a?w=200&h=250&fit=crop&crop=face' }}
                  style={styles.profileCardImage}
                />
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.profileCardInfo}>
                <Text style={styles.profileCardName}>Rajilakshmi</Text>
                <Text style={styles.profileCardDetails}>20 Yrs, 5'0"</Text>
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={12} color="#FF6B6B" />
                  <Text style={styles.locationText}>Chennai</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.heartButton}>
                <Feather name="heart" size={16} color="#FF6B6B" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileCard}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=250&fit=crop&crop=face' }}
                  style={styles.profileCardImage}
                />
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.profileCardInfo}>
                <Text style={styles.profileCardName}>Sweetrani</Text>
                <Text style={styles.profileCardDetails}>18 Yrs, 5'0"</Text>
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={12} color="#FF6B6B" />
                  <Text style={styles.locationText}>Bangalore</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.heartButton}>
                <Feather name="heart" size={16} color="#FF6B6B" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileCard}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=250&fit=crop&crop=face' }}
                  style={styles.profileCardImage}
                />
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.profileCardInfo}>
                <Text style={styles.profileCardName}>Sujitha.M</Text>
                <Text style={styles.profileCardDetails}>22 Yrs, 5'1"</Text>
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={12} color="#FF6B6B" />
                  <Text style={styles.locationText}>Mumbai</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.heartButton}>
                <Feather name="heart" size={16} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View all matches</Text>
            <Feather name="arrow-right" size={16} color="#FF6B6B" />
          </TouchableOpacity>

          {/* Quick Stats Section */}
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>📊 Your Profile Stats</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>127</Text>
                <Text style={styles.statLabel}>Profile Views</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>23</Text>
                <Text style={styles.statLabel}>Interests</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Matches</Text>
              </View>
            </View>
          </View>

          {/* Tips Section */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Profile Tips</Text>
            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <Feather name="camera" size={20} color="#FFF" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipText}>Add more photos to get 3x more profile views!</Text>
                <TouchableOpacity style={styles.tipButton}>
                  <Text style={styles.tipButtonText}>Add Photos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={20} color="#4CAF50" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="search" size={20} color="#666" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="heart" size={20} color="#666" />
          <Text style={styles.navText}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="message-circle" size={20} color="#666" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={20} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 15,
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  inactiveTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inactiveTabText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 'auto',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  profileSection: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: -10,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  avatarText: {
    fontSize: 28,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  appName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  membershipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membershipText: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  upgradeButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
  },
  upgradeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  actionIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  plusIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  actionButtonSubText: {
    fontSize: 12,
    color: '#666',
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  recommendationsSection: {
    paddingHorizontal: 16,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  recommendationsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  timerContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
  },
  timerLabel: {
    fontSize: 11,
    color: '#FFF',
    marginBottom: 4,
  },
  timerTime: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  profileCardsContainer: {
    marginBottom: 25,
    padding:5
  },
  profileCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileCardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  onlineIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  heartButton: {
    position: 'absolute',
    bottom: 80,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  profileCardInfo: {
    padding: 16,
  },
  profileCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  profileCardDetails: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  viewAllButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewAllText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  statsSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  tipsSection: {
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tipIcon: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    padding: 12,
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  tipButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  tipButtonText: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default MatrimonyHomeScreen;