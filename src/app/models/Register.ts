export interface CountriesResponse{
    success: boolean;
    data: Country[];
}

export interface Country{
    id: number;
    name: string;
    phone_code: string;
    prefix: string;
}