import PrimaryLayout, {
	Highlight,
	PageText,
	PageTitle,
	ParagraphLink,
	ParagraphTitle,
	TextContainer,
	UList,
} from "@/components/general/PrimaryLayout/PrimaryLayout";
import React from "react";

export default function sobre() {
	return (
		<>
			<PrimaryLayout>
				<div className="container">
					<PageTitle>Sobre</PageTitle>

					<TextContainer>
						<PageText>
							<Highlight>Muvi</Highlight> (que eu decidi chamar assim porque o
							nome era curto e legal o suficiente para soar como uma marca) é
							mais uma daquelas aplicações de estudos baseadas em listas de
							usuário. É, sobretudo, o resultado de duas semanas de leitura de
							documentações para aprender como manejar autenticações e
							databases.
						</PageText>
						<ParagraphTitle tag="h4">#Stack</ParagraphTitle>
						<PageText>A stack utilizada foi:</PageText>
						<UList
							style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
						>
							<li>
								<ParagraphLink href="#nextjs">NextJS</ParagraphLink>
							</li>
							<li>
								<ParagraphLink href="#nextauth">NextAuth</ParagraphLink>
							</li>
							<li>
								<ParagraphLink href="#prisma">Prisma</ParagraphLink>
							</li>
							<li>
								<ParagraphLink href="#mongodb">MongoDB</ParagraphLink>
							</li>
							<li>
								<ParagraphLink href="#swr">SWR</ParagraphLink>
							</li>
							<li>
								<ParagraphLink href="#tmdb">
									The Movie Database (TMDB)
								</ParagraphLink>
							</li>
						</UList>

						<PageText>
							<br />O código está disponível{" "}
							<ParagraphLink
								href="https://github.com/g-pg/movies-list"
								target="_blank"
							>
								neste repositório
							</ParagraphLink>{" "}
							no Github.
							<br />
						</PageText>
						<ParagraphTitle tag="h4" id="nextjs">
							#NextJs
						</ParagraphTitle>
						<PageText>
							A escolha do Next como framework foi baseada na facilidade de
							criações de rotas API na própria aplicação, isto é, sem a
							necessidade de criação de rotas em outros servidores com Node.
							Foram criadas quatro handlers (sem contar a do NextAuth) para
							requests feitas no cliente, mas controladas pelo servidor: para
							registro de usuário com credenciais, para busca de dados do
							usuário na database, para atualização destes dados e para a busca
							individualizada de filmes na TMDB.
							<br />
							<br />O NextJS também oferece otimização integrada de imagens, o
							que vem muito a calhar em uma aplicação que mostra dezenas de
							imagens (pôsteres) em cada página.
						</PageText>
						<ParagraphTitle tag="h4" id="nextauth">
							#NextAuth
						</ParagraphTitle>
						<PageText>
							O NextAuth é uma library de autenticação de usuário criada para o
							Next. Ela oferece suporte para autenticação com credenciais
							(usuário e senha) e OAuth com outros providers. Nesta aplicação,
							utilizei os providers do Google e do Github. Além disso, o
							NextAuth conta com suporte para o Prisma, facilitando o registro
							das informações na database.
						</PageText>
						<ParagraphTitle tag="h4" id="mongodb">
							#MongoDB
						</ParagraphTitle>
						<PageText>
							MongoDB é um sistema de organização de database NoSQL. A
							estrutura básica é feita de Collections e Documents, em que cada
							Document é um objeto JSON (um usuário) e cada Document um grupo
							de Collections.
						</PageText>
						<ParagraphTitle tag="h4" id="prisma">
							#Prisma
						</ParagraphTitle>
						<PageText>
							Prisma é uma ferramente de ORM (Object-Relational Mapping), isto
							é, um recurso para estruturar e operar databases. A estruturação
							da database é feita através de um <Highlight>esquema</Highlight>,
							que é depois integrado ao sistema escolhido. Em outras palavras,
							pode-se utilizar o Prisma para definir (e tipar, pois o Prisma
							utiliza Typescript) os campos de cada documento na database, como
							e-mail (string), senha (string) ou lista de filmes (array), e
							também declarar as relações entre campos, documentos e coleções
							(atrelar um ID de usuário a uma coleção de filmes, por exemplo).
							<br />
							<br />
							Alguns documentos foram criados com base nos dados recebidos da
							autenticação por provedores externos. Já o documento User foi
							criado para guardar informações mais específicas, como as listas
							de filmes assistidos e não assistidos.
						</PageText>
						<ParagraphTitle tag="h4" id="swr">
							#SWR
						</ParagraphTitle>
						<PageText>
							SWR é (um presente dos céus) uma técnica de data-fetching criada
							pela Vercel, a mesma companhia por trás do Next. Através do hook
							useSWR é possível salvar os dados recebidos de uma API e
							guardá-los em um cache no cliente, compartilhado por toda a
							aplicação e revalidado automaticamente (ou conforme as nossas
							especificações).
							<br />
							<br />
							Assim, sempre que uma request for feita à mesma API, todos os
							componentes que utilizam o hook receberão dados atualizados, sem
							precisar fazer outras requests enquanto os dados forem válidos.
							<br /> <br /> O uso mais importante do SWR nesta aplicação foi a
							função <Highlight>mutate()</Highlight>. Ela permite adicionar
							dados diretamente ao cache sem fazer outra request à API. Deste
							modo, cada vez que um usuário adiciona ou exclui um filme de
							alguma lista, podemos enviar diretamente os dados do filme ao
							cache e evitar que outras dezenas de solicitações sejam feitas à
							TMDB para obter os dados da nova lista e renderizá-los no
							cliente. Como os hooks feitos à mesma API são compartilhados pela
							aplicação, é possível alterar o cache sem precisar criar
							contextos ou passar props através de inúmeros componentes.
						</PageText>
						<ParagraphTitle tag="h4" id="tmdb">
							#The Movie Database
						</ParagraphTitle>
						<PageText>
							Todos os dados dos filmes são obtidos client-side através da API
							da{" "}
							<ParagraphLink href="https://www.themoviedb.org/documentation/api">
								The Movie Database
							</ParagraphLink>
							. As listas do usuário na database guardam apenas os IDs dos
							filmes. Fiz esta escolha para evitar sobrecarregar a database
							(muitas vezes desnecessários para o meu propósito).
							<br />
							<br />
							Um dos problemas atuais da TMDB é a impossibilidade de se fazer
							uma única request para obter dados de mais de um filme. Para
							solucioná-lo, criei um hook com SWR (useMoviesInfo) e uma API
							(searchmovie) para mapear todos os items da array de IDs salva
							pelo usuário. Cada iteração do map na API faz uma request para a
							TMDB, e o hook retorna uma array com os dados de todos os filmes.
							Com a combinação destas ferramentas, os dados necessários são
							obtidos com uma linha de código em cada componente, e eles podem
							ser atualizados (graças ao SWR) apenas utlizando-se o mutate.
						</PageText>
						<ParagraphTitle
							tag="h4"
							style={{ color: "var(--cl-accent)", fontSize: "2rem" }}
						>
							Finalmente...
						</ParagraphTitle>
						<PageText>
							Confesso que aprender tudo isso foi um baita de um desafio, mas
							estou muito contente com o resultado. Se você perceber qualquer
							otimização possível na aplicação, passe lá no{" "}
							<ParagraphLink
								href="https://github.com/g-pg/movies-list"
								target="_blank"
							>
								repositório
							</ParagraphLink>{" "}
							ou entre em contato comigo. Vou ficar muito feliz em aprender
							mais alguma coisa!
						</PageText>
					</TextContainer>
				</div>
			</PrimaryLayout>
		</>
	);
}
