import styles from './Biografia.module.css';

export default function Biografia() {
    const biografiaItens = [
        {
            id: 1,
            titulo: "Origem",
            texto: "Natural do bairro de Madureira, Marco cresceu vendo de perto os desafios da nossa cidade. Filho de uma costureira e de um motorista de ônibus, aprendeu desde cedo o valor do trabalho e da perseverança."
        },
        {
            id: 2,
            titulo: "Formação",
            texto: "Formado em Administração Pública pela UERJ com honras acadêmicas, iniciou sua trajetória profissional aos 19 anos como assistente social na Prefeitura do Rio."
        },
        {
            id: 3,
            titulo: "Experiência",
            texto: "Durante 15 anos trabalhou em projetos sociais nas comunidades cariocas, sempre acreditando que a transformação começa na base."
        },
        {
            id: 4,
            titulo: "Conquistas",
            texto: "Como gestor do programa 'Rio + Seguro', reduziu em 40% os índices de violência através de projetos de inclusão. Implementou o 'Primeira Chance', que inseriu mais de 3 mil jovens no mercado de trabalho."
        },
        {
            id: 5,
            titulo: "Vida Pessoal",
            texto: "Pai de dois filhos e casado com Ana, professora da rede municipal. Aos finais de semana, é voluntário em uma ONG que oferece reforço escolar gratuito para crianças da Zona Norte."
        },
        {
            id: 6,
            titulo: "Missão",
            texto: "Sua missão é transformar o Rio em uma cidade mais justa, segura e com oportunidades para todos através da educação, mobilidade, saúde e geração de empregos."
        }
    ];

    return (
        <section className={styles.biografia} id='biografia'>
            <h2>A Trajetória de <span className={styles.destaque}>Marco Madureira</span></h2>

            <img
                src="/images/homem-de-negocios-sorrindo-retrato.jpg"
                alt="Marco Madureira"
                className={styles.imagemMobile}
            />

            <div className={styles.conteudoWrapper}>
                <div className={styles.timelineContainer}>
                    {biografiaItens.map((item) => (
                        <div key={item.id} className={styles.timelineItem}>
                            <div className={styles.timelineMarker}></div>
                            <div className={styles.timelineContent}>
                                <h3>{item.titulo}</h3>
                                <p>{item.texto}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <img
                    src="/images/homem-de-negocios-sorrindo-retrato (1).jpg"
                    alt="Marco Madureira"
                    className={styles.imagemTablet}
                />
            </div>
        </section>
    );
}