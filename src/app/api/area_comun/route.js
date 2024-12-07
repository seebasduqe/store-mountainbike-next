import Database from "../lib/singlenton_db";
import { NextResponse } from "next/server";

const db = Database.instance;

export async function POST(request) {
    try {
        const { nombre, descripcion, capacidad, user_id = 1 } = await request.json();
        // Inserta los datos
        const insertQuery = `
            INSERT INTO areas_comunes (nombre, descripcion, capacidad)
            VALUES (?, ?, ?)`;
        
        await db.fetchData(insertQuery, [nombre, descripcion, capacidad]);

        // Consulta para obtener el último registro insertado
        const selectQuery = `
            SELECT * FROM areas_comunes 
            ORDER BY idarea_comun DESC LIMIT 1`;
        
        const result = await db.fetchData(selectQuery, [nombre, descripcion, capacidad]);

        // GUARDAR CREATE EN LOGS 
        const logQuery = `
            INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
            VALUES (1, 'crear', 'Se creó el área común ${nombre}', 1, ?, NOW())`;
        await db.fetchData(logQuery, [user_id]);

        return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
        console.error('Error:', error);

        //GUARDAR ERROR EN LOGS
        const logQueryError = `
            INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
            VALUES (1, 'crear', 'Error al crear área común: ${error.message}', 0, ?, NOW())`;
        await db.fetchData(logQueryError, [user_id]);

        return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
    }
}
