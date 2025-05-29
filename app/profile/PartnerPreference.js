import { useRef, useState } from "react";
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
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { axiosPublic } from "../api/constant";

const SEX_OPTIONS = ["Male", "Female", "Others"];

const LIFESTYLE_TYPES = ["Modern", "Ethnic", "Traditional"];

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
  if (!cm || isNaN(cm)) return ""; // return empty string if invalid

  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  if (isNaN(feet) || isNaN(inches)) return ""; // extra guard

  if (inches === 12) {
    return `${feet + 1}'0"`;
  }

  return `${feet}'${inches}"`;
};

const MatrimonialProfile = () => {
  const [apiData, setApiData] = useState({
    age: [],
    height_cm: [],
    height_ft_in: [],
    weight: [],
    state: [],
    city: {},
    religion: [],
    caste: {},
    education_level: [],
    occupation: [],
    lifestyle: [],
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  const [preferences, setPreferences] = useState({
    ageRange: { min: "", max: "" },
    heightRange: { min: "", max: "", unit: "cm" },
    weight: { min: "", max: "" },
    sex: "",
    otherSex: "",
    educationLevel: "",
    occupationType: "",
    location: { state: "", city: "" },
    religion: "",
    caste: "",
    lifestyle: "",
  });

  const [errors, setErrors] = useState({
    ageRange: "",
    heightRange: "",
    weight: "",
    sex: "",
    otherSex: "",
    educationLevel: "",
    occupationType: "",
    state: "",
    city: "",
    religion: "",
    caste: "",
    lifestyle: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const [minMaxType, setMinMaxType] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [dropdownItems, setDropdownItems] = useState([]);
  const [dropdownTitle, setDropdownTitle] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const router = useRouter();
  const params = useLocalSearchParams();

  const generateWeightOptions = () => {
    return Array.from({ length: 81 }, (_, i) => `${i + 40} kg`);
  };

  useEffect(() => {
    const fetchPartnerPreference = async () => {
      try {
        const authToken = await AsyncStorage.getItem("token");
        const response = await axiosPublic.get(
          "/partnerpreference/get-utility-partner-preference-data",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );


        if (response.data && response.data.data) {
          const fetchedData = response.data.data;
          setApiData({
            age: fetchedData.age || [],
            height_cm: fetchedData.height_cm || [],
            height_ft_in: fetchedData.height_ft_in || [],
            weight: generateWeightOptions(),
            state: fetchedData.state || [],
            city: fetchedData.city || {},
            religion: fetchedData.religion || [],
            caste: fetchedData.caste || {},
            education_level: fetchedData.education_level || [],
            occupation: fetchedData.occupation || [],
            lifestyle: fetchedData.lifestyle || [],
          });
          setDataLoaded(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        Alert.alert("Error", "Failed to load data. Please try again.");
        setApiData({
          age: generateAgeOptions(),
          height_cm: generateHeightOptionsCm(),
          height_ft_in: generateHeightOptionsFt(),
          weight: generateWeightOptions(),
          state: [],
          city: {},
          religion: [],
          caste: {},
          education_level: [],
          occupation: [],
        });
        setDataLoaded(true);
      }
    };

    fetchPartnerPreference();
  }, []);

  const generateAgeOptions = () => {
    return Array.from({ length: 43 }, (_, i) => `${i + 18} years`);
  };

  const generateHeightOptionsCm = () => {
    return Array.from({ length: 61 }, (_, i) => `${i + 140} cm`);
  };

  const generateHeightOptionsFt = () => {
    const options = [];
    for (let feet = 4; feet <= 7; feet++) {
      for (let inches = 0; inches <= 11; inches++) {
        if (feet === 7 && inches > 0) break;
        options.push(`${feet}'${inches}"`);
      }
    }
    return options;
  };

  const getAgeValue = (ageString) => {
    return parseInt(ageString.replace(" years", ""));
  };

  const getHeightValue = (heightString, unit) => {
    if (unit === "cm") {
      return parseInt(heightString.replace(" cm", ""));
    }
    return ftToCm(heightString);
  };

  const getWeightValue = (weightString) => {
    return parseInt(weightString.replace(" kg", ""));
  };

  const stateToApiKey = (stateName) => {
    return stateName.toLowerCase().replace(/\s+/g, "_");
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "sex":
        if (!value) {
          errorMessage = "Please select a gender";
        }
        break;

      case "otherSex":
        if (preferences.sex === "Others" && !value.trim()) {
          errorMessage = "Please specify your gender";
        }
        break;

      case "educationLevel":
        if (!value) {
          errorMessage = "Please select your education level";
        }
        break;

      case "occupationType":
        if (!value) {
          errorMessage = "Please select your occupation type";
        }
        break;

      case "state":
        if (!value) {
          errorMessage = "Please select a state";
        }
        break;

      case "city":
        if (!value && preferences.location.state) {
          errorMessage = "Please select a city";
        }
        break;

      case "religion":
        if (!value) {
          errorMessage = "Please select a religion";
        }
        break;

      case "caste":
        if (!value && preferences.religion) {
          errorMessage = "Please select a caste";
        }
        break;

      case "lifestyle":
        if (!value && preferences.lifestyle) {
          errorMessage = "Please select a lifestyle preference";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));

    return errorMessage === "";
  };

  const validateRange = (field, values) => {
    const { min, max } = values;
    let errorMessage = "";

    if (!min && !max) {
      errorMessage = `Please select both minimum and maximum ${field.replace(
        "Range",
        ""
      )} values`;
    } else if (!min) {
      errorMessage = `Please select minimum ${field.replace(
        "Range",
        ""
      )} value`;
    } else if (!max) {
      errorMessage = `Please select maximum ${field.replace(
        "Range",
        ""
      )} value`;
    } else {
      let minVal, maxVal;

      if (field === "ageRange") {
        minVal = getAgeValue(min);
        maxVal = getAgeValue(max);
      } else if (field === "heightRange") {
        minVal = getHeightValue(min, preferences.heightRange.unit);
        maxVal = getHeightValue(max, preferences.heightRange.unit);
      } else if (field === "weight") {
        minVal = getWeightValue(min);
        maxVal = getWeightValue(max);
      }

      if (minVal > maxVal) {
        errorMessage = `Minimum ${field.replace(
          "Range",
          ""
        )} cannot be greater than maximum ${field.replace("Range", "")}`;
      }
    }

    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));

    return errorMessage === "";
  };

  const updatePreference = (field, value) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    setTimeout(() => {
      validateField(field, value);
    }, 0);
  };

  const updateNestedPreference = (parent, field, value) => {
    const updatedValues = {
      ...preferences[parent],
      [field]: value,
    };

    setPreferences((prev) => ({
      ...prev,
      [parent]: updatedValues,
    }));

    if (parent === "location" && field === "state") {
      setPreferences((prev) => ({
        ...prev,
        location: {
          state: value,
          city: "",
        },
      }));

      setErrors((prev) => ({
        ...prev,
        city: "",
      }));

      setTimeout(() => {
        validateField("state", value);
      }, 0);
    } else if (parent === "location" && field === "city") {
      setTimeout(() => {
        validateField("city", value);
      }, 0);
    } else {
      if (errors[parent]) {
        setErrors((prev) => ({
          ...prev,
          [parent]: "",
        }));
      }

      setTimeout(() => {
        validateRange(parent, updatedValues);
      }, 0);
    }
  };

  const toggleHeightUnit = () => {
    setPreferences((prev) => ({
      ...prev,
      heightRange: {
        min: "",
        max: "",
        unit: prev.heightRange.unit === "cm" ? "ft" : "cm",
      },
    }));

    setErrors((prev) => ({
      ...prev,
      heightRange: "",
    }));
  };

  const openPopup = (type, title, minMaxField = "") => {
    if (!dataLoaded) {
      Alert.alert("Loading", "Please wait while data is being loaded...");
      return;
    }

    let items = [];

    switch (type) {
      case "sex":
        items = SEX_OPTIONS;
        break;
      case "education":
        items = apiData.education_level;
        break;
      case "occupation":
        items = apiData.occupation;
        break;
      case "state":
        items = apiData.state;
        break;
      case "city":
        const stateKey = stateToApiKey(preferences.location.state);
        items =
          preferences.location.state && apiData.city[stateKey]
            ? apiData.city[stateKey]
            : ["No cities available"];
        break;
      case "religion":
        items = apiData.religion;
        break;
      case "caste":
        const religionKey = preferences.religion.toLowerCase();
        items =
          preferences.religion && apiData.caste[religionKey]
            ? apiData.caste[religionKey]
            : [];
        break;
      case "lifestyle":
        items = apiData.lifestyle;
        break;
      case "age":
        if (minMaxField === "min" && preferences.ageRange.max) {
          const maxAge = getAgeValue(preferences.ageRange.max);
          items = apiData.age.filter((age) => getAgeValue(age) <= maxAge);
        } else if (minMaxField === "max" && preferences.ageRange.min) {
          const minAge = getAgeValue(preferences.ageRange.min);
          items = apiData.age.filter((age) => getAgeValue(age) >= minAge);
        } else {
          items = apiData.age;
        }
        break;
      case "height":
        const heightOptions =
          preferences.heightRange.unit === "cm"
            ? apiData.height_cm
            : apiData.height_ft_in;

        if (minMaxField === "min" && preferences.heightRange.max) {
          const maxHeightCm = getHeightValue(
            preferences.heightRange.max,
            preferences.heightRange.unit
          );
          items = heightOptions.filter(
            (h) =>
              getHeightValue(h, preferences.heightRange.unit) <= maxHeightCm
          );
        } else if (minMaxField === "max" && preferences.heightRange.min) {
          const minHeightCm = getHeightValue(
            preferences.heightRange.min,
            preferences.heightRange.unit
          );
          items = heightOptions.filter(
            (h) =>
              getHeightValue(h, preferences.heightRange.unit) >= minHeightCm
          );
        } else {
          items = heightOptions;
        }
        break;
      case "weight":
        if (minMaxField === "min" && preferences.weight.max) {
          const maxWeight = getWeightValue(preferences.weight.max);
          items = apiData.weight.filter((w) => getWeightValue(w) <= maxWeight);
        } else if (minMaxField === "max" && preferences.weight.min) {
          const minWeight = getWeightValue(preferences.weight.min);
          items = apiData.weight.filter((w) => getWeightValue(w) >= minWeight);
        } else {
          items = apiData.weight;
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
      }),
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
      }),
    ]).start(() => {
      setPopupVisible(false);
      if (callback) callback();
    });
  };

  const handleSelect = (value) => {
    closePopup(() => {
      switch (activeDropdown) {
        case "sex":
          updatePreference("sex", value);
          break;
        case "education":
          updatePreference("educationLevel", value);
          break;
        case "occupation":
          updatePreference("occupationType", value);
          break;
        case "state":
          setPreferences((prev) => ({
            ...prev,
            location: {
              state: value,
              city: "",
            },
          }));
          setErrors((prev) => ({
            ...prev,
            state: "",
            city: "",
          }));
          setTimeout(() => {
            validateField("state", value);
          }, 0);
          break;
        case "city":
          if (value !== "No cities available") {
            setPreferences((prev) => ({
              ...prev,
              location: {
                ...prev.location,
                city: value,
              },
            }));
            setErrors((prev) => ({
              ...prev,
              city: "",
            }));
            setTimeout(() => {
              validateField("city", value);
            }, 0);
          }
          break;
        case "religion":
          setPreferences((prev) => ({
            ...prev,
            religion: value,
            caste: "",
          }));
          setErrors((prev) => ({
            ...prev,
            religion: "",
            caste: "",
          }));
          setTimeout(() => {
            validateField("religion", value);
          }, 0);
          break;
        case "caste":
          updatePreference("caste", value);
          break;
        case "lifestyle":
          updatePreference("lifestyle", value);
          break;
        case "age":
          updateNestedPreference("ageRange", minMaxType, value);
          break;
        case "height":
          // FIXED: Handle height selection properly
          updateNestedPreference("heightRange", minMaxType, value);
          break;
        case "weight":
          const weightValue = value.replace(" kg", "");
          updateNestedPreference("weight", minMaxType, weightValue);
          break;
      }
    });
  };

  const validateAllFields = () => {
    let isValid = true;

    const fieldsToValidate = [
      "sex",
      "educationLevel",
      "occupationType",
      "religion",
      "lifestyle",
    ];

    fieldsToValidate.forEach((field) => {
      const fieldValue = preferences[field];
      if (!validateField(field, fieldValue)) {
        isValid = false;
      }
    });

    if (!validateField("state", preferences.location.state)) {
      isValid = false;
    }
    if (!validateField("city", preferences.location.city)) {
      isValid = false;
    }

    if (!validateField("otherSex", preferences.otherSex)) {
      isValid = false;
    }

    if (!validateField("caste", preferences.caste)) {
      isValid = false;
    }

    const rangeValidations = [
      validateRange("ageRange", preferences.ageRange),
      validateRange("heightRange", preferences.heightRange),
      validateRange("weight", preferences.weight),
    ];

    if (!rangeValidations.every((valid) => valid)) {
      isValid = false;
    }

    return isValid;
  };

  // useEffect(() => {
  //   const loadEditData = async () => {
  //     if (params.isEdit === 'true') {
  //       setIsEditMode(true);

  //       try {
  //         const storedData = await AsyncStorage.getItem('editData');
  //         if (storedData) {
  //           const editData = JSON.parse(storedData);
  //           console.log('Loaded edit data:', editData);

  //           setPreferences(prevPrefs => ({
  //             ...prevPrefs,
  //             ageRange: {
  //               min: editData.minAge ? `${editData.minAge} years` : '',
  //               max: editData.maxAge ? `${editData.maxAge} years` : ''
  //             },
  //             heightRange: {
  //               // FIXED: Handle height display properly for edit mode
  //               min: editData.minHeight ? (editData.heightUnit === 'cm' ? `${editData.minHeight} cm` : cmToFt(editData.minHeight)) : '',
  //               max: editData.maxHeight ? (editData.heightUnit === 'cm' ? `${editData.maxHeight} cm` : cmToFt(editData.maxHeight)) : '',
  //               unit: editData.heightUnit || 'cm'
  //             },
  //             weight: {
  //               min: editData.minWeight ? `${editData.minWeight}` : '',
  //               max: editData.maxWeight ? `${editData.maxWeight}` : ''
  //             },
  //             sex: editData.sex || '',
  //             otherSex: editData.otherSex || '',
  //             educationLevel: editData.educationLevel || '',
  //             occupationType: editData.occupationType || '',
  //             location: {
  //               state: editData.state || '',
  //               city: editData.city || ''
  //             },
  //             religion: editData.religion || '',
  //             caste: editData.caste || '',
  //             lifestyle: editData.lifestyle || ''
  //           }));

  //           await AsyncStorage.removeItem('editData');
  //         }

  //         if (params.editData) {
  //           try {
  //             const editData = JSON.parse(decodeURIComponent(params.editData));
  //             console.log('Loaded edit data from params:', editData);

  //             setPreferences(prevPrefs => ({
  //               ...prevPrefs,
  //               ageRange: {
  //                 min: editData.minAge ? `${editData.minAge} years` : '',
  //                 max: editData.maxAge ? `${editData.maxAge} years` : ''
  //               },
  //               heightRange: {
  //                 // FIXED: Handle height display properly for edit mode
  //                 min: editData.minHeight ? (editData.heightUnit === 'cm' ? `${editData.minHeight} cm` : cmToFt(editData.minHeight)) : '',
  //                 max: editData.maxHeight ? (editData.heightUnit === 'cm' ? `${editData.maxHeight} cm` : cmToFt(editData.maxHeight)) : '',
  //                 unit: editData.heightUnit || 'cm'
  //               },
  //               weight: {
  //                 min: editData.minWeight ? `${editData.minWeight}` : '',
  //                 max: editData.maxWeight ? `${editData.maxWeight}` : ''
  //               },
  //               sex: editData.sex || '',
  //               otherSex: editData.otherSex || '',
  //               educationLevel: editData.educationLevel || '',
  //               occupationType: editData.occupationType || '',
  //               location: {
  //                 state: editData.state || '',
  //                 city: editData.city || ''
  //               },
  //               religion: editData.religion || '',
  //               caste: editData.caste || '',
  //               lifestyle: editData.lifestyle || ''
  //             }));
  //           } catch (parseError) {
  //             console.error('Error parsing editData from params:', parseError);
  //           }
  //         }

  //       } catch (error) {
  //         console.error('Error loading edit data:', error);
  //         Alert.alert('Error', 'Failed to load existing data');
  //       }
  //     }
  //   };

  //   if (dataLoaded) {
  //     loadEditData();
  //   }
  // }, [params, dataLoaded]);

  useEffect(() => {
    const loadEditData = async () => {
      if (params.isEdit === "true") {
        setIsEditMode(true);

        try {
          const storedData = await AsyncStorage.getItem("editData");
          const editData = storedData
            ? JSON.parse(storedData)
            : params.editData
            ? JSON.parse(decodeURIComponent(params.editData))
            : null;

          if (editData) {

            // Ensure caste and height are updated only when their base data exists
            const casteOptions =
              editData.religion?.toLowerCase() &&
              apiData.caste[editData.religion.toLowerCase()];
            const heightMinFormatted = editData.minHeight
              ? editData.heightUnit === "cm"
                ? `${editData.minHeight} cm`
                : cmToFt(editData.minHeight)
              : "";
            const heightMaxFormatted = editData.maxHeight
              ? editData.heightUnit === "cm"
                ? `${editData.maxHeight} cm`
                : cmToFt(editData.maxHeight)
              : "";

            setPreferences((prevPrefs) => ({
              ...prevPrefs,
              ageRange: {
                min: editData.minAge ? `${editData.minAge} years` : "",
                max: editData.maxAge ? `${editData.maxAge} years` : "",
              },
              heightRange: {
                min:
                  editData.minHeight !== null &&
                  editData.minHeight !== undefined
                    ? editData.heightUnit === "cm"
                      ? `${editData.minHeight} cm`
                      : cmToFt(editData.minHeight)
                    : "",
                max:
                  editData.maxHeight !== null &&
                  editData.maxHeight !== undefined
                    ? editData.heightUnit === "cm"
                      ? `${editData.maxHeight} cm`
                      : cmToFt(editData.maxHeight)
                    : "",
                unit: editData.heightUnit || "cm",
              },

              weight: {
                min: editData.minWeight ? `${editData.minWeight}` : "",
                max: editData.maxWeight ? `${editData.maxWeight}` : "",
              },
              sex: editData.sex || "",
              otherSex: editData.otherSex || "",
              educationLevel: editData.educationLevel || "",
              occupationType: editData.occupationType || "",
              location: {
                state: editData.state || "",
                city: editData.city || "",
              },
              religion: editData.religion || "",
              caste: casteOptions?.includes(editData.caste)
                ? editData.caste
                : "",
              lifestyle: editData.lifestyle || "",
            }));

            await AsyncStorage.removeItem("editData");
          }
        } catch (error) {
          console.error("Error loading edit data:", error);
          Alert.alert("Error", "Failed to load existing data");
        }
      }
    };

    if (dataLoaded) loadEditData();
  }, [params, dataLoaded]);

  const handleSavePreferences = async () => {
    if (!dataLoaded) {
      Alert.alert("Loading", "Please wait while data is being loaded...");
      return;
    }

    if (validateAllFields()) {
      const minAge = preferences.ageRange.min
        ? getAgeValue(preferences.ageRange.min)
        : "";
      const maxAge = preferences.ageRange.max
        ? getAgeValue(preferences.ageRange.max)
        : "";

      let minHeight = preferences.heightRange.min;
      let maxHeight = preferences.heightRange.max;

      if (preferences.heightRange.unit === "cm") {
        minHeight = minHeight ? parseInt(minHeight.replace(" cm", "")) : "";
        maxHeight = maxHeight ? parseInt(maxHeight.replace(" cm", "")) : "";
      } else {
        minHeight = minHeight ? ftToCm(minHeight) : "";
        maxHeight = maxHeight ? ftToCm(maxHeight) : "";
      }

      const minWeight = preferences.weight.min
        ? parseInt(preferences.weight.min)
        : "";
      const maxWeight = preferences.weight.max
        ? parseInt(preferences.weight.max)
        : "";

      const payloadData = {
        minAge: minAge,
        maxAge: maxAge,
        minHeight: minHeight,
        maxHeight: maxHeight,
        heightUnit: preferences.heightRange.unit,
        minWeight: minWeight,
        maxWeight: maxWeight,
        weightUnit: "kg",
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
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          Alert.alert("Error", "User not logged in. Token not found.");
          return;
        }

        const apiUrl = isEditMode
          ? "/partnerpreference/update-preference"
          : "/partnerpreference/create-preference";

        const response = isEditMode
          ? await axiosPublic.put(apiUrl, payloadData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await axiosPublic.post(apiUrl, payloadData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

        if (response.status == 200) {
          router.push("/navigation/MainTabs");
        }

        Alert.alert("Success", "Partner preferences saved successfully!");
      } catch (err) {
        Alert.alert("Error", "Failed to save preferences.");
      }

    } else {
      const errorMessages = [];
      Object.keys(errors).forEach((key) => {
        if (errors[key]) {
          const fieldLabel = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
          errorMessages.push(`${fieldLabel}: ${errors[key]}`);
        }
      });

      Alert.alert(
        "Validation Error",
        errorMessages.length > 0
          ? `Please fix the following issues:\n\n${errorMessages.join("\n")}`
          : "Please fill in all required fields.",
        [{ text: "OK" }]
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
    return value;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#EC4899",
            paddingVertical: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Create Profile
          </Text>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              marginTop: 6,
              opacity: 0.9,
              fontSize: 18,
            }}
          >
            {isEditMode
              ? "Edit Professional Details"
              : "Find your perfect match by completing your profile"}
          </Text>
        </View>

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
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
                  errors.ageRange ? styles.inputError : null,
                ]}
                onPress={() => openPopup("age", "Select Minimum Age", "min")}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={errors.ageRange ? "#ef4444" : "#db2777"}
                />
                <Text
                  style={[
                    styles.dropdownText,
                    !preferences.ageRange.min && styles.dropdownPlaceholder,
                  ]}
                >
                  {preferences.ageRange.min || "Min Age"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </TouchableOpacity>

              <Text style={styles.rangeText}>to</Text>

              <TouchableOpacity
                style={[
                  styles.dropdownSelector,
                  styles.halfInput,
                  errors.ageRange ? styles.inputError : null,
                ]}
                onPress={() => openPopup("age", "Select Maximum Age", "max")}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={errors.ageRange ? "#ef4444" : "#db2777"}
                />
                <Text
                  style={[
                    styles.dropdownText,
                    !preferences.ageRange.max && styles.dropdownPlaceholder,
                  ]}
                >
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
                  {preferences.heightRange.unit === "cm"
                    ? "Switch to ft/in"
                    : "Switch to cm"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rangeContainer}>
              <TouchableOpacity
                style={[
                  styles.dropdownSelector,
                  styles.halfInput,
                  errors.heightRange ? styles.inputError : null,
                ]}
                onPress={() =>
                  openPopup(
                    "height",
                    `Select Minimum Height (${preferences.heightRange.unit})`,
                    "min"
                  )
                }
              >
                <Ionicons
                  name="resize-outline"
                  size={20}
                  color={errors.heightRange ? "#ef4444" : "#db2777"}
                />
                <Text
                  style={[
                    styles.dropdownText,
                    !preferences.heightRange.min && styles.dropdownPlaceholder,
                  ]}
                >
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
                  errors.heightRange ? styles.inputError : null,
                ]}
                onPress={() =>
                  openPopup(
                    "height",
                    `Select Maximum Height (${preferences.heightRange.unit})`,
                    "max"
                  )
                }
              >
                <Ionicons
                  name="resize-outline"
                  size={20}
                  color={errors.heightRange ? "#ef4444" : "#db2777"}
                />
                <Text
                  style={[
                    styles.dropdownText,
                    !preferences.heightRange.max && styles.dropdownPlaceholder,
                  ]}
                >
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
                  errors.weight ? styles.inputError : null,
                ]}
                onPress={() =>
                  openPopup("weight", "Select Minimum Weight", "min")
                }
              >
                <Ionicons
                  name="fitness-outline"
                  size={20}
                  color={errors.weight ? "#ef4444" : "#db2777"}
                />
                <Text
                  style={[
                    styles.dropdownText,
                    !preferences.weight.min && styles.dropdownPlaceholder,
                  ]}
                >
                  {preferences.weight.min
                    ? `${preferences.weight.min} kg`
                    : "Min Weight"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </TouchableOpacity>

              <Text style={styles.rangeText}>to</Text>

              <TouchableOpacity
                style={[
                  styles.dropdownSelector,
                  styles.halfInput,
                  errors.weight ? styles.inputError : null,
                ]}
                onPress={() =>
                  openPopup("weight", "Select Maximum Weight", "max")
                }
              >
                <Ionicons
                  name="fitness-outline"
                  size={20}
                  color={errors.weight ? "#ef4444" : "#db2777"}
                />
                <Text
                  style={[
                    styles.dropdownText,
                    !preferences.weight.max && styles.dropdownPlaceholder,
                  ]}
                >
                  {preferences.weight.max
                    ? `${preferences.weight.max} kg`
                    : "Max Weight"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
            {renderError(errors.weight)}

            <Text style={styles.label}>Sex *</Text>
            <TouchableOpacity
              style={[
                styles.dropdownSelector,
                errors.sex ? styles.inputError : null,
              ]}
              onPress={() => openPopup("sex", "Select Sex")}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={errors.sex ? "#ef4444" : "#db2777"}
              />
              <Text
                style={[
                  styles.dropdownText,
                  !preferences.sex && styles.dropdownPlaceholder,
                ]}
              >
                {preferences.sex || "Select Sex"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
            {renderError(errors.sex)}

            {preferences.sex === "Others" && (
              <View style={styles.inputGroup}>
                <TextInput
                  placeholder="Please specify"
                  style={[
                    styles.input,
                    errors.otherSex ? styles.inputError : null,
                  ]}
                  value={preferences.otherSex}
                  onChangeText={(value) => updatePreference("otherSex", value)}
                />
              </View>
            )}
            {preferences.sex === "Others" && renderError(errors.otherSex)}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Education & Career</Text>

            <Text style={styles.label}>Education Level *</Text>
            <TouchableOpacity
              style={[
                styles.dropdownSelector,
                errors.educationLevel ? styles.inputError : null,
              ]}
              onPress={() => openPopup("education", "Select Education Level")}
            >
              <Ionicons
                name="school-outline"
                size={20}
                color={errors.educationLevel ? "#ef4444" : "#db2777"}
              />
              <Text
                style={[
                  styles.dropdownText,
                  !preferences.educationLevel && styles.dropdownPlaceholder,
                ]}
              >
                {preferences.educationLevel || "Select Education Level"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
            {renderError(errors.educationLevel)}

            <Text style={styles.label}>Occupation Type *</Text>
            <TouchableOpacity
              style={[
                styles.dropdownSelector,
                errors.occupationType ? styles.inputError : null,
              ]}
              onPress={() => openPopup("occupation", "Select Occupation Type")}
            >
              <Ionicons
                name="briefcase-outline"
                size={20}
                color={errors.occupationType ? "#ef4444" : "#db2777"}
              />
              <Text
                style={[
                  styles.dropdownText,
                  !preferences.occupationType && styles.dropdownPlaceholder,
                ]}
              >
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
                errors.state ? styles.inputError : null,
              ]}
              onPress={() => openPopup("state", "Select State")}
            >
              <Ionicons
                name="location-outline"
                size={20}
                color={errors.state ? "#ef4444" : "#db2777"}
              />
              <Text
                style={[
                  styles.dropdownText,
                  !preferences.location.state && styles.dropdownPlaceholder,
                ]}
              >
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
                  (errors.city && styles.inputError),
              ]}
              onPress={() =>
                preferences.location.state
                  ? openPopup("city", "Select City")
                  : null
              }
              disabled={!preferences.location.state}
            >
              <Ionicons
                name="business-outline"
                size={20}
                color={
                  !preferences.location.state
                    ? "#94a3b8"
                    : errors.city
                    ? "#ef4444"
                    : "#db2777"
                }
              />
              <Text
                style={[
                  styles.dropdownText,
                  !preferences.location.city && styles.dropdownPlaceholder,
                  !preferences.location.state && styles.disabledText,
                ]}
              >
                {preferences.location.city ||
                  (preferences.location.state
                    ? "Select City"
                    : "Select State First")}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={preferences.location.state ? "#64748b" : "#94a3b8"}
              />
            </TouchableOpacity>
            {renderError(errors.city)}

            <Text style={styles.label}>Religion *</Text>
            <TouchableOpacity
              style={[
                styles.dropdownSelector,
                errors.religion ? styles.inputError : null,
              ]}
              onPress={() => openPopup("religion", "Select Religion")}
            >
              <Ionicons
                name="planet-outline"
                size={20}
                color={errors.religion ? "#ef4444" : "#db2777"}
              />
              <Text
                style={[
                  styles.dropdownText,
                  !preferences.religion && styles.dropdownPlaceholder,
                ]}
              >
                {preferences.religion || "Select Religion"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
            {renderError(errors.religion)}

            <Text style={styles.label}>
              Caste {preferences.religion && "*"}
            </Text>
            <TouchableOpacity
              style={[
                styles.dropdownSelector,
                (!preferences.religion && styles.disabledDropdown) ||
                  (errors.caste && styles.inputError),
              ]}
              onPress={() =>
                preferences.religion ? openPopup("caste", "Select Caste") : null
              }
              disabled={!preferences.religion}
            >
              <Ionicons
                name="people-outline"
                size={20}
                color={
                  !preferences.religion
                    ? "#94a3b8"
                    : errors.caste
                    ? "#ef4444"
                    : "#db2777"
                }
              />
              <Text
                style={[
                  styles.dropdownText,
                  !preferences.caste && styles.dropdownPlaceholder,
                  !preferences.religion && styles.disabledText,
                ]}
              >
                {preferences.caste ||
                  (preferences.religion
                    ? "Select Caste"
                    : "Select Religion First")}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={preferences.religion ? "#64748b" : "#94a3b8"}
              />
            </TouchableOpacity>
            {renderError(errors.caste)}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Lifestyle</Text>

            <Text style={styles.label}>Lifestyle Expectations *</Text>
            <TouchableOpacity
              style={[
                styles.dropdownSelector,
                errors.lifestyle ? styles.inputError : null,
              ]}
              onPress={() => openPopup("lifestyle", "Select Lifestyle")}
            >
              <Ionicons
                name="restaurant-outline"
                size={20}
                color={errors.lifestyle ? "#ef4444" : "#db2777"}
              />
              <Text
                style={[
                  styles.dropdownText,
                  !preferences.lifestyle && styles.dropdownPlaceholder,
                ]}
              >
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
            <Ionicons
              name="save-outline"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {isEditMode ? "Update Preferences" : "Save Preferences"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Your preferences help us find your perfect match
            </Text>
            <Text style={styles.requiredText}>* Required fields</Text>
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
                  transform: [{ scale: scaleAnim }],
                },
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
                    {((activeDropdown === "sex" && preferences.sex === item) ||
                      (activeDropdown === "education" &&
                        preferences.educationLevel === item) ||
                      (activeDropdown === "occupation" &&
                        preferences.occupationType === item) ||
                      (activeDropdown === "state" &&
                        preferences.location.state === item) ||
                      (activeDropdown === "city" &&
                        preferences.location.city === item) ||
                      (activeDropdown === "religion" &&
                        preferences.religion === item) ||
                      (activeDropdown === "caste" &&
                        preferences.caste === item) ||
                      (activeDropdown === "lifestyle" &&
                        preferences.lifestyle === item) ||
                      (activeDropdown === "age" &&
                        minMaxType === "min" &&
                        preferences.ageRange.min === item) ||
                      (activeDropdown === "age" &&
                        minMaxType === "max" &&
                        preferences.ageRange.max === item) ||
                      (activeDropdown === "height" &&
                        minMaxType === "min" &&
                        preferences.heightRange.min === item.split(" ")[0]) ||
                      (activeDropdown === "height" &&
                        minMaxType === "max" &&
                        preferences.heightRange.max === item.split(" ")[0]) ||
                      (activeDropdown === "weight" &&
                        minMaxType === "min" &&
                        preferences.weight.min === item.split(" ")[0]) ||
                      (activeDropdown === "weight" &&
                        minMaxType === "max" &&
                        preferences.weight.max === item.split(" ")[0])) && (
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf2f8",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#db2777",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  unitToggle: {
    padding: 4,
  },
  unitToggleText: {
    fontSize: 12,
    color: "#db2777",
    fontWeight: "500",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 6,
    marginTop: 4,
  },
  rangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
    marginTop: 4,
  },
  halfInput: {
    flex: 1,
  },
  rangeText: {
    marginHorizontal: 10,
    fontSize: 15,
    color: "#64748b",
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#334155",
  },
  dropdownSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 6,
    marginTop: 4,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: "#334155",
    marginLeft: 8,
  },
  dropdownPlaceholder: {
    color: "#94a3b8",
  },
  disabledDropdown: {
    backgroundColor: "#f1f5f9",
    opacity: 0.7,
  },
  disabledText: {
    color: "#94a3b8",
  },
  inputError: {
    borderColor: "#ef4444",
    borderWidth: 1.5,
    backgroundColor: "#fef2f2",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  button: {
    backgroundColor: "#db2777",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    shadowColor: "#db2777",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 8,
  },
  requiredText: {
    fontSize: 12,
    color: "#ef4444",
    textAlign: "center",
    fontStyle: "italic",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupCard: {
    width: width * 0.85,
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    maxHeight: height * 0.7,
  },
  popupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
  },
  popupList: {
    maxHeight: height * 0.5,
  },
  popupItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  popupItemText: {
    fontSize: 16,
    color: "#334155",
  },
  popupCloseButton: {
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },
  popupCloseText: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
});

export default MatrimonialProfile;
