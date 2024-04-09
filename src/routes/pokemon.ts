import express, { Request, Response } from "express";
import axios from "axios";
import { AxiosError } from "axios";

const router = express.Router();

router.get("/pokemons", async (req: Request, res: Response) => {
  try {
    const { limit = "151", offset = "0" } = req.query;

    const limitNumber = parseInt(limit as string, 10);
    const offsetNumber = parseInt(offset as string, 10);

    let safeLimite = isNaN(limitNumber) ? 151 : limitNumber;
    let offsetSkip = isNaN(offsetNumber) ? 0 : offsetNumber;

    if (safeLimite < 1) safeLimite = 151;
    if (offsetSkip < 0) offsetSkip = 0;

    interface PokemonResponse {
      count: number;
      next: string | null;
      previous: string | null;
      results: Array<{
        name: string;
        url: string;
      }>;
    }

    const response = await axios.get<PokemonResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${safeLimite}&offset=${offsetSkip}`
    );

    const pokemons = response.data;

    res.status(200).json(pokemons);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      res.status(400).json({ error: axiosError.message });
    } else {
      res.status(500).json({ error: "Erreur du serveur" });
    }
  }
});

export default router;
