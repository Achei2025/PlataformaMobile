import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Olá, {userName}!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default WelcomeSection; 