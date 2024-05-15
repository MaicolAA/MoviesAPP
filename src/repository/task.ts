import Realm from 'realm';
import Task from '../models/model';

export const getRealmInstance = async (): Promise<Realm> => {
  const realm = await Realm.open({
    schema: [Task],
    deleteRealmIfMigrationNeeded: true,
  });
  return realm;
};

export const getAllTask = (realm: Realm): Realm.Results<Task> => {
  return realm.objects<Task>('Task');
};

export const createTask = (realm: Realm, title: string, description: string, date: Date): void => {
  realm.write(() => {
    realm.create('Task', {
      id: new Date().getTime(),
      title,
      description,
      date,
    });
  });
};

export const deleteTask = (realm: Realm, id: number): void => {
  realm.write(() => {
    const taskToDelete = realm.objects<Task>('Task').filtered(`id = ${id}`);
    realm.delete(taskToDelete);
  });
};

export const editTask = (realm: Realm, id: number, title: string, description: string, date: Date): void => {
  realm.write(() => {
    const taskToEdit = realm.objects<Task>('Task').filtered(`id = ${id}`)[0];
    if (taskToEdit) {
      taskToEdit.title = title;
      taskToEdit.description = description;
      taskToEdit.date = date;
    }
  });
};
