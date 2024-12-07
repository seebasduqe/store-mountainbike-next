import Database from "../lib/singlenton_db";

const db = Database.instance; // Instancia de la base de datos

export async function PUT(req) {
  const { id, descripcion, fecha_inicio, fecha_final, iduser = 1 } = await req.json(); // Obtener datos del cuerpo de la solicitud

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID no proporcionado' }), { status: 400 });
  }

  try {
    const updateQuery = `
      UPDATE reservas 
      SET descripcion = ?, fecha_inicio = ?, fecha_final = ?   
      WHERE idreserva = ?`;

    await db.fetchData(updateQuery, [descripcion, fecha_inicio, fecha_final, id]);

    // Consulta para obtener los datos actualizados
    const selectQuery = `
      SELECT idreserva FROM reservas 
      WHERE idreserva = ?`;

    const result = await db.fetchData(selectQuery, [id]);

    if (result.length === 0) {
      const logQueryError = `
            INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
            VALUES (2, 'editar', 'Reserva no encontrada', 0, ?, NOW())
        `;
      await db.fetchData(logQueryError, [iduser]);
      return new Response(JSON.stringify({ message: 'Reserva no encontrada' }), { status: 404 });
    }

    // Log de éxito
    const logQuery = `
    INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
    VALUES (2, 'editar', 'Se actualizó la reserva con ID ${id}', 1, ?, NOW())
`;
    await db.fetchData(logQuery, [iduser]);

    // Si la actualización fue exitosa
    return new Response(JSON.stringify({ message: 'Reserva actualizada', data: result[0] }), { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    const logQueryError = `
            INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
            VALUES (2, 'editar', 'Error al editar la reserva con ID ${id}: ${error.message}', 0, ?, NOW())
        `;
    await db.fetchData(logQueryError, [iduser]);
    return new Response(JSON.stringify({ error: 'Failed to update data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
