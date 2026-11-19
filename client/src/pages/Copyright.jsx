import { Container } from "react-bootstrap";

const Copyright = () => {
    return (
        <Container className="mt-4 mb-5 markdown-body">
            <div className="about-container">
                <h2>Copyright and Terms of Use</h2>
                <br />
                <h4>Copyright</h4>
                <p>
                    © 2009–2026 Lanten Yao Traditional Text Archive project
                    team. All rights reserved.
                </p>
                <p>
                    The digital images of traditional texts, photographs,
                    essays and other materials on this website were produced
                    by the project “The Preservation, Compilation and Reading
                    of Lanten Yao Traditional Texts in Northern Laos”, with the
                    local collaboration of the National Library of Laos and the
                    financial support of the Toyota Foundation. Unless
                    otherwise noted, copyright in these materials is held by
                    the project team and the respective authors and
                    photographers.
                </p>

                <h4>The traditional texts and their owners</h4>
                <p>
                    The traditional texts themselves belong to the Lanten
                    people and to the ritual practitioners and families who
                    keep them. They were photographed with the generous
                    cooperation of the owners for the purposes of preservation
                    and research. Please treat these materials with respect for
                    the communities and the ritual traditions they represent.
                </p>

                <h4>Permitted use</h4>
                <p>
                    You may freely view and browse the materials on this
                    website, and refer to them for personal study, research and
                    education.
                </p>

                <h4>Use that requires permission</h4>
                <p>
                    Reproduction, redistribution, publication (in print or
                    online), modification, or any commercial use of the images,
                    photographs or texts on this website requires prior written
                    permission from the project team. This includes downloading
                    and re-hosting the PDF files of the texts.
                </p>

                <h4>Citation</h4>
                <p>
                    When referring to materials from this archive in research
                    or publications, please cite the archive and the text’s
                    identifier, for example:
                </p>
                <p>
                    <em>
                        Lanten Yao Traditional Text Archive, [text title / ID].
                        Photographed 2009–2010 by the project “The
                        Preservation, Compilation and Reading of Lanten Yao
                        Traditional Texts in Northern Laos”. Accessed [date].
                    </em>
                </p>

                <h4>Contact</h4>
                <p>
                    For permission requests or questions about the materials,
                    please contact the project team:
                </p>
                <section>
                    Shinsuke TOMITA, The University of Tokyo
                    <br />
                    Nathan BADENOCH, Kyoto University
                    <br />
                    Ryoji SODA, Osaka City University
                </section>
            </div>
        </Container>
    );
};

export default Copyright;
