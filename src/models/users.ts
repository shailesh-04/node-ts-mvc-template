interface UserType {
    id: number;
    name: string;
    age: number;
    email: string;
    address: string;
}
class UserModel {
    users: Array<UserType> = [];
    constructor() {
        this.users = users;
    }
    async getAllUsers(): Promise<UserType[]> {
        return this.users;
    }

}
var users = [
    {
        id: 1,
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com',
        address: '123 Main St'
    },
    {
        id: 2,
        name: 'Jane Smith',
        age: 28,
        email: 'jane.smith@example.com',
        address: '456 Elm St'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        age: 35,
        email: 'mike.johnson@example.com',
        address: '789 Oak St'
    },
    {
        id: 4,
        name: 'Sarah Brown',
        age: 27,
        email: 'sarah.brown@example.com',
        address: '234 Pine St'
    },
    {
        id: 5,
        name: 'David Wilson',
        age: 32,
        email: 'david.wilson@example.com',
        address: '345 Birch St'
    }

];


export default UserModel;