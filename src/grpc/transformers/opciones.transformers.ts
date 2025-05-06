import { Opciones } from "../interfaces/opciones.interface";

export class OpcionesTransformer {
    static toGrpc(data: any): Opciones {
        return {
            opcion_id: data.opcion_id ?? 0,
            nombre: data.nombre ?? "",
            descripcion: data.descripcion ?? "",
            icono: data.icono ?? "",
            es_activo: data.es_activo ?? false,
            created_at: data.created_at ?? new Date().toISOString(),
            updated_at: data.updated_at ?? new Date().toISOString(),
        };
    }

    static fromGrpc(data: any): any {
        return {
            opcion_id: data.opcion_id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            icono: data.icono,
            es_activo: data.es_activo,
            created_at: data.created_at,
            updated_at: data.updated_at,
        };
    }
}