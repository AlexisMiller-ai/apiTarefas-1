import TarefaService from "../services/tarefaService";

class TarefaController {
  static async criar(req, res) {
    try {
      const tarefa = await TarefaService.criarTarefa(req.context.models, req.body);
      return res.status(201).json(tarefa);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message || "Erro ao criar tarefa.",
      });
    }
  }

  static async listar(req, res) {
    try {
      const tarefas = await TarefaService.listarTarefas(req.context.models);
      return res.status(200).json(tarefas);
    } catch {
      return res.status(500).json({
        error: "Erro ao listar tarefas.",
      });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const tarefa = await TarefaService.buscarTarefaPorId(
        req.context.models,
        req.params.objectId,
      );
      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message || "Erro ao buscar tarefa.",
      });
    }
  }

  static async atualizar(req, res) {
    try {
      const tarefa = await TarefaService.atualizarTarefa(
        req.context.models,
        req.params.objectId,
        req.body,
      );
      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message || "Erro ao atualizar tarefa.",
      });
    }
  }

  static async remover(req, res) {
    try {
      const resultado = await TarefaService.removerTarefa(
        req.context.models,
        req.params.objectId,
      );
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message || "Erro ao remover tarefa.",
      });
    }
  }
}
export default TarefaController;