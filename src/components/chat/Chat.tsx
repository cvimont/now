import axios from 'axios';
import { useEffect, useState } from 'react';

interface Message {
  sender: string;
  content: string;
}

export function Chat() {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const [currentSender, setCurrentSender] = useState<string>('');

  const onChangeMessage = (e: any) => {
    if (e?.target) {
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
      axios.post('http://localhost:3001/messages', {
        sender: currentSender,
        content: currentMessage
      });
      setCurrentMessage('');
    }
  };

  const getMessages = () => {
    axios.get('http://localhost:3001/messages').then((res) => {
      messages;
      setMessages(res.data);
    });
  };

  useEffect(() => {
    const checkMessages = setInterval(() => {
      getMessages();
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
