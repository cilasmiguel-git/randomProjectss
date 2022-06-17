import {Model,DataTypes} from 'sequelize';
import {sequelize} from '../instances/mysql';
//import {sequelize} from '../instances/pg';

export interface userInstance extends Model
{
    id:number,
    name:String,
    age:number
}
export const User = sequelize.define<userInstance>
("User",
{
    id:
    {
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    name:
    {
        type:DataTypes.STRING,
        //pega o dado e transtforma em maiuscula
        get()
        {
            const raw = this.getDataValue('name') ;
            return raw.toUpperCase();
        }

    },
    //deixa claro que esse campo e virtual ou seja não esta no banco de dados
    getletterofname:
    {
        type:DataTypes.VIRTUAL,  
        get(){
            let name :string = this.getDataValue('name')//puxa o dado
            return name.charAt(0);//pega promeira letra 
        }
        

    },
    age:
    {
        type:DataTypes.INTEGER,
        defaultValue:18,
        //pega o dado e se a idade for menor que 18 adiciona 18
        set(value:number)
        {
            if(value < 18)
            {
                value = 18;
            }
            this.setDataValue('age',value);
       
        }
    },
},
{
    tableName:'users',
    timestamps:false
}
);