REACT WITH TYPESCRIPT

1- npx create-react-app --template typescript
2- add bootstrap
    2.1- npm i bootstrap
    2.2- open index.tsx
    2.3- after import ReactDOM from 'react-dom/client';
    2.4- import 'bootstrap/dist/css/bootstrap.css';
3- delete everything inside app.css and just add a body padding 20px (optional step)
4- add a button to test: button.btn.btn-primary
5- run server: npm start
6- create folder components
7- create file ReminderList.tsx
8- install extension Reactjs code snippets
9- now you can use shortcuts like rafce(react arrow function component) or rsf(react stateless function)
10- create 2 interfaces for Props
    10.1- interface Reminder {
            id: number;
            title: string;
          }
    10.2- interface ReminderListProps {
            items: Reminder[];
          }
11- create folder interfaces
    11.1- create file Reminder.ts
12- move 10.1 step to Reminder.ts like this
    12.1- export default interface  Reminder {
            id: number;
            title: string;
          }
13- in ReminderList.tsx add
    13.1- import Reminder from '../interfaces/reminder';
    13.2- return
        13.2.1- <ul>
                    {items.map(item => <li key={item.id}>{item.title}</li>)}
                </ul>
14- in app.tsx
    14.1- add <ReminderList items={reminders}/>
15- for items props create just for test a reminders array
16- let's make some changes with the use of State Hook
    16.1- inside function App()
    16.2- create 
        16.2.1- const [reminders, setReminders] = useState<Reminder[]>([]);
17- create folder services
    17.1- create file reminderAPI.ts
    17.2- install axios
        17.2.1- npm i axios
    17.3 inside reminderAPI.ts create a class
        17.3.1 class ReminderService {
                    http = axios.create({
                        baseURL: 'https://jsonplaceholder.typicode.com/'
                    });
               }
        17.3.2- add async getReminders() {
                        const res = await this.http.get<Reminder[]>('todos');
                        return res.data;
                    }
        17.3.3- add async addReminder(title: string) {
                        const res = await this.http.post<Reminder>('todos', { title });
                        return res.data;
                    }
        17.3.4- add async removeReminder(id: number) {
                        const res = await this.http.delete('todos/' + id);
                        return res.data;
                    }
        17.3.5 return a new instance fo the class
            17.3.5.1- export default new ReminderService();
18- Now in reminderList.tsx add a className list-group to ul and list-group-item to li
19- add a button.btn.btn-outline-danger, add mx-2 and rounded-pill to the class name
20- implement the delete process
    20.1- add to inerface ReminderListProps => onRemoveReminder: (id: number) => void;
    20.2- add to delete button onClick={() => onRemoveReminder(item.id)}
    20.2- app.tsx add
        20.2.1- const removeReminder = (id: number) => {
                    setReminders(reminders.filter(reminder => reminder.id !== id));    
                }
    20.3- <ReminderList 
            items={reminders} 
            onRemoveReminder={removeReminder}/>
21-add new file NewReminder.tsx
22- add form, round pill button, label and input
    22.1- label+input.form-control+button.btn.btn-primary.rounded-pill
23- add it to app.tsx
24- in NewReminder.tsx add useState
    24.1- const [title, setTitle] = useState('');
25- on input add value={title} onChange={e => setTitle(e.target.value)}
26- add onSubmit={submitForm} to the form    
    26.1- create function submitForm
    26.2- Create interface for props
    26.3- interface NewReminderProps {
            onAddReminder: (title: string) => void;
          }
    26.4- const submitForm = (e: React.FormEvent) => {
            e.preventDefault();
            if (!title) return;
            onAddReminder(title);  
            setTitle('');       
          }
    26.5- add props to NewReminder
        25.5.1- ({ onAddReminder }: NewReminderProps)
    26.6- in app.tsx 
        26.6.1- <NewReminder onAddReminder={addReminder}/>
        26.6.2- const addReminder = async (title:   string) => {
                    const newReminder = await ReminderService.addReminder(title); 
                    setReminders([newReminder, ...reminders]);   
                    }
        
