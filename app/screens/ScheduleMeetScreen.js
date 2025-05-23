import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Easing,
    Modal,
    Platform, SafeAreaView, ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const ScheduleMeetScreen = () => {

    const generateRandomFutureDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    // Generate random date between 1-30 days from now
    const randomDays = Math.floor(Math.random() * 30) + 1;
    futureDate.setDate(today.getDate() + randomDays);
    return futureDate;
  };

  const generateRandomFutureTime = () => {
    const time = new Date();
    const randomHour = Math.floor(Math.random() * 12) + 9;
    const randomMinutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    time.setHours(randomHour, randomMinutes, 0, 0);
    return time;
  };

  const sampleLocations = [
    'Writer’s Café',
    'Chamiers Café',
    'Amelie’s Café and Creamery',
    'The Marina Restaurant',
    'Bay View at Vivanta',
    'Mathsya Restaurant',
    'Barbeque Nation - Vadapalani',
    '10 Downing Street',
    'Cafe Coffee Day - Ashok Nagar',
    'Bay View at Vivanta',
    "Rayar’s Mess"
  ];

  const venueOptions = [
    { label: 'Cafe', value: 'cafe', icon: 'coffee', color: '#8B4513', gradient: ['#D4A574', '#8B4513'] },
    { label: 'Restaurant', value: 'restaurant', icon: 'silverware-fork-knife', color: '#FF6B6B', gradient: ['#FF9A9E', '#FECFEF'] },
    { label: 'Bar', value: 'bar', icon: 'glass-cocktail', color: '#4ECDC4', gradient: ['#4ECDC4', '#44A08D'] },
  ];

  const generateRandomLocation = (currentLocation = '') => {
    const currentIndex = sampleLocations.indexOf(currentLocation);
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * sampleLocations.length);
    } while (randomIndex === currentIndex && sampleLocations.length > 1);
    
    return sampleLocations[randomIndex];
  };

  const generateRandomVenueType = (currentVenueType = '') => {
    const currentIndex = venueOptions.findIndex(v => v.value === currentVenueType);
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * venueOptions.length);
    } while (randomIndex === currentIndex && venueOptions.length > 1);
    
    return venueOptions[randomIndex].value;
  };

  const [selectedDate, setSelectedDate] = useState(() => generateRandomFutureDate());
  const [selectedTime, setSelectedTime] = useState(() => generateRandomFutureTime());
  const [location, setLocation] = useState(() => generateRandomLocation());
  const [venueType, setVenueType] = useState(() => generateRandomVenueType());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [bookTable, setBookTable] = useState(false);
  const [bookTravel, setBookTravel] = useState(false);
  const [showVenueOptions, setShowVenueOptions] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  
  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [slideAnim] = useState(new Animated.Value(50));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [glowAnim] = useState(new Animated.Value(0));
  const [cardAnimations] = useState(
    Array.from({ length: 6 }, () => new Animated.Value(0))
  );

 

  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad), // Fixed: Use Easing.quad instead of Easing.cubic
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.7)), // Fixed: Use valid back parameter
      }),
    ]).start();

    // Staggered card animations
    const staggerDelay = 150;
    cardAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * staggerDelay + 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad), // Fixed: Use Easing.quad
      }).start();
    });

    // Continuous glow animation
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad), // Fixed: Use Easing.quad instead of Easing.sine
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad), // Fixed: Use Easing.quad instead of Easing.sine
        }),
      ])
    );
    glowAnimation.start();

    return () => glowAnimation.stop();
  }, []);



  const createPulseAnimation = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const validateDateTime = (date, time) => {
    const now = new Date();
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return selectedDateTime > now;
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date < today) {
        Alert.alert(
          '❌ Invalid Date',
          'Please select a future date. Past dates are not allowed.',
          [{ text: 'OK', style: 'default' }]
        );
        return;
      }
      
      setSelectedDate(date);
      setErrors(prev => ({ ...prev, date: null, datetime: null }));
      createPulseAnimation();
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      if (!validateDateTime(selectedDate, time)) {
        Alert.alert(
          '⏰ Invalid Time',
          'Please select a future time. Past times are not allowed.',
          [{ text: 'OK', style: 'default' }]
        );
        return;
      }
      
      setSelectedTime(time);
      setErrors(prev => ({ ...prev, time: null, datetime: null }));
      createPulseAnimation();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!venueType) {
      newErrors.venueType = 'Please select a venue type';
    }
    
    if (!validateDateTime(selectedDate, selectedTime)) {
      newErrors.datetime = 'Please select a future date and time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };






   const handleRefresh = () => {
      // Generate new random values
      const newDate = generateRandomFutureDate();
      const newTime = generateRandomFutureTime();
      const newLocation = generateRandomLocation(location);
      const newVenueType = generateRandomVenueType(venueType);
  
      // Set all new values
      setSelectedDate(newDate);
      setSelectedTime(newTime);
      setLocation(newLocation);
      setVenueType(newVenueType);
      
      // Clear any errors
      setErrors({});
      
      // Create pulse animation for feedback
      createPulseAnimation();
  
      // Show feedback alert
      // Alert.alert(
      //   '🔄 Refreshed!',
      //   'New meeting details have been generated automatically.',
      //   [{ text: 'OK', style: 'default' }]
      // );
    };
  
    const handleEdit = () => {
      setIsEditable(!isEditable);
      
      if (!isEditable) {
        Alert.alert(
          '✏️ Edit Mode',
          'All fields are now editable. You can modify the meeting details.',
          [{ text: 'OK', style: 'default' }]
        );
      } else {
        Alert.alert(
          '🔒 View Mode',
          'Fields are now in view-only mode.',
          [{ text: 'OK', style: 'default' }]
        );
      }
    };
  

  const handleSubmit = () => {
    if (validateForm()) {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        router.back()
      }, 1500);
    } else {
      Alert.alert(
        '⚠️ Form Incomplete',
        'Please fill in all required fields and ensure the date/time is in the future.',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const resetForm = () => {
    setLocation('');
    setVenueType('');
    setBookTable(false);
    setBookTravel(false);
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    setErrors({});
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const AnimatedCard = ({ children, index, style = {} }) => (
    <Animated.View
      style={[
        {
          opacity: cardAnimations[index] || 1,
          transform: [
            {
              translateY: cardAnimations[index]?.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }) || 0,
            },
            { scale: cardAnimations[index] || 1 },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
    {/* <View style={styles.container}> */}
      <StatusBar barStyle="dark-content"/>
      
      {/* Dynamic Background */}
      <View style={styles.backgroundContainer}>
        <View style={styles.backgroundGradient} />
        <View style={styles.backgroundLayer2} />
        <View style={styles.backgroundLayer3} />
        <Animated.View 
          style={[
            styles.glowOverlay,
            {
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.1, 0.3],
              }),
            },
          ]}
        />
        {/* Floating Particles */}
        <View style={styles.particlesContainer}>
          {[...Array(6)].map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                {
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 60 + 20}%`,
                  transform: [
                    {
                      scale: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
      </View>
      
      <Animated.ScrollView 
        style={[
          styles.scrollView, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>Schedule Meet</Text>
            <Text style={styles.subtitle}>Plan your perfect gathering ✨</Text>
            <View style={styles.headerDecoration}>
              <View style={styles.decorationDot} />
              <View style={styles.decorationLine} />
              <View style={styles.decorationDot} />
            </View>
          </View>

          <View style={styles.actionIcons}>
                      <TouchableOpacity
                        style={styles.actionIcon}
                        onPress={handleRefresh}
                        activeOpacity={0.7}
                      >
                        <Icon name="refresh" size={35} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionIcon, !isEditable && styles.actionIconActive]}
                        onPress={handleEdit}
                        activeOpacity={0.7}
                      >
                        <Icon name={isEditable ? "pencil-off" : "pencil"} size={35} color="#fff" />
                      </TouchableOpacity>
                    </View>
        </Animated.View>

        {/* Form Container */}
        <Animated.View 
          style={[
            styles.formContainer,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          {/* Date Selection */}
          <AnimatedCard index={0}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>📅 Date</Text>
                        <TouchableOpacity
                          style={[
                            styles.modernInput,
                            !isEditable && styles.inputDisabled,
                            errors.date && styles.inputError,
                            errors.datetime && styles.inputError
                          ]}
                          onPress={() => isEditable && setShowDatePicker(true)}
                          activeOpacity={isEditable ? 0.8 : 1}
                          disabled={!isEditable}
                        >
                          <View style={styles.inputContent}>
                            <View style={styles.inputIconContainer}>
                              <Icon name="calendar" size={22} color="#667eea" />
                            </View>
                            <Text style={[styles.inputText, !isEditable && styles.inputTextDisabled]}>
                              {formatDate(selectedDate)}
                            </Text>
                            {isEditable && <Icon name="chevron-down" size={20} color="#9ca3af" />}
                          </View>
                        </TouchableOpacity>
                        {(errors.date || errors.datetime) && (
                          <Text style={styles.errorText}>
                            {errors.date || errors.datetime}
                          </Text>
                        )}
                      </View>
                    </AnimatedCard>
          
                    {/* Time Selection */}
                    <AnimatedCard index={1}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>⏰ Time</Text>
                        <TouchableOpacity
                          style={[
                            styles.modernInput,
                            !isEditable && styles.inputDisabled,
                            errors.time && styles.inputError,
                            errors.datetime && styles.inputError
                          ]}
                          onPress={() => isEditable && setShowTimePicker(true)}
                          activeOpacity={isEditable ? 0.8 : 1}
                          disabled={!isEditable}
                        >
                          <View style={styles.inputContent}>
                            <View style={styles.inputIconContainer}>
                              <Icon name="clock-outline" size={22} color="#667eea" />
                            </View>
                            <Text style={[styles.inputText, !isEditable && styles.inputTextDisabled]}>
                              {formatTime(selectedTime)}
                            </Text>
                            {isEditable && <Icon name="chevron-down" size={20} color="#9ca3af" />}
                          </View>
                        </TouchableOpacity>
                        {(errors.time || errors.datetime) && (
                          <Text style={styles.errorText}>
                            {errors.time || errors.datetime}
                          </Text>
                        )}
                      </View>
                    </AnimatedCard>
          
                    {/* Location Input */}
                    <AnimatedCard index={2}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>📍 Location</Text>
                        <View style={[
                          styles.modernInput, 
                          !isEditable && styles.inputDisabled,
                          errors.location && styles.inputError
                        ]}>
                          <View style={styles.inputContent}>
                            <View style={styles.inputIconContainer}>
                              <Icon name="map-marker" size={22} color="#667eea" />
                            </View>
                            <TextInput
                              style={[styles.textInput, !isEditable && styles.inputTextDisabled]}
                              placeholder="Enter meeting location"
                              placeholderTextColor="#9ca3af"
                              value={location}
                              editable={isEditable}
                              onChangeText={(text) => {
                                setLocation(text);
                                if (errors.location) {
                                  setErrors(prev => ({ ...prev, location: null }));
                                }
                              }}
                            />
                          </View>
                        </View>
                        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
                      </View>
                    </AnimatedCard>
          
                    {/* Venue Type Selection */}
                    <AnimatedCard index={3}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>🏢 Venue Type</Text>
                        <TouchableOpacity
                          style={[
                            styles.modernInput, 
                            !isEditable && styles.inputDisabled,
                            errors.venueType && styles.inputError
                          ]}
                          onPress={() => isEditable && setShowVenueOptions(true)}
                          activeOpacity={isEditable ? 0.8 : 1}
                          disabled={!isEditable}
                        >
                          <View style={styles.inputContent}>
                            <View style={styles.inputIconContainer}>
                              <Icon 
                                name={venueType ? venueOptions.find(v => v.value === venueType)?.icon : 'store'} 
                                size={22} 
                                color={venueType ? venueOptions.find(v => v.value === venueType)?.color : '#667eea'} 
                              />
                            </View>
                            <Text style={[
                              styles.inputText, 
                              !venueType && styles.placeholderText,
                              !isEditable && styles.inputTextDisabled
                            ]}>
                              {venueType ? venueOptions.find(v => v.value === venueType)?.label : 'Select venue type'}
                            </Text>
                            {isEditable && <Icon name="chevron-down" size={20} color="#9ca3af" />}
                          </View>
                        </TouchableOpacity>
                        {errors.venueType && <Text style={styles.errorText}>{errors.venueType}</Text>}
                      </View>
                    </AnimatedCard>
          

          {/* Options */}
          <AnimatedCard index={4}>
            <View style={styles.optionsContainer}>
              {/* <Text style={styles.label}>✨ Additional Services</Text> */}
              <View style={styles.optionsGrid}>
                <TouchableOpacity
                  style={[styles.modernOptionCard, bookTable && styles.optionSelected]}
                  onPress={() => setBookTable(!bookTable)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.optionGradient,
                    bookTable && styles.optionGradientSelected
                  ]}>
                    <Icon 
                      name="table-chair" 
                      size={26} 
                      color={bookTable ? "#fff" : "#667eea"} 
                    />
                    <Text style={[styles.optionText, bookTable && styles.optionTextSelected]}>
                      Book Table
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modernOptionCard, bookTravel && styles.optionSelected]}
                  onPress={() => setBookTravel(!bookTravel)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.optionGradient,
                    bookTravel && styles.optionGradientSelected
                  ]}>
                    <Icon 
                      name="car" 
                      size={26} 
                      color={bookTravel ? "#fff" : "#667eea"} 
                    />
                    <Text style={[styles.optionText, bookTravel && styles.optionTextSelected]}>
                      Book Travel
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </AnimatedCard>

          {/* Submit Button */}
          <AnimatedCard index={5}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.9}
            >
              <View style={styles.submitGradient}>
                <View style={styles.submitGradientLayer} />
                <View style={styles.submitContent}>
                  <Icon name="send" size={22} color="#fff" />
                  <Text style={styles.submitText}>Send Request 🚀</Text>
                </View>
              </View>
            </TouchableOpacity>
          </AnimatedCard>
        </Animated.View>
      </Animated.ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}

      {/* Venue Options Modal */}
      <Modal
        visible={showVenueOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowVenueOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.venueModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Venue Type</Text>
              <TouchableOpacity 
                onPress={() => setShowVenueOptions(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.venueOptionsContainer} showsVerticalScrollIndicator={false}>
              {venueOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.venueOption,
                    venueType === option.value && styles.venueOptionSelected
                  ]}
                  onPress={() => {
                    setVenueType(option.value);
                    setShowVenueOptions(false);
                    if (errors.venueType) {
                      setErrors(prev => ({ ...prev, venueType: null }));
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.venueOptionGradient,
                    venueType === option.value && styles.venueOptionGradientSelected
                  ]}>
                    <Icon 
                      name={option.icon} 
                      size={28} 
                      color={option.color} 
                    />
                    <Text style={[
                      styles.venueOptionText,
                      venueType === option.value && styles.venueOptionTextSelected
                    ]}>
                      {option.label}
                    </Text>
                    {venueType === option.value && (
                      <Icon name="check-circle" size={22} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Enhanced Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModal}>
            {/* <View style={styles.successIcon}>
              <View style={styles.successIconGradient} />
              <Icon name="check" size={48} color="#fff" />
            </View> */}
            <Text style={styles.successTitle}>🎉 Request Sent!</Text>
            <Text style={styles.successMessage}>
              We'll get back to you soon with confirmation details.
            </Text>
            {/* <View style={styles.successDecorations}>
              <View style={styles.successDot} />
              <View style={styles.successDot} />
              <View style={styles.successDot} />
            </View> */}
          </View>
        </View>
      </Modal>
    {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8fafc',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
  },
  backgroundGradient: {
    flex: 1,
    backgroundColor: '#FF6B6B', // Added solid color fallback
  },
  backgroundLayer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B6B',
  },
  backgroundLayer3: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B6B',
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    paddingBottom: 40,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: -1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  decorationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  decorationLine: {
    width: 30,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 1,
  },
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  modernInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#cbd5e1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  inputIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#9ca3af',
    fontWeight: '500',
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginTop: 8,
    marginLeft: 6,
    fontWeight: '600',
  },
  optionsContainer: {
    marginBottom: 28,
  },
  optionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  modernOptionCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#cbd5e1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  optionGradient: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 12,
    backgroundColor: '#f8fafc',
  },
  optionGradientSelected: {
    backgroundColor: '#FF6B6B',
  },
  optionSelected: {
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#fff',
  },
  submitButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  submitGradient: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  submitGradientLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B6B',
  },
  submitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  venueModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: height * 0.75,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  venueOptionsContainer: {
    padding: 24,
  },
  venueOption: {
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#cbd5e1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  venueOptionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  venueOptionSelected: {
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  venueOptionText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 17,
    color: '#1f2937',
    fontWeight: '600',
  },
  venueOptionTextSelected: {
    color: '#000',
    fontWeight: '700',
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 48,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.35,
    shadowRadius: 32,
    elevation: 20,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  successDecorations: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    marginTop: 25
  },
  actionIcon: {
    padding: 12,
    backgroundColor: 'transparent',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    minHeight: 60,
  },
  actionIconActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});

export default ScheduleMeetScreen;