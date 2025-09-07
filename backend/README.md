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



