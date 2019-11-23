import { Participation } from '../../../../shared/types';

export interface UserState {
    user: firebase.User;
    profile: Profile;
    participations: Participation[];
}

export interface UserRights {
    isAdmin: boolean;
}

export interface Profile extends UserRights {
    name?: string;
    email?: string;
}
