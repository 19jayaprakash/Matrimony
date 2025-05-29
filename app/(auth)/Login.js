import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
 
const Login = () => {
    const router = useRouter();
   const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isMobile = width < 768;
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
 
  // Handle login
  const handleLogin = () => {
    // Implement authentication logic here
    // Navigate to Home or Dashboard after successful login
    router.push('Home');
  };
 
  // Navigate back to landing page
  const goBack = () => {
    navigation.goBack();
  };
 
  // Navigate to Register page
  const goToRegister = () => {
    navigation.navigate('CreateAccount');
  };
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDF2F8' }}>
      <StatusBar barStyle="dark-content" />
     
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
         
         
          {/* Content */}
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
           
          }}>
            {/* Logo */}
            <View style={{ marginBottom: 40, alignItems: 'center' }}>
              <Image
                source = {{uri : "https://img.freepik.com/premium-photo/indian-wedding-photography_1235950-89851.jpg"}}
                // source={require('@/assets/images/Image.jpg')}
                style={{ width: 400, height: 340 }}
                resizeMode='stretch'
                resizeMethod='resize'
              />
             
              <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#DB2777',
                marginTop: 16,
              }}>
                Welcome Back
              </Text>
              <Text style={{
                fontSize: 16,
                color: '#6B7280',
                marginTop: 8,
                textAlign: 'center',
              }}>
                Sign in to continue your journey to find love
              </Text>
            </View>
           
            {/* Form */}
            <View style={{
              width: isWeb && !isMobile ? '50%' : '100%',
              marginBottom: 20,
            }}>
              {/* Email Input */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 12,
                paddingHorizontal: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: '#D1D5DB',
              }}>
                <Mail size={20} color="#6B7280" />
                <TextInput
                  style={{
                    flex: 1,
                    paddingVertical: 16,
                    paddingHorizontal: 12,
                    color: '#1F2937',
                   
                  }}
                  className = "outline-none border-none"
                  placeholder="Email address"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
             
              {/* Password Input */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 12,
                paddingHorizontal: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: '#D1D5DB',
              }}>
                <Lock size={20} color="#6B7280" />
                <TextInput
                  style={{
                    flex: 1,
                    paddingVertical: 16,
                    paddingHorizontal: 12,
                    color: '#1F2937',
                  }}
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ?
                    <EyeOff size={20} color="#6B7280" /> :
                    <Eye size={20} color="#6B7280" />
                  }
                </TouchableOpacity>
              </View>
             
              {/* Forgot Password */}
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
                <Text style={{ color: '#DB2777', fontWeight: '500' }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
             
              {/* Login Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#DB2777',
                  paddingVertical: 16,
                  borderRadius: 12,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                onPress={handleLogin}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
           
            {/* Register Link */}
            <View style={{ flexDirection: 'row', marginTop: 16,marginBottom : 20 }}>
              <Text style={{ color: '#6B7280' }}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={goToRegister} style={{ marginLeft: 4 }}>
                <Text style={{ color: '#DB2777', fontWeight: 'bold' }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
 
export default Login;
 