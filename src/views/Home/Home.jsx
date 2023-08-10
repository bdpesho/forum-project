import { useContext, useState, useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UsefulInformationForm from '../../components/UI/UsefulInformationForm/UsefulInformationForm';
import { AppContext } from '../../context/appContext';
import CreateThread from '../Threads/CreateThread';
import { getAllThreads } from '../../services/threads.service';
import { FilterButtons } from '../../components/UI/FilterButtons/FilterButtons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toggleLike } from '../../services/likes.service';
import Comments from '../Comments/Comments';
import cl from './Home.module.css';
import { AuthContext } from '../../context/context';

const Home = ({ children }) => {
  const { showCreateThread } = useContext(AppContext);
  const [openCommentThread, setOpenCommentThread] = useState(null);
  const [threads, setThreads] = useState([]);
  const { userData } = useContext(AuthContext)


  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const fetchedThreads = await getAllThreads();
        setThreads(fetchedThreads);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  // console.log(user.uid)
  const handleThreadCreated = (newThread) => {
    console.log(newThread)
    setThreads((prevThreads) => [...prevThreads, newThread ]);
  };

  // const handleButtonClickLikes = async (threadId, userID) => {
  //   // console.log(threadId)
  //   console.log(userID)
  //   try {
  //     const updatedThread = await toggleLike(threadId, userID);
  //     setThreads(prevThreads => {
  //       const threadIndex = prevThreads.findIndex(thread => thread.id === updatedThread.id);
        
  //       if (threadIndex !== -1) {
  //         const updatedThreads = [...prevThreads];
  //         updatedThreads[threadIndex] = updatedThread;
  //         return updatedThreads;
  //       }
        
  //       return prevThreads;
  //     });
  //   } catch (error) {
  //     console.error('Error toggling like:', error);
  //   }
  // };

  const handleButtonClickLikes = async (thread, userID) => {
    try {
      const updatedThread = await toggleLike(thread.id, userID);
      setThreads(prevThreads => {
        const threadIndex = prevThreads.findIndex(thread => thread.id === updatedThread.id);
        
        if (threadIndex !== -1) {
          const updatedThreads = [...prevThreads];
          updatedThreads[threadIndex] = updatedThread;
          return updatedThreads;
        }
        
        return prevThreads;
      });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  

  return (
    <div className={cl.Home}>
      {children}
      <div className={cl.Home__content}>
        <FilterButtons />
        {showCreateThread && <CreateThread handleThreadCreated={handleThreadCreated} />}
        <div>
          {threads.map((thread) => (
            <div key={thread.id} className={cl.ThreadContainer}>
              <div className={cl.ThreadContainer__top}>
                <div className={cl.top__avatar}>
                  <AccountCircleIcon />
                  <p>{thread.authorUserName}</p>
                </div>
                <div className={cl.comment__button}>
                </div>
                <div className={cl.top__icon}>
                  <div><MoreVertIcon className={cl.icon} /></div>
                </div>
              </div>
              <h3 className={cl.ThreadTitle}>{thread.title}</h3>
              <p className={cl.ThreadBody}>{thread.body}</p>
              <div className={cl.Thread__usefulBtns}>
                <div className={cl.Thread__icon}>
                  <RemoveRedEyeIcon sx={{ fontSize: '17px' }} />
                  <span>20</span>
                </div>
                <div className={cl.Thread__icon}>
                  <ChatBubbleOutlineIcon onClick={() => setOpenCommentThread(thread.id)} sx={{ fontSize: '17px' }} />
                  <span>20</span>
                </div>
                <div className={cl.Thread__icon} onClick={() => handleButtonClickLikes(thread, userData.uid)}>
                  <FavoriteBorderIcon sx={{ fontSize: '17px' }} />
                  <span>{thread.likesCount}</span>
                </div>
              </div>

            </div>
          ))}
          {/* Render the comment input area */}
          {openCommentThread !== null && (
            <Comments threadId={openCommentThread} />
          )}
        </div>
      </div>
      <div>
        <UsefulInformationForm />
      </div>
    </div>
  );
};

export default Home;
