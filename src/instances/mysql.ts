import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();
//conequição mysql
export const sequelize = new Sequelize
(
    process.env.MYSQL_DB as string ,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
       dialect:"mysql",
       port:parseInt(process.env.MYSQL_PORT as string)
    }
);
/*
//conequição postgrees
export const sequelize = new Sequelize
(
    process.env.PG_DB as string ,
    process.env.PG_USER as string,
    process.env.PG_PASSWORD as string,
    {
       dialect:"postgres",
       port:parseInt(process.env.PG_PORT as string)
    }
);
*/