# THF CONFERENCE APPLICATION

Esse repositório tem como objetivo, disponibilizar um exemplo de uma arquitetura que contém duas aplicações, uma web e uma para dispositivos móveis. Aqui você pode encontrar exemplos de utilização do **thf-ui**, **thf-sync** e **thf-storage**, e usá-los como referência para suas aplicações.

![Use Extension](https://github.com/totvs/thf-conference-sample/raw/master/assets/images/thf-conference-app-1.gif)

![Use Extension](https://github.com/totvs/thf-conference-sample/raw/master/assets/images/thf-conference-app-2.gif)

No exemplo, a aplicação web funciona como um portal para o administrador da conferência, onde ele pode cadastrar, atualizar ou remover os palestrantes e as palestras. Já no aplicativo móvel, o usuário além de poder acompanhar quem são os palestrantes e a agenda de palestras, ele pode adicionar, alterar ou remover notas sobre uma determinada palestra. Todas essas informações ficam armazenadas no server, comum as duas aplicações.

> A aplicação que funciona como um `backend` único e centralizado, é gerada automaticamente a partir do [swagger editor](https://editor.swagger.io/), logo, esse código não deve ser considerado como referência de boas práticas de codificação e construção de projeto, ele tem apenas a função de permitir a comunicação entre as aplicações de forma prática.

### Pré-requisitos:

Para executar as aplicações é necessário realizar as seguintes instalações:
 - [NodeJS](https://nodejs.org/en/);
 - [Angular](https://angular.io/guide/quickstart);
 - [Ionic](https://ionicframework.com/getting-started)

#### Executando o server

```console
$ cd thf-conference-api
$ npm install
$ npm start
```

#### Executando a aplicação web

```console
$ cd thf-sample-web-conference
$ npm install
$ ng serve
```

#### Executando a aplicação mobile

```console
$ cd thf-sample-app-conference
$ npm install
$ ionic serve
```

### Links úteis:

- Para saber mais sobre o **thf-ui**, acesse [documentação do thf-ui](https://thf.totvs.com.br/home);
- Para saber mais sobre o **thf-sync**, acesse [começando com o thf-sync](https://thf.totvs.com.br/guides/sync-get-started);
- Para saber mais sobre o **thf-storage**, acesse [documentação do thf-storage](https://thf.totvs.com.br/documentation/thf-storage)