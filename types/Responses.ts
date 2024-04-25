import { ProfileInput } from "./Cards";

export interface SignupResponse {
    message : string;
    redirectToVerify : boolean;
}
export interface signupData {
    name : string;
    email : string;
    password : string;
    role : 'CLIENT' | 'LAWYER'
    }
export type loginResponse = {
    token : string;
    success : boolean
    profile : ProfileInput
    role : 'CLIENT' | 'LAWYER',
    userId : string
    
}
export type loginData = {
    email : string;
    password : string;
}


export type OtherLawyerProfile = {
    profileId : string, displayname : string, avatar :  string, createdAt : string, bio : string, location : string, phone : string, lawyerProfile : {
        id: string;
        description: string;
        experience: string;
        education: string;
        specialization: string;
        status: "AVAILABLE" | "BUSY" | "OFFLINE";
        contact:{
            email : string;
            website : string;
            instagram : string;
            phone : string;
            linkedin : string;
            officeAddress : string;
            facebook : string;
        }
    }
}
export type OtherClientProfile = {
    id: string;
    displayname: string;
    avatar: string;
    location: string;
    bio: string;
    phone: string;
    user :{
     online : boolean,
     lawyerCases : any[],
     clientCases : any[]
    }
    createdAt: string;
    updatedAt: string;

}