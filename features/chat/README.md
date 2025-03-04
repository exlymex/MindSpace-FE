# Chat Feature

This feature provides real-time chat functionality between students and psychologists.

## Components

- **MessageInput**: Component for sending messages
- **MessageList**: Component for displaying messages
- **Message**: Component for rendering individual messages

## Hooks

- **useChatSocket**: Custom hook for managing socket connections and real-time communication

## API

- **chatApi**: RTK Query API for chat-related endpoints

## Usage

The chat functionality is implemented using Socket.IO for real-time communication. The `useChatSocket` hook provides an interface for connecting to the socket server, sending messages, and handling typing status.

### Example

```tsx
import { useChatSocket } from '@/features/chat/hooks';

function ChatComponent() {
  const { isConnected, isTyping, sendMessage, sendTypingStatus } = useChatSocket();
  
  // Use the hook functions to interact with the chat
  return (
    <div>
      {isTyping && <p>User is typing...</p>}
      <button onClick={() => sendMessage('Hello!')}>Send Message</button>
    </div>
  );
}
```

## Socket Events

- **connect**: Fired when the socket connects to the server
- **disconnect**: Fired when the socket disconnects from the server
- **new_message**: Received when a new message is sent to the chat
- **message_sent**: Received as confirmation when a message is successfully sent
- **typing**: Received when a user is typing in the chat

## Redux Integration

The chat feature is integrated with Redux for state management. The following actions are available:

- **addMessage**: Add a new message to the chat
- **setMessages**: Set all messages for the current chat
- **setCurrentChatId**: Set the ID of the current active chat
- **setConnectionStatus**: Update the connection status
- **setTypingStatus**: Update the typing status 