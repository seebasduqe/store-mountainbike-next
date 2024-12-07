import Database from "../lib/singlenton_db";

const db = Database.instance; // Instancia de la base de datos

export async function PUT(req) {
  const { id, nombre, descripcion, capacidad, user_id = 1 } = await req.json(); // Obtener datos del cuerpo de la solicitud

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID no proporcionado' }), { status: 400 });
  }

  try {
    const updateQuery = `
      UPDATE areas_comunes 
      SET nombre = ?, descripcion = ?, capacidad = ? 
      WHERE idarea_comun = ?`;

    await db.fetchData(updateQuery, [nombre, descripcion, capacidad, id]);

    // Consulta para obtener los datos actualizados
    const selectQuery = `
      SELECT idarea_comun FROM areas_comunes 
      WHERE idarea_comun = ?`;

    const result = await db.fetchData(selectQuery, [id]);

    if (result.length === 0) {
      const logQueryError = `
      INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
      VALUES (1, 'editar', 'No se encontro area comun', 0, ?, NOW())`;
      await db.fetchData(logQueryError, [user_id]);
      return new Response(JSON.stringify({ message: 'Área común no encontrada' }), { status: 404 });
    }

    const logQuery = `
      INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
      VALUES (1, 'editar', 'Se editó el área común ${nombre}', 1, ?, NOW())`;
    await db.fetchData(logQuery, [user_id]);

    // Si la actualización fue exitosa
    return new Response(JSON.stringify({ message: 'Área común actualizada', data: result[0] }), { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    const logQueryError = `
    INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
    VALUES (1, 'editar', 'Error al editar área común: ${error.message}', 0, ?, NOW())`;
    await db.fetchData(logQueryError, [user_id]);
    return new Response(JSON.stringify({ error: 'Failed to update data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
