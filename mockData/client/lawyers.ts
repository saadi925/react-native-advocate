import { LawyerItem } from "../../types/Cards";
// id: number;
//     status: CaseStatus;
//     rating: number;
//     description: string;
//     experience: string;
//     updatedAt: string;
//     createdAt: string;
//     user: {
//         profile: {
//             avatar: string;
//             displayname: string;
//             location: string;
//         };
//     };
export const mockLawyers : LawyerItem[] = [
    {
        id: 1,
        status: "AVAILABLE",
        rating: 4.5,
        description: "I am a lawyer with 5 years of experience in criminal law. I have successfully defended over 100 clients in court.",
        experience: "5 years",
        updatedAt: "2021-09-01T00:00:00.000Z",
        createdAt: "2021-09-01T00:00:00.000Z",
        user: {
            profile: {
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
                displayname: "John Doe",
                location: "New York, NY",
            }
        }
    },
    {
        id: 2,
        status: "BUSY",
        rating: 4.2,
        description: "I am a lawyer with 10 years of experience in family law. I have successfully handled over 500 cases.",
        experience: "10 years",
        updatedAt: "2021-09-01T00:00:00.000Z",
        createdAt: "2021-09-01T00:00:00.000Z",
        user: {
            profile: {
                avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhY2V8ZW58MHx8MHx8fDA%3D",
                displayname: "Jane Doe",
                location: "Los Angeles, CA",
            }
        }
    },
    {
        id: 3,
        status: "OFFLINE",
        rating: 4.0,
        description: "I am a lawyer with 15 years of experience in corporate law. I have successfully handled over 1000 cases.",
        experience: "15 years",
        updatedAt: "2021-09-01T00:00:00.000Z",
        createdAt: "2021-09-01T00:00:00.000Z",
        user: {
            profile: {
                avatar: "https://images.unsplash.com/photo-1560787313-5dff3307e257?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGZhY2V8ZW58MHx8MHx8fDA%3D",
                displayname: "Alice Doe",
                location: "Chicago, IL",
            }
        }
    }

]