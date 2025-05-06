import { Module } from '@nestjs/common';
import { OpcionesModule } from './opciones/opciones.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [OpcionesModule],
  providers: [PrismaService],
})
export class AppModule {}
