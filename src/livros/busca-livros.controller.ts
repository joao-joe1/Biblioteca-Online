import { Controller, Body, Post } from '@nestjs/common'
import axios from 'axios'

interface ITitleRequest {
    title: string
}

const APIGoogle = process.env.APIGOOGLE

@Controller('/buscalivros')
export class BuscaLivroController {
    @Post()
    async BuscarLivros(@Body() buscaLivro: ITitleRequest) {
        try {
            const fetchApi = `https://www.googleapis.com/books/v1/volumes?q=${buscaLivro.title}&key=${APIGoogle}`
            const response = await axios.get(fetchApi)
            const books = response.data.items;

            return { books: books }
        } catch (error) {
            throw error;
        }
    }
}