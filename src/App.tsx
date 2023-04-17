import { useEffect, useState } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import Reminder from './interfaces/reminder';
import ReminderService from './services/reminderAPI';
import NewReminder from './components/NewReminder';

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await ReminderService.getReminders();
    setReminders(reminders);
  };
  const removeReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));    
  }

  const addReminder = async (title: string) => {
    const newReminder = await ReminderService.addReminder(title);
    setReminders([newReminder, ...reminders]);    
  }
  
  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder}/>
      <hr />
      {/* button.btn.btn-primary */}
      {/* <button className="btn btn-primary">Click me</button>
      <hr /> */}
      <ReminderList 
      items={reminders} 
      onRemoveReminder={removeReminder}/>
    </div>
  );
}

export default App;


