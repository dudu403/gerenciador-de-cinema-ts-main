import { API_KEY } from "../../../secrets.sample";
import "./filme-detalhes.css";

export class DetalhesFilme {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    const filmeId = urlParams.get("id");

    if (filmeId) {
      this.carregarDetalhesDoFilme(filmeId);
    } else {
      console.error("Nenhum ID de filme fornecido na URL.");
    }
  }

  private async carregarDetalhesDoFilme(filmeId: string) {
    const filmeApiUrl = `https://api.themoviedb.org/3/movie/${filmeId}?language=pt-BR&api_key=${API_KEY}`;

    try {
      const filmeResponse = await fetch(filmeApiUrl);
      const filmeData = await filmeResponse.json();

      const filmeTitulo = document.getElementById("filmeTitulo") as HTMLHeadingElement;
      const filmeVotos = document.getElementById("filmeVotos") as HTMLParagraphElement;
      const dataLancamento = document.getElementById("dataLancamento") as HTMLParagraphElement;
      const filmePoster = document.getElementById("filmePoster") as HTMLImageElement;
      const iframeTrailer = document.getElementById("iframeTrailer") as HTMLIFrameElement;
      const filmeSinopse = document.getElementById("filmeSinopse") as HTMLParagraphElement;
      const filmeGeneros = document.getElementById("filmeGeneros") as HTMLDivElement;

      filmeTitulo.textContent = filmeData.title;
      filmeVotos.textContent = `${filmeData.vote_count} Votos`;
      dataLancamento.textContent = filmeData.release_date;
      filmePoster.src = `https://image.tmdb.org/t/p/original/${filmeData.poster_path}`;
      iframeTrailer.src = `https://www.youtube.com/embed/${filmeData.youtube_trailer_id}`;
      filmeSinopse.textContent = filmeData.overview;

      if (filmeData.genres && filmeData.genres.length > 0) {
        const generosFilme = filmeData.genres.map((genre: { name: string }) => genre.name);
        filmeGeneros.textContent = `Gêneros: ${generosFilme.join(", ")}`;
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes do filme:", error);
    }
  }
}

window.addEventListener("load", () => new DetalhesFilme());
