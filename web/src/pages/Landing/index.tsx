import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
import './styles.css';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import teachIcon from '../../assets/images/icons/give-classes.svg';
import heartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);

    /** a função (1º param) é executanda quando a variavel (2º param) muda de estado */
    /** se o 2º param é vazio, a função só é executada uma vez (quando renderiza o componente) */
    useEffect(() => {
        api.get('/connections').then(response => {
            const total = response.data.total;
            setTotalConnections(total);
        })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                
                <img src={landingImg} 
                    alt="Plataforma de estudos" 
                    className="hero-image" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="estudar" />
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={teachIcon} alt="dar aulas" />
                        Dar aulas
                    </Link>
                    
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas.
                    <img src={heartIcon} alt="coração roxo"/>
                </span>
            </div>
        </div>
    );
}

export default Landing;