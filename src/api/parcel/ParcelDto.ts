
export interface GetAllRole{
    readonly pageNumber: number;
    readonly pageSize: number;
}

export interface GetAllParcel{
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly code: number | string;
}