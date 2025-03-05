// Інтерфейси для API
export interface ChatParticipantInfo {
    id: number;
    first_name: string;
    last_name: string;
    avatar_url?: string | null;
}

export interface Chat {
    id: number;
    student_id: number;
    psychologist_id: number;
    created_at: string;
    last_message?: MessageResponse | null;
    participant_info?: ChatParticipantInfo | null;
}

export interface MessageResponse {
    id: number;
    chat_id: number;
    sender_id: number;
    text: string;
    created_at: string;
}

export interface CreateChatRequest {
    student_id: number;
    psychologist_id: number;
}

export interface Psychologist {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    avatar_url?: string;
    specialization?: string;
    experience_years?: number;
}