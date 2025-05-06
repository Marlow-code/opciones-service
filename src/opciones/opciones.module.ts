import { Module } from "@nestjs/common";
import { OpcionesService } from "./opciones.service";
import { PrismaService } from "src/prisma/prisma.service";
import { OpcionesGrpcService } from "@/grpc/opciones.grpc.service";
import { OpcionesController } from "./opciones.controller";

@Module({
    controllers: [OpcionesController, OpcionesGrpcService],
    providers: [OpcionesService, PrismaService],
    exports: [OpcionesService],
})
export class OpcionesModule {}