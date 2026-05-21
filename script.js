document.addEventListener("DOMContentLoaded", () => {

    const listaTarefa = document.querySelector('.container-lista');
    const input = document.getElementById('tarefas');
    const lista = document.querySelector('.lista-tarefas');

    // esconder lista no início
    listaTarefa.style.display = 'none';

    function adicionarTarefa() {

        const valorInput = input.value.trim();

        // verificar input vazio
        if (valorInput === '') {
            alert('Por favor digite uma tarefa!');
            return;
        }

        // pegar todas as tarefas já existentes
        const tarefasExistentes = document.querySelectorAll('.conteudo');

        // verificar tarefas repetidas
        for (let tarefa of tarefasExistentes) {
            if (tarefa.textContent.toLowerCase() === valorInput.toLowerCase()) {
                alert('Essa tarefa já foi adicionada!');
                input.value = '';
                return;
            }
        }

        // criar item da lista
        const template = document.getElementById("template-lista");
        const clone = template.content.cloneNode(true);

        // adicionar texto da tarefa
        clone.querySelector(".conteudo").textContent = valorInput;

        // botão remover
        clone.querySelector(".remover").onclick = function () {
            this.parentElement.remove();

            // esconder lista se estiver vazia
            if (lista.children.length === 0) {
                listaTarefa.style.display = 'none';
            }
        };

        // adicionar tarefa na lista
        lista.appendChild(clone);

        // mostrar container
        listaTarefa.style.display = 'flex';

        // limpar input
        input.value = '';
    }

    // adicionar com Enter
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            adicionarTarefa();
        }
    });

    // adicionar com botão
    document.querySelector('.btn')
        .addEventListener('click', adicionarTarefa);

});