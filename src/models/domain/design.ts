import {BoolExt, Color, Int, RestaurantID} from "src/models/types/primitive"
import {RecordAtI} from "src/models/domain/base"
import {Nullable} from "src/models/types/utility"

export interface RestaurantDesignI extends RecordAtI {
    restaurant_id: RestaurantID
    hide_our_logo: BoolExt
    bg_grad: [Color, Color] // "array[2]", //Массив цветов переднего фона (рамки для оплаты, тоже два цвета)

    fg_grad: [Color, Color] // "array[2]", //Массив цветов переднего фона (рамки для оплаты, тоже два цвета)
    accents: [Color, Color, Color] // "array[3]", //Массив акцинтных цветов
    comment_frame: [Color, Color] // "array[2]", // Цвета для рамки

    big_logo: Nullable<string>, // Имя файла для логотипа аватара
    texture: Nullable<string>, //Имя файла для текстуры
    small_logo: string, //Имя файла для маленького логотипа (пока не нужно)
    additional_fields: { //Доп поля
        additional_colors: {
            font_color: Color,
            star_color: Color,
            font_color_picked: Color,
            star_color_picked: Color,
            button_disabled_background_color: Color
            payment_button_fg: Color
            payment_button_bg: Color
            shadow: Color
            show_border: BoolExt
        },
        amounts: Int[],
        percentages: Int[],
        custom_placeholder: Nullable<string> // Кастомный текст плейсхолдера, для поля комментария
    }
}
