import React, {FC, useEffect, useState} from "react";
import "./style.sass"
import UserTipView from "src/views/tip/UserTipView"
import TeamTipView from "src/views/tip/TeamTipView"
import {Layout, Spin} from "antd"
import {UserService} from "src/services/UserService"
import {useParams} from "react-router-dom"
import {WaiterCode} from "src/models/types/primitive"
import {WaiterInfoNarrow} from "src/models/application/waiter"
import {RestaurantDesign} from "src/models/application/design"
import {img} from "src/services/Endpoints"

interface Props {
}

const TipView: FC<Props> = (props) => {
    const params = useParams<{ waiterCode: WaiterCode }>()
    if (!params.waiterCode) return <div/>
    const [waiterInfo, setWaiterInfo] = useState<WaiterInfoNarrow>();

    useEffect(() => {
        UserService.getNarrowUserInfo(params.waiterCode!!)
            .then(setWaiterInfo)
    }, []);

    useEffect(() => {
        if (!waiterInfo?.restaurant.tipsDesign) return
        initCustomDesign(waiterInfo?.restaurant.tipsDesign)
    }, [waiterInfo]);


    function initCustomDesign(design: RestaurantDesign) {
        console.log({design})
        const style = document.createElement("style")
        document.getElementsByTagName("head")[0].appendChild(style);
        const a = {
            // backgroundColor: "#F00",
            "--pt-background": `linear-gradient(0deg, ${design.bgGrad[0]}, ${design.bgGrad[1]})`,
            "--pt-logo-display": design.hideOurLogo ? "unset" : "none",
            "--pt-foreground": `linear-gradient(0deg, ${design.fgGrad[0]}, ${design.fgGrad[1]})`,

            "--pt-button-active-color": design.accents[0],
            "--pt-button-active-color-shadow": shadeColor(design.accents[0], -20),
            "--pt-button-active-font-color": design.accents[1],
            "--pt-avatar-border-color": design.accents[2],

            "--pt-comment-background-color": design.commentFrame[0],
            "--pt-comment-placeholder-color": design.commentFrame[1] + "50",

            "--pt-big-logo": design.bigLogo ? img(design.bigLogo) : "unset",
            "--pt-small-logo": design.smallLogo ? img(design.smallLogo) : "unset",
            "--pt-texture-logo": design.texture ? img(design.texture) : "unset",

            "--pt-font-base-color": design.additionalFields.additionalColors.fontColor,
            "--pt-font-base-picked-color": design.additionalFields.additionalColors.fontColorPicked,

            "--pt-star-color": design.additionalFields.additionalColors.starColor,
            "--pt-star-picked-color": design.additionalFields.additionalColors.starColorPicked,

            "--pt-button-disabled-border-color": design.additionalFields.additionalColors.showBorder ? ("solid 1px " + design.additionalFields.additionalColors.fontColorPicked) : "unset",
            "--pt-button-disabled-border-color-picked": design.additionalFields.additionalColors.showBorder ? ("solid 1px " + design.additionalFields.additionalColors.fontColorPicked) : "unset",
            "--pt-button-disabled-back-color": design.additionalFields.additionalColors.buttonDisabledBackgroundColor,
            "--pt-button-disabled-back-color-shadow": shadeColor(design.fgGrad[0], -20),

            "--pt-submit-button-payment-button-font-color": design.additionalFields.additionalColors.paymentButton_fg,
            "--pt-submit-button-payment-button-back-color": design.additionalFields.additionalColors.paymentButton_bg,
            "--pt-submit-button-shadow": design.additionalFields.additionalColors.shadow,

            "--pt-comment-placeholder-color-value": shadeColor(design.commentFrame[1], -20),
            "--pt-payment-placeholder-color-value": design.additionalFields.additionalColors.fontColorPicked + "50",

            "--pt-header-height": !!design.bigLogo ? "25vh" : "15vh",
            "--pt-form-height": !!design.bigLogo ? "75vh" : "85vh",
            "--pt-logo-width": !!design.bigLogo ? "170px" : "220px",

            "--pt-warn-color": !!(design as any)?.warnColor ? (design as any).warnColor : "#faad14",
            "--pt-err-color": !!(design as any)?.errColor ? (design as any).errColor : "#FF4D68",
        }

        style.type = "text/css"
        // Object.assign(button.style, style);
        style.innerHTML = `.custom-design {${styleToString(a)}}`;
    }

    if (!waiterInfo) {
        return (
            <Layout>
                <Layout.Content
                    style={{ minHeight: "100vh", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Spin size={"large"}/>
                </Layout.Content>
            </Layout>
        );
    } else if (waiterInfo.isTeam) {
        return (
            <Layout>
                <Layout.Content style={{ minHeight: "100vh", height: "100%", }} className={"tip-view"}>
                    <TeamTipView waiterInfo={waiterInfo}/>
                </Layout.Content>
            </Layout>
        );
    } else {
        return (
            <Layout>
                <Layout.Content style={{ minHeight: "100vh", height: "100%", }} className={"tip-view custom-design"}>
                    <UserTipView waiterInfo={waiterInfo}/>
                </Layout.Content>
            </Layout>
        );
    }
};

function styleToString(style: any) {
    return Object.keys(style).reduce((acc, key) => (
        acc + key.split(/(?=[A-Z])/).join("-").toLowerCase() + ":" + style[key] + ";"
    ), "");
}


function shadeColor(color: any, percent: any) {

    var R: any = parseInt(color.substring(1, 3), 16);
    var G: any = parseInt(color.substring(3, 5), 16);
    var B: any = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100 as any);
    G = parseInt(G * (100 + percent) / 100 as any);
    B = parseInt(B * (100 + percent) / 100 as any);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}


export default TipView;
