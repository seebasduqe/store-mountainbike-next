import Database from "../lib/singlenton_db";
import { NextResponse } from "next/server";

const db = Database.instance;


export async function DELETE(req) {
  const { id, user_id = 1 } = await req.json();

  if (!id) {
    return NextResponse.json({ message: 'ID no proporcionado' }, { status: 400 });
  }

  try {
    const query = 'DELETE FROM areas_comunes WHERE idarea_comun = ?';
    const result = await db.fetchData(query, [id]);

    // Verifica si se eliminó alguna fila
    if (result.affectedRows === 0) {
      const logQueryError = `
      INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
      VALUES (1, 'eliminar', 'Error, area comun no encontrada', 0, ?, NOW())`;
      await db.fetchData(logQueryError, [user_id]);
      return NextResponse.json({ message: 'Área común no encontrada' }, { status: 404 });
    }

    // Log de éxito
    const logQuery = `
     INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
     VALUES (1, 'eliminar', 'Se eliminó el área común con ID: ${id}', 1, ?, NOW())`;

    await db.fetchData(logQuery, [user_id]);

    return NextResponse.json({ message: 'Área común eliminada' }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    const logQueryError = `
      INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
      VALUES (1, 'eliminar', 'Error al eliminar área común con ID: ${id}. Error: ${error.message}', 0, ?, NOW())`;
    await db.fetchData(logQueryError, [user_id]);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}