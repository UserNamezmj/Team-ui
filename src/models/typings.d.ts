/**
 * 用户字段类型
 */

export type CurrentUser = {
    id: number;
    username: string;
    userRole: number;
    userAccount?: string;
    avatarUrl?: string;
    tags?: string[];
    gender?: number;
    userPassword?: string;
    phone?: string;
    email?: string;
    userStatus?: number;
    createTime?: Date;
    updateTime?: Date;
};