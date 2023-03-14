import { useState } from 'react';

interface Message {
  sender: string;
  content: string;
}

export function Chat() {
  const initMessage: Message = {
    sender: 'Chatbot',
    content: 'Hello'
  };

  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState([initMessage]);

  const onChangeMessage = (e: any) => {
    if (e?.target) {
      setCurrentMessage(e.target.value);
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setMessages([
        ...messages,
        {
          sender: 'Me',
          content: currentMessage
        }
      ]);
      setCurrentMessage('');
    }
  };

  return (
    <div>
      <div>Chat app</div>
      {messages.map((message: any, index: number) => (
        <div key={`message-${index}`}>
          [{message.sender}] {message.content}
        </div>
      ))}
      <input
        placeholder="Message"
        value={currentMessage}
        onChange={onChangeMessage}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
