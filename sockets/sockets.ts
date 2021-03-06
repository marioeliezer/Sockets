import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";

export const desconectar=(cliente:Socket)=>{
    cliente.on('disconnect',()=>{
console.log('Cliente desconectado');
usuariosConectados.borrarUsuario(cliente.id);
    });
}

export const usuariosConectados =new UsuariosLista();

export const conectarCliente=(cliente:Socket)=>{
const usuario =new  Usuario(cliente.id);
usuariosConectados.agregar(usuario);
}
//Escuchar mensajes
export const mensaje=(cliente: Socket,io:socketIO.Server)=>{
 cliente.on('mensaje',(payload:{de:string, cuerpo:string}) => {
console.log('Mensaje recbido',payload);

io.emit('mensaje-nuevo',payload)

 });
}

//Usuarios
export const configurarUsuario=(cliente: Socket,io:socketIO.Server)=>{
    cliente.on('configurar-usuario',(payload:{nombre:string},callback:Function)=>{
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
        callback({
            ok:true,
            mensaje:`Usuario ${ payload.nombre},configuradp`
        });
    }
    
    );
}
