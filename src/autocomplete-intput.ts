import { LitElement, html, customElement, query, property } from 'lit-element';
import { directive } from 'lit-html';

@customElement('autocomplete-input')
export class AutocompleteInput extends LitElement {
  @query('input') input?: HTMLInputElement;
  @query('.result') result?: HTMLElement;
  @property({ type: Array }) results: HTMLElement[] = [];
  @property({ type: Array }) suggestions: string[] = [];

  onInput(e: KeyboardEvent) {
    if (this.input && this.result) {
      if (this.input.value.length === 0) {
        this.results = [];
        return;
      }
      const regex = new RegExp(this.input.value, 'gi');
      const results = this.suggestions
        .filter(x => regex.test(x))
        .map(x => this.createResultElement(x, regex));
      this.results = results;
    }
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.keyCode === 9 && this.results.length > 0 && this.input) {
      const search = this.results[0].innerText;
      this.input.innerText = search;
      this.dispatchSearch(search);
      return;
    }

    if (e.keyCode === 13 && this.input) {
      this.dispatchSearch(this.input.value);
    }
  }

  createResultElement(result: string, regex: RegExp) {
    const element = document.createElement('div');
    element.innerHTML = `<button type="button">${result.replace(
      regex,
      '<b>$&</b>'
    )}</button>`;
    return element;
  }

  resultClick(e: Event) {
    const search = (e as any).path[0].innerText.trim();

    console.log(search);
    if (this.input && search) {
      this.input.value = search;
      this.dispatchSearch(search);
    }
  }

  dispatchSearch(search: string) {
    this.dispatchEvent(
      new CustomEvent('search', {
        detail: {
          search
        }
      })
    );
    this.results = [];
  }

  clearSearch() {
    if (this.input) {
      this.input.value = '';
    }
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          font-family: var(--font-family, 'Open Sans');
        }
        * {
          box-sizing: border-box;
        }
        b {
          font-weight: 800;
        }
        /**/
        .autocomplete {
          border: 1px solid #ccc;
          height: 40px;
          background: #fff;
          position: relative;
          width: var(--autocomplete-input-width, 100%);
        }
        .autocomplete.open .result {
          opacity: 1;
          visibility: visible;
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }
        .autocomplete input[type='text'] {
          position: relative;
          z-index: 10;
          height: 100%;
          width: 100%;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
          border: none;
          background: #fff;
          padding: 0 20px;
          font-size: inherit;
          font-family: inherit;
        }
        .autocomplete .result {
          position: absolute;
          z-index: 1;
          outline: 1px solid #ccc;
          top: 100%;
          margin-top: 1px;
          width: 100%;
          /* opacity: 0; */
          /* visibility: hidden; */
          transition: all 0.15s ease;
          -webkit-transform: translateY(-2px);
          transform: translateY(-2px);
          max-height: calc(4 * 40px);
          overflow-y: auto;
        }
        .autocomplete .result > div {
          display: flex;
          flex-direction: column;
        }
        .autocomplete .result button {
          height: 40px;
          width: 100%;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: none;
          border: none;
          text-align: left;
          font-size: inherit;
          font-family: inherit;
          padding: 0 20px;
          cursor: pointer;
        }
      </style>

      <div class="autocomplete">
        <input
          type="text"
          placeholder="Chèche yon mo nan diksyonè a."
          @keydown=${this.onKeyDown}
          @input=${this.onInput}
        />
        <div class="result">
          ${this.results.map(
            x =>
              html`
                <div @click=${this.resultClick}>${x}</div>
              `
          )}
        </div>
      </div>
    `;
  }
}
