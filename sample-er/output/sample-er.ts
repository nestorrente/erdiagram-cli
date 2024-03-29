interface User {
    id?: number;
    username: string;
    name: string;
    birthday?: Date;
    avatar?: Uint8Array;
    active: boolean;
    country: Country;
    alternativeCountry?: Country;
    permissions: Permission[];
    follows: User[];
    followers: User[];
}

interface Country {
    theCountryId?: number;
    code: string;
    name: string;
}

interface Permission {
    id?: number;
    code: string;
    description: string;
    users: User[];
}

interface Tree {
    id?: number;
    headNode: TreeNode;
}

interface TreeNode {
    id?: number;
    value: number;
    parent?: TreeNode;
    children: TreeNode[];
}
