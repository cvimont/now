import './Message.scss';
import '../../styles/common.scss';

export const Message = (props: any) => (
  <div
    className={`message-container ${props.sender === props.currentSender ? 'current-sender' : ''}`}>
    <div className="sender">{getInitials(props.sender)}</div>
    <div className="content">{props.content}</div>
  </div>
);

const getInitials = (names: string) =>
  names
    .split(' ')
    .map((name: string) => name[0])
    .join('');
