import{a as c,S as h,i as y}from"./assets/vendor-C1DvvBV_.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();c.defaults.baseURL="https://pixabay.com/api/";const g="57891761-ce0c77f4e9f24f909df0cbbb9";function b(o){return c.get("",{params:{key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data)}const f=document.querySelector(".gallery"),u=document.querySelector(".loader"),L=new h(".gallery a",{captionsData:"alt",captionDelay:250});function v(o){const r=o.map(({webformatURL:i,largeImageURL:a,tags:e,likes:t,views:s,comments:d,downloads:p})=>`<li class="gallery-item">
  <a class="gallery-link" href="${a}">
    <img class="gallery-image" src="${i}" alt="${e}" />
  </a>
  <div class="info">
    <p class="info-item"><b>Likes</b>${t}</p>
    <p class="info-item"><b>Views</b>${s}</p>
    <p class="info-item"><b>Comments</b>${d}</p>
    <p class="info-item"><b>Downloads</b>${p}</p>
  </div>
</li>`).join("");f.insertAdjacentHTML("beforeend",r),L.refresh()}function S(){f.innerHTML=""}function q(){u.classList.add("is-visible")}function l(){u.classList.remove("is-visible")}const m=document.querySelector(".form");m.addEventListener("submit",w);function w(o){o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(r===""){n("Please enter a search query!");return}S(),q(),b(r).then(i=>{if(l(),i.hits.length===0){n("Sorry, there are no images matching your search query. Please try again!");return}v(i.hits)}).catch(()=>{l(),n("Something went wrong. Please try again later!")}),m.reset()}function n(o){y.error({message:o,position:"topRight",maxWidth:432,theme:"dark",backgroundColor:"#ef4040",messageColor:"#fff"})}
//# sourceMappingURL=index.js.map
