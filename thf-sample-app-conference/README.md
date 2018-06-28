# THF Conference Application


THF Conference Application é um aplicativo de demonstração do ThfSync baseado no [Ionic Conference Application](https://github.com/ionic-team/ionic-conference-app). Tendo como objetivo, demonstrar as funcionalidades do ThfSync de forma didática.

> Por esta razão, alguns exemplos aqui demonstrados, como a autenticação do usuário, foram implementados apenas de forma didática, não se preocupando com validações de segurança, por exemplo.

Para saber mais sobre o ThfSync, veja em [Começando com o ThfSync](https://thf.totvs.com.br/guides/sync-get-started).

As funcionalidades do ThfSync foram isoladas em serviços com exceção dos métodos que envolvem *Subscriber*. Os componentes do App concentra-se apenas na busca do serviço e nas manipulações de tela.

A seguir, tem-se uma lista de funcionalidades utilizadas no App e onde podem ser encontradas.

### ThfSyncService

- `ThfSyncService.prepare`: src/app/app.component.ts

- `ThfSyncService.loadData`: src/app/app.component.ts

- `ThfSyncService.getHttpResponses`: src/app/app.component.ts

- `ThfSyncService.removeItemOfSync`: src/app/app.component.ts

- `ThfSyncService.resumeSync`: src/app/app.component.ts

- `ThfSyncService.getModel`: src/services/*

- `ThfSyncService.insertHttpCommand`: src/services/user.service.ts

- `ThfSyncService.onSync`:
  - src/pages/lecture-detail/lecture-detail.component.ts
  - src/pages/note-list/note-list.component.ts
  - src/pages/schedule-filter/schedule-filter.component.ts
  - src/pages/schedule/schedule/component.ts
  - src/pages/speaker-detail/speaker-detail.component.ts
  - src/pages/speaker-list/speaker-list.component.ts

- `ThfSyncService.sync`: 
  - src/services/lecture.service.ts
  - src/services/note.service.ts
  - src/services/speaker.service.ts
  - src/services/track.service.ts
  - src/services/user.service.ts

### ThfEntity

- `ThfEntity.find`:
  - src/services/lecture.service.ts
  - src/services/note.service.ts
  - src/services/speaker.service.ts
  - src/services/track.service.ts
  - src/services/user.service.ts

- `ThfEntity.findById`:
  - src/services/lecture.service.ts
  - src/services/user.service.ts
  - src/pages/speaker-detail/speaker-detail.component.ts

- `ThfEntity.findOne`: src/services/conference.service.ts

- `ThfEntity.save`:
  - src/services/note.service.ts
  - src/services/user.service.ts

- `ThfEntity.remove`: src/services/note.service.ts

### ThfQueryBuilder

- `ThfQueryBuilder.exec`: src/services/*

- `ThfQueryBuilder.sort`:
  - src/services/lecture.service.ts
  - src/services/speaker.service.ts

### ThfStorageService

- `ThfStorageService.set`: 
  - src/app/app.component.ts
  - src/signup/signup.component.ts

- `ThfStorageService.remove`: src/app/app.component.ts

### ThfSyncSchema

Os schemas foram colocados em arquivos separados como constantes no diretório: src/schemas. Todos os schemas foram importados para o arquivo src/schemas/schemas-list.constants.ts e adicionado ao array `schemas`. Sendo esta constante, o parâmetro que representa os schemas no método `ThfSync.prepare`.
