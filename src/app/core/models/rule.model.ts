export interface Rule{
    Id: string;
    Description: string;
    ConditionFact: string;
    ConditionValue: string;
    ResultFact: string;
    ResultValue: string;
}

export interface CreateRule{
    Description: string;
    ConditionFact: string;
    ConditionValue: string;
    ResultFact: string;
    ResultValue: string;
}

export interface DeleteRule{
    Id: string;
}