const BASE_API = "http://apigrumas.dataglobal.com.co/";
//const BASE_API = "https://localhost:44378/";

import { ToastAndroid, Alert } from "react-native";

class ApiFotos {
  async EnviarFoto(item) {
    console.log("hola item de enviar foto", item);
   ToastAndroid.show("Enviando foto: " + item.descripcion,  ToastAndroid.SHORT)
    try {
      var formdata = new FormData();
      formdata.append("", {
        name: item.foto,
        type: "image/jpg",
        uri:
          Platform.OS === "android" &&
          item.foto
      } );
      formdata.append("categoria", item.descripcion);
      console.log("form data", formdata);
      var requestOptions = {
        method: 'POST',
        //  headers: myHeaders,
        body: formdata,
        // headers: {
        //   // Authorization: "Bearer " + access_token,
        //   "Content-Type": "application/json",
        //   Accept: "application/json",
        // },
      };
      console.log("request",requestOptions)
      const response = await fetch(BASE_API + "api/Archivos/Cargar", requestOptions);
      console.log("response envio foto",response)
      const responseJson = await response.json();
      console.log("Recibiendo respuesta Servidor API FOTOS:", responseJson);
      return [responseJson, response.status];
    } catch (error) {
      ToastAndroid.show("Error envío: " + error,  ToastAndroid.SHORT)
      console.error("error api fotos response", error);
      return [error, 400]
    }
  }

  async EnviarFotoDB(data) {
    console.log("data", data)
    try {
      const urlapi = BASE_API + "api/Foto/InsertarListadoFotoDos";
      const response = await fetch(urlapi, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          // Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("response enviar db",JSON.stringify(data))
      const responseJson = await response.json();
      console.log("response", responseJson)
      return [
        responseJson.result == 1 ? responseJson.message : [],
        response.status,
      ];
    } catch (error) {
      console.error(error);
      return [[], response.status];
    }
  }
}

export default new ApiFotos();





GET Example
-----------
  import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import {ToastAndroid } from 'react-native';
const BASE_API = "http://apigrumas.dataglobal.com.co/";

class ApiData {
  async getToken(username, password) {
    try {
     console.log(username, password);
      const data = { identificacion: username, Contrasenna: password };
      const urlapi = BASE_API + "api/usuarios/authenticate";
      
      const response = await fetch(urlapi, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
     
      const responseJson = await response.json();
      console.log("response usu",responseJson)
      return [responseJson, response.status];
      
    } catch (error) {
      console.error(error);
    }
  }

  async getListaOrdenes(access_token, id_usuario) {
    try {
      const urlapi = BASE_API + "api/SuperOrden/GetPendientesByIdInspector?idInspector="+ id_usuario +"&top=100";
      const response = await fetch(urlapi, {
        method: "GET",
        headers: {
          // Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseJson = await response.json();
      return [
        responseJson.result == 1 ? responseJson.message : [],
        response.status,
      ];
    } catch (error) {
      console.error(error);
      return [[], response.status];
    }
  }

  async getListaAlcancesCategorias() {
    try {
      ToastAndroid.show('Concetando Servidor API: ', ToastAndroid.LONG);
      const urlapi = BASE_API + "api/MovilFormulario/GetAlcancesCategoriaMovil";
      const response = await fetch(urlapi, {
        method: "GET",
        headers: {
          // Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseJson = await response.json();
      ToastAndroid.show('Recibiendo respuesta Servidor API: '+response.status, ToastAndroid.LONG);
      return [
        responseJson.result == 1 ? responseJson.message : [],
        response.status,
      ];
    } catch (error) {
      console.error(error);
      return [[], response.status];
    }
  }

  async getListaAlcances() {
    try {
      const urlapi = BASE_API + "api/MovilFormulario/GetAlcancesMovil";
      const response = await fetch(urlapi, {
        method: "GET",
        headers: {
          // Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseJson = await response.json();
      return [
        responseJson.result == 1 ? responseJson.message : [],
        response.status,
      ];
    } catch (error) {
      console.error(error);
      return [[], response.status];
    }
  }

  async getListaFormularios() {
    try {
      const urlapi = BASE_API + "api/MovilFormulario/GetFormulariosAlcance";
      const response = await fetch(urlapi, {
        method: "GET",
        headers: {
          // Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseJson = await response.json();
      return [
        responseJson.result == 1 ? responseJson.message : [],
        response.status,
      ];
    } catch (error) {
      console.error(error);
      return [[], response.status];
    }
  }

  async getListaFormulariosCode(forms) {
    try {
      ToastAndroid.show('Conectando a Servidor API... ', ToastAndroid.SHORT);
      const urlapi = BASE_API + "api/MovilFormulario/GetFormulariosCode";
      const response = await fetch(urlapi, {
        method: "POST",
        body: JSON.stringify(forms),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseJson = await response.json();
      ToastAndroid.show('Recibiendo respuesta Servidor API: '+response.status, ToastAndroid.LONG);
      if(responseJson.result == 0){
        ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
      }
      return [
        responseJson.result == 1 ? responseJson.message : [],
        response.status,
      ];
    } catch (error) {
      ToastAndroid.show('Entro al error api ', ToastAndroid.SHORT);
      console.error(error);
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
      if (status === "granted") {
        const fecha = new Date();
        var fechaHoy = "GrumasBackup/" + fecha.getFullYear().toString() + "-" + (fecha.getMonth() + 1).toString() + "-" + fecha.getDate().toString();
        let fileUri = FileSystem.documentDirectory + ("LogApiFormulariosError.txt").toString();
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(error), { encoding: FileSystem.EncodingType.UTF8 });
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync(fechaHoy, asset, false)
        console.log("Hola archivo yes")
      }
      return [[], response.status];
    }
  }

  async getPreguntasCode(idFormulario) {
    try {
      ToastAndroid.show('Conectando a Servidor API... ' + idFormulario, ToastAndroid.LONG);
      const urlapi = BASE_API + "api/MovilFormulario/GetPreguntas?idFormulario="+idFormulario;
      const response = await fetch(urlapi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseJson = await response.json();
      ToastAndroid.show('Recibiendo respuesta Servidor API:'+response.status, ToastAndroid.LONG);
      if(responseJson.result == 0){
        ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
      }
      return [
        responseJson.result == 1 ? responseJson.message : [],
        response.status,
      ];
    } catch (error) {
      ToastAndroid.show('Entro al error api ', ToastAndroid.SHORT);
      console.error(error);
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
      if (status === "granted") {
        const fecha = new Date();
        var fechaHoy = "GrumasBackup/" + fecha.getFullYear().toString() + "-" + (fecha.getMonth() + 1).toString() + "-" + fecha.getDate().toString();
        let fileUri = FileSystem.documentDirectory + ("LogApiFormulariosError.txt").toString();
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(error), { encoding: FileSystem.EncodingType.UTF8 });
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync(fechaHoy, asset, false)
        console.log("Hola archivo yes")
      }
      return [[], response.status];
    }
  }

  async addRespuesta(access_token, id_usuario, data) {
    console.log("data", data)
    console.log("data enviar", JSON.stringify(data))
    try {
      const urlapi = BASE_API + "api/respuestas/insertar";
      const response = await fetch(urlapi, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          // Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseJson = await response.json();
      console.log("response", responseJson)
      return [
        responseJson.message,response.status
      ];
    } catch (error) {
      console.error(error);
      return [[], response.status];
    }
  }
}

export default new ApiData();
  
  
  
  
  
