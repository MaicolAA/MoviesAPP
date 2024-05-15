import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Task from '../models/model';

type Props = {
  item: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

const TaskItem: React.FC<Props> = ({ item, onEdit, onDelete }) => {

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(item.date);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'android');
    if (date) {
      setSelectedDate(date);
      item.date = date; 
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.note}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
        <Text>{selectedDate ? selectedDate.toDateString() : 'Select Date'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View style={{ height: 10 }} />
      <Button title="Edit" onPress={() => onEdit(item)} />
      <View style={{ height: 10 }} />
      <Button title="Delete" onPress={() => onDelete(item.id)} color='red' />
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    marginBottom: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 0,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
  },
});

export default TaskItem;
