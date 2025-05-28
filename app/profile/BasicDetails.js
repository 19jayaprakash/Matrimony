import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from 'expo-router';
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
import { axiosPublic } from '../api/constant';

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
    gender: '',
    // otherGender: '',
    height: '',
    weight: '',
    bodyType: '',
    maritalStatus: '',
    children: '',
    wantChildren: '',
    religion: '',
    caste: '',
    subcaste: '',
    motherTongue: '',
    dietPreference: '',
    smokingHabits: '',
    drinkingHabits: '',
    zodiacSign: '',
    starSign: '',
  });


  const [motherTongueOptions, setMotherTongueOptions] = useState([]);

  useEffect(() => {
    async function fetchMotherTongue() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=mother_tongue');
        const result = await response.json();
        console.log('Mother tongue response:', result);

        // Handle the response structure with "data" property
        if (result && Array.isArray(result.data)) {
          setMotherTongueOptions(result.data);
        } else if (result && Array.isArray(result)) {
          // Fallback if the response is directly an array
          setMotherTongueOptions(result);
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
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=diet_preferences');
        const result = await response.json();
        console.log('Diet Preference data:', result);

        if (result && Array.isArray(result.data)) {
          setDietOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching diet preference options:', error);
      }
    }

    fetchDietOption();
  }, []);





  const [smokingoptions, setsmokingOptions] = useState([]);
  useEffect(() => {
    async function fetchsmokingOption() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=smoking_habits');
        const result = await response.json();
        console.log('smoking Preference data:', result);

        if (result && Array.isArray(result.data)) {
          setsmokingOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching smoking habits options:', error);
      }
    }

    fetchsmokingOption();
  }, []);



  const [drinkingoptions, setdrinkingOptions] = useState([]);
  useEffect(() => {
    async function fetchdrinkingOption() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=drinking_habits');
        const result = await response.json();
        console.log('drinking Preference data:', result);

        if (result && Array.isArray(result.data)) {
          setdrinkingOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching drinking habits options:', error);
      }
    }

    fetchdrinkingOption();
  }, []);



  const [religionoptions, setreligionOptions] = useState([]);
  useEffect(() => {
    async function fetchreligionOption() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=religion');
        const result = await response.json();
        console.log('religion data:', result);

        if (result && Array.isArray(result.data)) {
          setreligionOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching religion options:', error);
      }
    }

    fetchreligionOption();
  }, []);



  // Add these state variables for castes and subcastes
  const [casteOptions, setCasteOptions] = useState([]);
  const [subcasteOptions, setSubcasteOptions] = useState([]);


  useEffect(() => {
    async function fetchCastes() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=caste');
        const result = await response.json();
        console.log('caste data:', result)

        if (result && Array.isArray(result.data)) {
          setCasteOptions(result.data);
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
        const response = await fetch(`http://stu.globalknowledgetech.com:5003/utility/parent?parentCode=${formData.caste}`);
        const result = await response.json();
        console.log('subcaste data:', result)

        if (result && Array.isArray(result.data)) {
          setSubcasteOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching subcaste options:', error);
      }
    }

    fetchSubcastes();
  }, [formData.caste]);






  // Add these state variables for zodiac and star
  const [zodiacOptions, setzodiacOptions] = useState([]);
  const [starOptions, setstarOptions] = useState([]);


  useEffect(() => {
    async function fetchzodiac() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=zodiac_sign');
        const result = await response.json();
        console.log('zodiac data:', result)

        if (result && Array.isArray(result.data)) {
          setzodiacOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching zodiac options:', error);
      }
    }

    fetchzodiac();
  }, []);

  // Add this effect to fetch subcastes when a caste is selected
  useEffect(() => {
    async function fetchSubcastes() {
      // Only fetch subcastes if a caste is selected
      if (!formData.zodiacSign) {
        setstarOptions([]);
        return;
      }

      try {
        const response = await fetch(`http://stu.globalknowledgetech.com:5003/utility/parent?parentCode=${formData.zodiacSign}`);
        const result = await response.json();
        console.log('star data:', result)

        if (result && Array.isArray(result.data)) {
          setstarOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching star options:', error);
      }
    }

    fetchSubcastes();
  }, [formData.zodiacSign]);


  const [getuserdetails, setuserdetails] = useState([]);
 
 // Replace the existing fetchuser useEffect with this updated version
useEffect(() => {
  async function fetchuser() {
    try {
     
      const token = await AsyncStorage.getItem('token');
     
      const response = await fetch('http://stu.globalknowledgetech.com:5003/user/user-profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
     
      const result = await response.json();
      console.log('user data:', result);
     
      if (result) {
        const userData = result;
        setuserdetails(result);
        setFormData(prevData => ({
          ...prevData,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          alternateEmail: userData.alternateEmail || '',
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : new Date(),
          primaryContact: userData.primaryContact || '',
          secondaryContact: userData.secondaryContact || '',
          height: userData.height ? userData.height.toString() : '',
          weight: userData.weight ? userData.weight.toString() : '',
          country: userData.country || '',
          state: userData.state || '',
          city: userData.city || '',
          gender: userData.gender || '',
          bodyType: userData.bodyType || '',
          maritalStatus: userData.maritalStatus || '',
          children: userData.children || '',
          wantChildren: userData.wantChildren || '',
          religion: userData.religion || '',
          caste: userData.caste || '',
          subcaste: userData.subCaste || '',
          zodiacSign: userData.zodiacSign || '',
          starSign: userData.starSign || '',
          dietPreference: userData.dietPreferences || '',
          smokingHabits: userData.smokingHabits || '',
          drinkingHabits: userData.drinkingHabits || '',
          motherTongue: userData.motherTongue || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
 
  fetchuser();
}, []);








    // Add these state variables for state and city
    const [stateOptions, setstateOptions] = useState([]);
    const [cityOptions, setcityOptions] = useState([]);
  
  
    useEffect(() => {
      async function fetchstate() {
        try {
          const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=state');
          const result = await response.json();
          console.log('state data:', result)
  
          if (result && Array.isArray(result.data)) {
            setstateOptions(result.data);
          }
        } catch (error) {
          console.error('Error fetching state options:', error);
        }
      }
  
      fetchstate();
    }, []);
  
    // Add this effect to fetch subcastes when a caste is selected
    useEffect(() => {
      async function fetchcity() {
        if (!formData.state) {
          setcityOptions([]);
          return;
        }
    
        try {
          // Replace spaces with underscores when sending to API
          const stateValue = formData.state.replace(/\s+/g, '_');
          
          const response = await fetch(`http://stu.globalknowledgetech.com:5003/utility/parent?parentCode=${stateValue}`);
          const result = await response.json();
          console.log('city data:', result)
          
          if (result && Array.isArray(result.data)) {
            setcityOptions(result.data);
          }
        } catch (error) {
          console.error('Error fetching city options:', error);
        }
      }
    
      fetchcity();
    }, [formData.state]);



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


  // Country options (sample)
  const countries = ['India'];


  // Add this with the other state variables at the top of the component
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);



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
      gender: '',
      height: '',
      weight: '',
      bodyType: '',
      maritalStatus: '',
      children: '',
      wantChildren: '',
      religion: '',
      caste: '',
      subcaste: '',
      motherTongue: '',
      dietPreference: '',
      smokingHabits: '',
      drinkingHabits: '',
      zodiacSign: '',
      starSign: '',
    });
  };

useEffect(()=>{
          const params = useLocalSearchParams();
          setIsEditMode(true);

},[params]);
    

  const [martialoptions, setmartialOptions] = useState([]);
  useEffect(() => {
    async function fetchmaritalOption() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=marital_status');
        const result = await response.json();
        console.log('martial data:', result);

        if (result && Array.isArray(result.data)) {
          setmartialOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching martial options:', error);
      }
    }

    fetchmaritalOption();
  }, []);



  const [bodytypeoptions, setbodytypeOptions] = useState([]);
  useEffect(() => {
    async function fetchbodytypeOption() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=body_type');
        const result = await response.json();
        console.log('body type data:', result);

        if (result && Array.isArray(result.data)) {
          setbodytypeOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching body type options:', error);
      }
    }

    fetchbodytypeOption();
  }, []);


  const [havechildrenoptions, sethavechildrenOptions] = useState([]);
  useEffect(() => {
    async function fetchhavechildrenoption() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=children');
        const result = await response.json();
        console.log('Have children data:', result);

        if (result && Array.isArray(result.data)) {
          sethavechildrenOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching have children options:', error);
      }
    }

    fetchhavechildrenoption();
  }, []);



  const [wantchildrenoptions, setwantchildrenOptions] = useState([]);
  useEffect(() => {
    async function fetchwantchildrenoption() {
      try {
        const response = await fetch('http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=want_children');
        const result = await response.json();

        if (result && Array.isArray(result.data)) {
          setwantchildrenOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching want children options:', error);
      }
    }

    fetchwantchildrenoption();
  }, []);


  const handleSubmit = async () => {
    try {

      
      // Create a copy of formData with height and weight converted to integers
      const submissionData = {
        ...formData,
        height: formData.height ? parseInt(formData.height, 10) : null,
        weight: formData.weight ? parseInt(formData.weight, 10) : null,
        isBasicProfileSubmitted: true,
      };

      console.log('Submitting profile:', submissionData);

      const authToken = await AsyncStorage.getItem('token');
            // const authToken1 = localStorage.getItem('token');

      if (!authToken) {
        console.error('Auth token not found');
        setToastMessage('Authentication error. Please login again.');
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        return;
      }
      const response = await axiosPublic.post('/user/add-Profile', {
        headers: {
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

        if(!isEditMode){
        router.push("/profile/ProfessionalDetails");
        }
        else{
          router.push('/navigation/MainTabs')
        }

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
                                    editable={false} 

                  keyboardType="email-address"
                  autoCapitalize="none"
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
                  <View style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#F9FAFB'
                }}>
                  <Picker
                    selectedValue={formData.state}
                    onValueChange={(itemValue) => handleChange('state', itemValue)}
                    style={{ width: '100%' }}
                  >
                    <Picker.Item label="Select an option" value="" />
                    {stateOptions.map((state, index) => (
                      <Picker.Item key={index} label={state} value={state} />
                    ))}
                  </Picker>
                </View>
                </View>
                <View style={{ flex: 1, marginLeft: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
                  <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>City</Text>
                  <View style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#F9FAFB'
                }}>
                  <Picker
                    selectedValue={formData.city}
                    onValueChange={(itemValue) => handleChange('city', itemValue)}
                    style={{ width: '100%' }}
                  >
                    <Picker.Item label="Select an option" value="" />
                    {cityOptions.map((city, index) => (
                      <Picker.Item key={index} label={city} value={city} />
                    ))}
                  </Picker>
                </View>
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
                    {bodytypeoptions.map((bodytype, index) => (
                      <Picker.Item key={index} label={bodytype} value={bodytype} />
                    ))}
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
 {martialoptions.map((marital, index) => (
                      <Picker.Item key={index} label={marital} value={marital} />
                    ))}
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
                    {havechildrenoptions.map((marital, index) => (
                      <Picker.Item key={index} label={marital} value={marital} />
                    ))}
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
                    {wantchildrenoptions.map((marital, index) => (
                      <Picker.Item key={index} label={marital} value={marital} />
                    ))}
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
                    {religionoptions.map((religion, index) => (
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
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>zodiac Sign</Text>
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
                    {zodiacOptions.map((zodiacSign, index) => (
                      <Picker.Item key={index} label={zodiacSign} value={zodiacSign} />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* starSign (Star) */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>star Sign</Text>
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
                    {starOptions.map((starSign, index) => (
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
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>smoking Habits</Text>
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
                    {smokingoptions.map((smoking, index) => {
                      return (
                        (smoking ? <Picker.Item key={index} label={smoking} value={smoking} /> : null)
                      )
                    }

                    )}
                  </Picker>
                </View>
              </View>

              {/* drinkingHabits Habits */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>drinking Habits</Text>
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
                    {drinkingoptions.map((drinking, index) => {
                      return (
                        (drinking ? <Picker.Item key={index} label={drinking} value={drinking} /> : null)
                      )
                    }

                    )}
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


