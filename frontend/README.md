# Frontend — React + TypeScript + Vite

Bu proje **React + TypeScript + Vite** tabanlı frontend uygulamasıdır.  
UI için **Tailwind CSS**, API istekleri için **Axios**, validasyon için **Zod** kullanılmaktadır.  
Backend ile entegrasyon **NestJS (localhost:3001)** üzerinden yapılmaktadır.

---

## 🚀 Kullanılan Paketler

- **React**, **React DOM**
- **TypeScript**
- **Vite**
- **Tailwind CSS**, **postcss**, **autoprefixer**
- **Axios**
- **Zod**
- **React Router DOM**
- **React Icons**
- **ESLint + Prettier**

---

## ⚙️ Kurulum

````bash
# bağımlılıkları yükle
npm install

# development server başlat
npm run dev

# build
npm run build

# lint
npm run lint


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])



frontend/
 ┣ src/
 ┃ ┣ components/ui/     # Ortak UI bileşenleri (Button, Input vs.)
 ┃ ┣ features/          # Modüller (users, posts)
 ┃ ┣ pages/             # Sayfalar (UsersPage, PostsPage vs.)
 ┃ ┣ App.tsx            # Router tanımları
 ┃ ┗ main.tsx           # Uygulama giriş noktası
 ┣ public/
 ┣ index.html
 ┣ tailwind.config.js
 ┣ postcss.config.js
 ┗ README.md


✅ Özellikler

Kullanıcı CRUD işlemleri (name, email kontrolü — .com zorunlu)

Gönderi CRUD işlemleri (title, body, user ilişkisi)

Kullanıcı ve gönderiler arasında ilişki

Form validasyonları (ör. title min 3, content min 5 karakter)

API hata yakalama ve kullanıcıya UI üzerinden gösterme

Modern ve responsive UI (Tailwind + ikonlar)

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])

🔧 ESLint & Kod Kalitesi

Proje ESLint + Prettier ile kod stilini korur.
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])


📝 Notlar

Kullanıcı silme işlemi, gönderisi olan kullanıcılar için engellenmiştir.

Formlarda input validasyonları UI üzerinden gösterilmektedir.
````
