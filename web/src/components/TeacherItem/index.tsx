import React from "react";

import wppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
        <header>
            <img src="https://avatars.githubusercontent.com/u/48658933?v=4" alt="avatar" />
            <div>
                <strong>Aylla Christinne</strong>
                <span>Comédia</span>
            </div>
        </header>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Purus ut faucibus pulvinar elementum integer enim 
            neque volutpat ac. 
            <br /><br />
            Eu augue ut lectus arcu bibendum at. 
            Sem nulla pharetra diam sit amet nisl. Varius sit amet 
            mattis vulputate. Semper auctor neque vitae tempus quam 
            pellentesque nec nam aliquam
        </p>
        <footer>
            <p>
                Preço/hora
                <strong>R$ 50,00</strong>
            </p>
            <button type="button">
                <img src={wppIcon} alt="whatsapp"/>
                Entrar em contato
            </button>
        </footer>
    </article>
    );
}

export default TeacherItem;
