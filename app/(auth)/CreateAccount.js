import axios from "axios";
import { useRouter } from "expo-router";
import { ChevronDown, Eye, EyeOff, Lock, Mail, Phone, User, X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const scrollToField = (scrollViewRef, fieldKey) => {
  const fieldIndexMap = {
    applyingFor: 0,
    gender: 1,
    customGender: 2, 
    firstName: 3,
    lastName: 3, // Same index as firstName since they're on the same line
    email: 4,
    number: 5,
    password: 6,
    confirmPassword: 7,
  };
  const offset = fieldIndexMap[fieldKey] * 100;
  scrollViewRef.current?.scrollTo({ y: offset, animated: true });
};

const useFieldAnimation = (index) => {
  const delay = 100 * index;
  const fieldFade = useRef(new Animated.Value(0)).current;
  const fieldSlide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fieldFade, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(fieldSlide, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return {
    opacity: fieldFade,
    transform: [{ translateY: fieldSlide }],
  };
};

const CustomDropdownModal = ({ visible, onClose, items, onSelect, currentValue }) => {
  return (
    <Modal 
      visible={visible} 
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Option</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#374151" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.optionsList}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.optionItem,
                  currentValue === item.value && styles.selectedOption
                ]}
                onPress={() => {
                  onSelect(item.value);
                  onClose();
                }}
              >
                <Text 
                  style={[
                    styles.optionText,
                    currentValue === item.value && styles.selectedOptionText
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const Field = ({ label, error, icon, children, animationStyle, isFocused }) => {
  return (
    <Animated.View style={[animationStyle, styles.fieldContainer]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          { borderColor: isFocused ? "#db2777" : "#d1d5db" },
        ]}
      >
        {icon}
        {children}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </Animated.View>
  );
};

// Enhanced PasswordField component with visibility toggle
const PasswordField = ({ label, error, placeholder, value, onChangeText, onFocus, onBlur, animationStyle, isFocused }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Animated.View style={[animationStyle, styles.fieldContainer]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          { borderColor: isFocused ? "#db2777" : "#d1d5db" },
        ]}
      >
        <Lock size={20} color={isFocused ? "#db2777" : "#9ca3af"} />
        <TextInput
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            styles.input,
            { color: isFocused ? "#db2777" : "#374151" },
          ]}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {isPasswordVisible ? (
            <EyeOff size={20} color={isFocused ? "#db2777" : "#9ca3af"} />
          ) : (
            <Eye size={20} color={isFocused ? "#db2777" : "#9ca3af"} />
          )}
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </Animated.View>
  );
};

// New component for the name fields that are displayed in a single row
const NameFields = ({ firstNameProps, lastNameProps, animationStyle }) => {
  return (
    <Animated.View style={[animationStyle, styles.fieldContainer]}>
      <View style={styles.nameFieldsRow}>
        <View style={styles.nameFieldColumn}>
          <Text style={styles.label}>{firstNameProps.label}</Text>
          <View
            style={[
              styles.inputWrapper,
              { borderColor: firstNameProps.isFocused ? "#db2777" : "#d1d5db" },
            ]}
          >
            {firstNameProps.icon}
            <TextInput
              placeholder={firstNameProps.placeholder}
              value={firstNameProps.value}
              onChangeText={firstNameProps.onChangeText}
              onFocus={firstNameProps.onFocus}
              onBlur={firstNameProps.onBlur}
              style={[
                styles.input,
                { color: firstNameProps.isFocused ? "#db2777" : "#374151" },
              ]}
              autoCapitalize="words"
            />
          </View>
          {firstNameProps.error ? <Text style={styles.errorText}>{firstNameProps.error}</Text> : null}
        </View>
        
        <View style={[styles.nameFieldColumn, { marginLeft: 8 }]}>
          <Text style={styles.label}>{lastNameProps.label}</Text>
          <View
            style={[
              styles.inputWrapper,
              { borderColor: lastNameProps.isFocused ? "#db2777" : "#d1d5db" },
            ]}
          >
            {lastNameProps.icon}
            <TextInput
              placeholder={lastNameProps.placeholder}
              value={lastNameProps.value}
              onChangeText={lastNameProps.onChangeText}
              onFocus={lastNameProps.onFocus}
              onBlur={lastNameProps.onBlur}
              style={[
                styles.input,
                { color: lastNameProps.isFocused ? "#db2777" : "#374151" },
              ]}
              autoCapitalize="words"
            />
          </View>
          {lastNameProps.error ? <Text style={styles.errorText}>{lastNameProps.error}</Text> : null}
        </View>
      </View>
    </Animated.View>
  );
};

const SelectField = ({ label, error, value, onValueChange, items, placeholder, animationStyle, isFocused, onFocus, onBlur }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedItem = items.find(item => item.value === value);
  const displayText = selectedItem ? selectedItem.label : placeholder?.label || "Select an option";
  
  const openModal = () => {
    onFocus(); 
    setModalVisible(true);
  };
  
  const closeModal = () => {
    onBlur();
    setModalVisible(false);
  };
  
  return (
    <Animated.View style={[animationStyle, styles.fieldContainer]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.selectWrapper,
          { borderColor: isFocused ? "#db2777" : "#d1d5db" },
        ]}
        onPress={openModal}
      >
        <View style={styles.selectInner}>
          <Text style={[
            styles.selectText,
            !selectedItem && styles.placeholderText
          ]}>
            {displayText}
          </Text>
          <ChevronDown size={20} color={isFocused ? "#db2777" : "#9ca3af"} />
        </View>
      </TouchableOpacity>
      
      <CustomDropdownModal
        visible={modalVisible}
        onClose={closeModal}
        items={items}
        onSelect={onValueChange}
        currentValue={value}
      />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </Animated.View>
  );
};

export default function CreateAccount() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const [formData, setFormData] = useState({
    applyingFor: "",
    gender: "",
    customGender: "", 
    firstName: "", 
    lastName: "", 
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const applyingForAnimation = useFieldAnimation(0);
  const genderAnimation = useFieldAnimation(1);
  const customGenderAnimation = useFieldAnimation(2); 
  const nameAnimation = useFieldAnimation(3);
  const emailAnimation = useFieldAnimation(4);
  const numberAnimation = useFieldAnimation(5);
  const passwordAnimation = useFieldAnimation(6);
  const confirmPasswordAnimation = useFieldAnimation(7);

  const goToLogin = () => {
    router.push('/');
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    
    if (field === 'applyingFor' && !['myself', 'friend'].includes(value)) {
      setFormData(prev => ({ ...prev, gender: '', customGender: '' }));
    }
    
    if (field === 'gender' && value !== 'other') {
      setFormData(prev => ({ ...prev, customGender: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.applyingFor) newErrors.applyingFor = "This field is required";
    
    if (['myself', 'friend'].includes(formData.applyingFor)) {
      if (!formData.gender) {
        newErrors.gender = "Gender is required";
      } else if (formData.gender === 'other' && !formData.customGender.trim()) {
        newErrors.customGender = "Please specify your gender";
      }
    }
    
    // Validate firstName and lastName separately
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.phoneNo.trim()) newErrors.phoneNo = "Mobile number is required.";
    else if (formData.phoneNo.length !== 10)
      newErrors.phoneNo = "Mobile number must be 10 digits.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

const handleSubmit = async () => {
  const validationErrors = validateForm();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    const firstErrorField = Object.keys(validationErrors)[0];
    scrollToField(scrollViewRef, firstErrorField);
    return;
  }

  setIsSubmitting(true);

  const finalFormData = { ...formData };
  finalFormData.actualGender =
    formData.gender === 'other' && formData.customGender
      ? formData.customGender
      : formData.gender;

      let payloadData ={
        firstName:finalFormData.firstName,
        lastName:finalFormData.lastName,
        email:finalFormData.email,
        phoneNo:finalFormData.phoneNo,
        password:finalFormData.password,

      }
  try {
    const res = await axios.post(
      "http://stu.globalknowledgetech.com:5003/auth/register",
      payloadData
    );

    if (res.status === 201) {
      console.log("Registration successful:", res.data);
      router.push("/");
    }
  } catch (err) {
    console.error("Registration error:", err);
  } finally {
    setIsSubmitting(false);
    console.log("Form Data Submitted:", finalFormData);
  }
};

  const getFieldIcon = (fieldName) => {
    const color = focusedField === fieldName ? "#db2777" : "#9ca3af";
    switch (fieldName) {
      case "firstName":
      case "lastName":
        return <User size={20} color={color} />;
      case "email":
        return <Mail size={20} color={color} />;
      case "phoneNo":
        return <Phone size={20} color={color} />;
      case "customGender":
        return <User size={20} color={color} />;
      default:
        return null;
    }
  };

  const applyingForOptions = [
    { label: "Myself", value: "myself" },
    { label: "Friend", value: "friend" },
    { label: "Son", value: "son" },
    { label: "Daughter", value: "daughter" },
    { label: "Brother", value: "brother" },
    { label: "Sister", value: "sister" },
  ];

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" :"height"}
      style={styles.root}
    >
      <SafeAreaView>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/wedding.jpg")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <View style={styles.headingWrapper}>
              <Text style={styles.title}>Register</Text>
              <Text style={styles.subtitle}>Create your account and find your match!</Text>
            </View>

            <View style={styles.formFields}>
              <SelectField
                label="Applying for"
                error={errors.applyingFor}
                value={formData.applyingFor}
                onValueChange={(val) => handleChange("applyingFor", val)}
                items={applyingForOptions}
                placeholder={{ label: "Select who you're applying for", value: null }}
                animationStyle={applyingForAnimation}
                isFocused={focusedField === "applyingFor"}
                onFocus={() => setFocusedField("applyingFor")}
                onBlur={() => setFocusedField(null)}
              />

              {['myself', 'friend'].includes(formData.applyingFor) && (
                <SelectField
                  label="Gender"
                  error={errors.gender}
                  value={formData.gender}
                  onValueChange={(val) => handleChange("gender", val)}
                  items={genderOptions}
                  placeholder={{ label: "Select gender", value: null }}
                  animationStyle={genderAnimation}
                  isFocused={focusedField === "gender"}
                  onFocus={() => setFocusedField("gender")}
                  onBlur={() => setFocusedField(null)}
                />
              )}

              {['myself', 'friend'].includes(formData.applyingFor) && formData.gender === 'other' && (
                <Field
                  label="Specify Gender"
                  error={errors.customGender}
                  icon={getFieldIcon("customGender")}
                  animationStyle={customGenderAnimation}
                  isFocused={focusedField === "customGender"}
                >
                  <TextInput
                    placeholder="Please specify your gender"
                    value={formData.customGender}
                    onChangeText={(val) => handleChange("customGender", val)}
                    onFocus={() => setFocusedField("customGender")}
                    onBlur={() => setFocusedField(null)}
                    style={[
                      styles.input,
                      { color: focusedField === "customGender" ? "#db2777" : "#374151" },
                    ]}
                  />
                </Field>
              )}

              <NameFields
                firstNameProps={{
                  label: "First Name",
                  error: errors.firstName,
                  icon: getFieldIcon("firstName"),
                  isFocused: focusedField === "firstName",
                  placeholder: "First name",
                  value: formData.firstName,
                  onChangeText: (val) => handleChange("firstName", val),
                  onFocus: () => setFocusedField("firstName"),
                  onBlur: () => setFocusedField(null),
                }}
                lastNameProps={{
                  label: "Last Name",
                  error: errors.lastName,
                  icon: getFieldIcon("lastName"),
                  isFocused: focusedField === "lastName",
                  placeholder: "Last name",
                  value: formData.lastName,
                  onChangeText: (val) => handleChange("lastName", val),
                  onFocus: () => setFocusedField("lastName"),
                  onBlur: () => setFocusedField(null),
                }}
                animationStyle={nameAnimation}
              />

              <Field
                label="Email"
                error={errors.email}
                icon={getFieldIcon("email")}
                animationStyle={emailAnimation}
                isFocused={focusedField === "email"}
              >
                <TextInput
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(val) => handleChange("email", val)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={[
                    styles.input,
                    { color: focusedField === "email" ? "#db2777" : "#374151" },
                  ]}
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </Field>

              <Field
                label="Mobile Number"
                error={errors.phoneNo}
                icon={getFieldIcon("phoneNo")}
                animationStyle={numberAnimation}
                isFocused={focusedField === "phoneNo"}
              >
                <TextInput
                  placeholder="Enter your mobile number"
                  keyboardType="phone-pad"
                  value={formData.phoneNo}
                  onChangeText={(val) => handleChange("phoneNo", val)}
                  onFocus={() => setFocusedField("phoneNo")}
                  onBlur={() => setFocusedField(null)}
                  style={[
                    styles.input,
                    { color: focusedField === "phoneNo" ? "#db2777" : "#374151" },
                  ]}
                  maxLength={10}
                />
              </Field>

              <PasswordField
                label="Password"
                error={errors.password}
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(val) => handleChange("password", val)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                animationStyle={passwordAnimation}
                isFocused={focusedField === "password"}
              />

              <PasswordField
                label="Confirm Password"
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(val) => handleChange("confirmPassword", val)}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                animationStyle={confirmPasswordAnimation}
                isFocused={focusedField === "confirmPassword"}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>
                  {isSubmitting ? "Submitting..." : "Create Account"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 6, marginBottom: 20 }}>
              <Text style={{ color: '#6B7280' }}>
                Already have an account ?
              </Text>
              <TouchableOpacity style={{ marginLeft: 4 }} onPress={goToLogin}>
                <Text style={{ color: '#DB2777', fontWeight: 'bold' }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>

          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fdf2f8",
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    width: "100%",
  },
  imageContainer: {
    height: 216,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf2f8",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  headingWrapper: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#db2777",
    marginBottom: 8,
  },
  subtitle: {
    color: "#4b5563",
  },
  formFields: {
    padding: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  // New styles for the side-by-side name fields
  nameFieldsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameFieldColumn: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  selectWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: 'center',
    height: 48, 
    overflow: 'hidden',
  },
  selectInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: "100%",
  },
  selectText: {
    fontSize: 16,
    color: "#374151",
  },
  placeholderText: {
    color: "#9ca3af",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
  },
  eyeButton: {
    padding: 4,
    marginLeft: 8,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#db2777",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 24,
  },
  submitText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "100%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  selectedOption: {
    backgroundColor: "#fdf2f8",
  },
  optionText: {
    fontSize: 16,
    color: "#374151",
  },
  selectedOptionText: {
    color: "#db2777",
    fontWeight: "500",
  },
});