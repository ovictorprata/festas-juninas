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
                    <p><strong>🗓️</strong> ${dataFormatada}</p>
                    <p><strong>⏰</strong> ${festa.horario}</p>
                    <p><strong>💰</strong> ${festa.preco}</p>
                    <p><strong>📍</strong> ${festa.endereco}</p>
                </div>
            `;
            festasContainer.appendChild(div);
        });
    }

    const filtroDataInput = document.getElementById('filtro-data');
    filtroDataInput.addEventListener('change', function() {
        filtrarFestas();
    });

    const filtroGratuitoInput = document.getElementById('filtro-gratuito');
    filtroGratuitoInput.addEventListener('change', function() {
        filtrarFestas();
    });

    const filtroPagoInput = document.getElementById('filtro-pago');
    filtroPagoInput.addEventListener('change', function() {
        filtrarFestas();
    });

    function filtrarFestas() {
        const dataSelecionada = filtroDataInput.value;
        const gratuitoSelecionado = filtroGratuitoInput.checked;
        const pagoSelecionado = filtroPagoInput.checked;
        let festasFiltradas = festas;

        if (dataSelecionada) {
            festasFiltradas = festasFiltradas.filter(festa => festa.data === dataSelecionada);
        }

        if (gratuitoSelecionado && pagoSelecionado) {
            // Mostrar todas as festas
        } else if (gratuitoSelecionado) {
            festasFiltradas = festasFiltradas.filter(festa => festa.preco.toLowerCase().includes('gratuito'));
        } else if (pagoSelecionado) {
            festasFiltradas = festasFiltradas.filter(festa => !festa.preco.toLowerCase().includes('gratuito'));
        }

        mostrarFestas(festasFiltradas);
    }

    carregarFestas();
});
