import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Menu from "./Menu";
import HomePage from "./HomePage";
import TimeAttackPage from "./TimeAttackPage";
import DriftPage from "menu/DriftPage.js";
import ForzaPage from "./ForzaPage";
import "./Menu.css";

export default function MenuApp() {
  const links = [
    {
      url: "/",
      title: "Главная",
      page: HomePage
    },
    {
      url: "/drift",
      title: "Дрифт-такси",
      page: DriftPage
    },
    {
      url: "/timeattack",
      title: "Time Attack",
      page: TimeAttackPage
    },
    {
      url: "/forza",
      title: "Forza Karting",
      page: ForzaPage
    }
  ];

  return (
    <Router>
      <div>
        <Menu links={links}/>
        <div className="page">
          <Routes>
            {
              links.map(link => (
                <Route path={link.url} element={<link.page />} key={link.url} />
              ))
            }
          </Routes>
        </div>
      </div>
    </Router>
  );
}