/*
 * Description
 * Author Chad-Chen
 */
// js文件头部注释之后的内容
/*
 * @DescriptionM
 * @Author: chad-Chen
 */
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
import {
    Select,
    ButtonGroup,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Pagination,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Loading,
    Empty,
    Collapse,
    CollapseItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Popover,
    Drawer,
    Tag,
    Menu,
    MenuItem,
    Submenu,
    Scrollbar
} from 'element-ui'

const compList = [
    Select,
    ButtonGroup,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Pagination,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Loading,
    Empty,
    Collapse,
    CollapseItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Popover,
    Drawer,
    Tag,
    Menu,
    MenuItem,
    Submenu,
    Scrollbar
]
export default {
    install(Vue) {
        compList.forEach(item => {
            Vue.use(item)
        })
    }
}
