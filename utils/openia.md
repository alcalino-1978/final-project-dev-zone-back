# Cómo usar Chat-GPT3 en Angular

Para usar la API de GPT-3 en Angular, es posible crear un servicio en Node.js que actúe como intermediario entre la API de OpenAI y el frontend de Angular.

Para comenzar, necesitas instalar la biblioteca axios en Node.js para realizar solicitudes HTTP a la API de OpenAI. Luego, puedes crear un servicio en Node.js que acepte solicitudes de Angular y envíe solicitudes a la API de OpenAI.

A continuación, te proporciono un ejemplo de cómo podrías crear un servicio en Node.js para interactuar con la API de GPT-3 y cómo consumirlo en Angular:

Crea un proyecto de Node.js y agrega la biblioteca axios como dependencia:

```csharp
npm init -y
```
Crea un archivo llamado openai.service.js en la carpeta de servicios de Node.js y agrega el siguiente código:
javascript
Copy code
```js
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

// Configure OpenAI API credentials
const openaiAPIKey = process.env.OPEN_AI_API_KEY;
openai.apiKey = openaiAPIKey;

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the route handler for the API endpoint
router.post("/message", (req, res) => {
  const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.prompt,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256,
  });

  response
    .then((data) => {
      res.send({ message: data.data.choices[0].text });
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

module.exports = router;

```
Este código define un objeto openaiService con un método completions que acepta un prompt, un modelo y una longitud, y devuelve el resultado del modelo de lenguaje GPT-3.

En Angular, crea un servicio que consuma el servicio de Node.js. Puedes crear un servicio llamado openai.service.ts en la carpeta de servicios de Angular y agregar el siguiente código:
typescript
```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  constructor(private http: HttpClient) { }

  completions(message: string) {
    console.log(message)
    return this.http.post('http://localhost:3000/message', { prompt: message });
  }
}
```

Este código define un servicio OpenaiService que usa el HttpClient de Angular para enviar solicitudes HTTP al servicio de Node.js.

En tu componente de Angular, importa el servicio de OpenAI y úsalo para enviar solicitudes al servicio de Node.js y recibir las respuestas de GPT-3. Por ejemplo:
typescript
```js
import { Component } from '@angular/core';
import { OpenaiService } from './openai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prompt = 'Escribe aquí lo que quieras que el modelo complete';
  response = '';

  constructor(private openaiService: OpenaiService) { }

  sendRequest() {
    this.openaiService.completions(this.prompt)
      .subscribe((data: any) => {
        console.log(data);
        this.response = data.message;
      });
  }
}
```
Este código define un componente AppComponent que usa el servicio OpenaiService para enviar una solicitud al servicio de Node.js cuando se hace clic en un botón en la vista. El resultado de la solicitud se asigna a la variable response del componente, que se muestra en la vista.

En la vista de tu componente, puedes agregar el siguiente código HTML para mostrar la respuesta:

```html
<div>
  <textarea [(ngModel)]="prompt"></textarea>
  <button (click)="sendRequest()">Enviar solicitud</button>
  <textarea [(ngModel)]="response"></textarea>
</div>
```
Este código define un área de texto para el prompt, un botón para enviar la solicitud y otra área de texto para mostrar la respuesta.