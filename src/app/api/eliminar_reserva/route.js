import Database from "../lib/singlenton_db";
import { NextResponse } from "next/server";

const db = Database.instance;


export async function DELETE(req) {
  const { id, iduser = 1 } = await req.json();

  if (!id) {
    return NextResponse.json({ message: 'ID no proporcionado' }, { status: 400 });
  }

  try {
    const query = 'DELETE FROM reservas WHERE idreserva = ?';
    const result = await db.fetchData(query, [id]);

    // Verifica si se eliminó alguna fila
    if (result.affectedRows === 0) {
      // Log de error
      const logQueryError = `
    INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
    VALUES (2, 'eliminar', 'Error al eliminar, reserva no encontrada', 0, ?, NOW())
`;
      await db.fetchData(logQueryError, [iduser]);
      return NextResponse.json({ message: 'Reserva no encontrada' }, { status: 404 });
    }

    const logQuery = `
    INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
    VALUES (2, 'eliminar', 'Se eliminó la reserva con ID: ${id}', 1, ?, NOW())
`;
    await db.fetchData(logQuery, [iduser]);

    return NextResponse.json({ message: 'Reserva eliminada' }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    // Log de error
    const logQueryError = `
    INSERT INTO logs (tipo, accion, descripcion, estado, user_id, fecha)
    VALUES (2, 'eliminar', 'Error al eliminar la reserva con ID: ${id}. Error: ${error.message}', 0, ?, NOW())
`;
    await db.fetchData(logQueryError, [iduser]);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}