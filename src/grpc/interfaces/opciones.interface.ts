export interface Opciones {
    opcionId: number;
    nombre: string;
    descripcion: string;
    icono: string;
    esActivo: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOpcionesRequest {
    nombre: string;
    descripcion: string;
    icono: string;
    esActivo: boolean;
}   

export interface GetOpcionesRequest {
    opcionId: number;
}

export interface ListOpcionesRequest {
    page?: number;
    limit?: number;
    search?: string;
}

export interface ListOpcionesResponse {
    opciones: Opciones[];
    total: number;
}

export interface UpdateOpcionesRequest {
    opcionId: number;
    nombre: string;
    descripcion: string;
    icono: string;
    esActivo: boolean;
}

export interface DeleteOpcionesRequest {
    opcionId: number;
}

export interface DeleteOpcionesResponse {
    success: boolean;
}


