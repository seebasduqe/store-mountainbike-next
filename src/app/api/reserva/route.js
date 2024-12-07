import Database from "../lib/singlenton_db"
import { NextResponse } from "next/server"
import AreaComun from "../lib/AreaComun"
import ReservaObserver from "../lib/ReservaObserver"

const db = Database.instance;

export async function POST(request) {
    try {
        // Obtén los datos de la reserva desde el cuerpo de la solicitud
        const { descripcion, fecha_inicio, fecha_final, estado, idarea_comun, iduser } = await request.json();

        //INICIO IMPLEMENTACION PATRON DE DISEÑO OBSERVER
        //EL PATRON OBSERVER DURANRE EL FLUJO REVISARA CAMBIOS COMO CAMBIO DE ESTADO DISPONIBILIDAD AREA COMUN ANTES DE GUARDAR RESERVA)

        // Crea una instancia de AreaComun para el área específica
        const areaComun = new AreaComun(idarea_comun);

        // Crea un observador
        const reservaObserver = new ReservaObserver();
        // Agrega el observador al área común
        areaComun.addObserver(reservaObserver);

        // Comprobar disponibilidad antes de crear una nueva reserva
        const disponibilidad = await areaComun.checkDisponibilidad(fecha_inicio, fecha_final);
        console.log(disponibilidad);
        if (disponibilidad) {
            // Log de error
            const logQueryError = `
        INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
        VALUES (2, 'crear', 'El área común ya tiene reservas en esta fecha.', 0, ?, NOW())
        `;
            await db.fetchData(logQueryError, [iduser]);
            return NextResponse.json({ error: 'El área común ya tiene reservas en esta fecha.' }, { status: 400 });
        }

        // Inserta los datos en la tabla de reservas
        const insertQuery = `
      INSERT INTO reservas (descripcion, estado, idarea_comun, fecha_inicio, fecha_final, iduser) 
      VALUES (?, ?, ?, ?, ?, ?);
    `;

        await db.fetchData(insertQuery, [descripcion, estado, idarea_comun, fecha_inicio, fecha_final, iduser]);

        // Crea un objeto reserva para agregarlo al área común
        const nuevaReserva = { descripcion, estado, fecha_inicio, fecha_final, idarea_comun, iduser };

        // Agregar la reserva y notificar a los observadores
        await areaComun.addReserva(nuevaReserva);

        // Consulta para obtener el último registro insertado
        const selectQuery = `
            SELECT * FROM reservas 
            ORDER BY idreserva DESC LIMIT 1;
            `;

        const result = await db.fetchData(selectQuery);


        const logQuery = `
            INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
            VALUES (2, 'crear', 'Se creó la reserva para el área común id: ${idarea_comun} por el usuario ${iduser}', 1, ?, NOW())
        `;
        await db.fetchData(logQuery, [iduser]);

        // Devuelve la reserva creada como respuesta
        return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        // Log de error
        const logQueryError = `
         INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
         VALUES (2, 'crear', 'Error al crear la reserva: ${error.message}', 0, ?, NOW())
     `;
        await db.fetchData(logQueryError, [iduser]);
        return NextResponse.json({ error: 'Error al insertar datos' }, { status: 500 });
    }
}
