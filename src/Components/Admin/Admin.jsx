import { useState } from "react";
import "./Admin.css";
import {
    Menu
} from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import {FormCreateProduct} from "./FormCreateProduct"
import {ModifyUser} from "./ModifyUser"
import { Input, Space } from 'antd';


const { Search } = Input;


function getItem(label, key, icon, children, type) {

    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Dashboard', null, <MailOutlined />, [
        getItem('Analytics finance', '1'),
    ]),

    getItem('Articles', 'sub2', <AppstoreOutlined />, [
        getItem('New Product', '1'),
        getItem('Modify User', '2'),
        getItem('Modify Games', '3'),
        getItem('List Products', '4'),
        getItem('See Payments ', '5'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ])

];

const rootSubmenuKeys = ["sub1", "sub2", "sub3"];


function Admin() {

    const [openKeys, setOpenKeys] = useState(["sub1"]);
    const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    };

    const [theme, setTheme] = useState('ligth');
    const [current, setCurrent] = useState('1');
    const [state, setState] = useState("");


    const onClick = (e) => {

        console.log('click ', e);
        setCurrent(e.key);

        if (e.key === "1") {
            setState("crear-juego");
        }

        if (e.key === "2") {
            setState("modify-user");
        }

        if (e.key === "3") {
            setState("modify-games");
        }

        if (e.key === "4") {
            setState("list-products");
        }

        if (e.key === "5") {
            setState("see-payments");
        }

    };

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };


    if (true) {

        return (

        <div className="admin-component">

            <div className="userInfoContainer">

                    <div className="menuOptions">

                        <br />
                        <br />
                        <Menu
                            mode="inline"
                            onClick={onClick}
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            style={{
                                width: 256,
                            }}
                            items={items}
                        />
                    </div>

               

                {state === "crear-juego" ?

                    <div><FormCreateProduct/></div>
                    :
                    <div></div>

                }
                {state === "modify-user" ?

                    <div className="searchUserListContainer">
                         <Search 
                         className="buttonSearch"
                         placeholder="Search user" onSearch="" enterButton 
                         enterButtonStyle={{ background: 'rgba(9, 22, 29, 0.712)' }} 
                         style={{ width: 300}}/> 
                        <ModifyUser
                        />

                    </div>  

                        :

                        <div></div> 


                }

                {state === "modify-games" ?

                    <div></div>

                    :

                    <div></div>

                }

                {state === "list-products" ?

                    <div>Form Modify List Products</div>

                    :

                    <div></div>

                }

                {state === "see-payments" ?

                    <div>Form Modify See Payments</div>

                    :

                    <div></div>

                }

            </div>

            </div>

        );

    }

};

export default Admin;
