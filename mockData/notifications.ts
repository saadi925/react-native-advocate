import { Notification } from "../types/Cards";

export const mockNotifications : Notification[] = [
    {
        id: '1',
        message: 'You have a new friend request',
        createdAt: '2023-10-10T12:00:00Z',
        read: false,
        avatarUrl: '',
        name: 'John Bae'
    },
    {
        id: '2',
        message: 'Your case request has been accepted',
        createdAt: '2023-10-10T12:00:00Z',
        read: true,
        avatarUrl: '',
        name: 'Kin Doe'
    },
    {
        id: '3',
        message: 'Your case request has been rejected',
        createdAt: '2023-10-10T12:00:00Z',
        read: false,
        avatarUrl: '',
        name: 'Lucy Lane'
    },
    {
        id: '4',
        message: 'You have a new friend request',
        createdAt: '2023-10-10T12:00:00Z',
        read: false,
        avatarUrl: '',
        name: 'Marko Polo'
    },
    {
        id: '5',
        message: 'You have a new friend request',
        createdAt: '2023-10-10T12:00:00Z',
        read: false,
        avatarUrl: '',
        name: 'John Bae'
    },
]