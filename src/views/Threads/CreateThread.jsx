// import { useState, useContext } from 'react';
// import { AuthContext } from '../../context/context';
// import { addThread } from '../../services/threads.service';
// import { AppContext } from '../../context/appContext';

// function CreateThread({ handleThreadCreated }) {
//   const { userData } = useContext(AuthContext);
//   const { setAppState } = useContext(AppContext);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const newThreadKey = await addThread(content, userData.uid, userData.username, title);
//       console.log('newThreadKey:', newThreadKey);

//       handleThreadCreated({
//         title,
//         body: content,
//         authorID: userData.uid,
//         authorUserName: userData.username,
//         createdOn: Date.now(),
//         modifiedOn: 0,
//         likesCount: 0,
//         id: newThreadKey,
//       });

//       setAppState((prevState) => ({
//         ...prevState,
//         showCreateThread: false,
//       }));
//     } catch (error) {
//       console.error('Error creating thread:', error);
//     }
//   };

//   function truncateString(string, limit) {
//     if (string.length > limit) {
//       return string.substring(0, limit) + '...';
//     }
//     return string;
//   }

//   return (
//     <div>
//       <h2>Create a New Thread</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Thread Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           value={content}
//           maxLength={350}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Enter your thread content"
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default CreateThread;


import { useState, useContext } from 'react';
import { AuthContext } from '../../context/context';
import { addThread } from '../../services/threads.service';
import { AppContext } from '../../context/appContext';

function CreateThread({ handleThreadCreated }) {
  const { userData } = useContext(AuthContext);
  const { setAppState } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newThread = await addThread(content, userData.uid, userData.username, title); // Change newThreadKey to newThread
      console.log('newThread:', newThread); // Log the newThread object

      handleThreadCreated(newThread); // Pass the entire newThread object

      setAppState((prevState) => ({
        ...prevState,
        showCreateThread: false,
      }));
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  }

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
          maxLength={350}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your thread content"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateThread;
