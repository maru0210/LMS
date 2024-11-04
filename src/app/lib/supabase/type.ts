import {Database} from "../../../../database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type ChatMessage = Database["public"]["Tables"]["messages"]["Row"]
export type Channel = Database["public"]["Tables"]["channels"]["Row"]
export type ChannelWithLastMessage = Database["public"]["Tables"]["channels"]["Row"] & {lastMessage: ChatMessage}