import { Location } from "react-router-dom";
import { StateCreator } from "zustand";

// ---------------------- types ---------------------
export interface IApiData {
  data: any;
}

export interface IApi {
  name: string;
  url: string;
  params: any;
  list: IApiData[];
}

export interface IDevToolsState {
  isOpen: boolean;
  pageName: string;
  pageUrl: string;
  apis: IApi[];
}

export interface IDevtools {
  data: IDevToolsState;
  addRecordToDevList: (apiData: IApi, location: any) => void;
  resetDataDevTools: () => void;
  toggleModal: () => void;
}

// ---------------------- default values ---------------------
const initialState: IDevToolsState = {
  isOpen: false,
  pageName: "",
  pageUrl: "",
  apis: []
};

const createDevToolsSlice: StateCreator<IDevtools> = (set) => ({
  data: initialState,

  addRecordToDevList: (apiData: IApi, location: Location) => {
    set((state) => {
      const find = state.data.apis.find((item) => item.url === apiData.url);
      const path = location.pathname;
      const pathSplited = path.split("/");

      if (state.data.pageUrl === path) {
        const updatedApis = [...state.data.apis];

        if (!find) {
          updatedApis.push({
            ...apiData,
            list: JSON.parse(JSON.stringify(apiData.list))
          });
        } else {
          updatedApis.forEach((item) => {
            if (item.url === apiData.url) {
              item.list = JSON.parse(JSON.stringify(apiData.list));
            }
          });
        }

        return {
          data: {
            ...state.data,
            apis: updatedApis
          }
        };
      } else {
        return {
          data: {
            ...state.data,
            pageName: pathSplited[pathSplited.length - 1],
            pageUrl: path,
            apis: [
              {
                ...apiData,
                list: JSON.parse(JSON.stringify(apiData.list))
              }
            ]
          }
        };
      }
    });
  },

  resetDataDevTools: () => {
    set({ data: initialState });
  },

  toggleModal: () => {
    set((state) => ({
      data: {
        ...state.data,
        isOpen: !state.data.isOpen
      }
    }));
  }
});

export default createDevToolsSlice;
