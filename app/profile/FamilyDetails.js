//Family Background page with Edit functionality
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ChevronsRight,
  Home,
  Mars,
  Trash2,
  Venus
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
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
import { axiosPublic } from '../api/constant';
 
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
 
const MatrimonialProfile = ({ route }) => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isMobile = width < 768;
  const router = useRouter();
 
  const { isEdit } = useLocalSearchParams();
const isEditMode = isEdit === 'true'; // Convert string to boolean
 
  // State for form fields
  const [formData, setFormData] = useState({});
  const [sibilingData, setsibilingData] = useState({});
  const [siblingsList, setSiblingsList] = useState([]);
  const [errors, setErrors] = useState({});
  const [familyType, setfamilyType] = useState([]);
  const [familyValues, setfamilyValues] = useState([]);
  const [maritalStatus, setmaritalStatus] = useState([]);
  const [occupation, setOccupations]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  // Fetch existing family details for edit mode
  const fetchFamilyDetails = async () => {
    if (!isEditMode) return;
   
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axiosPublic.get('http://stu.globalknowledgetech.com:5003/family/family-details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
     
      const result =  response.data;
      console.log('Fetched family details:', result);
     
      if (result) {
        const familyData = result;
       
        // Populate form data
        setFormData({
          familyType: familyData.familyType || '',
          familyValues: familyData.familyValues || '',
          parentsOccupations: familyData.parentsOccupations || '',
          otherParentsOccupation: familyData.otherParentsOccupation || ''
        });
       
        // Populate siblings list if exists
        if (familyData.sibilings && familyData.sibilings.length > 0) {
          setSiblingsList(familyData.sibilings);
          setsibilingData(prev => ({
            ...prev,
            sibilings: 'Yes'
          }));
        } else {
          setsibilingData(prev => ({
            ...prev,
            sibilings: 'No'
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching family details:', error);
    } finally {
      setIsLoading(false);
    }
  };
 
  // Initial setup useEffects
  useEffect(() => {
    if (isEditMode) {
    fetchFamilyDetails();
  }
    const fetchUtilData = async (utilHead, setStateFn) => {
      try {
        const response = await axiosPublic.get(`http://stu.globalknowledgetech.com:5003/utility/utilHead?utilHead=${utilHead}`);
        const data =  response.data;
        if (data) setStateFn(data.data);
      } catch (err) {
        console.error(`Error fetching ${utilHead}:`, err);
      }
    };
 
    fetchUtilData('family_type', setfamilyType);
    fetchUtilData('family_values', setfamilyValues);
    fetchUtilData('occupation',setOccupations)
    fetchUtilData('sibling_marital_status', setmaritalStatus);
   
    // Fetch existing data if in edit mode
  }, [isEditMode]);
 
  // Set default value only for create mode
  // useEffect(() => {
  //   if (!isEditMode && familyType.length > 0 && !formData.familyType) {
  //     handleChange('familyType', familyType[0]);
  //   }
  // }, [familyType, isEditMode]);
 
  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        [field]: value,
      };
     
      console.log('New formData:', newFormData);
      return newFormData;
    });
  };
 
  const handlesibilingChange = (field, value) => {
    setsibilingData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));
  };
 
  // Form submission handler (Create or Update)
  const handleSubmit = async () => {
    formData.sibilings = siblingsList;
    console.log('Profile data:', formData);
   
    try {
      const token = await AsyncStorage.getItem('token');
     
      // Determine API endpoint and method based on mode
      const url = isEditMode
        ? 'http://stu.globalknowledgetech.com:5003/family/update-family-details' // Update endpoint
        : 'http://stu.globalknowledgetech.com:5003/family/family-details'; // Create endpoint
     
     
      const response = await axiosPublic.post(url,formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
 
      const result =  response;
      console.log('Response:', result);
     
        // Navigate based on mode
        if (isEditMode) {
          // Go back to profile or show success message
          router.back();
        } else {
          // Continue to next step
          router.push('/profile/UserInterest');
        }
     
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  const AddSibilings = () => {
    const newSibling = {
      gender: sibilingData.sibilingsgender,
      type: sibilingData.sibilingstype,
      maritalStatus: sibilingData.SibilingMaritalsts,
      occupation: sibilingData.SibilingsOccupations === 'Others'
        ? sibilingData.OtherSibilingsOccupations
        : sibilingData.SibilingsOccupations,
    };
 
    const isSiblingEmpty =
      !newSibling.gender ||
      !newSibling.type ||
      !newSibling.maritalStatus ||
      !newSibling.occupation;
 
    if (!isSiblingEmpty) {
      console.log(newSibling);
      setSiblingsList(prev => [...prev, newSibling]);
 
      // Clear form after adding
      handlesibilingChange('sibilingsgender', '');
      handlesibilingChange('sibilingstype', '');
      handlesibilingChange('SibilingMaritalsts', '');
      handlesibilingChange('SibilingsOccupations', '');
      handlesibilingChange('OtherSibilingsOccupations', '');
    } else {
      console.log("Sibling data is empty");
      return;
    }
  };
 
  const deleteSibling = (indexToDelete) => {
    setSiblingsList((prevList) =>
      prevList.filter((_, index) => index !== indexToDelete)
    );
  };
 

 
  const CustomPicker = ({ selectedValue, onValueChange, items }) => {  
 
    console.log('selected',selectedValue,items);
   
     return (
    <View style={{
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#F9FAFB'
    }}>
      <Picker
        selectedValue={selectedValue || ""}
        onValueChange={onValueChange}
        style={{ width: '100%' }}
 
      >
        <Picker.Item label="Select an option" value="" enabled={false} />
        {items.map((item, index) => (
          <Picker.Item
            key={index}
            label={item.label}
            value={item.value}
            // Add visual indicator for selected item in console
            style={item.value === selectedValue ? { backgroundColor: '#e3f2fd' } : {}}
          />
        ))}
      </Picker>
    </View>
  );
};
 
  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading family details...</Text>
      </SafeAreaView>
    );
  }
 
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
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {isEditMode ? 'Edit Family Details' : 'Create Profile'}
        </Text>
        <Text style={{
          color: 'white',
          textAlign: 'center',
          marginTop: 6,
          opacity: 0.9,
          fontSize: 18
        }}>
          {isEditMode ? 'Update your family information' : 'Find your perfect match by completing your profile'}
        </Text>
      </View>
 
      <ScrollView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
        <View style={isWeb && !isMobile ?
          { maxWidth: 768, marginLeft: 'auto', marginRight: 'auto', padding: 24 } :
          { width: '100%', padding: 16 }
        }>
 
          {/* Family & Status */}
          <FormSection title="Family & Status" icon={<Home size={24} color="#EC4899" />}>
            <FormField label="Family Type">
              <CustomPicker
                selectedValue={formData.familyType}
                onValueChange={(itemValue) => handleChange('familyType', itemValue)}
                items={familyType.map(Type => ({ label: Type, value: Type }))}
              />
              {errors.familyType && <Text style={{ color: 'red', marginTop: 5 }}>{errors.familyType}</Text>}
            </FormField>
 
            <FormField label="Family Values">
              <CustomPicker
                selectedValue={formData.familyValues}
                onValueChange={(itemValue) => handleChange('familyValues', itemValue)}
                items={familyValues.map(familyval => ({ label: familyval, value: familyval }))}
              />
              {errors.familyValues && <Text style={{ color: 'red', marginTop: 5 }}>{errors.familyValues}</Text>}
            </FormField>
 
            <FormField label="Parent's Occupations">
              <CustomPicker
                selectedValue={formData.parentsOccupations}
                onValueChange={(itemValue) => handleChange('parentsOccupations', itemValue)}
                items={occupation.map(occpation => ({ label: occpation, value: occpation }))}
              />
 
              {formData.parentsOccupations === 'Others' && (
                <View style={{ marginTop: 10 }}>
                  <CustomInput
                    placeholder="Please specify"
                    value={formData.otherParentsOccupation || ''}
                    onChangeText={(text) => handleChange('otherParentsOccupation', text)}
                  />
                </View>
              )}
              {errors.parentsOccupations && (
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.parentsOccupations}
                </Text>
              )}
              {formData.parentsOccupations === 'Others' && errors.otherParentsOccupation && (
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.otherParentsOccupation}
                </Text>
              )}
            </FormField>
 
            {/* Siblings Display */}
            {siblingsList.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
                  Added Siblings:
                </Text>
                {siblingsList.map((sibling, index) => (
                  <View
                    key={index}
                    style={{
                      marginBottom: 12,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 6,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      backgroundColor: '#f0f0f0'
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
                        {sibling.gender === 'Brother' ? (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Mars size={16} color="blue" />
                            <Text> Brother ({sibling.type})</Text>
                          </View>
                        ) : (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Venus size={16} color="red" />
                            <Text> Sister ({sibling.type})</Text>
                          </View>
                        )}
                      </Text>
                      <Text>{"Marital Status - "}{sibling.maritalStatus}</Text>
                      <Text>{"Occupation - "}{sibling.occupation}</Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteSibling(index)}>
                      <Trash2 color={'black'} size={18} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
 
            {/* Siblings Information Form */}
            <FormField label="Sibling's Information">
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                  <Text>You have Siblings</Text>
                  <RadioButton
                    value="Yes"
                    status={sibilingData.sibilings === 'Yes' ? 'checked' : 'unchecked'}
                    onPress={() => handlesibilingChange('sibilings', 'Yes')}
                    color="#EC4899"
                  />
                  <Text style={{ color: '#4B5563' }}>Yes</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                  <RadioButton
                    value="No"
                    status={sibilingData.sibilings === 'No' ? 'checked' : 'unchecked'}
                    onPress={() => handlesibilingChange('sibilings', 'No')}
                    color="#EC4899"
                  />
                  <Text style={{ color: '#4B5563' }}>No</Text>
                </View>
              </View>
 
              {sibilingData.sibilings === 'Yes' && (
                <>
                  <View>
                    <Text style={{ fontWeight: '600' }}>Sibling's Gender</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                        <RadioButton
                          value="Brother"
                          status={sibilingData.sibilingsgender === 'Brother' ? 'checked' : 'unchecked'}
                          onPress={() => handlesibilingChange('sibilingsgender', 'Brother')}
                          color="#EC4899"
                        />
                        <Text style={{ color: '#4B5563' }}>Brother</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                        <RadioButton
                          value="Sister"
                          status={sibilingData.sibilingsgender === 'Sister' ? 'checked' : 'unchecked'}
                          onPress={() => handlesibilingChange('sibilingsgender', 'Sister')}
                          color="#EC4899"
                        />
                        <Text style={{ color: '#4B5563' }}>Sister</Text>
                      </View>
                    </View>
                  </View>
 
                  <View>
                    <Text style={{ fontWeight: '600' }}>Sibling's Type</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                        <RadioButton
                          value="Elder Sibling"
                          status={sibilingData.sibilingstype === 'Elder Sibling' ? 'checked' : 'unchecked'}
                          onPress={() => handlesibilingChange('sibilingstype', 'Elder Sibling')}
                          color="#EC4899"
                        />
                        <Text style={{ color: '#4B5563' }}>Elder Sibling</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                        <RadioButton
                          value="Younger Sibling"
                          status={sibilingData.sibilingstype === 'Younger Sibling' ? 'checked' : 'unchecked'}
                          onPress={() => handlesibilingChange('sibilingstype', 'Younger Sibling')}
                          color="#EC4899"
                        />
                        <Text style={{ color: '#4B5563' }}>Younger Sibling</Text>
                      </View>
                    </View>
                  </View>
 
                  <FormField label="Sibling's Marital Status">
                    <CustomPicker
                      selectedValue={sibilingData.SibilingMaritalsts}
                      onValueChange={(itemValue) => handlesibilingChange('SibilingMaritalsts', itemValue)}
                      items={maritalStatus.map(sts => ({ label: sts, value: sts }))}
                    />
                  </FormField>
 
                  <FormField label="Sibling's Occupations">
                    <CustomPicker
                      selectedValue={sibilingData.SibilingsOccupations}
                      onValueChange={(itemValue) => handlesibilingChange('SibilingsOccupations', itemValue)}
                      items={occupation.map(occpation => ({ label: occpation, value: occpation }))}
                    />
                    {sibilingData.SibilingsOccupations === 'Others' && (
                      <View style={{ marginTop: 10 }}>
                        <CustomInput
                          placeholder="Please specify"
                          value={sibilingData.OtherSibilingsOccupations || ''}
                          onChangeText={(text) => handlesibilingChange('OtherSibilingsOccupations', text)}
                        />
                      </View>
                    )}
                  </FormField>
 
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#434649',
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
                    onPress={AddSibilings}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                        Add Sibling
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
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
                {isEditMode ? 'Update' : 'Next'}
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
 