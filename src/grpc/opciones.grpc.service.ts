import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { OpcionesService } from "../opciones/opciones.service";
import { OpcionesTransformer } from "./transformers/opciones.transformers";
import {
    CreateOpcionesRequest,
    GetOpcionesRequest,
    ListOpcionesRequest,
    ListOpcionesResponse,
    UpdateOpcionesRequest,
    DeleteOpcionesRequest,
    DeleteOpcionesResponse,
    Opciones,
} from "./interfaces/opciones.interface";


@Controller()
export class OpcionesGrpcService {
    constructor(private readonly opcionesService: OpcionesService) {}

    @GrpcMethod('OpcionesService', 'CreateOpciones')
    async create(data: CreateOpcionesRequest): Promise<Opciones> {
        const result = await this.opcionesService.create(data);
        const grpcobject = OpcionesTransformer.toGrpc(result);
        return grpcobject;
    }
    
@GrpcMethod('OpcionesService', 'GetOpciones')
async findOne(data: GetOpcionesRequest): Promise<Opciones> {
    const result = await this.opcionesService.findOne(data.opcionId);
    const grpcobject = OpcionesTransformer.toGrpc(result);
    return grpcobject;
}

@GrpcMethod('OpcionesService', 'ListOpciones')
async list(data: ListOpcionesRequest): Promise<ListOpcionesResponse> {
    const result = await this.opcionesService.findAll(data);
    return {
        data: result.data.map(OpcionesTransformer.toGrpc),
        pagination: {
            page: result.pagination.page,
            limit: result.pagination.limit,
            total: result.pagination.total,
            total_pages: result.pagination.total_pages
        }
    };
}

@GrpcMethod('OpcionesService', 'UpdateOpciones')
async update(data: UpdateOpcionesRequest): Promise<Opciones> {
    const {opcionId, ...updateData} = data;
    const result = await this.opcionesService.update(opcionId, updateData);
    const grpcObj = OpcionesTransformer.toGrpc(result);
    return grpcObj;
}

@GrpcMethod('OpcionesService', 'DeleteOpciones')
async delete(data: DeleteOpcionesRequest): Promise<DeleteOpcionesResponse> {
    await this.opcionesService.remove(data.opcionId);
    return { success: true };
}
}
