import { ApiProperty } from "@nestjs/swagger";

export class OpcionesDto {
    @ApiProperty()
    opcion_id: number;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    descripcion: string;

    @ApiProperty()
    icono: string;

    @ApiProperty()
    es_activo: boolean;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}
