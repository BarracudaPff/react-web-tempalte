import React, {FC, useEffect, useRef, useState} from "react"
import "./style.scss"
import {Button, Carousel, Col, Divider, Form, Input, Row, Space, Typography} from "antd"
import img from "src/assets/img/landing/img.png"
import us from "src/assets/img/landing/us.png"
import condImg1 from "src/assets/img/landing/conditions-1.png"
import condImg2 from "src/assets/img/landing/conditions-2.png"
import partner0 from "src/assets/img/landing/partners/img.png"
import partner1 from "src/assets/img/landing/partners/img_1.png"
import partner2 from "src/assets/img/landing/partners/img_2.png"
import partner3 from "src/assets/img/landing/partners/img_3.png"
import partner4 from "src/assets/img/landing/partners/img_4.png"
import partner5 from "src/assets/img/landing/partners/img_5.png"
import {
    ArrowShortRight,
    ArrowWideLeft,
    ArrowWideRight,
    ChevronCircleDown,
    ChevronCircleRight,
    Circuit,
    LogoBright,
    Objective,
    PromoIcLd1,
    PromoIcLd2,
    PromoIcLd3,
    PromoIcLd4,
    Smartphone
} from "src/components/icons"
import {CarouselRef} from "antd/es/carousel"
import Config from "src/config"
import {Link, useLocation} from "react-router-dom"
import {removePrefix} from "src/utils"
import {useWindowSize} from "src/utils/hooks"

const partners = [
    partner0, partner1, partner2, partner3, partner4, partner5,
    partner0, partner1, partner2, partner3, partner4, partner5,
]

const LandingView: FC = () => {
    const carouselRef = useRef<CarouselRef>(null)
    const [slide, setSlide] = useState(0)
    const { pathname, search, hash } = useLocation()
    const { width } = useWindowSize()

    const scrollTo = (id: string) => () => {
        if (id.length > 0 && id[0] == "#") {
            const element = document.getElementById(removePrefix(id, "#"))
            if (element) {
                window.scrollTo({ top: element.offsetTop, left: element.offsetLeft, behavior: "smooth" })
            } else {
                console.error(`Can't find element with id ${id}`)
            }
        }
    }
    useEffect(scrollTo(hash), [hash])
    const left = () => carouselRef?.current?.prev()
    const right = () => carouselRef?.current?.next()

    const slidesToShow = Math.min(Math.ceil((width - 30) / 300), 6)
    // const slidesToShow = Math.min(Math.min(Math.ceil((width - 30) / 300), 3), 6)

    const a = () => {
        console.log("1")
    }

    return (
        <div className={"landing"}>
            <section id={"main"} className={"sec-full"} style={{ position: "relative" }}>
                <Row style={{ height: "100%" }} className={"ld-page-full"}>
                    <Col xs={24} md={14} style={{ backgroundColor: "black" }}>
                    </Col>
                    <Col xs={0} md={10} style={{ backgroundColor: "white" }}>
                    </Col>
                </Row>
                <Row className={"main-sec-tit"} justify={"center"}>
                    <Col xs={24} md={12} lg={13} xl={14} className={"main-sec-data"}>
                        <Typography.Text className={"h"}>
                            🦁 ПРЕМЬЕР ТИПС
                        </Typography.Text>
                        <div>
                            <Typography.Text className={"t"}>
                                Компания,<br/>меняющая<br/>будущее!
                            </Typography.Text>
                            <Typography.Text className={"f"}>
                                Чаевые - это очень просто ™
                            </Typography.Text>
                        </div>
                        <div>
                            <Typography.Text className={"ff"} style={{ marginRight: 10 }}>
                                Скачать презентацию
                            </Typography.Text>
                            <ChevronCircleDown/>
                        </div>
                    </Col>
                    <Col xs={24} sm={18} md={12} lg={11} xl={10} className={"r-block-wrapper"}>
                        <Form layout={"vertical"} className={"promo-form-top"}>
                            <Space direction={"vertical"} size={30}>
                                <Typography.Title style={{ marginBottom: 0 }}>
                                    Оставить заявку
                                </Typography.Title>
                                <Space direction={"vertical"} size={20} className={"block-w"}>
                                    <Form.Item noStyle>
                                        <Input placeholder={"Компания"} className={"block-w"}/>
                                    </Form.Item>
                                    <Form.Item noStyle>
                                        <Input placeholder={"ИНН"} className={"block-w"}/>
                                    </Form.Item>
                                    <Form.Item noStyle>
                                        <Input placeholder={"Номер телефона"} className={"block-w"}/>
                                    </Form.Item>
                                    <Form.Item noStyle>
                                        <Input placeholder={"Почта"} className={"block-w"}/>
                                    </Form.Item>
                                </Space>
                                <Button type={"primary"} htmlType={"submit"}>Оставить</Button>
                                <Typography.Text style={{ display: "block" }}>
                                    Support: <a href={"mailto:support@premiertips.org"}>support@premiertips.org</a>
                                </Typography.Text>
                            </Space>
                        </Form>
                        <div className={"r-block"}>
                            <div className={"promo-ic-1"}>
                                <PromoIcLd1/>
                            </div>
                            <div className={"promo-ic-2"}>
                                <PromoIcLd2/>
                            </div>
                            <div className={"promo-ic-3"}>
                                <PromoIcLd3/>
                            </div>
                            <div className={"promo-ic-4"}>
                                <PromoIcLd4/>
                            </div>
                        </div>
                        <div className={"promo-img"}>
                            <img src={img} alt=""/>
                        </div>
                    </Col>
                </Row>
            </section>
            <section id={"us"} className={"sec-semi sec-mob-mt sec-mth"}>
                <Row justify={"space-between"} style={{ width: "100%" }} className={"sec-content"}>
                    <Col
                        xs={{ span: 16, order: 1 }}
                        sm={{ span: 16 }}
                        md={{ span: 10, order: 0 }}>
                        <img src={us} alt="" style={{ width: "100%" }}/>
                    </Col>
                    <Col
                        xs={{ span: 24, order: 0 }}
                        sm={{ span: 16 }}
                        md={{ span: 12, order: 1 }}
                        style={{ textAlign: "right" }}
                        className={"sec-content"}>
                        <div className={"us-logo-wrap sec-content"}>
                            <LogoBright/>
                        </div>
                        <Carousel
                            dots={false}
                            ref={carouselRef}
                            afterChange={setSlide}
                            autoplay={Config.uiDebug}
                            beforeChange={(cur, next) => setSlide(next)}>
                            <div className={"slide sec-content"}>
                                <Typography.Title className={"sec-title slide-title desktop-only"}>
                                    Кто мы? 🦁
                                </Typography.Title>
                                <Typography.Title className={"sec-title slide-title mobile-only"}>
                                    🦁 Кто мы?
                                </Typography.Title>
                                <Typography.Paragraph className={"sec-text slide-text"}>
                                    Простая и удобная платформа для приема чаевых!
                                    Законно. Просто. Безналично. Достаточно отсканировать QR-ĸод через камеру мобильного телефона или
                                    любое
                                    приложение, считывающее QR. Мотивируйте сотрудников и получайте честные отзывы гостей.
                                </Typography.Paragraph>
                            </div>
                            <div className={"slide sec-content"}>
                                <Typography.Title className={"sec-title slide-title"}>
                                    Как подключиться? 💳
                                </Typography.Title>
                                <Typography.Text className={"sec-text slide-text"}>
                                    Регистрация для юридических лиц происходит по запросу на сайте. Вы оставляете заявку, мы высылаем Вам
                                    логин и пароль. Вы вводите данные юридического лица, добавляете Ваших сотрудников или делаете единый
                                    QR-код на всех.
                                </Typography.Text>
                            </div>
                        </Carousel>
                        <Row justify={"end"} className={"slide-controls sec-content"}>
                            <div onClick={left} style={{ display: "inline-block" }}>
                                <ArrowWideLeft/>
                            </div>
                            <Typography.Text className={"car-control"}>{(slide + 1) + " / 2"}</Typography.Text>
                            <div onClick={right} style={{ display: "inline-block" }}>
                                <ArrowWideRight/>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </section>
            <Divider style={{ marginLeft: 0, marginRight: 0, marginBottom: 0 }} className={"sec-mth"}/>
            <section id={"product"} className={"sec-semi sec-mth"}>
                <div style={{ textAlign: "center" }}>
                    <Typography.Title className={"sec-title"}>
                        Безналичные чаевые для Вашего бизнеса 👾
                    </Typography.Title>
                    <Typography.Paragraph className={"sec-text"} style={{ marginTop: 40 }}>
                        IT решение, которое изменит Ваш бизнес. Мы предлагаем систему, способную оптимизировать финансовые процессы
                        сотрудников
                        Вашей компании. “Премьер Типс” - предовое техническое решение вместе с командой креативных экспертов.
                    </Typography.Paragraph>
                </div>
                <Row style={{ width: "100%", marginTop: 60 }} justify={"space-between"}>
                    <Col xs={{ span: 24, offset: 0 }} sm={8} md={{ span: 7, offset: 1 }} xl={{ span: 6, offset: 2 }} className={"t-type-card"}>
                        <Objective/>
                        <Typography.Paragraph className={"title"}>
                            Отели
                        </Typography.Paragraph>
                        <Typography.Text>
                            QR-код можно разместить на стикере (предмете интерьера, мебели).
                        </Typography.Text>
                        <div style={{ marginTop: "auto" }}>
                            <div className={"arrow"}>
                                <ArrowShortRight/>
                            </div>
                        </div>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} sm={8} md={{ span: 7, offset: 1 }} xl={{ span: 6, offset: 2 }}
                         className={"t-type-card t-type-card-active"}>
                        <Circuit/>
                        <Typography.Paragraph className={"title"}>
                            Рестораны
                        </Typography.Paragraph>
                        <Typography.Text className={"text"}>
                            NFC, интеграция в r_keeper, iiko или другое кассовое оборудование.
                        </Typography.Text>
                        <div style={{ marginTop: "auto" }}>
                            <div className={"arrow"}>
                                <ArrowShortRight/>
                            </div>
                        </div>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} sm={8} md={{ span: 7, offset: 1 }} xl={{ span: 6, offset: 2 }} className={"t-type-card"}>
                        <Smartphone/>
                        <Typography.Paragraph className={"title"}>
                            АЗС
                        </Typography.Paragraph>
                        <Typography.Text className={"text"}>
                            QR-код можно разместить на бензоколонке, стойке на кассе, двери.
                        </Typography.Text>
                        <Link to={"/"} style={{ marginTop: "auto" }}>
                            <div className={"arrow"}>
                                <ArrowShortRight/>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </section>
            <Divider style={{ marginLeft: 0, marginRight: 0, marginBottom: 0 }} className={"sec-mth"}/>
            <section id={"conditions"} className={"sec-semi sec-mth"}>
                <Row justify={"space-between"} className={"sec-content-wts"}>
                    <Col xs={{ span: 20, order: 1 }}
                        sm={{ span: 16 }}
                        md={{ span: 10, order: 0 }}
                         className={"sec-cond-img"}>
                        <img src={condImg2} alt="" style={{ width: 1000 / 11 + "%", opacity: 0.3 }}/>
                        <img src={condImg1} alt="" style={{ position: "absolute", width: 1000 / 11 + "%", left: 70, top: 70 }}/>
                    </Col>
                    <Col xs={{ span: 24, order: 0 }}
                        sm={{ span: 16 }}
                        md={{ span: 12, order: 1 }}
                        className={"sec-cond-content"}>
                        <div>
                            <Typography.Title className={"sec-title"}>
                                Наши условия 📄
                            </Typography.Title>
                            <Typography.Text className={"sec-text"}>
                                Нет фиксированной комиссии для Организации. Мы предлагаем самую низкую комиссию на рынке – от 2,5% до 10%.
                                Индивидуальные условия для каждого клиента. Индивидуальный подход. Пробный период с комиссией 0% составляет
                                14
                                дней.
                            </Typography.Text>
                        </div>
                        <div>
                            <Typography.Title className={"sec-title"}>
                                Благотворительность 🙏
                            </Typography.Title>
                            <Typography.Text className={"sec-text"}>
                                Мы готовы отчислять до 5% своей чистой прибыли в благотворительные фонды. Ваша Организация может выбрать
                                благотворительный фонд на свое усмотрение, и мы будем с ним сотрудничать.
                            </Typography.Text>
                        </div>
                        <div>
                            <Typography.Text className={"ff-bl"} style={{ marginRight: 10 }}>
                                Скачать презентацию
                            </Typography.Text>
                            <div className={"ff-ic"}>
                                <ChevronCircleRight/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
            <section id={"contacts"} className={"sec-semi sec-mth-70"}>
                <Row className={"t-type-card connect-block"} align={"middle"}>
                    <Col xs={24} md={22} lg={16}>
                        <Space direction={"vertical"} size={"large"}>
                            <Typography.Paragraph className={"title"} style={{ margin: 0 }}>
                                Вам осталось только подключиться 🤝
                            </Typography.Paragraph>
                            <Typography.Text className={"text"}>
                                В одно касание через ApplePay / GooglePay / ЯндексPay или с помощью карт VISA / MasterCard / Мир можно
                                оставить
                                чаевые в Вашем заведении.
                            </Typography.Text>
                            <Form layout={"inline"} className={"ant-col-14 promo-form"}>
                                <Form.Item style={{ flex: 1 }}>
                                    <Input placeholder={"Почта или номер телефона"} className={"ld-input-promo"}/>
                                </Form.Item>
                                <Button type={"primary"} htmlType={"submit"} className={"ld-but-primary"}>Подключиться</Button>
                            </Form>

                            <Typography.Text className={"text meta mobile-high-only"}>
                                Вся представленная на сайте информация, касающаяся технических характеристик, условий подключения и
                                благотворительности, носит информационный характер и ни при каких условиях не является публичной офертой,
                                определяемой положениями Статьи 437.2 Гражданского кодекса РФ.
                            </Typography.Text>
                        </Space>
                    </Col>
                    <div className={"tc-tl mobile-high-only"}/>
                    <div className={"tc-br mobile-high-only"}/>
                </Row>
            </section>
            <section id={"partners"} className={"sec-semi ld-page-full sec-mth car-partners__wrappers"}>
                <Row className={"t-type-card"} style={{ padding: 0 }} align={"middle"}>
                    <Typography.Paragraph className={"title"} style={{ margin: 0, textAlign: "center" }}>
                        Вам осталось только подключиться 🤝
                    </Typography.Paragraph>
                </Row>
                <div className={"car-partners-wrapper"}>
                    {width && <Carousel
                        dots={false}
                        infinite
                        autoplay
                        swipe={false}
                        // accessibility={false}
                        // speed={1000}
                        slidesToShow={slidesToShow}
                        slidesToScroll={1}
                        className={"car-partners"}>
                        {partners.map((it, index) => (
                            <div key={index} className={"slide"}>
                                <img src={it} alt=""/>
                            </div>
                        ))}
                    </Carousel>}
                    <div className={"car-partners-blur mobile-high-only"}/>
                </div>
            </section>
            <div className={"sec-mth"}/>
        </div>
    )
}

export default LandingView
