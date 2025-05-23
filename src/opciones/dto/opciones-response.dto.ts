import { ApiProperty } from "@nestjs/swagger";

export class OpcionesResponseDto {
    @ApiProperty({ example: 1 })
    opcionId: number;

    @ApiProperty({ example: "Opcion 1" })
    nombre: string;

    @ApiProperty({ example: "Descripcion de la opcion 1" })
    descripcion: string;

    @ApiProperty({ example: "icono de la opcion 1" })
    icono: string;

    @ApiProperty({ example: true })
    es_activo: boolean;

    @ApiProperty({ example: "2022-01-01T00:00:00.000Z" })
    createdAt: string;

    @ApiProperty({ example: "2022-01-01T00:00:00.000Z" })
    updatedAt: string;
}
