import styles from "./HeroSection.module.css";
import PrimaryBtn from "@components/PrimaryBtn/PrimaryBtn";
import Image from "next/image";
import classNames from "classnames";

import gladiatorPoster from "@public/img/gladiator-poster.jpg";
import matrixPoster from "@public/img/matrix-poster.jpg";

export default function HeroSection() {
	return (
		<div className={styles.wrapper}>
			<div className={classNames(styles.column, styles.firstColumn)}>
				<h2>O que é bom a gente guarda.</h2>
				<p>
					Por que perder aquela recomendação se você pode anotar tudo aqui? Registre
					os filmes que você quer ver e nunca mais perca tempo procurando o que
					assistir.
				</p>
				<PrimaryBtn>Começar agora</PrimaryBtn>
			</div>
			<div className={classNames(styles.column, styles.secondColumn)}>
				{/* <div className={styles.imgWrapper}> */}
				<div>
					<Image src={gladiatorPoster} alt="Poster do Gladiador" />
				</div>
				<div>
					<Image src={matrixPoster} alt="Poster do Gladiador" />
				</div>
				{/* </div> */}
			</div>
		</div>
	);
}
