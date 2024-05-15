import Realm from 'realm';

class Task extends Realm.Object<Task> {
  id!: number;
  title!: string;
  description!: string;
  date!: Date;

  static schema = {
    name: 'Task',
    properties: {
      id: 'int',
      title: 'string',
      description: 'string',
      date: 'date'
    },
    primaryKey: 'id',
  };
}

export default Task;
