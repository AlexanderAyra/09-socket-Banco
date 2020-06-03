const fs = require('fs');


class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;
    }
}



class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (this.hoy === data.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarTicket();

        }
    }

    siguiente() {

        this.ultimo += 1;

        let ticke = new Ticket(this.ultimo, null);
        this.tickets.push(ticke);

        this.cargarTicket();

        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {

        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {

        return this.ultimos4;
    }

    reiniciarTicket() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Reinicializando el sistema');
        this.cargarTicket();

    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay Tickets'
        }

        let numeroTicke = this.tickets[0].numero;
        this.tickets.shift();

        let nuevoTicket = new Ticket(numeroTicke, escritorio);
        this.ultimos4.unshift(nuevoTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }

        console.log('Ultimos4');
        console.log(this.ultimos4);

        this.cargarTicket();

        return nuevoTicket;

    }


    cargarTicket() {

        let jsonData = {

            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}

module.exports = {

    TicketControl
}