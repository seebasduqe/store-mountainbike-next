import Database from "./singlenton_db";
const db = Database.instance;

class AreaComun {
    constructor(id) {
        this.id = id;
        this.observers = [];
        this.reservas = []; // Guardar las reservas en memoria
    }

    // Método para agregar observadores
    addObserver(observer) {
        this.observers.push(observer);
    }

    // Método para eliminar observadores
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Notificar a los observadores sobre cambios
    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }

    // Método para agregar una reserva y notificar
    async addReserva(reserva) {
        this.reservas.push(reserva);
        this.notifyObservers();
    }

    // Método para comprobar disponibilidad
    async checkDisponibilidad(fecha_inicio, fecha_final) {
        const selectQuery = `
                SELECT COUNT(*) as count FROM reservas 
                WHERE idarea_comun = ? 
                AND (fecha_inicio < ? AND fecha_final > ?)
        `;
        const resultado = await db.fetchData(selectQuery, [this.id, fecha_final, fecha_inicio]);
        console.log(resultado);
        return resultado[0].count > 0; // Retorna true si hay reservas que se cruzan
    }
}

export default AreaComun;
