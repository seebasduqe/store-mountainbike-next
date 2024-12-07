import mysql from 'mysql2/promise';
class Database {

    //La variable estática privada #instance se utiliza para almacenar la única instancia de la clase
    static #instance;

    /* 
    El constructor verifica si ya existe una instancia de Database. 
    Si es así, devuelve esa instancia en lugar de crear una nueva
    */
    constructor() {
        if (Database.#instance) {
            return Database.#instance;
        }

        //se crea un pool de conexiones a la base de datos usando mysql.createPool()
        this.pool = mysql.createPool({
            host: 'localhost',
            port:3306,
            user: 'user_estudiante', //process.env.MYSQL_USER,
            password: 'password',//process.env.MYSQL_PASSWORD,
            database: 'espacios-compartidos_bd', //process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        Database.#instance = this; // Guardamos la instancia
    }

    //Este método permite ejecutar consultas en la base de datos
    async fetchData(query, params) {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute(query, params);
            return rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        } finally {
            //liberaramo la conexión una vez que se completa el proceso
            connection.release();
        }
    }

    //verificamos si podemos hacer conexion a la db
    async checkConnection() {
        const connection = await this.pool.getConnection();
        try {
            await connection.query('SELECT 1');
            console.log('Conexión a la base de datos exitosa.');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        } finally {
            connection.release();
        }
    }

    //Este es el método que proporciona acceso a la instancia de la db
    static get instance() {
        //Si no existe ninguna instancia, se crea una nueva
        if (!this.#instance) {
            this.#instance = new Database();
        }
        return this.#instance;
    }
    /* Este método es el punto de acceso global a la clase Singleton */
}

export default Database;
