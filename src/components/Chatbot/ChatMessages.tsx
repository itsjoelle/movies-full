import React from 'react';
import './ChatMessages.scss';
import { FaPlay } from 'react-icons/fa';
import { Message } from '../../state/gemini/geminiSlice';

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = React.memo(({ messages }: ChatMessagesProps) => {
  if (messages == undefined) return null;
  return (
    <>
      <div className="chatmessages-container">
        {messages.map((message, i: number) => {
          return (
            <div
              key={`${message.parts[0].text}_${i}`}
              className={`${message.role === 'user' && 'is-user'} chatmessage`}
            >
              {message.role === 'model' && (
                <span>
                  <FaPlay className="logo" />
                </span>
              )}

              <div className="message-container">
                {message.role === 'model' && <h6>Chatbot</h6>}
                <p className={`${message.role === 'user' && 'is-user'}`}>
                  {message.parts.map((part) => part.text).join('')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
});

export default ChatMessages;
