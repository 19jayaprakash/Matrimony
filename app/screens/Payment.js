import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'; // or react-native-linear-gradient
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { WebView } from 'react-native-webview';
import { axiosPublic } from '../api/constant';
 
const { width } = Dimensions.get('window');
 
const MatrimonyPaymentScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [selectedDuration, setSelectedDuration] = useState('6');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
const router=useRouter()
  const plans = {
    basic: {
      name: 'Basic',
      emoji: '👥',
      color: '#3B82F6',
      lightColor: '#EFF6FF',
      features: [
        'View up to 50 profiles per day',
        'Send 10 interests per day',
        'Basic search filters',
        'Mobile app access',
        'Customer support'
      ]
    },
    premium: {
      name: 'Premium',
      emoji: '⭐',
      color: '#8B5CF6',
      lightColor: '#F3E8FF',
      popular: true,
      features: [
        'Unlimited profile views',
        'Send unlimited interests',
        'Advanced search filters',
        'View contact details',
        'Priority customer support',
        'Profile highlighting',
        'Read message receipts'
      ]
    },
    elite: {
      name: 'Elite',
      emoji: '👑',
      color: '#F59E0B',
      lightColor: '#FFFBEB',
      features: [
        'Everything in Premium',
        'Dedicated relationship manager',
        'Profile verification badge',
        'VIP customer support',
        'Exclusive elite member search',
        'Profile showcase in premium listings',
        'Advanced privacy controls',
        'Monthly compatibility reports'
      ]
    }
  };
 
  const pricing = {
    basic: { 3: 999, 6: 1799, 12: 2999 },
    premium: { 3: 1999, 6: 3599, 12: 5999 },
    elite: { 3: 3999, 6: 7199, 12: 11999 }
  };
 
  const getDiscountPercentage = (plan, duration) => {
 
   
    const monthly = pricing[plan][3] / 3;
    const actualMonthly = pricing[plan][duration] / duration;
    return Math.round((1 - actualMonthly / monthly) * 100);
  };
 
  const handlePayment = async () => {
    // setIsProcessing(true);
    console.log('payment');
 
     try {
                const Userid = await AsyncStorage.getItem('userId');
 
    const paymentData = {
      amount: pricing[selectedPlan][selectedDuration],
      userId:Number(Userid),
      duration:selectedDuration,
      planType:selectedPlan
 
    };
 
     
     
      const response = await axiosPublic.post('/subscription/add-user-subscription',paymentData, {
      });
 
      const result =  response;
      if (result.data) {
    const paymentUrl=`${result.data.gateway.url}&encRequest=${result.data.gateway.encRequest}&access_code=${result.data.gateway.access_code}`;
    setPaymentUrl(paymentUrl);
      setIsWebViewVisible(true);
 
    setIsLoading(false);
      }
     
       // CCAvenue integration for React Native
 
 
 
 
     
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
 
 
const handleWebViewNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url.includes('/payment/success')) {
        console.log('payment reflected');
        setIsProcessing(false)
                  router.push('/payment/success');
            //  router.push('/Payment/Payment')
      setIsWebViewVisible(false);
      // Optionally show success message or navigate
    } else if(url.includes('/payment/cancel')){
  console.log('payment reflected');
        setIsProcessing(false)
                  router.push('/payment/cancel');
            //  router.push('/Payment/Payment')
      setIsWebViewVisible(false);
    }
  };
  const selectedPlanData = plans[selectedPlan];
 
  const PlanCard = ({ planKey, plan }) => {
    const isSelected = selectedPlan === planKey;
   
    return (
      <TouchableOpacity
        style={[
          styles.planCard,
          isSelected && {
            borderColor: plan.color,
            backgroundColor: plan.lightColor,
            shadowColor: plan.color,
            shadowOpacity: 0.3,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }
        ]}
        onPress={() => setSelectedPlan(planKey)}
        activeOpacity={0.8}
      >
        {plan.popular && (
          <View style={styles.popularBadge}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.popularGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.popularText}>Most Popular</Text>
            </LinearGradient>
          </View>
        )}
       
        <View style={styles.planHeader}>
          <View style={styles.planInfo}>
            <View style={[styles.planIcon, { backgroundColor: plan.lightColor }]}>
              <Text style={styles.planEmoji}>{plan.emoji}</Text>
            </View>
            <View>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planSubtitle}>Perfect for serious seekers</Text>
            </View>
          </View>
          <View style={[
            styles.radioButton,
            isSelected && { borderColor: plan.color, backgroundColor: plan.color }
          ]}>
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>
 
        <View style={styles.featuresContainer}>
          {plan.features.slice(0, 3).map((feature, idx) => (
            <View key={idx} style={styles.featureRow}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          {plan.features.length > 3 && (
            <Text style={styles.moreFeatures}>
              +{plan.features.length - 3} more features
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
 
  const DurationCard = ({ months, price }) => {
    const isSelected = selectedDuration === months;
    const discount = getDiscountPercentage(selectedPlan, months);
   
    return (
      <TouchableOpacity
        style={[
          styles.durationCard,
          isSelected && styles.durationCardSelected
        ]}
        onPress={() => setSelectedDuration(months)}
        activeOpacity={0.8}
      >
        <View style={styles.durationLeft}>
          <View style={[
            styles.durationRadio,
            isSelected && styles.durationRadioSelected
          ]}>
            {isSelected && <View style={styles.durationRadioInner} />}
          </View>
          <View>
            <Text style={styles.durationText}>
              {months} Month{months > 1 ? 's' : ''}
            </Text>
            {discount > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>Save {discount}%</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.durationRight}>
          <Text style={styles.priceText}>₹{price.toLocaleString()}</Text>
          <Text style={styles.monthlyText}>
            ₹{Math.round(price / months).toLocaleString()}/month
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF2F8" />
     
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
      </View>
 
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Plan Selection */}
        <View style={styles.section}>
          {Object.entries(plans).map(([key, plan]) => (
            <PlanCard key={key} planKey={key} plan={plan} />
          ))}
        </View>
 
        {/* Duration Selection */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Duration</Text>
          {Object.entries(pricing[selectedPlan]).map(([months, price]) => (
            <DurationCard key={months} months={months} price={price} />
          ))}
        </View>
 
        {/* Features Preview */}
        <View style={styles.card}>
          <View style={styles.featuresHeader}>
            <Text style={styles.featuresEmoji}>{selectedPlanData.emoji}</Text>
            <Text style={styles.sectionTitle}>{selectedPlanData.name} Features</Text>
          </View>
          {selectedPlanData.features.map((feature, idx) => (
            <View key={idx} style={styles.featureRow}>
              <Text style={styles.checkMark}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
 
        {/* Security Note */}
        <View style={styles.securityCard}>
          <View style={styles.securityHeader}>
            <Text style={styles.securityEmoji}>🛡️</Text>
            <Text style={styles.securityTitle}>Secure Payment</Text>
          </View>
          <Text style={styles.securityText}>
            Your payment is processed securely through CCAvenue. We don't store your card details.
          </Text>
        </View>
 
        {/* Payment Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{selectedPlanData.name} Plan</Text>
            <Text style={styles.summaryValue}>
              ₹{pricing[selectedPlan][selectedDuration].toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>
              {selectedDuration} Month{selectedDuration > 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              ₹{pricing[selectedPlan][selectedDuration].toLocaleString()}
            </Text>
          </View>
        </View>
 
        {/* Payment Methods */}
        <View style={styles.paymentMethods}>
          <Text style={styles.paymentMethodsTitle}>Accepted Payment Methods</Text>
          <View style={styles.paymentMethodsRow}>
            {['Visa', 'Mastercard', 'UPI', 'Net Banking'].map((method) => (
              <View key={method} style={styles.paymentMethodBadge}>
                <Text style={styles.paymentMethodText}>{method}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
 
      {/* Payment Button */}
      <View style={styles.paymentButtonContainer}>
        <TouchableOpacity
          style={[styles.paymentButton, isProcessing && styles.paymentButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8B5CF6', '#FF6B6B']}
            style={styles.paymentGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.paymentButtonIcon}>💳</Text>
            <Text style={styles.paymentButtonText}>
              {isProcessing
                ? 'Processing...'
                : `Pay ₹${pricing[selectedPlan][selectedDuration].toLocaleString()}`
              }
            </Text>
          </LinearGradient>
        </TouchableOpacity>
          <Modal visible={isWebViewVisible} animationType="slide">
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
 
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {setIsWebViewVisible(false);
                setIsProcessing(false)
 
            }}
            style={{ padding: 10, backgroundColor: '#eee', alignItems: 'center' }}
          >
            <Text>Close Payment</Text>
          </TouchableOpacity>
                <View style={{ height: 800 }}>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            startInLoadingState
            renderLoading={() => <ActivityIndicator style={{ marginTop: 20 }} />}
            style={{flex:1}}
          />
          </View>
        </View>
        </ScrollView>
      </Modal>
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 24,
    color: '#6B7280',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    gap: 12,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 16,
  },
  popularGradient: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  planEmoji: {
    fontSize: 20,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  planSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  featuresContainer: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkMark: {
    color: '#10B981',
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
  },
  moreFeatures: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  durationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  durationCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3E8FF',
  },
  durationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationRadio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationRadioSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#8B5CF6',
  },
  durationRadioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  discountBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
  },
  discountText: {
    fontSize: 10,
    color: '#16A34A',
    fontWeight: '600',
  },
  durationRight: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  monthlyText: {
    fontSize: 12,
    color: '#6B7280',
  },
  featuresHeader: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuresEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  securityCard: {
    backgroundColor: '#EFF6FF',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  securityEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
  },
  securityText: {
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  paymentMethods: {
    alignItems: 'center',
    margin: 16,
    marginTop: 0,
  },
  paymentMethodsTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentMethodBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  paymentMethodText: {
    fontSize: 10,
    color: '#374151',
  },
  paymentButtonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  paymentButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  paymentButtonDisabled: {
    opacity: 0.5,
  },
  paymentGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  paymentButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
 
export default MatrimonyPaymentScreen;
 