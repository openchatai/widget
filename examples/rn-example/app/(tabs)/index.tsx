import { ChatProvider } from '../../components/ChatProvider';
import { ChatWidget } from '../../components/ChatWidget';

export default function TabOneScreen() {
  return (
    <ChatProvider>
      <ChatWidget />
    </ChatProvider>
  );
}
