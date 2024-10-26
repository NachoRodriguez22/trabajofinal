import { db_user, db_pass} from "../config.js";
//database
import { Sequelize } from "sequelize"

const sequelize = new Sequelize('ecommerce', db_user, db_pass, {
    host: 'localhost',
    port: 3306,
    dialect: "mysql",
    timezone: "-03:00"
});

export default sequelize

// const iniciarBase = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// iniciarBase()