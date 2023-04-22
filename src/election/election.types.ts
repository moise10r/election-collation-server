export interface CreateElectionDto {
  electionType: string;
  electionDate: Date;
  electionArea: string[];
}

export interface PusQueryObject {
  state?: string;
  lga?: string;
  ward?: string;
}

export interface MinimalPoliticalParty {
  name: string;
  id: number;
}
export interface PolPartiesUnit {
  politicalParty: MinimalPoliticalParty;
}

export interface GetElectionReturn {
  electionDate: Date;
  electionType: string;
  id: string;
  politicalParties: PolPartiesUnit[];
}

export interface SummedVotes {
  name: string;
  id: number;
  totalVotes: number;
}
