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
    const opcionId = data.opcionId ?? data.opcionId;
    console.log('[gRPC][GetOpciones] Request:', data);
    const result = await this.opcionesService.findOne(opcionId);
    const grpcobj = OpcionesTransformer.toGrpc(result);
    console.log('[gRPC][GetOpciones] Response:', grpcobj);
    return grpcobj;
}

@GrpcMethod('OpcionesService', 'ListOpciones')
async findAll(data: ListOpcionesRequest): Promise<ListOpcionesResponse> {
    const opciones = await this.opcionesService.findAll();
    const grpcArray = opciones.data.map(a => OpcionesTransformer.toGrpc(a));

    return {
        opciones: grpcArray,
        total: opciones.pagination.total,
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
