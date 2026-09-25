export interface Rule{
    id: string;
    description: string;
    conditionFact: string;
    conditionValue: string;
    resultFact: string;
    resultValue: string;
}

export interface CreateRule{
    description: string;
    conditionFact: string;
    conditionValue: string;
    resultFact: string;
    resultValue: string;
}

export interface DeleteRule{
    id: string;
}