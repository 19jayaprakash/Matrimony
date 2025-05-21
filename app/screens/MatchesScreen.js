import { ChevronLeft, ChevronRight, Heart } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    PanResponder,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
 
// Get screen dimensions
const { width } = Dimensions.get('window');
 
// Sample data for matches with local images
const dummyMatches = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 28,
    location: 'Mumbai, India',
    photos: [
      require('@/assets/images/priya.jpg'),
      require('@/assets/images/sneha.jpeg'),
      require('@/assets/images/kavya.jpg'),
    ],
  },
  {
    id: '2',
    name: 'Sneha',
    age: 26,
    location: 'Delhi, India',
    photos: [
      require('@/assets/images/sneha.jpeg'),
      require('@/assets/images/priya.jpg'),
      require('@/assets/images/saro.jpg'),
    ],
  },
  {
    id: '3',
    name: 'Kavya',
    age: 27,
    location: 'Bangalore, India',
    photos: [
      require('@/assets/images/kavya.jpg'),
      require('@/assets/images/saro.jpg'),
      require('@/assets/images/priya.jpg'),
    ],
  },
  {
    id: '4',
    name: 'Saro',
    age: 27,
    location: 'Hyderabad, India',
    photos: [
      require('@/assets/images/saro.jpg'),
      require('@/assets/images/kavya.jpg'),
      require('@/assets/images/sneha.jpeg'),
    ],
  },
  {
    id: '5',
    name: 'Neha Kapoor',
    age: 26,
    location: 'Chennai, India',
    photos: [
      require('@/assets/images/kavya.jpg'),
      require('@/assets/images/priya.jpg'),
      require('@/assets/images/sneha.jpeg'),
    ],
  },
];
 
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
  // Create a reference to track the most recent card position component
  const currentPositionRef = useRef(null);
 
  const handleViewProfile = (id) => {
    console.log(`View profile with id: ${id}`);
    // Navigate to profile details screen
  };
 
  const handleSwipeLeft = () => {
    // Immediately show next profile without animation delay
    if (currentPositionRef.current) {
      currentPositionRef.current.setValue({ x: 0, y: 0 });
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyMatches.length);
  };
 
  const handleSwipeRight = () => {
    // Immediately show next profile without animation delay
    if (currentPositionRef.current) {
      currentPositionRef.current.setValue({ x: 0, y: 0 });
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyMatches.length);
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"  />
     
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
      </View>
     
      <View style={styles.cardsContainer}>
        {dummyMatches.map((match, index) => {
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
        {dummyMatches.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentIndex && styles.activeProgressDot,
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
 