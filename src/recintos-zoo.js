import { recintos, animais } from './mock';

class RecintosZoo {
    recintos = recintos;
    animais = animais;
    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const animalInfo = this.animais[animal];
        const recintosViaveis = [];

        // verifica quais são viáveis
        for (let recinto of this.recintos) {
            const animaisNoRecinto = recinto.animais;
            let espacoOcupado = 0;
            let especiesDiferentes = 0;
            let carnivoroPresente = false;

            // Verifica se o bioma é compatível
            if (!animalInfo.biomas.includes(recinto.bioma) && recinto.bioma !== 'savana e rio') {
                continue;
            }

            // Calcula o espaço ocupado pelos animais existentes
            for (let existente of animaisNoRecinto) {
                const infoExistente = this.animais[existente.especie];
                espacoOcupado += infoExistente.tamanho * existente.quantidade;
                if (infoExistente.carnivoro) carnivoroPresente = true;
                if (infoExistente.especie !== animal) especiesDiferentes++;
            }

            if (animalInfo.carnivoro && (carnivoroPresente || especiesDiferentes > 0)) {
                continue; // Carnívoros só podem conviver com outros da mesma espécie
            }
            if (!animalInfo.carnivoro && carnivoroPresente) {
                continue; // Animais não carnívoros não podem conviver com carnívoros
            }

            // Calcula o espaço necessário para os novos animais
            let espacoNecessario = animalInfo.tamanho * quantidade;

            // Verifica se há espaço suficiente no recinto para adicionar os novos animais
            if (recinto.tamanho - espacoOcupado >= espacoNecessario) {
                const espacoLivre = recinto.tamanho - (espacoOcupado + espacoNecessario);
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
        console.log(recintosViaveis)
        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
