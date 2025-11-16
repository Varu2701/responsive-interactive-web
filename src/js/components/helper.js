export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  for (const k in attrs) {
    if (k === "class") node.className = attrs[k];
    else if (k === "html") node.innerHTML = attrs[k];
    else node.setAttribute(k, attrs[k]);
  }

  children.forEach(c =>
    node.append(typeof c === "string" ? document.createTextNode(c) : c)
  );

  return node;
}
