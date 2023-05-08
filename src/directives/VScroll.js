/* eslint-disable no-param-reassign */
export default {
  name: 'scroll',
  mounted(el) {
    el.addEventListener('wheel', (event) => {
      if (event.deltaY < 0) {
        el.scrollLeft -= 100;
      } else {
        el.scrollLeft += 100;
      }
    });
  },
};
