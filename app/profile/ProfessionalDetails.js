import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ChevronsRight,
  GraduationCap,
  School
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { axiosPublic } from '../api/constant';
 
// Form Section Component
const FormSection = ({ title, icon, children }) => (
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
        {icon}
      </View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
        {title}
      </Text>
    </View>
    {children}
  </View>
);
 
// Form Field Component
const FormField = ({ label, children }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ color: '#4B5563', marginBottom: 4, fontWeight: '500' }}>{label}</Text>
    {children}
  </View>
);
 
// Custom Input Component
const CustomInput = ({ value, onChangeText, placeholder, keyboardType = 'default' }) => (
  <TextInput
    style={{
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 8,
      padding: 12,
      width: '100%',
      backgroundColor: '#F9FAFB'
    }}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    keyboardType={keyboardType}
  />
);
 
const MatrimonialProfile = () => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isMobile = width < 768;
  const params = useLocalSearchParams();
 
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
 
  // State for form fields
  const [formData, setFormData] = useState({
    education: '',
    degree: '',
    college: '',
    employedIn: '',
    occupation: '',
    employerName: '',
    annualIncome: ''
  });
 
  const CustomPicker = ({ selectedValue, onValueChange, items }) => (
    <View style={{
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#F9FAFB'
    }}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{width: '100%'}}
      >
        <Picker.Item label="Select an option" value="" />
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
 
  // Load edit data on component mount
  useEffect(() => {
    const loadEditData = async () => {
      if (params.isEdit === 'true') {
        setIsEditMode(true);
       
        try {
          // Method 1: Get data from AsyncStorage
          const storedData = await AsyncStorage.getItem('editData');
          if (storedData) {
            const editData = JSON.parse(storedData);
            setFormData(prevData => ({
              ...prevData,
              ...editData
            }));
            
            // Clear the stored data after use
            await AsyncStorage.removeItem('editData');
          }
         
          // Method 2: Get data from URL params (alternative approach)
          // if (params.editData) {
          //   const editData = JSON.parse(params.editData);
          //   setFormData(prevData => ({
          //     ...prevData,
          //     ...editData
          //   }));
          // }
         
        } catch (error) {
          console.error('Error loading edit data:', error);
          Alert.alert('Error', 'Failed to load existing data');
        }
      }
    };
 
    loadEditData();
  }, [params]);
 
  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
 
  const incomeOptions = [
    'Below ₹1L',
    '₹1L - ₹3L',
    '₹3L - ₹7L',
    '₹7L - ₹15L',
    '₹15L - ₹30L',
    'Above ₹30L'
  ];
 
  const degreeOptions = {
    high_school: [
      { label: '10th Grade', value: '10th' },
      { label: '12th Grade', value: '12th' }
    ],
    diploma: [
      { label: 'Engineering Diploma', value: 'eng_diploma' },
      { label: 'Business Diploma', value: 'biz_diploma' }
    ],
    bachelor: [
      { label: 'B.A.', value: 'ba' },
      { label: 'B.Sc.', value: 'bsc' },
      { label: 'B.Com', value: 'bcom' },
      { label: 'B.Tech', value: 'btech' }
    ],
    master: [
      { label: 'M.A.', value: 'ma' },
      { label: 'M.Sc.', value: 'msc' },
      { label: 'M.Com', value: 'mcom' },
      { label: 'M.Tech', value: 'mtech' }
    ],
    phd: [
      { label: 'Ph.D. in Science', value: 'phd_sci' },
      { label: 'Ph.D. in Arts', value: 'phd_arts' }
    ],
    other: [
      { label: 'Other', value: 'other' }
    ]
  };
 
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
     
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }
 
      const apiUrl = isEditMode
        ? '/user/update-professional-datas'
        : '/user/add-professional-details';
 
      const response = await axiosPublic.post(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
 
      const data = await response.json();
 
      if (response.ok) {
        if (isEditMode) {
          // Go back to profile edit screen
          // router.back();
          router.push("/navigation/MainTabs");
        } else {
          // Continue to next step in profile creation
          router.push("/profile/FamilyDetails");
        }
       {/* Alert.alert(
          'Success',
          `Professional details ${isEditMode ? 'updated' : 'created'} successfully`,
          [
            {
              text: 'OK',
              onPress: () => {
                if (isEditMode) {
                  // Go back to profile edit screen
                  router.back();
                } else {
                  // Continue to next step in profile creation
                  router.push("/profile/FamilyDetails");
                }
              }
            }
          ]
        );*/}
      } else {
        console.error('Submission failed:', data);
        Alert.alert('Error', 'Failed to save professional details');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      {/* Header */}
      <View style={{
        width: '100%',
        backgroundColor: '#EC4899',
        paddingVertical: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
      }}>
        <Text style={{
          color: 'white',
          textAlign: 'center',
          marginTop: 6,
          opacity: 0.9,
          fontSize: 18
        }}>
          {isEditMode ? 'Edit Professional Details' : 'Find your perfect match by completing your profile'}
        </Text>
      </View>
 
      <ScrollView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
        <View style={isWeb && !isMobile ?
          { maxWidth: 768, marginLeft: 'auto', marginRight: 'auto', padding: 24 } :
          { width: '100%', padding: 16 }
        }>
         
          {/* Professional Details */}
          <FormSection title="Professional Details" icon={<GraduationCap size={24} color="#EC4899" />}>
           
            <FormField label="Education" icon={<School size={60} color="#6B7280" />}>
              <CustomPicker
                selectedValue={formData.education}
                onValueChange={(itemValue) => handleChange('education', itemValue)}
                items={[
                  { label: 'High School', value: 'high_school' },
                  { label: 'Diploma', value: 'diploma' },
                  { label: 'Bachelor\'s Degree', value: 'bachelor' },
                  { label: 'Master\'s Degree', value: 'master' },
                  { label: 'Doctorate / PhD', value: 'phd' },
                  { label: 'Other', value: 'other' },
                ]}
              />
            </FormField>
 
            {formData.education !== '' && (
              <FormField label="Degree" icon={<School size={60} color="#6B7280" />}>
                <CustomPicker
                  selectedValue={formData.degree}
                  onValueChange={(itemValue) => handleChange('degree', itemValue)}
                  items={degreeOptions[formData.education] || []}
                />
              </FormField>
            )}
 
            <FormField label="College">
              <CustomInput
                value={formData.college}
                onChangeText={(text) => handleChange('college', text)}
                placeholder="e.g. Delhi University"
              />
            </FormField>
 
            <FormField label="Employed In">
              <CustomPicker
                selectedValue={formData.employedIn}
                onValueChange={(itemValue) => handleChange('employedIn', itemValue)}
                items={[
                  { label: 'Private Sector', value: 'Private Sector' },
                  { label: 'Government', value: 'government' },
                  { label: 'Self-employed', value: 'self-employed' }
                ]}
              />
            </FormField>
 
            <FormField label="Occupation">
              <CustomPicker
                selectedValue={formData.occupation}
                onValueChange={(itemValue) => handleChange('occupation', itemValue)}
                items={[
                  { label: 'Software Engineer', value: 'software_engineer' },
                  { label: 'Doctor', value: 'doctor' },
                  { label: 'Teacher', value: 'teacher' },
                  { label: 'Business Owner', value: 'business_owner' },
                  { label: 'Civil Servant', value: 'civil_servant' },
                  { label: 'Lawyer', value: 'lawyer' },
                  { label: 'Accountant', value: 'accountant' },
                  { label: 'Artist', value: 'artist' },
                  { label: 'Engineer', value: 'engineer' },
                  { label: 'Other', value: 'other' },
                ]}
              />
            </FormField>
 
            <FormField label="Company Name">
              <CustomInput
                value={formData.employerName}
                onChangeText={(text) => handleChange('employerName', text)}
                placeholder="e.g. Infosys"
              />
            </FormField>
 
            <FormField label="Annual Income">
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {incomeOptions.map((option) => {
                  const isSelected = formData.annualIncome === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleChange('annualIncome', option)}
                      style={{
                        width: '32%',
                        paddingVertical: 10,
                        paddingHorizontal: 8,
                        borderRadius: 20,
                        backgroundColor: isSelected ? '#DB2777' : '#E5E7EB',
                        marginBottom: 12,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{
                        color: isSelected ? 'white' : '#374151',
                        fontWeight: '500',
                        textAlign: 'center',
                        fontSize: 14
                      }}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </FormField>
          </FormSection>
 
          {/* Submit Button */}
          <TouchableOpacity
            style={{
              backgroundColor: loading ? '#9CA3AF' : '#DB2777',
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
            disabled={loading}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                {loading ? 'Saving...' : (isEditMode ? 'Update Details' : 'Next')}
              </Text>
              {!loading && <ChevronsRight size={24} color="white" style={{ marginLeft: 8 }} />}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
 
export default MatrimonialProfile;
 