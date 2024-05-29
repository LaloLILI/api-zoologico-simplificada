import { Ave } from "../model/Ave"
import { Request, Response } from "express";

class AveController extends Ave {
    /**
     * Acesso a função do Model que lista todas as aves
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            const aves = JSON.stringify(await Ave.listarAves());

            return res.status(200).json(aves);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }

    }

    public async novo(req: Request, res: Response) {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nome, idade, genero, envergadura, idHabitat } = req.body;

            // Instanciando objeto Ave
            const novaAve = new Ave(nome, idade, genero, envergadura);

            // Chama o método para persistir a ave no banco de dados
            const result = await Ave.cadastrarAve(novaAve, idHabitat);
            if (result) {
                return res.status(200).json('Ave cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o ave no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a ave: ${error}`);
            return res.status(400).json('Não foi possível cadastrar o ave no banco de dados');
        }
    }

    public async remover(req: Request, res: Response) {
        try {
            // recuperando o id do animal a ser removido
            const idAnimal = parseInt(req.query.idAnimal as string);

            // chama a função para remover o animal e armazena o resultado na variável
            const resultado = await Ave.removerAve(idAnimal);

            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Animal foi removido com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao remover animal');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json("Erro ao remover ave, consulte os logs no servidor");
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nome, idade, genero, envergadura } = req.body;
            // recuperando o id do animal a ser atualizado
            const idAnimal = parseInt(req.query.idAnimal as string);
            // Instanciando objeto Ave
            const novaAve = new Ave(nome, idade, genero, envergadura);
            // Chama o método para persistir a ave no banco de dados e armazena o resultado na variável
            const result = await Ave.atualizarAve(novaAve, idAnimal);

            if (result) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Ave atualizada com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(400).json('Não foi possível atualizar a ave no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao acessar modelo: ${error}`);
            return res.status(400).json("Erro ao atualizar ave, consulte os logs no servidor");
        }
    }
}

export default AveController