export interface ChatMessage {
  role: string;
  sender: "user" | "bot";
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}
