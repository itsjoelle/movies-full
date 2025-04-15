import React, { useMemo, useState } from 'react';
import './Chatbot.scss';
import './ChatMessages.scss';
import { SiChatbot } from 'react-icons/si';
import { RiSendPlaneLine } from 'react-icons/ri';
import ChatMessages from './ChatMessages';
import { FaPlay } from 'react-icons/fa';
import { CiMinimize1 } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { askGemini, setHistory } from '../../state/gemini/geminiSlice';
import { RootState } from '../../state/store';
import { useChatScroll } from '../../customHooks/useChatScroll';
import { data } from '../../data/dataFields';

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector((state: RootState) => state.gemini.history);
  const memoizedHistory = useMemo(() => history, [history]);
  const scrollRef = useChatScroll(memoizedHistory);

  const sendMessage = () => {
    if (inputVal.length === 0) return;
    dispatch(
      setHistory({
        role: 'user',
        parts: [{ text: inputVal }],
      })
    );
    dispatch(askGemini(inputVal));
    setInputVal('');
  };

  return (
    <>
      {chatOpen ? (
        <div className="chatbot-open">
          <div className="chatbot-header">
            <div className="chatbot-title">Cinematic Bot</div>

            <CiMinimize1
              className="chatbot-close"
              onClick={() => setChatOpen(false)}
            />
          </div>

          <div ref={scrollRef} className="chatbot-body">
            <div className="chatmessage">
              <div>
                <span>
                  <FaPlay className="logo" />
                </span>
              </div>
              <div className="message-container">
                <p>{data.chatbot_initial}</p>
              </div>
            </div>
            <ChatMessages messages={memoizedHistory} />
          </div>

          <div className="chatbot-input-container">
            <input
              className="chatbot-input"
              type="text"
              placeholder="Type your message here..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            ></input>
            <RiSendPlaneLine className="chatbot-send" onClick={sendMessage} />
          </div>
        </div>
      ) : (
        <div onClick={() => setChatOpen(true)} className="container-chatbot">
          <SiChatbot className="chatbot-icon" />
        </div>
      )}
    </>
  );
};

export default Chatbot;
