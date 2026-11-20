import { Container } from "react-bootstrap";

const Copyright = () => {
    return (
        <Container className="mt-4 mb-5 markdown-body">
            <div className="about-container">
                <h2>Copyright and Terms of Use</h2>
                <br />
                <h4>Copyright</h4>
                <p>
                    © 2009–2026 Lanten Yao Traditional Texts Project.
                </p>
                <p>
                    The digital images of traditional texts, photographs,
                    essays and other materials on this website were produced
                    from 2009 to 2010 by the project “The Preservation,
                    Compilation and Reading of Lanten Yao Traditional Texts in
                    Northern Laos” (the Lanten Yao Traditional Texts Project),
                    with the permission and local collaboration
                    of the National Library of Laos and the financial support
                    of the Toyota Foundation. Unless otherwise noted, these
                    materials are held by the project and the respective
                    authors and photographers.
                </p>

                <h4>License</h4>
                <p>
                    Unless otherwise noted, the materials on this website are
                    licensed under the{" "}
                    <a
                        href="https://creativecommons.org/licenses/by-nc/4.0/"
                        target="_blank"
                        rel="license noopener noreferrer"
                    >
                        Creative Commons Attribution-NonCommercial 4.0
                        International License (CC BY-NC 4.0)
                    </a>
                    .
                </p>
                <p>Under this license you are free to:</p>
                <ul>
                    <li>
                        <strong>Share</strong>: copy and redistribute the
                        material in any medium or format.
                    </li>
                    <li>
                        <strong>Adapt</strong>: remix, transform and build
                        upon the material.
                    </li>
                </ul>
                <p>under the following terms:</p>
                <ul>
                    <li>
                        <strong>Attribution</strong>: you must give
                        appropriate credit (see “Citation” below), provide a
                        link to the license, and indicate if changes were
                        made.
                    </li>
                    <li>
                        <strong>NonCommercial</strong>: you may not use the
                        material for commercial purposes.
                    </li>
                </ul>
                <p>
                    For commercial use, please contact the project team for
                    permission.
                </p>

                <h4>The traditional texts and their owners</h4>
                <p>
                    The traditional texts themselves belong to the Lanten
                    people and to the ritual practitioners and families who
                    keep them. The original manuscripts remain with their
                    owners. They were photographed with the generous
                    cooperation of the owners for the purposes of preservation
                    and research, and only texts that their owners allowed us
                    to photograph are included; texts that Lanten people asked
                    us not to photograph were not recorded.
                </p>
                <p>
                    Please treat these materials with respect for the
                    communities and the ritual traditions they represent. Some
                    texts are marked “silent reading”: in the Lanten tradition
                    these texts are not read aloud during rituals.
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
                        Traditional Texts in Northern Laos”. Licensed under CC
                        BY-NC 4.0. Accessed [date].
                    </em>
                </p>

                <h4>Contact</h4>
                <p>
                    For commercial-use requests or questions about the materials,
                    please contact:
                </p>
                <p>
                    Shinsuke TOMITA
                    <br />
                    <a href="mailto:tomishing@gmail.com">tomishing@gmail.com</a>
                </p>
                <p>Project team:</p>
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
