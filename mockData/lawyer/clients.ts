import { ClientCaseItem } from "../../types/Cards";

export const mockClients : ClientCaseItem[] = [
    {
        id: "1",
        title : "Property Dispute",
        category: "CRIMINAL",
        status: "IN_PROGRESS",
        description: "John Doe is a criminal who has been charged with multiple counts of theft, assault and battery. He is currently being held at the local police station and is awaiting trial.",
        updatedAt: "2021-09-01T12:00:00Z",
        createdAt: "2021-09-01T12:00:00Z",
        
        client: {
            profile :{
            displayname: "John Doe",
            avatar : "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3N8ZW58MHx8MHx8fDA%3D",
             location : "Lagos, Nigeria",
           },
        },
        
    },{
        id: "2",
        title : "Divorce Settlement",
        category: "FAMILY",
        status: "RESOLVED",
        description: "John Doe is a criminal who has been charged with multiple counts of theft, assault and battery. He is currently being held at the local police station and is awaiting trial.",
        updatedAt: "2021-09-01T12:00:00Z",
        createdAt: "2021-09-01T12:00:00Z",
        
        client: {
            profile :{
            displayname: "Jane Doe",
            avatar : "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3N8ZW58MHx8MHx8fDA%3D",
             location : "Lagos, Nigeria",
           },
        },
        
    },{
        id: "3",
        title : "Child Custody",
        category: "CRIMINAL",
        status: "OPEN",
        description: "John Doe is a criminal who has been charged with multiple counts of theft, assault and battery. He is currently being held at the local police station and is awaiting trial.",
        updatedAt: "2021-09-01T12:00:00Z",
        createdAt: "2021-09-01T12:00:00Z",
        
        client: {
            profile :{
            displayname: "Jane Doe",
            avatar : "https://plus.unsplash.com/premium_photo-1689632031083-518b012767a4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGUlMjBwaWNzfGVufDB8fDB8fHww",
             location : "Lagos, Nigeria",
           },
        },
        
    },{
        id: "4",
        title : "Child Custody",
        category: "CRIMINAL",
        status: "IN_PROGRESS",
        description: "John Doe is a criminal who has been charged with multiple counts of theft, assault and battery. He is currently being held at the local police station and is awaiting trial.",
        updatedAt: "2021-09-01T12:00:00Z",
        createdAt: "2021-09-01T12:00:00Z",
        
        client: {
            profile :{
            displayname: "Jane Doe",
            avatar : "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWNzfGVufDB8fDB8fHww",
             location : "Lagos, Nigeria",
           },
        },
        
    }
]