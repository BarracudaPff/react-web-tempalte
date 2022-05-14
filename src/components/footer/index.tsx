import React, {FC} from "react"
import "./style.scss"
import {Col, Layout, Row, Typography} from "antd"
import {LogoGrey} from "src/components/icons"

const Footer: FC = () => {
    return (
        <Layout.Footer className={"ld-ft"}>
            <Row gutter={[16, 16]}>
                <Col className={"legal-info-wrapper"}>
                    <div className={"legal-logo"}>
                        <LogoGrey/>
                    </div>
                    <div className={"legal-info"}>
                        <Typography.Paragraph className={"legal-cell"}>
                            Copyright 2021 Общество с ограниченной ответственностью "Премьер типс"
                        </Typography.Paragraph>
                        <Typography.Paragraph className={"legal-cell"}>
                            ОГРН: 1217800074678
                        </Typography.Paragraph>
                        <Typography.Paragraph className={"legal-cell"}>
                            ИНН/КПП: 7842192225
                        </Typography.Paragraph>
                        <Typography.Paragraph className={"legal-cell"}>
                            Техническая поддержка:support@premiertips.org
                        </Typography.Paragraph>
                        <Typography.Paragraph className={"legal-cell"}>
                            Подключение и сотрудничество: integrations@premiertips.org
                        </Typography.Paragraph>
                        <Typography.Paragraph className={"legal-cell"}>
                            Контактный телефон: +7 (999) 523-83-83
                        </Typography.Paragraph>
                    </div>
                </Col>
                <Col flex={"auto"} className={"legal-info-nav"}>
                    <ul className={"f-catalog"}>
                        <li className={"f-catalog__item"}>
                            <h2 className={"f-catalog__item-title"}>Навигация</h2>
                            <ul className={"f-catalog-links"}>
                                <li className={"f-catalog-links__item"}>Главная</li>
                                <li className={"f-catalog-links__item"}>Контакты</li>
                                <li className={"f-catalog-links__item"}>Презентация</li>
                                <li className={"f-catalog-links__item"}>Коммерческое предложение</li>
                            </ul>
                        </li>
                        <li className={"f-catalog__item"}>
                            <h2 className={"f-catalog__item-title"}>Документы</h2>
                            <ul className={"f-catalog-links"}>
                                <li className={"f-catalog-links__item"}>Оферта</li>
                                <li className={"f-catalog-links__item"}>Согласие на обработку персональных данных</li>
                                <li className={"f-catalog-links__item"}>Противодействие терроризму</li>
                                <li className={"f-catalog-links__item"}>Безопасность платежей</li>
                            </ul>
                        </li>
                    </ul>
                    {/*    <div className={"ul-inline-big"} >*/}
                    {/*        <ul className={"ul-inline"}>*/}
                    {/*            <li className={"ft-text"}>Главная</li>*/}
                    {/*            <li className={"ft-text"}>Контакты</li>*/}
                    {/*            <li className={"ft-text"}>Презентация</li>*/}
                    {/*            <li className={"ft-text"}>Коммерчсекое предложение</li>*/}
                    {/*        </ul>*/}
                    {/*        <ul className={"ul-inline"}>*/}
                    {/*            <li className={"ft-text ft-reg"}>Регистрация</li>*/}
                    {/*            <li className={"ft-text ft-auth"}>Войти</li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*    <ul className={"ul-inline"} >*/}
                    {/*        <li className={"ft-text"}>Оферта</li>*/}
                    {/*        <li className={"ft-text"}>Согласие на обработку персональных данных</li>*/}
                    {/*        <li className={"ft-text"}>Противодействие терроризму</li>*/}
                    {/*        <li className={"ft-text"}>Безопасность платежей</li>*/}
                    {/*    </ul>*/}
                </Col>
            </Row>
        </Layout.Footer>
    )
}

export default Footer
