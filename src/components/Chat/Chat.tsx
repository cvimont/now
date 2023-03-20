import axios from 'axios';
import { useEffect, useState } from 'react';
import { Message } from '../Message/Message';
import './Chat.scss';

interface IMessage {
  sender: string;
  content: string;
}

const urlTyping = 'http://localhost:3001/typing';
const urlMessages = 'http://localhost:3001/messages';

export function Chat() {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [currentSender, setCurrentSender] = useState<string>('');

  const [currentlyTyping, setCurrentlyTyping] = useState<string[]>([]);

  const onChangeMessage = (e: any) => {
    if (e?.target && currentSender.length > 0) {
      axios.post(urlTyping, {
        name: currentSender,
        isTyping: true
      });
      setCurrentMessage(e.target.value);
    }
  };

  const onChangeSender = (e: any) => {
    if (e?.target) {
      setCurrentSender(e.target.value);
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    axios.post(urlMessages, {
      sender: currentSender,
      content: currentMessage
    });
    axios.post(urlTyping, {
      name: currentSender,
      isTyping: false
    });

    setCurrentMessage('');
  };

  const getTyping = () => {
    axios.get(urlTyping).then((res) => {
      const typing = res.data?.filter((t: string) => t !== currentSender);
      setCurrentlyTyping(typing);
    });
  };

  const getMessages = () => {
    axios.get(urlMessages).then((res) => {
      setMessages(res.data);
    });
  };

  useEffect(() => {
    const checkMessages = setInterval(() => {
      getMessages();
      getTyping();
    }, 1000);
    return () => clearInterval(checkMessages);
  }, []);

  return (
    <div className="main-container">
      <div className="section">
        <div className="title">Now</div>
      </div>
      <div className="section">
        <div className="section messages-container">
          {messages.map((message: any, index: number) => (
            <Message
              key={`message-${index}`}
              sender={message.sender}
              content={message.content}
              currentSender={currentSender}
            />
          ))}
          {currentlyTyping?.length >= 1 && (
            <div className="typing-dots">
              <div className="typing-dot-1">•</div>
              <div className="typing-dot-2">•</div>
              <div className="typing-dot-3">•</div>
            </div>
          )}
        </div>
        <div className="section">
          <div className="writing-section">
            <div className="message-inputs">
              <input
                className="input sender"
                placeholder="Sender"
                value={currentSender}
                onChange={onChangeSender}
              />
              <input
                className="input"
                placeholder="Message"
                value={currentMessage}
                onChange={onChangeMessage}
                onKeyDown={onKeyDown}
              />
            </div>
            <div className="send-button" onClick={sendMessage}>
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
