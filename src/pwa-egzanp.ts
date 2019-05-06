import { LitElement, html, customElement, property, query } from 'lit-element';
import './autocomplete-intput';
import { SUGGESTIONS } from './suggestions';
import { WORDS } from './words';
import { AutocompleteInput } from './autocomplete-intput';

export const NO_WORD = ')-:';
const NO_DEFINTION = 'Pa gen definisyon pou mou ou chèche a.';

interface Definition {
  word: string;
  description: string;
}

@customElement('pwa-egzanp')
export class PwaEgzanp extends LitElement {
  @query('autocomplete-input') autoCompleteElement?: AutocompleteInput;
  @property({ type: String }) name = 'there';
  @property({ type: Object }) store = {
    suggestions: SUGGESTIONS,
    word: NO_WORD,
    description: NO_DEFINTION,
    noWord: NO_WORD,
    noDescription: NO_DEFINTION,
    showSearch: true,
    showResult: false,
    showNoResult: false
  };

  onSearch(e: { detail: { search: string } }) {
    const search = (e.detail.search || '').trim().toLowerCase();
    const definition = WORDS.find(x => x.word.toLowerCase() === search);
    if (definition) {
      this.store.word = definition.word;
      this.store.description = definition.description;
      this.updateSearchParam(definition);
      this.showResultDiv();
    } else {
      this.store.word = e.detail.search;
      this.showNoResultDiv();
    }
  }

  updateSearchParam(definition: Definition) {
    const params = new URLSearchParams(window.location.search);
    params.set('search', definition.word);
    let url = window.location.href + '?' + params.toString();

    if (window.location.search) {
      url = window.location.href.replace(
        window.location.search,
        params.toString()
      );
    }
    history.pushState({}, '', url);
  }

  showResultDiv() {
    this.store.showSearch = false;
    this.store.showResult = true;
    this.store.showNoResult = false;
    this.clearFocus();
    this.requestUpdate();
  }

  showNoResultDiv() {
    this.store.showSearch = false;
    this.store.showResult = false;
    this.store.showNoResult = true;
    this.requestUpdate();
  }

  showSearchDiv() {
    this.store.showSearch = true;
    this.store.showResult = false;
    this.store.showNoResult = false;
    this.requestUpdate();
  }

  onBackClick() {
    this.clearSearch();
    this.showSearchDiv();
  }

  clearSearch() {
    if (this.autoCompleteElement) {
      this.autoCompleteElement.clearSearch();
    }
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          font-family: var(--font-family, 'Open Sans');
          --autocomplete-input-width: 50vw;
        }
        .search,
        .result {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .show-false {
          display: none;
        }
        h3 {
          font-size: 50px;
          font-weight: 300;
          margin: 0 0 12px 0;
        }
        p {
          font-size: 28px;
          line-height: 48px;
          font-weight: 100;
        }
        .container {
          width: 70vw;
        }
        button {
          padding: 8px;
          border-radius: 4px;
          border: 2px solid #2c79bf;
          color: #2c79bf;
          background: transparent;
          font-size: 14px;
          -moz-outline: 0 none;
          outline: 0 none;
        }
        @media only screen and (max-width: 768px) {
          :host {
            --autocomplete-input-width: 100%;
          }

          .container {
            width: 90vw;
          }

          button {
            color: red;
          }

          h3 {
            font-size: 32px;
          }
          p {
            font-size: 20px;
            line-height: 36px;
          }
        }
      </style>
      <div class="search show-${this.store.showSearch}">
        <div>
          <autocomplete-input
            .suggestions=${this.store.suggestions}
            @search=${this.onSearch}
          ></autocomplete-input>
        </div>
      </div>
      <div class="result show-${this.store.showResult}">
        <div class="container">
          <h3>${this.store.word}</h3>
          <p>${this.store.description}</p>
          <button @click=${this.onBackClick}>&larr; Chèche yon lòt mo</button>
        </div>
      </div>

      <div class="result show-${this.store.showNoResult}">
        <div class="container">
          <h3>${this.store.noWord}</h3>
          Ou te eseye chèche: <strong>${this.store.word}</strong>
          <p>${this.store.noDescription}</p>
          <button @click=${this.onBackClick}>&larr; Chèche yon lòt mo</button>
        </div>
      </div>
    `;
  }
}
