import Vue from 'vue'
import { Button, Tabbar, TabbarItem, Tabs, Tab, List, Row, Col, Image, Sticky, PullRefresh, Toast, Divider, NavBar, Icon, Search, Tag, IndexBar, IndexAnchor, Cell, CellGroup, Empty, DropdownMenu, DropdownItem, ImagePreview, Dialog } from 'vant'

const components = [Button, Tabbar, TabbarItem, Tabs, Tab, List, Row, Col, Image, Sticky, PullRefresh, Toast, Divider, NavBar, Icon, Search, Tag, IndexBar, IndexAnchor, Cell, CellGroup, Empty, DropdownMenu, DropdownItem, ImagePreview, Dialog]
components.forEach(item => Vue.use(item))
