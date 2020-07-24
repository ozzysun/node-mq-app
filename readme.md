- 設定 conf/index/mq
  host: 要連接的mq主機id 參考mqHost
  channel: 要連接的mq主機channel
  queue: 設定要連接的queue名稱,注意個queue必須已經有定義在mqHost
- app.js
  appInit: 要初始化應用程式的部份
  appRun: 當街收到mq message要執行的程式放這裡
    