const input = document.querySelector('.input')
const adicionar = document.querySelector('.botao')
const listaDeTarefas = document.querySelector('.lista')
let minhasTarefas = []


adicionar.addEventListener('click', adicionarTarefa)


function adicionarTarefa(){
    const texto = input.value.trim();


    if(texto ===''){
        return alert('Digite uma tarefa ');
    }

    minhasTarefas.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''
    renderizarTarefas();
}

function renderizarTarefas(){
    listaDeTarefas.innerHTML = ' ';

    minhasTarefas.forEach((item, posicao)=>{
      const li = document.createElement('li');
      li.id = posicao;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.concluida;
      checkbox.addEventListener('change', ()=> toggleConcluida(posicao, li, checkbox));

      const texto = document.createElement('p');
      texto.textContent = item.tarefa;

      const button = document.createElement('button');
      button.textContent = 'Remover';
      button.addEventListener('click', ()=> removerTarefa(posicao));


      if(item.concluida){
        li.classList.add('marcou');
      }

      li.append(checkbox, texto, button)
      listaDeTarefas.appendChild(li);
    })


    salvarNoLocalStorage();
    

}

function toggleConcluida(posicao, li, checkbox) {
    minhasTarefas[posicao].concluida = checkbox.checked;

    if (checkbox.checked) {
        li.classList.add('marcou');
    } else {
        li.classList.remove('marcou');
    }

    salvarNoLocalStorage();
}
function removerTarefa(posicao) {
    minhasTarefas.splice(posicao, 1);
    renderizarTarefas();
}


function recarregarTarefas(){
    let tarefas = localStorage.getItem('lista')
    if(tarefas){
        minhasTarefas = JSON.parse(tarefas)
    }
    mostrarTarefa()
}

function salvarNoLocalStorage() {
    localStorage.setItem('lista', JSON.stringify(minhasTarefas));
}

function carregarTarefasDoLocalStorage() {
    const tarefas = localStorage.getItem('lista');
    if (tarefas) {
        minhasTarefas = JSON.parse(tarefas);
    }
    renderizarTarefas();
}

carregarTarefasDoLocalStorage();



