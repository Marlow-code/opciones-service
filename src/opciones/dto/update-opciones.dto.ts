import { PartialType } from "@nestjs/mapped-types";
import { CreateOpcionesDto } from "./create-opciones.dto";

export class UpdateOpcionesDto extends PartialType(CreateOpcionesDto) {
}
