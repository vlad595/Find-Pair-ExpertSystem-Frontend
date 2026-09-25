export interface CandidateCreation{
    fullName: string;
    gender: string;
    age: number;
    facts: Record<string, string>;
}

export interface CandidateResponse{
    id: string;
    fullName: string;
    gender: string;
    age: number;
    facts: Record<string, string>;
}
export interface CandidateDeletion{
    id: string;
}
