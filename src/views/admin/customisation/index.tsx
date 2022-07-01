import React, {FC, useEffect} from "react";
import {Button, Checkbox, Form, Input, InputNumber, Select, Typography, Upload} from "antd"
import SubAdminHeader from "src/components/header/sub-admin"
import {useDispatch, useSelector} from "src/redu/store"
import {useSearchParam} from "src/utils/hooks"
import {NumberParam} from "serialize-query-params"
import notification from "src/utils/notification"
import {RestService} from "src/services/RestService"
import {RestField} from "src/services/api/ApiService"
import {addAllRest} from "src/redu/actions/rest"
import {RestaurantDesign} from "src/models/application/design"
import {SketchPicker, ColorResult} from "react-color"
import ImgCrop from "antd-img-crop"
import {UploadFile} from "antd/es/upload/interface"
import {RcFile} from "antd/lib/upload"
import {Color, Int} from "src/models/types/primitive"
import {Nullable} from "src/models/types/utility"
import Config from "src/config"
import {randomBool, randomColor, randomEmail, randomInt, randomNoun, randomVerb} from "src/utils"
import {UserI} from "src/models/domain"
import {designImg, img} from "src/services/Endpoints"

interface Props {
}

const AdminCustomisationView: FC<Props> = (props) => {
    const [form] = Form.useForm<RestaurantDesign & { files?: UploadFile[], ucp: boolean }>()
    const rests = useSelector(it => it.rest.data)

    const files = Form.useWatch("files", form)
    const ucp = Form.useWatch("ucp", form)

    const [rest, setRest] = useSearchParam("rest", NumberParam);
    const dispatch = useDispatch()

    const colFrom = (val: Color) => (val as unknown as ColorResult).hex ?? val

    const fillData = () => {
        if (!rest) return

        form.setFieldsValue({
            restaurantId: rest,
            hideOurLogo: randomBool()!!,
            bgGrad: [randomColor(), randomColor()],
            fgGrad: [randomColor(), randomColor()],
            accents: [randomColor(), randomColor(), randomColor()],
            commentFrame: [randomColor(), randomColor()],
            // bigLogo: data.bigLogo!!,
            // texture: data.texture!!,
            // smallLogo: data.smallLogo!!,
            additionalFields: {
                additionalColors: {
                    fontColor: randomColor(),
                    starColor: randomColor(),
                    fontColorPicked: randomColor(),
                    starColorPicked: randomColor(),
                    buttonDisabledBackgroundColor: randomColor(),
                    paymentButton_fg: randomColor(),
                    paymentButton_bg: randomColor(),
                    shadow: randomColor(),
                    showBorder: randomBool(),

                    warnColor: randomColor(),
                    errColor: randomColor(),
                },
                amounts: [randomInt(), randomInt(), randomInt(), randomInt()],
                percentages: [randomInt(100), randomInt(100), randomInt(100), randomInt(100)],
                customPlaceholder: randomVerb() + " " + randomNoun(),
            },
        })
    }

    const updateDesign = () => {
        //files
        const data = form.getFieldsValue()
        console.log(data)

        if (!rest) return

        RestService.updateDesign(rest, {
            restaurantId: data.restaurantId,
            hideOurLogo: data.hideOurLogo!!,
            bgGrad: (data.bgGrad as unknown as ColorResult[]).map(it => it.hex ?? it) as [Color, Color],
            fgGrad: (data.fgGrad as unknown as ColorResult[]).map(it => it.hex ?? it) as [Color, Color],
            accents: (data.accents as unknown as ColorResult[]).map(it => it.hex ?? it)!! as [Color, Color, Color],
            commentFrame: (data.commentFrame as unknown as ColorResult[]).map(it => it.hex ?? it)!! as [Color, Color],
            bigLogo: data.files?.length ? (data.files[0].originFileObj as File as unknown as string) : undefined,
            texture: data.texture!!,
            smallLogo: data.smallLogo!!,
            additionalFields: {
                additionalColors: {
                    fontColor: colFrom(data.additionalFields.additionalColors.fontColor),
                    starColor: colFrom(data.additionalFields.additionalColors.starColor),
                    fontColorPicked: colFrom(data.additionalFields.additionalColors.fontColorPicked),
                    starColorPicked: colFrom(data.additionalFields.additionalColors.starColorPicked),
                    buttonDisabledBackgroundColor: colFrom(data.additionalFields.additionalColors.buttonDisabledBackgroundColor),
                    paymentButton_fg: colFrom(data.additionalFields.additionalColors.paymentButton_fg),
                    paymentButton_bg: colFrom(data.additionalFields.additionalColors.paymentButton_bg),
                    shadow: colFrom(data.additionalFields.additionalColors.shadow),
                    showBorder: data.additionalFields.additionalColors.showBorder,

                    warnColor: colFrom(data.additionalFields.additionalColors.warnColor),
                    errColor: colFrom(data.additionalFields.additionalColors.errColor),
                },
                amounts: data.additionalFields.amounts,
                percentages: data.additionalFields.percentages,
                customPlaceholder: data.additionalFields.customPlaceholder,
            },
        }).then(e => notification.success({ message: "Успешно обновлен дизайн" }))
            .catch(e => notification.error({ message: "Не получилось получить список команд" }, e))
    }

    useEffect(() => {
        if (!rests.length || !rest) return

        const init = rests.find(it => it.rest.id == rest)!!.rest.tipsDesign!!.toObj()

        form.resetFields()
        form.setFieldsValue({
            ...init,
            files: init.bigLogo ? [{
                uid: "-1",
                name: init.bigLogo,
                status: "done",
                url: designImg(init.bigLogo)!!,
            }] : [],
            ucp: false,
        })
    }, [rest, rests])

    useEffect(() => {
        if (rests.length) return

        RestService.listWithFieldsRest(undefined, [RestField.TEAMS, RestField.TIPS_DESIGN])
            .then(rests => dispatch(addAllRest(rests)))
            .catch(e => notification.error({ message: "Не получилось получить список ресторанов" }, e))
    }, [])

    const renderWithLabel = (label: string, children: React.ReactNode, style: any = { display: "" }) => (
        <div style={{ borderStyle: "solid", borderWidth: 2, borderColor: "cyan" }}>
            <div className="ant-form-item-label">
                <Typography.Title level={4}>{label}</Typography.Title>
            </div>
            <div style={style}>
                {children}
            </div>
        </div>
    )

    //TODO: merge with it's copy
    // noinspection DuplicatedCode
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };


    return (
        <>
            <SubAdminHeader title={"Кастомизация"}>
                {rests && <Select placeholder="Выберете ресторан" onChange={key => setRest(key)} value={rest}>
                    {rests.map(({ rest }) => <Select.Option key={rest.id} value={rest.id}>{rest.fullName}</Select.Option>)}
                </Select>}
            </SubAdminHeader>
            {rest && (
                <Form layout={"inline"} form={form} onFinish={updateDesign}>
                    <div>
                        <Form.Item name={"hideOurLogo"} label={"Спрятать лого Premier Tips"} valuePropName={"checked"}>
                            <Checkbox/>
                        </Form.Item>
                        <Form.Item name={"ucp"} label={"Добавить placeholder"} valuePropName={"checked"}>
                            <Checkbox/>
                        </Form.Item>
                        {ucp && <Form.Item name={["additionalFields", "customPlaceholder"]} label={"Placeholder"}>
                            <Input placeholder={"Введите placeholder"}/>
                        </Form.Item>}
                        <Form.Item name={["additionalFields", "additionalColors", "showBorder"]} label={"Отрисовать границу у кнопок"}
                                   valuePropName={"checked"}>
                            <Checkbox/>
                        </Form.Item>

                        <Form.Item name={"files"} label={"Большое лого"} valuePropName="fileList">
                            <ImgCrop rotate>
                                <Upload
                                    listType="picture-card"
                                    onChange={({ fileList }) => form.setFieldsValue({ files: fileList })}
                                    onPreview={onPreview}
                                    fileList={files}
                                    maxCount={1}
                                    customRequest={(req) => req.onSuccess && req.onSuccess("OK")}>
                                    {!files?.length && "Загрузить"}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>

                        <Button block type={"primary"} htmlType={"submit"}>Обновить</Button>
                        {Config.isDevelopment && <Button block type={"dashed"} onClick={fillData}>Fill data</Button>}
                    </div>
                    <div style={{ margin: 4 }}>
                        <Typography.Title level={4}>Быстрые цены</Typography.Title>
                        {/*TODO: make expandable*/}
                        <Form.List name={["additionalFields", "amounts"]}>
                            {fields => (
                                fields.map(field => (
                                    <Form.Item {...field}>
                                        <InputNumber/>
                                    </Form.Item>
                                ))
                            )}
                        </Form.List>
                    </div>
                    <div style={{ margin: 4 }}>
                        <Typography.Title level={4}>Проценты</Typography.Title>
                        {/*TODO: make expandable*/}
                        <Form.List name={["additionalFields", "percentages"]}>
                            {fields => (
                                fields.map(field => (
                                    <Form.Item {...field}>
                                        <InputNumber/>
                                    </Form.Item>
                                ))
                            )}
                        </Form.List>
                    </div>
                    {renderWithLabel("Задний фон", (
                        <Form.List name={"bgGrad"}>
                            {fields => (
                                fields.map(field => (
                                    <Form.Item valuePropName={"color"} {...field}>
                                        <SketchPicker/>
                                    </Form.Item>
                                ))
                            )}
                        </Form.List>
                    ))}
                    {renderWithLabel("Передний фон", (
                        <Form.List name={"fgGrad"}>
                            {fields => (
                                fields.map(field => (
                                    <Form.Item valuePropName={"color"} {...field}>
                                        <SketchPicker/>
                                    </Form.Item>
                                ))
                            )}
                        </Form.List>
                    ))}

                    {renderWithLabel("Акцентные, важные цвета", (
                        <>
                            <Form.List name={"accents"}>
                                {fields => (
                                    fields.map((field, i) => {
                                        if (i == 2) return

                                        return (
                                            <Form.Item label={i == 0
                                                ? "Активная кнопка"
                                                : "Цвет шрифта активной кнопки"
                                            } valuePropName={"color"} {...field}>
                                                <SketchPicker/>
                                            </Form.Item>
                                        )
                                    })
                                )}
                            </Form.List>
                            <Form.Item name={["additionalFields", "additionalColors", "buttonDisabledBackgroundColor"]}
                                       label={"Не активная кнопка"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                            <Form.Item name={["additionalFields", "additionalColors", "fontColorPicked"]}
                                       label={"Цвет шрифта не активной кнопки"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                            <Form.Item name={["additionalFields", "additionalColors", "fontColor"]} label={"Основной цвет шрифта"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                        </>
                    ))}
                    {renderWithLabel("Цвета для рамки", (
                        <Form.List name={"commentFrame"}>
                            {fields => (
                                fields.map((field, i) => (
                                    <Form.Item label={i == 0
                                        ? "Цвет поля"
                                        : "Цвет плейсхолдера"
                                    } valuePropName={"color"} {...field}>
                                        <SketchPicker/>
                                    </Form.Item>
                                ))
                            )}
                        </Form.List>
                    ))}
                    {renderWithLabel("Цвета для предупреждения об оплате", (
                        <>
                            <Form.Item name={["additionalFields", "additionalColors", "warnColor"]} label={"Цвет шрифта и рамки"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                            <Form.Item name={["additionalFields", "additionalColors", "errColor"]} label={"Цвет вопросительного знака"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                        </>
                    ))}
                    {renderWithLabel("Цвета для кнопки оплаты", (
                        <>
                            <Form.Item name={["additionalFields", "additionalColors", "paymentButton_bg"]} label={"Цвет задней кнопки"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                            <Form.Item name={["additionalFields", "additionalColors", "paymentButton_fg"]} label={"Цвет шрифта"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                            <Form.Item name={["additionalFields", "additionalColors", "shadow"]} label={"Цвет тени"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                        </>
                    ))}
                    {renderWithLabel("Дополнительные цвета", (
                        <>
                            <Form.List name={"accents"}>
                                {fields => (
                                    fields.map((field, i) => {
                                        if (i != 2) return
                                        return (
                                            <Form.Item label={"Цвет рамки (для аватара)"} valuePropName={"color"} {...field}>
                                                <SketchPicker/>
                                            </Form.Item>
                                        )
                                    })
                                )}
                            </Form.List>
                            <Form.Item name={["additionalFields", "additionalColors", "starColor"]} label={"Цвет звезд (не активных)"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                            <Form.Item name={["additionalFields", "additionalColors", "starColorPicked"]} label={"Цвет звезд (активных)"}
                                       valuePropName={"color"}>
                                <SketchPicker/>
                            </Form.Item>
                        </>
                    ))}

                    {/*<Form.Item name={"bgGrad"} label={""} valuePropName={"color"}>*/}
                    {/*    <SketchPicker presetColors={['#1890ff', '#25b864', '#ff6f00']}/>*/}
                    {/*</Form.Item>*/}
                </Form>
            )}
        </>
    );
};

export default AdminCustomisationView;
