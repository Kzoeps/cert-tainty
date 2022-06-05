import React from 'react';

export interface DataType {
    key: React.Key;
    name: string;
    email: string;
    institutionName: string;
    institutionType: string;
}

export interface UserData {
    documentUrl: string[];
    approvedCount: number;
    rejectedCount: number;
    inProgressCount: string;
    emailAddress: string;
    firstName: string;
    id: string;
    totalUser: number;
    institutionName: string;
    institutionType: string;
    kycStatus: string;
    lastName: string
    user: {
    id: string
    walletAddress: string
}
}