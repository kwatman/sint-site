import { defineComponent, mergeModels, useModel, mergeProps, useSSRContext, ref, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, createSSRApp, h } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Form, router, createInertiaApp } from "@inertiajs/vue3";
import { Icon } from "@iconify/vue";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    label: {},
    name: {},
    placeholder: {}
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label class="mr-4 font-semibold text-foreground text-lg"${ssrRenderAttr("for", __props.name)}>${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input class="border-2 border-b w-full border-primary/30 bg-white/80 rounded-lg text-lg py-2 px-4 text-foreground placeholder:text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:border-primary focus-visible:ring-primary"${ssrRenderAttr("id", __props.name)}${ssrRenderAttr("name", __props.name)}${ssrRenderAttr("value", model.value)} type="text"${ssrRenderAttr("placeholder", __props.placeholder)}></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Input.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Wishlist",
  __ssrInlineRender: true,
  setup(__props) {
    const submited = ref(false);
    const form = ref({
      name: null,
      list: [""]
    });
    const addItem = () => form.value.list.push("");
    const removeItem = (i) => form.value.list.splice(i, 1);
    function submit() {
      const payload = {
        name: form.value.name,
        items: form.value.list.map((name) => ({ name }))
      };
      router.post("/wishlist", payload, {
        preserveState: true,
        onSuccess: () => {
          submited.value = true;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto my-10 bg-amber-50 border-amber-200 border rounded-md p-10 max-w-3xl w-full" }, _attrs))}>`);
      if (!submited.value) {
        _push(ssrRenderComponent(unref(Form), { onSubmit: submit }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                name: "name",
                modelValue: form.value.name,
                "onUpdate:modelValue": ($event) => form.value.name = $event,
                label: "Naam",
                placeholder: "vul je naam hier in"
              }, null, _parent2, _scopeId));
              _push2(`<div class="border-t mt-5 pt-5 border-primary"${_scopeId}><!--[-->`);
              ssrRenderList(form.value.list.length, (i) => {
                _push2(`<div class="mb-4 flex items-center gap-2"${_scopeId}><p class="text-foreground text-lg font-semibold w-4 min-w-4"${_scopeId}>${ssrInterpolate(i)}.</p>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: form.value.list[i - 1],
                  "onUpdate:modelValue": ($event) => form.value.list[i - 1] = $event,
                  name: `items[${i - 1}][name]`,
                  placeholder: "vul je wens hier in"
                }, null, _parent2, _scopeId));
                if (form.value.list.length > 1) {
                  _push2(`<div class="cursor-pointer hover:bg-destructive/10 hover:text-destructive p-2 rounded-md"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Icon), {
                    class: "text-2xl text-foreground",
                    icon: "material-symbols-light:delete-outline",
                    size: "2xl"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--><button type="button" class="bg-accent text-white px-4 py-2 rounded cursor-pointer"${_scopeId}> Voeg item toe </button></div><button class="bg-primary text-white px-4 py-2 rounded cursor-pointer mt-4" type="submit"${_scopeId}>Verlanglijstje indienen </button>`);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  name: "name",
                  modelValue: form.value.name,
                  "onUpdate:modelValue": ($event) => form.value.name = $event,
                  label: "Naam",
                  placeholder: "vul je naam hier in"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", { class: "border-t mt-5 pt-5 border-primary" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(form.value.list.length, (i) => {
                    return openBlock(), createBlock("div", {
                      key: i,
                      class: "mb-4 flex items-center gap-2"
                    }, [
                      createVNode("p", { class: "text-foreground text-lg font-semibold w-4 min-w-4" }, toDisplayString(i) + ".", 1),
                      createVNode(_sfc_main$1, {
                        modelValue: form.value.list[i - 1],
                        "onUpdate:modelValue": ($event) => form.value.list[i - 1] = $event,
                        name: `items[${i - 1}][name]`,
                        placeholder: "vul je wens hier in"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "name"]),
                      form.value.list.length > 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        onClick: ($event) => removeItem(i - 1),
                        class: "cursor-pointer hover:bg-destructive/10 hover:text-destructive p-2 rounded-md"
                      }, [
                        createVNode(unref(Icon), {
                          class: "text-2xl text-foreground",
                          icon: "material-symbols-light:delete-outline",
                          size: "2xl"
                        })
                      ], 8, ["onClick"])) : createCommentVNode("", true)
                    ]);
                  }), 128)),
                  createVNode("button", {
                    type: "button",
                    onClick: addItem,
                    class: "bg-accent text-white px-4 py-2 rounded cursor-pointer"
                  }, " Voeg item toe ")
                ]),
                createVNode("button", {
                  class: "bg-primary text-white px-4 py-2 rounded cursor-pointer mt-4",
                  type: "submit"
                }, "Verlanglijstje indienen ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<p> Bedankt voor het indienen van je verlanglijstje! We hebben je wensen ontvangen en zullen ons best doen om ze te vervullen. </p>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Wishlist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./pages/Wishlist.vue": __vite_glob_0_0 });
      return pages[`./pages/${name}.vue`];
    },
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h(App, props)
      }).use(plugin);
    }
  })
);
