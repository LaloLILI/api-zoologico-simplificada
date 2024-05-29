import { Atracao } from "../model/Atracao";
import { Request, Response } from "express";

class AtracaoController extends Atracao {
    /**
     * Acesso a função do Model que lista todas as atrações
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            const atracoes = JSON.stringify(await Atracao.listarAtracoes());

            return res.status(200).json(atracoes);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    public async novo(req: Request, res: Response) {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nomeAtracao, idHabitat } = req.body;

            // Instanciando objeto Atracao
            const novaAtracao = new Atracao(nomeAtracao);

            let result = false;

            // verifica se o idHabitat não veio vazio do front-end
            if (idHabitat != undefined) {
                // Chama o método para persistir a atracao no banco de dados associando ao id
                result = await Atracao.cadastrarAtracao(novaAtracao, idHabitat);
            } else {
                // Chama o método para persistir a atracao no banco de dados
                result = await Atracao.cadastrarAtracao(novaAtracao);
            }

            if (result) {
                return res.status(200).json('Atração cadastrada com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a atração: ${error}`);
            return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
        }
    }

    public async remover(req: Request, res: Response) {
        try {
            // recuperando o id da atração a ser removida
            const idAtracao = parseInt(req.query.idAtracao as string);

            // chama a função para remover a atração e armazena o resultado na variável
            const resultado = await Atracao.removerAtracao(idAtracao);

            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Atração foi removida com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao remover atração');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json("Erro ao remover atração, consulte os logs no servidor");
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nomeAtracao } = req.body;
            // recuperando o id da atração a ser atualizada
            const idAtracao = parseInt(req.query.idAtracao as string);
            // Instanciando objeto Atracao
            const novaAtracao = new Atracao(nomeAtracao);
            // Chama o método para persistir a atração no banco de dados e armazena o resultado na variável
            const resultado = await Atracao.atualizarAtracao(novaAtracao, idAtracao);

            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Atração foi alterada com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(400).json('Não foi possível atualizar a atração no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao acessar modelo: ${error}`);
            return res.status(400).json("Erro ao atualizar atração, consulte os logs no servidor");
        }
    }
}

export default AtracaoController;
