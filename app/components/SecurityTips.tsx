import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions, // Importação adicionada
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface SecurityTip {
  icon: keyof typeof Feather.glyphMap;
  text: string;
}

interface SecurityCategory {
  title: string;
  icon: keyof typeof Feather.glyphMap;
  tips: SecurityTip[];
}

const securityTips: SecurityCategory[] = [
  {
    title: 'Segurança Digital',
    icon: 'lock',
    tips: [
      { icon: 'key', text: 'Use senhas fortes e não reutilize as mesmas em diferentes serviços.' },
      { icon: 'shield', text: 'Ative a autenticação de dois fatores (2FA) sempre que possível.' },
      { icon: 'wifi-off', text: 'Evite redes Wi-Fi públicas ao acessar informações sensíveis.' },
      { icon: 'alert-triangle', text: 'Não clique em links suspeitos enviados por e-mail ou mensagens.' },
      { icon: 'refresh-cw', text: 'Mantenha seu sistema e aplicativos atualizados para evitar vulnerabilidades.' },
    ],
  },
  {
    title: 'Segurança Pessoal',
    icon: 'user-check',
    tips: [
      { icon: 'map-pin', text: 'Compartilhe sua localização apenas com pessoas confiáveis em aplicativos de rastreamento.' },
      { icon: 'eye-off', text: 'Evite divulgar informações pessoais nas redes sociais, como endereço ou rotina diária.' },
      { icon: 'phone', text: 'Tenha um contato de emergência salvo no celular e ative atalhos rápidos para chamadas urgentes.' },
    ],
  },
  {
    title: 'Segurança em Apps Bancários',
    icon: 'credit-card',
    tips: [
      { icon: 'lock', text: 'Não compartilhe códigos de verificação (OTP) enviados por SMS ou e-mail.' },
      { icon: 'bell-off', text: 'Desative notificações de transações financeiras na tela de bloqueio para evitar espionagem.' },
      { icon: 'bell', text: 'Ative alertas de movimentação na conta bancária para identificar transações suspeitas rapidamente.' },
    ],
  },
  {
    title: 'Segurança ao Dirigir',
    icon: 'navigation',
    tips: [
      { icon: 'smartphone', text: 'Evite mexer no celular enquanto anda ou dirige.' },
      { icon: 'lock', text: 'Mantenha as portas do carro travadas ao dirigir em locais desconhecidos ou perigosos.' },
      { icon: 'shield', text: 'Se estiver sendo seguido, vá para um local movimentado ou procure um posto policial.' },
    ],
  },
];

interface SecurityTipsProps {
  theme?: {
    primary: string;
    secondary: string;
  };
}

const SecurityTips: React.FC<SecurityTipsProps> = ({ theme = { primary: '#007bff', secondary: '#f8f9fa' } }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((current) => (current === securityTips.length - 1 ? 0 : current + 1));
  };

  const handlePrevious = () => {
    setActiveIndex((current) => (current === 0 ? securityTips.length - 1 : current - 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Dicas de segurança</Text>
      
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.navigationButton} onPress={handlePrevious}>
          <Feather name="chevron-left" size={24} color={theme.primary} />
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
            <Feather name={securityTips[activeIndex].icon} size={32} color="#fff" />
          </View>
          
          <Text style={[styles.categoryTitle, { color: theme.primary }]}>
            {securityTips[activeIndex].title}
          </Text>

          <ScrollView style={styles.tipsContainer} showsVerticalScrollIndicator={false}>
            {securityTips[activeIndex].tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Feather name={tip.icon} size={20} color={theme.primary} style={styles.tipIcon} />
                <Text style={styles.tipText}>{tip.text}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {securityTips.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: index === activeIndex ? theme.primary : '#E0E0E0',
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.navigationButton} onPress={handleNext}>
          <Feather name="chevron-right" size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationButton: {
    padding: 8,
  },
  card: {
    width: width - 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 300,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  tipsContainer: {
    maxHeight: 200,
    width: '100%',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  tipIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default SecurityTips; 