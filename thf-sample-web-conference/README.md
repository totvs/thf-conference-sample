# THF Conference Application

THF Conference Application é um aplicativo de demonstração do ThfSync baseado no [Ionic Conference Application](https://github.com/ionic-team/ionic-conference-app). Tendo como objetivo, demonstrar as funcionalidades do ThfSync de forma didática.

O THF Conference Application é formado por três partes:

 - `APP`: aplicativo em ionic baseado no exemplo [Ionic Conference Application](https://github.com/ionic-team/ionic-conference-app), contendo as funcionalidades do [ThfSync](https://thf.totvs.com.br/guides/sync-get-started) implementadas como exemplo para a comunidade de desenvolvimento.
 - `WEB`: aplicação web desenvolvida em [THF](https://thf.totvs.com.br), para realizar a administração dos dados que serão consultados no aplicativo móvel.
 - `SERVER`: uma API em NodeJS modelada conforme o [Guia de API Totvs](http://tdn.totvs.com/pages/releaseview.action?pageId=271660444). Esta API é compartilhada pelos aplicativos `APP` e `WEB`. A API foi modelada com documentação [Swagger 2.0](https://swagger.io/) e o código fonte foi gerado automaticamente a partir da ferramenta [Editor swagger](http://editor.swagger.io) com base na modelagem previamente definida.

> A finalidade desta aplicação é servir de exemplo para a comunidade de desenvolvimento, para utilização do [ThfSync](https://thf.totvs.com.br/guides/sync-get-started) através do aplicativo mobile e do [THF](https://thf.totvs.com.br/home) através da aplicação web. Por esta razão, alguns exemplos aqui demonstrados, como a autenticação do usuário, a API em NodeJS compartilhada pelas aplicações, foram implementados apenas de forma didática, não se preocupando com validações de segurança, por exemplo.

Para saber mais sobre o ThfSync, veja em [Começando com o ThfSync](https://thf.totvs.com.br/guides/sync-get-started).

Para saber mais sobre o THF, veja em [THF: O framework TOTVS para web e mobile](https://thf.totvs.com.br).
