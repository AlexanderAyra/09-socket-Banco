let socket = io();

let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

let lblEscritorio1 = $('#lblEscritorio1');
let lblEscritorio2 = $('#lblEscritorio2');
let lblEscritorio3 = $('#lblEscritorio3');
let lblEscritorio4 = $('#lblEscritorio4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('tickActual', (data) => {

    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', (data) => {

    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(data.ultimos4);
});


function actualizaHTML(ultimos4) {

    for (let i = 0; i < ultimos4.length; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);

    }
}