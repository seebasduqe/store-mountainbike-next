import Database from '../lib/singlenton_db';
import moment from 'moment';

export async function GET(request, res) {

    const db = Database.instance;

    try {
        const query_areas_comunes = `SELECT idarea_comun, nombre FROM areas_comunes`;
        const data_areas_comunes = await db.fetchData(query_areas_comunes);

        const query_reservas = `SELECT idreserva, idarea_comun, descripcion, DATE(fecha_inicio) as fecha_inicio, DATE(fecha_final) as fecha_final FROM reservas ORDER BY fecha_inicio DESC`;
        const data_reservas = await db.fetchData(query_reservas);

        const areasConReservas = {};

        data_reservas.forEach(reserva => {
            
            // Formatear las fechas con Moment.js
            const formattedFechaInicio = moment(reserva.fecha_inicio).format('YYYY-MM-DD');
            const formattedFechaFinal = moment(reserva.fecha_final).format('YYYY-MM-DD');
            // Agregar las fechas formateadas a la reserva
            reserva.fecha_inicio = formattedFechaInicio;
            reserva.fecha_final = formattedFechaFinal;
        });

        // Iterar sobre las reservas y asignarlas a las áreas comunes correspondientes
        data_reservas.forEach(reserva => {
            if (!areasConReservas[reserva.idarea_comun]) {
                areasConReservas[reserva.idarea_comun] = {
                    ...data_areas_comunes.find(area => area.idarea_comun === reserva.idarea_comun),
                    reservas: []
                };
            }
            areasConReservas[reserva.idarea_comun].reservas.push(reserva);
        });

        const areasConReservasArray = Object.values(areasConReservas);
        console.log(areasConReservasArray);
        return new Response(JSON.stringify(areasConReservasArray), {
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