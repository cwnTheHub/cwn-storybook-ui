"use strict";(self.webpackChunk_nds_core_nds=self.webpackChunk_nds_core_nds||[]).push([[7765,3263],{"./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}__webpack_require__.d(__webpack_exports__,{Z:function(){return _arrayLikeToArray}})},"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _slicedToArray}});var unsupportedIterableToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||(0,unsupportedIterableToArray.Z)(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},"./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _unsupportedIterableToArray}});var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return(0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(o,minLen):void 0}}},"./node_modules/@mdx-js/react/lib/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{NF:function(){return withMDXComponents},Zo:function(){return MDXProvider},ah:function(){return useMDXComponents},pC:function(){return MDXContext}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents:allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components:components,children:children,disableParentContext:disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./src/components/Forms/Checkbox.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_Users_oidohou_workplace_cwn_storybook_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_Checkbox_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Forms/Checkbox.stories.js");function _createMdxContent(props){const _components=Object.assign({p:"p",code:"code",h3:"h3"},(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.h_,{of:_Checkbox_stories__WEBPACK_IMPORTED_MODULE_2__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Dx,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"import { Checkbox } from '@nds_core/nds'"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"props--methods",children:"PROPS & METHODS"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.ZX,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"minimal-usage",children:"Minimal usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Checkboxes are used when there are lists of options and the user may select any number of choices, including zero, one, or several. In other words, each checkbox is independent of all other checkboxes in the list, so checking one box doesn't uncheck the others."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"A stand-alone checkbox is used for a single option that the user can turn on or off."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"controlled-checkbox",children:"Controlled Checkbox"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"If it is required that the state of the Checkbox be controlled by the application or other external methods, a checked prop must be passed to each Checkbox that needs to be controlled. Additionally, if the user is meant to select a Checkbox, an onChange must be provided. If the Checkbox should not be changed by user input, a readOnly prop must be provided."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_Checkbox_stories__WEBPACK_IMPORTED_MODULE_2__.ControlledCheckboxes}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"uncontrolled-checkbox",children:"Uncontrolled Checkbox"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"If it is not necessary to control Checkbox state. You can create a Checkbox without a checked prop, in this case the Checkbox will act as an HTML input with the type of checkbox. Its value can be accessed by referencing the element via a ref."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"default-values",children:"Default values"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Due to the nature of uncontrolled components, you cannot set an initial checked property on the component. If you need to set a default state for your uncontrolled Checkbox, you can use the defaultChecked property as described in the react documentation."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:'Note: If no id is provided, a default id will be generated in the format of: "name_value"'}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_Checkbox_stories__WEBPACK_IMPORTED_MODULE_2__.UncontrolledCheckbox}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"getting-feedback-for-an-unchecked-checkbox",children:"Getting feedback for an unchecked checkbox"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Use the feedback and error props to give the user feedback regarding a missed checkbox by highlighting the label, checkbox element and adding an error message stating how to proceed."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_Checkbox_stories__WEBPACK_IMPORTED_MODULE_2__.CheckboxWithFeedback})]})}__webpack_exports__.default=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"./src/components/Forms/Checkbox.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CheckboxWithFeedback:function(){return CheckboxWithFeedback},ControlledCheckboxes:function(){return ControlledCheckboxes},MinimalUsage:function(){return MinimalUsage},UncontrolledCheckbox:function(){return UncontrolledCheckbox},__namedExportsOrder:function(){return __namedExportsOrder}});var _MinimalUsage$paramet,_MinimalUsage$paramet2,_MinimalUsage$paramet3,_ControlledCheckboxes,_ControlledCheckboxes2,_ControlledCheckboxes3,_UncontrolledCheckbox,_UncontrolledCheckbox2,_UncontrolledCheckbox3,_CheckboxWithFeedback,_CheckboxWithFeedback2,_CheckboxWithFeedback3,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_core_core_box_Box__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/core/core-box/Box.js"),_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/core-checkbox/Checkbox.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("./src/core/core-text/Text.js"),__webpack_require__("./node_modules/react/jsx-runtime.js"));__webpack_exports__.default={title:"Core components/Forms/ Checkbox",component:_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__.Z};var MinimalUsage=function Template(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__.Z,{label:args.label,name:args.name,value:args.value,checked:args.checked,id:args.id,feedback:args.feedback,error:args.error})}.bind({});MinimalUsage.args={label:"This is a checkbox",name:"Check me",value:"This is a checkbox"};var ControlledCheckboxes=function Controlled(args){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({consumerSelected:!0,businessSelected:!1}),_useState2=(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_useState,2),initialState=_useState2[0],setInitialState=_useState2[1],handleCheck=function handleCheck(event){"consumer"===event.target.value?setInitialState({consumerSelected:event.target.checked}):"business"===event.target.value&&setInitialState({businessSelected:event.target.checked})};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_core_core_box_Box__WEBPACK_IMPORTED_MODULE_1__.Z,{tag:"div",between:2,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__.Z,{checked:initialState.consumerSelected,onChange:handleCheck,name:"products",value:"consumer",label:"Checkbox 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__.Z,{checked:initialState.businessSelected,onChange:handleCheck,name:"products",value:"business",label:"Checkbox 2"})]})}.bind({}),UncontrolledCheckbox=function TemplateUnControlled(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_core_core_box_Box__WEBPACK_IMPORTED_MODULE_1__.Z,{tag:"div",between:2,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__.Z,{name:"services",value:"posting",label:"Posting"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__.Z,{name:"services",value:"recruting",label:"Recruting"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__.Z,{name:"services",value:"advert",label:"Advertize"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__.Z,{name:"services",value:"template",label:"Template",defaultChecked:!0})]})}.bind({}),CheckboxWithFeedback=function TemplateError(args){var message="Please agree to the terms and conditions",_useState3=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({feedback:"error",message:message}),_useState4=(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_useState3,2),initialState=_useState4[0],setInitialState=_useState4[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_core_core_checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_2__.Z,{name:"terms",value:"agree",label:"I agree to the terms and conditions",feedback:initialState.feedback,error:initialState.message,onChange:function handleCheck(event){event.target.checked?setInitialState({feedback:void 0,message:void 0}):setInitialState({feedback:"error",message:message})}})}.bind({});MinimalUsage.parameters=(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},MinimalUsage.parameters),{},{docs:(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},null===(_MinimalUsage$paramet=MinimalUsage.parameters)||void 0===_MinimalUsage$paramet?void 0:_MinimalUsage$paramet.docs),{},{source:(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({originalSource:"args => {\n  return <Checkbox label={args.label} name={args.name} value={args.value} checked={args.checked} id={args.id} feedback={args.feedback} error={args.error} />;\n}"},null===(_MinimalUsage$paramet2=MinimalUsage.parameters)||void 0===_MinimalUsage$paramet2||null===(_MinimalUsage$paramet3=_MinimalUsage$paramet2.docs)||void 0===_MinimalUsage$paramet3?void 0:_MinimalUsage$paramet3.source)})}),ControlledCheckboxes.parameters=(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},ControlledCheckboxes.parameters),{},{docs:(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},null===(_ControlledCheckboxes=ControlledCheckboxes.parameters)||void 0===_ControlledCheckboxes?void 0:_ControlledCheckboxes.docs),{},{source:(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({originalSource:'args => {\n  const [initialState, setInitialState] = useState({\n    consumerSelected: true,\n    businessSelected: false\n  });\n  const handleCheck = event => {\n    if (event.target.value === "consumer") {\n      setInitialState({\n        consumerSelected: event.target.checked\n      });\n    } else if (event.target.value === "business") {\n      setInitialState({\n        businessSelected: event.target.checked\n      });\n    }\n  };\n  return <Box tag="div" between={2}>\n      <Checkbox checked={initialState.consumerSelected} onChange={handleCheck} name="products" value="consumer" label="Checkbox 1" />\n      <Checkbox checked={initialState.businessSelected} onChange={handleCheck} name="products" value="business" label="Checkbox 2" />\n    </Box>;\n}'},null===(_ControlledCheckboxes2=ControlledCheckboxes.parameters)||void 0===_ControlledCheckboxes2||null===(_ControlledCheckboxes3=_ControlledCheckboxes2.docs)||void 0===_ControlledCheckboxes3?void 0:_ControlledCheckboxes3.source)})}),UncontrolledCheckbox.parameters=(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},UncontrolledCheckbox.parameters),{},{docs:(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},null===(_UncontrolledCheckbox=UncontrolledCheckbox.parameters)||void 0===_UncontrolledCheckbox?void 0:_UncontrolledCheckbox.docs),{},{source:(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({originalSource:'args => {\n  return <Box tag="div" between={2}>\n      <Checkbox name="services" value="posting" label="Posting" />\n      <Checkbox name="services" value="recruting" label="Recruting" />\n      <Checkbox name="services" value="advert" label="Advertize" />\n      <Checkbox name="services" value="template" label="Template" defaultChecked />\n    </Box>;\n}'},null===(_UncontrolledCheckbox2=UncontrolledCheckbox.parameters)||void 0===_UncontrolledCheckbox2||null===(_UncontrolledCheckbox3=_UncontrolledCheckbox2.docs)||void 0===_UncontrolledCheckbox3?void 0:_UncontrolledCheckbox3.source)})}),CheckboxWithFeedback.parameters=(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},CheckboxWithFeedback.parameters),{},{docs:(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},null===(_CheckboxWithFeedback=CheckboxWithFeedback.parameters)||void 0===_CheckboxWithFeedback?void 0:_CheckboxWithFeedback.docs),{},{source:(0,_Users_oidohou_workplace_cwn_storybook_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({originalSource:'args => {\n  const message = "Please agree to the terms and conditions";\n  const [initialState, setInitialState] = useState({\n    feedback: "error",\n    message: message\n  });\n  const handleCheck = event => {\n    if (event.target.checked) {\n      setInitialState({\n        feedback: undefined,\n        message: undefined\n      });\n    } else {\n      setInitialState({\n        feedback: "error",\n        message: message\n      });\n    }\n  };\n  return <Checkbox name="terms" value="agree" label="I agree to the terms and conditions" feedback={initialState.feedback} error={initialState.message} onChange={handleCheck} />;\n}'},null===(_CheckboxWithFeedback2=CheckboxWithFeedback.parameters)||void 0===_CheckboxWithFeedback2||null===(_CheckboxWithFeedback3=_CheckboxWithFeedback2.docs)||void 0===_CheckboxWithFeedback3?void 0:_CheckboxWithFeedback3.source)})});var __namedExportsOrder=["MinimalUsage","ControlledCheckboxes","UncontrolledCheckbox","CheckboxWithFeedback"]}}]);