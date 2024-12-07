import Database from "../lib/singlenton_db";
import moment from 'moment';

const db = Database.instance;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID no proporcionado' }), { status: 400 });
  }

  try {
    const query = 'SELECT ac.*, r.idreserva, r.descripcion as r_descripcion, r.fecha_inicio, r.fecha_final FROM areas_comunes as ac JOIN reservas as r ON r.idarea_comun = ac.idarea_comun WHERE idreserva = ?';
    const result = await db.fetchData(query, [id]);

    if (result.length === 0) {
      return new Response(JSON.stringify({ message: 'Reserva no encontrada' }), { status: 404 });
    }

    result[0].fecha_inicio = moment(result[0].fecha_inicio).format('YYYY-MM-DD');
    result[0].fecha_final = moment(result[0].fecha_final).format('YYYY-MM-DD');
    return new Response(JSON.stringify(result[0]), { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
