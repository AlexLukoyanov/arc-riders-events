# ARC Raiders Event Timers

Веб-приложение для отображения таймеров событий игры ARC Raiders, построенное на React + Vite.

## Технологии

- **React 18** - UI библиотека
- **Vite** - сборщик и dev-сервер
- **GitHub Pages** - хостинг

## Локальный запуск

1. Установите зависимости:
```bash
npm install
```

2. Запустите dev-сервер:
```bash
npm run dev
```

3. Откройте браузер и перейдите по адресу: http://localhost:5173

4. Для сборки production версии:
```bash
npm run build
```

5. Для предпросмотра production сборки:
```bash
npm run preview
```

## Деплой на GitHub Pages

### Способ 1: Автоматический деплой через GitHub Actions

1. Создайте репозиторий на GitHub
2. Загрузите код в репозиторий:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/arc-event.git
git push -u origin main
```

3. В настройках репозитория:
   - Перейдите в **Settings** → **Pages**
   - В разделе **Source** выберите **GitHub Actions**
   - Сохраните изменения

4. **Важно:** Если название вашего репозитория отличается от `arc-event`, измените `base` в файле `vite.config.js` на `/ВАШЕ_НАЗВАНИЕ_РЕПОЗИТОРИЯ/`

5. GitHub Actions автоматически задеплоит сайт при каждом push в ветку `main`

### Способ 2: Ручной деплой

1. Создайте репозиторий на GitHub
2. Загрузите код в репозиторий
3. В настройках репозитория:
   - Перейдите в **Settings** → **Pages**
   - В разделе **Source** выберите ветку `main` и папку `/ (root)`
   - Нажмите **Save**

Сайт будет доступен по адресу: `https://ВАШ_USERNAME.github.io/arc-event/`

## Описание

Приложение получает данные о событиях ARC Raiders с API и отображает их на русском языке с указанием времени проведения. Активные события подсвечиваются зелёным цветом.

Для работы на GitHub Pages используется CORS прокси (allorigins.win), так как GitHub Pages поддерживает только статические файлы.
