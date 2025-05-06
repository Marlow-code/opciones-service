import { 
    Controller, 
    Get,
    Post,
    Param,
    Body,
    Patch,
    Delete,
    BadRequestException, 
    Query} from "@nestjs/common";
import { OpcionesService } from "./opciones.service";
import { CreateOpcionesDto } from "./dto/create-opciones.dto";
import { UpdateOpcionesDto } from "./dto/update-opciones.dto";
import { OpcionesDto } from "./dto/opciones.dto";
import { ApiTags, ApiBody, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiQuery } from "@nestjs/swagger";

@ApiTags('Opciones')
@Controller('opciones')
export class OpcionesController {
    constructor(private readonly opcionesService: OpcionesService) {}

    @ApiBody({ type: CreateOpcionesDto })
    @ApiCreatedResponse({ description: 'Opcion creada exitosamente', type: OpcionesDto })
    @Post()
    async create(@Body() createOpcionesDto: CreateOpcionesDto) {
        const opciones = await this.opcionesService.create(createOpcionesDto);
        return { message: 'Opcion creada exitosamente', data: opciones };
    }

    @ApiOkResponse({ description: 'Opcion obtenida exitosamente', type: [OpcionesDto] })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Pagina actual' })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Limit de registros' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Busqueda' })
    @Get()
    async findAll(@Query('page') page?: number, @Query('limit') limit?: number, @Query('search') search?: string) {
        const result = await this.opcionesService.findAll({ page, limit, search });
        return { 
            message: 'Opciones obtenidas exitosamente', 
            data: result.data,
            pagination: result.pagination
         };
    }

    @ApiParam({ name: 'id', required: true})
    @ApiOkResponse({ description: 'Opcion obtenida exitosamente', type: OpcionesDto })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const opcioneid = Number(id);
        if (isNaN(opcioneid)) {
            throw new BadRequestException('El id debe ser un numero');
        }
        const opciones = await this.opcionesService.findOne(opcioneid);
        return { message: 'Opcion obtenida exitosamente', data: opciones };
    }

    @ApiParam({ name: 'id', required: true})
    @ApiBody({ type: UpdateOpcionesDto, 
        examples: {
            ejemplo: {
                value: {
                    nombre: 'Opcion 1',
                    descripcion: 'Opcion 1',
                    icono: 'Opcion 1',
                    esActivo: true
                }
            }
        }
    })
    @ApiOkResponse({ description: 'Opcion obtenida exitosamente', type: OpcionesDto })
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateOpcionesDto: UpdateOpcionesDto) {
        const opcioneid = Number(id);
        if (isNaN(opcioneid)) {
            throw new BadRequestException('El id debe ser un numero');
        }
        const opciones = await this.opcionesService.update(opcioneid, updateOpcionesDto);
        return { message: 'Opcion actualizada exitosamente', data: opciones };
    }

    @ApiParam({ name: 'id', required: true})
    @ApiOkResponse({ description: 'Opcion obtenida exitosamente', schema: { example: {message: 'Opcion eliminada exitosamente', data: { success: true}}}})
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const opcioneid = Number(id);
        if (isNaN(opcioneid)) {
            throw new BadRequestException('El id debe ser un numero');
        }
        const result = await this.opcionesService.remove(opcioneid);
        return { message: 'Opcion eliminada exitosamente', data: result };
    }
    
}
