import axios from 'axios';
import { useEffect, useState } from 'react';

interface Message {
  sender: string;
  content: string;
}

const urlTyping = 'http://localhost:3001/typing';
const urlMessages = 'http://localhost:3001/messages';

export function Chat() {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

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
      axios.post(urlMessages, {
        sender: currentSender,
        content: currentMessage
      });
      axios.post(urlTyping, {
        name: currentSender,
        isTyping: false
      });

      setCurrentMessage('');
    }
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
    <div>
      <div>Chat app</div>
      {messages.map((message: any, index: number) => (
        <div key={`message-${index}`}>
          [{message.sender}] {message.content}
        </div>
      ))}
      {currentlyTyping?.length === 1 && <div>{currentlyTyping?.[0]} is typing...</div>}
      {currentlyTyping?.length > 1 && <div>Several users are typing...</div>}
      <input placeholder="Sender" value={currentSender} onChange={onChangeSender} />
      <input
        placeholder="Message"
        value={currentMessage}
        onChange={onChangeMessage}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
