import { ChevronDown, ChevronLeft, ChevronRight, Heart, SlidersHorizontal } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    PanResponder,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
 
// Get screen dimensions
const { width } = Dimensions.get('window');
 
// Sample data for matches with local images
const dummyMatches = [
  {
    id: '1',
    name: 'Priya Sharma',
    gender:"FeMale",
    weight:"50kg",
    age: 20,
    height:"140cm",
    state:"Tamil Nadu",
    location: 'Mumbai',
    occupation:"Doctor",
    caste:"Caste B",
educationlevel:"Master",
region:"South",
lifestyle:"Active",
    photos: [
       require('@/assets/images/kavya.jpg'),
      require('@/assets/images/saro.jpg'),
      require('@/assets/images/priya.jpg'),
    ],
  },
  {
    id: '2',
    name: 'Rahul Patel',
    age: 32,
        height:"160cm",
    weight:"60kg",
        state:"Maharashtra",
caste:"Caste A",
        gender:"Male",
educationlevel:"Bachelor",
    location: 'Delhi',
    lifestyle:"Sedentary",
    region:"North",
        occupation:"Teacher",
    photos: [
    require('@/assets/images/kavya.jpg'),
      require('@/assets/images/saro.jpg'),
      require('@/assets/images/priya.jpg'),
    ],
  },
  {
    id: '3',
    name: 'Ananya Gupta',
        height:"150cm",
    weight:"58kg",
    caste:"Caste C",
educationlevel:"PhD",
    occupation:"Engineer",
        state:"Maharashtra",
region:"North",
    age: 27,
        gender:"FeMale",
lifestyle:"Moderate",
    location: 'Bangalore',
    photos: [
            require('@/assets/images/priya.jpg'),
 require('@/assets/images/kavya.jpg'),
      require('@/assets/images/saro.jpg'),
    ],
  },
  {
    id: '4',
    name: 'Vikram Singh',
            state:"Kerala",
            educationlevel:"High School",
    occupation:"Artist",
    region:"South",
caste:"Caste A",
        height:"155cm",
    weight:"68kg",
    age: 36,
        gender:"Male",
lifestyle:"Active",
    location: 'Kochi',
    photos: [
     require('@/assets/images/kavya.jpg'),
      require('@/assets/images/saro.jpg'),
      require('@/assets/images/priya.jpg'),
    ],
  },
  {
    id: '5',
    name: 'Neha Kapoor',
    age: 26,
    caste:"Caste C",
educationlevel:"PhD",
region:"South",
region:"East",
    occupation:"Doctor",
        height:"165cm",
    weight:"45kg",
            state:"Tamil Nadu",
        gender:"FeMale",
lifestyle:"Active",
    location: 'Chennai',
    photos: [
      require('@/assets/images/saro.jpg'),
         require('@/assets/images/kavya.jpg'),
      require('@/assets/images/priya.jpg'),
    ],
  },
];
 const ageRanges = ['18-25', '26-35', '36-45', '46+'];
const heightRanges = ['150-160 cm', '161-170 cm', '171-180 cm', '181+ cm'];
const weightRanges = ['50-60 kg', '61-70 kg', '71-80 kg', '81+ kg'];
const educationLevels = ['High School', 'Bachelor', 'Master', 'PhD'];
const occupations = ['Engineer', 'Doctor', 'Artist', 'Teacher'];
const states = ['Tamil Nadu', 'Kerala', 'Maharashtra'];
const cities = ['Chennai', 'Mumbai', 'Kochi'];
const regions = ['North', 'South', 'East', 'West'];
const castes = ['Caste A', 'Caste B', 'Caste C'];
const lifestyles = ['Active', 'Moderate', 'Sedentary'];
 
const PhotoCarousel = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
 
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };
 
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };
 
  return (
    <View style={styles.carouselContainer}>
      <Image source={photos[activeIndex]} style={styles.image} />
     
      {photos.length > 1 && (
        <>
          <TouchableOpacity style={[styles.carouselButton, styles.prevButton]} onPress={handlePrev}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
         
          <TouchableOpacity style={[styles.carouselButton, styles.nextButton]} onPress={handleNext}>
            <ChevronRight size={24} color="#FFFFFF" />
          </TouchableOpacity>
         
          <View style={styles.pagination}>
            {photos.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};
 
const SwipeableCard = ({ match, onViewProfile, onSwipeLeft, onSwipeRight, positionRef }) => {
  const position = useRef(new Animated.ValueXY()).current;
 
  // Store the position reference for parent component's access
  useEffect(() => {
    if (positionRef) {
      positionRef.current = position;
    }
  }, [positionRef]);
 
  const rotation = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
 
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          // Swipe right - immediately call the handler without animation
          onSwipeRight();
        } else if (gesture.dx < -120) {
          // Swipe left - immediately call the handler without animation
          onSwipeLeft();
        } else {
          // Reset position if not swiped far enough
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;
 
  const cardStyle = {
    transform: [
      { translateX: position.x },
      { rotate: rotation },
    ],
  };
 
  return (
    <Animated.View
      style={[styles.card, cardStyle]}
      {...panResponder.panHandlers}
    >
      <PhotoCarousel photos={match.photos} />
     
      <View style={styles.cardContent}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{match.name}, {match.age}</Text>
          <Text style={styles.location}>{match.location}</Text>
        </View>
       
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => onViewProfile(match.id)}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.likeButton}>
            <Heart size={22} color="#EC4899" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};
 
const MatchesScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
const [filteredMatches, setFilteredMatches] = useState(dummyMatches);
   // Create a reference to track the most recent card position component
  const currentPositionRef = useRef(null);
const [modalVisible, setModalVisible] = useState(false);
const [modalTitle, setModalTitle] = useState('');
const [modalOptions, setModalOptions] = useState([]);
const [onSelectModalOption, setOnSelectModalOption] = useState(() => () => {});
  const [selectedGender, setSelectedGender] = useState(null);
   const [selectedAge, setSelectedAge] = useState(null);
  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCaste, setSelectedCaste] = useState(null);
  const [selectedLifestyle, setSelectedLifestyle] = useState(null);
  const showFilterModal = (title, options, onSelect) => {
  setModalTitle(title);
  setModalOptions(options);
  setOnSelectModalOption(() => onSelect);
  setModalVisible(true);
};
    const applyFilters = (filter={}) => {
const gender=filter.gender || selectedGender
const state=filter.state || selectedState
const city=filter.city || selectedCity
const age=filter.age || selectedAge
     let minAge = 0;
  let maxAge = Infinity;
  let minHeight = 0;
  let maxHeight = Infinity;
let minWeight=0;
let maxWeight=Infinity;
 
  if (selectedHeight) {
    if (selectedHeight.includes('-')) {
      [minHeight, maxHeight] = selectedHeight.replace(' cm', '').split('-').map(Number);
    } else if (selectedHeight.includes('+')) {
      minHeight = parseInt(selectedHeight);
    }
  }
    if (selectedWeight) {
    if (selectedWeight.includes('-')) {
      [minWeight, maxWeight] = selectedWeight.replace('kg', '').split('-').map(Number);
    } else if (selectedWeight.includes('+')) {
      minWeight = parseInt(selectedWeight);
    }
  }
  if (age) {
    if (age.includes('-')) {
      [minAge, maxAge] = age.split('-').map(Number);
    } else if (age === '46+') {
      minAge = 46;
    }
  }
    const filtered = dummyMatches.filter(match => {
     return (
      (!gender || match.gender === gender) &&
      (!age || (match.age >= minAge && match.age <= maxAge)) &&
      (!selectedHeight ||(parseInt(match.height) >= minHeight && parseInt(match.height) <= maxHeight))&&
      (!selectedWeight ||(parseInt(match.weight) >= minWeight && parseInt(match.weight) <= maxWeight))&&
      (!selectedEducation || match.educationlevel === selectedEducation) &&
      (!selectedOccupation || match.occupation === selectedOccupation) &&
      (!state || match.state === state) &&
      (!city || match.location === city) &&
      (!selectedRegion || match.region === selectedRegion) &&
      (!selectedCaste || match.caste === selectedCaste) &&
      (!selectedLifestyle || match.lifestyle === selectedLifestyle)
    );
  });
 
   
console.log('filtered',filtered);
 
    setFilteredMatches(filtered);
    setCurrentIndex(0);
    setShowFilter(false);
    console.log(selectedAge);
 
  };
   const Filterclose = () => {
   setSelectedGender(null);
  setSelectedAge(null);
  setSelectedHeight(null);
  setSelectedWeight(null);
  setSelectedEducation(null);
  setSelectedOccupation(null);
  setSelectedState(null);
  setSelectedCity(null);
  setSelectedRegion(null);
  setSelectedCaste(null);
  setSelectedLifestyle(null);
  setFilteredMatches(dummyMatches);
  setCurrentIndex(0);
  setShowFilter(false)
    }
 const FilterOverlay = () => {
  return (
    <View style={[styles.overlay, { display: showFilter ? 'flex' : 'none' }]}>
      <Text style={styles.filterTitle}>Filter Matches</Text>
      <View>
       
      </View>
<ScrollView contentContainerStyle={styles.scrollContent}  keyboardShouldPersistTaps="handled">
 
        <Text style={styles.filterLabel}>Gender</Text>
         <RNPickerSelect value={selectedGender} onValueChange={setSelectedGender}
items={[
  { label: "Male", value: "Male" },
  { label: "FeMale", value: "FeMale" },
]}              />
       
         <Text style={styles.filterLabel}>Age Range</Text>
<RNPickerSelect onValueChange={setSelectedAge} value={selectedAge} items={ageRanges.map(value => ({ label: value, value }))} />
   
 
      <Text style={styles.filterLabel}>Height Range</Text>
      <RNPickerSelect onValueChange={setSelectedHeight} value={selectedHeight} items={heightRanges.map(value => ({ label: value, value }))} />
 
      <Text style={styles.filterLabel}>Weight Range</Text>
      <RNPickerSelect onValueChange={setSelectedWeight} value={selectedWeight} items={weightRanges.map(value => ({ label: value, value }))} />
 
      <Text style={styles.filterLabel}>Education Level</Text>
      <RNPickerSelect onValueChange={setSelectedEducation} value={selectedEducation} items={educationLevels.map(value => ({ label: value, value }))} />
 
      <Text style={styles.filterLabel}>Occupation</Text>
      <RNPickerSelect onValueChange={setSelectedOccupation} value={selectedOccupation} items={occupations.map(value => ({ label: value, value }))} />
 
      <Text style={styles.filterLabel}>State</Text>
      <RNPickerSelect onValueChange={setSelectedState} value={selectedState} items={states.map(value => ({ label: value, value }))} />
 
      <Text style={styles.filterLabel}>City</Text>
      <RNPickerSelect onValueChange={setSelectedCity} value={selectedCity} items={cities.map(value => ({ label: value, value }))} />
 
      <Text style={styles.filterLabel}>Region</Text>
      <RNPickerSelect onValueChange={setSelectedRegion} value={selectedRegion} items={regions.map(value => ({ label: value, value }))} />
 
      <Text style={styles.filterLabel}>Caste</Text>
      <RNPickerSelect onValueChange={setSelectedCaste} value={selectedCaste} items={castes.map(value => ({ label: value, value }))} />
 
      <Text style={styles.filterLabel}>Lifestyle</Text>
      <RNPickerSelect onValueChange={setSelectedLifestyle} value={selectedLifestyle} items={lifestyles.map(value => ({ label: value, value }))} />
 
</ScrollView>
      <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
        <Text style={styles.applyButtonText}>Apply Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.CloseButton}  onPress={Filterclose}>
        <Text style={styles.CloseButtonText}>Clear Filter</Text>
      </TouchableOpacity>
    </View>
  );
};
  const handleViewProfile = (id) => {
    console.log(`View profile with id: ${id}`);
    // Navigate to profile details screen
  };
 
  const handleSwipeLeft = () => {
    // Immediately show next profile without animation delay
    if (currentPositionRef.current) {
      currentPositionRef.current.setValue({ x: 0, y: 0 });
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredMatches.length);
  };
 
  const handleSwipeRight = () => {
    // Immediately show next profile without animation delay
    if (currentPositionRef.current) {
      currentPositionRef.current.setValue({ x: 0, y: 0 });
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredMatches.length);
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"  />
     
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
      </View>
     <View className='flex flex-row ' style={{overflowY:"scroll",width:"50px"}}>
  <TouchableOpacity style={styles.mainfilterIcon} onPress={() => setShowFilter(true)}>
    <SlidersHorizontal size={24} color="black" />
    <Text style={styles.CloseButtonText}>Filter</Text>
  </TouchableOpacity>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
 
 <TouchableOpacity
  style={styles.filterIcon}
  onPress={() =>
    showFilterModal('Gender', ['Male', 'FeMale'], (selected) => {
      setSelectedGender(selected);
      applyFilters({ gender: selected });
    })
  }
>
  <Text style={styles.CloseButtonText}>
    {selectedGender ? selectedGender : 'Gender'}
  </Text>
  <ChevronDown size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity
  style={styles.filterIcon}
  onPress={() =>
    showFilterModal('Age',ageRanges, (selected) => {
      setSelectedAge(selected);
      applyFilters({ age: selected });
    })
  }
>
  <Text style={styles.CloseButtonText}>
    {selectedAge ? selectedAge : 'Age'}
  </Text>
  <ChevronDown size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity
  style={styles.filterIcon}
  onPress={() =>
    showFilterModal('State',states, (selected) => {
      setSelectedState(selected);
      applyFilters({ state: selected });
    })
  }
>
  <Text style={styles.CloseButtonText}>
    {selectedState ? selectedState : 'State'}
  </Text>
  <ChevronDown size={24} color="black" />
</TouchableOpacity>
<TouchableOpacity
  style={styles.filterIcon}
  onPress={() =>
    showFilterModal('Cities',cities, (selected) => {
      setSelectedCity(selected);
      applyFilters({ city: selected });
    })
  }
>
  <Text style={styles.CloseButtonText}>
    {selectedCity ? selectedCity : 'City'}
  </Text>
  <ChevronDown size={24} color="black" />
</TouchableOpacity>
  </ScrollView>
 
</View>
 
<Modal
  visible={modalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setModalVisible(false)}
>
  <TouchableOpacity
    style={styles.modalOverlay}
    activeOpacity={1}
    onPressOut={() => setModalVisible(false)}
  >
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{modalTitle}</Text>
      {modalOptions.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => {
            onSelectModalOption(option);
            setModalVisible(false);
          }}
        >
          <Text style={styles.genderOption}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </TouchableOpacity>
</Modal>
      <View style={styles.cardsContainer}>
        {filteredMatches.map((match, index) => {
          if (index === currentIndex) {
            return (
              <SwipeableCard
                key={match.id}
                match={match}
                onViewProfile={handleViewProfile}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                positionRef={currentPositionRef}
              />
            );
          }
          return null;
        })}
      </View>
 
 
      <View style={styles.progressIndicator}>
        {filteredMatches.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentIndex && styles.activeProgressDot,
            ]}
          />
        ))}
      </View>
         <FilterOverlay />
 
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
    filterIcon: {
    display:'flex',
 
    flexDirection:"row",
    gap:10,
width: 'auto',
alignSelf: 'flex-start',
margin:10,
borderWidth:2,
borderColor:"black",
borderRadius:8,
padding:8
},
  mainfilterIcon: {
    position:"relative",
    backgroundColor:"#f5ccd4",
    display:'flex',
    flexDirection:"row",
    gap:10,
width: 'auto',
alignSelf: 'flex-start',
margin:10,
borderWidth:2,
borderColor:"black",
borderRadius:8,
padding:8
},
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#EC4899',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
     dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    color: '#999',
  },
  selectedTextStyle: {
    color: '#000',
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.2)',
},
modalContent: {
  backgroundColor: 'white',
  padding: 16,
  borderRadius: 8,
  width: 200,
  elevation: 5,
},
genderOption: {
  paddingVertical: 10,
  fontSize: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'white',
  zIndex: 10,
  paddingHorizontal: 20,
  paddingTop: 20,
  zIndex: 999,
elevation: 10,
},
 scrollContent: {
      overflow:"scroll",
  },
filterTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
},
filterSection: {
  marginBottom: 20,
  zIndex:1000,
},
filterLabel: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 10,
},
filterOptions: {
  flexDirection: 'row',
  justifyContent: 'space-around',
},
filterOption: {
  padding: 10,
  borderWidth: 1,
  borderRadius: 8,
  borderColor: '#CCCCCC',
  width: '40%',
  alignItems: 'center',
},
selectedOption: {
  backgroundColor: '#EC4899',
  borderColor: '#EC4899',
  color: '#FFFFFF',
},
applyButton: {
  backgroundColor: '#EC4899',
  padding: 14,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 20,
},
CloseButton: {
  backgroundColor: '#ffff',
  padding: 14,
  borderRadius: 8,
    alignItems: 'center',
  marginTop: 20,
  borderWidth:2,
},
CloseButtonText: {
  color: 'Black',
  fontSize: 18,
  fontWeight: '700',
},
applyButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},
  card: {
    position: 'absolute',
    width: width - 24,
    height: 600, // Increased height for bigger card
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  carouselContainer: {
    width: '100%',
    height: 500,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(236, 72, 153, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  location: {
    fontSize: 16,
    color: '#666666',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#EC4899',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 14,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  likeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 4,
  },
  activeProgressDot: {
    backgroundColor: '#EC4899',
    width: 25,
    height: 10,
    borderRadius: 5,
  },
  swipeInstructions: {
    // padding: 15,
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  swipeText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '500',
  },
});
 
export default MatchesScreen;
 
 