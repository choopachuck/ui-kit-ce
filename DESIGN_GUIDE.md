# Документация, которая может пригодиться дизайнерам

## Запуск свежего storybook

- Перейти в корень проекта `v-uik`

```
cd path/to/v-uik
```

- Проверить, что вы находитесь в рабочей ветке, которая содержит свежие изменения

```bash
git branch --show-current
```

ожидаемая ветка `develop`

- Получить свежие обновления

```bash
git pull origin develop
```

- Обновить зависимости

```bash
yarn install
```

- Запустить storybook

```bash
yarn showroom
```
