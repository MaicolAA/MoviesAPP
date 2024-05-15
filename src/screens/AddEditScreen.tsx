import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import TaskForm from '../components/TaskView';
import { getRealmInstance, createTask, editTask } from '../repository/task';
import Task from '../models/model';

type AddEditTaskcreenRouteProp = RouteProp<{ params: { task?: Task } }, 'params'>;

const AddEditScreen = () => {
  const [realm, setRealm] = useState<Realm | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const route = useRoute<AddEditTaskcreenRouteProp>();
  const navigation = useNavigation();

  useEffect(() => {
    getRealmInstance().then(realmInstance => {
      setRealm(realmInstance);
    });

    if (route.params?.task) {
      const { task } = route.params;
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date);
      setIsEditing(true);
      setEditTaskId(task.id);
    }

    return () => {
      if (realm) {
        realm.close();
      }
    };
  }, [route.params]);

  const handleSubmit = () => {
    if (realm) {
      if (isEditing && editTaskId !== null) {
        editTask(realm, editTaskId, title, description, date);
      } else {
        createTask(realm, title, description, date);
      }
      navigation.goBack();
    }
  };

  return (
    <View>
      <TaskForm
        title={title}
        description={description}
        date={date}
        setTitle={setTitle}
        setDescription={setDescription}
        setDate={setDate}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </View>
  );
};

export default AddEditScreen;
