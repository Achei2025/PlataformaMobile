// src/components/AnimatedButton.tsx
import React from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AnimatedButtonProps {
  onPressIn: () => void;
  onPressOut: () => void;
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style?: any;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPressIn,
  onPressOut,
  onPress,
  disabled,
  children,
  style,
}) => {
  return (
    <Animated.View style={style}>
      <TouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        disabled={disabled}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};