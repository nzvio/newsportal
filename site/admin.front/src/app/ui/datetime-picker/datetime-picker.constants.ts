import { IDtpLang } from './dtplang.interface';

export const dtpLangs: IDtpLang[] = [
    {
        name: "ru",
        dir: "ltr",
        phrases: {
            "mo": "Пн",
            "tu": "Вт",
            "we": "Ср",
            "th": "Чт",
            "fr": "Пт",
            "sa": "Сб",
            "su": "Вс",
            "apply": "Применить",
            "nodate": "[дата не задана]"
        }
    },
    {
        name: "en",
        dir: "ltr",
        phrases: {
            "mo": "Mo",
            "tu": "Tu",
            "we": "We",
            "th": "Th",
            "fr": "Fr",
            "sa": "Sa",
            "su": "Su",
            "apply": "Apply",
            "nodate": "[date is not set]"
        }
    }
];
