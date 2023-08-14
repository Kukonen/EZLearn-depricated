import {ToastPayload, ToastType} from "../../types/toast.types.ts";

const toast = {
    state: (): {
        text: string,
        visible: boolean
        type: ToastType
    } => ({
        text: '',
        visible: false,
        type: "WARNING"
    }),
    getters: {
        getText(state: any) {
            return state.text;
        },
        getVisible(state: any) {
            return state.visible;
        },
        getType(state: any) {
            return state.type;
        }
    },
    mutations: {
        setToast(state: any, payload: ToastPayload) {
            state.text = payload.text;
            state.visible = true;
            if (state.type) {
                state.type = payload.type;
            }
        },
        setVisible(state: any, visible: boolean) {
            state.visible = visible;
        }
    },
    actions: {
      doToast({commit}, payload: ToastPayload) {
          commit('setToast', payload);

          setTimeout(() => {
              commit('setVisible', false);
          }, 2500);
      }
    },
    namespaced: true
}

export default toast;