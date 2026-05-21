document.addEventListener("DOMContentLoaded", () => {

    const listaContainer = document.querySelector(".container-lista");
    const lista = document.querySelector(".lista-tarefas");
    const input = document.getElementById("tarefas");
    const botao = document.querySelector(".btn");
    const template = document.getElementById("template-lista");

    // pegar tarefas salvas
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    // esconder lista se não houver tarefas
    if (tarefas.length === 0) {
        listaContainer.style.display = "none";
    }

    // mostrar tarefas ao carregar
    mostrarTarefas();

    function salvarTarefas() {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function adicionarTarefa() {

        const valorInput = input.value.trim();

        // validar input vazio
        if (valorInput === "") {
            alert("Por favor digite uma tarefa!");
            return;
        }

        // verificar duplicadas
        const tarefaExiste = tarefas.some(
            tarefa => tarefa.toLowerCase() === valorInput.toLowerCase()
        );

        if (tarefaExiste) {
            alert("Essa tarefa já foi adicionada!");
            input.value = "";
            return;
        }

        // adicionar no array
        tarefas.push(valorInput);

        salvarTarefas();

        mostrarTarefas();

        input.value = "";
    }

    function mostrarTarefas() {

        lista.innerHTML = "";

        tarefas.forEach((tarefa, index) => {

            const clone = template.content.cloneNode(true);

            clone.querySelector(".conteudo").textContent = tarefa;

            clone.querySelector(".remover")
                .addEventListener("click", () => {

                    removerTarefa(index);

                });

            lista.appendChild(clone);

        });

        // mostrar/esconder container
        listaContainer.style.display =
            tarefas.length === 0 ? "none" : "flex";
    }

    function removerTarefa(index) {

        tarefas.splice(index, 1);

        salvarTarefas();

        mostrarTarefas();
    }

    // botão adicionar
    botao.addEventListener("click", adicionarTarefa);

    // tecla Enter
    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            adicionarTarefa();
        }

    });

});