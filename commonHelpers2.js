import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */const a=document.querySelector(".feedback-form"),o=a.querySelector(".feedback-form-email"),r=a.querySelector(".feedback-form-message"),l="feedback-form-state";a.addEventListener("input",s);a.addEventListener("submit",m);n();function s(t){const e={email:o.value,message:r.value};localStorage.setItem(l,JSON.stringify(e))}function m(t){if(t.preventDefault(),o.value===""||r.value.trim()==="")return alert("Fill please all fields");const e={email:o.value,message:r.value};console.log(e),localStorage.removeItem(l),a.reset()}function n(){const t=localStorage.getItem(l);if(t){const e=JSON.parse(t);o.value=e.email,r.value=e.message}}
//# sourceMappingURL=commonHelpers2.js.map