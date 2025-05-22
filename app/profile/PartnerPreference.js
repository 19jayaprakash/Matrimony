import { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Fixed imports - make sure these packages are installed
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';

const AGE_OPTIONS = Array.from({ length: 43 }, (_, i) => (i + 18).toString());

const HEIGHT_OPTIONS_CM = Array.from({ length: 61 }, (_, i) => `${i + 140} cm`);

const HEIGHT_OPTIONS_FT = [];
for (let feet = 4; feet <= 7; feet++) {
  for (let inches = 0; inches <= 11; inches++) {
    if (feet === 7 && inches > 0) break;
    HEIGHT_OPTIONS_FT.push(`${feet}'${inches}"`);
  }
}

const WEIGHT_OPTIONS = Array.from({ length: 81 }, (_, i) => `${i + 40} kg`);

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

const CITIES_BY_STATE = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belgaum", "Gulbarga"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Noida"],
};

const RELIGIONS = [
  "Hinduism", "Islam", "Christianity", "Sikhism", "Buddhism", "Jainism", "Zoroastrianism"
];

const CASTES = {
  "Hinduism": ["Brahmin", "Kshatriya", "Vaishya", "Shudra"],
  "Islam": ["Sunni", "Shia"],
  "Christianity": ["Catholic", "Protestant", "Orthodox"],
  "Sikhism": ["Jatt", "Khatri", "Ramgarhia"],
};

const EDUCATION_LEVELS = [
  "10th", "12th", "Diploma", "Undergraduate (UG)", "Postgraduate (PG)", "PhD"
];

const OCCUPATION_TYPES = [
  "Self Employed", "Salaried", "Business", "Government"
];

const LIFESTYLE_TYPES = [
  "Modern", "Ethnic", "Traditional"
];

const SEX_OPTIONS = [
  "Male", "Female", "Others"
];

const ftToCm = (ftString) => {
  if (!ftString) return null;
  
  const feetMatch = ftString.match(/(\d+)'/);
  const inchesMatch = ftString.match(/'(\d+)"/);
  
  if (!feetMatch) return null;
  
  const feet = parseInt(feetMatch[1]);
  const inches = inchesMatch ? parseInt(inchesMatch[1]) : 0;
  
  return Math.round(feet * 30.48 + inches * 2.54);
};

const cmToFt = (cm) => {
  if (!cm) return null;
  
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  
  if (inches === 12) {
    return `${feet + 1}'0"`;
  }
  
  return `${feet}'${inches}"`;
};

const MatrimonialProfile = () => {

  const [preferences, setPreferences] = useState({
    ageRange: { min: '', max: '' },
    heightRange: { min: '', max: '', unit: 'cm' }, 
    weight: { min: '', max: '' },
    sex: '',
    otherSex: '',
    educationLevel: '',
    occupationType: '',
    location: { state: '', city: '' },
    religion: '',
    caste: '',
    lifestyle: ''
  });
  
  // Enhanced error state with individual field errors
  const [errors, setErrors] = useState({
    ageRange: '',
    heightRange: '',
    weight: '',
    sex: '',
    otherSex: '',
    educationLevel: '',
    occupationType: '',
    state: '',
    city: '',
    religion: '',
    caste: '',
    lifestyle: ''
  });
  
  const [minMaxType, setMinMaxType] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [dropdownItems, setDropdownItems] = useState([]);
  const [dropdownTitle, setDropdownTitle] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const router = useRouter();

  // Validate individual fields
  const validateField = (fieldName, value) => {
    let errorMessage = '';
    
    switch (fieldName) {
      case 'sex':
        if (!value) {
          errorMessage = 'Please select a gender';
        }
        break;
        
      case 'otherSex':
        if (preferences.sex === 'Others' && !value.trim()) {
          errorMessage = 'Please specify your gender';
        }
        break;
        
      case 'educationLevel':
        if (!value) {
          errorMessage = 'Please select your education level';
        }
        break;
        
      case 'occupationType':
        if (!value) {
          errorMessage = 'Please select your occupation type';
        }
        break;
        
      case 'state':
        if (!value) {
          errorMessage = 'Please select a state';
        }
        break;
        
      case 'city':
        if (!value && preferences.location.state) {
          errorMessage = 'Please select a city';
        }
        break;
        
      case 'religion':
        if (!value) {
          errorMessage = 'Please select a religion';
        }
        break;
        
      case 'caste':
        if (!value && preferences.religion) {
          errorMessage = 'Please select a caste';
        }
        break;
        
      case 'lifestyle':
        if (!value) {
          errorMessage = 'Please select a lifestyle preference';
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
    
    return errorMessage === '';
  };

  const validateRange = (field, values) => {
    const { min, max } = values;
    let errorMessage = '';
    
    if (!min && !max) {
      errorMessage = `Please select both minimum and maximum ${field.replace('Range', '')} values`;
    } else if (!min) {
      errorMessage = `Please select minimum ${field.replace('Range', '')} value`;
    } else if (!max) {
      errorMessage = `Please select maximum ${field.replace('Range', '')} value`;
    } else {
      let minVal, maxVal;
      
      if (field === 'heightRange' && preferences.heightRange.unit === 'ft') {
        minVal = ftToCm(min);
        maxVal = ftToCm(max);
      } else {
        minVal = parseInt(min);
        maxVal = parseInt(max);
      }
      
      if (minVal > maxVal) {
        errorMessage = `Minimum ${field.replace('Range', '')} cannot be greater than maximum ${field.replace('Range', '')}`;
      }
    }
    
    setErrors(prev => ({ 
      ...prev, 
      [field]: errorMessage 
    }));
    
    return errorMessage === '';
  };

  const updatePreference = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user makes a selection
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    // Validate field immediately after update
    setTimeout(() => {
      validateField(field, value);
    }, 0);
  };

  const updateNestedPreference = (parent, field, value) => {
    const updatedValues = {
      ...preferences[parent],
      [field]: value
    };
    
    setPreferences(prev => ({
      ...prev,
      [parent]: updatedValues
    }));

    if (parent === 'location' && field === 'state') {
      setPreferences(prev => ({
        ...prev,
        location: {
          ...prev.location,
          state: value,
          city: ''
        }
      }));
      
      // Clear city error when state changes
      setErrors(prev => ({
        ...prev,
        city: ''
      }));
      
      // Validate state
      setTimeout(() => {
        validateField('state', value);
      }, 0);
    } else if (parent === 'location' && field === 'city') {
      // Validate city
      setTimeout(() => {
        validateField('city', value);
      }, 0);
    } else {
      // Clear range error when user makes a selection
      if (errors[parent]) {
        setErrors(prev => ({
          ...prev,
          [parent]: ''
        }));
      }
      
      setTimeout(() => {
        validateRange(parent, updatedValues);
      }, 0);
    }
  };
  
  const toggleHeightUnit = () => {
    setPreferences(prev => ({
      ...prev,
      heightRange: {
        min: '',  
        max: '',  
        unit: prev.heightRange.unit === 'cm' ? 'ft' : 'cm' 
      }
    }));

    setErrors(prev => ({
      ...prev,
      heightRange: ''
    }));
  };

  const openPopup = (type, title, minMaxField = '') => {
    let items = [];
    
    switch(type) {
      case 'sex':
        items = SEX_OPTIONS;
        break;
      case 'education':
        items = EDUCATION_LEVELS;
        break;
      case 'occupation':
        items = OCCUPATION_TYPES;
        break;
      case 'state':
        items = INDIAN_STATES;
        break;
      case 'city':
        items = preferences.location.state && CITIES_BY_STATE[preferences.location.state] 
          ? CITIES_BY_STATE[preferences.location.state] 
          : ["No cities available"];
        break;
      case 'religion':
        items = RELIGIONS;
        break;
      case 'caste':
        items = preferences.religion && CASTES[preferences.religion] 
          ? CASTES[preferences.religion] 
          : [];
        break;
      case 'lifestyle':
        items = LIFESTYLE_TYPES;
        break;
      case 'age':
        if (minMaxField === 'min' && preferences.ageRange.max) {
          items = AGE_OPTIONS.filter(age => parseInt(age) <= parseInt(preferences.ageRange.max));
        } else if (minMaxField === 'max' && preferences.ageRange.min) {
          items = AGE_OPTIONS.filter(age => parseInt(age) >= parseInt(preferences.ageRange.min));
        } else {
          items = AGE_OPTIONS;
        }
        break;
      case 'height':
        const heightOptions = preferences.heightRange.unit === 'cm' ? HEIGHT_OPTIONS_CM : HEIGHT_OPTIONS_FT;
        
        if (minMaxField === 'min' && preferences.heightRange.max) {
          if (preferences.heightRange.unit === 'cm') {
            const maxHeight = parseInt(preferences.heightRange.max);
            items = heightOptions.filter(h => parseInt(h.split(' ')[0]) <= maxHeight);
          } else {
            const maxHeightCm = ftToCm(preferences.heightRange.max);
            items = heightOptions.filter(h => ftToCm(h) <= maxHeightCm);
          }
        } else if (minMaxField === 'max' && preferences.heightRange.min) {
          if (preferences.heightRange.unit === 'cm') {
            const minHeight = parseInt(preferences.heightRange.min);
            items = heightOptions.filter(h => parseInt(h.split(' ')[0]) >= minHeight);
          } else {
            const minHeightCm = ftToCm(preferences.heightRange.min);
            items = heightOptions.filter(h => ftToCm(h) >= minHeightCm);
          }
        } else {
          items = heightOptions;
        }
        break;
      case 'weight':
        if (minMaxField === 'min' && preferences.weight.max) {
          const maxWeight = parseInt(preferences.weight.max);
          items = WEIGHT_OPTIONS.filter(w => parseInt(w.split(' ')[0]) <= maxWeight);
        } else if (minMaxField === 'max' && preferences.weight.min) {
          const minWeight = parseInt(preferences.weight.min);
          items = WEIGHT_OPTIONS.filter(w => parseInt(w.split(' ')[0]) >= minWeight);
        } else {
          items = WEIGHT_OPTIONS;
        }
        break;
      default:
        items = [];
    }
    
    setActiveDropdown(type);
    setMinMaxType(minMaxField);
    setDropdownItems(items);
    setDropdownTitle(title);
    setPopupVisible(true);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const closePopup = (callback) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setPopupVisible(false);
      if (callback) callback();
    });
  };

  const handleSelect = (value) => {
    closePopup(() => {
      switch(activeDropdown) {
        case 'sex':
          updatePreference('sex', value);
          break;
        case 'education':
          updatePreference('educationLevel', value);
          break;
        case 'occupation':
          updatePreference('occupationType', value);
          break;
        case 'state':
          setPreferences(prev => ({
            ...prev,
            location: {
              state: value,
              city: ''
            }
          }));
          // Clear errors
          setErrors(prev => ({
            ...prev,
            state: '',
            city: ''
          }));
          // Validate state
          setTimeout(() => {
            validateField('state', value);
          }, 0);
          break;
        case 'city':
          if (value !== "No cities available") {
            setPreferences(prev => ({
              ...prev,
              location: {
                ...prev.location,
                city: value
              }
            }));
            // Clear city error
            setErrors(prev => ({
              ...prev,
              city: ''
            }));
            // Validate city
            setTimeout(() => {
              validateField('city', value);
            }, 0);
          }
          break;
        case 'religion':
          setPreferences(prev => ({
            ...prev,
            religion: value,
            caste: ''
          }));
          // Clear errors
          setErrors(prev => ({
            ...prev,
            religion: '',
            caste: ''
          }));
          // Validate religion
          setTimeout(() => {
            validateField('religion', value);
          }, 0);
          break;
        case 'caste':
          updatePreference('caste', value);
          break;
        case 'lifestyle':
          updatePreference('lifestyle', value);
          break;
        case 'age':
          updateNestedPreference('ageRange', minMaxType, value);
          break;
        case 'height':
          if (preferences.heightRange.unit === 'cm') {
            const heightValue = value.split(' ')[0];
            updateNestedPreference('heightRange', minMaxType, heightValue);
          } else {
            updateNestedPreference('heightRange', minMaxType, value);
          }
          break;
        case 'weight':
          const weightValue = value.split(' ')[0];
          updateNestedPreference('weight', minMaxType, weightValue);
          break;
      }
    });
  };

  const validateAllFields = () => {
    let isValid = true;
    const newErrors = {};

    // Validate all individual fields
    const fieldsToValidate = [
      'sex', 'educationLevel', 'occupationType', 'religion', 'lifestyle'
    ];

    fieldsToValidate.forEach(field => {
      const fieldValue = preferences[field];
      if (!validateField(field, fieldValue)) {
        isValid = false;
      }
    });

    // Validate location fields
    if (!validateField('state', preferences.location.state)) {
      isValid = false;
    }
    if (!validateField('city', preferences.location.city)) {
      isValid = false;
    }

    // Validate otherSex if sex is Others
    if (!validateField('otherSex', preferences.otherSex)) {
      isValid = false;
    }

    // Validate caste if religion is selected
    if (!validateField('caste', preferences.caste)) {
      isValid = false;
    }

    // Validate ranges
    const rangeValidations = [
      validateRange('ageRange', preferences.ageRange),
      validateRange('heightRange', preferences.heightRange),
      validateRange('weight', preferences.weight)
    ];
    
    if (!rangeValidations.every(valid => valid)) {
      isValid = false;
    }

    return isValid;
  };

  const handleSavePreferences = async () => {
    if (validateAllFields()) {
      const displayPreferences = { ...preferences };

      if (preferences.heightRange.unit === 'cm') {
        if (displayPreferences.heightRange.min) {
          displayPreferences.heightRange.min += ' cm';
        }
        if (displayPreferences.heightRange.max) {
          displayPreferences.heightRange.max += ' cm';
        }
      }

      if (displayPreferences.weight.min) {
        displayPreferences.weight.min += ' kg';
      }
      if (displayPreferences.weight.max) {
        displayPreferences.weight.max += ' kg';
      }

      const payloadData = {
        minAge: preferences.ageRange.min,
        maxAge: preferences.ageRange.max,
        minHeight: preferences.heightRange.min,
        maxHeight: preferences.heightRange.max,
        heightUnit: preferences.heightRange.unit,
        minWeight: preferences.weight.min,
        maxWeight: preferences.weight.max,
        weightUnit: preferences.weight.unit?.split(" ")[1] || "kg",
        caste: preferences.caste,
        religion: preferences.religion,
        lifestyle: preferences.lifestyle,
        state: preferences.location.state,
        city: preferences.location.city,
        sex: preferences.sex,
        otherSex: preferences.otherSex,
        educationLevel: preferences.educationLevel,
        occupationType: preferences.occupationType,
      };

      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          Alert.alert('Error', 'User not logged in. Token not found.');
          return;
        }

        const res = await axios.post(
          'http://stu.globalknowledgetech.com:5003/partnerpreference/create-preference',
          payloadData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log('Preference save success:', res.data);
        router.push('/navigation/MainTabs');
        Alert.alert('Success', 'Partner preferences saved successfully!');
      } catch (err) {
        console.log('Preference save failed:', err);
        Alert.alert('Error', 'Failed to save preferences.');
      }

      console.log('Saving preferences:', displayPreferences);
      
    } else {
      // Show specific validation errors
      const errorMessages = [];
      Object.keys(errors).forEach(key => {
        if (errors[key]) {
          const fieldLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          errorMessages.push(`${fieldLabel}: ${errors[key]}`);
        }
      });

      Alert.alert(
        'Validation Error',
        errorMessages.length > 0 
          ? `Please fix the following issues:\n\n${errorMessages.join('\n')}`
          : 'Please fill in all required fields.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderError = (errorText) => {
    if (!errorText) return null;
    
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={16} color="#ef4444" />
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    );
  };

  const formatHeightDisplay = (value, unit, placeholder) => {
    if (!value) return placeholder;
    return unit === 'cm' ? `${value} cm` : value;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
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
        
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.heading}>Partner Preferences</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Basic Details</Text>
            
            <Text style={styles.label}>Age Range (years) *</Text>
            <View style={styles.rangeContainer}>
              <TouchableOpacity 
                style={[
                  styles.dropdownSelector, 
                  styles.halfInput,
                  errors.ageRange ? styles.inputError : null
                ]}
                onPress={() => openPopup('age', 'Select Minimum Age', 'min')}
              >
                <Ionicons name="calendar-outline" size={20} color={errors.ageRange ? "#ef4444" : "#db2777"} />
                <Text style={[
                  styles.dropdownText, 
                  !preferences.ageRange.min && styles.dropdownPlaceholder
                ]}>
                  {preferences.ageRange.min || "Min Age"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </TouchableOpacity>
              
              <Text style={styles.rangeText}>to</Text>
              
              <TouchableOpacity 
                style={[
                  styles.dropdownSelector, 
                  styles.halfInput,
                  errors.ageRange ? styles.inputError : null
                ]}
                onPress={() => openPopup('age', 'Select Maximum Age', 'max')}
              >
                <Ionicons name="calendar-outline" size={20} color={errors.ageRange ? "#ef4444" : "#db2777"} />
                <Text style={[
                  styles.dropdownText, 
                  !preferences.ageRange.max && styles.dropdownPlaceholder
                ]}>
                  {preferences.ageRange.max || "Max Age"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
            {renderError(errors.ageRange)}

            <View style={styles.labelRow}>
              <Text style={styles.label}>Height Range *</Text>
              <TouchableOpacity 
                style={styles.unitToggle}
                onPress={toggleHeightUnit}
              >
                <Text style={styles.unitToggleText}>
                  {preferences.heightRange.unit === 'cm' ? 'Switch to ft/in' : 'Switch to cm'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rangeContainer}>
              <TouchableOpacity 
                style={[
                  styles.dropdownSelector, 
                  styles.halfInput,
                  errors.heightRange ? styles.inputError : null
                ]}
                onPress={() => openPopup('height', `Select Minimum Height (${preferences.heightRange.unit})`, 'min')}
              >
                <Ionicons name="resize-outline" size={20} color={errors.heightRange ? "#ef4444" : "#db2777"} />
                <Text style={[
                  styles.dropdownText, 
                  !preferences.heightRange.min && styles.dropdownPlaceholder
                ]}>
                  {formatHeightDisplay(
                    preferences.heightRange.min, 
                    preferences.heightRange.unit, 
                    "Min Height"
                  )}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </TouchableOpacity>
              
              <Text style={styles.rangeText}>to</Text>
              
              <TouchableOpacity 
                style={[
                  styles.dropdownSelector, 
                  styles.halfInput,
                  errors.heightRange ? styles.inputError : null
                ]}
                onPress={() => openPopup('height', `Select Maximum Height (${preferences.heightRange.unit})`, 'max')}
              >
                <Ionicons name="resize-outline" size={20} color={errors.heightRange ? "#ef4444" : "#db2777"} />
                <Text style={[
                  styles.dropdownText, 
                  !preferences.heightRange.max && styles.dropdownPlaceholder
                ]}>
                  {formatHeightDisplay(
                    preferences.heightRange.max, 
                    preferences.heightRange.unit, 
                    "Max Height"
                  )}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
            {renderError(errors.heightRange)}

            <Text style={styles.label}>Weight Range (kg) *</Text>
            <View style={styles.rangeContainer}>
              <TouchableOpacity 
                style={[
                  styles.dropdownSelector, 
                  styles.halfInput,
                  errors.weight ? styles.inputError : null
                ]}
                onPress={() => openPopup('weight', 'Select Minimum Weight', 'min')}
              >
                <Ionicons name="fitness-outline" size={20} color={errors.weight ? "#ef4444" : "#db2777"} />
                <Text style={[
                  styles.dropdownText, 
                  !preferences.weight.min && styles.dropdownPlaceholder
                ]}>
                  {preferences.weight.min ? `${preferences.weight.min} kg` : "Min Weight"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </TouchableOpacity>
              
              <Text style={styles.rangeText}>to</Text>
              
              <TouchableOpacity 
                style={[
                  styles.dropdownSelector, 
                  styles.halfInput,
                  errors.weight ? styles.inputError : null
                ]}
                onPress={() => openPopup('weight', 'Select Maximum Weight', 'max')}
              >
                <Ionicons name="fitness-outline" size={20} color={errors.weight ? "#ef4444" : "#db2777"} />
                <Text style={[
                  styles.dropdownText, 
                  !preferences.weight.max && styles.dropdownPlaceholder
                ]}>
                  {preferences.weight.max ? `${preferences.weight.max} kg` : "Max Weight"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
            {renderError(errors.weight)}

            <Text style={styles.label}>Sex *</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector,
                errors.sex ? styles.inputError : null
              ]}
              onPress={() => openPopup('sex', 'Select Sex')}
            >
              <Ionicons name="person-outline" size={20} color={errors.sex ? "#ef4444" : "#db2777"} />
              <Text style={[
                styles.dropdownText, 
                !preferences.sex && styles.dropdownPlaceholder
              ]}>
                {preferences.sex || "Select Sex"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
            {renderError(errors.sex)}
            
            {preferences.sex === 'Others' && (
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Please specify"
                  style={[
                    styles.input,
                    errors.otherSex ? styles.inputError : null
                  ]}
                  value={preferences.otherSex}
                  onChangeText={(value) => updatePreference('otherSex', value)}
                />
              </View>
            )}
            {preferences.sex === 'Others' && renderError(errors.otherSex)}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Education & Career</Text>
            
            <Text style={styles.label}>Education Level *</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector,
                errors.educationLevel ? styles.inputError : null
              ]}
              onPress={() => openPopup('education', 'Select Education Level')}
            >
              <Ionicons name="school-outline" size={20} color={errors.educationLevel ? "#ef4444" : "#db2777"} />
              <Text style={[
                styles.dropdownText, 
                !preferences.educationLevel && styles.dropdownPlaceholder
              ]}>
                {preferences.educationLevel || "Select Education Level"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
            {renderError(errors.educationLevel)}

            <Text style={styles.label}>Occupation Type *</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector,
                errors.occupationType ? styles.inputError : null
              ]}
              onPress={() => openPopup('occupation', 'Select Occupation Type')}
            >
              <Ionicons name="briefcase-outline" size={20} color={errors.occupationType ? "#ef4444" : "#db2777"} />
              <Text style={[
                styles.dropdownText, 
                !preferences.occupationType && styles.dropdownPlaceholder
              ]}>
                {preferences.occupationType || "Select Occupation Type"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
            {renderError(errors.occupationType)}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Location & Background</Text>
            
            <Text style={styles.label}>State *</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector,
                errors.state ? styles.inputError : null
              ]}
              onPress={() => openPopup('state', 'Select State')}
            >
              <Ionicons name="location-outline" size={20} color={errors.state ? "#ef4444" : "#db2777"} />
              <Text style={[
                styles.dropdownText, 
                !preferences.location.state && styles.dropdownPlaceholder
              ]}>
                {preferences.location.state || "Select State"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
            {renderError(errors.state)}

            <Text style={styles.label}>City *</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector,
                (!preferences.location.state && styles.disabledDropdown) || 
                (errors.city && styles.inputError)
              ]}
              onPress={() => preferences.location.state ? openPopup('city', 'Select City') : null}
              disabled={!preferences.location.state}
            >
              <Ionicons name="business-outline" size={20} color={
                !preferences.location.state ? "#94a3b8" : 
                errors.city ? "#ef4444" : "#db2777"
              } />
              <Text style={[
                styles.dropdownText, 
                !preferences.location.city && styles.dropdownPlaceholder,
                !preferences.location.state && styles.disabledText
              ]}>
                {preferences.location.city || (preferences.location.state ? "Select City" : "Select State First")}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={preferences.location.state ? "#64748b" : "#94a3b8"} />
            </TouchableOpacity>
            {renderError(errors.city)}

            <Text style={styles.label}>Religion *</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector,
                errors.religion ? styles.inputError : null
              ]}
              onPress={() => openPopup('religion', 'Select Religion')}
            >
              <Ionicons name="planet-outline" size={20} color={errors.religion ? "#ef4444" : "#db2777"} />
              <Text style={[
                styles.dropdownText, 
                !preferences.religion && styles.dropdownPlaceholder
              ]}>
                {preferences.religion || "Select Religion"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
            {renderError(errors.religion)}

            <Text style={styles.label}>Caste {preferences.religion && '*'}</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector,
                (!preferences.religion && styles.disabledDropdown) ||
                (errors.caste && styles.inputError)
              ]}
              onPress={() => preferences.religion ? openPopup('caste', 'Select Caste') : null}
              disabled={!preferences.religion}
            >
              <Ionicons name="people-outline" size={20} color={
                !preferences.religion ? "#94a3b8" :
                errors.caste ? "#ef4444" : "#db2777"
              } />
              <Text style={[
                styles.dropdownText, 
                !preferences.caste && styles.dropdownPlaceholder,
                !preferences.religion && styles.disabledText
              ]}>
                {preferences.caste || (preferences.religion ? "Select Caste" : "Select Religion First")}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={preferences.religion ? "#64748b" : "#94a3b8"} />
            </TouchableOpacity>
            {renderError(errors.caste)}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Lifestyle</Text>
            
            <Text style={styles.label}>Lifestyle Expectations *</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector,
                errors.lifestyle ? styles.inputError : null
              ]}
              onPress={() => openPopup('lifestyle', 'Select Lifestyle')}
            >
              <Ionicons name="restaurant-outline" size={20} color={errors.lifestyle ? "#ef4444" : "#db2777"} />
              <Text style={[
                styles.dropdownText, 
                !preferences.lifestyle && styles.dropdownPlaceholder
              ]}>
                {preferences.lifestyle || "Select Lifestyle"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
            {renderError(errors.lifestyle)}
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSavePreferences}
            activeOpacity={0.8}
          >
            <Ionicons name="save-outline" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Save Preferences</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Your preferences help us find your perfect match
            </Text>
            <Text style={styles.requiredText}>
              * Required fields
            </Text>
          </View>
        </ScrollView>

        <Modal
          transparent={true}
          visible={popupVisible}
          animationType="none" 
          onRequestClose={() => closePopup()}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => closePopup()}
            />
            <Animated.View 
              style={[
                styles.popupCard,
                { 
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }] 
                }
              ]}
            >
              <View style={styles.popupHeader}>
                <Text style={styles.popupTitle}>{dropdownTitle}</Text>
                <TouchableOpacity onPress={() => closePopup()}>
                  <Ionicons name="close" size={24} color="#334155" />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={dropdownItems}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.popupItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.popupItemText}>{item}</Text>
                    {(
                      (activeDropdown === 'sex' && preferences.sex === item) ||
                      (activeDropdown === 'education' && preferences.educationLevel === item) ||
                      (activeDropdown === 'occupation' && preferences.occupationType === item) ||
                      (activeDropdown === 'state' && preferences.location.state === item) ||
                      (activeDropdown === 'city' && preferences.location.city === item) ||
                      (activeDropdown === 'religion' && preferences.religion === item) ||
                      (activeDropdown === 'caste' && preferences.caste === item) ||
                      (activeDropdown === 'lifestyle' && preferences.lifestyle === item) ||
                      (activeDropdown === 'age' && minMaxType === 'min' && preferences.ageRange.min === item) ||
                      (activeDropdown === 'age' && minMaxType === 'max' && preferences.ageRange.max === item) ||
                      (activeDropdown === 'height' && minMaxType === 'min' && preferences.heightRange.min === item.split(' ')[0]) ||
                      (activeDropdown === 'height' && minMaxType === 'max' && preferences.heightRange.max === item.split(' ')[0]) ||
                      (activeDropdown === 'weight' && minMaxType === 'min' && preferences.weight.min === item.split(' ')[0]) ||
                      (activeDropdown === 'weight' && minMaxType === 'max' && preferences.weight.max === item.split(' ')[0])
                    ) && (
                      <Ionicons name="checkmark" size={20} color="#db2777" />
                    )}
                  </TouchableOpacity>
                )}
                style={styles.popupList}
                showsVerticalScrollIndicator={false}
              />
              
              <TouchableOpacity 
                style={styles.popupCloseButton}
                onPress={() => closePopup()}
              >
                <Text style={styles.popupCloseText}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf2f8', 
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#db2777',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  unitToggle: {
    padding: 4,
  },
  unitToggleText: {
    fontSize: 12,
    color: '#db2777',
    fontWeight: '500',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 6,
    marginTop: 4,
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 4,
  },
  halfInput: {
    flex: 1,
  },
  rangeText: {
    marginHorizontal: 10,
    fontSize: 15,
    color: '#64748b',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#334155',
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 6,
    marginTop: 4,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: '#334155',
    marginLeft: 8,
  },
  dropdownPlaceholder: {
    color: '#94a3b8',
  },
  disabledDropdown: {
    backgroundColor: '#f1f5f9',
    opacity: 0.7,
  },
  disabledText: {
    color: '#94a3b8',
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 1.5,
    backgroundColor: '#fef2f2',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  button: {
    backgroundColor: '#db2777',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#db2777',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 8,
  },
  requiredText: {
    fontSize: 12,
    color: '#ef4444',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupCard: {
    width: width * 0.85,
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    maxHeight: height * 0.7, 
  },
  popupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  popupList: {
    maxHeight: height * 0.5, 
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  popupItemText: {
    fontSize: 16,
    color: '#334155',
  },
  popupCloseButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  popupCloseText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  }
});

export default MatrimonialProfile;