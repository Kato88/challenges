import { LeaderboardEntry } from '../../../../shared/types';

export interface LeaderboardState {
    entries: LeaderboardEntry[];
    listener: any;
}
