import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import {
  ChevronsRight,
  GraduationCap,
  School
} from 'lucide-react-native'; // Changed from lucide-react to lucide-react-native
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
 
  const router = useRouter();
  // State for form fields
  const [formData, setFormData] = useState({
    education: '',
    college: '',
    employedIn: '',
    occupation:'',
    companyname:'',
    annualincome:''
   
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
 
 
 
  // Form submission handler
  const handleSubmit = () => {
    router.push('/profile/FamilyDetails')
    console.log('Professionaldetails created:', formData);
    // Here you would typically send this data to your API
  };
 
 
 
 
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
 
      <ScrollView  style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
        <View style={isWeb && !isMobile ?
          { maxWidth: 768, marginLeft: 'auto', marginRight: 'auto', padding: 24 } :
          { width: '100%', padding: 16 }
        }>
         
          {/* Profession Details */}
          <FormSection title="Professional Details" icon={<GraduationCap size={24} color="#EC4899" />}>
           
              <View style={{ flex: 1, marginRight: isWeb && !isMobile ? 8 : 0 }}>
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
              </View>
              <View style={{ flex: 1, marginLeft: isWeb && !isMobile ? 8 : 0 }}>
                <FormField label="College">
                  <CustomInput
                    value={formData.college}
                    onChangeText={(text) => handleChange('college', text)}
                    placeholder="e.g. Delhi University"
                  />
                </FormField>
              </View>
            <FormField label="Employed In">
              <CustomPicker
                selectedValue={formData.employedIn}
                onValueChange={(itemValue) => handleChange('employedIn', itemValue)}
                // style={{
                //   width: '100%',
                //   padding: 10, // better spacing
                //   color: '#111827' // Tailwind's text-gray-900
                // }}
                items={[
                  { label: 'Private', value: 'private' },
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
              value={formData.companyname}
              onChangeText={(text) => handleChange('companyname', text)}
               placeholder="e.g. Infosys"
            />
          </FormField>
        <FormField label="Annual Income">
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    {incomeOptions.map((option) => {
      const isSelected = formData.annualincome === option;
      return (
        <TouchableOpacity
          key={option}
          onPress={() => handleChange('annualincome', option)}
          style={{
            width: '32%', // ensures 3 per row with spacing
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
 
 