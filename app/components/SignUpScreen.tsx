'use client';

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  ImageBackground,
  ActivityIndicator,
  KeyboardTypeOptions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { MaskedTextInput } from 'react-native-mask-text';
import * as Yup from 'yup';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type ThemeType = {
  primary: string;
  secondary: string;
};

type Themes = {
  Policial: ThemeType;
  Cidadão: ThemeType;
};

const THEMES: Themes = {
  Policial: {
    primary: '#002776',
    secondary: '#001845',
  },
  Cidadão: {
    primary: '#009B3A',
    secondary: '#006400',
  },
};

const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: Yup.string().required('Telefone é obrigatório').matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
  senha: Yup.string().min(8, 'Senha deve ter pelo menos 8 caracteres').required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha'), undefined], 'Senhas não coincidem') // Corrigido
    .required('Confirme sua senha'),
});

interface FormData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
  senha: string;
  confirmarSenha: string;
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  mask?: string;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  mask,
  error,
  autoCapitalize = 'none',
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      {mask ? (
        <MaskedTextInput
          mask={mask}
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholderTextColor="#666"
        />
      ) : (
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholderTextColor="#666"
          autoCapitalize={autoCapitalize}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const SignUpScreen = () => {
  const [userType, setUserType] = useState<'Policial' | 'Cidadão'>('Policial');
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    senha: '',
    confirmarSenha: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const theme = THEMES[userType];

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

  const handleLogin = () => {
    router.back();
  };

  const handleSignUp = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setIsLoading(true);
      // Simular chamada à API
      setTimeout(() => {
        setIsLoading(false);
        router.push('../');
      }, 2000);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err: Yup.ValidationError) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        setErrors(errors);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://source.unsplash.com/random/?brazil,flag' }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <View style={styles.card}>
                <View style={styles.logoContainer}>
                  <Text style={[styles.logoText, { color: theme.primary }]}>
                    Gov BR
                  </Text>
                </View>

                <Text style={styles.title}>Criar Conta - {userType}</Text>

                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      userType === 'Cidadão' && [styles.activeButton, { backgroundColor: THEMES.Cidadão.primary }],
                    ]}
                    onPress={() => setUserType('Cidadão')}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        userType === 'Cidadão' && styles.activeToggleText,
                      ]}
                    >
                      Cidadão
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      userType === 'Policial' && [styles.activeButton, { backgroundColor: THEMES.Policial.primary }],
                    ]}
                    onPress={() => setUserType('Policial')}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        userType === 'Policial' && styles.activeToggleText,
                      ]}
                    >
                      Policial
                    </Text>
                  </TouchableOpacity>
                </View>

                <InputField
                  label="Nome completo"
                  placeholder="Digite seu nome completo"
                  value={formData.nome}
                  onChangeText={(text) => setFormData({ ...formData, nome: text })}
                  error={errors.nome}
                />

                <InputField
                  label="CPF"
                  placeholder="Digite seu CPF"
                  value={formData.cpf}
                  onChangeText={(text) => setFormData({ ...formData, cpf: text })}
                  mask="999.999.999-99"
                  keyboardType="numeric"
                  error={errors.cpf}
                />

                <InputField
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                />

                <InputField
                  label="Telefone"
                  placeholder="Digite seu telefone"
                  value={formData.telefone}
                  onChangeText={(text) => setFormData({ ...formData, telefone: text })}
                  mask="(99) 99999-9999"
                  keyboardType="phone-pad"
                  error={errors.telefone}
                />

                <InputField
                  label="Endereço"
                  placeholder="Digite seu endereço"
                  value={formData.endereco}
                  onChangeText={(text) => setFormData({ ...formData, endereco: text })}
                  error={errors.endereco}
                />

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Senha</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[styles.input, styles.passwordInput, errors.senha && styles.inputError]}
                      placeholder="Digite sua senha"
                      secureTextEntry={!showPassword}
                      value={formData.senha}
                      onChangeText={(text) => setFormData({ ...formData, senha: text })}
                      placeholderTextColor="#666"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Feather
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={24}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Confirmar Senha</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[styles.input, styles.passwordInput, errors.confirmarSenha && styles.inputError]}
                      placeholder="Digite sua senha novamente"
                      secureTextEntry={!showConfirmPassword}
                      value={formData.confirmarSenha}
                      onChangeText={(text) => setFormData({ ...formData, confirmarSenha: text })}
                      placeholderTextColor="#666"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Feather
                        name={showConfirmPassword ? 'eye' : 'eye-off'}
                        size={24}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}
                </View>

                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setAcceptedTerms(!acceptedTerms)}
                  >
                    <View
                      style={[
                        styles.checkboxInner,
                        acceptedTerms && { backgroundColor: theme.primary },
                      ]}
                    >
                      {acceptedTerms && (
                        <Feather name="check" size={16} color="#fff" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    Li e aceito os{' '}
                    <Text style={[styles.termsLink, { color: theme.primary }]}>
                      Termos de Serviço
                    </Text>{' '}
                    e{' '}
                    <Text style={[styles.termsLink, { color: theme.primary }]}>
                      Política de Privacidade
                    </Text>
                  </Text>
                </View>

                <AnimatedTouchable
                  style={[
                    styles.signUpButton,
                    { backgroundColor: theme.primary },
                    { transform: [{ scale: scaleAnim }] },
                  ]}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  onPress={handleSignUp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.signUpText}>Criar conta</Text>
                  )}
                </AnimatedTouchable>

                <TouchableOpacity
                  style={styles.loginContainer}
                  activeOpacity={0.6}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginText}>
                    Já tem uma conta?{' '}
                    <Text style={[styles.loginLink, { color: theme.primary }]}>
                      Entrar
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#002776',
  },
  toggleText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeToggleText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    fontWeight: '600',
  },
  signUpButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  signUpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    fontWeight: '600',
  },
});

export default SignUpScreen;