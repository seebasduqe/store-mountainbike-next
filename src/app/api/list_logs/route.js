import Database from '../lib/singlenton_db';

export async function GET(request, res) {

  const db = Database.instance;

  try {
    const query = 'SELECT logs.*, users.nombre, users.apellido1 FROM logs LEFT JOIN users ON users.id = logs.user_id';
    const data = await db.fetchData(query);
    console.log(data);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}