# Finbo Backend (NestJS • In-Memory CRUD)

Basit ama katmanlı mimariyle yazılmış bir **NestJS** backend’i.  
**Veritabanı yok** — başlangıç verileri repository’lerde **in-memory** tutulur.  
Frontend (Vite/CRA) farklı portta çalışır ve bu API’yi çağırır.

---

## Özellikler

- **Users** ve **Posts** için tam CRUD
- **İlişkili uçlar:** `GET /users/:userId/posts`, `POST /users/:userId/posts`
- **In-memory repository** (seed veriler sınıfların içinde)
- **Katmanlı mimari:** Controller → Service → Repository → Entity/DTO
- **class-validator + ValidationPipe** ile doğrulama
- **CORS** açık (5173 ve 3000 varsayılan)
- **Global LoggingInterceptor**: `[METHOD] /path -> status (ms)`
- Controller’larda **try/catch** ile hata yakalama (beklenmeyenlerde 500)
- **ESLint/Prettier** uyumlu

---

## Kurulum

> Node.js **18+** önerilir.

````bash
cd backend
npm install
npm i class-validator class-transformer
npm i -D @types/express

# geliştirme (watch)
npm run start:dev

# normal
npm run start


# lint
npm run lint



Sunucu: http://localhost:3001

CORS whitelist: http://localhost:5173, http://localhost:3000

src/main.ts’te port/CORS whitelist’ini düzenleyebilirsin.
En altta void bootstrap(); kullanılıyor


Proje Yapısı:
src/
  main.ts
  app.module.ts

  common/
    logging.interceptor.ts     # [GET] /users -> 200 (5ms)

  users/
    users.module.ts
    users.controller.ts
    users.service.ts
    dto/
      create-user.dto.ts
      update-user.dto.ts
    entities/
      user.entity.ts
    repository/
      users.repository.ts      # seed + in-memory

  posts/
    posts.module.ts
    posts.controller.ts
    posts.service.ts
    dto/
      create-post.dto.ts
      update-post.dto.ts
    entities/
      post.entity.ts
    repository/
      posts.repository.ts      # seed + in-memory
Notlar:

Repository’lerde başlangıç verileri ve id sayaçları bulunur.

Global ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }) aktiftir.

logging.interceptor.ts globalde app.useGlobalInterceptors(new LoggingInterceptor()) ile kullanılır.

API Uçları:
Users:
|  Metod | Yol          | Açıklama         |
| -----: | ------------ | ---------------- |
|    GET | `/users`     | Tüm kullanıcılar |
|    GET | `/users/:id` | Tek kullanıcı    |
|   POST | `/users`     | Yeni kullanıcı   |
|  PATCH | `/users/:id` | Güncelle         |
| DELETE | `/users/:id` | Sil              |
Posts:
|  Metod | Yol          | Açıklama       |
| -----: | ------------ | -------------- |
|    GET | `/posts`     | Tüm gönderiler |
|    GET | `/posts/:id` | Tek gönderi    |
|   POST | `/posts`     | Yeni gönderi   |
|  PATCH | `/posts/:id` | Güncelle       |
| DELETE | `/posts/:id` | Sil            |


| Metod | Yol                    | Açıklama                         |
| ----: | ---------------------- | -------------------------------- |
|   GET | `/users/:userId/posts` | Kullanıcının gönderileri         |
|  POST | `/users/:userId/posts` | Belirli kullanıcıya gönderi ekle |



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
````

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
