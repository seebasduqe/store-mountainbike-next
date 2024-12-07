import Database from "../../lib/singlenton_db";
import { NextResponse } from 'next/server'; // Asegúrate de importar NextResponse

const db = Database.instance; // Instancia de la base de datos

export async function POST(request) {
    try {
        const { username, nombre, apellido1, apellido2, email, password, direccion, telefono } = await request.json();

        const query = `
            INSERT INTO users (username, nombre, apellido1, apellido2, email, password,direccion, telefono)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        // Ejecuta la inserción
        await db.fetchData(query, [username, nombre, apellido1, apellido2, email, password, direccion, telefono]);

        // Opcional: Consulta para obtener el último registro insertado
        const lastInsertIdQuery = 'SELECT * FROM users WHERE id = LAST_INSERT_ID()';
        const lastInsertResult = await db.fetchData(lastInsertIdQuery);

        // Log de éxito
        const logQuery = `
            INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
            VALUES (3, 'crear', 'Nuevo usuario registrado: ${username}', 1, NULL, NOW())`;
        await db.fetchData(logQuery);

        return NextResponse.json(lastInsertResult[0], { status: 201 });
    } catch (error) {
        console.error('Database insertion error:', error);
        // Log de error
        const logQueryError = `
            INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
            VALUES (3, 'crear', 'Error al registrar usuario: ${error.message}', 0, NULL, NOW())`;

        await db.fetchData(logQueryError);
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}
