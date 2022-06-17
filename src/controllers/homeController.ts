import { Request, Response } from 'express';
import {sequelize} from '../instances/mysql'
//import {sequelize} from '../instances/pg'
import { Product } from '../models/Product';
import { User} from '../models/User';
import { Op, where } from 'sequelize';

export const home = async(req: Request, res: Response)=>{


    //procure por name se não encontrar adicione ao bando
    const [usuario , create] = await User.findOrCreate(
        {
            where:{name :'andre'},
            defaults:{age:87}
        }
    )


    //filter encontra apenas um item do array diferente do findAll
    /*
    let usuario = await User.findOne({where:{id:6}})
    let showUsuario = await User.findByPk(6);
    if(usuario)
    {
        
        console.log(`O USUARIO ${usuario.name} POSSUI ${usuario.age} ANOS`);

    }
    else 
    {
        console.log('USUARIO NÃO ENCONTRADO')
    }
    */
    //let searchname:String = 'mi';
    let users = await User.findAll
    (
        //{
           //attributes:['id','name','age'],
           //attributes:{exclude:['id']}, 
           //where: {name:'miguel'},
           //where:{[Op.or]:[{age:18},{name:'miguel'}]},
           //where:{/*maior qué*/age:{[Op.gte]:40,/*menor qué*/[Op.lte]:70}},
           //where:{age:{[/*entre*/Op.between]:[40,70]}} ,
           //where:{age:{[/*pegue nenhum entre*/Op.notBetween]:[40,70]}} ,
            //where:{age:{[/*todos que estão em*/Op.in]:[40,70]}} ,
           //where:{age:{[/*todos que estão em*/Op.notIn]:[40,70]}} ,
           //where:{name:{/*nomes que se parecem*/[Op.like]:`%${searchname}%`}} 
           /*coloca a lista em uma ordem*/
           //where:{age:{[Op.gte]:18}},
           //order:[['name','ASC']]/*bota em ordem os elmentos*/
           //offset:4,/*pula*/
           //limit :2/*mostre x*/

        //}
        
    );
    
    //metodos de adicionar elementos ao banco
    //build + save
    /*
    const user = User.build(
        {
            name:'pedro',
            age:90
            
        }
        );
        await user.save();
    */
    //create
    /*
    const user = User.create(
    {
        name:'fulano',
        age:17
    }
    )
    */

    //ATUALIZANDO DADOS 1
    //1.Dados a serem alterados 
    //2.condição para mudar o item
    //await User.update({name:'seu chico',age:56},{where:{id:4}});
    //ATUALIZANDO DADOS 2
    //let results = await User.findAll({where:{id:7}});
    //if(results.length > 0)
    //{
    //    let usuario = results[0];
    //    usuario.age = 60 ;
    //    usuario.name = 'pedrosa' ;
    //    await usuario.save();
    //}
    //deleta dados
    //await User.destroy(
    //    {where:
    //    {
    //        age :
    //        {[Op.lte]:18}
    //    }}
    //);
    //deleta dados 2
    //let results = await User.findAll({where:{name:'pedro'}})
    //if(results.length > 0)
    //{
    //    let usuario = results[0];
    //    await usuario.destroy();
    //}
    
    try
    {
        await sequelize.authenticate();
        console.log('conesão estabelecida com susseso'); 
    }
    catch(error)
    {
        console.log('deu problema ',error);
    }

    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Miguel',
        lastName: 'colaço',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users,

       
        
    });
};