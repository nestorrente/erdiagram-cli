interface User {
    id: number;
    username: string;
    name: string;
    birthday?: Date;
    userNum: number;
    active: boolean;
    country: Country;
    alternativeCountry?: Country;
    permissions: Permission[];
    follows: User[];
    followers: User[];
}

interface Country {
    id: number;
    code: string;
    name: string;
}

interface Permission {
    id: number;
    code: string;
    description: string;
    users: User[];
}

interface Tree {
    id: number;
    headNode: TreeNode;
}

interface TreeNode {
    id: number;
    value: number;
    parent?: TreeNode;
    children: TreeNode[];
}
