
export interface Message {
    time: string,
    message: string,
    sent: boolean
}
export interface Chat{
    id: string,
    name: string,
    last_message: Message;
}
export interface Conversation {
    name: string
    conversation: Message[];
}

export interface FirstFetchMessageResponse {
    chat_id: number
    message_id: number
    sender_id: string
    receiver_id: string
    content: string
    timestamp: string
}