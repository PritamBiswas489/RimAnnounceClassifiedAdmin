/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import UserList from "views/UserList.js";

import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import AnnouncementList from "views/AnnouncementList";
import Categories from "views/Categories";
import LocationList from "views/LocationList";
import SubLocationList from "views/SubLocationList";
import ContactUs from "views/ContactUs";
import Settings from "views/Settings";

const dashboardRoutes = [
 
  {
    path: "/dashboard",
    name: "User List",
    icon: "nc-icon nc-chart-pie-35",
    component: UserList,
    layout: "/admin"
  },
  {
    path: "/announcements",
    name: "Announcement List",
    icon: "nc-icon nc-chart-pie-35",
    component: AnnouncementList,
    layout: "/admin"
  },
  {
    path: "/contact-us",
    name: "Contact Us Message",
    icon: "nc-icon nc-chart-pie-35",
    component: ContactUs,
    layout: "/admin"
  },
  {
    path: "/locations",
    name: "Locations",
    icon: "nc-icon nc-chart-pie-35",
    component: LocationList,
    layout: "/admin"
  },
  {
    path: "/sub-locations",
    name: "Sub Locations",
    icon: "nc-icon nc-chart-pie-35",
    component: SubLocationList,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "nc-icon nc-chart-pie-35",
    component: Categories,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-chart-pie-35",
    component: Settings,
    layout: "/admin"
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
