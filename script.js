function ValidaCPF(cpf){ 
    Object.defineProperty(this, 'limpaCpf', {
        get: function() {
            return cpf.replace(/\D+/g, '') // tirando todos os catacteres que não sejam números
        }
    }) 
}

ValidaCPF.prototype.valida = function () {
    if(typeof this.limpaCpf === 'undefined') return false //checando se o número foi enviado
    if(this.limpaCpf.length !== 11) return false //checando o tamanho do número enviado
    if(this.isSequencia()) return false // checando se é uma sequência

    const cpfParcial = this.limpaCpf.slice(0, -2) //tirando os dois ultimos digitos
    const digito1 = this.criaPrimeiroDigito(cpfParcial)
    const digito2 = this.criaSegundoDigito(cpfParcial + digito1)

    const novoCpf = cpfParcial + digito1 + digito2 //concatenando os digitos

    return novoCpf === this.limpaCpf 
}

ValidaCPF.prototype.criaPrimeiroDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial)

    const produtos = cpfArray.map((val, idx) => { //multiplicando os valores
        const multiplicador = 10 - idx
        return Number(val) * multiplicador
    })

    const soma = produtos.reduce((ac, value) =>{ // realizando a soma
        return ac += value
    })

    let primeiroDigito = 11 - (soma % 11)
    return primeiroDigito > 9 ? '0' : String(primeiroDigito)
}

ValidaCPF.prototype.criaSegundoDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial)

    const produtos = cpfArray.map((val, idx) => {
        const multiplicador = 11 - idx
        return Number(val) * multiplicador
    })

    const soma = produtos.reduce((ac, value) =>{
        return ac += value
    })

    let primeiroDigito = 11 - (soma % 11)
    return primeiroDigito > 9 ? '0' : String(primeiroDigito)
}

ValidaCPF.prototype.isSequencia = function () {
    const seq = this.limpaCpf[0].repeat(this.limpaCpf.length)
    return seq === this.limpaCpf
}

const cpf = new ValidaCPF('070.987.720-03')

if(cpf.valida()){
    console.log('CPF Válido')
} else{
 ('CPF Inválido')
}
    



