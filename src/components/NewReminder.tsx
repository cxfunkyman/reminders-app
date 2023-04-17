import React, { useState } from 'react';
interface NewReminderProps {
    onAddReminder: (title: string) => void;
}

function NewReminder({ onAddReminder }: NewReminderProps): JSX.Element{

    const [title, setTitle] = useState('');

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;
        onAddReminder(title);   
        setTitle('');     
    }

    return (
        <form onSubmit={submitForm}>
            {/* label+input.form-control+button.btn.btn-primary.rounded-pill */}
            <label htmlFor="title"></label>
            <input id="title" type="text" className="form-control"
            value={title} onChange={e => setTitle(e.target.value)} />
            <button type="submit" className="btn btn-primary rounded-pill my-3">Add New</button>
        </form>
    );
}

export default NewReminder;