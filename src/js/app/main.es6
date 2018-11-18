import React, {Component} from "react";
import ReactDOM from 'react-dom';
import PlayTable from './playTable';

export default class Main {
  static init() {

    ReactDOM.render(
        <PlayTable />
    , document.getElementById('app-content'));
  }
}