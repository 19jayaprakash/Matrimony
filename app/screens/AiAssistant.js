

// import React from 'react';
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';

// const MatrimonyHomeScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="white" />
      
//       {/* Header with gradient background */}
//       <View style={styles.header}>
//         <View style={styles.tabContainer}>
//           <TouchableOpacity style={styles.activeTab}>
//             <Text style={styles.activeTabText}>Regular</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.inactiveTab}>
//             <Text style={styles.inactiveTabText}>PRIME ●</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.searchIcon}>
//             <Feather name="search" size={20} color="#FFF" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* User Profile Section */}
//       <View style={styles.profileSection}>
//         <View style={styles.profileHeader}>
//           <View style={styles.profileLeft}>
//             <View style={styles.avatarContainer}>
//               <View style={styles.avatar}>
//                 <Text style={styles.avatarText}>👤</Text>
//               </View>
//               <View style={styles.cameraIcon}>
//                 <Feather name="camera" size={12} color="#FFF" />
//               </View>
//             </View>
//             <View style={styles.profileInfo}>
//               <Text style={styles.userName}>Jaya Prakash</Text>
//               <Text style={styles.appName}>VivaahAI Matrimony</Text>
//               <View style={styles.membershipContainer}>
//                 <Text style={styles.membershipText}>Free Member</Text>
//                 <TouchableOpacity style={styles.upgradeButton}>
//                   <Text style={styles.upgradeText}>Upgrade</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//           <View style={styles.profileRight}>
//             <TouchableOpacity style={styles.iconButton}>
//               <Feather name="bell" size={24} color="#FF6B6B" />
//               <View style={styles.notificationBadge}>
//                 <Text style={styles.badgeText}>3</Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButton}>
//               <Feather name="menu" size={24} color="#FF6B6B" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionButtonsContainer}>
//         <TouchableOpacity style={styles.actionButton}>
//           <View style={styles.actionIconContainer}>
//             <View style={[styles.actionIcon, { backgroundColor: '#E8F5E8' }]}>
//               <Feather name="camera" size={24} color="#4CAF50" />
//               <View style={[styles.plusIcon, { backgroundColor: '#4CAF50' }]}>
//                 <Feather name="plus" size={12} color="#FFF" />
//               </View>
//             </View>
//           </View>
//           <Text style={styles.actionButtonText}>Add</Text>
//           <Text style={styles.actionButtonSubText}>Photo(s)</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionButton}>
//           <View style={styles.actionIconContainer}>
//             <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
//               <Feather name="shield-check" size={24} color="#2196F3" />
//               <View style={[styles.plusIcon, { backgroundColor: '#2196F3' }]}>
//                 <Feather name="plus" size={12} color="#FFF" />
//               </View>
//             </View>
//           </View>
//           <Text style={styles.actionButtonText}>Verify</Text>
//           <Text style={styles.actionButtonSubText}>Profile</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionButton}>
//           <View style={styles.actionIconContainer}>
//             <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
//               <Feather name="star" size={24} color="#9C27B0" />
//               <View style={[styles.plusIcon, { backgroundColor: '#9C27B0' }]}>
//                 <Feather name="plus" size={12} color="#FFF" />
//               </View>
//             </View>
//           </View>
//           <Text style={styles.actionButtonText}>Add</Text>
//           <Text style={styles.actionButtonSubText}>Horoscope</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Recommendations Section */}
//       <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         <View style={styles.recommendationsSection}>
//           <View style={styles.recommendationsHeader}>
//             <View>
//               <Text style={styles.recommendationsTitle}>💕 Daily Recommendations</Text>
//               <Text style={styles.recommendationsSubtitle}>Recommended matches for today</Text>
//             </View>
//             <View style={styles.timerContainer}>
//               <Text style={styles.timerLabel}>⏰ Time left to view</Text>
//               <Text style={styles.timerTime}>09h:35m:07s</Text>
//             </View>
//           </View>

//           {/* Profile Cards */}
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profileCardsContainer}>
//             <View style={styles.profileCard}>
//               <View style={styles.profileImageContainer}>
//                 <Image
//                   source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616c9c1293a?w=200&h=250&fit=crop&crop=face' }}
//                   style={styles.profileCardImage}
//                 />
//                 <View style={styles.onlineIndicator} />
//               </View>
//               <View style={styles.profileCardInfo}>
//                 <Text style={styles.profileCardName}>Rajilakshmi</Text>
//                 <Text style={styles.profileCardDetails}>20 Yrs, 5'0"</Text>
//                 <View style={styles.locationRow}>
//                   <Feather name="map-pin" size={12} color="#FF6B6B" />
//                   <Text style={styles.locationText}>Chennai</Text>
//                 </View>
//               </View>
//               <TouchableOpacity style={styles.heartButton}>
//                 <Feather name="heart" size={16} color="#FF6B6B" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.profileCard}>
//               <View style={styles.profileImageContainer}>
//                 <Image
//                   source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=250&fit=crop&crop=face' }}
//                   style={styles.profileCardImage}
//                 />
//                 <View style={styles.onlineIndicator} />
//               </View>
//               <View style={styles.profileCardInfo}>
//                 <Text style={styles.profileCardName}>Sweetrani</Text>
//                 <Text style={styles.profileCardDetails}>18 Yrs, 5'0"</Text>
//                 <View style={styles.locationRow}>
//                   <Feather name="map-pin" size={12} color="#FF6B6B" />
//                   <Text style={styles.locationText}>Bangalore</Text>
//                 </View>
//               </View>
//               <TouchableOpacity style={styles.heartButton}>
//                 <Feather name="heart" size={16} color="#FF6B6B" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.profileCard}>
//               <View style={styles.profileImageContainer}>
//                 <Image
//                   source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=250&fit=crop&crop=face' }}
//                   style={styles.profileCardImage}
//                 />
//                 <View style={styles.onlineIndicator} />
//               </View>
//               <View style={styles.profileCardInfo}>
//                 <Text style={styles.profileCardName}>Sujitha.M</Text>
//                 <Text style={styles.profileCardDetails}>22 Yrs, 5'1"</Text>
//                 <View style={styles.locationRow}>
//                   <Feather name="map-pin" size={12} color="#FF6B6B" />
//                   <Text style={styles.locationText}>Mumbai</Text>
//                 </View>
//               </View>
//               <TouchableOpacity style={styles.heartButton}>
//                 <Feather name="heart" size={16} color="#FF6B6B" />
//               </TouchableOpacity>
//             </View>
//           </ScrollView>

//           <TouchableOpacity style={styles.viewAllButton}>
//             <Text style={styles.viewAllText}>View all matches</Text>
//             <Feather name="arrow-right" size={16} color="#FF6B6B" />
//           </TouchableOpacity>

//           {/* Quick Stats Section */}
//           <View style={styles.statsSection}>
//             <Text style={styles.statsTitle}>📊 Your Profile Stats</Text>
//             <View style={styles.statsContainer}>
//               <View style={styles.statItem}>
//                 <Text style={styles.statNumber}>127</Text>
//                 <Text style={styles.statLabel}>Profile Views</Text>
//               </View>
//               <View style={styles.statItem}>
//                 <Text style={styles.statNumber}>23</Text>
//                 <Text style={styles.statLabel}>Interests</Text>
//               </View>
//               <View style={styles.statItem}>
//                 <Text style={styles.statNumber}>8</Text>
//                 <Text style={styles.statLabel}>Matches</Text>
//               </View>
//             </View>
//           </View>

//           {/* Tips Section */}
//           <View style={styles.tipsSection}>
//             <Text style={styles.tipsTitle}>💡 Profile Tips</Text>
//             <View style={styles.tipCard}>
//               <View style={styles.tipIcon}>
//                 <Feather name="camera" size={20} color="#FFF" />
//               </View>
//               <View style={styles.tipContent}>
//                 <Text style={styles.tipText}>Add more photos to get 3x more profile views!</Text>
//                 <TouchableOpacity style={styles.tipButton}>
//                   <Text style={styles.tipButtonText}>Add Photos</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Bottom Navigation
//       <View style={styles.bottomNavigation}>
//         <TouchableOpacity style={styles.navItem}>
//           <Feather name="home" size={20} color="#4CAF50" />
//           <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Feather name="search" size={20} color="#666" />
//           <Text style={styles.navText}>Search</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Feather name="heart" size={20} color="#666" />
//           <Text style={styles.navText}>Matches</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Feather name="message-circle" size={20} color="#666" />
//           <Text style={styles.navText}>Chat</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Feather name="user" size={20} color="#666" />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View> */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     backgroundColor: '#FF6B6B',
//     paddingHorizontal: 16,
//     paddingVertical: 15,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   activeTab: {
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 25,
//     marginRight: 15,
//   },
//   activeTabText: {
//     color: '#FFF',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   inactiveTab: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   inactiveTabText: {
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   searchIcon: {
//     marginLeft: 'auto',
//     padding: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 20,
//   },
//   profileSection: {
//     backgroundColor: '#FFF',
//     marginHorizontal: 16,
//     marginTop: -10,
//     borderRadius: 16,
//     padding: 20,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     marginBottom: 20,
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   profileLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginRight: 15,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#FFE5E5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: '#FF6B6B',
//   },
//   avatarText: {
//     fontSize: 28,
//   },
//   cameraIcon: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: '#4CAF50',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFF',
//   },
//   profileInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 4,
//   },
//   appName: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   membershipContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   membershipText: {
//     fontSize: 14,
//     color: '#666',
//     marginRight: 12,
//   },
//   upgradeButton: {
//     backgroundColor: '#FF6B6B',
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 15,
//   },
//   upgradeText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   profileRight: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   iconButton: {
//     position: 'relative',
//     padding: 8,
//     backgroundColor: '#F8F9FA',
//     borderRadius: 20,
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     backgroundColor: '#FF4444',
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: '#FFF',
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 20,
//     marginBottom: 25,
//   },
//   actionButton: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   actionIconContainer: {
//     position: 'relative',
//     marginBottom: 12,
//   },
//   actionIcon: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   plusIcon: {
//     position: 'absolute',
//     bottom: 2,
//     right: 2,
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFF',
//   },
//   actionButtonText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 2,
//   },
//   actionButtonSubText: {
//     fontSize: 12,
//     color: '#666',
//   },
//   scrollContainer: {
//     flex: 1,
//     paddingBottom: 80,
//   },
//   recommendationsSection: {
//     paddingHorizontal: 16,
//   },
//   recommendationsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 20,
//     flexWrap: 'wrap',
//   },
//   recommendationsTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 6,
//   },
//   recommendationsSubtitle: {
//     fontSize: 14,
//     color: '#666',
//   },
//   timerContainer: {
//     backgroundColor: '#4CAF50',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 12,
//     alignItems: 'center',
//     minWidth: 120,
//   },
//   timerLabel: {
//     fontSize: 11,
//     color: '#FFF',
//     marginBottom: 4,
//   },
//   timerTime: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#FFF',
//   },
//   profileCardsContainer: {
//     marginBottom: 25,
//     padding:5
//   },
//   profileCard: {
//     width: 160,
//     marginRight: 16,
//     backgroundColor: '#FFF',
//     borderRadius: 16,
//     overflow: 'hidden',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     position: 'relative',
//   },
//   profileImageContainer: {
//     position: 'relative',
//   },
//   profileCardImage: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#E0E0E0',
//   },
//   onlineIndicator: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#4CAF50',
//     borderWidth: 2,
//     borderColor: '#FFF',
//   },
//   heartButton: {
//     position: 'absolute',
//     bottom: 80,
//     right: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 20,
//     padding: 8,
//   },
//   profileCardInfo: {
//     padding: 16,
//   },
//   profileCardName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },
//   profileCardDetails: {
//     fontSize: 13,
//     color: '#666',
//     marginBottom: 8,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   locationText: {
//     fontSize: 12,
//     color: '#666',
//     marginLeft: 4,
//   },
//   viewAllButton: {
//     backgroundColor: '#FFF',
//     borderWidth: 2,
//     borderColor: '#FF6B6B',
//     paddingVertical: 16,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginBottom: 25,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   viewAllText: {
//     color: '#FF6B6B',
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 8,
//   },
//   statsSection: {
//     backgroundColor: '#FFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   statsTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 16,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#FF6B6B',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#666',
//   },
//   tipsSection: {
//     marginBottom: 20,
//   },
//   tipsTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 16,
//   },
//   tipCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 16,
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   tipIcon: {
//     backgroundColor: '#FF6B6B',
//     borderRadius: 25,
//     padding: 12,
//     marginRight: 16,
//   },
//   tipContent: {
//     flex: 1,
//   },
//   tipText: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//   },
//   tipButton: {
//     backgroundColor: '#E3F2FD',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//   },
//   tipButtonText: {
//     color: '#2196F3',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   bottomNavigation: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     backgroundColor: '#FFF',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#E0E0E0',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   navText: {
//     fontSize: 11,
//     color: '#666',
//     marginTop: 4,
//     fontWeight: '500',
//   },
//   activeNavText: {
//     color: '#4CAF50',
//     fontWeight: '600',
//   },
// });

// export default MatrimonyHomeScreen;




import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const MatrimonyAIAssist = () => {
  const [currentStep, setCurrentStep] = useState('story'); // 'story', 'details', 'confirmed', 'editing', 'continued'
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedStory, setEditedStory] = useState('');
  const [continuedMessage, setContinuedMessage] = useState('');

  // Hardcoded user story
  const userStory = "Hi, my name is Jayaprakash and I'm 24 years old. I work as a Software Engineer at TCS in Chennai. I completed my B.Tech in Computer Science from Anna University. I love playing cricket on weekends and I'm also passionate about photography. I enjoy traveling to hill stations and trying different cuisines. I come from a middle-class family - my father is a bank manager and my mother is a teacher. I have one younger sister who is pursuing her engineering degree. We are a close-knit family and follow Hindu traditions. I'm looking for a life partner who shares similar values and interests. I prefer someone who is educated, family-oriented, and has a good sense of humor. I'm open to working women and believe in mutual respect in relationships.";

  // Extracted details from the story
  const extractedDetails = {
    name: "Jayaprakash",
    age: "24",
    profession: "Software Engineer",
    company: "TCS",
    location: "Chennai",
    education: "B.Tech in Computer Science from Anna University",
    hobbies: "Cricket, Photography, Traveling, Food",
    fatherOccupation: "Bank Manager",
    motherOccupation: "Teacher",
    siblings: "1 younger sister (Engineering student)",
    religion: "Hindu",
    familyType: "Middle-class, close-knit family",
    partnerPreference: "Educated, family-oriented, good sense of humor, respectful"
  };

  const handleSendStory = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('details');
    }, 2000);
  };

  const handleConfirmDetails = () => {
    setCurrentStep('confirmed');
    // Automatically show input field after 1 second
    setTimeout(() => {
      setCurrentStep('continued');
    }, 1000);
  };

  const handleEditDetails = () => {
    setEditedStory(userStory);
    setCurrentStep('editing');
  };

  const handleSaveEdits = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('details');
    }, 2000);
  };

  const handleSendContinuedMessage = () => {
    if (continuedMessage.trim()) {
      // Here you can add logic to process the continued conversation
      setContinuedMessage('');
      // For demo purposes, just show a simple response
      setTimeout(() => {
        // Add any additional AI responses here if needed
      }, 1000);
    }
  };

  const LoadingDots = () => (
    <View style={styles.loadingContainer}>
      <View style={[styles.dot, styles.dot1]} />
      <View style={[styles.dot, styles.dot2]} />
      <View style={[styles.dot, styles.dot3]} />
      <Text style={styles.loadingText}>Processing your story...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"  />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <View style={styles.botIcon}>
              <Feather name="cpu" size={16} color="#FFF" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>AI Assistant</Text>
              <Text style={styles.headerSubtitle}>Profile Creation Helper</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        {/* AI Welcome Message */}
        <View style={styles.messageRow}>
          <View style={styles.botAvatar}>
            <Feather name="cpu" size={16} color="#FFF" />
          </View>
          <View style={[styles.messageBubble, styles.botMessage]}>
            <Text style={styles.messageText}>
            Let's make you irresistible! Share your story and ideal match - I'll do the magic!
            </Text>
          </View>
        </View>

        {/* User Story Message */}
        {currentStep !== 'story' && (
          <View style={[styles.messageRow, styles.userMessageRow]}>
            <View style={[styles.messageBubble, styles.userMessage]}>
              <Text style={styles.userMessageText}>{userStory}</Text>
            </View>
            <View style={styles.userAvatar}>
              <Feather name="user" size={16} color="#666" />
            </View>
          </View>
        )}

        {/* Processing Message */}
        {isProcessing && (
          <View style={styles.messageRow}>
            <View style={styles.botAvatar}>
              <Feather name="cpu" size={16} color="#FFF" />
            </View>
            <View style={[styles.messageBubble, styles.botMessage]}>
              <LoadingDots />
            </View>
          </View>
        )}

        {/* AI Response with Details */}
        {currentStep === 'details' && (
          <View style={styles.messageRow}>
            <View style={styles.botAvatar}>
              <Feather name="cpu" size={16} color="#FFF" />
            </View>
            <View style={[styles.messageBubble, styles.botMessage, styles.detailsMessage]}>
              <Text style={styles.messageText}>
                Great! I've extracted the following details from your story. Please review and confirm:
              </Text>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Name:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Age:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.age}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Profession:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.profession}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Company:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.company}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Education:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.education}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Hobbies:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.hobbies}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Father's Job:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.fatherOccupation}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Mother's Job:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.motherOccupation}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Siblings:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.siblings}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Family:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.familyType}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Religion:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.religion}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Partner Preference:</Text>
                  <Text style={styles.detailValue}>{extractedDetails.partnerPreference}</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDetails}>
                  <Feather name="check-circle" size={16} color="#FFF" />
                  <Text style={styles.confirmButtonText}>Confirm Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={handleEditDetails}>
                  <Text style={styles.editButtonText}>Edit Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Edit Story Message */}
        {currentStep === 'editing' && (
          <View style={styles.messageRow}>
            <View style={styles.botAvatar}>
              <Feather name="cpu" size={16} color="#FFF" />
            </View>
            <View style={[styles.messageBubble, styles.botMessage, styles.detailsMessage]}>
              <Text style={styles.messageText}>
                Please edit your story below and click send to reprocess:
              </Text>
            </View>
          </View>
        )}

        {/* Confirmation Message */}
        {(currentStep === 'confirmed' || currentStep === 'continued') && (
          <View style={styles.messageRow}>
            <View style={styles.botAvatar}>
              <Feather name="cpu" size={16} color="#FFF" />
            </View>
            <View style={[styles.messageBubble, styles.botMessage]}>
              <View style={styles.successContainer}>
                <Feather name="check-circle" size={48} color="#4CAF50" />
                <Text style={styles.successTitle}>Data Submitted Successfully!</Text>
                <Text style={styles.successText}>
                  Your profile information has been saved. Our team will review and activate your profile shortly.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Continue conversation prompt */}
        {currentStep === 'continued' && (
          <View style={styles.messageRow}>
            <View style={styles.botAvatar}>
              <Feather name="cpu" size={16} color="#FFF" />
            </View>
            <View style={[styles.messageBubble, styles.botMessage]}>
              <Text style={styles.messageText}>
                Is there anything else you'd like to add or ask about your profile? I'm here to help! ✨
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area - Show when on story step, editing, or continued conversation */}
      {(currentStep === 'story' || currentStep === 'editing' || currentStep === 'continued') && (
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            {currentStep === 'continued' ? (
              <TextInput
                style={styles.continueInput}
                value={continuedMessage}
                onChangeText={setContinuedMessage}
                placeholder="Ask me anything about your profile..."
                placeholderTextColor="#999"
                multiline
              />
            ) : (
              <View style={styles.storyContainer}>
                {currentStep === 'editing' ? (
                  <TextInput
                    style={styles.textInput}
                    multiline
                    value={editedStory}
                    onChangeText={setEditedStory}
                    placeholder="Edit your story here..."
                    placeholderTextColor="#999"
                    textAlignVertical="top"
                  />
                ) : (
                  <ScrollView style={styles.storyScroll} nestedScrollEnabled={true}>
                    <Text style={styles.storyText}>{userStory}</Text>
                  </ScrollView>
                )}
              </View>
            )}
            <TouchableOpacity 
              style={[
                styles.sendButton,
                currentStep === 'continued' && !continuedMessage.trim() && styles.sendButtonDisabled
              ]} 
              onPress={
                currentStep === 'continued' 
                  ? handleSendContinuedMessage 
                  : currentStep === 'editing' 
                    ? handleSaveEdits 
                    : handleSendStory
              }
              disabled={currentStep === 'continued' && !continuedMessage.trim()}
            >
              <Feather name="send" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputHint}>
            {currentStep === 'continued' 
              ? 'Continue the conversation or ask questions about your profile'
              : currentStep === 'editing' 
                ? 'Edit your story and click send to reprocess' 
                : 'Your story is ready to be processed by AI'
            }
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
    paddingBottom:3
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 16,
    borderRadius: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botMessage: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: '#FF6B6B',
    borderTopRightRadius: 4,
  },
  detailsMessage: {
    maxWidth: '90%',
  },
  messageText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginRight: 4,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  loadingText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 8,
  },
  detailsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#333',
    minWidth: 80,
    marginRight: 8,
  },
  detailValue: {
    color: '#666',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  confirmButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  successText: {
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  storyContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 120,
  },
  storyScroll: {
    maxHeight: 96,
  },
  storyText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  continueInput: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    maxHeight: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#FF6B6B',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCC',
  },
  inputHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: 'top',
    minHeight: 80,
  },
});

export default MatrimonyAIAssist;