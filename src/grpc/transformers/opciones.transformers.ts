import { Opciones } from "../interfaces/opciones.interface";

export class OpcionesTransformer {
    static toGrpc(data: any): Opciones {
        const opcionId = data.opcion_id ?? data.opcionId ?? 0;
        const esActivo = data.es_activo ?? data.esActivo ?? false;
        const createdAtISO = data.created_at ?
            (data.created_at instanceof Date ? data.created_at.toISOString() : new Date(data.created_at).toISOString())
            : new Date().toISOString();
        const updatedAtISO = data.updated_at ?
            (data.updated_at instanceof Date ? data.updated_at.toISOString() : new Date(data.updated_at).toISOString())
            : new Date().toISOString();
        return {
            opcionId,
            nombre: data.nombre ?? "",
            descripcion: data.descripcion ?? "",
            icono: data.icono ?? "",
            esActivo,
            createdAt: createdAtISO,
            updatedAt: updatedAtISO,
        };
    }

    static fromGrpc(data: any): any {
        return {
            ...data,
            opcionId: data.opcionId,
            nombre: data.nombre,
            descripcion: data.descripcion,
            icono: data.icono,
            esActivo: data.esActivo,
            createdAt: data.createdAt || null,
            updatedAt: data.updatedAt || null,
        };
    }
}