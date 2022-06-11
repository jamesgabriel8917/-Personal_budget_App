class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for(let i in this){
           if(this[i] == undefined || this[i] == '' || this[i] == null){
               return false
           }else{
               return true
           }
        }

    }
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id');

        if(id===null){
            localStorage.setItem('id', 0);
        }
    }

    getNextID(){
        let nextID = localStorage.getItem('id')
        return parseInt(nextID)+1;
    
    }

    gravar(d) {
        let id = this.getNextID()
        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)

    }

    recuperarTodosRegistros(){
        let id = localStorage.getItem('id')
        let despesas = Array();


        //recupera as despesas do local storage
        for(let i = 1; i <= id; i++){

            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa === null){

                continue
            }
            despesa.id = i
            despesas.push(despesa)
                
        }

        return despesas

    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)
        console.log(despesasFiltradas)

        if(despesa.ano != ''){
            console.log('filtro ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes != ''){
            console.log('filtro mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        if(despesa.dia != ''){
            console.log('filtro dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if(despesa.tipo != ''){
            console.log('filtro tipo')
            despesasFiltradas =despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        
        if(despesa.descricao != ''){
            console.log('filtro descrição')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        return despesasFiltradas

    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd();

function cadastrarDespesas(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )


    
    if(despesa.validarDados()){
        bd.gravar(despesa);

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
        
    }else{
        alert('erro ao validar dados')
    }
    

    //console.log('valor recuperado ' + ano.value +' '+ mes.value +' '+ dia.value +' '+ tipo.value +' '+ descricao.value +' '+ valor.value)
    console.log(despesa)
}

function carregaListaDespesas(){
    
    let despesas = new Array();
    despesas = bd.recuperarTodosRegistros()

    //seleciona o elemento tBody da tabela
    var listaDespesas = document.getElementById('listaDespesas')

    // percorre o array de despesas listando de forma dinamica
    despesas.forEach(function(d){
        // cria a linha 
        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        // botao de exclusao 
        let btn  = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times></i>'
        btn.id = 'id_despesa_'+d.id
        btn.onclick = function(){
            bd.remover(this.id.replace('id_despesa_', ''))
            window.location.reload()
        }
        linha.insertCell(4).append(btn)

    })
}

function pesquisarDespesas(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = new Array();

    despesas = bd.pesquisar(despesa)

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    // percorre o array de despesas listando de forma dinamica
    despesas.forEach(function(d){
        // cria a linha 
        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })
}

