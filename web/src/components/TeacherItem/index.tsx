import React from "react";

import wppIcon from '../../assets/images/icons/whatsapp.svg';
import api from "../../services/api";

import './styles.css';

/** exportando para usar o id em TeacherList */
export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {user_id: teacher.id})
    }

    return (
        <article className="teacher-item">
        <header>
            <img src={teacher.avatar} alt={teacher.name} />
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>
        <p>{teacher.bio}</p>
        <footer>
            <p>
                Preço/hora
                <strong>R$ {teacher.cost}</strong>
            </p>
            <a target="_blank" 
                onCLick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`} type="button"
            >
                <img src={wppIcon} alt="whatsapp"/>
                Entrar em contato
            </a>
        </footer>
    </article>
    );
}

export default TeacherItem;
