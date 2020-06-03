const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguienteT = ticketControl.siguiente();

        console.log(siguienteT);
        callback(siguienteT);
    });

    client.emit('tickActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderEscri', (data, callback) => {

        if (!data.escritorio) {
            callback({
                ok: false,
                err: {
                    message: 'error al mandar el escritorio'
                }
            });
        }

        let atencion = ticketControl.atenderTicket(data.escritorio);

        callback(atencion);


        client.broadcast.emit('ultimos4', {

            ultimos4: ticketControl.getUltimos4()
        });
    })

});