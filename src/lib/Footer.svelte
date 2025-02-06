<footer>
	<p>GNTH Agence web</p>
	<!--googleoff: index-->
	<details>
		<summary>Mentions légales</summary>

		<p>
			Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en
			l'économie numérique, il est précisé aux utilisateurs du site https://gnth.fr l'identité des
			différents intervenants dans le cadre de sa réalisation et de son suivi.
		</p>
		<p>
			<strong>Société</strong><br />GNTH Agence Web<br />Kévin Ganthy, entrepreneur individuel<br
			/>Adresse : 2B impasse de la cour des landes, 17600 Nieulle-sur-seudre<br />Siret : 919 205
			088 00017
		</p>
		<p><strong>Contact</strong><br />Email : kevin.ganthy@gmail.com<br />Téléphone : 06 68 28 51 97</p>
		<p><strong>Editeur</strong><br />Identité : Kévin Ganthy<br />Email : kevin.ganthy@gmail.com</p>
		<p>
			<strong>Hébergeur</strong><br />IONOS SARL au capital de 100 000 EUR - 7, place de la Gare BP
			70109 57200 Sarreguemines Cedex France (contact téléphonique ou email : (+33) 9 70 80 89 11)
		</p>
	</details>
	<!--googleon: index-->
</footer>

<style lang="scss">
	@use '@styles/vars';
	@use '@styles/mixins';

	footer {
		display: flex;
		flex-direction: column;
		background-color: vars.$color-bg-dark;
		color: vars.$color-bg-light;
		padding: 1rem 1rem 3rem;
		width: 100%;
		margin: 3rem 0 0 0;
		box-sizing: border-box;

		@include mixins.large {
			grid-column: 2;
		}

		> p {
			margin: 1rem auto 2rem;
			@include mixins.large {
				margin: 1rem 10rem 2rem;
			}
		}

		details {
			@include mixins.large {
				margin: 0 10rem;
			}
		}
	}
</style>
