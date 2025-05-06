export interface Opciones {
    opcion_id: number;
    nombre: string;
    descripcion: string;
    icono: string;
    es_activo: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateOpcionesRequest {
    nombre: string;
    descripcion: string;
    icono: string;
    esActivo: boolean;
}   

export interface GetOpcionesRequest {
    opcionId: number;
    nombre: string;
    descripcion: string;
    icono: string;
    esActivo: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ListOpcionesRequest {
    page?: number;
    limit?: number;
    search?: string;
}

export interface ListOpcionesResponse {
    data: Opciones[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
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


