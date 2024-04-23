export type Notification = {
    id: string;
    message: string;
    createdAt: string;
    read: boolean;
    avatarUrl: string | null;
    name: string | null;
}
export type CaseStatus = 'OPEN' | 'REVIEW' | 'ASSIGNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'RESOLVED'
 | 'DISMISSED' | 'PENDING' | 'CLOSED'
export type CaseDataInput = {
    title: string;
    description: string;
    category : CaseCategory
}
export type CaseCategory = 'FAMILY'
|'CRIMINAL'
| 'CIVIL' |'LABOUR'
|'PROPERTY'
| 'BUSINESS'
|'OTHER'

export type SentFriendRequest = {
    id: string;
    receiver: {
        profile: {
            displayname: string | null;
            avatar: string | null;
        } | null;
    };
    status: any;
    createdAt: string;
    updatedAt: string;
}

export type FriendRequest = {
    id: bigint;
    status: CaseStatus;
    createdAt: string;
    updatedAt: string;
    sender: {
        profile: {
            displayname: string | null;
            avatar: string | null;
        } | null;
    };
}
export type LawyerCaseRequest = {
    id: bigint;
    status: CaseStatus;
    createdAt: string;
    caseId: bigint;
    client: {
        profile: {
            displayname: string | null;
            avatar: string | null;
        } | null;
    };
}

export type ClientCaseRequest = {
    id: bigint;
    status: CaseStatus;
    createdAt: string;
    caseId: bigint;
    lawyer: {
        name: string | null;
        profile: {
            displayname: string | null;
            avatar: string | null;
        } | null;
    };
}

export type LawyerCaseItem = {
    id: string;
    status: any;
    title: string;
    description: string;
    upstringdAt: string;
    createdAt: string;
    client: {
        name: string | null;
        profile: {
            avatar: string | null;
        } | null;
    };
}

export type ClientCaseItem = {
    id: string;
    status: CaseStatus;
    title: string;
    description: string;
    updatedAt: string;
    createdAt: string;
    category : CaseCategory
    client: {
        profile: 
        {
            avatar: string | null;
            location : string | null;
            displayname: string | null;
        } | null;
    };
}

export type LawyerItem = {
   id : number
   status : "AVAILABLE" | "BUSY" | "OFFLINE"
   rating : number
   description : string
   experience : string 
   updatedAt : string 
   createdAt : string 
   user : {
    profile : {
        avatar : string
        displayname : string 
        location : string 
    }
   }
}

export type ProfileInput = {
    location : string | undefined,
    bio : string | undefined,
    displayname : string | undefined, 
    phone : string | undefined ,
    avatar : string | undefined | null
}

export type ClientProfile = {}

export type LawyerProfile = {
    id?: string;
    status?: "AVAILABLE" | "BUSY" | "OFFLINE";
    // rating: number;
    description?: string;
    experience?: string;
    updatedAt?: string;
    createdAt?: string
    education? : string,
    specialization? : string,
    email ?: string,
    website? : string,
    instagram ?: string,
    phone? : string,
    linkedin?: string,
    officeAddress? : string,
    facebook? : string,
}


export type profile = {
    id: string;
    displayname: string;
    avatar: string;
    location: string;
    bio: string;
    phone: string;
    user :{
      role : string;
    }
    createdAt: string;
    updatedAt: string;
  };