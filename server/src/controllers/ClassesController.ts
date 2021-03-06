import {Request, Response} from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {  
    /* Listar aulas */
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.subject || !filters.week_day || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }
        
        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
        /** FILTRO DE AULA MARCADA EM TAL HORAÁRIO E DIA*/
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    /* pegar todas as aulas marcadas  */
                    .whereRaw('`class_schedule`.`class.id` = `classes`.`ìd`')
                    /** em tal dia da semana */
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    /** marcadas no horário do filtro ou antes */
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    /** e terminam depois do horario do filtro */
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            /** FILTRO DE AULA MARCADA E QUE SEJA DE TAL MATÉRIA */
            .where('classes.subject', '=', subject)
            /** JOIN com usuarios (proffys) para saber quem dá a aula */
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

            return response.json(classes);

    }


    async create (request: Request, response: Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;
        const trx = await db.transaction();
    
        try {
            /* insert SEMPRE retorna uma lista de ids inseridos */
            const insertedUsersId = await trx('users').insert({
                name, avatar, whatsapp, bio
            });
            /* pegar o 1º id inserido para usar em outras tabelas */
            const user_id = insertedUsersId[0];
    
            const insertedClassesId = await trx('classes').insert({
                subject, cost, user_id
            });
            const class_id = insertedClassesId[0];
    
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                };
            });
    
            await trx('class_schedule').insert(classSchedule);
    
            await trx.commit();
    
            return response.status(201).send();
    
        } catch (err) {
            console.log(err);
                       
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class.'
            });
        }
       
    }
}