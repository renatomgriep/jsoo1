const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.querySelector("#lista-de-itens");
const ulItensComprados = document.querySelector("#itens-comprados");
const listaRecuperada = localStorage.getItem('listaDeitens')

let idEdit;

function atualizalocalStorage(){
    localStorage.setItem('listaDeitens', JSON.stringify(listaItens));
}

if (listaRecuperada){
    listaItens = JSON.parse(listaRecuperada);
    mostrarItens();
}else{
    listaItens = [];
};

form.addEventListener('submit',function(event){
    event.preventDefault();
    salvarItem();
    mostrarItens();
});

function salvarItem(){
    const item = itensInput.value;
    const verificaItem = listaItens.some((el)=>el.valor.toUpperCase() === item.toUpperCase())

    if(verificaItem){alert("Item já cadastrado");
        return;
    }
    listaItens.push({valor:item, checar:false});
    itensInput.value = ""
}

function mostrarItens(){
   ulItens.innerHTML = "" 
   ulItensComprados.innerHTML = "" 

   listaItens.forEach((el,i)=>{
    if(el.checar){
            ulItensComprados.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${i}">
                                                <div>
                                                    <input type="checkbox" checked class="is-clickable">  
                                                    <span class="itens-comprados is-size-5">${el.valor}</span>
                                                </div>
                                                <div>
                                                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                                                </div>
                                            </li>` 
        }else{
            ulItens.innerHTML += ` <li class="item-compra is-flex is-justify-content-space-between" data-value="${i}">
                                        <div>
                                            <input type="checkbox" class="is-clickable" />
                                            <input type="text" class="is-size-5" value="${el.valor}"></input>
                                        </div>
                                        <div>
                                            ${ i === parseInt(idEdit) ? '<i class="fa-regular fa-floppy-disk is-clickable" onclick="salvarEdicao()"></i>' : ' <i class="fa-regular is-clickable fa-pen-to-square editar"></i>' }
                                            <i class="fa-solid fa-trash is-clickable deletar"></i>
                                        </div>
                                    </li>`
        }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');

    inputsCheck.forEach((ch) => {
        ch.addEventListener('click', (e) => {
            clicado = e.target.parentElement.parentElement.getAttribute('data-value');
            listaItens[clicado].checar = e.target.checked;
            mostrarItens();
        })
    })

    const deletarItem = document.querySelectorAll(".deletar");

    deletarItem.forEach(i => {
        i.addEventListener('click', (e)=>{
            idx = e.target.parentElement.parentElement.getAttribute('data-value');
            listaItens.splice(idx,1);
            mostrarItens();
        })
    })

    const editarItens = document.querySelectorAll(".editar");
    editarItens.forEach(i => {
        i.addEventListener('click',(e) =>{
            idEdit = e.target.parentElement.parentElement.getAttribute('data-value');
            mostrarItens();
        })
    })
    atualizalocalStorage();
}

function salvarEdicao(){
    const itemEditado = document.querySelector(`[data-value="${idEdit}"] input[type="text"]`);
    listaItens[idEdit].valor = itemEditado.value;
    idEdit = -1;
    mostrarItens();

}

