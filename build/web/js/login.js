function getUrlParameter(parametroRecebido) {
    var paginaURL = decodeURIComponent(window.location.search.substring(1)),
        variaveisURL = paginaURL.split('&'),
        parametro,
        i;

    for (i = 0; i < variaveisURL.length; i++) {
        parametro = variaveisURL[i].split('=');

        if (parametro[0] === parametroRecebido) {
            return parametro[1] === undefined ? true : parametro[1];
        }
    }
};
