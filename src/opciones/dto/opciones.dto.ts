import { ApiProperty } from "@nestjs/swagger";

export class OpcionesDto {
    @ApiProperty()
    opcionId: number;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    descripcion: string;

    @ApiProperty()
    icono: string;

    @ApiProperty()
    esActivo: boolean;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}
