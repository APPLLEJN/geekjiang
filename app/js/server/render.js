/**
 * Created by jiangnan on 15/11/25.
 */
import React from 'react'
import App from '../client/App';
import { Provider, createStore } from 'redux';

export default function render(req, res) {
    // 创建新的 Redux store 实例
    const store = createStore(() => {});

    // 把组件渲染成字符串
    const html = React.renderToString(
        <Provider store={store}>
            {() => <App />}
        </Provider>
    );

    // 从 store 中获得 state
    const initialState = store.getState();

    // 把渲染后的页面内容发送给客户端
    res.send(
        `<!doctype html>
            <html>
              <head>
                <title>geekjiang</title>
              </head>
              <body>
                <div id="app">${html}</div>
                <script>
                  window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
                <script src="/bundle.js"></script>
              </body>
            </html>`
        );
    }
