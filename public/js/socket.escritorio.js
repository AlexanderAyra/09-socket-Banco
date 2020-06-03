let socket = io();

let searParam = new URLSearchParams(window.location.search);

if (!searParam.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Es necesario el escritorio');
}

let escritorio = searParam.get('escritorio');

let label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', () => {

    socket.emit('atenderEscri', { escritorio: escritorio }, (data) => {

        if (data === 'No hay Tickets') {
            alert(data);
            label.text(data);
            return;
        }

        label.text('Ticket ' + data.numero);

    });

})