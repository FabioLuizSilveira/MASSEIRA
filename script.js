// FUNÇÃO PARA DITA A RELAÇÃO ENTRE O TIPO DE MASSEIRA SELECIONADO E AS FORMAS PARA ELA
function selecionarMasseira() {
    // PEGAR O NOME DA MASSEIRA
    var masseiraSelecionada = document.getElementById("masseira").value;
    var formasDisponiveis = [];

    // FALAR QUAL AS FORMAS PARA MASSEIRA
    if (masseiraSelecionada === "Riviera" || masseiraSelecionada === "Stratti") {
        formasDisponiveis = ["50x50x2.5", "60x60x2.5", "100x100x2.5"];
    } else if (masseiraSelecionada === "Evora") {
        formasDisponiveis = ["50x50x2.5", "60x60x1.5", "60x60x2", "60x60x2.5", "100x100x2.5"];
    }else if (masseiraSelecionada === "Dreno") {
        formasDisponiveis = ["60x60x5","60x60x8","50x33x5"];
    } else if (masseiraSelecionada === "Madeira") {
        formasDisponiveis = ["MADEIRA", "INDUSTRIAL"];
    } else if (masseiraSelecionada === "Ellegance") {
        formasDisponiveis = ["ELLEGANCE"];
    }

    // RECONHCER A FORMA
    var formaSelect = document.getElementById("forma");
    formaSelect.innerHTML = "";

    for (var i = 0; i < formasDisponiveis.length; i++) {
        var option = document.createElement("option");
        option.value = formasDisponiveis[i];
        option.text = formasDisponiveis[i];
        formaSelect.appendChild(option);
    }
}
document.getElementById("masseira").addEventListener("change", selecionarMasseira);
selecionarMasseira();


// FUNÇÃO PARA CALCULAR MASSEIRA
function calcularMasseiras() {

    // RECONHCER AS VARIAVEIS
    var tipoSelecionado  = document.getElementById("enchimento").value;
    var formaSelecionada = document.getElementById("forma").value;
    var quantidadeFormas = parseInt(document.getElementById("quantidade").value);

    // RECONHECER O TIPO DE ENCHIMENTO
    var enchimento = {
        '100': 1,
        '60-40': 2,
        '70-30': 3,
        '25-75': 4
    }
    var tipo = enchimento[tipoSelecionado]

    // RECONHECER AS FORMAS E SEUS PESOS, DE MASSA E CONCRETO
    var formas = {
        '50x50x2.5': 13.75,
        '60x60x2.5': 19.8,
        '60x60x2': 15.84,
        '60x60x1.5': 11.88,
        '100x100x2.5': 55,
        'MADEIRA': 11,
        'INDUSTRIAL': 13.2,
        'ELLEGANCE': 82.5,
        '50x33x5': 18.15,
        '60x60x5': 39.6,
        '60x60x8': 63.36
    };
    var pesoFormaTotal = formas[formaSelecionada];
    if(tipo === 1){
        var pesoFormaConcreto = 0
        var pesoFormaMassa = pesoFormaTotal; 
    }else if(tipo === 2){
        var pesoFormaConcreto = pesoFormaTotal * 0.4;
        var pesoFormaMassa = pesoFormaTotal * 0.6;
    }else if(tipo === 3){
        var pesoFormaConcreto = pesoFormaTotal * 0.3;
        var pesoFormaMassa = pesoFormaTotal * 0.7;
    }else if(tipo === 4){
        var pesoFormaConcreto = pesoFormaTotal * 0.75;
        var pesoFormaMassa = pesoFormaTotal * 0.25;
    }
    
    // PESO DAS MASSAS
    var masseiras = {
        'Riviera': 380,
        'Stratti': 290,
        'Evora' : 380,
        'Dreno' : 295,
        'Madeira' : 350
    };
    var pesoMasseira = masseiras[document.getElementById("masseira").value];
    var pesoMeiaMasseira = pesoMasseira / 2;

    // PESO DOS CONCRETOS
    if(tipo === 1){
        var pesoConcreto = 0;
        var pesoMeioConcreto = pesoConcreto / 2;
    }else{
        var pesoConcreto = 350;
        var pesoMeioConcreto = pesoConcreto / 2;
    }
    


        // VARIAVEIS DE MASSA
        var numMasseiras = Math.floor(quantidadeFormas * pesoFormaMassa / pesoMasseira);
        var numMeiasMasseiras = 0;
        var kilosSobrando = Math.floor(numMasseiras * pesoMasseira) + (numMeiasMasseiras * pesoMeiaMasseira) - (quantidadeFormas * pesoFormaMassa);
        
        // VARIAVEIS DE CONCRETO
        var numConcreto =  Math.floor(quantidadeFormas * pesoFormaConcreto / pesoConcreto);
        var numMeioConcreto = 0;
        var kilosSobrandoConcreto = Math.floor(numConcreto * pesoConcreto) + (numMeioConcreto * pesoMeioConcreto) - (quantidadeFormas * pesoFormaConcreto);
        
        // RECONHECIMENTO DO EXEMPLO
        var exemplo = 0;
        var paraExemplo = 0;
        var qual= 0;
        // FUNÇÃO PARA A MASSEIRA 100%
        
    if (tipo === 1){
        // RECONHECIMENTO DE VARIAVEIS
        var numMasseiras = Math.floor((quantidadeFormas * pesoFormaTotal) / pesoMasseira);
        var numMeiasMasseiras = 0;
        var kilosSobrando = Math.floor(numMasseiras * pesoMasseira) + (numMeiasMasseiras * pesoMeiaMasseira) - (quantidadeFormas * pesoFormaTotal);
        var exemplo = Math.floor(kilosSobrando / pesoFormaTotal);

        // FAZER COM QUE MOSTRE MEIA MASSEIRA
        if(kilosSobrando < 0){
                if(pesoMeiaMasseira + kilosSobrando < 0){
                    numMeiasMasseiras = 0
                    numMasseiras = numMasseiras + 1
                }else{
                    numMeiasMasseiras = 1
                }
        }else if(kilosSobrando > pesoMeiaMasseira){
            numMasseiras = numMasseiras + 1
        }

        // RECONHECER A SOBRA
        kilosSobrando = (numMasseiras * pesoMasseira) + (numMeiasMasseiras * pesoMeiaMasseira) - (quantidadeFormas * pesoFormaTotal);
        exemplo = Math.floor(kilosSobrando / 13.75);
        if (exemplo < 1){
            document.getElementById("exemplo").textContent = "Não da pra encher nada com o que sobrou clabreso kkk";

        }else{
            document.getElementById("exemplo").textContent = "\nCom o que sobrou da pra encher mais " + exemplo + " peças de "+ formaSelecionada + " pra vc ter noção" ;
        }
        
        // ATRIBUIR O VALOR RECONHECIDO AS DIVS
        document.getElementById("resultado").textContent = "Número de masseiras necessárias: " + numMasseiras;
        document.getElementById("meias-masseiras").textContent = "\nNúmero de meias masseiras necessárias: " + numMeiasMasseiras;
        document.getElementById("sobra").textContent = "\nKilos sobrando: " + kilosSobrando;
        document.getElementById("resultadoConcreto").textContent = null;
        document.getElementById("meias-masseirasConcreto").textContent =null;
        document.getElementById("sobraConcreto").textContent = null;
    }
    // FUNCAO PARA A MASSEIRA + CONCRETO
    else{
        // SOBRA DE MASSA
        if(kilosSobrando < 0){
            if(pesoMeiaMasseira + kilosSobrando < 0){
                numMeiasMasseiras = 0
                numMasseiras = numMasseiras + 1
            }else{
                numMeiasMasseiras = 1
            }
        }else if(kilosSobrando > pesoMeiaMasseira){
            numMasseiras = numMasseiras + 1
        }
        kilosSobrando = Math.floor(numMasseiras * pesoMasseira) + (numMeiasMasseiras * pesoMeiaMasseira) - (quantidadeFormas * pesoFormaMassa);

        // SOBRA DE CONCRETO
        if(kilosSobrandoConcreto< 0){
            if(pesoMeioConcreto + kilosSobrandoConcreto < 0){
                numMeioConcreto = 0
                numConcreto = numConcreto + 1
            }else{
                numMeioConcreto = 1
            }
        }else if(kilosSobrandoConcreto > pesoMeioConcreto){
            numConcreto = numConcreto + 1
        }
        kilosSobrandoConcreto = Math.floor(numConcreto * pesoConcreto) + (numMeioConcreto * pesoMeioConcreto) - (quantidadeFormas * pesoFormaConcreto);
        
        
        // ATRIBUIR O VALOR RECONHRCIDO AO EXEMPLO

        if(kilosSobrando < kilosSobrandoConcreto ){
            exemplo = Math.floor((kilosSobrando) / 13.75);
            paraExemplo = kilosSobrandoConcreto - kilosSobrando; 
            qual = "Concreto";
        }else if(kilosSobrando > kilosSobrandoConcreto){
            exemplo = Math.floor((kilosSobrandoConcreto) / 13.75);
            paraExemplo = kilosSobrando - kilosSobrandoConcreto;
            qual = "Masseira";
        }else{

        }
        
        // ATRIBUIR O VALOR RECONHRCIDO A DIV DO EXEMPLO
        if (exemplo < 1){
            document.getElementById("exemplo").textContent = "Não da pra encher nada com o que sobrou clabreso kkk";
        }else{
            document.getElementById("exemplo").textContent = "\nCom o que sobrou da pra encher mais " + exemplo + " peças de "+ formaSelecionada + " pra vc ter noção";
            document.getElementById("paraExemplo").textContent = "E ainda vai sobrar mais " + paraExemplo + " quilos de "+ qual + " que da para encher "+ Math.floor(paraExemplo / 13.75) + " formas de 50x50";
        }
        
        // ATRIBUIR O VALOR RECONHECIDO AS DIVS DE MASSA
        document.getElementById("resultado").textContent = "Número de masseiras necessárias: " + numMasseiras;
        document.getElementById("meias-masseiras").textContent = "\nNúmero de meias masseiras necessárias: " + numMeiasMasseiras;
        document.getElementById("sobra").textContent = "\nKilos sobrando: " + kilosSobrando;
        
        // ATRIBUIR O VALOR RECONHECIDO AS DIVS DE CONCRETO
        document.getElementById("resultadoConcreto").textContent = "Número de masseiras de concreto necessárias: " + numConcreto;
        document.getElementById("meias-masseirasConcreto").textContent = "\nNúmero de meias masseiras de concreto necessárias: " + numMeioConcreto;
        document.getElementById("sobraConcreto").textContent = "\nKilos sobrando de concreto: " + kilosSobrandoConcreto;

    }
    
}
    