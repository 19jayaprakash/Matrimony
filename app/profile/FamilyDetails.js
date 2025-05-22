//Family Background page
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import {
  ChevronsRight,
  Home,
  Mars,
  Trash2,
  Venus
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
  const [formData, setFormData] = useState({});
    const [sibilingData, setsibilingData] = useState({});
const [siblingsList, setSiblingsList] = useState([]);
const [errors, setErrors] = useState({});
const [siblingErrors, setSiblingErrors] = useState({});


const validateForm = () => {
  const newErrors = {};

  if (!formData.FamilyType) newErrors.FamilyType = 'FamilyType is required';
  if (!formData.FamilyValues) newErrors.FamilyValues = 'Familyvalues are required';
if (!formData.ParentsOccupations) {
  newErrors.ParentsOccupations = "Parent's occupation is required";
} else if (formData.ParentsOccupations === 'Others' && !formData.OtherParentsOccupation) {
  newErrors.OtherParentsOccupation = 'Please specify the occupation';
}


  setErrors(newErrors);
  console.log(newErrors);
  
  return Object.keys(newErrors).length === 0;
  
};

  // Handle form field changes
  const handleChange = (field, value) => {
  setFormData(prevFormData => ({
    ...prevFormData,
    [field]: value,
  }));
  };
   const handlesibilingChange = (field, value) => {
  setsibilingData(prevFormData => ({
    ...prevFormData,
    [field]: value,
  }));
  };
 
 
 
  // Form submission handler
  const handleSubmit = async  () => {
      if (!validateForm()) {
    console.log('Validation failed');
    return;
  }

    formData.Sibilings=siblingsList
    console.log('Profile created:', formData);
    

    try {
            const token = await AsyncStorage.getItem('token');
      
    const response = await fetch('http://stu.globalknowledgetech.com:5003/family/family-details', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
              Authorization: `Bearer ${token}`

        // Note: DON'T set Content-Type manually when using FormData
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', error);
  }

    router.push('/profile/UserInterest')
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
 
  handlesibilingChange('sibilingsgender', '');
  handlesibilingChange('sibilingstype', '');
  handlesibilingChange('SibilingMaritalsts', '');
  handlesibilingChange('SibilingsOccupations', '');
    handlesibilingChange('sibilings', '');
}else{
  console.log("Sibling data is empty");
  
    return;

}
};
 
const deleteSibling = (indexToDelete) => {
  setSiblingsList((prevList) =>
    prevList.filter((_, index) => index !== indexToDelete)
  );
};
 

const FamilyType=["Nuclear Family","Joint Family","Extended Family","Single-Parent Family","Blended/Step Family","Adoptive Family"]
const FamilyValues=["Traditional","Moderate","Liberal","Religious/Spiritual","Progressive","Conservative","Mix of Traditional and Modern"]
const Occupations=["Business/Entrepreneur","Government Service",
"Private Sector Employee",
"Doctor/Medical Professional",
"Engineer",
"Teacher/Professor",
"Lawyer/Legal Professional",
"Finance/Banking Professional",
"Armed Forces/Defense",
"Retired",
"Homemaker",
"Farmer/Agriculture",
"Self-employed Professional",
"Artist/Creative Professional",
"Technology/IT Professional",
"Consultant",
"Social Worker/NGO",
"Deceased",
"Others" ]  
 
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
         Create Profile
        </Text>
        <Text style={{
          color: 'white',
          textAlign: 'center',
          marginTop: 6,
          opacity: 0.9,
          fontSize:18
        }}>
          Find your perfect match by completing your profile
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
                selectedValue={formData.FamilyType}
                onValueChange={(itemValue) => handleChange('FamilyType', itemValue)}
                 items={FamilyType.map(Type => ({ label: Type, value: Type }))}
              />
                {errors.FamilyType && <Text style={{ color: 'red',marginTop:5 }}>{errors.FamilyType}</Text>}


            </FormField>
 
            <FormField label="Family Values">
              <CustomPicker
                selectedValue={formData.FamilyValues}
                onValueChange={(itemValue) => handleChange('FamilyValues', itemValue)}
                              items={FamilyValues.map(familyval => ({ label: familyval, value: familyval }))}
 
              />
                              {errors.FamilyValues && <Text style={{ color: 'red',marginTop:5 }}>{errors.FamilyValues}</Text>}

            </FormField>
 
            <FormField label="Parent's Occupations">
              <CustomPicker
                selectedValue={formData.ParentsOccupations}
                onValueChange={(itemValue) => handleChange('ParentsOccupations', itemValue)}
items={Occupations.map(occpation => ({ label: occpation, value: occpation }))}
 
              />
             
               {formData.ParentsOccupations === 'Others' && (
    <View style={{ marginTop: 10 }}>
    <CustomInput
      placeholder="Please specify"
      value={formData.OtherParentsOccupation || ''}
      onChangeText={(text) => handleChange('OtherParentsOccupation', text)}
    />
  </View>
  )}
 {errors.ParentsOccupations && (
    <Text style={{ color: 'red', marginTop: 5 }}>
      {errors.ParentsOccupations}
    </Text>
  )}
  {formData.ParentsOccupations === 'Others' && errors.OtherParentsOccupation && (
    <Text style={{ color: 'red', marginTop: 5 }}>
      {errors.OtherParentsOccupation}
    </Text>
  )}
            </FormField>
{siblingsList.length > 0 && (
  <View style={{ marginTop: 20 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
      Added Siblings:
    </Text>
    {siblingsList.map((sibling, index) => (
      <View
        key={index}
        className='bg-gray-300'
        style={{
          marginBottom: 12,
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'semibold', marginBottom: 4 }}>
 {sibling.gender === 'Brother' ? (
    <Text className='flex-1 flex-row gap-2 items-center font-semibold '>
      <Mars size={16} color="blue" />
      <Text> Brother</Text>
 
      <Text>
         (
        {sibling.type}
 
        )
                </Text>
 
    </Text>
  ) : (
    <Text className='flex-1 flex-row gap-2 items-center font-semibold '>
      <Venus size={16} color="red" />
      <Text> Sister</Text>
       <Text>
         (
        {sibling.type}
 
        )
                </Text>
    </Text>
  )}          </Text>
          <Text>{"Marital Status - "}{sibling.maritalStatus}</Text>
          <Text>{"Occupation - "}{sibling.occupation}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteSibling(index)}>
          <Text style={{fontSize: 18 }}><Trash2 color={'black'}/></Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
)}
 
 
            <FormField label="Sibiling's Information">
             <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                  <Text>You have Sibilings</Text>
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
                                          <Text className='font-semibold'>Sibiling's Gender</Text>
 
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
<Text className='font-semibold'>Silbiling's Type</Text>
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
items={[
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Divorced", value: "Divorced" },
    { label: "Widowed", value: "Widowed" },
]}
 
              />
              </FormField>
               <FormField label="Sibiling's Occupations">
              <CustomPicker
                selectedValue={sibilingData.SibilingsOccupations}
                onValueChange={(itemValue) => handlesibilingChange('SibilingsOccupations', itemValue)}
items={Occupations.map(occpation => ({ label: occpation, value: occpation }))}
 
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
                Add
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
 