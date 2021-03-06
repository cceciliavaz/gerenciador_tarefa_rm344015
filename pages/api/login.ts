import type { NextApiRequest, NextApiResponse } from 'next'
import {DefaultMsgResponse} from '../../types/DefaultMsgResponse'

export default (
    req: NextApiRequest,
    res: NextApiResponse<DefaultMsgResponse>) => {
    if (req.method === 'POST') {

        const { login, password } = req.body;

        if (login === 'ana@verzel.com.br' && password === 'senha@123')
            return res.status(200).json({ msg: 'Login autenticado' });

        return res.status(400).json({ msg: 'Usuário não encontrado' });
    }
    return res.status(405).json({ error: 'Método informado não é permitido' })
}
