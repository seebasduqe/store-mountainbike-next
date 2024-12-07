import Database from "../lib/singlenton_db";

const db = Database.instance;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID no proporcionado' }), { status: 400 });
  }

  try {
    const query = 'SELECT * FROM areas_comunes WHERE idarea_comun = ?';
    const result = await db.fetchData(query, [id]);

    if (result.length === 0) {
      return new Response(JSON.stringify({ message: 'Área común no encontrada' }), { status: 404 });
    }

    return new Response(JSON.stringify(result[0]), { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
