document.addEventListener('DOMContentLoaded', function() {
    const festasContainer = document.getElementById('festas');
    const paginacaoContainer = document.getElementById('pagination');

    let festas = []; // Variável global para armazenar as festas carregadas
    let festasPorPagina = 20;
    let paginaAtual = 1;

    async function carregarFestas() {
        try {
            const response = await fetch('festas.json');
            festas = await response.json();
            mostrarFestas();
        } catch (error) {
            console.error('Erro ao carregar festas.json:', error);
        }
    }

    function mostrarFestas() {
        festasContainer.innerHTML = ''; // Limpa o conteúdo anterior

        const inicio = (paginaAtual - 1) * festasPorPagina;
        const fim = inicio + festasPorPagina;
        const festasPagina = festas.slice(inicio, fim);

        festasPagina.forEach(festa => {
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

        mostrarPaginacao();
    }

    function mostrarPaginacao() {
        paginacaoContainer.innerHTML = ''; // Limpa a paginação anterior

        const totalPaginas = Math.ceil(festas.length / festasPorPagina);

        const btnAnterior = document.createElement('button');
        btnAnterior.classList.add('btn', 'btn-outline-primary', 'mx-1');
        btnAnterior.innerText = '<';
        btnAnterior.addEventListener('click', function() {
            setTimeout(() => {
                if (paginaAtual > 1) {
                    paginaAtual--;
                    mostrarFestas();
                    const paginacaoDiv = document.querySelector('div.row');
                    paginacaoDiv.scrollIntoView({ behavior: 'smooth' });
                }
            },600)
        });
        paginacaoContainer.appendChild(btnAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-outline-primary', 'mx-1');
            button.innerText = i;

            if (i === paginaAtual) {
                button.classList.add('active');
            }

            button.addEventListener('click', function() {
                paginaAtual = i;
                mostrarFestas();
                const paginacaoDiv = document.querySelector('div.row');
                paginacaoDiv.scrollIntoView({ behavior: 'smooth' });
            });

            paginacaoContainer.appendChild(button);
        }

        const btnProximo = document.createElement('button');
        btnProximo.classList.add('btn', 'btn-outline-primary', 'mx-1');
        btnProximo.innerText = '>';
        btnProximo.addEventListener('click', function() {
            if (paginaAtual < totalPaginas) {
                paginaAtual++;
                mostrarFestas();
                paginacaoContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginacaoContainer.appendChild(btnProximo);
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

        festas = festasFiltradas;
        paginaAtual = 1;
        mostrarFestas();
    }

    carregarFestas();
});
