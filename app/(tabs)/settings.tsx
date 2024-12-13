import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Theme</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={value => setIsDarkTheme(value)}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={value => setIsNotificationsEnabled(value)}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Language</Text>
        <Picker
          selectedValue={selectedLanguage}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Türkçe" value="tr" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  picker: {
    height: 50,
    width: 150,
  },
});