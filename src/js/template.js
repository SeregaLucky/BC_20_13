export const template = (id, name, selery) => {
  return `
  <li data-userId="${id}">
    <h3 data-info="name">${name}</h3>
    <input class="li_input js_li_input" type="text" name="" />
    <p data-info="selery">${selery}</p>

    <button data-userId="${id}" class="li_button js_li_button" type="button">Change</button>
  </li>
  `;
};

// export const template = (name, selery) => {
//   return `
//   <li>
//     <h3>${name}</h3>
//     <p>${selery}</p>
//   </li>
//   `;
// };
