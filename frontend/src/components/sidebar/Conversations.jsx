import Conversation from "./Conversation.jsx";
import { getRandomEmoji } from "../../utilis/emojis.js";
import useGetConversations from "../../hooks/useGetConversations.js";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("Conversation:", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation.id} // Assuming each conversation has an 'id' field
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1} // Fijxed the typo here
        />
      ))}
      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      ) : null}
    </div>
  );
};

export default Conversations;
