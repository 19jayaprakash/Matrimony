import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
 
const LoginScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isMobile = width < 768;
  const router = useRouter();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
 
  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
 
    let isValid = true;
 
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email');
      isValid = false;
    }
 
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
 
    if (!isValid) return;
 
    try {
      const response = await axios.post('http://stu.globalknowledgetech.com:5003/auth/login', {
        email,
        password,
      });
 
      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.data.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        await AsyncStorage.setItem('email',response.data.email);
        await AsyncStorage.setItem('firstName', response.data.firstName);
        await AsyncStorage.setItem('lastName', response.data.lastName);
        await AsyncStorage.setItem('primaryContact', response.data.primaryContact);
        if(response.data.isBasicProfileSubmitted == true){
                  router.push('../navigation/MainTabs');

        }
        else{
                  router.push('/profile/BasicDetails');

        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      if (msg.toLowerCase().includes('email')) {
        setEmailError(msg);
      } else if (msg.toLowerCase().includes('password')) {
        setPasswordError(msg);
      } else {
        setPasswordError(msg);
      }
    }
  };
 
  const goToRegister = () => {
    router.push('/(auth)/CreateAccount');
  };
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDF2F8' }}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          <View style={{ marginBottom: 40, alignItems: 'center' }}>
            <Image
              source={{
                uri: 'https://img.freepik.com/premium-photo/indian-wedding-photography_1235950-89851.jpg',
              }}
              style={{ width: 400, height: 340 }}
              resizeMode="stretch"
              resizeMethod="resize"
            />
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#DB2777', marginTop: 16 }}>
              Welcome Back
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#6B7280',
                marginTop: 8,
                textAlign: 'center',
              }}
            >
              Sign in to continue your journey to find love
            </Text>
          </View>
 
          <View
            style={{
              width: isWeb && !isMobile ? '50%' : '100%',
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 12,
                paddingHorizontal: 16,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: emailError ? 'red' : '#D1D5DB',
              }}
            >
              <Mail size={20} color="#6B7280" />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                  color: '#1F2937',
                }}
                placeholder="Email address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {emailError ? (
              <Text style={{ color: 'red', marginBottom: 12 }}>{emailError}</Text>
            ) : null}
 
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 12,
                paddingHorizontal: 16,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: passwordError ? 'red' : '#D1D5DB',
              }}
            >
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
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={{ color: 'red', marginBottom: 12 }}>{passwordError}</Text>
            ) : null}
 
            <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
              <Text style={{ color: '#DB2777', fontWeight: '500' }}>Forgot Password?</Text>
            </TouchableOpacity>
 
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
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Login</Text>
            </TouchableOpacity>
          </View>
 
          <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 20 }}>
            <Text style={{ color: '#6B7280' }}>Don't have an account?</Text>
            <TouchableOpacity onPress={goToRegister} style={{ marginLeft: 4 }}>
              <Text style={{ color: '#DB2777', fontWeight: 'bold' }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
 
export default LoginScreen;
 
 