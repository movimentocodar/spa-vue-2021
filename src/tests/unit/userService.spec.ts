import UserService from "@/services/userServices";
import { shallowMount, Wrapper } from "@vue/test-utils";

import {
  BRow,
  BCol,
  BFormInput,
  BForm,
  BFormGroup,
  BButton,
  BAlert
} from "bootstrap-vue";

import Login from "@/components/Login.vue";
import Usuario from "@/model/Usuario";

describe("Login", () => {
  let wrapper: Wrapper<Login, Element>;
  beforeAll(() => {
    wrapper = shallowMount(Login, {
      stubs: {
        "b-form-input": BFormInput,
        "b-row": BRow,
        "b-col": BCol,
        "b-form": BForm,
        "b-form-group": BFormGroup,
        "b-button": BButton,
        "b-alert": BAlert
      },
    });
  });

  const setData = (wrapper: Wrapper<Login, Element>) =>
    wrapper.setData({
      usuario: {
        name: "Hugo Ferreira",
      } as Usuario,
    });

  const resetData = (wrapper: Wrapper<Login, Element>) =>
    wrapper.setData({
      usuario: {
        name: "",
      } as Usuario,
    });

  test("Componente é uma instancia do Vue", () => {
    expect(wrapper.vm).toBeTruthy;
  });

  test("O dado retorna usuario Hugo Ferreira", async () => {
    const data = await UserService.getUser("hugoogle");
    expect(data.data.name).toBe("Hugo Ferreira");
  });

  test("Dado um dado invalido deve retornar o status 404", async () => {
    const status = 404;
    expect.stringContaining;
    return UserService.getUser("311236541265341654361").catch((err) => {
      const e = parseInt(err.response.status);
      expect(e).toEqual(status);
    });
  });
});
