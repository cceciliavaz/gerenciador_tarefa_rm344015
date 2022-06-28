import mongoose from 'mongoose';
import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import { DefaultMsgResponse } from '../types/DefaultMsgResponse';

export const connect = (handler: NextApiHandler) => 
async(req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) =>
{
    const CONECTION = mongoose.connections[0].readyState;
    console.log('MongoDB readyState:', CONECTION)

    if(CONECTION) return handler(req, res)

    const DB_CONECTION_STRING = 'mongodb://localhost:27017/87aoj0gerenciador-tarefas'
    
    mongoose.connection.on('connected', () => console.log('Conectado no banco de dados'));
    mongoose.connection.on('error', err => console.log('Erro ao conectar no banco de dados', err));

    await mongoose.connect(DB_CONECTION_STRING);

    return handler(req, res)
}
