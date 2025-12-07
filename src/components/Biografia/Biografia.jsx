import styles from './Biografia.module.css';

export default function Biografia() {
    return (
        <section className={styles.biografia} id='biografia'>
            <h2>Por que <span className={styles.spanTitulo}>Marco Madureira</span>?</h2>

            <img src="/images/homem-de-negocios-sorrindo-retrato.jpg" alt="Marco Madureira" className={styles.imgMobile} />

            <div className={styles.divisoria1}></div>

            <p className={styles.p1}>
                <span className={styles.spanLetra}>N</span>atural do bairro de Madureira, Marco cresceu vendo de perto os desafios
                da nossa cidade. Filho de uma costureira e de um motorista de ônibus,
                aprendeu desde cedo o valor do trabalho e da perseverança. Formado em
                Administração Pública pela UERJ com honras acadêmicas, iniciou sua
                trajetória profissional aos 19 anos como assistente social na Prefeitura
                do Rio. Durante sua carreira, dedicou os últimos 15 anos trabalhando em
                projetos sociais nas comunidades cariocas, sempre acreditando que a
                <span className={styles.spanFraseFinal}>transformação começa na base.</span>
            </p>

            <img src="/images/homem-de-negocios-sorrindo-retrato%20(1).jpg" alt="Marco Madureira" className={styles.imgTelaGrande} />

            <div className={styles.divisoria2}></div>

            <p className={styles.p2}>
                Como gestor do programa "Rio + Seguro", reduziu em 40% os índices de
                violência em áreas de risco através de projetos de inclusão e capacitação
                profissional. Implementou o projeto "Primeira Chance", que já inseriu mais
                de 3 mil jovens no mercado de trabalho. Pai de dois filhos e casado com
                Ana, professora da rede municipal há 12 anos, Marco conhece profundamente
                a realidade das famílias cariocas. Aos finais de semana, é voluntário em
                uma ONG que oferece reforço escolar gratuito para crianças da Zona Norte.
                Sua missão é transformar o Rio em uma cidade mais justa, segura e com
                oportunidades para todos. Acredita firmemente que através da educação de
                qualidade, mobilidade urbana eficiente, saúde pública digna e geração de
                empregos, podemos construir o Rio que todos merecemos viver. "Não basta
                sonhar com uma cidade melhor, precisamos construí-la juntos, todos os
                dias", costuma dizer.
            </p>
        </section>
    );
}