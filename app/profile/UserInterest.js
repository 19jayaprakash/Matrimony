import axios from 'axios';
import {
  Activity,
  ChevronsRight,
  Globe,
  Headphones,
  Languages,
  Music,
  Plane,
  Salad,
  UtensilsCrossed,
  Wine
} from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import {useRouter} from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';




  const SelectableTagList = ({
  title,
  icon,
  items = [],
  selectedItems,
  setSelectedItems,
  handlePress
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 10);

  return (
    <FormSection title={title} icon={icon}>
      <View className="flex-row flex-wrap mb-4 gap-2">
        {displayedItems.map((item, index) => {
          const isSelected = selectedItems.includes(item);
          const backgroundColor = isSelected ? 'bg-pink-700' : 'bg-white';
          const textColor = isSelected ? 'text-white' : 'text-black';

          return (
            item ?
            <TouchableOpacity
              key={index}
              className={`${backgroundColor} border border-black rounded-full p-4`}
              style={{ paddingInline: "15px", paddingBlock: "5px" }}
              onPress={() => handlePress(item, selectedItems, setSelectedItems)}
            >
              <Text className={`${textColor} text-sm whitespace-nowrap`}>
                {item}
              </Text>
            </TouchableOpacity> : null
          );
        })}
      </View>

      {items.length > 10 && (
        <TouchableOpacity className="flex items-center justify-center" onPress={() => setShowAll(!showAll)}>
          <Text className="text-pink-600 underline ">
            {showAll ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>
      )}
    </FormSection>
  );
};


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


const MatrimonialProfile = () => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isMobile = width < 768;

  const[formData, setFormData] = useState({})
  const[dietPreferences,setDietPreferences] = useState([]);
  const router = useRouter();


  // useEffect(()=>{
  //   async function fetchDietPreferences() {
  //     await fetch(`http://stu.globalknowledgetech.com:5003/utility/diet-preferences`,{
  //       method: 'GET',
  //       headers: {
  //         'access-control-allow-origin': '*',
  //       },
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDietPreferences(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching diet preferences:', error);
  //     });
  //   }
  //   fetchDietPreferences();

  // },[]);

  // Form submission handler
  const handleSubmit = async() => {

    const token = await AsyncStorage.getItem("token");

    const json = JSON.stringify({
  "hobbiesAndInterests": selectedHobbies,
  "travelPreferences": selectedTravel,
  "musicOrMovieTastes": selectedMusic,
  "sportsAndFitness": selectedFitness,
  "socialCausesOfInterest": selectedCause,
  "languagesKnown": selectedLanguages,
  "cuisinePreferences": selectedCuisines,
  "habits": selectedHabits,
  "dietPreferences": selectedDiets,
})
    console.log('Form Data:', json);
    await axios.post(`http://stu.globalknowledgetech.com:5003/Interests/user-interests`, json,{
      headers : {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`,
      }
    })
    .then(res =>{
      if(res.status === 200){
        router.push("/profile/PartnerPreference")
      }
      
    })
    .catch(err =>{
      Alert("Network Error");
    })
  };

  const hobbies = [
  'Reading', 'Cooking', 'Gardening', 'Painting', 'Dancing',
  'Singing', 'Photography', 'Drawing', 'Crafting', 'Blogging',
];

const travelPreferences = [
  'Love to travel frequently',
  'Occasional trips',
  'Prefer short getaways',
  'Prefer staying at home',
  'Prefer international travel',
  'Prefer domestic travel',
  'Spiritual/religious trips',
  'Nature/adventure trips',
];

const musicMovieTastes = [
  'Bollywood', 'Classical', 'Pop', 'Rock', 'Jazz',
  'Devotional', 'Romantic movies', 'Action movies',
  'Comedy', 'Drama', 'Thriller', 'Art/indie films',
];

const fitnessActivities = [
  'Gym/Workout', 'Yoga', 'Running', 'Cycling', 'Swimming',
  'Cricket', 'Football', 'Badminton', 'Tennis', 'Hiking',
];

const socialCauses = [
  'Environment conservation', 'Animal welfare', 'Women empowerment',
  'Child education', 'Elderly care', 'LGBTQ+ rights',
  'Mental health awareness', 'Rural development',
  'Health and wellness', 'Community service',
];

const dietPreference = [
  "Vegetarian (Veg)",
  "Non-Vegetarian (Non-Veg)",
  "Vegan",
  "Jain",
  "Eggetarian",
  "Pescatarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Kosher",
  "Halal",
  "No Preference / Any"
]

const habits = [
  "Non-Smoker",
  "Occasional Smoker",
  "Regular Smoker",
  "Non-Drinker",
  "Occasional Drinker",
  "Regular Drinker",
  "No Habits / None"
]

const cuisinePreference = [
  // Indian Regional Cuisines
  			"North Indian","South Indian","Gujarati","Rajasthani","Bengali","Punjabi","Maharashtrian",
  			"Andhra","Kerala","Tamil","Kashmiri","Goan","Oriya (Odia)",
		// International Cuisines
  			"Chinese","Thai","Italian","Mexican","Continental","American","Mediterranean","Japanese",
  			"Korean","Lebanese","French","Spanish",
		// Dietary Styles / Lifestyle-Based
  			"Vegetarian","Eggetarian","Non-Vegetarian","Vegan","Jain Food","Satvik Food",
			"Gluten-free","Keto-Friendly","Organic Food","Ayurvedic Food",
		 // Other Popular Types
  			"Street Food","Fast Food","BBQ / Grilled","Seafood","Fusion Cuisine",
			"Homemade / Traditional","Raw Food"
]

const knownLanguages = [
  // Indian Languages
  		"Hindi","English","Tamil","Telugu","Kannada","Malayalam","Marathi","Gujarati","Bengali","Punjabi",
  		"Odia","Assamese","Konkani","Sanskrit","Urdu","Sindhi","Manipuri","Maithili","Rajasthani","Bodo",
  		"Santhali","Kashmiri","Dogri","Tulu",

		// Foreign / International Languages
  		"Arabic","French","German","Spanish","Portuguese","Russian","Japanese","Chinese (Mandarin)",
  		"Korean","Italian","Turkish","Persian (Farsi)","Nepali","Sinhala","Thai","Burmese","Hebrew",
  		"Swahili","Dutch","Greek","Hungarian","Czech","Polish","Romanian",
]

  

  const [selectedTravel, setSelectedTravel] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedFitness, setSelectedFitness] = useState([]);
  const [selectedCause, setSelectedCause] = useState([]);
  const[selectedHobbies, setSelectedHobbies] = useState([]);
  const[selectedDiets, setSelectedDiets] = useState([]);
  const[selectedHabits, setSelectedHabits] = useState([]);
  const[selectedCuisines, setSelectedCuisines] = useState([]);
  const[selectedLanguages, setSelectedLanguages] = useState([]);


  const handlePress = useCallback((item, variable, setVariable) => {
  if (variable.includes(item)) {
    setVariable(variable.filter((i) => i !== item));
  } else {
    setVariable([...variable, item]);
  }
}, []);


  
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
          
          {/* Hobbies/Interests */}
          <SelectableTagList
            title="Hobbies & Interests"
            icon={<Headphones size={24} color="#EC4899" />}
            items={hobbies}
            selectedItems={selectedHobbies}
            setSelectedItems={setSelectedHobbies}
            handlePress={handlePress}
          />

          {/* Travel Preferences */}
          <SelectableTagList
            title="Travel Preferences"
            icon={<Plane size={24} color="#EC4899" />}
            items={travelPreferences}
            selectedItems={selectedTravel}
            setSelectedItems={setSelectedTravel}
            handlePress={handlePress}
          />

          {/* Music / Movies Tastes */}
          <SelectableTagList
            title="Music / Movies Tastes"
            icon={<Music size={24} color="#EC4899" />}
            items={musicMovieTastes}
            selectedItems={selectedMusic}
            setSelectedItems={setSelectedMusic}
            handlePress={handlePress}
          />

          {/* Sports and Fitness Activities */}
          <SelectableTagList
            title="Sports and Fitness Activities"
            icon={<Activity size={24} color="#EC4899" />}
            items={fitnessActivities}
            selectedItems={selectedFitness}
            setSelectedItems={setSelectedFitness}
            handlePress={handlePress}
          />

          {/* Social causes of interest */}
          <SelectableTagList
            title="Social causes of interest"
            icon={<Globe size={24} color="#EC4899" />}
            items={socialCauses}
            selectedItems={selectedCause}
            setSelectedItems={setSelectedCause}
            handlePress={handlePress}
          />

          {/* Habits */}
          <SelectableTagList
            title="Habits"
            icon={<Wine size={24} color="#EC4899" />}
            items={habits}
            selectedItems={selectedHabits}
            setSelectedItems={setSelectedHabits}
            handlePress={handlePress}
          />

          {/* Diet Preferences */}
          <SelectableTagList
            title="Diet Preferences"
            icon={<Salad size={24} color="#EC4899" />}
            items={dietPreference}
            selectedItems={selectedDiets}
            setSelectedItems={setSelectedDiets}
            handlePress={handlePress}
          />

          {/* Cuisine Preference */}
          <SelectableTagList
            title="Cuisine Preferences"
            icon={<UtensilsCrossed size={24} color="#EC4899" />}
            items={cuisinePreference}
            selectedItems={selectedCuisines}
            setSelectedItems={setSelectedCuisines}
            handlePress={handlePress}
          />

          {/* Languages Known */}
          <SelectableTagList
            title="Languages Known"
            icon={<Languages size={24} color="#EC4899" />}
            items={knownLanguages}
            selectedItems={selectedLanguages}
            setSelectedItems={setSelectedLanguages
            }
            handlePress={handlePress}
          />

          
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