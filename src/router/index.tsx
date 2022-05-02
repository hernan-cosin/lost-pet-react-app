import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from "pages/layout";
import  {Home} from "pages/home"
import { NearBy } from "pages/near-by";
import { Login } from "pages/login";
import { LoginPass } from "pages/login-pass";
import { MyData } from "pages/my-data";
import { MyReports } from "pages/my-reports";
import {ReportPet} from "pages/report-pet"
import { Item } from "pages/item";
import { PrivateRoute } from "./privateRoute";
import { NewUser } from "pages/my-data/new-user";


export function MyRouter() {
    return <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}></Route>
                <Route path="/near-by/:lat/:lng" element={<NearBy />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/login-pass" element={<LoginPass />}></Route>
                <Route path="/me" element={
                  <PrivateRoute>
                    <MyData />
                  </PrivateRoute>
                }></Route>
                <Route path="/me/reports" element={
                  <PrivateRoute>
                    <MyReports />
                  </PrivateRoute>
                }></Route>
                <Route path="/me/report" element={
                  <PrivateRoute>
                    <ReportPet/>
                  </PrivateRoute>
                }></Route>
                <Route path="/me/new" element={<NewUser />}></Route>
                {/* <Route path="/report" element={<ReportPet />}></Route> */}
                <Route path="item/:id" element={<Item />}></Route>
            </Route>
    </Routes>
}