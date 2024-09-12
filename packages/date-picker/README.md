# DatePicker

Компонент выбора даты.

Для работы компонента, его необходимо обернуть в DateLibAdapterProvider
(можно обернуть всё приложение для всех пикеров в нем),
которому необходимо передать в свойство dateAdapter экземпляр адаптера библиотеки
по работе с датами, находящегося в `@v-uik/date-picker/dist/adapters` (или же самописный адаптер, имплементирующий
его интерфейс). Таким образом, компонент не зависит от конкретной
библиотеки обработки дат.

## API

| Свойство                  | Тип                                    | Описание                                                                                                                       |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `value`                   | `ParsableDate`                         | `Значение пикера`                                                                                                              |
| `onChange`                | `(value: TDate) => void`               | `Обработчик изменения значения`                                                                                                |
| `views`                   | `string[] / DatePickerView[]`          | **@deprecated** `Настройка составных частей пикера (day, month, year)`                                                         |
| `format`                  | `string`                               | `Формат текстового отображения даты в инпуте`                                                                                  |
| `mask`                    | `string`                               | `Маска ввода инпута (см. @v-uik/masked-input), должна соответствовать format. В случае отсутствия инпут будет нередактируемый` |
| `inputProps`              | `InputProps / MaskedInputProps`        | `Свойства компонента Input / MaskedInput (в случае указания свойства mask)`                                                    |
| `validationErrorMessages` | `Partial<DateValidationErrorMessages>` | `Объект для изменения сообщений об ошибках валидации`                                                                          |
| `disableFuture`           | `boolean`                              | `Будущие даты недоступны для выбора`                                                                                           |
| `disablePast`             | `boolean`                              | `Прошлые даты недоступны для выбора`                                                                                           |
| `disableDate`             | `(date: TDate) => boolean`             | `Коллбэк позволяющий, заблокировать определенную дату`                                                                         |
| `minDate`                 | `ParsableDate`                         | `Минимально допустимая дата`                                                                                                   |
| `maxDate`                 | `ParsableDate`                         | `Максимально допустимая дата`                                                                                                  |
| `disabled`                | `boolean`                              | `Отключить пикер`                                                                                                              |
| `open`                    | `boolean`                              | `Управление открытием пикера снаружи`                                                                                          |
| `dropdownProps`           | `DropdownProps`                        | `Свойства компонента Dropdown`                                                                                                 |

\* TDate - тип объекта даты, выбранной библиотеки по работе с датами.

## Пример использования

```javascript
import { DatePickerAdapterProvider, DatePicker } from '@v-uik/base';
import MomentAdapter from '@date-io/moment';
...
<DatePickerAdapterProvider dateAdapter={MomentAdapter}>
    <DatePicker
        mask="11.11.1111"
        format="DD.MM.YYYY"
    />
</DatePickerAdapterProvider>
```
