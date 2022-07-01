import React, {FC} from "react";
import {WaiterInfoNarrow} from "src/models/application/waiter"
import {LogoBright, LogoDark} from "src/components/icons"
import NewOfferPDF from "/src/assets/pdf/new_offer.pdf"
import PaymentSecurityPolicyPDF from "/src/assets/pdf/payment_security_policy.pdf"
import PersonalDataPDF from "/src/assets/pdf/personal_data.pdf"
import TerrorPDF from "/src/assets/pdf/terror.pdf"

interface Props {
    waiterInfo: WaiterInfoNarrow
}

const UserTipView: FC<Props> = (props) => {
    return (
        <div className={""}>
            <div className="wrapper">
                <div className="header">
                    <div className="logo__wrapper">
                        <img src={LogoDark} className="premier logo"/>
                    </div>
                </div>
                <form className="payment-form ng-untouched ng-pristine ng-valid">
                    <div className="profile__wrapper">
                        <div className="profile__photo__wrapper">
                            <img
                                className="profile__photo" alt="A"
                                src="https://test.api.premiertips.org/api/avatars/a026f452e98145fa924d47c6db22ddb62b0813a7a6544812ff823e1da403c7cd.png"/>
                        </div>
                        <div className="profile">
                            <span className="profile__name">A</span>
                        </div>
                    </div>
                    <h4 className="star-rating__title">Вам все понравилось?</h4>
                    {/*<ngb-rating role="slider" formcontrolname="rating"*/}
                    {/*            className="d-inline-flex star-rating ng-untouched ng-pristine ng-valid" ng-reflect-name="rating"*/}
                    {/*            tabindex="0" aria-valuemax="5" aria-valuenow="0" aria-valuetext="0 out of 5"><span*/}
                    {/*    className="sr-only">( )</span><span style="cursor: pointer;"><span className="star">★</span></span><span*/}
                    {/*    className="sr-only">( )</span><span style="cursor: pointer;"><span className="star">★</span></span><span*/}
                    {/*    className="sr-only">( )</span><span style="cursor: pointer;"><span className="star">★</span></span><span*/}
                    {/*    className="sr-only">( )</span><span style="cursor: pointer;"><span className="star">★</span></span><span*/}
                    {/*    className="sr-only">( )</span><span style="cursor: pointer;"><span className="star">★</span></span>*/}
                    {/*</ngb-rating>*/}
                    <div className="fl-divide"></div>
                    <div className="fl-divide"></div>
                    <div className="payment ng-untouched ng-pristine ng-valid">
                        <label className="payment__label">Сумма</label>
                        <input type="number" placeholder="100" className="payment__amount ng-untouched ng-pristine ng-valid"/>
                        <span className="currency">₽</span>
                    </div>
                    <div className="shortcuts">
                        <div className="sum-button_wrapper">
                            <div className="sum-button disabled"><span
                                className="sum-button__amount shortcut__rub">100&thinsp;</span>
                            </div>
                        </div>
                        <div className="sum-button_wrapper">
                            <div className="sum-button enabled"><span
                                className="sum-button__amount shortcut__rub">300&thinsp;</span>
                            </div>
                        </div>
                        <div className="sum-button_wrapper">
                            <div className="sum-button disabled"><span
                                className="sum-button__amount shortcut__rub">500&thinsp;</span>
                            </div>
                        </div>
                        <div className="sum-button_wrapper">
                            <div className="sum-button disabled"><span
                                className="sum-button__amount shortcut__rub">800&thinsp;</span>
                            </div>
                        </div>
                    </div>
                    <div className="fl-divide"></div>
                    <div className="payment-warn__container">
                        <span className="material-icons">priority_high</span>
                        <div className="payment-warn">
                            Оплата через Apple Pay в России недоступна для карт VISA и
                            Mastercard. Вы можете воспользоваться быстрым способом оплаты через Yandex Pay
                        </div>
                    </div>
                    <div className="fl-divide"></div>
                    <button className="submit-button">Оплатить</button>
                    {/*<mat-checkbox className="mat-checkbox commission_agree mat-accent mat-checkbox-checked"*/}
                    {/*              ng-reflect-checked="true" id="mat-checkbox-1"><label className="mat-checkbox-layout"*/}
                    {/*                                                                   htmlFor="mat-checkbox-1-input"><span*/}
                    {/*    className="mat-checkbox-inner-container"><input type="checkbox" className="mat-checkbox-input cdk-visually-hidden"*/}
                    {/*                                                    id="mat-checkbox-1-input" tabIndex="0" aria-checked="true"><span*/}
                    {/*    matripple="" className="mat-ripple mat-checkbox-ripple mat-focus-indicator"*/}
                    {/*    ng-reflect-trigger="[object HTMLLabelElement]" ng-reflect-disabled="false" ng-reflect-radius="20"*/}
                    {/*    ng-reflect-centered="true" ng-reflect-animation="[object Object]"><span*/}
                    {/*    className="mat-ripple-element mat-checkbox-persistent-ripple"></span></span><span*/}
                    {/*    className="mat-checkbox-frame"></span><span className="mat-checkbox-background"><svg version="1.1" focusable="false" viewBox="0 0 24 24" xml:space="preserve" className="mat-checkbox-checkmark"><path fill="none" stroke="white" d="M4.1,12.7 9,17.6 20.3,6.3" className="mat-checkbox-checkmark-path"></path></svg><span*/}
                    {/*    className="mat-checkbox-mixedmark"></span></span></span><span className="mat-checkbox-label"><span*/}
                    {/*    style="display: none;">&nbsp;</span>Я хочу взять на себя транзакционные издержки, чтобы сотрудник получил полную сумму</span></label>*/}
                    {/*</mat-checkbox>*/}

                    <p className="pp_agree">
                        Нажимая на кнопку «Оплатить», вы соглашаетесь с
                        <a href={NewOfferPDF} title="Условия оферты">условиями оферты</a>
                        <span>, </span>
                        <a href={PaymentSecurityPolicyPDF} title="Политика безопасности платежей">
                            политикой безопасности платежей
                        </a>
                        <span>, </span>
                        <a href={PersonalDataPDF} title="Согласие на обработку персональных данных">
                            согласием на обработку персональных данных
                        </a>
                        <span>, </span>
                        <a href={TerrorPDF} title="Противодействие терроризму">
                            противодействием терроризму
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default UserTipView;
