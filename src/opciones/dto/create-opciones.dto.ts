import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean } from "class-validator";

export class CreateOpcionesDto {
    @ApiProperty({ example: "Opcion 1" })
    @IsString()
    nombre: string;

    @ApiProperty({ example: "Descripcion de la opcion 1" })
    @IsString()
    descripcion: string;

    @ApiProperty({ example: "icono de la opcion 1" })
    @IsString()
    icono: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    es_activo: boolean;
}
