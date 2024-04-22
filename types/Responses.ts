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
    role : 'CLIENT' | 'LAWYER'
    
}
export type loginData = {
    email : string;
    password : string;
}