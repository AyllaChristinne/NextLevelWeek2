import {Request, Response} from 'express';
import db from '../database/connection';

export default class ConnectionsController {
    async index(request: Request, response: Response) {
        const totalConn = await db('connections').count('* as total');

        /** usando { } pq vou pegar só uma coluna do resultado da query */
        /** usando [0] pq retorna um array, mas com um registro só (count) */
        const { total } = totalConn[0];
 
        return response.json({ total });
    }

    async create(request: Request, response: Response) {
        const { user_id } = request.body;
        
        await db('connections').insert({
            user_id
        });
        
        return response.status(201).send();
    }
}