// src/components/ToggleButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  activeColor: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isActive,
  onPress,
  activeColor,
}) => (
  <TouchableOpacity
    style={[
      styles.toggleButton,
      isActive && [styles.activeButton, { backgroundColor: activeColor }],
    ]}
    onPress={onPress}
  >
    <Text style={[styles.toggleText, isActive && styles.activeToggleText]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});
export default ToggleButton;