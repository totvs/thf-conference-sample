# THF Conference Application


THF Conference Application é um aplicativo de demonstração do ThfSync baseado no [Ionic Conference Application](https://github.com/ionic-team/ionic-conference-app). Tendo como objetivo, demonstrar as funcionalidades do ThfSync de forma didática.

> Por esta razão, alguns exemplos aqui demonstrados, como a autenticação do usuário, foram implementados apenas de forma didática, não se preocupando com validações de segurança, por exemplo.

Para saber mais sobre o ThfSync, veja em [Começando com o ThfSync](https://thf.totvs.com.br/guides/sync-get-started).

As funcionalidades do ThfSync foram isoladas em serviços com exceção dos métodos que envolvem *Subscriber*. Os componentes do App concentram-se apenas na busca do serviço e nas manipulações de tela.

A seguir, tem-se uma lista de funcionalidades utilizadas no App e onde podem ser encontradas.

### ThfSyncService

- `ThfSyncService.prepare()`:
  - [src/app/app.component.ts](./src/app/app.component.ts#L134)

- `ThfSyncService.loadData()`:
  - [src/app/app.component.ts](./src/app/app.component.ts#L111)

- `ThfSyncService.getResponses()`:
  - [src/pages/signup/signup.component.ts](./src/pages/signup/signup.component.ts#L42)

- `ThfSyncService.getModel()`:
  - [src/services/conference.service.ts](./src/services/conference.service.ts#L14)
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts)
  - [src/services/note.service.ts](./src/services/note.service.ts#L12)
  - [src/services/speaker.service.ts](./src/services/speaker.service.ts#L11)
  - [src/services/track.service.ts](./src/services/track.service.ts#L11)
  - [src/services/user.service.ts](./src/services/user.service.ts#L13)

- `ThfSyncService.insertHttpCommand()`:
  - [src/services/user.service.ts](src/services/user.service.ts#L53)

- `ThfSyncService.onSync()`:
  - [src/pages/lecture-detail/lecture-detail.component.ts](./src/pages/lecture-detail/lecture-detail.component.ts#L32)
  - [src/pages/note-list/note-list.component.ts](./src/pages/note-list/note-list.component.ts#L25)
  - [src/pages/schedule-filter/schedule-filter.component.ts](./src/pages/schedule-filter/schedule-filter.component.ts#L22)
  - [src/pages/schedule/schedule/component.ts](./src/pages/schedule/schedule.component.ts#L47)
  - [src/pages/speaker-detail/speaker-detail.component.ts](./src/pages/speaker-detail/speaker-detail.component.ts#L23)
  - [src/pages/speaker-list/speaker-list.component.ts](./src/pages/speaker-list/speaker-list.component.ts#L39)

- `ThfSyncService.sync()`:
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L24)
  - [src/services/note.service.ts](./src/services/note.service.ts#L36)
  - [src/services/speaker.service.ts](./src/services/speaker.service.ts#L16)
  - [src/services/track.service.ts](./src/services/track.service.ts#L16)
  - [src/services/user.service.ts](./src/services/user.service.ts#L104)

### ThfEntity

- `ThfEntity.find()`:
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L20)
  - [src/services/note.service.ts](./src/services/note.service.ts)
  - [src/services/speaker.service.ts](./src/services/speaker.service.ts#L11)
  - [src/services/track.service.ts](./src/services/track.service.ts#L11)
  - [src/services/user.service.ts](./src/services/user.service.ts)

- `ThfEntity.findById()`:
  - [src/pages/speaker-detail/speaker-detail.component.ts](./src/pages/speaker-detail/speaker-detail.component.ts#L39)
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L16)
  - [src/services/user.service.ts](./src/services/user.service.ts)

- `ThfEntity.findOne()`:
  - [src/services/conference.service.ts](./src/services/conference.service.ts#L10)

- `ThfEntity.save()`:
  - [src/services/note.service.ts](./src/services/note.service.ts#L32)
  - [src/services/user.service.ts](./src/services/user.service.ts)

- `ThfEntity.remove()`:
  - [src/services/note.service.ts](./src/services/note.service.ts#L28)

### ThfQueryBuilder

- `ThfQueryBuilder.exec()`:
  - [src/services/conference.service.ts](./src/services/conference.service.ts#L10)
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts)
  - [src/services/note.service.ts](./src/services/note.service.ts#L22)
  - [src/services/speaker.service.ts](./src/services/speaker.service.ts#L11)
  - [src/services/track.service.ts](./src/services/track.service.ts#L11)
  - [src/services/user.service.ts](./src/services/user.service.ts)

- `ThfQueryBuilder.sort()`:
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L20)
  - [src/services/speaker.service.ts](./src/services/speaker.service.ts#L11)

### ThfStorageService

- `ThfStorageService.set()`:
  - [src/app/app.component.ts](./src/app/app.component.ts#L109)
  - [src/pages/signup/signup.component.ts](./src/pages/signup/signup.component.ts#L47)

- `ThfStorageService.remove()`:
  - [src/app/app.component.ts](./src/app/app.component.ts#L74)

### ThfSyncSchema

Os schemas foram colocados em arquivos separados como constantes no diretório: src/schemas. Todos os schemas foram importados para o arquivo src/schemas/schemas-list.constants.ts e adicionado ao array `schemas`. Sendo esta constante, o parâmetro que representa os schemas no método `ThfSync.prepare`.
