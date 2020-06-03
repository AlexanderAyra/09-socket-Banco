let socket = io();

let label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectados al Servidor');
});

socket.on('disconnect', () => {
    console.log('Perdimos Conexion con el Servidor');
});

$('button').on('click', () => {

    socket.emit('siguienteTicket', null, (data) => {
        label.text(data);
    });
});

socket.on('tickActual', (data) => {
    label.text(data.actual);
});