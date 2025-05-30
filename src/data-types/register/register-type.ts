import { 
    UserRole,
    PreferredCommunication, 
    SessionFrequency, 
    LearningStyle 
} from '../../core/enum/registration-enum';

export interface UserDetailsDTO {
    FullName: string;
    Bio: string;
    Avatar: string;
    Skills: string;
    Experience: string;
    PrefferedComm: PreferredCommunication;
    LearningGoal: string;
    SessionFreq: SessionFrequency;
    SessionDur: number;
    PrefferedStyle: LearningStyle;
    Availability: string;
    Expertise: string;
    Preference: string;
    TeachingApproach: string;
    IsPrivate: boolean;
    MessageAllowed: boolean;
    NotiAllowed: boolean;
}

export interface RegisterAccount {
    Email: string;
    Password: string;
    Role: UserRole;
    UserDetailsToAddDTO: UserDetailsDTO;
}

export interface RegisterResponse {
    userID: string;
    email: string;
    role: UserRole;
    registrationStatus: number;
    message?: string;
}

export interface ErrorResponse {
    statusCode: number;
    detail: string;
    errors?: {
        [key: string]: string[];
    };
}

export interface RegistrationResult {
    responseCode: number;
    responseBody: RegisterResponse | ErrorResponse;
}