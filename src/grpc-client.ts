import { credentials } from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';
 
const PROTO_PATH = join(__dirname, '../proto/opciones/opciones.proto');
 
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
 
const proto = require('@grpc/grpc-js').loadPackageDefinition(packageDefinition).opciones;
 
async function main() {
    const client = new proto.OpcionesService(
        'localhost:5016',
        credentials.createInsecure()
    );
 
    try {
        console.log('Creando opcion...');
        const createResult = await new Promise((resolve, reject) => {
            client.CreateOpciones(
                {
                    nombre: 'Opcion 1',
                    descripcion: 'Opcion 1',
                    icono: 'Opcion 1',
                    esActivo: true,
                },
                (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
        const create: any = createResult;
        console.log('Opcion creada exitosamente:', JSON.stringify(create, null, 2));
   
        console.log('Listando opciones...');
        const listResult = await new Promise((resolve, reject) => {
            client.ListOpciones(
                { page: 1, limit: 10 },
                (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
        const list: any = listResult;
        console.log('Opciones listadas exitosamente:', JSON.stringify(list, null, 2));
 
 
        console.log('Obteniendo opcion...');
        const getResult = await new Promise((resolve, reject) => {
            client.GetOpciones(
                { opcionId: create.opcion_id },
                (err, response) => {
                    if (err) reject(err);
                    resolve(response);
                }
            );
        });
        const get: any = getResult;
        console.log('Opcion obtenida exitosamente:', JSON.stringify(get, null, 2));
 
        console.log('Actualizando opcion...');
        const updateResult = await new Promise((resolve, reject) => {
            client.UpdateOpciones(
                {
                    opcionId: create.opcion_id,
                    nombre: 'Opcion 11',
                    descripcion: 'Opcion 11',
                    icono: 'Opcion 11',
                    esActivo: false,
                },
                (err, response) => {
                    if (err) reject(err);
                    resolve(response);
                }
            );
        });
        const update: any = updateResult;
        console.log('Opcion actualizada exitosamente:', JSON.stringify(update, null, 2));
 
        console.log('Eliminando opcion...');
        const deleteResult = await new Promise((resolve, reject) => {
            client.DeleteOpciones(
                { opcionId: create.opcion_id },
                (err, response) => {
                    if (err) reject(err);
                    resolve(response);
                }
            );
        });
        const del: any = deleteResult;
        console.log('Opcion eliminada exitosamente:', JSON.stringify(del, null, 2));
    } catch (error) {
        console.error('Error en gRPC:', error);
    }
}
 
main();