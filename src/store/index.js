import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    exportFileList: []
  },
  mutations: {
    changeExportFileList (state, fileData) {
      let index = state.exportFileList.findIndex(item => {
        return item.fileId === fileData.fileId
      })

      if (index >= 0) {
        state.exportFileList[index] = fileData
      } else {
        state.exportFileList.push(fileData)
      }
    }
  }
})

export default store
