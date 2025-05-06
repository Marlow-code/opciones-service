import { ApiProperty } from "@nestjs/swagger";


export class OpcionesEntity {
    opcion_id: number;
    nombre: string;
    descripcion: string;
    icono: string;
    es_activo: boolean;
    created_at: Date;
    updated_at: Date;
}