document.addEventListener('DOMContentLoaded', function() {
    const festasContainer = document.getElementById('festas');
    let festas = []; // Variável global para armazenar as festas carregadas

    async function carregarFestas() {
        try {
            const response = await fetch('festas.json');
            festas = await response.json();
            mostrarFestas(festas);
        } catch (error) {
            console.error('Erro ao carregar festas.json:', error);
        }
    }

    function mostrarFestas(listaFestas) {
        festasContainer.innerHTML = ''; // Limpa o conteúdo anterior

        listaFestas.forEach(festa => {
            const partesData = festa.data.split('-');
            const ano = partesData[0];
            const mes = partesData[1];
            const dia = partesData[2];

            const dataFormatada = `${dia}/${mes}/${ano}`;

            const div = document.createElement('div');
            div.classList.add('col-lg-6');
            div.innerHTML = `
                <div class="festa">
                    <h2 class="card-title">${festa.local}</h2>
                    <p><i class="fas fa-calendar-alt"></i> <strong>Data:</strong> ${dataFormatada}</p>
                    <p><strong>⏰</strong> ${festa.horario}</p>
                    <p><strong>Preço:</strong> ${festa.preco}</p>
                    <p><strong>Endereço:</strong> ${festa.endereco}</p>
                </div>
            `;
            festasContainer.appendChild(div);
        });
    }

    const filtroDataInput = document.getElementById('filtro-data');
    filtroDataInput.addEventListener('change', function() {
        filtrarFestas();
    });

    function filtrarFestas() {
        const dataSelecionada = filtroDataInput.value;
        let festasFiltradas = festas;

        if (dataSelecionada) {
            festasFiltradas = festasFiltradas.filter(festa => festa.data === dataSelecionada);
        }

        mostrarFestas(festasFiltradas);
    }

    carregarFestas();
});
