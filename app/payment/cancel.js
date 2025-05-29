// app/payment/cancel.js
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
 
export default function PaymentCancel() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [fadeAnim] = useState(new Animated.Value(0));
 
  useEffect(() => {
    console.log('Payment Cancelled - Params:', params);
   
    // Animate message
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
 
  const handleTryAgain = () => {
    router.replace('/screens/Payment'); // Adjust to your payment screen path
  };
 
  const handleGoBack = () => {
    router.replace('/navigation/MainTabs'); // Adjust to your main tabs path
  };
 
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F59E0B', '#D97706']}
        style={styles.gradient}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.cancelIcon}>
            <Text style={styles.cancelMark}>⚠️</Text>
          </View>
         
          <Text style={styles.title}>Payment Cancelled</Text>
          <Text style={styles.subtitle}>
            Your payment was cancelled. No charges were made to your account.
          </Text>
         
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Text style={styles.backText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 40,
  },
  cancelIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  cancelMark: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },
  tryAgainButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  tryAgainText: {
    color: '#D97706',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
 