const { readYAML } = require('./libs/utils')
const { getChannelById, queueReceive } = require('./libs/mq-utils')
const defaultSetting = require('./setting')
// 載入外部conf下的config檔案
const loadConfig = async(setting = null) => {
  if (setting === null) setting = defaultSetting
  const result = {}
  for (let i = 0; i < setting.files.length; i++) {
    result[setting.files[i].id] = await readYAML(setting.files[i].path)
  }
  result.dir = setting.dir
  result.require2 = require // 儲存require在動態載入用
  return result
}
const mqInit = async({hostData, hostId, channelId }) => {
  // 取得設定檔
  const mqConfig = hostData[hostId]
  // 建立連線 建立channel
  const channel = await getChannelById(mqConfig, channelId).catch(e => {
    console.log(e)
  })
  const queueArray = [
    { 
      name: 'myapp',
      handler: (channel, content, msg) => {
        // console.log(`Received [socket][noAck: true] queue Rock!! %s`, content)
        // testCount = testCount + 1
        // console.log(`testCount=${testCount}`)
        console.log('got mq')
        /*
        setTimeout(() => {
          console.log(`after run broad cast=${testCount}`)
          channel.ack(msg)
        },1000)
        */
      },
      option: {
        noAck: false
      }
    }
  ]
  await queueReceive(channel, queueArray)
}
const run = async() => {
  // 載入設定檔
  const configData = await loadConfig(defaultSetting)
  // 監聽mq
  const mqOpt = {
    hostData: configData.mqHost,
    hostId: 'rabbitRD', // TODO: 需要依照環境改主機
    channelId: 'main'
  }
  await mqInit(mqOpt)
}
run()