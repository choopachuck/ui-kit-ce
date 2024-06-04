# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.11.0 (2024-06-04)


### Features

* (circular-progress): добавлено свойство настройки размеров прогресс бара ([4d44333](#))
* (combo-box, date-picker, input, select, theme) добавлены токены для фона с ошибкой ([b64101b](#))
* (date-picker): добавлена настройка стилизации для панели навигации ([14979a2](#))
* (date-picker): добавлена настройка стилизации сетки календаря ([37847d2](#))
* **accordion:** добавлена возможность передавать кастомную иконку ([a42417a](#))
* **avatar:** реализованы компоненты Avatar и AvatarGroup ([328e88d](#))
* **button,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([6058c64](#))
* **card:** добавлен компонент Card ([23de1d0](#))
* **checkbox,theme:** добавлены новые comp токены для checkbox в состоянии indeterminate ([42affdb](#))
* **combo-box,select:** добавлена возможность передавать кастомную иконку ([e9b16fc](#))
* **combo-box,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([8c60989](#))
* **combo-box:** новые кастомные компоненты ([e5c7baa](#))
* **drawer,modal,notification,theme:** стандартизированы токены closeButton ([ba7ad54](#))
* **file-uploader:** добавлена возможность замены внутренних компонентов ([9585e1a](#))
* **hooks:** добавлен хук useButtonReset ([be369fc](#))
* **inline-notification:** добавлен новый компонент ([4a6d4df](#))
* **input,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([c85ea0c](#))
* **label-control,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([990e5f7](#))
* **labelled,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([4ad1352](#))
* **pagination:** реализован новый компонент Pagination ([842f701](#))
* **select,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([4db0ac9](#))
* **select:** новые кастомные компоненты ([1ac80be](#))
* **slider:** добавлен проп classes в SliderMarker ([0bde95b](#))
* **tag,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([b524932](#))
* **tag:** добавлен проп components в tag ([e48b167](#))
* **textarea,theme:** добавлены новые токены для типографики в зависимости от свойства `size` ([99a8c61](#))
* **underlay:** добавлен новый компонент ([4066c48](#))
* версии реэкспортируемых пакетов залочены на версию base ([e475881](#))


### Bug Fixes

* **accordion,drawer,file-uploader,inline-notification,modal,theme,underlay:** правки токенов ([79172be](#))
* **combo-box:** поправлена работа onBlur в SberBrowser [SBTSUPPORT-37922] ([2e49bc2](#))
* **combo-box:** прокидывание кастомного класса focused в Control ([fcb5dcb](#))
* **date-picker:** поправлен размер кнопки выбора года в панели для rangePicker ([65abba2](#))
* **date-picker:** поправлена типизация DateTimePicker ([a65d558](#))
* **dropdown-menu:** исправлено поведение фокуса ([77bbb49](#))
* **masked-input:** исправлена невозможность вставить значение с пробелом в конце/начале строки ([15b4acd](#))
* **notification:** исправлена работа limit при StrictMode [SBTSUPPORT-37758] ([ae634a0](#))
* **radio:** исправлено отображение активного Radio в Google Chrome [SBTSUPPORT-38733] ([1fe630b](#))
* **slider:** убрана возможность фокуса с помощью клавиатуры и перемещение слайдера при disabed ([171658a](#))
* поправлена совместимость с @types/react@18.2.43 и выше ([9769c71](#))
