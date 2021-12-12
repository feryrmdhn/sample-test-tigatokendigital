import { useEffect, useState } from "react";
import { Form, Button, Input, Checkbox, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addDataProducts, getAllProducts, getDetailProduct, updateDataProducts } from "../../store/actions/auth";
import moment from 'moment';

import '../../assets/scss/form.scss';

const FormInput = ({ id, type, closeChange }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [picture, setPicture] = useState([])
    const [expiredAt, setExpiredAt] = useState("")
    const { isLoading, productDetail } = useSelector((state) => state.auth)

    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 0,
            span: 0,
        },
    };
    const changeDate = (date, dateString) => {
        // date as default param
        setExpiredAt(dateString)
    }

    useEffect(() => {
        if (type !== "add") dispatch(getDetailProduct(id))
    }, [dispatch, type, id])

    useEffect(() => {
        if (type !== "add") {
            form.setFieldsValue({
                name: productDetail.name,
                qty: productDetail.qty,
                expire: moment(productDetail.expiredAt),
                isActive: productDetail.isActive
            })
            setPicture(productDetail.picture)
            setExpiredAt(productDetail.expiredAt)
        } else {
            form.setFieldsValue({
                name: null,
                qty: null,
                expire: null,
                isActive: true
            })
            setPicture([])
        }
    }, [type, form, productDetail])

    //---------------------Convert Img to base64 Function---------------------
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    //-------------------onChange image base64-------------------------------
    const onChangeImage = async (e) => {
        const fileList = e.target.files[0];
        const base64 = await convertBase64(fileList)
        setPicture(base64)
    }

    //-------------------------Submit Add/Edit Data--------------------------
    const onFinish = async (values) => {
        let data = { ...values, picture, expiredAt }
        setLoading(true)
        if (type === "add") {
            await dispatch(addDataProducts(data))
            form.resetFields()
            setPicture([])
            setExpiredAt("")
        } else {
            await dispatch(updateDataProducts(id, data))
            closeChange(false)
        }
        setLoading(isLoading)
        dispatch(getAllProducts())
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const onClose = () => {
        form.resetFields();
    };

    return (
        <>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                initialValues={{
                    isActive: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Pilih nama terlebih dahulu!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="qty"
                    label="Qty"
                    rules={[
                        {
                            required: true,
                            message: "Masukkan qty terlebih dahulu!",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    name="expire"
                    label="Expire"
                    rules={[
                        {
                            required: true,
                            message: "Pilih tgl expire terlebih dahulu!",
                        },
                    ]}
                >
                    <DatePicker style={{ width: '100%' }} onChange={changeDate} placeholder="" />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Picture"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input type="file" onChange={onChangeImage} />
                </Form.Item>

                <div style={{ marginLeft: '20px' }}>
                    <Form.Item
                        {...tailLayout}
                        name="isActive"
                        valuePropName="checked"
                    >
                        <Checkbox>Status</Checkbox>
                    </Form.Item>
                </div>

                <Form.Item {...tailLayout} style={{ marginBottom: '0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button style={{ width: '40%' }} htmlType="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            style={{ width: '40%', marginBottom: "10px", background: '#46aa97', borderColor: '#46aa97' }}
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default FormInput;
