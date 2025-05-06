import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { OpcionesTransformer } from "@/grpc/transformers/opciones.transformers";

@Injectable()
export class OpcionesService {
    constructor(private prisma: PrismaService) {}

    async create(data: any) {
        const opcionesdata = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            icono: data.icono,
            es_activo: data.es_activo ?? data.esActivo,
        };

        const result = await this.prisma.opciones.create({ data: opcionesdata });
        return OpcionesTransformer.toGrpc(result);
    }

    async findAll(param?: {page?: number, limit?: number; search?: string}) {
        const page  = param && param.page && param.page > 0 ? param.page : 1;
        const limit = param && param.limit && param.limit > 0 ? param.limit : 10;
        const skip = (page - 1) * limit;
        const where = param && param.search ? { nombre: { contains: param.search, mode: Prisma.QueryMode.insensitive} } : undefined;
        const [opciones, total] = await Promise.all([
            this.prisma.opciones.findMany({ where, skip, take: limit }),
            this.prisma.opciones.count({ where })
        ]);
        return {
            data: opciones.map(OpcionesTransformer.toGrpc),
            pagination: {
                page,
                limit,
                total,
                total_pages: Math.ceil(total / limit)
            },
        };
    }

    async findOne(opcionId: number) {
        if (typeof opcionId !== 'number' || isNaN(opcionId) || opcionId === null || typeof opcionId === 'undefined') {
            console.error('[OpcionesService][findOne] opcionId invalido:', opcionId);
            throw new NotFoundException(`Parametro opcionId invalido: ${opcionId}`);
        }
        console.log('[OpcionesService][findOne] Buscando opcionId:', opcionId);
        const opciones = await this.prisma.opciones.findUnique({ where: { opcion_id: opcionId } });
        if (!opciones) {
            throw new NotFoundException(`Opcion con id ${opcionId} no encontrada`);
        }
        return OpcionesTransformer.toGrpc(opciones);
    }

    async update(opcionId: number, data: any) {
        await this.findOne(opcionId);
        const opcionesData = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            icono: data.icono,
            es_activo: data.es_activo ?? data.esActivo,
        };
        const result = await this.prisma.opciones.update({ 
            where: { opcion_id: opcionId },
            data: opcionesData,
        });
        return OpcionesTransformer.toGrpc(result);
    }

    async remove(opcionId: number) {
        try {
            await this.prisma.opciones.delete({ where: { opcion_id: opcionId } });
            return { success: true };
        } catch (error) {
            throw new NotFoundException(`Opcion con id ${opcionId} no encontrada`);
        }
    }
}
