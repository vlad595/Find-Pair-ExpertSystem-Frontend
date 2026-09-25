export interface MatchData {
  bestMatch: {
    id: string;
    fullName: string;
    gender: string;
    age: number;
    facts: Record<string, string>;
  };
  compatibilityScore: number;
  inferredClientFacts: Record<string, string>;
}

export interface FactComparison {
  key: string;
  clientValue: string;
  matchValue: string;
  isMatch: boolean;
}

export interface FindMatchData {
  targetGender: string;
  facts: Record<string, string>;
}