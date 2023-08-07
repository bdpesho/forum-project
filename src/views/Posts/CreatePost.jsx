import { useState, useContext } from 'react';
import { addPost } from '../../services/posts.service';
import AppContext from '../../context/context';

const CreatePostForm = () => {
  const { userData } = useContext(AppContext);
  //   console.log(username);
  //   const [content, setContent] = useState('');
  //   // const [currentUsername, setCurrentUsername] = useState(username); // Store the username as a state

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const newPost = await addPost(content, username); // Use currentUsername
  //       console.log('New post created:', newPost);
  //       setContent('');
  //     } catch (error) {
  //       console.error('Error creating post:', error);
  //     }
  //   };

  if (!userData?.username) {
    console.log(userData);
  }

  return (
    <div>
      <h2>{userData?.username}</h2>
    </div>
  );
};

export default CreatePostForm;
