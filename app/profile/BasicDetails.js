import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import {
  Activity,
  Calendar,
  ChevronsRight,
  Coffee,
  Globe,
  Home,
  Phone,
  Star,
  User
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { RadioButton } from 'react-native-paper';
 
const MatrimonialProfile = () => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isMobile = width < 768;
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    alternateEmail: '',
    dateOfBirth: new Date(),
    country: '',
    state: '',
    city: '',
    primaryContact: '',
    secondaryContact: '',
    gender: 'male',
    // otherGender: '',
    height: '',
    weight: '',
    bodyType: 'average',
    maritalStatus: 'never married',
    children: 'no children',
    wantChildren: 'undecided',
    religion: '',
    caste: '',
    subcaste: '',
    motherTongue: '',
    dietPreference: 'vegetarian',
    smokingHabits: 'non-smoker',
    drinkingHabits: 'non-drinker',
    zodiacSign: '',
    starSign: '',
  });
 
 
  const [motherTongueOptions, setMotherTongueOptions] = useState([]);
 
 
  useEffect(() => {
    async function fetchMotherTongue() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/mother-tongue');
        const data = await response.json();
        console.log('Mother tongue data:', data);
 
        if (data && Array.isArray(data)) {
          setMotherTongueOptions(data);
        }
      } catch (error) {
        console.error('Error fetching mother tongue options:', error);
      }
    }
 
    fetchMotherTongue();
  }, []);
 
 
  const [Dietoptions, setDietOptions] = useState([]);
  useEffect(() => {
    async function fetchDietOption() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/diet-preferences');
        const data = await response.json();
        console.log('Diet Preference data:', data);
 
        if (data && Array.isArray(data)) {
          setDietOptions(data);
        }
      } catch (error) {
        console.error('Error fetching mother tongue options:', error);
      }
    }
 
    fetchDietOption();
  }, []);
 
 
 
  // Add these state variables for castes and subcastes
  const [casteOptions, setCasteOptions] = useState([]);
  const [subcasteOptions, setSubcasteOptions] = useState([]);
 
 
  useEffect(() => {
    async function fetchCastes() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/castes');
        const data = await response.json();
        console.log('Caste data:', data);
 
        if (data && Array.isArray(data)) {
          setCasteOptions(data);
        }
      } catch (error) {
        console.error('Error fetching caste options:', error);
      }
    }
 
    fetchCastes();
  }, []);
 
  // Add this effect to fetch subcastes when a caste is selected
  useEffect(() => {
    async function fetchSubcastes() {
      // Only fetch subcastes if a caste is selected
      if (!formData.caste) {
        setSubcasteOptions([]);
        return;
      }
 
      try {
        const response = await fetch(`http://stu.globalknowledgetech.com:5003/utility/sub-castes?caste=${formData.caste}`);
        const data = await response.json();
        console.log('Subcaste data:', data);
 
        if (data && Array.isArray(data)) {
          setSubcasteOptions(data);
        }
      } catch (error) {
        console.error('Error fetching subcaste options:', error);
      }
    }
 
    fetchSubcastes();
  }, [formData.caste]);
 
 
 
  // State for form fields - consolidated all form fields in one state object
 
  const [showDatePicker, setShowDatePicker] = useState(false);
 
  // Fixed handleChange function to properly update state
  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };
 
  // Date picker change handler
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      handleChange('dateOfBirth', selectedDate);
    }
  };
 
 
 
  // zodiacSign (Zodiac) options
  const zodiacSignOptions = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)',
    'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)',
    'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)',
    'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
  ];
 
  // starSign options
  const starSignOptions = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];
 
  // Country options (sample)
  const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Singapore'];
 
 
  // Add this with the other state variables at the top of the component
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');
 
// Add this where the other options arrays are defined (near zodiacSignOptions)
const religionOptions = [
  'Hindu',
  'Muslim',
  'Christian',
  'Sikh',
  'Buddhist',
  'Jain',
  'Parsi',
  'Jewish',
  'Bahai',
  'Other'
];
 
 
 
const clearForm = () => {
  setFormData({
    firstName: '',
    lastName: '',
    email: '',
    alternateEmail: '',
    dateOfBirth: new Date(),
    country: '',
    state: '',
    city: '',
    primaryContact: '',
    secondaryContact: '',
    gender: 'male',
    height: '',
    weight: '',
    bodyType: 'average',
    maritalStatus: 'never married',
    children: 'no children',
    wantChildren: 'want childreb',
    religion: '',
    caste: '',
    subcaste: '',
    motherTongue: '',
    dietPreference: 'vegetarian',
    smokingHabits: 'non-smoker',
    drinkingHabits: 'non-drinker',
    zodiacSign: '',
    starSign: '',
  });
};
 
 
useEffect(() =>{
  async function setBasicDetails(){
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const email = await AsyncStorage.getItem('email');
      const primaryContact = await AsyncStorage.getItem('primaryContact');
 
      if (firstName && lastName && email && primaryContact) {
        setFormData(prevData => ({
          ...prevData,
          firstName: firstName,
          lastName: lastName,
          email: email,
          primaryContact: primaryContact
        }));
      }
  }
  setBasicDetails();
},[]);
 
 
const handleSubmit = async () => {
  try {
    // Create a copy of formData with height and weight converted to integers
    const submissionData = {
      ...formData,
      height: formData.height ? parseInt(formData.height, 10) : null,
      weight: formData.weight ? parseInt(formData.weight, 10) : null,
      isBasicProfileSubmitted:true
    };
 
    console.log('Submitting profile:', submissionData);
 
    const authToken = await AsyncStorage.getItem('token');    
    if (!authToken) {
      console.error('Auth token not found');
      setToastMessage('Authentication error. Please login again.');
      setShowToast(true);
     
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }
   
    const response = await fetch('http://stu.globalknowledgetech.com:5003/user/add-Profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(submissionData),
    });
   
    if (response.status === 200) {
      setToastMessage('Basic profile details have been added successfully!');
      setShowToast(true);
      clearForm();
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
      router.push('/profile/ProfessionalDetails');
      console.log('Profile created successfully');
    } else {
      console.error('Failed to create profile:', response.status);
      setToastMessage('Failed to add profile. Please try again.');
      setShowToast(true);
     
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  } catch (error) {
    console.error('Error submitting profile:', error);
    setToastMessage('Network error. Please try again.');
    setShowToast(true);
   
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }
};
  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
      {/* Header */}
      <StatusBar barStyle="dark-content" />
      <View style={{
        width: '100%',
        backgroundColor: '#EC4899',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
      }}>
        <Text style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Create Profile
        </Text>
        <Text style={{
          color: 'white',
          textAlign: 'center',
          marginTop: 6,
          opacity: 0.9,
          fontSize: 18
        }}>
          Find your perfect match by completing your profile
        </Text>
      </View>
 
      <ScrollView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
        <View style={isWeb && !isMobile ?
          { maxWidth: 768, marginLeft: 'auto', marginRight: 'auto', padding: 24 } :
          { width: '100%', padding: 16 }
        }>
 
          {/* Personal Details */}
          <View style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{
                backgroundColor: '#FCE7F3',
                borderRadius: 9999,
                padding: 8,
                marginRight: 12
              }}>
                <User size={24} color="#EC4899" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
                Personal Details
              </Text>
            </View>
 
            <View style={{ flexDirection: isWeb && !isMobile ? 'row' : 'column' }}>
              <View style={{ flex: 1, marginRight: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>First Name</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    width: '100%',
                    backgroundColor: '#F9FAFB'
                  }}
                  value={formData.firstName}
                  onChangeText={(text) => handleChange('firstName', text)}
                  placeholder="Enter your first name"
                  editable={false}
                />
              </View>
              <View style={{ flex: 1, marginLeft: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Last Name</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    width: '100%',
                    backgroundColor: '#F9FAFB'
                  }}
                  value={formData.lastName}
                  onChangeText={(text) => handleChange('lastName', text)}
                  placeholder="Enter your last name"
                  editable={false}
                />
              </View>
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Email</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  padding: 12,
                  width: '100%',
                  backgroundColor: '#F9FAFB'
                }}
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={false}
              />
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Alternate Email (Optional)</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  padding: 12,
                  width: '100%',
                  backgroundColor: '#F9FAFB'
                }}
                value={formData.alternateEmail}
                onChangeText={(text) => handleChange('alternateEmail', text)}
                placeholder="Enter alternate email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Date of Birth</Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  padding: 12,
                  width: '100%',
                  backgroundColor: '#F9FAFB',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{formData.dateOfBirth.toDateString()}</Text>
                <Calendar size={20} color="#6B7280" />
              </TouchableOpacity>
 
              {showDatePicker && (
                <DateTimePicker
                  value={formData.dateOfBirth}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Gender</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                  <RadioButton
                    value="male"
                    status={formData.gender === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => handleChange('gender', 'male')}
                    color="#EC4899"
                  />
                  <Text style={{ color: '#4B5563' }}>Male</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                  <RadioButton
                    value="female"
                    status={formData.gender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => handleChange('gender', 'female')}
                    color="#EC4899"
                  />
                  <Text style={{ color: '#4B5563' }}>Female</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <RadioButton
                    value="other"
                    status={formData.gender === 'other' ? 'checked' : 'unchecked'}
                    onPress={() => handleChange('gender', 'other')}
                    color="#EC4899"
                  />
                  <Text style={{ color: '#4B5563' }}>Other</Text>
                </View>
              </View>
 
              {formData.gender === 'other' && (
                <View style={{ marginTop: 8 }}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#D1D5DB',
                      borderRadius: 8,
                      padding: 12,
                      width: '100%',
                      backgroundColor: '#F9FAFB'
                    }}
                    value={formData.otherGender}
                    onChangeText={(text) => handleChange('otherGender', text)}
                    placeholder="Please specify Gender"
                  />
                </View>
              )}
            </View>
          </View>
 
          {/* Contact Information */}
          <View style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{
                backgroundColor: '#FCE7F3',
                borderRadius: 9999,
                padding: 8,
                marginRight: 12
              }}>
                <Phone size={24} color="#EC4899" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
                Contact Information
              </Text>
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Primary Contact</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  padding: 12,
                  width: '100%',
                  backgroundColor: '#F9FAFB'
                }}
                value={formData.primaryContact}
                onChangeText={(text) => handleChange('primaryContact', text)}
                placeholder="Enter your primary contact number"
                keyboardType="phone-pad"
                editable={false}
              />
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Secondary Contact (Optional)</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  padding: 12,
                  width: '100%',
                  backgroundColor: '#F9FAFB'
                }}
                value={formData.secondaryContact}
                onChangeText={(text) => handleChange('secondaryContact', text)}
                placeholder="Enter your secondary contact number"
                keyboardType="phone-pad"
              />
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Country</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.country}
                  onValueChange={(itemValue) => handleChange('country', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  {countries.map((country, index) => (
                    <Picker.Item key={index} label={country} value={country} />
                  ))}
                </Picker>
              </View>
            </View>
 
            <View style={{ flexDirection: isWeb && !isMobile ? 'row' : 'column' }}>
              <View style={{ flex: 1, marginRight: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>State</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    width: '100%',
                    backgroundColor: '#F9FAFB'
                  }}
                  value={formData.state}
                  onChangeText={(text) => handleChange('state', text)}
                  placeholder="Enter your state"
                />
              </View>
              <View style={{ flex: 1, marginLeft: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>City</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    width: '100%',
                    backgroundColor: '#F9FAFB'
                  }}
                  value={formData.city}
                  onChangeText={(text) => handleChange('city', text)}
                  placeholder="Enter your city"
                />
              </View>
            </View>
          </View>
 
          {/* Physical Attributes */}
          <View style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{
                backgroundColor: '#FCE7F3',
                borderRadius: 9999,
                padding: 8,
                marginRight: 12
              }}>
                <Activity size={24} color="#EC4899" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
                Physical Attributes
              </Text>
            </View>
 
            <View style={{ flexDirection: isWeb && !isMobile ? 'row' : 'column' }}>
              <View style={{ flex: 1, marginRight: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Height (cm)</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    width: '100%',
                    backgroundColor: '#F9FAFB'
                  }}
                  value={formData.height}
                  onChangeText={(text) => handleChange('height', text)}
                  placeholder="Height in cm"
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1, marginLeft: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Weight (kg)</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    width: '100%',
                    backgroundColor: '#F9FAFB'
                  }}
                  value={formData.weight}
                  onChangeText={(text) => handleChange('weight', text)}
                  placeholder="Weight in kg"
                  keyboardType="numeric"
                />
              </View>
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Body Type</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.bodyType}
                  onValueChange={(itemValue) => handleChange('bodyType', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="Slim" value="slim" />
                  <Picker.Item label="Athletic" value="athletic" />
                  <Picker.Item label="Average" value="average" />
                  <Picker.Item label="Heavy" value="heavy" />
                </Picker>
              </View>
            </View>
          </View>
 
          {/* Family & Status */}
          <View style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{
                backgroundColor: '#FCE7F3',
                borderRadius: 9999,
                padding: 8,
                marginRight: 12
              }}>
                <Home size={24} color="#EC4899" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
                Family & Status
              </Text>
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Marital Status</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.maritalStatus}
                  onValueChange={(itemValue) => handleChange('maritalStatus', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="Never Married" value="never married" />
                  <Picker.Item label="Divorced" value="divorced" />
                  <Picker.Item label="Widowed" value="widowed" />
                  <Picker.Item label="Separated" value="separated" />
                </Picker>
              </View>
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Children</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.children}
                  onValueChange={(itemValue) => handleChange('children', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="No Children" value="no children" />
                  <Picker.Item label="Have Children living with me" value="having children living with me" />
                  <Picker.Item label="Have Children not living with me" value="having children not living with me" />
                </Picker>
              </View>
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Want Children</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.wantChildren}
                  onValueChange={(itemValue) => handleChange('wantChildren', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="Want Children" value="want children" />
                  <Picker.Item label="Don't Want Children" value="don't want children" />
                  {/* <Picker.Item label="Not Sure" value="undecided" /> */}
                </Picker>
              </View>
            </View>
          </View>
 
          {/* Religion & Culture */}
          <View style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{
                backgroundColor: '#FCE7F3',
                borderRadius: 9999,
                padding: 8,
                marginRight: 12
              }}>
                <Globe size={24} color="#EC4899" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
                Religion & Culture
              </Text>
            </View>
 
            <View style={{ marginBottom: 16 }}>
  <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Religion</Text>
  <View style={{
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB'
  }}>
    <Picker
      selectedValue={formData.religion}
      onValueChange={(itemValue) => handleChange('religion', itemValue)}
      style={{ width: '100%' }}
    >
      <Picker.Item label="Select Religion" value="" />
      {religionOptions.map((religion, index) => (
        <Picker.Item key={index} label={religion} value={religion} />
      ))}
    </Picker>
  </View>
</View>
 
            <View style={{ flexDirection: isWeb && !isMobile ? 'row' : 'column' }}>
 
 
 
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Caste</Text>
                <View style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#F9FAFB'
                }}>
                  <Picker
                    selectedValue={formData.caste}
                    onValueChange={(itemValue) => {
                      // When caste changes, reset subcaste
                      handleChange('caste', itemValue);
                      handleChange('subcaste', '');
                    }}
                    style={{ width: '100%' }}
                  >
                    <Picker.Item label="Select Caste" value="" />
                    {casteOptions && casteOptions.length > 0 ?
                      casteOptions.map((caste, index) =>
                        caste ? <Picker.Item key={index} label={caste.toString()} value={caste.toString()} /> : null
                      ) :
                      null
                    }
                  </Picker>
                </View>
                {casteOptions.length === 0 && (
                  <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
                    Loading caste options...
                  </Text>
                )}
              </View>
 
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Subcaste</Text>
                <View style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#F9FAFB'
                }}>
                  <Picker
                    selectedValue={formData.subcaste}
                    onValueChange={(itemValue) => handleChange('subcaste', itemValue)}
                    style={{ width: '100%' }}
                    enabled={!!formData.caste} // Disable subcaste picker if no caste is selected
                  >
                    <Picker.Item label={formData.caste ? "Select Subcaste" : "Select Caste First"} value="" />
                    {subcasteOptions && subcasteOptions.length > 0 ?
                      subcasteOptions.map((subcaste, index) =>
                        subcaste ? <Picker.Item key={index} label={subcaste.toString()} value={subcaste.toString()} /> : null
                      ) :
                      null
                    }
                  </Picker>
                </View>
                {formData.caste && subcasteOptions.length === 0 && (
                  <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
                    Loading subcaste options...
                  </Text>
                )}
              </View>
 
            </View>
 
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Mother Tongue</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                {/* Changed from TextInput to Picker for mother tongue */}
                <Picker
                  selectedValue={formData.motherTongue}
                  onValueChange={(itemValue) => handleChange('motherTongue', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select Mother Tongue" value="" />
                  {motherTongueOptions.map((tongue, index) => {
                    return (
                      (tongue ? <Picker.Item key={index} label={tongue} value={tongue} /> : null)
                    )
                  }
 
                  )}
                </Picker>
              </View>
              {motherTongueOptions.length === 0 && (
                <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
                  Loading mother tongue options...
                </Text>
              )}
            </View>
 
          </View>
          {/* Horoscope Details */}
          <View style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{
                backgroundColor: '#FCE7F3',
                borderRadius: 9999,
                padding: 8,
                marginRight: 12
              }}>
                <Star size={24} color="#EC4899" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
                Horoscope Details
              </Text>
            </View>
 
            {/* zodiacSign (Zodiac Sign) */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>zodiacSign (Zodiac Sign)</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.zodiacSign}
                  onValueChange={(itemValue) => handleChange('zodiacSign', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  {zodiacSignOptions.map((zodiacSign, index) => (
                    <Picker.Item key={index} label={zodiacSign} value={zodiacSign} />
                  ))}
                </Picker>
              </View>
            </View>
 
            {/* starSign (Star) */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>starSign (Star)</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.starSign}
                  onValueChange={(itemValue) => handleChange('starSign', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  {starSignOptions.map((starSign, index) => (
                    <Picker.Item key={index} label={starSign} value={starSign} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
 
          {/* Lifestyle Preferences */}
          <View style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{
                backgroundColor: '#FCE7F3',
                borderRadius: 9999,
                padding: 8,
                marginRight: 12
              }}>
                <Coffee size={24} color="#EC4899" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
                Lifestyle Preferences
              </Text>
            </View>
 
            {/* Diet Preference */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Diet Preference</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                {/* Changed from TextInput to Picker for mother tongue */}
                <Picker
                  selectedValue={formData.dietPreference}
                  onValueChange={(itemValue) => handleChange('dietPreference', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select Your Diet" value="" />
                  {Dietoptions.map((Diet, index) => {
                    return (
                      (Diet ? <Picker.Item key={index} label={Diet} value={Diet} /> : null)
                    )
                  }
 
                  )}
                </Picker>
              </View>
              {motherTongueOptions.length === 0 && (
                <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>
                  Loading mother tongue options...
                </Text>
              )}
            </View>
 
            {/* smokingHabits Habits */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>smokingHabits Habits</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.smokingHabits}
                  onValueChange={(itemValue) => handleChange('smokingHabits', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="Non-Smoker" value="non-smoker" />
                  <Picker.Item label="Light Smoker" value="light-smoker" />
                  <Picker.Item label="Regular Smoker" value="regular-smoker" />
                </Picker>
              </View>
            </View>
 
            {/* drinkingHabits Habits */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>drinkingHabits Habits</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.drinkingHabits}
                  onValueChange={(itemValue) => handleChange('drinkingHabits', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="Non-Drinker" value="non-drinker" />
                  <Picker.Item label="Occasional Drinker" value="occasional-drinker" />
                  <Picker.Item label="Regular Drinker" value="regular-drinker" />
                </Picker>
              </View>
            </View>
          </View>
 
          {/* Submit Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#DB2777',
              paddingVertical: 16,
              borderRadius: 8,
              marginBottom: 32,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3
            }}
            // onPress={()=>{handleSubmit}}
            onPress={handleSubmit}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                Next
              </Text>
              <ChevronsRight size={24} color="white" style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
 
      {showToast && (
  <View style={{
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: toastMessage.includes('success') ? '#10B981' : '#EF4444',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  }}>
    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
      {toastMessage}
    </Text>
  </View>
)}
    </SafeAreaView>
   
    </>
  );
};
 
export default MatrimonialProfile;
 