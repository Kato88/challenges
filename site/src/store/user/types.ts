import { Participation } from '../../../../shared/types';

export interface UserState {
    profile: any;
    isAdmin: boolean;
    participations: Participation[];
}

export interface UserRights {
    isAdmin: boolean;
}
