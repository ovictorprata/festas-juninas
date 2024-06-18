document.addEventListener('DOMContentLoaded', function() {
    const festasContainer = document.getElementById('festas');
    const paginacaoContainer = document.getElementById('pagination');
    const filtroDataInput = document.getElementById('filtro-data');
    const filtroGratuitoInput = document.getElementById('filtro-gratuito');
    const filtroPagoInput = document.getElementById('filtro-pago');

    let festas = []; // Variável global para armazenar as festas carregadas
    let festasFiltradas = []; // Variável para armazenar as festas filtradas
    let festasPorPagina = 20;
    let paginaAtual = 1;

    async function carregarFestas() {
        try {
            const response = await fetch('festas.json');
            festas = await response.json();

            festasFiltradas = festas;
            mostrarFestas();
        } catch (error) {
            console.error('Erro ao carregar festas.json:', error);
        }
    }

    function mostrarFestas() {
        limparElemento(festasContainer);

        const inicio = (paginaAtual - 1) * festasPorPagina;
        const fim = inicio + festasPorPagina;
        const festasPagina = festasFiltradas.slice(inicio, fim);

        festasPagina.forEach(festa => {
            const dataFormatada = formatarData(festa.data);

            const div = criarElemento('div', 'col-lg-6');
            div.innerHTML = `
                <div class="festa">
                    <h2 class="card-title">${festa.local}</h2>
                    <p><strong><i class="fa-regular fa-calendar-check" style="color: #fe3434;padding: 0 1px 0 1px"></i></strong> ${dataFormatada}</p>
                    <p><strong><i class="fa-solid fa-clock" style="color: #0e86e1;"></i></strong> ${festa.horario}</p>
                    <p><strong><i class="fa-solid fa-ticket" style="color: #ffca0a;"></i></strong> ${festa.preco}</p>
                    <p><strong><i class="fa-solid fa-location-dot" style="color: #2fac16;padding: 0 3px 0 3px"></i></strong> ${festa.endereco}</p>
                </div>
            `;
            festasContainer.appendChild(div);
        });

        mostrarPaginacao();
    }

    function mostrarPaginacao() {
        limparElemento(paginacaoContainer);

        const totalPaginas = Math.ceil(festasFiltradas.length / festasPorPagina);

        const btnAnterior = criarBotaoPaginacao('<', function() {
            if (paginaAtual > 1) {
                paginaAtual--;
                mostrarFestas();
                scrollParaPaginacao();
            }
        });
        paginacaoContainer.appendChild(btnAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
            const button = criarBotaoPaginacao(i, function() {
                paginaAtual = i;
                mostrarFestas();
                scrollParaPaginacao();
            });

            if (i === paginaAtual) {
                button.classList.add('active');
            }

            paginacaoContainer.appendChild(button);
        }

        const btnProximo = criarBotaoPaginacao('>', function() {
            if (paginaAtual < totalPaginas) {
                paginaAtual++;
                mostrarFestas();
                scrollParaPaginacao();
            }
        });
        paginacaoContainer.appendChild(btnProximo);
    }

    function criarBotaoPaginacao(texto, callback) {
        const button = criarElemento('button', 'btn', 'btn-outline-primary', 'mx-1');
        button.innerText = texto;
        button.addEventListener('click', callback);
        return button;
    }

    function formatarData(data) {
        const partesData = data.split('-');
        const ano = partesData[0];
        const mes = partesData[1];
        const dia = partesData[2];
        return `${dia}/${mes}/${ano}`;
    }

    function limparElemento(elemento) {
        elemento.innerHTML = '';
    }

    function criarElemento(tagName, ...classNames) {
        const elemento = document.createElement(tagName);
        elemento.classList.add(...classNames);
        return elemento;
    }

    function scrollParaPaginacao() {
        window.scrollTo(0, 200);
    }

    filtroDataInput.addEventListener('change', filtrarFestas);
    filtroGratuitoInput.addEventListener('change', filtrarFestas);
    filtroPagoInput.addEventListener('change', filtrarFestas);

    function filtrarFestas() {
        const dataSelecionada = filtroDataInput.value;
        const gratuitoSelecionado = filtroGratuitoInput.checked;
        const pagoSelecionado = filtroPagoInput.checked;

        festasFiltradas = festas;

        

        if (dataSelecionada) {
            festasFiltradas = festasFiltradas.filter(festa => festa.data === dataSelecionada);
        }

        if (gratuitoSelecionado || pagoSelecionado) {
            festasFiltradas = festasFiltradas.filter(festa => {
                if (gratuitoSelecionado && festa.preco.toLowerCase().includes('gratuito')) {
                    return true;
                }
                if (pagoSelecionado && !festa.preco.toLowerCase().includes('gratuito')) {
                    return true;
                }
                return false;
            });
        }

        paginaAtual = 1;
        mostrarFestas();
    }

    carregarFestas();
});
