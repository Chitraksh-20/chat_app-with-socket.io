import Message from "./Message.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeleton/MessageSkeleton.jsx";
import { useEffect,useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	console.log("messages:", messages);
	const lastMessageRef=useRef();
useEffect(()=>{
setTimeout(()=>{
	lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
},100);
},[messages]);
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{/* Render Message components when not loading and messages are available */}
			{!loading && messages.length > 0 && 
				messages.map((message) => (
					<div key={message.id} ref={lastMessageRef}  >

					<Message message={message} />
					</div>
				))
			}
			
			{/* Render skeleton loaders when loading */}
			{loading && [...Array(3)].map((_, idx) => (
				<MessageSkeleton key={idx} />
			))}

			{/* Render a message when there are no messages */}
			{!loading && messages.length === 0 && (
				<p className="text-center">Send a message to start the conversation</p>
			)}
		</div>
	);
};

export default Messages;
