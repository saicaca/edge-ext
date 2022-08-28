import React from "react";
import "./App.css";
import { notification, Popover, Button } from "antd";
import { getInfo, getLocation, getWeatherInfo, getBrowser, Browser } from "./utils";

function getCovidInfo() {
  notification.info({
    key: "covid19",
    message: "请稍等...",
    placement: "bottomRight",
    bottom: 200,
  });
  getLocation()
    .then((data) => {
      return getInfo(data.adm1);
    })
    .then((data) => {
      console.log(data);
      notification.open({
        key: "covid19",
        message: data,
        placement: "bottomRight",
        bottom: 200,
      });
    })
    .catch(() => {
      getInfo("中国")
        .then((data) => {
          notification.open({
            key: "covid19",
            message: data,
            placement: "bottomRight",
            bottom: 200,
          });
        })
        .catch(() => {
          notification.error({
            key: "covid19",
            message: "获取失败",
            placement: "bottomRight",
            bottom: 200,
          });
        });
    });
}

function getWeather() {
  getLocation()
    .then((data) => {
      // console.log(data);
      const weatherMsg = `当前天气：${data.city}`;
      notification.open({
        duration: 8,
        message: weatherMsg,
        placement: "bottomRight",
        bottom: 200,
      });
      return getWeatherInfo(data.geo);
    })
    .then((v) => {
      // console.log(v);
      const weatherMsg = `现在是${v.now.text}天；气温${v.now.temp}°；体感气温${v.now.feelsLike}°；相对湿度${v.now.humidity}%；风向${v.now.windDir}；风速${v.now.windSpeed}km/h`;
      notification.open({
        duration: 5,
        message: weatherMsg,
        placement: "bottomRight",
        bottom: 200,
      });
    })
    .catch(() => {
      notification.warn({
        message: "获取地理位置失败！请查看是否赋予权限！",
      });
      return;
    });
}

const popContent = function () {
  const btnStyle = {
    margin: "4px 0",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        pointerEvents: "auto",
      }}
    >
      <Button style={btnStyle} type="primary" onClick={getCovidInfo}>
        疫情信息
      </Button>
      <Button style={btnStyle} type="primary" onClick={getWeather}>
        天气信息
      </Button>
    </div>
  );
};

let PREFIX = {};
PREFIX[Browser.Edge] = "extension://";
PREFIX[Browser.Chrome] = "chrome-extension://";
const EXTENSION_ID = "joopofdnckamjppljklknkinmiaikiii/"

console.log(PREFIX);
console.log(getBrowser());

// const EXTENSION_URL = "chrome-extension://joopofdnckamjppljklknkinmiaikiii/";

const cats = {
  1: "assets/flatcat/cat-1.png",
  2: "assets/flatcat/cat-2.png",
  3: "assets/flatcat/cat-3.png",
  4: "assets/flatcat/cat-4.png",
  5: "assets/flatcat/cat-5.png",
  6: "assets/flatcat/cat-6.png",
}
let selectedCat = 1;

function App() {
  return (
    <div className="App">
      <Popover placement="leftTop" content={popContent()} title="菜单">
        <canvas
          width="300"
          height="400"
          className="canvas"
          style={{
            pointerEvents: "auto",
          }}
        ></canvas>
        <div
            style={{
              pointerEvents: "auto",
            }}
        >
          <img src={PREFIX[getBrowser()] + EXTENSION_ID + cats[selectedCat]} alt=""/>
        </div>
      </Popover>
    </div>
  );
}

export default App;
