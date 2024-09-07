const tela = document.getElementById('screen'); // Tela onde o valor é mostrado
const botoes = document.querySelectorAll('.calc-button'); // Seleção correta dos botões

let valor_atual = ""; // Variável para armazenar o valor atual
let valor_antigo = ""; // Variável para armazenar o valor antigo
let operador = ""; // Variável para armazenar o operador atual

// Função para atualizar a tela
function atualizarTela(valor) {
    tela.textContent = valor;
}

// Função para realizar operações matemáticas
function calcular() {
    let resultado = 0;
    const numero_antigo = parseFloat(valor_antigo);
    const numero_atual = parseFloat(valor_atual);

    switch (operador) {
        case "+":
            resultado = numero_antigo + numero_atual;
            break;
        case "-":
            resultado = numero_antigo - numero_atual;
            break;
        case "×":
            resultado = numero_antigo * numero_atual;
            break;
        case "÷":
            if (numero_atual !== 0) {
                resultado = numero_antigo / numero_atual;
            } else {
                alert("Erro: Divisão por zero!");
                return;
            }
            break;
        case "%":
            resultado = numero_antigo * (numero_atual / 100); // Porcentagem
            break;
        default:
            return;
    }
    valor_atual = resultado.toString(); // Armazena o resultado
    atualizarTela(valor_atual);
    valor_antigo = ""; // Limpa o valor antigo
    operador = ""; // Limpa o operador
}

// Adicionando evento de clique aos botões
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.textContent.trim(); // Captura o valor do botão clicado

        // Se for um número ou ponto, atualiza o valor atual
        if (!isNaN(valor) || valor === ".") {
            valor_atual += valor;
            atualizarTela(valor_atual);
        }

        // Operadores aritméticos
        if (["+", "-", "×", "÷", "%"].includes(valor)) {
            operador = valor; // Armazena o operador
            valor_antigo = valor_atual; // Armazena o valor antigo
            valor_atual = ""; // Reseta o valor atual para receber o próximo número
        }

        // Botão igual para realizar o cálculo
        if (valor === "=") {
            if (valor_antigo && valor_atual) {
                calcular(); // Realiza a operação
            }
        }

        // Função CE (Clear Entry) — Remove o último número
        if (valor === "CE") {
            valor_atual = valor_atual.slice(0, -1); // Remove o último caractere
            if (valor_atual === "") {
                atualizarTela("0"); // Se esvaziou, mostra 0
            } else {
                atualizarTela(valor_atual); // Atualiza com o valor restante
            }
        }

        // Função C (Clear tudo) — Limpa tudo
        if (valor === "C") {
            valor_atual = ""; // Limpa o valor atual
            valor_antigo = ""; // Limpa o valor antigo
            operador = ""; // Limpa o operador
            atualizarTela("0"); // Mostra 0 na tela
        }

        // Função Backspace (Apagar último dígito) — Mesma funcionalidade do CE
        if (valor === "←") {
            valor_atual = valor_atual.slice(0, -1); // Remove o último caractere
            if (valor_atual === "") {
                atualizarTela("0"); // Se esvaziou, mostra 0
            } else {
                atualizarTela(valor_atual); // Atualiza com o valor restante
            }
        }
    });
});
