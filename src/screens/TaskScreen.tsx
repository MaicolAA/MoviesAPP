import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Realm from 'realm';

import { getRealmInstance, getAllTask, deleteTask } from '../utils/realm';
import Task from '../models/model';
import TaskItem from '../components/TaskItem';

import { RootStackParamList } from '../../types';

const TaskScreen = () => {

  const [realm, setRealm] = useState<Realm | null>(null);
  const [tasks, setTasks] = useState<Realm.Results<Task> | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const setupRealm = async () => {
      const realmInstance = await getRealmInstance();
      setRealm(realmInstance);
      const tasks = realmInstance.objects<Task>('Task');
      setTasks(tasks);

      const taskListener = () => setTasks(realmInstance.objects<Task>('Task')); 
      tasks.addListener(taskListener);

      return () => {
        tasks.removeListener(taskListener);
        if (realmInstance) {
          realmInstance.close();
        }
      };
    };

    setupRealm();
  }, []);

  const handleDeleteTask = (id: number) => {
    if (realm) {
      deleteTask(realm, id);
    }
  };

  const handleEditTask = (task: Task) => {
    navigation.navigate('task', {task });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flat}
        data={tasks ? Array.from(tasks) : []}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TaskItem item={item} onEdit={handleEditTask} onDelete={handleDeleteTask} />
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('task', { task: undefined })}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flat: {
    flex: 1,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default TaskScreen;
