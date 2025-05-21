import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
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
import { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
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
  const router= useRouter();

  // State for form fields - consolidated all form fields in one state object
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    alternateEmail: '',
    dob: new Date(),
    country: '',
    state: '',
    city: '',
    contact1: '',
    contact2: '',
    sex: 'male',
    otherGender: '',
    height: '',
    weight: '',
    bodyType: 'average',
    maritalStatus: 'never married',
    childrenStatus: 'no children',
    wantChildren: 'undecided',
    religion: '',
    caste: '',
    subcaste: '',
    motherTongue: '',
    dietPreference: 'vegetarian',
    smoking: 'non-smoker',
    drinking: 'non-drinker',
    rasi: '',
    nakshatra: '',
  });

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
      handleChange('dob', selectedDate);
    }
  };

  // Form submission handler
  const handleSubmit = () => {
    console.log('Profile created:', formData);
    router.push('/profile/ProfessionalDetails')
    // Here you would typically send this data to your API
  };

  // Rasi (Zodiac) options
  const rasiOptions = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)',
    'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)',
    'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)',
    'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
  ];

  // Nakshatra options
  const nakshatraOptions = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  // Country options (sample)
  const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Singapore'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      {/* Header */}
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
                <Text>{formData.dob.toDateString()}</Text>
                <Calendar size={20} color="#6B7280" />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={formData.dob}
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
                    status={formData.sex === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => handleChange('sex', 'male')}
                    color="#EC4899"
                  />
                  <Text style={{ color: '#4B5563' }}>Male</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                  <RadioButton
                    value="female"
                    status={formData.sex === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => handleChange('sex', 'female')}
                    color="#EC4899"
                  />
                  <Text style={{ color: '#4B5563' }}>Female</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <RadioButton
                    value="other"
                    status={formData.sex === 'other' ? 'checked' : 'unchecked'}
                    onPress={() => handleChange('sex', 'other')}
                    color="#EC4899"
                  />
                  <Text style={{ color: '#4B5563' }}>Other</Text>
                </View>
              </View>

              {formData.sex === 'other' && (
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
                value={formData.contact1}
                onChangeText={(text) => handleChange('contact1', text)}
                placeholder="Enter your primary contact number"
                keyboardType="phone-pad"
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
                value={formData.contact2}
                onChangeText={(text) => handleChange('contact2', text)}
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
                  selectedValue={formData.childrenStatus}
                  onValueChange={(itemValue) => handleChange('childrenStatus', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="No Children" value="no children" />
                  <Picker.Item label="Have Children living with me" value="have children with me" />
                  <Picker.Item label="Have Children not living with me" value="have children not with me" />
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
                  <Picker.Item label="Not Sure" value="undecided" />
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
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  padding: 12,
                  width: '100%',
                  backgroundColor: '#F9FAFB'
                }}
                value={formData.religion}
                onChangeText={(text) => handleChange('religion', text)}
                placeholder="Your Religion"
              />
            </View>

            <View style={{ flexDirection: isWeb && !isMobile ? 'row' : 'column' }}>
              <View style={{ flex: 1, marginRight: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Caste</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    width: '100%',
                    backgroundColor: '#F9FAFB'
                  }}
                  value={formData.caste}
                  onChangeText={(text) => handleChange('caste', text)}
                  placeholder="Your Caste"
                />
              </View>
              <View style={{ flex: 1, marginLeft: isWeb && !isMobile ? 8 : 0, marginBottom: 16 }}>
                <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Subcaste</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    width: '100%',
                    backgroundColor: '#F9FAFB'
                  }}
                  value={formData.subcaste}
                  onChangeText={(text) => handleChange('subcaste', text)}
                  placeholder="Your Subcaste (optional)"
                />
              </View>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Mother Tongue</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 8,
                  padding: 12,
                  width: '100%',
                  backgroundColor: '#F9FAFB'
                }}
                value={formData.motherTongue}
                onChangeText={(text) => handleChange('motherTongue', text)}
                placeholder="Your Mother Tongue"
              />
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

            {/* Rasi (Zodiac Sign) */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Rasi (Zodiac Sign)</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.rasi}
                  onValueChange={(itemValue) => handleChange('rasi', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  {rasiOptions.map((rasi, index) => (
                    <Picker.Item key={index} label={rasi} value={rasi} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Nakshatra (Star) */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Nakshatra (Star)</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.nakshatra}
                  onValueChange={(itemValue) => handleChange('nakshatra', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  {nakshatraOptions.map((nakshatra, index) => (
                    <Picker.Item key={index} label={nakshatra} value={nakshatra} />
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
                <Picker
                  selectedValue={formData.dietPreference}
                  onValueChange={(itemValue) => handleChange('dietPreference', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="Vegetarian" value="vegetarian" />
                  <Picker.Item label="Non-Vegetarian" value="non-vegetarian" />
                  <Picker.Item label="Vegan" value="vegan" />
                  <Picker.Item label="Eggetarian" value="eggetarian" />
                </Picker>
              </View>
            </View>

            {/* Smoking Habits */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Smoking Habits</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.smoking}
                  onValueChange={(itemValue) => handleChange('smoking', itemValue)}
                  style={{ width: '100%' }}
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="Non-Smoker" value="non-smoker" />
                  <Picker.Item label="Light Smoker" value="light-smoker" />
                  <Picker.Item label="Regular Smoker" value="regular-smoker" />
                </Picker>
              </View>
            </View>

            {/* Drinking Habits */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>Drinking Habits</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#F9FAFB'
              }}>
                <Picker
                  selectedValue={formData.drinking}
                  onValueChange={(itemValue) => handleChange('drinking', itemValue)}
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
    </SafeAreaView>
  );
};

export default MatrimonialProfile;