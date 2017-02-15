'use strict;'

module.exports = function(fname, message) {

    var self = this;
    this.fname = fname;
    this.msg = message;

    return new Promise(function(resolve, reject) {

        switch (self.fname) {
            case 'get_accounts':
                //
                // seleccionamos los datos de interes 
                // & filtramos
                // finalmente retornamos la respuesta.
                // 
                resolve(self.msg)
                break;
            case 'get_accounts_balances':
                //
                // seleccionamos los datos de interes,
                //  & filtramos
                //  finalmente retornamos la respuesta.
                //  
                resolve(self.message)
                break;
            default:
                // si la funcion no es la retornamos Error
                reject({
                    error: 'Unknow fname/method'
                })
        }

    })

};