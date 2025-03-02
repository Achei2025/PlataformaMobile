import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Notification {
  id: string;
  title: string;
  time: string;
  type: 'ocorrencia' | 'vistoria' | 'alerta';
}

interface NotificationsSectionProps {
  notifications: Notification[];
  theme: {
    primary: string;
    secondary: string;
  };
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications,
  theme,
}) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'ocorrencia':
        return 'file-text';
      case 'vistoria':
        return 'check-square';
      case 'alerta':
        return 'alert-circle';
      default:
        return 'bell';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificações Recentes</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: theme.primary }]}>
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      {notifications.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          style={styles.notificationCard}
        >
          <View style={styles.notificationContent}>
            <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
              <Feather
                name={getIcon(notification.type)}
                size={16}
                color="#fff"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notificationText}>
                {notification.title}
              </Text>
              <Text style={styles.timeText}>{notification.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationsSection; 