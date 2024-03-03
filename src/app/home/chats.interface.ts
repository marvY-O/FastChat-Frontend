
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