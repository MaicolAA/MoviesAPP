import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  title: string;
  description: string;
  date: Date | undefined;
  setTitle: (text: string) => void;
  setDescription: (text: string) => void;
  setDate: (date: Date) => void;
  onSubmit: () => void;
  isEditing: boolean;
};

const TaskForm: React.FC<Props> = ({ title, description, date, setTitle, setDescription, setDate, onSubmit, isEditing }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'android');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
        <Text style={styles.dateText}>
          {date ? date.toDateString() : 'Select Date'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <Button title={isEditing ? "Update" : "Save"} onPress={onSubmit} color={'green'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dateInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
  },
});

export default TaskForm;
