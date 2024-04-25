const CLIENT_NAME = 'Umer'
const ADVOCATE_NAME = 'Ali Advocate'

export type MessageResponse =  {
    _id: string;
    text: string;
    createdAt: Date | number;
    user: {
        _id : string,
        avatar : string | null | undefined,
        name : string
        
    };
    image?: string;
    video?: string;
    audio?: string;
    // system?: boolean;
    sent?: boolean;
    received?: boolean;
    pending?: boolean;
    // quickReplies?: QuickReplies;
  }
// export const MockMessages : MessageResponse[] = [
//     {
//         id : 'xmfumtuxtu',
//         createdAt : Date.now().toString(),
//         content : 'Lorem ipsum jellum sdfgs s sg',
//         type : 'text',
//         receiverId : "0",
//         sender :{
//             userId : "1",
//             avatar : undefined, 
//             name : CLIENT_NAME
//         }
//     },
//     {
//         id : 'tfghghdgdghd',
//         createdAt :Date.now().toString(),
//         receiverId : "1",
//         content : 'Lorem ipsum jellum sdfghjhj fg f hh dfhfh fjgfgs s sg',
//         type : 'text',
        
//         sender :{
//             userId : "0",
//             avatar : undefined, 
//             name : ADVOCATE_NAME
//         }
//     },

//     {
//         id : 'tfghghdgFGDGdghd',
//         createdAt :Date.now().toString(),
//         receiverId : "0",
//         content : 'Lorem ipsum jellum sdfgs  ty tyt tutututyyr sdts sg',
//         type : 'text',
   
//         sender :{
//             userId : "1",
//             avatar : undefined, 
//             name : CLIENT_NAME
//         }
//     },
// ]