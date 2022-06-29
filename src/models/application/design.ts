import {PatchHard, staticMappable} from "src/models/types/mapping"
import {RestaurantDesignI} from "src/models/domain/design"
import {PC, PCH} from "src/models/config"
import {Color, Int, RestaurantID} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"
import {RecordAt} from "src/models/application/base"

type AF = {
    additionalColors: {
        fontColor: Color,
        starColor: Color,
        fontColorPicked: Color,
        starColorPicked: Color,
        buttonDisabledBackgroundColor: Color
        paymentButton_fg: Color
        paymentButton_bg: Color
        shadow: Color
        showBorder: boolean
    },
    amounts: Int[],
    percentages: Int[],
    customPlaceholder: Nullable<string>
}


@staticMappable<RestaurantDesignI, RestaurantDesign>()
export class RestaurantDesign extends RecordAt implements PatchHard<RestaurantDesignI, PC.RestaurantDesign, PCH.Rec & {
    additionalFields: AF
}> {
    restaurantId: RestaurantID
    hideOurLogo: boolean
    bgGrad: [Color, Color]

    fgGrad: [Color, Color]
    accents: [Color, Color, Color]
    commentFrame: [Color, Color]

    bigLogo: Nullable<string>
    texture: Nullable<string>
    smallLogo: string
    additionalFields: AF

    constructor(data: RestaurantDesignI) {
        super(data)

        this.restaurantId = data.restaurant_id
        this.hideOurLogo = !!data.hide_our_logo
        this.bgGrad = data.bg_grad
        this.fgGrad = data.fg_grad
        this.accents = data.accents
        this.commentFrame = data.comment_frame
        this.bigLogo = data.big_logo
        this.texture = data.texture
        this.smallLogo = data.small_logo
        this.additionalFields = {
            additionalColors: {
                fontColor: data.additional_fields.additional_colors.font_color,
                starColor: data.additional_fields.additional_colors.star_color,
                fontColorPicked: data.additional_fields.additional_colors.font_color_picked,
                starColorPicked: data.additional_fields.additional_colors.star_color_picked,
                buttonDisabledBackgroundColor: data.additional_fields.additional_colors.button_disabled_background_color,
                paymentButton_fg: data.additional_fields.additional_colors.payment_button_fg,
                paymentButton_bg: data.additional_fields.additional_colors.payment_button_bg,
                shadow: data.additional_fields.additional_colors.shadow,
                showBorder: !!data.additional_fields.additional_colors.show_border,
            },
            amounts: data.additional_fields.amounts,
            percentages: data.additional_fields.percentages,
            customPlaceholder: data.additional_fields.custom_placeholder
        }
    }
}
