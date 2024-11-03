// src/types/Employee.ts

export interface Employee {
    id: number;
    documentId: string;
    email: string;
    first_name: string;
    last_name: string;
    title: string;
    address: string;
    phone1: string;
    phone2: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    url: string;
    website: string;
    meta_img: {
        url: string; // Simplified: only include the main URL you need
    };
    // meta_img: {
    //     id: number;
    //     documentId: string;
    //     name: string;
    //     alternativeText: string | null;
    //     caption: string | null;
    //     width: number;
    //     height: number;
    //     formats: {
    //         large?: { url: string; width: number; height: number; size: number };
    //         medium?: { url: string; width: number; height: number; size: number };
    //         small?: { url: string; width: number; height: number; size: number };
    //         thumbnail?: { url: string; width: number; height: number; size: number };
    //     };
    //     hash: string;
    //     ext: string;
    //     mime: string;
    //     size: number;
    //     url: string;
    //     previewUrl: string | null;
    //     provider: string;
    //     provider_metadata: any | null;
    //     createdAt: string;
    //     updatedAt: string;
    //     publishedAt: string;
    // };
}
