
import { listenerCount } from 'events';
import type { NextApiResponse, NextApiRequest } from 'next'
import { connect } from '../../middlewares/connectToMongoDB';
import { UserModel } from '../../models/UserModel';
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse'
// import {UserModel} from '../../models/UserModel'

const registerEndpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
    try {
        if (req.method === 'POST') {
            let { name, email, password } = req.body;

            if (!name || name.trim().length < 2)
                return res.status(400).json({ error: 'Nome não é válido' });




            if (!password || password.trim().length < 6)
                return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres.' });

            let usuario = email.substring(0, email.indexOf("@"));
            let dominio = email.substring(email.indexOf("@") + 1, email.length);
            if ((usuario.length <= 2) || (dominio.length < 3) || (usuario.search("@") == 0) ||
                (dominio.search("@") == 0) || (usuario.search(" ") == 0) ||
                (dominio.search(" ") == 0) || (dominio.search(".") != 0) ||
                (dominio.indexOf(".") < 1) || (dominio.lastIndexOf(".") > dominio.length - 1))
                return res.status(400).json({ error: 'Email não é válido' });

            name = name.trim()

            const user = {
                name, //default: 'Unknow'
                email,
                password,
            }

            await UserModel.create(user)

            return res.status(200).json({ msg: 'Usuário cadastrado com sucesso.' })

        }

        return res.status(405).json({ error: 'Método informado não é permitido' })

    } catch (e) {
        console.log('Error on create user:', e);
        return res.status(500).json({ error: 'Não foi possível cadastrar usuário, entre em contato com a central de atendimento.' })
    }
}

export default connect(registerEndpoint);
