import { ClientCaseItem } from "../../types/Cards";

export const mockClients : ClientCaseItem[] = [
    {
        id: "1",
        title : "Property Dispute",
        category: "CRIMINAL",
        status: "IN_PROGRESS",
        description: `
            John Doe is a criminal who has been charged with
            multiple counts of theft, assault and battery.
            He is currently being held at the local police
            station and is awaiting trial.
            `,
        updatedAt: "2021-09-01T12:00:00Z",
        createdAt: "2021-09-01T12:00:00Z",
        
        client: {
            profile :{
            displayname: "John Doe",
            avatar : "https://randomuser.me/api/port",
             location : "Lagos, Nigeria",
           },
        },
        
    },{
        id: "2",
        title : "Divorce Settlement",
        category: "CRIMINAL",
        status: "IN_PROGRESS",
        description: `
            Jane Doe is a criminal who has been charged with
            multiple counts of theft, assault and battery.
            She is currently being held at the local police
            station and is awaiting trial.
            `,
        updatedAt: "2021-09-01T12:00:00Z",
        createdAt: "2021-09-01T12:00:00Z",
        
        client: {
            profile :{
            displayname: "Jane Doe",
            avatar : "https://randomuser.me/api/port",
             location : "Lagos, Nigeria",
           },
        },
        
    },{
        id: "3",
        title : "Child Custody",
        category: "CRIMINAL",
        status: "IN_PROGRESS",
        description: `
            Jane Doe is a criminal who has been charged with
            multiple counts of theft, assault and battery.
            She is currently being held at the local police
            station and is awaiting trial.
            `,
        updatedAt: "2021-09-01T12:00:00Z",
        createdAt: "2021-09-01T12:00:00Z",
        
        client: {
            profile :{
            displayname: "Jane Doe",
            avatar : "https://randomuser.me/api/port",
             location : "Lagos, Nigeria",
           },
        },
        
    },{
        id: "4",
        title : "Child Custody",
        category: "CRIMINAL",
        status: "IN_PROGRESS",
        description: `
            Jane Doe is a criminal who has been charged with
            multiple counts of theft, assault and battery.
            She is currently being held at the local police
            station and is awaiting trial.
            `,
        updatedAt: "2021-09-01T12:00:00Z",
        createdAt: "2021-09-01T12:00:00Z",
        
        client: {
            profile :{
            displayname: "Jane Doe",
            avatar : "https://randomuser.me/api/port",
             location : "Lagos, Nigeria",
           },
        },
        
    }
]