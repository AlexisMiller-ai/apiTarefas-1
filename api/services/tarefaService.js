class TarefaService {
  static async criarTarefa(models, dados) {
    const { descricao, concluida = false } = dados;

    if (!descricao || !descricao.trim()) {
      const error = new Error("A descrição é obrigatória.");
      error.statusCode = 400;
      throw error;
    }

    const tarefa = await models.Tarefa.create({
      descricao: descricao.trim(),
      concluida,
    });

    return tarefa;
  }

  static async listarTarefas(models) {
    return await models.Tarefa.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  static async buscarTarefaPorId(models, objectId) {
    const tarefa = await models.Tarefa.findByPk(objectId);

    if (!tarefa) {
      const error = new Error("Tarefa não encontrada.");
      error.statusCode = 404;
      throw error;
    }

    return tarefa;
  }

  static async atualizarTarefa(models, objectId, dados) {
    const tarefa = await models.Tarefa.findByPk(objectId);

    if (!tarefa) {
      const error = new Error("Tarefa não encontrada.");
      error.statusCode = 404;
      throw error;
    }

    const atualizacao = {};

    if (dados.descricao !== undefined) {
      if (!dados.descricao || !dados.descricao.trim()) {
        const error = new Error("A descrição não pode ser vazia.");
        error.statusCode = 400;
        throw error;
      }

      atualizacao.descricao = dados.descricao.trim();
    }

    if (dados.concluida !== undefined) {
      atualizacao.concluida = dados.concluida;
    }

    await tarefa.update(atualizacao);

    return tarefa;
  }

  static async removerTarefa(models, objectId) {
    const tarefa = await models.Tarefa.findByPk(objectId);

    if (!tarefa) {
      const error = new Error("Tarefa não encontrada.");
      error.statusCode = 404;
      throw error;
    }

    await tarefa.destroy();

    return { message: "Tarefa removida com sucesso." };
  }
}

export default TarefaService;