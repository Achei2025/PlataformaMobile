// src/components/LoginScreen.tsx
import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ToggleButton } from './ToggleButton';
import { InputField } from './InputField';
import { AnimatedButton } from './AnimatedButton';
import { THEMES } from '../utils/themes';
import { styles } from '../styles/styles';
import { UserType } from '../types/types';

const LoginScreen = () => {
  const [userType, setUserType] = useState<UserType>('Policial');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const theme = useMemo(() => THEMES[userType], [userType]);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const validateForm = () => {
    if (!matricula.trim()) {
      setError('Por favor, insira sua matrícula.');
      return false;
    }
    if (!senha.trim()) {
      setError('Por favor, insira sua senha.');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simula uma requisição de login
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Login bem-sucedido!');
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://source.unsplash.com/random/?brazil,flag' }} // Imagem remota
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={theme.gradient} // Agora o TypeScript sabe que há pelo menos dois elementos
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                <View style={styles.card}>
                  <View style={styles.logoContainer}>
                    <Text style={[styles.logoText, { color: theme.primary }]}>Gov BR</Text>
                  </View>

                  <Text style={styles.title}>Login - {userType}</Text>

                  <View style={styles.toggleContainer}>
                    <ToggleButton
                      label="Cidadão"
                      isActive={userType === 'Cidadão'}
                      onPress={() => setUserType('Cidadão')}
                      activeColor={THEMES.Cidadão.primary}
                    />
                    <ToggleButton
                      label="Policial"
                      isActive={userType === 'Policial'}
                      onPress={() => setUserType('Policial')}
                      activeColor={THEMES.Policial.primary}
                    />
                  </View>

                  <InputField
                    label="Matrícula"
                    placeholder="Digite sua matrícula"
                    value={matricula}
                    onChangeText={setMatricula}
                    keyboardType="number-pad"
                  />

                  <InputField
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!showPassword}
                    icon={
                      <Feather
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={24}
                        color="#666"
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                  />

                  {error ? <Text style={styles.errorText}>{error}</Text> : null}

                  <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    activeOpacity={0.6}
                  >
                    <Text style={[styles.forgotPassword, { color: theme.primary }]}>
                      Esqueceu a senha?
                    </Text>
                  </TouchableOpacity>

                  <AnimatedButton
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={handleLogin}
                    disabled={isLoading}
                    style={[
                      styles.loginButton,
                      { backgroundColor: theme.primary },
                      { transform: [{ scale: scaleAnim }] },
                    ]}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.loginText}>Entrar</Text>
                    )}
                  </AnimatedButton>

                  <TouchableOpacity style={styles.registerContainer} activeOpacity={0.6}>
                    <Text style={styles.registerText}>
                      Não tem conta?{' '}
                      <Text style={[styles.registerLink, { color: theme.primary }]}>
                        Cadastre-se
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default LoginScreen;