import { Button, Dropdown, Image, Input, Menu, Modal, Spin } from "antd";
import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, filterProducts, getAllProducts, searchProducts } from "../store/actions/auth";
import { DownOutlined, DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import '../assets/scss/home.scss';
import '../assets/scss/responsive.scss';

const FormInput = lazy(() => import("../components/form"));

const Home = () => {
    const dispatch = useDispatch()
    const { Search } = Input
    const { confirm } = Modal
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("")
    const [show, setShow] = useState(false)
    const [saveId, setSaveId] = useState("")
    const { isLoading, products } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    //--------------------------Searching Function----------------------
    const onSearch = (name) => {
        setLoading(true)
        dispatch(searchProducts(name))
        setLoading(isLoading)
    };

    //---------------------------Filter Function-------------------------
    const filter = (
        <Menu>
            <Menu.Item key="1" onClick={() => dispatch(filterProducts(true))}>
                Aktif
            </Menu.Item>
            <Menu.Item key="2" onClick={() => dispatch(filterProducts(false))}>
                Non Aktif
            </Menu.Item>
        </Menu>
    );

    // --------------------------Modal Confirm------------------------
    const delProduct = (id) => {
        confirm({
            title: 'Apakah anda yakin ingin menghapus?',
            icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
            content: '',
            async onOk() {
                await dispatch(deleteProducts(id))
                dispatch(getAllProducts())
            },
            onCancel() {
                console.log('Cancel delete')
            },
        })
    }

    // --------------------------Show Modal Add/Edit------------------------
    const showModalAdd = () => {
        setType("add")
        setShow(true)
    };
    const showModalEdit = (id) => {
        setType("edit")
        setSaveId(id)
        setShow(true)
    };
    const closeModal = () => {
        setShow(false)
    };
    const onCloseChange = (val) => {
        setShow(false)
    }

    const status = (item) => {
        if (item.isActive) {
            return <p className="active-status">Aktif</p>
        } else {
            return <p className="nonactive-status">Non Aktif</p>
        }
    }

    return (
        <>
            <div className="container">
                <div className="action-wrapper">
                    <Search placeholder="search name"
                        onSearch={(name) => onSearch(name)}
                        className="searching"
                        loading={loading}
                    />
                    <div className="right-main-action">
                        <Dropdown overlay={filter} trigger={['click']}>
                            <Button className="secondary">
                                Filter <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Button className="primary" onClick={showModalAdd}>+ Add</Button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="table">
                        <thead className="table-head">
                            <tr>
                                <th>Picture</th>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Time Expire</th>
                                <th>QTY</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ?
                                <tr>
                                    <td colSpan="7">
                                        <Spin tip="Loading..." size="large"
                                            style={{ width: '100%', padding: '15px 0', color: 'black' }}
                                        />
                                    </td>
                                </tr>
                                :
                                <>
                                    {products.map((item, i) => (
                                        <tr key={i} className="row-base-data">
                                            <td>
                                                <div className="base-image">
                                                    <Image
                                                        width={100}
                                                        src={item.picture}
                                                        className="images"
                                                    />
                                                </div>
                                            </td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.expiredAt.slice(0, 10)}</td>
                                            <td>{item.qty}</td>
                                            <td>{status(item)}</td>
                                            <td>
                                                <div className="base-table-action">
                                                    <Button
                                                        type="primary"
                                                        danger
                                                        onClick={() => delProduct(item.id)}
                                                        loading={loading}
                                                    >
                                                        <DeleteOutlined /> Delete
                                                    </Button>
                                                    <Button className="primary" onClick={() => showModalEdit(item.id)}>
                                                        <EditOutlined /> Update
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <Suspense fallback={<div>loading...</div>}>
                <Modal
                    title={type === "add" ? "Tambah Product" : "Edit Product"}
                    visible={show}
                    onCancel={closeModal}
                    footer={[]}
                >
                    <FormInput id={saveId} type={type} closeChange={onCloseChange} />
                </Modal>
            </Suspense>

        </>
    )
}

export default Home;