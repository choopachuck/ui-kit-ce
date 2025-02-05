# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.13.0] (2024-09-07)


### Bug Fixes

* **autocomplete:** исправлена работа onChange евента ([80d7b35](#))
* **combo-box:** исправлена работа onBlur при выборе значения из выпадающего списка ([4f0ba1e](#))
* **combo-box:** исправлено закрытие DropDown при клике на скролл-бар ([16ce887](#))
* **combo-box:** исправлено использование класса для checkBox получаемого из пропсов ([01c7c9c](#))
* **table:** исправлено сжатие выбраной опции текущей страницы если присутсвует скролл ([d426198](#))



### 1.12.1 (2024-07-24)

**Note:** Version bump only for package @v-uik/combo-box





## 1.12.0 (2024-07-05)


### Features

* **combo-box,autocomplete:** изменение значения инициирует событие onChange ([70b460e](#))
* **combo-box:** добавлен inputInnerProps ([a790a77](#))
* **input:** очистка поля инициирует событие onChange ([482eede](#))


### Bug Fixes

* **checkbox:** поправлен размер checkbox ([5451566](#))
* **combo-box:** баг невозможности удаления тэгов при динамическом изменение limitTag ([a1d24d2](#))



### 1.11.1 (2024-06-17)

**Note:** Version bump only for package @v-uik/combo-box





## 1.11.0 (2024-06-04)


### Features

* (combo-box, date-picker, input, select, theme) добавлены токены для фона с ошибкой ([b64101b](#))
* **combo-box,select:** добавлена возможность передавать кастомную иконку ([e9b16fc](#))
* **combo-box,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([8c60989](#))
* **combo-box:** новые кастомные компоненты ([e5c7baa](#))
* **labelled,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([4ad1352](#))


### Bug Fixes

* **combo-box:** поправлена работа onBlur в SberBrowser [SBTSUPPORT-37922] ([2e49bc2](#))
* **combo-box:** прокидывание кастомного класса focused в Control ([fcb5dcb](#))
* поправлена совместимость с @types/react@18.2.43 и выше ([9769c71](#))
