export default class ColumnChart {
  subElements = {};
  chartHeight = 50;
  constructor({
    data = [],
    label = '',
    value = 0,
    link = ''
              } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;

    this.render();
  }

  get getLink() {
    return (this.link) ? `<a href="${this.link}" class="column-chart__link">View all</a>` : "";
  }

  get template () {
    const element = `
      <div class="column-chart column-chart_loading" style="...${this.chartHeight}">
        <div class="column-chart__title">
            Total ${this.label}
            ${this.getLink}
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">
                ${this.value}
            </div>
            <div data-element="body" class="column-chart__chart">
                ${this.getColumnBody(this.data)}
            </div>
         </div>
         </div>
    `;
    return element;

  }
  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }

    const elements  = element.querySelectorAll('[data-element]');
    let TempElem = this.element;
    this.subElements = (TempElem)=>{
      const elements = element.querySelectorAll('[data-element]');
      return [...elements].reduce((accum, subElement) =>{
        accum[subElement.dataset.element] = subElement;
        return accum;
      }, {});
    }
  }
  getColumnBody(data){
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;
    return data
      .map(item => {
        const percent = (item / maxValue * 100).toFixed(0);
        return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
      })
      .join('');
  }
  update(data) {
    this.element.innerHTML = this.getColumnBody(data);
  }
  remove () {
    this.element.remove();
  }
  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }

}
