-- CreateTable
CREATE TABLE "opciones" (
    "opcion_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "icono" TEXT NOT NULL,
    "es_activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opciones_pkey" PRIMARY KEY ("opcion_id")
);
