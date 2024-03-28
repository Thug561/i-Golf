
import core from "./core";

const loading = {
  isLoading: true
};

Object.setPrototypeOf(loading, {


  load: (isLoading) => {
    let doc, node, T;
    const e = core.options;
    isLoading && (T = e.loadingTemplate, doc = document.getElementById(e.canvas.id), node = toNodes(T, '_loading'), doc && doc.parentElement && doc.parentElement.appendChild(node));
    !isLoading && (doc = document.getElementById('_loading'), doc && (!isLoading && (doc.remove())));
  },
  onLoading: (isLoading) => {},
  onFinish: (isLoading) => {},
  onError: (e) => {},
  Trigger: (e, isLoading) => {
    loading[e](isLoading);
  }
});
const toNodes = (html, ID) => {
  const node = new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];
  node.id = ID;
  node.style.position = 'absolute';
  node.style.top = '0';
  node.style.bottom = '0';
  node.style.left = '0';
  node.style.right = '0';
  node.style.width = '100%';
  node.style.height = '100%';
  node.style.display = 'flex';
  node.style['align-items'] = 'center';
  node.style['justify-content'] = 'center';
  node.style['font-weight'] = 'bold';
  node.style['background'] = '#000';
  node.style['color'] = '#fff';
  node.style['letter-spacing'] = '2px';
  return node
};


export default loading;
