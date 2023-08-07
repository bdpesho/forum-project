import { useState, useContext } from 'react';
import { AuthContext } from '../../context/context';
import { addThread } from '../../services/threads.service';

function CreateThread() {
  const { userData } = useContext(AuthContext); // Assuming you have the user context available
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addThread(content, userData.uid, userData.username, title);
      // Thread added successfully, you might want to redirect or show a success message
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Thread</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Thread Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your thread content"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateThread;
