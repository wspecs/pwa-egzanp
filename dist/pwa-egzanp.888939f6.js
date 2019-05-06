// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/lit-html/lib/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirective = exports.directive = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive so that lit-html will call the function
 * during template rendering, rather than passing as a value.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object
 *
 * @example
 *
 * ```
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 * ```
 */
// tslint:disable-next-line:no-any

const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};

exports.directive = directive;

const isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

exports.isDirective = isDirective;
},{}],"node_modules/lit-html/lib/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), into another container (could be the same container), before
 * `beforeNode`. If `beforeNode` is null, it appends the nodes to the
 * container.
 */

exports.isCEPolyfill = isCEPolyfill;

const reparentNodes = (container, start, end = null, before = null) => {
  let node = start;

  while (node !== end) {
    const n = node.nextSibling;
    container.insertBefore(node, before);
    node = n;
  }
};
/**
 * Removes nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), from `container`.
 */


exports.reparentNodes = reparentNodes;

const removeNodes = (container, startNode, endNode = null) => {
  let node = startNode;

  while (node !== endNode) {
    const n = node.nextSibling;
    container.removeChild(node);
    node = n;
  }
};

exports.removeNodes = removeNodes;
},{}],"node_modules/lit-html/lib/part.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nothing = exports.noChange = void 0;

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

exports.noChange = noChange;
const nothing = {};
exports.nothing = nothing;
},{}],"node_modules/lit-html/lib/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

exports.marker = marker;
const nodeMarker = `<!--${marker}-->`;
exports.nodeMarker = nodeMarker;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */

exports.markerRegex = markerRegex;
const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */

exports.boundAttributeSuffix = boundAttributeSuffix;

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    let index = -1;
    let partIndex = 0;
    const nodesToRemove = [];

    const _prepareTemplate = template => {
      const content = template.content; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
      // null

      const walker = document.createTreeWalker(content, 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      , null, false); // Keeps track of the last index associated with a part. We try to delete
      // unnecessary nodes, but we never want to associate two different parts
      // to the same index. They must have a constant node between.

      let lastPartIndex = 0;

      while (walker.nextNode()) {
        index++;
        const node = walker.currentNode;

        if (node.nodeType === 1
        /* Node.ELEMENT_NODE */
        ) {
            if (node.hasAttributes()) {
              const attributes = node.attributes; // Per
              // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
              // attributes are not guaranteed to be returned in document order.
              // In particular, Edge/IE can return them out of order, so we cannot
              // assume a correspondance between part index and attribute index.

              let count = 0;

              for (let i = 0; i < attributes.length; i++) {
                if (attributes[i].value.indexOf(marker) >= 0) {
                  count++;
                }
              }

              while (count-- > 0) {
                // Get the template literal section leading up to the first
                // expression in this attribute
                const stringForPart = result.strings[partIndex]; // Find the attribute name

                const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
                // All bound attributes have had a suffix added in
                // TemplateResult#getHTML to opt out of special attribute
                // handling. To look up the attribute value we also need to add
                // the suffix.

                const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                const attributeValue = node.getAttribute(attributeLookupName);
                const strings = attributeValue.split(markerRegex);
                this.parts.push({
                  type: 'attribute',
                  index,
                  name,
                  strings
                });
                node.removeAttribute(attributeLookupName);
                partIndex += strings.length - 1;
              }
            }

            if (node.tagName === 'TEMPLATE') {
              _prepareTemplate(node);
            }
          } else if (node.nodeType === 3
        /* Node.TEXT_NODE */
        ) {
            const data = node.data;

            if (data.indexOf(marker) >= 0) {
              const parent = node.parentNode;
              const strings = data.split(markerRegex);
              const lastIndex = strings.length - 1; // Generate a new text node for each literal section
              // These nodes are also used as the markers for node parts

              for (let i = 0; i < lastIndex; i++) {
                parent.insertBefore(strings[i] === '' ? createMarker() : document.createTextNode(strings[i]), node);
                this.parts.push({
                  type: 'node',
                  index: ++index
                });
              } // If there's no text, we must insert a comment to mark our place.
              // Else, we can trust it will stick around after cloning.


              if (strings[lastIndex] === '') {
                parent.insertBefore(createMarker(), node);
                nodesToRemove.push(node);
              } else {
                node.data = strings[lastIndex];
              } // We have a part for each match found


              partIndex += lastIndex;
            }
          } else if (node.nodeType === 8
        /* Node.COMMENT_NODE */
        ) {
            if (node.data === marker) {
              const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
              // the following are true:
              //  * We don't have a previousSibling
              //  * The previousSibling is already the start of a previous part

              if (node.previousSibling === null || index === lastPartIndex) {
                index++;
                parent.insertBefore(createMarker(), node);
              }

              lastPartIndex = index;
              this.parts.push({
                type: 'node',
                index
              }); // If we don't have a nextSibling, keep this node so we have an end.
              // Else, we can remove it to save future costs.

              if (node.nextSibling === null) {
                node.data = '';
              } else {
                nodesToRemove.push(node);
                index--;
              }

              partIndex++;
            } else {
              let i = -1;

              while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                // Comment node has a binding marker inside, make an inactive part
                // The binding won't work, but subsequent bindings will
                // TODO (justinfagnani): consider whether it's even worth it to
                // make bindings in comments work
                this.parts.push({
                  type: 'node',
                  index: -1
                });
              }
            }
          }
      }
    };

    _prepareTemplate(element); // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}

exports.Template = Template;

const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.


exports.isTemplatePartActive = isTemplatePartActive;

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#attributes-0
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-character
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */


exports.createMarker = createMarker;
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
exports.lastAttributeNameRegex = lastAttributeNameRegex;
},{}],"node_modules/lit-html/lib/template-instance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateInstance = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this._parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this._parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this._parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // When using the Custom Elements polyfill, clone the node, rather than
    // importing it, to keep the fragment in the template's document. This
    // leaves the fragment inert so custom elements won't upgrade and
    // potentially modify their contents by creating a polyfilled ShadowRoot
    // while we traverse the tree.
    const fragment = _dom.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const parts = this.template.parts;
    let partIndex = 0;
    let nodeIndex = 0;

    const _prepareInstance = fragment => {
      // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
      // null
      const walker = document.createTreeWalker(fragment, 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      , null, false);
      let node = walker.nextNode(); // Loop through all the nodes and parts of a template

      while (partIndex < parts.length && node !== null) {
        const part = parts[partIndex]; // Consecutive Parts may have the same node index, in the case of
        // multiple bound attributes on an element. So each iteration we either
        // increment the nodeIndex, if we aren't on a node with a part, or the
        // partIndex if we are. By not incrementing the nodeIndex when we find a
        // part, we allow for the next part to be associated with the current
        // node if neccessasry.

        if (!(0, _template.isTemplatePartActive)(part)) {
          this._parts.push(undefined);

          partIndex++;
        } else if (nodeIndex === part.index) {
          if (part.type === 'node') {
            const part = this.processor.handleTextExpression(this.options);
            part.insertAfterNode(node.previousSibling);

            this._parts.push(part);
          } else {
            this._parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
          }

          partIndex++;
        } else {
          nodeIndex++;

          if (node.nodeName === 'TEMPLATE') {
            _prepareInstance(node.content);
          }

          node = walker.nextNode();
        }
      }
    };

    _prepareInstance(fragment);

    if (_dom.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

exports.TemplateInstance = TemplateInstance;
},{"./dom.js":"node_modules/lit-html/lib/dom.js","./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/template-result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGTemplateResult = exports.TemplateResult = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */

/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const endIndex = this.strings.length - 1;
    let html = '';

    for (let i = 0; i < endIndex; i++) {
      const s = this.strings[i]; // This exec() call does two things:
      // 1) Appends a suffix to the bound attribute name to opt out of special
      // attribute value parsing that IE11 and Edge do, like for style and
      // many SVG attributes. The Template class also appends the same suffix
      // when looking up attributes to create Parts.
      // 2) Adds an unquoted-attribute-safe marker for the first expression in
      // an attribute. Subsequent attribute expressions will use node markers,
      // and this is safe since attributes with multiple expressions are
      // guaranteed to be quoted.

      const match = _template.lastAttributeNameRegex.exec(s);

      if (match) {
        // We're starting a new bound attribute.
        // Add the safe attribute suffix, and use unquoted-attribute-safe
        // marker.
        html += s.substr(0, match.index) + match[1] + match[2] + _template.boundAttributeSuffix + match[3] + _template.marker;
      } else {
        // We're either in a bound node, or trailing bound attribute.
        // Either way, nodeMarker is safe to use.
        html += s + _template.nodeMarker;
      }
    }

    return html + this.strings[endIndex];
  }

  getTemplateElement() {
    const template = document.createElement('template');
    template.innerHTML = this.getHTML();
    return template;
  }

}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTMl in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */


exports.TemplateResult = TemplateResult;

class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }

  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    (0, _dom.reparentNodes)(content, svgElement.firstChild);
    return template;
  }

}

exports.SVGTemplateResult = SVGTemplateResult;
},{"./dom.js":"node_modules/lit-html/lib/dom.js","./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/parts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isPrimitive = void 0;

var _directive = require("./directive.js");

var _dom = require("./dom.js");

var _part = require("./part.js");

var _templateInstance = require("./template-instance.js");

var _templateResult = require("./template-result.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */
const isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};
/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */


exports.isPrimitive = isPrimitive;

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = this.parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (v != null && (Array.isArray(v) || // tslint:disable-next-line:no-any
        typeof v !== 'string' && v[Symbol.iterator])) {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        } else {
          text += typeof v === 'string' ? v : String(v);
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}

exports.AttributeCommitter = AttributeCommitter;

class AttributePart {
  constructor(comitter) {
    this.value = undefined;
    this.committer = comitter;
  }

  setValue(value) {
    if (value !== _part.noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!(0, _directive.isDirective)(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while ((0, _directive.isDirective)(this.value)) {
      const directive = this.value;
      this.value = _part.noChange;
      directive(this);
    }

    if (this.value === _part.noChange) {
      return;
    }

    this.committer.commit();
  }

}

exports.AttributePart = AttributePart;

class NodePart {
  constructor(options) {
    this.value = undefined;
    this._pendingValue = undefined;
    this.options = options;
  }
  /**
   * Inserts this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild((0, _template.createMarker)());
    this.endNode = container.appendChild((0, _template.createMarker)());
  }
  /**
   * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
   * its next sibling must be static, unchanging nodes such as those that appear
   * in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part._insert(this.startNode = (0, _template.createMarker)());

    part._insert(this.endNode = (0, _template.createMarker)());
  }
  /**
   * Appends this part after `ref`
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref._insert(this.startNode = (0, _template.createMarker)());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this._pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = _part.noChange;
      directive(this);
    }

    const value = this._pendingValue;

    if (value === _part.noChange) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this._commitText(value);
      }
    } else if (value instanceof _templateResult.TemplateResult) {
      this._commitTemplateResult(value);
    } else if (value instanceof Node) {
      this._commitNode(value);
    } else if (Array.isArray(value) || // tslint:disable-next-line:no-any
    value[Symbol.iterator]) {
      this._commitIterable(value);
    } else if (value === _part.nothing) {
      this.value = _part.nothing;
      this.clear();
    } else {
      // Fallback, will render the string representation
      this._commitText(value);
    }
  }

  _insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  _commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this._insert(value);

    this.value = value;
  }

  _commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value;

    if (node === this.endNode.previousSibling && node.nodeType === 3
    /* Node.TEXT_NODE */
    ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = value;
      } else {
      this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
    }

    this.value = value;
  }

  _commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value instanceof _templateInstance.TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new _templateInstance.TemplateInstance(template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this._commitNode(fragment);

      this.value = instance;
    }
  }

  _commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  clear(startNode = this.startNode) {
    (0, _dom.removeNodes)(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */


exports.NodePart = NodePart;

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this._pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this._pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = _part.noChange;
      directive(this);
    }

    if (this._pendingValue === _part.noChange) {
      return;
    }

    const value = !!this._pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }
    }

    this.value = value;
    this._pendingValue = _part.noChange;
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */


exports.BooleanAttributePart = BooleanAttributePart;

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false; // tslint:disable-next-line:no-any

      this.element[this.name] = this._getValue();
    }
  }

}

exports.PropertyCommitter = PropertyCommitter;

class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.


exports.PropertyPart = PropertyPart;
let eventOptionsSupported = false;

try {
  const options = {
    get capture() {
      eventOptionsSupported = true;
      return false;
    }

  }; // tslint:disable-next-line:no-any

  window.addEventListener('test', options, options); // tslint:disable-next-line:no-any

  window.removeEventListener('test', options, options);
} catch (_e) {}

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this._pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this._boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this._pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = _part.noChange;
      directive(this);
    }

    if (this._pendingValue === _part.noChange) {
      return;
    }

    const newListener = this._pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
    }

    if (shouldAddListener) {
      this._options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
    }

    this.value = newListener;
    this._pendingValue = _part.noChange;
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.


exports.EventPart = EventPart;

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);
},{"./directive.js":"node_modules/lit-html/lib/directive.js","./dom.js":"node_modules/lit-html/lib/dom.js","./part.js":"node_modules/lit-html/lib/part.js","./template-instance.js":"node_modules/lit-html/lib/template-instance.js","./template-result.js":"node_modules/lit-html/lib/template-result.js","./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/default-template-processor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

var _parts = require("./parts.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const comitter = new _parts.PropertyCommitter(element, name.slice(1), strings);
      return comitter.parts;
    }

    if (prefix === '@') {
      return [new _parts.EventPart(element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new _parts.BooleanAttributePart(element, name.slice(1), strings)];
    }

    const comitter = new _parts.AttributeCommitter(element, name, strings);
    return comitter.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new _parts.NodePart(options);
  }

}

exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
const defaultTemplateProcessor = new DefaultTemplateProcessor();
exports.defaultTemplateProcessor = defaultTemplateProcessor;
},{"./parts.js":"node_modules/lit-html/lib/parts.js"}],"node_modules/lit-html/lib/template-factory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateFactory = templateFactory;
exports.templateCaches = void 0;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  } // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content


  const key = result.strings.join(_template.marker); // Check if we already have a Template for this key

  template = templateCache.keyString.get(key);

  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new _template.Template(result, result.getTemplateElement()); // Cache the Template for this key

    templateCache.keyString.set(key, template);
  } // Cache all future queries for this TemplateStringsArray


  templateCache.stringsArray.set(result.strings, template);
  return template;
}

const templateCaches = new Map();
exports.templateCaches = templateCaches;
},{"./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.parts = void 0;

var _dom = require("./dom.js");

var _parts = require("./parts.js");

var _templateFactory = require("./template-factory.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */
const parts = new WeakMap();
/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result a TemplateResult created by evaluating a template tag like
 *     `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

exports.parts = parts;

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    (0, _dom.removeNodes)(container, container.firstChild);
    parts.set(container, part = new _parts.NodePart(Object.assign({
      templateFactory: _templateFactory.templateFactory
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

exports.render = render;
},{"./dom.js":"node_modules/lit-html/lib/dom.js","./parts.js":"node_modules/lit-html/lib/parts.js","./template-factory.js":"node_modules/lit-html/lib/template-factory.js"}],"node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.DefaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "defaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.defaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.SVGTemplateResult;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.TemplateResult;
  }
});
Object.defineProperty(exports, "directive", {
  enumerable: true,
  get: function () {
    return _directive.directive;
  }
});
Object.defineProperty(exports, "isDirective", {
  enumerable: true,
  get: function () {
    return _directive.isDirective;
  }
});
Object.defineProperty(exports, "removeNodes", {
  enumerable: true,
  get: function () {
    return _dom.removeNodes;
  }
});
Object.defineProperty(exports, "reparentNodes", {
  enumerable: true,
  get: function () {
    return _dom.reparentNodes;
  }
});
Object.defineProperty(exports, "noChange", {
  enumerable: true,
  get: function () {
    return _part.noChange;
  }
});
Object.defineProperty(exports, "nothing", {
  enumerable: true,
  get: function () {
    return _part.nothing;
  }
});
Object.defineProperty(exports, "AttributeCommitter", {
  enumerable: true,
  get: function () {
    return _parts.AttributeCommitter;
  }
});
Object.defineProperty(exports, "AttributePart", {
  enumerable: true,
  get: function () {
    return _parts.AttributePart;
  }
});
Object.defineProperty(exports, "BooleanAttributePart", {
  enumerable: true,
  get: function () {
    return _parts.BooleanAttributePart;
  }
});
Object.defineProperty(exports, "EventPart", {
  enumerable: true,
  get: function () {
    return _parts.EventPart;
  }
});
Object.defineProperty(exports, "isPrimitive", {
  enumerable: true,
  get: function () {
    return _parts.isPrimitive;
  }
});
Object.defineProperty(exports, "NodePart", {
  enumerable: true,
  get: function () {
    return _parts.NodePart;
  }
});
Object.defineProperty(exports, "PropertyCommitter", {
  enumerable: true,
  get: function () {
    return _parts.PropertyCommitter;
  }
});
Object.defineProperty(exports, "PropertyPart", {
  enumerable: true,
  get: function () {
    return _parts.PropertyPart;
  }
});
Object.defineProperty(exports, "parts", {
  enumerable: true,
  get: function () {
    return _render.parts;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.render;
  }
});
Object.defineProperty(exports, "templateCaches", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateCaches;
  }
});
Object.defineProperty(exports, "templateFactory", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateFactory;
  }
});
Object.defineProperty(exports, "TemplateInstance", {
  enumerable: true,
  get: function () {
    return _templateInstance.TemplateInstance;
  }
});
Object.defineProperty(exports, "createMarker", {
  enumerable: true,
  get: function () {
    return _template.createMarker;
  }
});
Object.defineProperty(exports, "isTemplatePartActive", {
  enumerable: true,
  get: function () {
    return _template.isTemplatePartActive;
  }
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function () {
    return _template.Template;
  }
});
exports.svg = exports.html = void 0;

var _defaultTemplateProcessor = require("./lib/default-template-processor.js");

var _templateResult = require("./lib/template-result.js");

var _directive = require("./lib/directive.js");

var _dom = require("./lib/dom.js");

var _part = require("./lib/part.js");

var _parts = require("./lib/parts.js");

var _render = require("./lib/render.js");

var _templateFactory = require("./lib/template-factory.js");

var _templateInstance = require("./lib/template-instance.js");

var _template = require("./lib/template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// TODO(justinfagnani): remove line when we get NodePart moving methods
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */

const html = (strings, ...values) => new _templateResult.TemplateResult(strings, values, 'html', _defaultTemplateProcessor.defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */


exports.html = html;

const svg = (strings, ...values) => new _templateResult.SVGTemplateResult(strings, values, 'svg', _defaultTemplateProcessor.defaultTemplateProcessor);

exports.svg = svg;
},{"./lib/default-template-processor.js":"node_modules/lit-html/lib/default-template-processor.js","./lib/template-result.js":"node_modules/lit-html/lib/template-result.js","./lib/directive.js":"node_modules/lit-html/lib/directive.js","./lib/dom.js":"node_modules/lit-html/lib/dom.js","./lib/part.js":"node_modules/lit-html/lib/part.js","./lib/parts.js":"node_modules/lit-html/lib/parts.js","./lib/render.js":"node_modules/lit-html/lib/render.js","./lib/template-factory.js":"node_modules/lit-html/lib/template-factory.js","./lib/template-instance.js":"node_modules/lit-html/lib/template-instance.js","./lib/template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/modify-template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodesFromTemplate = removeNodesFromTemplate;
exports.insertNodeIntoTemplate = insertNodeIntoTemplate;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module shady-render
 */
const walkerNodeFilter = 133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */

function removeNodesFromTemplate(template, nodesToRemove) {
  const {
    element: {
      content
    },
    parts
  } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let part = parts[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;

  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode; // End removal if stepped past the removing node

    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    } // A node to remove was found in the template


    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node); // Track node we're removing

      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    } // When removing, increment count by which to adjust subsequent part indices


    if (currentRemovingNode !== null) {
      removeCount++;
    }

    while (part !== undefined && part.index === nodeIndex) {
      // If part is in a removed node deactivate it by setting index to -1 or
      // adjust the index as needed.
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      part = parts[partIndex];
    }
  }

  nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
}

const countNodes = node => {
  let count = node.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

  while (walker.nextNode()) {
    count++;
  }

  return count;
};

const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
  for (let i = startIndex + 1; i < parts.length; i++) {
    const part = parts[i];

    if ((0, _template.isTemplatePartActive)(part)) {
      return i;
    }
  }

  return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */


function insertNodeIntoTemplate(template, node, refNode = null) {
  const {
    element: {
      content
    },
    parts
  } = template; // If there's no refNode, then put node at end of template.
  // No part indices need to be shifted in this case.

  if (refNode === null || refNode === undefined) {
    content.appendChild(node);
    return;
  }

  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let insertCount = 0;
  let walkerIndex = -1;

  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;

    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }

    while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
      // If we've inserted the node, simply adjust all subsequent parts
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }

        return;
      }

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
    }
  }
}
},{"./template.js":"node_modules/lit-html/lib/template.js"}],"node_modules/lit-html/lib/shady-render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml.svg;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml.TemplateResult;
  }
});
exports.render = void 0;

var _dom = require("./dom.js");

var _modifyTemplate = require("./modify-template.js");

var _render = require("./render.js");

var _templateFactory = require("./template-factory.js");

var _templateInstance = require("./template-instance.js");

var _templateResult = require("./template-result.js");

var _template = require("./template.js");

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Module to add shady DOM/shady CSS polyfill support to lit-html template
 * rendering. See the [[render]] method for details.
 *
 * @module shady-render
 * @preferred
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

let compatibleShadyCSSVersion = true;

if (typeof window.ShadyCSS === 'undefined') {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn(`Incompatible ShadyCSS version detected.` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and` + `@webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */


const shadyTemplateFactory = scopeName => result => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);

  let templateCache = _templateFactory.templateCaches.get(cacheKey);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };

    _templateFactory.templateCaches.set(cacheKey, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  }

  const key = result.strings.join(_template.marker);
  template = templateCache.keyString.get(key);

  if (template === undefined) {
    const element = result.getTemplateElement();

    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }

    template = new _template.Template(result, element);
    templateCache.keyString.set(key, template);
  }

  templateCache.stringsArray.set(result.strings, template);
  return template;
};

const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */

const removeStylesFromLitTemplates = scopeName => {
  TEMPLATE_TYPES.forEach(type => {
    const templates = _templateFactory.templateCaches.get(getTemplateCacheKey(type, scopeName));

    if (templates !== undefined) {
      templates.keyString.forEach(template => {
        const {
          element: {
            content
          }
        } = template; // IE 11 doesn't support the iterable param Set constructor

        const styles = new Set();
        Array.from(content.querySelectorAll('style')).forEach(s => {
          styles.add(s);
        });
        (0, _modifyTemplate.removeNodesFromTemplate)(template, styles);
      });
    }
  });
};

const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */

const prepareTemplateStyles = (renderedDOM, template, scopeName) => {
  shadyRenderSet.add(scopeName); // Move styles out of rendered DOM and store.

  const styles = renderedDOM.querySelectorAll('style'); // If there are no styles, skip unnecessary work

  if (styles.length === 0) {
    // Ensure prepareTemplateStyles is called to support adding
    // styles via `prepareAdoptedCssText` since that requires that
    // `prepareTemplateStyles` is called.
    window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
    return;
  }

  const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
  // manipulations will not prevent us from being able to fix up template
  // part indices.
  // NOTE: collecting styles is inefficient for browsers but ShadyCSS
  // currently does this anyway. When it does not, this should be changed.

  for (let i = 0; i < styles.length; i++) {
    const style = styles[i];
    style.parentNode.removeChild(style);
    condensedStyle.textContent += style.textContent;
  } // Remove styles from nested templates in this scope.


  removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
  // `template`.

  (0, _modifyTemplate.insertNodeIntoTemplate)(template, condensedStyle, template.element.content.firstChild); // Note, it's important that ShadyCSS gets the template that `lit-html`
  // will actually render so that it can update the style inside when
  // needed (e.g. @apply native Shadow DOM case).

  window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);

  if (window.ShadyCSS.nativeShadow) {
    // When in native Shadow DOM, re-add styling to rendered content using
    // the style ShadyCSS produced.
    const style = template.element.content.querySelector('style');
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else {
    // When not in native Shadow DOM, at this point ShadyCSS will have
    // removed the style from the lit template and parts will be broken as a
    // result. To fix this, we put back the style node ShadyCSS removed
    // and then tell lit to remove that node from the template.
    // NOTE, ShadyCSS creates its own style so we can safely add/remove
    // `condensedStyle` here.
    template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    (0, _modifyTemplate.removeNodesFromTemplate)(template, removes);
  }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */


const render = (result, container, options) => {
  const scopeName = options.scopeName;

  const hasRendered = _render.parts.has(container);

  const needsScoping = container instanceof ShadowRoot && compatibleShadyCSSVersion && result instanceof _templateResult.TemplateResult; // Handle first render to a scope specially...

  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
  // fragment that is reused since nested renders can occur synchronously.

  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  (0, _render.render)(result, renderContainer, Object.assign({
    templateFactory: shadyTemplateFactory(scopeName)
  }, options)); // When performing first scope render,
  // (1) We've rendered into a fragment so that there's a chance to
  // `prepareTemplateStyles` before sub-elements hit the DOM
  // (which might cause them to render based on a common pattern of
  // rendering in a custom element's `connectedCallback`);
  // (2) Scope the template with ShadyCSS one time only for this scope.
  // (3) Render the fragment into the container and make sure the
  // container knows its `part` is the one we just rendered. This ensures
  // DOM will be re-used on subsequent renders.

  if (firstScopeRender) {
    const part = _render.parts.get(renderContainer);

    _render.parts.delete(renderContainer);

    if (part.value instanceof _templateInstance.TemplateInstance) {
      prepareTemplateStyles(renderContainer, part.value.template, scopeName);
    }

    (0, _dom.removeNodes)(container, container.firstChild);
    container.appendChild(renderContainer);

    _render.parts.set(container, part);
  } // After elements have hit the DOM, update styling if this is the
  // initial render to this container.
  // This is needed whenever dynamic changes are made so it would be
  // safest to do every render; however, this would regress performance
  // so we leave it up to the user to call `ShadyCSSS.styleElement`
  // for dynamic changes.


  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};

exports.render = render;
},{"./dom.js":"node_modules/lit-html/lib/dom.js","./modify-template.js":"node_modules/lit-html/lib/modify-template.js","./render.js":"node_modules/lit-html/lib/render.js","./template-factory.js":"node_modules/lit-html/lib/template-factory.js","./template-instance.js":"node_modules/lit-html/lib/template-instance.js","./template-result.js":"node_modules/lit-html/lib/template-result.js","./template.js":"node_modules/lit-html/lib/template.js","../lit-html.js":"node_modules/lit-html/lit-html.js"}],"node_modules/lit-element/lib/updating-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatingElement = exports.notEqual = exports.defaultConverter = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty = (prop, _obj) => prop;

const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? '' : null;

      case Object:
      case Array:
        // if the value is `null` or `undefined` pass this through
        // to allow removing/no change behavior.
        return value == null ? value : JSON.stringify(value);
    }

    return value;
  },

  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;

      case Number:
        return value === null ? null : Number(value);

      case Object:
      case Array:
        return JSON.parse(value);
    }

    return value;
  }

};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */

exports.defaultConverter = defaultConverter;

const notEqual = (value, old) => {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};

exports.notEqual = notEqual;
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const microtaskPromise = Promise.resolve(true);
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
const STATE_HAS_CONNECTED = 1 << 5;
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */

class UpdatingElement extends HTMLElement {
  constructor() {
    super();
    this._updateState = 0;
    this._instanceProperties = undefined;
    this._updatePromise = microtaskPromise;
    this._hasConnectedResolver = undefined;
    /**
     * Map with keys for any properties that have changed since the last
     * update cycle with previous values.
     */

    this._changedProperties = new Map();
    /**
     * Map with keys of properties that should be reflected when updated.
     */

    this._reflectingProperties = undefined;
    this.initialize();
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */


  static get observedAttributes() {
    // note: piggy backing on this to ensure we're finalized.
    this.finalize();
    const attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays

    this._classProperties.forEach((v, p) => {
      const attr = this._attributeNameForProperty(p, v);

      if (attr !== undefined) {
        this._attributeToPropertyMap.set(attr, p);

        attributes.push(attr);
      }
    });

    return attributes;
  }
  /**
   * Ensures the private `_classProperties` property metadata is created.
   * In addition to `finalize` this is also called in `createProperty` to
   * ensure the `@property` decorator can add property metadata.
   */

  /** @nocollapse */


  static _ensureClassProperties() {
    // ensure private storage for property declarations.
    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
      this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

      const superProperties = Object.getPrototypeOf(this)._classProperties;

      if (superProperties !== undefined) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   * @nocollapse
   */


  static createProperty(name, options = defaultPropertyDeclaration) {
    // Note, since this can be called by the `@property` decorator which
    // is called before `finalize`, we ensure storage exists for property
    // metadata.
    this._ensureClassProperties();

    this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
    // it would be lost otherwise and that would never be the user's intention;
    // Instead, we expect users to call `requestUpdate` themselves from
    // user-defined accessors. Note that if the super has an accessor we will
    // still overwrite it


    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }

    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
    Object.defineProperty(this.prototype, name, {
      // tslint:disable-next-line:no-any no symbol in index
      get() {
        return this[key];
      },

      set(value) {
        // tslint:disable-next-line:no-any no symbol in index
        const oldValue = this[name]; // tslint:disable-next-line:no-any no symbol in index

        this[key] = value;

        this._requestUpdate(name, oldValue);
      },

      configurable: true,
      enumerable: true
    });
  }
  /**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   * @nocollapse
   */


  static finalize() {
    if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) && this.finalized) {
      return;
    } // finalize any superclasses


    const superCtor = Object.getPrototypeOf(this);

    if (typeof superCtor.finalize === 'function') {
      superCtor.finalize();
    }

    this.finalized = true;

    this._ensureClassProperties(); // initialize Map populated in observedAttributes


    this._attributeToPropertyMap = new Map(); // make any properties
    // Note, only process "own" properties since this element will inherit
    // any properties defined on the superClass, and finalization ensures
    // the entire prototype chain is finalized.

    if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
      const props = this.properties; // support symbols in properties (IE11 does not support this)

      const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])]; // This for/of is ok because propKeys is an array

      for (const p of propKeys) {
        // note, use of `any` is due to TypeSript lack of support for symbol in
        // index types
        // tslint:disable-next-line:no-any no symbol in index
        this.createProperty(p, props[p]);
      }
    }
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */


  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
  }
  /**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   * @nocollapse
   */


  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  /**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's
   * `converter` or `converter.fromAttribute` property option.
   * @nocollapse
   */


  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  /**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   * @nocollapse
   */


  static _propertyValueToAttribute(value, options) {
    if (options.reflect === undefined) {
      return;
    }

    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  /**
   * Performs element initialization. By default captures any pre-set values for
   * registered properties.
   */


  initialize() {
    this._saveInstanceProperties(); // ensures first update will be caught by an early access of `updateComplete`


    this._requestUpdate();
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */


  _saveInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    this.constructor._classProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];

        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }

        this._instanceProperties.set(p, value);
      }
    });
  }
  /**
   * Applies previously saved instance properties.
   */


  _applyInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    // tslint:disable-next-line:no-any
    this._instanceProperties.forEach((v, p) => this[p] = v);

    this._instanceProperties = undefined;
  }

  connectedCallback() {
    this._updateState = this._updateState | STATE_HAS_CONNECTED; // Ensure first connection completes an update. Updates cannot complete before
    // connection and if one is pending connection the `_hasConnectionResolver`
    // will exist. If so, resolve it to complete the update, otherwise
    // requestUpdate.

    if (this._hasConnectedResolver) {
      this._hasConnectedResolver();

      this._hasConnectedResolver = undefined;
    }
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */


  disconnectedCallback() {}
  /**
   * Synchronizes property values when attributes change.
   */


  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }

  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;

    const attr = ctor._attributeNameForProperty(name, options);

    if (attr !== undefined) {
      const attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


      if (attrValue === undefined) {
        return;
      } // Track if the property is being reflected to avoid
      // setting the property again via `attributeChangedCallback`. Note:
      // 1. this takes advantage of the fact that the callback is synchronous.
      // 2. will behave incorrectly if multiple attributes are in the reaction
      // stack at time of calling. However, since we process attributes
      // in `update` this should not be possible (or an extreme corner case
      // that we'd like to discover).
      // mark state reflecting


      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      } // mark state not reflecting


      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }

  _attributeToProperty(name, value) {
    // Use tracking info to avoid deserializing attribute value if it was
    // just set from a property setter.
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }

    const ctor = this.constructor;

    const propName = ctor._attributeToPropertyMap.get(name);

    if (propName !== undefined) {
      const options = ctor._classProperties.get(propName) || defaultPropertyDeclaration; // mark state reflecting

      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = // tslint:disable-next-line:no-any
      ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  /**
   * This private version of `requestUpdate` does not access or return the
   * `updateComplete` promise. This promise can be overridden and is therefore
   * not free to access.
   */


  _requestUpdate(name, oldValue) {
    let shouldRequestUpdate = true; // If we have a property key, perform property update steps.

    if (name !== undefined) {
      const ctor = this.constructor;
      const options = ctor._classProperties.get(name) || defaultPropertyDeclaration;

      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        } // Add to reflecting properties set.
        // Note, it's important that every change has a chance to add the
        // property to `_reflectingProperties`. This ensures setting
        // attribute + property reflects correctly.


        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === undefined) {
            this._reflectingProperties = new Map();
          }

          this._reflectingProperties.set(name, options);
        }
      } else {
        // Abort the request if the property should not be considered changed.
        shouldRequestUpdate = false;
      }
    }

    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._enqueueUpdate();
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */


  requestUpdate(name, oldValue) {
    this._requestUpdate(name, oldValue);

    return this.updateComplete;
  }
  /**
   * Sets up the element to asynchronously update.
   */


  async _enqueueUpdate() {
    // Mark state updating...
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
    let resolve;
    let reject;
    const previousUpdatePromise = this._updatePromise;
    this._updatePromise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    try {
      // Ensure any previous update has resolved before updating.
      // This `await` also ensures that property changes are batched.
      await previousUpdatePromise;
    } catch (e) {} // Ignore any previous errors. We only care that the previous cycle is
    // done. Any error should have been handled in the previous update.
    // Make sure the element has connected before updating.


    if (!this._hasConnected) {
      await new Promise(res => this._hasConnectedResolver = res);
    }

    try {
      const result = this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
      // enable coordinating updates with a scheduler. Note, the result is
      // checked to avoid delaying an additional microtask unless we need to.

      if (result != null) {
        await result;
      }
    } catch (e) {
      reject(e);
    }

    resolve(!this._hasRequestedUpdate);
  }

  get _hasConnected() {
    return this._updateState & STATE_HAS_CONNECTED;
  }

  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }

  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * You can override this method to change the timing of updates. If this
   * method is overridden, `super.performUpdate()` must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```
   * protected async performUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.performUpdate();
   * }
   * ```
   */


  performUpdate() {
    // Mixin instance properties once, if they exist.
    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }

    let shouldUpdate = false;
    const changedProperties = this._changedProperties;

    try {
      shouldUpdate = this.shouldUpdate(changedProperties);

      if (shouldUpdate) {
        this.update(changedProperties);
      }
    } catch (e) {
      // Prevent `firstUpdated` and `updated` from running when there's an
      // update exception.
      shouldUpdate = false;
      throw e;
    } finally {
      // Ensure element can accept additional updates after an exception.
      this._markUpdated();
    }

    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }

      this.updated(changedProperties);
    }
  }

  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update. This getter can be implemented to
   * await additional state. For example, it is sometimes useful to await a
   * rendered element before fulfilling this Promise. To do this, first await
   * `super.updateComplete` then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */


  get updateComplete() {
    return this._updatePromise;
  }
  /**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  update(_changedProperties) {
    if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
      // Use forEach so this works even if for/of loops are compiled to for
      // loops expecting arrays
      this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));

      this._reflectingProperties = undefined;
    }
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  updated(_changedProperties) {}
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */


  firstUpdated(_changedProperties) {}

}
/**
 * Marks class as having finished creating properties.
 */


exports.UpdatingElement = UpdatingElement;
UpdatingElement.finalized = true;
},{}],"node_modules/lit-element/lib/decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.property = property;
exports.query = query;
exports.queryAll = queryAll;
exports.eventOptions = exports.customElement = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
  window.customElements.define(tagName, clazz); // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.
  // tslint:disable-next-line:no-any

  return clazz;
};

const standardCustomElement = (tagName, descriptor) => {
  const {
    kind,
    elements
  } = descriptor;
  return {
    kind,
    elements,

    // This callback is called once the class is otherwise fully defined
    finisher(clazz) {
      window.customElements.define(tagName, clazz);
    }

  };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * @param tagName the name of the custom element to define
 */


const customElement = tagName => classOrDescriptor => typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);

exports.customElement = customElement;

const standardProperty = (options, element) => {
  // When decorating an accessor, pass it through and add property metadata.
  // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
  // stomp over the user's accessor.
  if (element.kind === 'method' && element.descriptor && !('value' in element.descriptor)) {
    return Object.assign({}, element, {
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    });
  } else {
    // createProperty() takes care of defining the property, but we still
    // must return some kind of descriptor, so return a descriptor for an
    // unused prototype field. The finisher calls createProperty().
    return {
      kind: 'field',
      key: Symbol(),
      placement: 'own',
      descriptor: {},

      // When @babel/plugin-proposal-decorators implements initializers,
      // do this instead of the initializer below. See:
      // https://github.com/babel/babel/issues/9260 extras: [
      //   {
      //     kind: 'initializer',
      //     placement: 'own',
      //     initializer: descriptor.initializer,
      //   }
      // ],
      // tslint:disable-next-line:no-any decorator
      initializer() {
        if (typeof element.initializer === 'function') {
          this[element.key] = element.initializer.call(this);
        }
      },

      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    };
  }
};

const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A `PropertyDeclaration` may optionally be
 * supplied to configure property features.
 *
 * @ExportDecoratedItems
 */


function property(options) {
  // tslint:disable-next-line:no-any decorator
  return (protoOrDescriptor, name) => name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @ExportDecoratedItems
 */


function query(selector) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelector(selector);
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 *
 * @ExportDecoratedItems
 */


function queryAll(selector) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelectorAll(selector);
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}

const legacyQuery = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};

const standardQuery = (descriptor, element) => ({
  kind: 'method',
  placement: 'prototype',
  key: element.key,
  descriptor
});

const standardEventOptions = (options, element) => {
  return Object.assign({}, element, {
    finisher(clazz) {
      Object.assign(clazz.prototype[element.key], options);
    }

  });
};

const legacyEventOptions = // tslint:disable-next-line:no-any legacy decorator
(options, proto, name) => {
  Object.assign(proto[name], options);
};
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifis event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 *
 *     class MyElement {
 *
 *       clicked = false;
 *
 *       render() {
 *         return html`<div @click=${this._onClick}`><button></button></div>`;
 *       }
 *
 *       @eventOptions({capture: true})
 *       _onClick(e) {
 *         this.clicked = true;
 *       }
 *     }
 */


const eventOptions = options => // Return value typed as any to prevent TypeScript from complaining that
// standard decorator function signature does not match TypeScript decorator
// signature
// TODO(kschaaf): unclear why it was only failing on this decorator and not
// the others
(protoOrDescriptor, name) => name !== undefined ? legacyEventOptions(options, protoOrDescriptor, name) : standardEventOptions(options, protoOrDescriptor);

exports.eventOptions = eventOptions;
},{}],"node_modules/lit-element/lib/css-tag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = exports.unsafeCSS = exports.CSSResult = exports.supportsAdoptingStyleSheets = void 0;

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const supportsAdoptingStyleSheets = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
exports.supportsAdoptingStyleSheets = supportsAdoptingStyleSheets;
const constructionToken = Symbol();

class CSSResult {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    }

    this.cssText = cssText;
  } // Note, this is a getter so that it's lazy. In practice, this means
  // stylesheets are not created until the first element instance is made.


  get styleSheet() {
    if (this._styleSheet === undefined) {
      // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
      // is constructable.
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();

        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }

    return this._styleSheet;
  }

  toString() {
    return this.cssText;
  }

}
/**
 * Wrap a value for interpolation in a css tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */


exports.CSSResult = CSSResult;

const unsafeCSS = value => {
  return new CSSResult(String(value), constructionToken);
};

exports.unsafeCSS = unsafeCSS;

const textFromCSSResult = value => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
/**
 * Template tag which which can be used with LitElement's `style` property to
 * set element styles. For security reasons, only literal string values may be
 * used. To incorporate non-literal values `unsafeCSS` may be used inside a
 * template string part.
 */


const css = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, constructionToken);
};

exports.css = css;
},{}],"node_modules/lit-element/lit-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  html: true,
  svg: true,
  TemplateResult: true,
  SVGTemplateResult: true
};
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml2.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml2.svg;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml2.TemplateResult;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml2.SVGTemplateResult;
  }
});
exports.LitElement = void 0;

var _litHtml = require("lit-html");

var _shadyRender = require("lit-html/lib/shady-render.js");

var _updatingElement = require("./lib/updating-element.js");

Object.keys(_updatingElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updatingElement[key];
    }
  });
});

var _decorators = require("./lib/decorators.js");

Object.keys(_decorators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _decorators[key];
    }
  });
});

var _litHtml2 = require("lit-html/lit-html.js");

var _cssTag = require("./lib/css-tag.js");

Object.keys(_cssTag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cssTag[key];
    }
  });
});

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.0.1');
/**
 * Minimal implementation of Array.prototype.flat
 * @param arr the array to flatten
 * @param result the accumlated result
 */

function arrayFlat(styles, result = []) {
  for (let i = 0, length = styles.length; i < length; i++) {
    const value = styles[i];

    if (Array.isArray(value)) {
      arrayFlat(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
}
/** Deeply flattens styles array. Uses native flat if available. */


const flattenStyles = styles => styles.flat ? styles.flat(Infinity) : arrayFlat(styles);

class LitElement extends _updatingElement.UpdatingElement {
  /** @nocollapse */
  static finalize() {
    super.finalize(); // Prepare styling that is stamped at first render time. Styling
    // is built from user provided `styles` or is inherited from the superclass.

    this._styles = this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ? this._getUniqueStyles() : this._styles || [];
  }
  /** @nocollapse */


  static _getUniqueStyles() {
    // Take care not to call `this.styles` multiple times since this generates
    // new CSSResults each time.
    // TODO(sorvell): Since we do not cache CSSResults by input, any
    // shared styles will generate new stylesheet objects, which is wasteful.
    // This should be addressed when a browser ships constructable
    // stylesheets.
    const userStyles = this.styles;
    const styles = [];

    if (Array.isArray(userStyles)) {
      const flatStyles = flattenStyles(userStyles); // As a performance optimization to avoid duplicated styling that can
      // occur especially when composing via subclassing, de-duplicate styles
      // preserving the last item in the list. The last item is kept to
      // try to preserve cascade order with the assumption that it's most
      // important that last added styles override previous styles.

      const styleSet = flatStyles.reduceRight((set, s) => {
        set.add(s); // on IE set.add does not return the set.

        return set;
      }, new Set()); // Array.from does not work on Set in IE

      styleSet.forEach(v => styles.unshift(v));
    } else if (userStyles) {
      styles.push(userStyles);
    }

    return styles;
  }
  /**
   * Performs element initialization. By default this calls `createRenderRoot`
   * to create the element `renderRoot` node and captures any pre-set values for
   * registered properties.
   */


  initialize() {
    super.initialize();
    this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
    // element's getRootNode(). While this could be done, we're choosing not to
    // support this now since it would require different logic around de-duping.

    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */


  createRenderRoot() {
    return this.attachShadow({
      mode: 'open'
    });
  }
  /**
   * Applies styling to the element shadowRoot using the `static get styles`
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */


  adoptStyles() {
    const styles = this.constructor._styles;

    if (styles.length === 0) {
      return;
    } // There are three separate cases here based on Shadow DOM support.
    // (1) shadowRoot polyfilled: use ShadyCSS
    // (2) shadowRoot.adoptedStyleSheets available: use it.
    // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
    // rendering


    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s => s.cssText), this.localName);
    } else if (_cssTag.supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map(s => s.styleSheet);
    } else {
      // This must be done after rendering so the actual style insertion is done
      // in `update`.
      this._needsShimAdoptedStyleSheets = true;
    }
  }

  connectedCallback() {
    super.connectedCallback(); // Note, first update/render handles styleElement so we only call this if
    // connected after first update.

    if (this.hasUpdated && window.ShadyCSS !== undefined) {
      window.ShadyCSS.styleElement(this);
    }
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * * @param _changedProperties Map of changed properties with old values
   */


  update(changedProperties) {
    super.update(changedProperties);
    const templateResult = this.render();

    if (templateResult instanceof _litHtml.TemplateResult) {
      this.constructor.render(templateResult, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      });
    } // When native Shadow DOM is used but adoptedStyles are not supported,
    // insert styling after rendering to ensure adoptedStyles have highest
    // priority.


    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;

      this.constructor._styles.forEach(s => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */


  render() {}

}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 */


exports.LitElement = LitElement;
LitElement.finalized = true;
/**
 * Render method used to render the lit-html TemplateResult to the element's
 * DOM.
 * @param {TemplateResult} Template to render.
 * @param {Element|DocumentFragment} Node into which to render.
 * @param {String} Element name.
 * @nocollapse
 */

LitElement.render = _shadyRender.render;
},{"lit-html":"node_modules/lit-html/lit-html.js","lit-html/lib/shady-render.js":"node_modules/lit-html/lib/shady-render.js","./lib/updating-element.js":"node_modules/lit-element/lib/updating-element.js","./lib/decorators.js":"node_modules/lit-element/lib/decorators.js","lit-html/lit-html.js":"node_modules/lit-html/lit-html.js","./lib/css-tag.js":"node_modules/lit-element/lib/css-tag.js"}],"src/autocomplete-intput.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutocompleteInput = void 0;

var _litElement = require("lit-element");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let AutocompleteInput = class AutocompleteInput extends _litElement.LitElement {
  constructor() {
    super(...arguments);
    this.results = [];
    this.suggestions = [];
  }

  onInput(e) {
    if (this.input && this.result) {
      if (this.input.value.length === 0) {
        this.results = [];
        return;
      }

      const regex = new RegExp(this.input.value, 'gi');
      const results = this.suggestions.filter(x => regex.test(x)).map(x => this.createResultElement(x, regex));
      this.results = results;
    }
  }

  onKeyDown(e) {
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

  createResultElement(result, regex) {
    const element = document.createElement('div');
    element.innerHTML = `<button type="button">${result.replace(regex, '<b>$&</b>')}</button>`;
    return element;
  }

  resultClick(e) {
    const search = e.path[0].innerText.trim();
    console.log(search);

    if (this.input && search) {
      this.input.value = search;
      this.dispatchSearch(search);
    }
  }

  dispatchSearch(search) {
    this.dispatchEvent(new CustomEvent('search', {
      detail: {
        search
      }
    }));
    this.results = [];
  }

  clearSearch() {
    if (this.input) {
      this.input.value = '';
    }
  }

  render() {
    return _litElement.html`
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
          ${this.results.map(x => _litElement.html`
                <div @click=${this.resultClick}>${x}</div>
              `)}
        </div>
      </div>
    `;
  }

};
exports.AutocompleteInput = AutocompleteInput;

__decorate([(0, _litElement.query)('input')], AutocompleteInput.prototype, "input", void 0);

__decorate([(0, _litElement.query)('.result')], AutocompleteInput.prototype, "result", void 0);

__decorate([(0, _litElement.property)({
  type: Array
})], AutocompleteInput.prototype, "results", void 0);

__decorate([(0, _litElement.property)({
  type: Array
})], AutocompleteInput.prototype, "suggestions", void 0);

exports.AutocompleteInput = AutocompleteInput = __decorate([(0, _litElement.customElement)('autocomplete-input')], AutocompleteInput);
},{"lit-element":"node_modules/lit-element/lit-element.js"}],"src/suggestions.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUGGESTIONS = void 0;
const SUGGESTIONS = ['A', 'Abandone', 'Abi', 'Abilite', 'Abitid', 'Abiye', 'Ablabla', 'Aboli', 'Abolisyon', 'Abondans', 'Abònman', 'Abouti', 'Abrevyasyon', 'Absid', 'Abstrak', 'Abstraksyon', 'Adaptasyon', 'Adapte', 'Adeziv', 'Adisyon', 'Adjwen', 'Admirasyon', 'Admisyon', 'Adolesans', 'Adopsyon', 'Adopte', 'Adore', 'Adousi', 'Adrès', 'Afrik', 'Afriken', 'Afwonte', 'Agiman', 'Agrandi', 'Agrikilti', 'Ajan', 'Ajans', 'Ajantin', 'Aje', 'Ajen', 'Aji', 'Ajil', 'Ajiste', 'Ajisteman', 'Ajoupa', 'Ajoute', 'Akademi', 'Akayè', 'Akizatè', 'Akizasyon', 'Akize', 'Akonplisman', 'Akoushe', 'Akoushman', 'Aksan', 'Akselere', 'Aksepte', 'Aksidan', 'Aksyon', 'Aktè', 'Aktif', 'Aktivite', 'Aktyalite', 'Ale', 'Alfabèt', 'Alimèt', 'Aliye', 'Almanak', 'Almay', 'Alo', 'Altènatif', 'Altitid', 'Alyans', 'Amandman', 'Amatè', 'Amelyore', 'Amerik', 'Ameriken', 'An', 'Analiz', 'Analize', 'Anba', 'Anbake', 'Anbwate', 'Andante', 'Andedan', 'Andeyò', 'Andiyèt', 'Andòmi', 'Ane', 'Anèftali', 'Anfounen', 'Ang', 'Anglè', 'Angletè', 'Anglouti', 'Anile', 'Anilè', 'Anivèsè', 'Anniye', 'Anpeshe', 'Anpeshman', 'Anpil', 'Anplwa', 'Anplwaye', 'Anprizone', 'Anprizónman', 'Anrejistre', 'Ansent', 'Answouj', 'Ansyen', 'Antann', 'Antant', 'Antèn', 'Antere', 'Antibyotik', 'Antikite', 'Antiseptik', 'Antoure', 'Antrav', 'Antrave', 'Antravè', 'Antrénman', 'Anvan', 'Anvi', 'Anviwon', 'Anvlòp', 'Anvlope', 'Anyen', 'Ap', 'Aparans', 'Apèl', 'Apèn', 'Apèsi', 'Apeti', 'Apetisan', 'Apiye', 'Aplati', 'Aplikasyon', 'Aplike', 'Aplodi', 'Aplodisman', 'Apostwòf', 'Apot', 'Aprann', 'Apranti', 'Aprantisaj', 'Apre', 'Apresysyon', 'Apresye', 'Apwoshe', 'Apwouve', 'Aranjman', 'Areye', 'Arestasyon', 'Arete', 'Aristokrasi', 'Aristokrat', 'Aristokratik', 'Aritmetik', 'Asanble', 'Asasen', 'Asasinen', 'Ase', 'Asha', 'Asheve', 'Ashitèk', 'Ashte', 'Ashtè', 'Asid', 'Asirans', 'Asire', 'Asistan', 'Asistans', 'Asosyasyon', 'Asosye', 'Asyèt', 'Atak', 'Atake', 'Atakè', 'Atansyon', 'Atantif', 'Atashe', 'Atè', 'Ateri', 'Aterisaj', 'Aterisman', 'Atifisyèl', 'Atik', 'Atirans', 'Atire', 'Atis', 'Atistik', 'Atitid', 'Atizan', 'Atizana', 'Atlèt', 'Atletik', 'Atraksyon', 'Atraktif', 'Avans', 'Avanse', 'Avantaj', 'Avanyè', 'Avègleman', 'Avèk', 'Avèti', 'Avni', 'Avoka', 'Avòtman', 'Avril', 'Avwán', 'Avwe', 'Avyatè', 'Avyon', 'Ayiti', 'Aza', 'Azi', 'B', 'Bag', 'Bagay', 'Bakaloreya', 'Bal', 'Balans', 'Balanse', 'Balansin', 'Balèn', 'Balkon', 'Ban', 'Banal', 'Banana', 'Band', 'Bande', 'Bandi', 'Bank', 'Bankèt', 'Bannann', 'Baraj', 'Bare', 'Basen', 'Bashelye', 'Baskèt', 'Bat', 'Batay', 'Batèm', 'Batiman', 'Batize', 'Bato', 'Baton', 'Batri', 'Bay', 'Bayonèt', 'Baz', 'Baze', 'Bè', 'Bebe', 'Bèbè', 'Bèf', 'Bege', 'Bèj', 'Bèk', 'Bèlfi', 'Beliz', 'Bèljik', 'Bèlmè', 'Bèlsè', 'Benediksyon', 'Benefis', 'Benefisye', 'Benefisyè', 'Beni', 'Benyen', 'Bere', 'Berejèn', 'Bese', 'Bèso', 'Bèt', 'Betiz', 'Betize', 'Betizè', 'Bezig', 'Bezwen', 'Bib', 'Bibliyotèk', 'Biblo', 'Bibwon', 'Bijou', 'Bip', 'Bipè', 'Bis', 'Bisiklèt', 'Biwo', 'Biyè', 'Biznis', 'Blag', 'Blage', 'Blagè', 'Blam', 'Blame', 'Blan', 'Blanshi', 'Blaze', 'Ble', 'Blese', 'Blofe', 'Bloke', 'Bo', 'Bò', 'Bobin', 'Bobine', 'Bòdi', 'Bòfrè', 'Bòpè', 'Bòkò', 'Bòl', 'Bòlèt', 'Bon', 'Bòn', 'Bonm', 'Bonbade', 'Bonbon', 'Bondi', 'Bondye', 'Bonjou', 'Bonswa', 'Bonte', 'Bòs', 'Bosou', 'Boubou', 'Bouboun', 'Bouda', 'Bouden', 'Bouji', 'Boujonnen', 'Boujwa', 'Bouk', 'Boukan', 'Boukannen', 'Bouki', 'Boukina Faso', 'Boukle', 'Boul', 'Boulanje', 'Boule', 'Boulèt', 'Boulon', 'Boulonnen', 'Boulva', 'Boulvèse', 'Boum', 'Bourik', 'Bourike', 'Bous', 'Boush', 'Boushe', 'Bouskile', 'Bout', 'Boutèy', 'Bouton', 'Boutonnen', 'Bouyi', 'Bouyon', 'Bouzen', 'Bòy', 'Brezil', 'Bri', 'Brik', 'Brile', 'Bwa', 'Bwadòm', 'Bwase', 'Bwasè', 'Bwat', 'Bwè', 'Bwòs', 'Bwose', 'Bwosè', 'Byè', 'Byen', 'Byenfè', 'Byenfezan', 'Byenfezans', 'Byenveyan', 'Byenveyans', 'C', 'Cadillac', 'Canada', 'Cap-Haïtien', 'Chevrolet', 'Chrysler', 'CPU', 'Croix-des-Bouquets', 'Croix-des-Missions', 'D', 'Dam', 'Damye', 'Damyen', 'Dan', 'Danje', 'Dans', 'Danse', 'Dansè', 'Danti', 'Dantis', 'Dantisyon', 'De', 'Debake', 'Defèt', 'Defini', 'Definisyon', 'Degobe', 'Degre', 'Dekòde', 'Dekorasyon', 'Dekoud', 'Dekouvri', 'Dekrase', 'Delivre', 'Demisyon', 'Demisyone', 'Demoli', 'Demolisyon', 'Demonstrasyon', 'Demwazèl', 'Depatcha', 'Depatman', 'Depite', 'Depo', 'Deposede', 'Depoze', 'Depozit', 'Deraye', 'Desandan', 'Desanm', 'Desann', 'Desè', 'Desepsyon', 'Deshay', 'Deshennen', 'Deshouke', 'Deshoukè', 'Desi', 'Desinatè', 'Desine', 'Desizyon', 'Destinasyon', 'Destinatè', 'Destine', 'Dèt', 'Detant', 'Detere', 'Detire', 'Detounman', 'Detri', 'Devan', 'Devanjou', 'Devanti', 'Devastasyon', 'Devaste', 'Devègonde', 'Devine', 'Devire', 'Devlope', 'Devlopè', 'Devlopman', 'Devwa', 'Dewoute', 'Dèyè', 'Deyò', 'Dezòd', 'Dezòdone', 'Dezole', 'Di', 'Dife', 'Diferans', 'Diferansye', 'Digo', 'Diksyon', 'Diksyonè', 'Dikte', 'Dimansh', 'Dire', 'Dirèk', 'Direksyon', 'Diri', 'Dirijan', 'Dirije', 'Dirijè', 'Dis', 'Disèt', 'Disètasyon', 'Diskèt', 'Diskou', 'Disparèt', 'Dispozisyon', 'Divage', 'Divagè', 'Divan', 'Diven', 'Divèti', 'Divètisman', 'Divine', 'Divinè', 'Divinite', 'Divinò', 'Divize', 'Divizyon', 'Diznèf', 'Dizuit', 'Djab', 'Djagwasil', 'Djakout', 'Djo', 'Djòb', 'Djòl', 'Dlo', 'Do', 'Dodge', 'Dokiman', 'Dokimantasyon', 'Dokimante', 'Dokimantè', 'Doktè', 'Dola', 'Domestik', 'Dòmi', 'Domine', 'Dominikani', 'Dominiken', 'Domino', 'Don', 'Done', 'Dosil', 'Dosye', 'Doulè', 'Dous', 'Dousè', 'Douvan', 'Douz', 'Douzèn', 'Dra', 'Drapo', 'Dwa', 'Dwat', 'Dwate', 'Dwèt', 'Dwòl', 'Dyamèt', 'Dyare', 'E', 'Èd', 'Ede', 'Edmi', 'Èdtan', 'Efase', 'Efasè', 'Egal', 'Egzamen', 'Egzamine', 'Egzanp', 'Egzante', 'Egzantè', 'Egzat', 'Ejakile', 'Ekip', 'Eklèsi', 'Eklèsisman', 'Ekoloji', 'Ekonomi', 'Ekonomize', 'Ekran', 'Ekri', 'Ekriti', 'Ekriven', 'Ekselans', 'Eksitan', 'Eksite', 'Eksploze', 'Ekspoze', 'Ekspozisyon', 'Ekzekisyon', 'Ekzekite', 'Ekzekitè', 'Ekzile', 'Elektrik', 'Elektrisite', 'Eleman', 'Eli', 'Elikoptè', 'En', 'Endèks', 'Endepandans', 'Endispoze', 'Enfekte', 'Enfini', 'Enfòmasyon', 'Enjenyè', 'Enka', 'Enkyetid', 'Enpak', 'Enpe', 'Enpè', 'Enpo', 'Enprime', 'Enprimè', 'Ensh', 'Enstale', 'Entènèt', 'Enterè', 'Enterese', 'Entèwogasyon', 'Entim', 'Entwodiksyon', 'Envestige', 'Envizib', 'Epesè', 'Epi', 'Epis', 'Ès', 'Eshèk', 'Eshwe', 'Esklav', 'Esoufle', 'Espas', 'Espri', 'Estasyon', 'Estasyone', 'Estidyo', 'Eta', 'Etazini', 'Etèn', 'Etènèl', 'Etid', 'Etidyan', 'Etidye', 'Etikèt', 'Etónman', 'Etwal', 'Etyoupi', 'Evolisyon', 'Evolye', 'Ewòp', 'Èzili', 'F', 'Fa', 'Faks', 'Falèz', 'Famasi', 'Fanm', 'Fanmòt', 'Fann', 'Fant', 'Fantastik', 'Farin', 'Farinay', 'Farinen', 'Fashe', 'Fatra', 'Favè', 'Fay', 'Fè', 'Fèb', 'Feblès', 'Fèmen', 'Fen', 'Fenèt', 'Fènwa', 'Ferari', 'Fèt', 'Fete', 'Fevriye', 'Fèy', 'Feyaj', 'Feye', 'Feyè', 'Fi', 'Fig', 'Fikse', 'Filaman', 'Filè', 'Filipin', 'Filyè', 'Fini', 'Finisman', 'Fiyansay', 'Fiyanse', 'Fizi', 'Fizik', 'Fizisyen', 'Fizye', 'Flamab', 'Flè', 'Fleri', 'Flèsh', 'Flèv', 'Foli', 'Fòm', 'Fòmasyon', 'Fòme', 'Fon', 'Fonksyon', 'Fonn', 'Fonse', 'Ford', 'Fotokopi', 'Fou', 'Foul', 'Foure', 'Foutbòl', 'Fran', 'Frans', 'Fransè', 'Frape', 'Frè', 'Fredi', 'Frèt', 'Fri', 'Frijidè', 'Fwomaj', 'Fwon', 'Fwonte', 'Fyèl', 'G', 'Gade', 'Gadè', 'Gadjèt', 'Gagè', 'Galan', 'Galèt', 'Galita', 'Galri', 'Ganmèl', 'Gason', 'Gaz', 'Gazèl', 'Gazon', 'Ge', 'Gèmen', 'Gen', 'GMC', 'Genyen', 'Gete', 'Gildiv', 'Ginen', 'Gita', 'Giyon', 'Giyonnen', 'Glas', 'Glase', 'Gode', 'Gòl', 'Gonayiv', 'Gonbo', 'Gou', 'Goud', 'Gouman', 'Goumandiz', 'Gous', 'Gout', 'Goute', 'Goutè', 'Gouvènman', 'Gouvènmantal', 'Gouyad', 'Gouye', 'Goyin', 'Gra', 'Gradye', 'Gradyasyon', 'Graj', 'Graje', 'Gramè', 'Gran', 'Grandè', 'Grandi', 'Grandizè', 'Grangou', 'Granmesi', 'Granmoun', 'Grann', 'Grannivyè', 'Granvensan', 'Grap', 'Gravite', 'Grèk', 'Grenadya', 'Grenn', 'Grip', 'Gripe', 'Griye', 'Gwatemala', 'Gwayamouk', 'Gwayav', 'Gwo', 'Gwonde', 'Gwòs', 'Gwosè', 'Gwosès', 'Gwoup', 'Gwoswòsh', 'H', 'Harley Davidson', 'Honda', 'Hyundai', 'I', 'Idantifikasyon', 'Ideyal', 'Il', 'Iletre', 'Imaj', 'Imajine', 'Imigran', 'Imigrasyon', 'Imigre', 'Imitasyon', 'Imite', 'Imobilize', 'Infiniti', 'Inifòm', 'Inik', 'Inivè', 'Inivèsite', 'Inosan', 'Inyon', 'Ipokrit', 'Ipokrizi', 'Irak', 'Iran', 'Istoryen', 'Istwa', 'Isuzu', 'Italik', 'Itilizatè', 'Itilize', 'Izin', 'J', 'Jaden', 'Jakmèl', 'Janb', 'Janbe', 'Jandam', 'Jant', 'Jante', 'Janvye', 'Japan', 'Jape', 'Je', 'Jedi', 'Jedinèt', 'Jeep', 'Jèmen', 'Jèn', 'Jeneral', 'Jenerasyon', 'Jeni', 'Jennen', 'Jenou', 'Jeograf', 'Jeografi', 'Jeremi', 'Jès', 'Jezi Kris', 'Ji', 'Jij', 'Jijman', 'Jistis', 'Jiyè', 'Jodia', 'Jon', 'Jón', 'Jou', 'Jounal', 'Jounalye', 'Jounen', 'Joure', 'Jwe', 'Jwèt', 'Jwi', 'Jwisans', 'Jyen', 'K', 'Ka', 'Kabrit', 'Kadav', 'Kadejak', 'Kadran', 'Kadriyaj', 'Kafe', 'Kafetyè', 'Kafou', 'Kaka', 'Kako', 'Kalalou', 'Kalbas', 'Kale', 'Kakas', 'Kalkilatè', 'Kakile', 'Kalme', 'Kalson', 'Kamera', 'Kamyon', 'Kamyonèt', 'Kan', 'Kana', 'Kanada', 'Kandida', 'Kanè', 'Kanèl', 'Kanif', 'Kanmenm', 'Kann', 'Kannari', 'Kanni', 'Kannistè', 'Kanno', 'Kanpe', 'Kanperen', 'Kanpèsh', 'Kanson', 'Kansonfè', 'Kantin', 'Kantite', 'Kapab', 'Kapasite', 'Kap-Ayisyen', 'Kapital', 'Kaporal', 'Karant', 'Kare', 'Karese', 'Karyoka', 'Kasav', 'Kase', 'Kasèt', 'Kash', 'Kashe', 'Kaskad', 'Kat', 'Katab', 'Kategori', 'Katon', 'Katòz', 'Katreven', 'Katreven-en', 'Katye', 'Kavo', 'Kaw', 'Kawòt', 'Kawotchou', 'Kay', 'Kaye', 'Kayèt', 'Kayiman', 'Kayimit', 'Ke', 'Kè', 'Kèk', 'Kèktan', 'Kenbe', 'Kenkay', 'Kenskòf', 'Kenz', 'Kès', 'Kesyon', 'Kesyonè', 'Kèt', 'Keyi', 'Ki', 'Kilbite', 'Kilomèt', 'Kilòt', 'Kiltivatè', 'Kiltive', 'Kim', 'Kimen', 'Kisa', 'Kite', 'Kiyès', 'Kizin', 'Klaksonn', 'Klaksonnen', 'Klasik', 'Klate', 'Klavye', 'Kle', 'Klere', 'Kleren', 'Klè', 'Klewon', 'Kò', 'Kòb', 'Kòd', 'Kòk', 'Koke', 'Koken', 'Kokennshenn', 'Kokèt', 'Kokoye', 'Kòlèt', 'Kolizyon', 'Kolon', 'Kolonèl', 'Koloni', 'Kolonize', 'Kòmand', 'Kòmandan', 'Kòmande', 'Komandè', 'Komè', 'Komedyen', 'Komès', 'Komèsan', 'Komèsyal', 'Komik', 'Kominikasyon', 'Kominote', 'Kominotè', 'Kominyon', 'Komisyon', 'Kòn', 'Konbatan', 'Konbit', 'Kondi', 'Kondisyon', 'Konesans', 'Konfiti', 'Konfrefò', 'Konfwonte', 'Konfyans', 'Konfye', 'Kongo', 'Konje', 'Konkèt', 'Konkete', 'Konklizyon', 'Konkou', 'Konnen', 'Konpakdis', 'Konpanyen', 'Konpatriyòt', 'Konpè', 'Konpliman', 'Konplo', 'Konprann', 'Konsa', 'Konsè', 'Konsepsyon', 'Konsève', 'Konsèy', 'Konseye', 'Konsolasyon', 'Konstitisyon', 'Konstriksyon', 'Konstriktè', 'Konstwi', 'Konsyans', 'Konsyantizasyon', 'Kont', 'Kontab', 'Kontablite', 'Kontan', 'Kontante', 'Kontantman', 'Konte', 'Kontè', 'Kontinan', 'Kontinye', 'Kontra', 'Kontraksyon', 'Kontrakte', 'Kontraktè', 'Kontre', 'Kontrè', 'Kontrekare', 'Kontribisyon', 'Kontribye', 'Kontwòl', 'Kontwole', 'Kontwolè', 'Konvansyon', 'Konyen', 'Kopye', 'Koresponn', 'Koridò', 'Koshon', 'Kòt', 'Kote', 'Kotri', 'Kou', 'Koubèland', 'Koud', 'Koudeta', 'Koukouy', 'Koule', 'Koulè', 'Koulèv', 'Kounouk', 'Koupe', 'Koupè', 'Kouran', 'Kouri', 'Kous', 'Koush', 'Koushe', 'Koushè', 'Koushèt', 'Kout', 'Koute', 'Kouti', 'Koutim', 'Koutiryè', 'Koutize', 'Kouto', 'Koutye', 'Kouve', 'Kouvreli', 'Kouvri', 'Kouwòn', 'Kouwonnen', 'Kouzen', 'Kouzin', 'Kouvè', 'Kòve', 'Koyo', 'Koze', 'Kòzè', 'Krab', 'Krabye', 'Krabinay', 'Krabinen', 'Krapo', 'Kras', 'Kraze', 'Krazè', 'Krèm', 'Krèt', 'Kreten', 'Kretyen', 'Kreve', 'Krevè', 'Kreyatè', 'Kreyati', 'Kreye', 'Kreyòl', 'Kribish', 'Krim', 'Kritik', 'Kritike', 'Kriye', 'Kuis', 'Kwa', 'Kwadèboukè', 'Kwadèmisyon', 'Kwasan', 'Kwasans', 'Kwaze', 'Kwen', 'Kwenn', 'Kwit', 'L', 'La', 'Labou', 'Labouyi', 'Lagonav', 'Lafyèv', 'Lage', 'Lagè', 'Lagon', 'La Gonâve', 'Lagoun', 'Laj', 'Lajan', 'Lajè', 'Lajònis', 'Lakansyèl', 'Lakay', 'Lakomin', 'Lakou', 'Lakrè', 'Lalin', 'Lalo', 'Lalwa', 'Lalwèt', 'Lamantasyon', 'Lamante', 'Lamveritab', 'Lan', 'Lanati', 'Lanfè', 'Lang', 'Langèt', 'Lanmè', 'Lanmen', 'Lanmidon', 'Lanmò', 'Lanmou', 'Lanmourèz', 'Lans', 'Lantouray', 'Lapè', 'Lapenn', 'Lapli', 'Laponyèt', 'Lapòs', 'Larivyè', 'Las', 'Lashe', 'Lasho', 'Lasi', 'Latanyen', 'Laten', 'Latibonit', 'Latitid', 'Latriye', 'Lavalas', 'Lavant', 'Lave', 'Lavi', 'Lavil', 'Lè', 'Legal', 'Legalizasyon', 'Legim', 'Legliz', 'Lejand', 'Lekti', 'Lemond', 'Lendi', 'Lenmò', 'Lenno', 'Lès', 'Lesiv', 'Lesivè', 'Lespri', 'Lestomak', 'Lèt', 'Leta', 'Leti', 'Lètyè', 'Leve', 'Lexus', 'Li', 'Lib', 'Libète', 'Librèri', 'Lil', 'Lim', 'Limen', 'Limit', 'Limonad', 'Limonade', 'Limyè', 'Linèt', 'Lis', 'Lisans', 'Literati', 'Literè', 'Liv', 'Livre', 'Livrezon', 'Liy', 'Lokal', 'Lokalize', 'Lokatè', 'Long', 'Longè', 'Lonjitid', 'Lonn', 'Lonnen', 'Lontan', 'Loray', 'Lou', 'Lougawou', 'Loup', 'Loushèt', 'Lwa', 'Lwaye', 'Lwayote', 'Lwe', 'Lwen', 'Lwès', 'Lwil', 'Lyann', 'M', 'Mabouya', 'Madanm', 'Madi', 'Madmwazèl', 'Maïssade', 'Majè', 'Majeste', 'Majestik', 'Majistra', 'Majò', 'Majorite', 'Mak', 'Make', 'Makè', 'Makiyaj', 'Makiye', 'Makout', 'Mal', 'Maladi', 'Malè', 'Malere', 'Malfezan', 'Malfezans', 'Malis', 'Malkadi', 'Malpwoprete', 'Maltrete', 'Malveyan', 'Mamit', 'Manba', 'Manbo', 'Manda', 'Mande', 'Mandyan', 'Mango', 'Manje', 'Manjè', 'Manke', 'Manman', 'Mannivèl', 'Mansh', 'Manshèt', 'Mantal', 'Mantè', 'Manti', 'Manyen', 'Manyòk', 'Marande', 'Marasa', 'Mare', 'Mari', 'Mark', 'Maryaj', 'Marye', 'Mas', 'Masak', 'Masakre', 'Masakrè', 'Mashandiz', 'Mashann', 'Mashe', 'Mashin', 'Mason', 'Masonn', 'Masonnen', 'Matematik', 'Matematik Yo', 'Matla', 'Mawon', 'Mawonaj', 'Mayi', 'Mayisad', 'Mayonèz', 'Mazda', 'Me', 'Mè', 'Medam', 'Mèg', 'Megri', 'Mèkredi', 'Meksik', 'Melankoli', 'Melankolik', 'Memwa', 'Memorize', 'Men', 'Menm', 'Menmsi', 'Mennen', 'Mercedes', 'Mesaj', 'Mesaje', 'Mesajè', 'Mèsi', 'Meshan', 'Mestin', 'Mesye', 'Mesye!', 'Mèt', 'Mete', 'Meteyoloji', 'Mètrès', 'Mi', 'Miba', 'Mibalè', 'Microwave', 'Mikwo', 'Mikwòb', 'Mikwoskòp', 'Mil', 'Milat', 'Milèt', 'Milisyen', 'Militè', 'Militon', 'Miltiplikasyon', 'Milya', 'Milye', 'Milyon', 'Milyonè', 'Minit', 'Minorite', 'Mirbalais', 'Mit', 'Mitan', 'Mitonnen', 'Mitrayèz', 'Mitsubishi', 'Mize', 'Mizè', 'Mizik', 'Mizikal', 'Mizisyen', 'Mòd', 'Mòde', 'Modi', 'Mòn', 'Moniman', 'Monitè', 'Monnen', 'Monseyè', 'Monte', 'Montè', 'Montre', 'Monwi', 'Mòpyon', 'Motivasyon', 'Motosiklèt', 'Mòtye', 'Moulen', 'Moun', 'Mouri', 'Moush', 'Moushwa', 'Mouton', 'Mouye', 'Mov', 'Move', 'Mozayik', 'Mwa', 'Mwatye', 'Mwayen', 'Mwayèn', 'Mwayènaj', 'Mwen', 'Mwens', 'Myèl', 'N', 'Naje', 'Najè', 'Nan', 'Nanm', 'Nannan', 'Nasyon', 'Nasyonal', 'Nasyonalite', 'Nati', 'Natirèl', 'Ne', 'Nè', 'Nèf', 'Nèg', 'Negatif', 'Nègès', 'Nèj', 'Nen', 'Nesesè', 'Nesesite', 'Netwayaj', 'Netwaye', 'New York', 'Nikaragwa', 'Nimewo', 'Nimewote', 'Nissan', 'Nò', 'Nòmal', 'Nòmalize', 'Non', 'Nòt', 'Nou', 'Nouri', 'Nouris', 'Nouriti', 'Nouvèl', 'Nouvo', 'Novanm', 'Nòvèj', 'Nwa', 'Nwasi', 'Nwaye', 'Nwèl', 'Nyaj', 'O', 'Obsede', 'Òdinatè', 'Oditè', 'Odyans', 'Ofri', 'Òganizasyon', 'Ogmantasyon', 'Ogmante', 'Okay', 'Òkèt', 'Oktòb', 'Okton', 'Onbwèl', 'Ond', 'Ondiras', 'Onz', 'Opalè', 'Operasyon', 'Opoze', 'Opozisyon', 'Orikilè', 'Orizontal', 'Oseyan', 'Oseyanik', 'Ostrali', 'Otèl', 'Oto', 'Otobis', 'Òtograf', 'Otomatik', 'Otomobil', 'Otonomi', 'Otorite', 'Otorizasyon', 'Otorize', 'Otowout', 'Otrefwa', 'Ou', 'Oumenm', 'Out', 'Ouvè', 'Ouvri', 'Oval', 'Ovil', 'Ovile', 'Ozalantou', 'P', 'Pa', 'Paj', 'Pak', 'Pakapala', 'Pakoti', 'Pale', 'Palè', 'Palisad', 'Palmis', 'Pandye', 'Pans', 'Panse', 'Pansè', 'Pantalon', 'Panyen', 'Panyòl', 'Pap', 'Papa', 'Papay', 'Papye', 'Paradi', 'Paranòy', 'Paranoya', 'Parasòl', 'Parese', 'Parèt', 'Parèy', 'Paryaj', 'Parye', 'Pasan', 'Pasay', 'Pase', 'Pasifik', 'Pastan', 'Pasyon', 'Pasyone', 'Pat', 'Patat', 'Pati', 'Patiraj', 'Patisipan', 'Patisipasyon', 'Patisipe', 'Patizan', 'Patriyòt', 'Patriyotik', 'Patriyotism', 'Pawòl', 'Pay', 'Pe', 'Pè', 'Pèkizisyon', 'Pèlen', 'Pèsekisyon', 'Pelig', 'Peligre', 'Pèmisyon', 'Pen', 'Penalize', 'Penensil', 'Peng', 'Pengwen', 'Pens', 'Penso', 'Penti', 'Pentire', 'Pentium', 'Peny', 'Penyen', 'Pèp', 'Perimèt', 'Pèsiste', 'Peso', 'Pèsonèl', 'Petion-Ville', 'Petyonvil', 'Pewou', 'Peye', 'Peyi', 'Peyizan', 'Piblik', 'Pibliye', 'Pikan', 'Pike', 'Pil', 'Pilon', 'Pilonnen', 'Pilòt', 'Pilote', 'Pilye', 'Piman', 'Pini', 'Pipi', 'Pipirit', 'Pistash', 'Pitimi', 'Pitit', 'Pitza', 'Piyajè', 'Piyay', 'Piye', 'Piyon', 'Plak', 'Plan', 'Plane', 'Planèt', 'Planifye', 'Plant', 'Plantasyon', 'Plante', 'Plantè', 'Plas', 'Plati', 'Plat', 'Plato Santral', 'Plen', 'Plenn', 'Plenyen', 'Plezi', 'Pli', 'Plim', 'Plis', 'Plizyè', 'Ploge', 'Plonje', 'Pò', 'Pòdepè', 'Poetik', 'Poezi', 'Pokè', 'Poko', 'Pòl', 'Polarizasyon', 'Polèn', 'Polis', 'Polisye', 'Politik', 'Politisyen', 'Polòy', 'Pòmdetè', 'Ponp', 'Ponpye', 'Pontiac', 'Ponyèt', 'Popilarite', 'Popilasyon', 'Popilè', 'Port-de-Paix', 'Posede', 'Pòsh', 'Posib', 'Posiblite', 'Poste', 'Postitisyon', 'Pòtatif', 'Pote', 'Pòtigè', 'Pòtoprens', 'Pòtray', 'Pou', 'Poud', 'Poul', 'Poule', 'Poulèt', 'Poupou', 'Pous', 'Poushon', 'Pousib', 'Pousyè', 'Pouvwa', 'Pòv', 'Povrete', 'Poze', 'Pozisyon', 'Pozitif', 'Pran', 'Predesesè', 'Premye', 'Prepare', 'Près', 'Presbitè', 'Prese', 'Prèskil', 'Preskri', 'Preskripsyon', 'Prete', 'Prevwa', 'Prezan', 'Prezidan', 'Pri', 'Privatize', 'Prive', 'Prizon', 'Prizonye', 'Pwa', 'Pwason', 'Pwav', 'Pwazon', 'Pwèl', 'Pwen', 'Pwent', 'Pwente', 'Pwenti', 'Pwès', 'Pwoblèm', 'Pwodiksyon', 'Pwodui', 'Pwofese', 'Pwofesè', 'Pwofèt', 'Pwogram', 'Pwograme', 'Pwogramè', 'Pwonon', 'Pwononse', 'Pwòp', 'Pwopriyete', 'Pwopriyetè', 'Pwoteje', 'Pwoteksyon', 'Pwovizyon', 'Pyan', 'Pye', 'Pyès', 'Pyese', 'Pyon', 'R', 'Ra', 'Rabote', 'Rad', 'Radyo', 'Rafine', 'Rafreshisman', 'Rakèt', 'Rakonte', 'Ran', 'Randevou', 'Ranje', 'Rankont', 'Rankontre', 'Ranmye', 'Rann', 'Ranpli', 'Ranyon', 'Rapadou', 'Rapòte', 'Rapòtè', 'Rara', 'Ras', 'Rasanbleman', 'Rash', 'Rashe', 'Rasin', 'Rasyonèl', 'Rat', 'Rate', 'Ratyè', 'Ratyèfè', 'Ravin', 'Ray', 'Rayi', 'Rayisman', 'Re', 'Rebitan', 'Rebitans', 'Redaksyon', 'Refèt', 'Refrijeratè', 'Règ', 'Regrete', 'Rejim', 'Reken', 'Reklam', 'Rekò', 'Rekonesans', 'Rekonèt', 'Rekonstwi', 'Rèl', 'Relasyon', 'Rele', 'Relijye', 'Ren', 'Rèn', 'Renault', 'Renesans', 'Renmen', 'Repa', 'Repo', 'Repondè', 'Repons', 'Rès', 'Resevwa', 'Reshèsh', 'Resi', 'Resipyan', 'Responsablite', 'Restavèk', 'Restoran', 'Rete', 'Retire', 'Retounen', 'Rèv', 'Reve', 'Revè', 'Revizyon', 'Revolisyon', 'Revòlt', 'Revolvè', 'Reyèl', 'Reyon', 'Rèz', 'Rezen', 'Rezilta', 'Rezistan', 'Rezistans', 'Rezon', 'Rezone', 'Rezoud', 'Ri', 'Rish', 'Rishès', 'Rive', 'Rivyè', 'S', 'Sab', 'Sadik', 'Saint Marc', 'Sak', 'Sal', 'Salad', 'Sale', 'Salon', 'Salte', 'Samdi', 'San', 'Sandal', 'Sandwish', 'Sann', 'Sans', 'Sansi', 'Sant', 'Sante', 'Santi', 'Santiman', 'Santimantalite', 'Santre', 'Sashè', 'Satan', 'Satanik', 'Saten', 'Savann', 'Se', 'Sè', 'Segond', 'Segondè', 'Sèjan', 'Sekle', 'Sekou', 'Seksyon', 'Seksyone', 'Sèl', 'Sele', 'Seleksyon', 'Seleksyone', 'Semèl', 'Sen', 'Sèn', 'Senatè', 'Senbòl', 'Senk', 'Senkant', 'Sentiwon', 'Septanm', 'Seramik', 'Sere', 'Seremoni', 'Sereyal', 'Seriz', 'Sèsh', 'Sèt', 'Sètifika', 'Setyèm', 'Sèvant', 'Sèvi', 'Sèvis', 'Sèvitè', 'Sèvyèt', 'Sèz', 'Shadèk', 'Shak', 'Shalè', 'Shanje', 'Shanjman', 'Shanm', 'Shans', 'Shante', 'Shantè', 'Shapèl', 'Shapit', 'Shashe', 'Shat', 'Shavire', 'Shèf', 'Shèk', 'Shemen', 'Shemiz', 'Shemizèt', 'Sheri', 'Shèsh', 'Sheval', 'Sheve', 'Shèz', 'Shifonnen', 'Shimi', 'Shimik', 'Shin', 'Shire', 'Shita', 'Sho', 'Shodyè', 'Shofe', 'Shofè', 'Shòfrèt', 'Shose', 'Shosèt', 'Shou', 'Shouk', 'Shoukèt', 'Shwa', 'Shwal', 'Shwazi', 'Shyen', 'Si', 'Sid', 'Sik', 'Siklòn', 'Sikre', 'Siksesyon', 'Silans', 'Silvouplè', 'Siman', 'Simante', 'Simetyè', 'Sinema', 'Sinistre', 'Sipliye', 'Sipò', 'Sipòte', 'Sipòtè', 'Sis', 'Sispann', 'Sitadèl-Laferyè', 'Sitiye', 'Sitwayen', 'Sitwon', 'Sitwonad', 'Sitwonnen', 'Siv', 'Sivik', 'Sivil', 'Siviv', 'Siwo', 'Siye', 'Siyen', 'Sòl', 'Somèy', 'Somye', 'Son', 'Sonnen', 'Sòs', 'Sosis', 'Sosyete', 'Sòt', 'Soti', 'Sou', 'Soudan', 'Souf', 'Soufrans', 'Soufri', 'Soulaje', 'Soulajman', 'Souliye', 'Soulye', 'Soupe', 'Soupoudre', 'Sourit', 'Sous', 'Souse', 'Sousè', 'Sousi', 'Soustraksyon', 'Souvan', 'Spèmatozoyid', 'Spò', 'Spòtif', 'Stil', 'Suiv', 'Suzuki', 'Swasant', 'Swe', 'Swis', 'Syans', 'Syantifik', 'Syèk', 'Syèl', 'T', 'Tab', 'Tablo', 'Tafya', 'Tafyatè', 'Taksi', 'Talon', 'Tan', 'Tanbou', 'Tanbourinè', 'Tanbouyè', 'Tandans', 'Tande', 'Tank', 'Tann', 'Tanperati', 'Tant', 'Tante', 'Tash', 'Tchit', 'Te', 'Tè', 'Tèks', 'Teleco', 'Telefòn', 'Telefone', 'Televizyon', 'Temwayaj', 'Temwaye', 'Temwen', 'Tenten', 'Tenis', 'Teritoryal', 'Teritwa', 'Tèt', 'Tete', 'Tetin', 'Teyat', 'Thomassique', 'Ti', 'Tibèf', 'Tijan', 'Tikal', 'Tikè', 'Timalis', 'Timid', 'Timidite', 'Timoun', 'Tinèl', 'Tip', 'Tire', 'Tirivyè', 'Tit', 'Titanic', 'Titato', 'Tivoudra', 'Tiwa', 'Tiyo', 'Tizán', 'Tomasik', 'Tomat', 'Tomond', 'Ton', 'Tonbe', 'Tonmtonm', 'Tonnè', 'Tonton', 'Tòt', 'Tòti', 'Tòtòt', 'Tou', 'Toufe', 'Toumante', 'Tounvis', 'Toupre', 'Touse', 'Toushe', 'Tout', 'Toutrèl', 'Touye', 'Toyota', 'Trafik', 'Traka', 'Tranble', 'Tranpe', 'Transfere', 'Transh', 'Transhe', 'Trant', 'Travay', 'Travayè', 'Tray', 'Tren', 'Trepase', 'Très', 'Trese', 'Tretman', 'Trèz', 'Tribilasyon', 'Tribinal', 'Trip', 'Tripòt', 'Tripotay', 'Twa', 'Twal', 'Twalèt', 'Twasèt', 'Twons', 'Twòp', 'U', 'Uit', 'Uityèm', 'V', 'Vag', 'Vaksen', 'Vaksinen', 'Valanten', 'Valantin', 'Vale', 'Valè', 'Van', 'Vandredi', 'Vanje', 'Vanjè', 'Vann', 'Vant', 'Vante', 'Vantilatè', 'Ve', 'Vè', 'Vèb', 'Vejetab', 'Velo', 'Ven', 'Venn', 'Vennvendeng', 'Venteen', 'Ventnèf', 'Vèrèt', 'Verite', 'Vèt', 'Vètikal', 'Vid', 'Vidanj', 'Vide', 'Viktwa', 'Vil', 'Vinèg', 'Vini', 'Vis', 'Vise', 'Vitès', 'Viv', 'Vivan', 'Vizib', 'Viziblite', 'Vizyon', 'Vle', 'Vlòpèt', 'Vo', 'Vodou', 'Volay', 'Vole', 'Vòlè', 'Volebòl', 'Volim', 'Volonte', 'Voras', 'Vouzan', 'Voye', 'Vwati', 'Vwayaje', 'Vwazen', 'Vwazin', 'Vyann', 'Vye', 'Vyole', 'Vyolèt', 'Vyolon', 'W', 'Wa', 'Wanga', 'Wayal', 'Wayòm', 'Wiski', 'Wòb', 'Woman', 'Womans', 'Womantik', 'Womantism', 'Won', 'Wonn', 'Wonpwen', 'Wòsh', 'Wou', 'Wouj', 'Woule', 'Woulèt', 'Woulib', 'Woulo', 'Wout', 'Wouze', 'Y', 'Yè', 'Yo', 'Yofri', 'Yon', 'Yonn', 'Yoyo', 'Yuit', 'Yuityèm', 'Z', 'Zaboka', 'Zòbòy', 'Zafè', 'Zam', 'Zandolit', 'Zanj', 'Zanmi', 'Zanmitay', 'Zannanna', 'Zannimo', 'Zanno', 'Zansèt', 'Zantray', 'Zèb', 'Zebi', 'Zegiy', 'Zeklè', 'Zèl', 'Zele', 'Zen', 'Zenglendo', 'Zepina', 'Zepòl', 'Zepon', 'Zès', 'Zesèl', 'Zetwal', 'Zetwale', 'Zigzag', 'Ziltik', 'Zimbabwe', 'Zo', 'Zoklo', 'Zoklote', 'Zòn', 'Zonbi', 'Zong', 'Zonyon', 'Zoranj', 'Zòrèy', 'Zòtèy', 'Zotobre', 'Zòtolan', 'Zouti', 'Zozo', 'Zwazo', 'Zwen'];
exports.SUGGESTIONS = SUGGESTIONS;
},{}],"src/words.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WORDS = void 0;
const WORDS = [{
  "word": "A",
  "description": "Premye lèt nan alfabèt la."
}, {
  "word": "Abandone",
  "description": "Vire do kite yon bagay, yon moun san retounen jwenn li.  Aksyon yon papa ki vire do kite madanm li avèk pitit li. "
}, {
  "word": "Abi",
  "description": "Itilize pouvwa, fòs sou yon lòt ki pa gen defans.  Move aksyon yon patwon sou anplwaye li."
}, {
  "word": "Abilite",
  "description": "Yon fòs, entelijens ki disponib nan yon bagay, yon moun.  Fòs sa a, entelijens sa a depann de pwopriyetè a pou  devlope li.  Kapasite tout moun gen pou aprann nenpòt bagay."
}, {
  "word": "Abitid",
  "description": "Yon aksyon ki repete anpil fwa tankou ale dòmi shak swa a dizè. "
}, {
  "word": "Abiye",
  "description": "Mete yon rad ki diferan de rad moun mete lakay yo, shak jou.  Aksyon yon moun ki oblije mete yon rad pou li rantre yon kote, patisipe nan yon seremoni."
}, {
  "word": "Ablabla",
  "description": "Mo sa a soti nan lang Espanyòl la, nan vèb \"hablar\", ki vle di pale.  Pou ayisyen, ablabla vle di pale de bagay ki pa gen sans.  Pale tankou yon moun ki pèdi bon sans li, konsyans li tankou yon moun ki oblije di: Lè mwen di ou sa la, tandiske la, bagay sa yo la, pa egzanp, pitit mwen… nan yon konvèsasyon."
}, {
  "word": "Aboli",
  "description": "Revoke yon lwa sitwayen yon peyi, yon zòn te konnen obeyi, yon lwa ki te aktif.  Kèk fwa, menm lwa ki aboli lòt la tou pwofite ranplase li."
}, {
  "word": "Abolisyon",
  "description": "Aksyon Shanm, otorite yon peyi sou yon lwa sitwayen yon peyi pa oblije obeyi ankò, yon lwa ki aboli. "
}, {
  "word": "Abondans",
  "description": "Yon gwo kantite nan yon bagay tankou lapli ki tonbe pandan plizyè jou.  Yon kokennshenn bagay."
}, {
  "word": "Abònman",
  "description": "Aksyon yon moun ki peye pou li kapab kontinye resevwa yon bagay pandan yon kantite tan.  Shak fwa li resevwa yon pati nan bagay la kantite kòb li te peye a diminye.  Biznis kote li te peye pou bagay la ap kontinye pote, voye bagay la bay li pou jis kantite kòb li te peye a fini.  Si li vle kontinye abónman li oblije peye ankò pou kantite tan li vle kontinye resevwa bagay la."
}, {
  "word": "Abouti",
  "description": "Limit kote yon bagay kapab rive.  Rive nan dènye pwent kote yon wout fini.  Finisman yon shemen, yon travay tankou yon reshèsh syantifik ki rive yon kote epi syantis la sispann travay.  "
}, {
  "word": "Abrevyasyon",
  "description": "Itilizasyon yon pwen apre kèk lèt nan yon mo san fini ekri mo a e lektè kapab konnen kisa ekriven an vle di."
}, {
  "word": "Absid",
  "description": "Kalifikasyon pawòl yon moun ki ale nan sans kontre jan moun ki posede bon sans yo pale, ekri nòmalman."
}, {
  "word": "Abstrak",
  "description": "Kòmanse avèk yon sijè epi devlope plizyè lide san bay yon konklizyon pou pyès nan tout nouvo lide."
}, {
  "word": "Abstraksyon",
  "description": "Eta yon sijè, yon diskisyon ki fini san konklizyon e plizyè lòt lide soti nan diskisyon sa a."
}, {
  "word": "Adaptasyon",
  "description": "Aranjman ki fèt nan tout kò yon èt vivan pou kontinye viv nan nenpòt zòn, avèk nenpòt lòt èt vivan."
}, {
  "word": "Adapte",
  "description": "Aksyon yon vivan lè li ranje kò li pou viv nan nenpòt zòn, avèk nenpòt lòt èt vivan."
}, {
  "word": "Adeziv",
  "description": "Yon materyèl ki kapab kole sou yon lòt materyèl, yon kò pou kont li."
}, {
  "word": "Adisyon",
  "description": "Yonn nan kat operasyon aritmetik yo tankou en plis en (1 + 1 = 2).  Nenpòt bagay ki ogmante sou yon bagay, yon kantite."
}, {
  "word": "Adjwen",
  "description": "Yon moun ki travay avèk yon lòt moun pou sipòte li nan sa moun sa a ap fè.  Yon adjwen se men dwat moun li ap travay avèk li a. "
}, {
  "word": "Admirasyon",
  "description": "Pi piti lanmou yon moun gen nan kè li pou yon lòt moun.  Kòmansman lanmou nan kè yon moun."
}, {
  "word": "Admisyon",
  "description": "Akseptans nan mitan yon gwoup.  Non dirijan nan yon biznis, yon òganizasyon bay yon seksyon nan biwo yo. "
}, {
  "word": "Adolesans",
  "description": "Yonn nan laj moun pase anvan yo rive granmoun.  Laj sa a soti nan sis ane pou rive nan trèz ane."
}, {
  "word": "Adopsyon",
  "description": "Aksyon yon moun ki adopte yon moun, nenpòt lòt bagay.  Yon milyonè te kapab pran timoun Lafanmiy Se Lavi yo nan adopsyon."
}, {
  "word": "Adopte",
  "description": "Aksyon yon moun ki vini granmoun yon lòt moun jan lalwa esplike adopsyon.  Bay tout asistans granmoun yon moun bay. "
}, {
  "word": "Adore",
  "description": "Montre anpil respè pou grandè Bondye, grandè yon lòt moun genyen.  Mete jenou atè devan Bondye,  devan yon lòt moun pou mande li padon, mande li yon sèvis."
}, {
  "word": "Adousi",
  "description": "Shanje fòs sou fòm feblès.  Fè yon moun, yon bagay vini dous tankou yon jèn fi ki pate vle tande pale de relasyon fi avèk gason epi lè li kòmanse viv dousè relasyon sa a, li toupre pou koute pawòl tout gason."
}, {
  "word": "Adrès",
  "description": " Deskripsyon ki pèmèt moun jwenn yon kote, yon plas li ap shashe tankou adrès Entènèt sa a: http://www.kenn.com."
}, {
  "word": "Afrik",
  "description": "Yonn nan senk kontinan yo ki fòme lemond la:  Ewòp, Azi, Afrik, Amerik, Oseyanik.  Tout moun kwè se nan kontinan sa a moun nwa te premye parèt sou tè a.  Enpe moun kwè se sou kontinan sa tout premye èt vivan te parèt sou tè a tou.  Moun ki ap shashe konnen yo di yo te jwenn zo moun ki pi ansyen an, yon fi yo rele li Lucy, nan lak Victoria sou kontinan Afrik la."
}, {
  "word": "Afriken",
  "description": "Se non tout moun ki fèt sou kontinan Afrik la."
}, {
  "word": "Afwonte",
  "description": "Rankontre yon moun pou esplike li yon opinyon, koute opinyon moun nan tou.  Afwonte yon moun kapab bay yon move rezilta si yonn nan moun gen santiman vyolan. "
}, {
  "word": "Agiman",
  "description": "Pawòl defansif ki soti nan boush yon moun pou kontrekare opinyon yon lòt moun. "
}, {
  "word": "Agrandi",
  "description": "Fè yon bagay vini pi gran.  Mèt yon kay kapab mande bòs la pou li agrandi kay la."
}, {
  "word": "Agrikilti",
  "description": "Metòd moun itilize pou ede repwodiksyon grenn plant moun manje; konsa toujou gen manje pou moun manje."
}, {
  "word": "Ajan",
  "description": "Yon moun ki reprezante yon lòt moun nan tout tranzaksyon moun sa te kapab reprezante tèt li.  Yon koutye se yon ajan paske li reprezante yon mèt kay,  yon lokatè,  yon ashtè."
}, {
  "word": "Ajans",
  "description": "Travay yon moun ki reprezante moun nan nenpòt tranzaksyon moun nan te kapab reprezante tèt li."
}, {
  "word": "Ajantin",
  "description": "Yon peyi nan Amerik Sid la, sou kote Shili.  Moun nan peyi sa pale Espanyòl.  Kapital peyi sa rele Bon Lè."
}, {
  "word": "Aje",
  "description": "Eta yon bagay ki gen anpil ane depi li te kòmanse egziste."
}, {
  "word": "Ajen",
  "description": "Eta yon moun lestomak li vid, ki apèn leve nan kabann li apre li fini pase yon nwit ap dòmi e li poko manje manje anyen."
}, {
  "word": "Aji",
  "description": "Fè yon bagay, yon aksyon ki kapab byen, ki kapab mal tou."
}, {
  "word": "Ajil",
  "description": "Yon varyasyon tè ki mou lè li mouye e ki kapab di tankou wòsh lè li sèsh.  Lè ajil fini sèsh e pase nan fou, dlo pa kapab fè li mou ankò. Gen ajil wouj, gen ajil jón."
}, {
  "word": "Ajiste",
  "description": "Ranje yon bagay nan fason li te dwe ye a.  "
}, {
  "word": "Ajisteman",
  "description": "Travay yon moun fè pou li ranje yon bagay nan plas li, jan li te dwe ye a."
}, {
  "word": "Ajoupa",
  "description": "Yon ti kay kote moun andeyò peyi Ayiti rete pou yo viv.  Yon kay ki piti e ki pa sanble avèk yon kay nòmal pou moun viv.  Yon ti kay ki fèt avèk pay soti atè pou rive anlè.  Li pa kapab pare solèy byen e dlo lapli kapab rantre andedan li."
}, {
  "word": "Ajoute",
  "description": "Mete yon bagay sou yon lòt avèk espwa lòt la ap vini pi plis.  Ajoute yon goud sou kat goud pou li vini fè senk goud."
}, {
  "word": "Akademi",
  "description": "Yon lekòl tradisyonèl ki prepare etidyan pou yo vini pwofesyonèl nan yon bransh.  Akademi Militè, Yon lekòl kote moun ale pou resevwa edikasyon militè.  Apre yon moun fini resevwa edikasyon miltè li kapab ale nan nenpòt gwoup, kò militè."
}, {
  "word": "Akayè",
  "description": "Yon vil nan peyi Ayiti.  Vil sa nan direksyon nò peyi a e yon moun kapab jwenn vil sa lè li ap vwayaje soti Pòtoprens si li itilize Wout Nasyonal Nimewo En an.  Se te yonn nan zòn kote moun te konnen kiltive anpil bannann-miske.  Istwa rapòte ke fanm ki te koud premye drapo peyi Ayiti a te viv Akayè."
}, {
  "word": "Akizatè",
  "description": "Yon moun ki akize yon lòt.  Yon moun tankou yon pwosekitè ki fè arete yon lòt moun pou moun nan ale tann jijman li nan prizon."
}, {
  "word": "Akizasyon",
  "description": "Travay, aksyon yon moun ki akize yon lòt moun."
}, {
  "word": "Akize",
  "description": "Mete responasblite yon move aksyon, yon krim sou do yon moun."
}, {
  "word": "Akonplisman",
  "description": "Dènye bagay ki rete pou fèt pou yon travay fini, akonpli."
}, {
  "word": "Akoushe",
  "description": " Pouse yon bebe ki te andedan vant soti deyò."
}, {
  "word": "Akoushman",
  "description": "Travay, aksyon yon femèl lè li ap pouse yon pitit soti deyò."
}, {
  "word": "Aksan",
  "description": "Yon ti senbòl kèk lang itilize pou diferansye yon lèt, yon son avèk yon lòt.  Fason yon moun pale yon lang etranje; se sa ki fè Ameriken yo di Ayisyen pale Anglè avèk aksan Fransè."
}, {
  "word": "Akselere",
  "description": "Soti nan yon vitès ki pi dousman pou rive nan yon vitès ki pi rapid.  Aksyon yon shofè ki pese akseleratè mashin li pi fò pase lòt shofè sou wout la."
}, {
  "word": "Aksepte",
  "description": "Pran yon bagay jan li vini an san shashe shanje li."
}, {
  "word": "Aksidan",
  "description": "Yon evènman ki rive san pyès moun pate prepare li pou li te rive nan fason li rive a.  Aksyon de shofè ki kite mashin yo ap kondi ale frape ansanm."
}, {
  "word": "Aksyon",
  "description": " Fason yon moun aji.  Bon Aksyon, Aksyon yon moun ki aji yon fason sosyete a espere li te ap aji.  Move Aksyon,  Aksyon yon moun ki aji yon fason moun nan sosyete a pa espere li te ap aji."
}, {
  "word": "Aktè",
  "description": "Yon gason ki kapab jwe wòl yon lòt moun nan nenpòt sitiyasyon.  Sa yon aktè fè, sanble anpil avèk sa mèt aksyon an te kapab fè.  Si se moun nan ki te nan menm sitiyasyon an li te ap aji menm jan an tou.  Yon gason ki kapab kopye tout jès yon moun epi pou li refè yo menm jan avèk moun nan."
}, {
  "word": "Aktif",
  "description": "Eta yon bagay ki te kòmanse fè yon travay e ki kontinye fè travay la.  Yon lwa moun oblije obeyi."
}, {
  "word": "Aktivite",
  "description": "Deplasman.  Mouvman.  Tout mouvman, tout deplasman yon bagay, yon moun.  Tout travay moun fè."
}, {
  "word": "Aktyalite",
  "description": "Yon nouvèl ki nan boush tout moun.  Yon bagay tout moun ap pali de li san rete pandan yon kantite tan."
}, {
  "word": "Ale",
  "description": "Deplase kite yon zòn pou rive nan yon lòt zòn."
}, {
  "word": "Alfabèt",
  "description": "Yon lis lèt ki pèmèt moun ki pale yon lang ekri lang la.  Alfabèt lang Kreyòl la gen vennkat lèt nan li:  A (majiskil) a (miniskil),  B (majiskil) b (miniskil), C (majiskil) c (miniskil), D (majiskil) d (miniskil), E (majiskil) e (miniskil), F (majiskil) f (miniskil), G (majiskil) g (miniskil), H (majiskil) h (miniskil), I (majiskil) i (miniskil), J (majiskil) j (miniskil), K (majiskil) k (miniskil), L (majiskil) l (miniskil), M (majiskil) m (miniskil), N (majiskil) n (miniskil), O (majiskil) o (miniskil), P (majiskil) p (miniskil), R (majiskil) r (miniskil), S (majiskil) s (miniskil), T (majiskil) t (miniskil), U (majiskil) u (miniskil), V (majiskil) v (miniskil), W (majiskil) w (miniskil), Y (majiskil) y (miniskil), Z (majiskil) z (miniskil)."
}, {
  "word": "Alimèt",
  "description": "Yon pwodui travayè prepare nan izin pou pèmèt moun kòmanse yon dife byen fasil.  Pwodui sa gen yon ti moso bwa avèk yon materyèl ki kapab limen dife si yon moun fwote li sou fas yon bagay ki plat e ki pa mouye."
}, {
  "word": "Aliye",
  "description": "Ranje plizyè bagay yonn dèyè lòt.  Ranje plizyè bagay sou liy."
}, {
  "word": "Almanak",
  "description": "Yon lis tout mwa ki gen nan yon ane avèk anpil evènman espesyal ki toujou repete nan kèk jou nan ane a.  Evènman sa yo kapab selebre nan yonn, plizyè peyi nan lemond."
}, {
  "word": "Almay",
  "description": "Yonn nan pi gwo peyi nan istwa kontinan Ewòp la.  Almay gen fontyè avèk Frans, Polòy e plizyè lòt peyi.  Se nan peyi sa a Adòlf Hitlè, shèf gwoup militè ki te òganize asasina jwif yo, te kòmanse touye moun sa yo."
}, {
  "word": "Alo",
  "description": "Yon ekspresyon moun itilize pou salye etranje yo rankontre sou wout yo.  Premye mo yon moun di lè li reponn yon telefòn ki te ap sonnen lakay li. "
}, {
  "word": "Altènatif",
  "description": "Jan moun ki etidye fizik yo esplike elektrisite fonksyone, monte desann.  Yon bagay ki kapab itilize nan plas yon lòt lè lòt la pa disponib."
}, {
  "word": "Altitid",
  "description": "Wotè yon bagay kòmanse soti sou fas lanmè pou rive nan wotè kote bagay la ye a."
}, {
  "word": "Alyans",
  "description": "Yon relasyon de, plizyè moun kreye ant yo avèk yon dokiman yo siyen pou yo tout repekte yonn,  plizyè kondisyon ki nan dokiman an."
}, {
  "word": "Amandman",
  "description": "Yon shanjman nan atik nan yon lwa ki shanje siyfikasyon lwa a.  Dis premye atik (civil rights) nan konstitisyon peyi Etazini a ki bay nwa avèk lòt minorite nan peyi sa a anpil dwa."
}, {
  "word": "Amatè",
  "description": " Yon moun ki ap pwatike yon metye ki pa vrè pwofesyon li.  Yon moun ki pa gen tout abilite pou fè yon djòb.  Yon moun ki jwe jwèt pou lajan."
}, {
  "word": "Amelyore",
  "description": "Fè yon aranjman yon  bagay pou fè li vini pi bon."
}, {
  "word": "Amerik",
  "description": "Yonn nan senk kontinan yo nan lemond:  Ewòp, Azi, Afrik, Amerik, Oseyanik. Kontinan sa a divize an plizyè pati:  Amerik Nò, kote Kanada, Etazini, avèk Meksik ye;  Amerik Sid, kote Ajantin, Shili, Kolonbi, Venezwela e latriye ye; Amerik Santral, ki gen Ondiras, Beliz e latriye; Amerik Latin nan kote Ayiti, Dominikani e latriye ye."
}, {
  "word": "Ameriken",
  "description": "Non tout moun ki ap viv nan sou kontinan Amerik la.  Malgre sa, anpil moun panse Amriken se moun ki ap viv nan peyi Etazini."
}, {
  "word": "An",
  "description": "Jan yon bagay ye, jan yon bagay dwe ye.  An!!!,  Ekspresyon kote yon moun ouvri boush li laj e ki montre yon moman kote moun sa sonje yon bagay."
}, {
  "word": "Analiz",
  "description": "Travay yon moun ki ap shashe konprann yon bagay, yon sitiyasyon. "
}, {
  "word": "Analize",
  "description": "Shashe konprann yon bagay, yon sitiyasyon."
}, {
  "word": "Anba",
  "description": "Plas tout bagay ki pi ba pase yon lòt bagay."
}, {
  "word": "Anbake",
  "description": "Mete shay sou yon bagay tankou yon mashin, yon bato, yon avyon pou li pote yo ale yon kote."
}, {
  "word": "Anbwate",
  "description": "Mete yon bagay nan bwat.  Ranje plizyè bagay tankou kado pou bay moun nan yon bwat."
}, {
  "word": "Andante",
  "description": "Fè dan.  Bay yon bagay fòm yon dan.  Mete yon liy yon paragraf plis sou bò dwat pase kòmansman tout lòt liy avèk paragraf nan yon tèks."
}, {
  "word": "Andedan",
  "description": " Okipe yon pozisyon nan espas yon lòt bagay tankou yon manman ki ap pote pitit li nan van li.  Nan.  Okipe espas nan yon bagay."
}, {
  "word": "Andeyò",
  "description": "Yon bagay ki pa nan espas yon lòt bagay.  Eta yon ti bebe ki soti nan vant manman li apre akoushman."
}, {
  "word": "Andiyèt",
  "description": "Yon kopozisyon mashann vyann ki gen epis avèk vyann koshon ki bay manje bon gou.   Soupoudre. "
}, {
  "word": "Andòmi",
  "description": "Itilize yon mwayen pou fòse yon èt vivan dòmi.   Doktè itilize anestezi anpil pou andòmi malad nan sal operasyon.  Majisyen fè moun dòmi san yo pa toushe moun nan."
}, {
  "word": "Ane",
  "description": " Yon konbinezon twa-san-swasant-senk (365) jou, twa-san-swasant-sis (366) jou ki divize an douz (12) mwa.  Senkant-De (52) semèn.  Yuit-mil-sèt-san-swasant (8.760) èdtan.  Senk-san-venn-senk-mil-sis-san (525.600) minit.  Tranteen-milyon-senk-san-trant-sis-mil (31.536.000) segond."
}, {
  "word": "Anèftali",
  "description": "Yon pwodui shimik ki fèt avèk plizyè eleman shimik, men Ayisyen plis itilise pou reveye moun ki endispoze e nan seremoni lwa.  Sèvitè lwa yo panse sant la kapab pouse move espri ale lwen malad."
}, {
  "word": "Anfounen",
  "description": "Mete yon bagay andedan yon bwat ki ap resevwa shalè pou fè bagay andedan  li a kwit.  Yon bagay ki ap anfounen kapab pase plizyè etap tankou shofe, kwit, vini solid, brile.  Se moun ki ap anfounen an ki pou konnen konbyen tan li vle bagay la pase andedan fou a."
}, {
  "word": "Ang",
  "description": "Espas ant de kò ki lye nan yon pwen, men ki pa ale nan menm direksyon.  Espas ant de bagay ki pèpandikilè."
}, {
  "word": "Anglè",
  "description": "Lang moun pale nan plizyè peyi tankou Etazini, Angletè, Afrik Sid avèk anpil lòt peyi toujou.  Non moun ki fèt nan peyi Angletè, moun ki pran nasyonalite peyi sa a."
}, {
  "word": "Angletè",
  "description": "Yon ansyen gran puisans ki te kontwole lemond lontan tankou peyi Etazini ap fè depi apre dezyèm gè mondyal la.  Yonn nan kèk dènye peyi nan lemond ki toujou gen fanmiy wayal."
}, {
  "word": "Anglouti",
  "description": "Disparèt menm jan moun vale manje.  Eta plizyè bagay ki tonbe nan yon tou epi ki disparèt pou tout tan."
}, {
  "word": "Anile",
  "description": "Anpeshe yon aksyon, yon travay kontinye.  Disparèt yon bagay.  Kontribye pou anpeshe egzistans yon bagay kontinye.  Yon moun ki ap travay sou yon òdinatè kapab anile dènye bagay li soti fè a si li shwazi liy sèvis Shanjman an epi Defèt.   "
}, {
  "word": "Anilè",
  "description": "Yonn nan senk dwèt men gosh yon moun ki a gosh dwèt majè a.  Se nan dwèt sa tout moun ki marye mete bag maryaj yo.  Yon moun ki anile yon bagay."
}, {
  "word": "Anivèsè",
  "description": "Jou yon evènman te rive pou premye fwa epi moun kontinye selebre li shak fwa jou sa rive nan yon ane."
}, {
  "word": "Anniye",
  "description": "Eta yon moun ki bezwen itilize tan lib li genyen, men li pa genyen anyen, li pa jwenn anyen pou fè avèk tan lib li yo.  Aksyon yon moun ki ap fè yon lòt moun yon bagay moun nan pa renmen e li pa vle sispan fè moun nan bagay la."
}, {
  "word": "Anpeshe",
  "description": "Elimine posiblite pou libète egziste.  Bare yon moun pou li pa kapab fè yon bagay li vle fè."
}, {
  "word": "Anpeshman",
  "description": "Yon fòs ki anpeshe yon bagay fèt.  Obstak."
}, {
  "word": "Anpil",
  "description": "Yon kantite ki egzije tan pou konte li.  Yon gwo kantite."
}, {
  "word": "Anplwa",
  "description": "Relasyon yon moun avèk yon biznis,  yon konpayi, leta ki pwomèt moun nan lajan pou shak travay, pou kantite tan li travay nan biznis la, òganizasyon an."
}, {
  "word": "Anplwaye",
  "description": "Moun ki ap travay avèk yon biznis, yon konpayi, yon òganizasyon, leta yon peyi.  Yon moun ki gen yon anplwa."
}, {
  "word": "Anprizone",
  "description": "Mete yon moun nan prizon.  Pini.  Retire libète yon moun te genyen si li mal itilize dwa libète."
}, {
  "word": "Anprizónman",
  "description": "Aksyon yon gwoup moun tankou yon jij avèk jiri, nan yon jijman, ki mete yon moun nan prizon."
}, {
  "word": "Anrejistre",
  "description": "Kenbe, konsève yon bagay tankou ekriti, son, imaj yon kote pou jwenn li lè gen bezwen pou itilize li.  Son ki anrejistre sou kasèt-son, moun kapab koute li menm apre anpil tan.  Imaj ki anrejistre sou yon kasèt-imaj, moun kapab gade li nenpòt lè."
}, {
  "word": "Ansent",
  "description": "Eta yon femèl ki te koupe avèk yon mal nan moman ovilasyon li epi ki gen yon ze, yon timoun, yon ti bèt ki ap fòme nan vant li."
}, {
  "word": "Answouj",
  "description": "Yon vil nan Depatman Latibonit la."
}, {
  "word": "Ansyen",
  "description": "Eta nenpòt bagay apre plizyè ane fini pase depi li te kòmanse egziste.  Tout bagay ki pa kòmanse egziste konnye a, jodia.  Yon moun ki pèdi yon tit li te genyen."
}, {
  "word": "Antann",
  "description": "Shashe shemen antant.  Aksyon de, plizè moun ki pran yon desizyon ansanm pou yo fè, sispann fè yon bagay tankou sispann goumen nan yon gè."
}, {
  "word": "Antant",
  "description": "Kote plizyè lide rankontre pou yo fè yon sèl.  Satisfaksyon tout moun ki te gen plizyè lide diferan rive jwenn nan yon sèl opinyon."
}, {
  "word": "Antèn",
  "description": " Yon ti pwent ki soti nan tèt kèk ti bèt pou pèmèt yonn kominike avèk lòt bèt parèy yo.  Yon aparèy pou radyo, televizyon ki pèmèt kominikasyon ant aparèy sa yo pi fasil."
}, {
  "word": "Antere",
  "description": "Mete yon bagay nan tè epi kouvri li.  Sispann pale de yon bagay pou fè moun bliye li.  Mete moun mouri nan tè.\nFouye tou nan tè, mete yon bagay epi kouvri li avèk menm tè ki te soti nan tou a."
}, {
  "word": "Antibyotik",
  "description": " Pwodui shimik ki touye mikwòb.  Medikaman ki trete enfeksyon.  Prèske non tout medikaman sa yo fini avèk menm de lèt sa yo:  in."
}, {
  "word": "Antikite",
  "description": "Yon kantite tan, yon epòk ki te pase lontan tankou kèk ane anvan Jezi Kris te vini sou tè a pou kontinye kèk ane apre."
}, {
  "word": "Antiseptik",
  "description": "Pwodui shimik ki anpeshe mikwòb kontinye devlope."
}, {
  "word": "Antoure",
  "description": "Fè yon baraj nan tout kwen yon bagay.  Bare yon bagay tou won."
}, {
  "word": "Antrav",
  "description": "Yon bagay yon moun fè epi bagay la mete li nan pwoblèm.  Yon granmoun wè de timoun ap goumen epi li separe yo.  Yonn nan timoun yo ale di granmoun li moun nan te kenbe li pou lòt timoun nan bat li.  Bagay sa kapab vini antrav pou moun nan."
}, {
  "word": "Antrave",
  "description": "Eta yon moun ki nan yon antrav.  Yon moun fini vòlè yon mashin pou kont li epi li pase shashe yon zanmi li pou yo soti.  Pandan yo nan lari a polis arete yo pou vòlè mashin.  Lòt zanmi an ki pate menm konnen vòl la tou antrave  paske polis yo pran li pou yon vòlè tou."
}, {
  "word": "Antravè",
  "description": "Pozisyon yon bagay pou anpeshe yon lòt bagay kontinye nan direksyon li te kòmanse sib la.  Travay yon bagay ki bare wout, objektif yon moun.  Fè yon kwa avèk yon lòt bagay tankou yon pye bwa ki tonbe sou yon wout epi pyès trafik pa kapab kontinye."
}, {
  "word": "Antrénman",
  "description": "Prepare pou yon evènman ki ap vini.  Repetisyon. Refè yon bagay pou sonje kijan li te fèt anvan yon prezantasyon an fas yon odyans."
}, {
  "word": "Anvan",
  "description": "Pran, resevwa priyorite sou yon lòt.  Tout lòt vini apre sa ki vini anvan tankou en vini anvan de, de vini anvan twa e latriye."
}, {
  "word": "Anvi",
  "description": "Moso ki manke pou fè yon lòt rive konplè.  Espwa pou jwenn satisfaksyon. "
}, {
  "word": "Anviwon",
  "description": "Prèske.   Yon ti kras pi plis, pi piti pase yon kantite tankou tan, distans, wotè ki te nesesè."
}, {
  "word": "Anvlòp",
  "description": "Yon bagay laj ki gen kapasite pou kouvri tout kò yon lòt.  Yon moso papye ki vlope tankou yon pòsh pou mete yon lèt,  fèmen li epi voye li bay mèt li pou ouvri li."
}, {
  "word": "Anvlope",
  "description": " Eta yon anvlòp lè li gen yon lòt bagay, yon lèt andedan li.  Travay yon moun ki fèmen yon bagay andedan yon anvlòp.  Travay yon bagay ki kouvri tout kò yon lòt bagay."
}, {
  "word": "Anyen",
  "description": "Zewo.  San valè.  Shif ki lye tout nonb pozitif avèk nonb negatif yo.  Pozisyon yon moun ki pa pou, ki pa kont yon bagay."
}, {
  "word": "Ap",
  "description": "Yon mo, lè li devan yon lòt mo, fè konnen devlopman yon aksyon ki apèn kòmanse."
}, {
  "word": "Aparans",
  "description": "Tandans pou yon moun kwè sa li wè, tande, santi menm lè sa li wè, tande, santi a pa shita sou pyès verite.  Lè nenpòt nan senk sans yo twonpe moun."
}, {
  "word": "Apèl",
  "description": "Aksyon yon moun ki rele yon lòt moun nan telefòn, ki rele yon moun."
}, {
  "word": "Apèn",
  "description": "Eta yon bagay ki pa gen lontan depi li pase."
}, {
  "word": "Apèsi",
  "description": " Posiblite pou wè yon bagay anvan li vini egziste nan reyalite.  Bay yon ti goute nan yon bagay.  Moun ki fè sinema yo toujou fè reklam nan televizyon pou film.  Yo bay yon ti apèsi nan film nan.  Sa a bay moun yon lide de film nan anvan yo ale wè li. "
}, {
  "word": "Apeti",
  "description": "Espas vid nan lestomak yon moun ki fè li anvi manje.  Yon fòs envizib ki fè yon moun anvi fè yon bagay tankou tout jèn gason gen apeti pou bèl fi."
}, {
  "word": "Apetisan",
  "description": " Bon gou ki ogmante apeti moun pou bagay la.  Yon bagay moun toujou anvi manje, jwenn apre yo fini manje li, jwenn li yon premye fwa."
}, {
  "word": "Apiye",
  "description": "Pran fòs sou yon lòt.  Resevwa fòs, asistans de yon lòt.  Espwa pou resevwa sa ki nesesè de yon moun."
}, {
  "word": "Aplati",
  "description": "Bay yon bagay menm fòm avèk fas dlo dòmi.  Itilize fòs pou fè wòtè yon bagay diminye. "
}, {
  "word": "Aplikasyon",
  "description": "Rezon ki fè egzistans yon bagay itil.  Itilizasyon.  Sa moun kapab fè avèk yon bagay."
}, {
  "word": "Aplike",
  "description": "Itilize yon bagay jan li te fèt pou itilize.  Sib yon metòd pou fè yon bagay."
}, {
  "word": "Aplodi",
  "description": "Aksyon moun ki ap frape de plat men yo ansanm pou ankouraje aksyon yon lòt moun.  Nenpòt aksyon moun pou ankouraje aksyon lòt rekòmanse. "
}, {
  "word": "Aplodisman",
  "description": "Ankourajman pou bon aksyon yon moun.  Rezon ki genyen pou yon bagay rekòmanse."
}, {
  "word": "Apostwòf",
  "description": "Yon ti siy (` ) ki ranplase yon lèt lè moun ap ekri.  Lang Fransè itilize apostwòf anpil, men anpil lang pa itilize li."
}, {
  "word": "Apot",
  "description": "Douz moun yo ki te toujou ap mashe avèk Jezi lè li te ap viv sou tè a.  Nenpòt moun ki resposab pote mesaj bay yon lòt moun."
}, {
  "word": "Aprann",
  "description": " Pran konesans nan koute, li, etidye, fè eksperyans."
}, {
  "word": "Apranti",
  "description": " Moun ki ap sib tout sa patwon li ap fè pou li fè tou."
}, {
  "word": "Aprantisaj",
  "description": "Travay yon moun ki ap aprann.  Ogmante kantite konesans ki deja egziste a."
}, {
  "word": "Apre",
  "description": "Sib sa ki nan pozisyon devan an.  Apre Demen, Jou ki sib jou ki ap vini demen an.  Apre Midi, Yon minit apre mitan yon jounen pou jis rive sis lè nan aswè."
}, {
  "word": "Apresysyon",
  "description": "Aksyon yon moun ki montre valè li bay yon bagay.  Kòmansman lanmou pou yon moun, yon bagay."
}, {
  "word": "Apresye",
  "description": "Montre yon bagay, yon moun li gen valè."
}, {
  "word": "Apwoshe",
  "description": "Itilize tout mwayen ki egziste pou vini pi pre yon moun, yon bagay.  Shashe zanmitay nan men yon moun.  Kòmanse file yon fi."
}, {
  "word": "Apwouve",
  "description": " Fè yon moun konprann entansyon li, bagay li fè bon.  Aksepte lide lòt moun.  Bay dwa, otorizasyon pou kontinye avèk yon aksyon ki kòmanse deja."
}, {
  "word": "Aranjman",
  "description": "Ogmante sa ki manke pou rive pi pre pèfeksyon."
}, {
  "word": "Areye",
  "description": "Yon ti bèt entelijan ki gen yuit pye.  Yon areye fè nish li tankou yon moso twal.  Anpil ayisyen kwè lè yon areye ki gen sèt pye vini pre yon moun se move nouvèl li pote bay moun nan.  Poutèt sa yo ap touye li."
}, {
  "word": "Arestasyon",
  "description": "Aksyon sou yon moun ki tonbe anba kontwòl militè, polis pou ale tann jijman li nan yon prizon.  Apre erestasyon yon moun, moun nan pèdi tout libète, anpil dwa li te genyen."
}, {
  "word": "Arete",
  "description": "Tonbe anba kontwòl militè, polis pou ale nan prizon epi tann jijman."
}, {
  "word": "Aristokrasi",
  "description": "Yon ti ponyen moun nan yon sosyete, yon peyi ki gen prèske tout kòb peyi a nan men yo e ki panse yo pi bon pase lòt moun ki pa nan gwoup pa yo a."
}, {
  "word": "Aristokrat",
  "description": "Nenpòt moun ki nan yon aristokrasi.  Moun ki espere rantre nan aristokrasi e ki kòmanse trete moun nan gwoup pa yo a tankou moun ki gen mwens valè pase yo.  Inyoran ki gen lajan.  Li difisil pou yon gwoup aristokrat asepte moun nan lòt klas rantre nan gwoup yo a."
}, {
  "word": "Aristokratik",
  "description": " Konpòtman nenpòt moun ki nan yon aristokrasi."
}, {
  "word": "Aritmetik",
  "description": "Syans ki okipe afè nonb avèk operasyon nonb sa yo."
}, {
  "word": "Asanble",
  "description": "Anpil moun ki rasanble pou yon menm rezon yon kote.  Depite avèk senatè ki rasanble pou diskite e fè lwa pou yon peyi."
}, {
  "word": "Asasen",
  "description": "Yon kriminèl ki touye moun, pou lajan yon lòt moun peye li."
}, {
  "word": "Asasinen",
  "description": "Aksyon yon asasen sou viktim li."
}, {
  "word": "Ase",
  "description": "Kont.  Pa mete, pa retire nan kantite, wotè, yon bagay deja ye. "
}, {
  "word": "Asha",
  "description": "Aksyon yon moun ki ashte yon bagay.  Yon koutye fè lajan li nan vann kay pou mèt kay yo, men se moun ki fè asha yo ki peye li."
}, {
  "word": "Asheve",
  "description": "Fini fè yon travay ki te kòmanse.  Finisman."
}, {
  "word": "Ashitèk",
  "description": "Pwofesyonèl ki fè imaj yon konstriksyon tankou yon kay.  Ashitèk la kapab itilize nenpòt materyèl pou fè imaj yon kontriksyon, men mezi yo kapab bay vrè dimansyon konstriksyon an lè enjenyè itilize miltip mezi shak kwen nan imaj la."
}, {
  "word": "Ashte",
  "description": "Ale kote moun vann mashandiz, pran yon bagay epi peye pou li."
}, {
  "word": "Ashtè",
  "description": "Yon moun ki ale kote mashann ap vann mashandiz, pran yon bagay epi peye pou li."
}, {
  "word": "Asid",
  "description": "Yon konbinezon plizyè eleman shimik ansanm tankou idwojèn, souf avèk oksijèn.  Konbinezon idwojèn,  souf, avèk oksijèn bay yon asid ki kreye elektrisite lè li rankontre avèk yon metal tankou plon. "
}, {
  "word": "Asirans",
  "description": "Pawòl yon moun di yon lòt moun pou fè moun nan konte sou li.  Yon konpayi moun peye yon ti montan kòb pou konpayi an fè kèk gwo depans pou li lè depans sa yo rive."
}, {
  "word": "Asire",
  "description": "Posede, resevwa asirans de yon moun, yon konpayi."
}, {
  "word": "Asistan",
  "description": "Yon moun ki bay yon moun sipò ki pèmèt moun sa kontinye yon bagay li te kòmanse, yon bagay li vle fè."
}, {
  "word": "Asistans",
  "description": "Sipò yon moun resevwa ki pèmèt li kontinye yon bagay li te kòmanse, yon bagay li vle fè."
}, {
  "word": "Asosyasyon",
  "description": "Gwoupman plizyè moun pou yo sib yon lide ansanm pandan yonn ap ede lòt reyalize lide a.  Aksyon de moun, pou pi piti, ki mete ansanm pou yo reyalize yon lide tankou ouvri yon biznis."
}, {
  "word": "Asosye",
  "description": "Yon moun ki ini avèk yon lòt moun, plizyè lòt moun pou reyalize yon lide tankou ouvri yon biznis ansanm."
}, {
  "word": "Asyèt",
  "description": "Yon veso won ki fèt avèk ajil, metal e moun itilize li pou manje.  Sa ki andedan yon veso.  Plat."
}, {
  "word": "Atak",
  "description": "Aksyon yon moun ki mashe ale devan, dèyè yon lòt moun avèk fòs, gwo mo pou entimide li, touye li tou si sa posib."
}, {
  "word": "Atake",
  "description": "Mashe rantre sou yon moun avèk fòs, gwo pawòl pou entimide li, touye li tou si sa posib."
}, {
  "word": "Atakè",
  "description": "Nenpòt moun ki rantre sou yon lòt moun avèk fòs, gwo pawòl pou entimide li, touye li tou si sa posib."
}, {
  "word": "Atansyon",
  "description": " Prekosyon yon moun dwe pran nan kèk sitiyasyon.  Kite je, zòrèy fikse sou yon bagay pou wè li, tande li.  Atansyon !, Yon son, yon jès yon moun fè pou fè yon lòt moun konprann li gen yon bagay li bezwen gade, koute byen.  Eta moun ki pa kapab sispann koute, gade yon bagay."
}, {
  "word": "Atantif",
  "description": "Eta yon moun ki toujou pre pou fè sa ki nesesè depi yon sitiyasyon prezante devan li."
}, {
  "word": "Atashe",
  "description": "Moun san inifòm, sivil, ki te konnen sèvi gouvènman nan peyi Ayiti.  Yo te gen djòb pou shashe konnen moun ki pa renmen gouvènman an epi ale di prezidan sa.  Sivil nan peyi Ayiti ki te gen plis pouvwa pase militè paske yo te ap travay pou gouvènman an."
}, {
  "word": "Atè",
  "description": "Kole sou fas tè a.  Soti anlè epi desann kole sou fas tè a."
}, {
  "word": "Ateri",
  "description": "Soti anlè pou vini tonbe sou fas tè a.  Yon fason pou fè yon bagay soti anlè epi rive atè."
}, {
  "word": "Aterisaj",
  "description": "Aksyon yon bagay ki ateri tankou yon avyon."
}, {
  "word": "Aterisman",
  "description": "Lè yon bagay ki soti anlè ap toushe fas tè a."
}, {
  "word": "Atifisyèl",
  "description": " Nenpòt bagay ki pèdi eta natirèl li.  Nenpòt bagay ki pa natirèl men moun ranje li yon fason pou li sanble avèk yon bagay natirèl."
}, {
  "word": "Atik",
  "description": "Mo nan lang kreyòl la ki pèmèt moun konnen egzateman de kisa yon moun ap pale.  Yon atik nan lang Kreyòl vini apre yon mo li akonpaye."
}, {
  "word": "Atirans",
  "description": "Fòs ki nan yon bagay e ki vle rale nenpòt lòt bagay ki pre li."
}, {
  "word": "Atire",
  "description": " Aksyon fòs ki nan yon bagay e ki vle rale nenpòt lòt bagay ki pre li."
}, {
  "word": "Atis",
  "description": "Yon moun ki fè travay literè tankou ekri shante, poezi, fè penti e latriye.  Yon moun ki konnen kreye imaj nan desen avèk ekriti.  Yon atis kapab pran nenpòt imaj ki nan tèt li epi transfòme sou fòm reyalite."
}, {
  "word": "Atistik",
  "description": "Nenpòt travay yon atis fè. Nenpòt bagay ki gen rapò avèk yon atis."
}, {
  "word": "Atitid",
  "description": "Fason yon moun shwazi pou li konpòte li nan mitan lòt moun. "
}, {
  "word": "Atizan",
  "description": "Yon moun ki kapab fè yon travay prèske menm jan yon pwofesyonèl fè li.  Moun ki itilize men li pou fè yon travay, ki pa itilize mashin pou fè travay li."
}, {
  "word": "Atizana",
  "description": "Travay yon atizan.  Travay yon moun ki bay yon rezilta menm jan yon pwofesyonèl te kapab fè li."
}, {
  "word": "Atlèt",
  "description": "Yon moun ki pratike yon spò pou pwofesyon."
}, {
  "word": "Atletik",
  "description": "Nenpòt moun ki gen abitid fè spò.  Moun ki kenbe fòm kò li solid tankou atlèt."
}, {
  "word": "Atraksyon",
  "description": "Nenpòt aktivite ki rale moun vini gade e moun pran plezi nan li."
}, {
  "word": "Atraktif",
  "description": "Nenpòt bagay ki kapab fè yon moun gade san rete, bliye tèt li."
}, {
  "word": "Avans",
  "description": "Ofri pou yon bagay anvan resepsyon bagay la.  Peye lajan pou yon travay ki poko fèt."
}, {
  "word": "Avanse",
  "description": "Mashe nan direksyon devan. "
}, {
  "word": "Avantaj",
  "description": "Diferans ki gen nan chanje de ou byen bagay.  Sa yon moun resevwa an plis sou yon lòt."
}, {
  "word": "Avanyè",
  "description": "Yon jou ki pase anvan jounen ki te pase anvan jounen yè a."
}, {
  "word": "Avègleman",
  "description": "Nenpòt bagay ki anpeshe yon moun wè reyalite a ki devan li."
}, {
  "word": "Avèk",
  "description": "Yon ekspresyon ki ede lye de mo, de lide, de bagay. "
}, {
  "word": "Avèti",
  "description": "Anonse sa ki ap ale rive.  Fè konnen sa ki ap ale rive, pase."
}, {
  "word": "Avni",
  "description": "Jan sitiyasyon yon moun, yon bagay, yon zòn ap ale ye nan yon jou ki gen pou li rive.  Yon bagay ki gen pou li rive nan yon tan pyès moun pa kapab konnen anvan li rive tout bon vre.  Yon wout, pi gran pase yon ri, pou anpil mashin pase ansanm.  Li ede moun jwenn anpil espas pou mashe de yon zòn a yon lòt nan yon vil."
}, {
  "word": "Avoka",
  "description": "Yon pwofesyonèl ki etidye lalwa pou defann akize nan tribinal.  Moun ki entèprete lwa nan fason pa yo pou defann kliyan nan yon jijman, nan tribinal."
}, {
  "word": "Avòtman",
  "description": "Retire yon ze nan vant yon femèl anvan li fini fòme pou soti. "
}, {
  "word": "Avril",
  "description": "Katriyèm mwa nan yon ane ki gen kat semèn, trant jou nan li."
}, {
  "word": "Avwán",
  "description": "Yon soupe ayisyen fè avèk farinay,  poud ble.  Yon sinistre plizyè peyi tankou Etazini te konnen voye bay ti peyi pòv yo tankou Ayiti."
}, {
  "word": "Avwe",
  "description": "Aksyon yon moun ki di lòt moun yon verite li konnen e moun sa yo pate ap janm konnen verite sa a si li pate di yo li. "
}, {
  "word": "Avyatè",
  "description": "Pwofesyonèl ki pilote avyon nan lespas.  Moun ki kapab pilote avyon nan lespas."
}, {
  "word": "Avyon",
  "description": "Yon aparèy vitès li pèmèt li vole nan lespas.  Pou yon avyon vole li bezwen genyen yon long wout dwat devan li pou li kouri anvan li kapab vole tout bon vre."
}, {
  "word": "Ayiti",
  "description": "Yon peyi nan Amerik Latin nan ki sou menm il avèk Sendomeng:  Ayiti okipe zòn lwès il la e Sendomeng okipe zòn lès la.  Premye peyi, nan tan kolonizasyon, ki te pran endepandans li.  Premye repiblik ras nwa fòme nan istwa limanite. "
}, {
  "word": "Aza",
  "description": "Nenpòt jwèt yon jwè oblije mize pou li kontinye patisipe nan li."
}, {
  "word": "Azi",
  "description": "Yonn nan senk kontinan yo: Ewòp, Azi, Afrik, Amerik, Oseyanik.  Nan kontinan sa a gen peyi tankou Shin, Kazakstan, Mongoli, e latriye nan li.  Pi gwo peyi a se Shin."
}, {
  "word": "B",
  "description": "Dezyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Bag",
  "description": "Yon ti moso metal won avèk yon tou pou dwèt moun rantre.  Moun mete bag nan dwèt yo pou fantezi, pou fiyanse, pou marye.  Moun fèt pou kontinye mete bag maryaj la tout tan yo rete marye.  Yon bag kapab fèt avèk twa metal tankou lajan, lò, dyaman."
}, {
  "word": "Bagay",
  "description": " San valè.  Yon mo ki dekri tout sa moun vle di lè non yo bezwen an pa disponib, pa vle soti nan memwa-kout moun."
}, {
  "word": "Bakaloreya",
  "description": "Yon nivo etid inivèsitè ki vo kat ane lekòl konsa apre lekòl segondè.  Men, anpil moun panse sizyèm ane nan lekòl segondè se yon diplòm bakaloreya."
}, {
  "word": "Bal",
  "description": "Reyinyon plizyè moun pou selebre yon evènman, yon okazyon avèk mizik pandan plizyè èdtan.  Yon moso metal ki soti nan boush yon zam apre yon eksplozyon andedan yon zam."
}, {
  "word": "Balans",
  "description": " Yon enstriman pou mezire pwa yon bagay, yon moun.  Yonn nan siy owoskòp yo.  Nivo kote yon bagay gen menm pwa avèk yon lòt."
}, {
  "word": "Balanse",
  "description": " Fè nivo pwa de bagay vini nan menm nivo.  Voye yon bagay nan yon direksyon epi voye li nan lòt direksyon opoze a san rete, pandan yon bon bout tan."
}, {
  "word": "Balansin",
  "description": " Yon mashin mekanik ki kapab balanse pandan anpil tan soti nan yon vitès siperyè jis gravite rive kanpe."
}, {
  "word": "Balèn",
  "description": "Pi gwo bèt nan lanmè moun rive dekouvri.  Li bay pitit li tete tankou moun.  Yon sous ekleraj ki gen yon mèsh byen ranje nan mitan yon moso souf."
}, {
  "word": "Balkon",
  "description": "Yon galri, nan yon kay, ki sou anlè.  Yon kay ki gen plis pase de etaj."
}, {
  "word": "Ban",
  "description": "Yon varyasyon nan shèz ki long anpil e li kapab genyen kat pye ou byen plis; konsa plizyè moun kapab shita sou li."
}, {
  "word": "Banal",
  "description": " San sans.  Enkwayab.  Nan nivo konesans prèske tout moun.  Konesans ki disponib pou minimòm entelijans. "
}, {
  "word": "Banana",
  "description": "Yon soupe ayisyen fè avèk bannann.  Yo graje bannan nan, mete li bouyi avèk dlo pou jis li kwit.  Apre bannann nan fini bouyi yo koule li, mete li sou dife ankò epi mete lèt, kanèl nan li anvan yo sikre li."
}, {
  "word": "Band",
  "description": "Eta zozo yon gason lè li di, kanpe.  Sa rive plis lè gason an ansanm avèk yon fi, lè li ap panse a yon fi li anvi, lè li ap panse a yon moman li te pase avèk yon fi, lè li wè fòm koko yon fi anba kilòt li.  Band mayetik, Yon riban long ki andedan kasèt ki fèt pou anrejistreman mizik, imaj tankou film ki parèt sou ekran televizyon, sal sinema yo."
}, {
  "word": "Bande",
  "description": "Vlope avèk bandaj.  Pran yon pozisyon rèd, di."
}, {
  "word": "Bandi",
  "description": "Yon moun ki pa gen krentif pou anyen, ki pa pè pyès moun.  Tapajè.  Eta yon moun vyolan."
}, {
  "word": "Bank",
  "description": "Yon enstitisyon ki okipe afè lajan pou yon peyi, yon gwoup moun, yon gwoup peyi.   Bank sèvi tankou medyatè ant moun ki gen lajan pou prete e moun ki bezwen prete lajan.  Kote moun ki gen kòb sere kòb yo.   Kote moun mete lajan yo posede pou prete moun ki bezwen prete; konsa yo kapab fè benefis sou lajan yo. "
}, {
  "word": "Bankèt",
  "description": "Yon ti bank.  Yon tab yon mashann mete mashandiz pou li vann."
}, {
  "word": "Bannann",
  "description": "Grenn yon pye bannann.  Bannann parèt nan pye a apre yon flè plant sa a fini fleri, seshe epi tonbe atè."
}, {
  "word": "Baraj",
  "description": "Mwayen moun itilize pou bare, separe yon moso tè.  Sa ki separe yon bagay avèk yon lòt.  Yon mi wo ki anpeshe yon kouran dlo vwayaje nan tout libète li. "
}, {
  "word": "Bare",
  "description": "Anpeshe yon lòt kontinye wout li."
}, {
  "word": "Basen",
  "description": "Yon tou fon anpil e ki plen dlo.  Basen Zim, Yon zòn nan depatman Plato Santral la ki pote non yon bèl kouran dlo ki soti nan yon mòn epi li ap vide nan yon tou fon.  Yonn nan pi bèl mèvèy nan depatman sa a."
}, {
  "word": "Bashelye",
  "description": "Yon moun ki resevwa yon diplòm pou etid bakaloreya li."
}, {
  "word": "Baskèt",
  "description": "Yon ti panyen ki fèt avèk latanyen, zo palmis, ti moso banbou.  Kèk fwa,  yon baskèt gen yon lans."
}, {
  "word": "Bat",
  "description": "Depase fòs yon lòt nan yon konfwontasyon."
}, {
  "word": "Batay",
  "description": "Rezilta yon diskisyon ki pouse de moun fashe,  ki pouse plizyè moun rantre nan yon konfwontasyon vyolan."
}, {
  "word": "Batèm",
  "description": "Resevwa lespri-sen nan yon seremoni relijye.  Inisye, rantre nan yon bagay pou premye fwa."
}, {
  "word": "Batiman",
  "description": "Yon kokennshenn, gwo kay ki gen plizyè etaj e kontsriktè li bati li sou yon teren laj.  Yon gwo konstriksyon ki shita sou lanmè, ki vwayaje sou lanmè."
}, {
  "word": "Batize",
  "description": "Patisipe nan yon batèm."
}, {
  "word": "Bato",
  "description": "Yon gwo konstriksyon ki shita sou lanmè e ki kapab vwayaje sou lanmè tou."
}, {
  "word": "Baton",
  "description": " Yon bout bwa ki rive wotè senti yon moun e moun kapab apiye sou li pou pran fòs pou mashe.  Kou yon moun bay yon lòt moun."
}, {
  "word": "Batri",
  "description": " Yon sous elektrisite ki dire yon kantite tan.  Sous elektrisite sa diminye piti, piti, pou jis li disparèt.  Yon pwazon majik ayisyen mete sou wout yon moun pou touye li."
}, {
  "word": "Bay",
  "description": " Transfere yon pwopriyete soti nan men yon moun pou ale nan men yon lòt moun."
}, {
  "word": "Bayonèt",
  "description": "Yon kouto long, de bò file, pwenti, moun lontan yo te konnen itilize pou batay nan lagè.  Moun sa yo pate gen zam ki genyen konnye a pou batay, se ki fè yo te konnen itilize bayonèt."
}, {
  "word": "Baz",
  "description": "Pozisyon kote yon bagay shita.  Nenpòt kote yon bagay jwenn sipò li."
}, {
  "word": "Baze",
  "description": "Eta moun ki mete feblès li, espwa li, sou yon lòt moun san itilize potansyalite li genyen."
}, {
  "word": "Bè",
  "description": "Yon pwodui ki soti nan lèt avèk anpil lòt materyèl ankò tankou pistash."
}, {
  "word": "Bebe",
  "description": "Yon timoun piti ki baze nèt ale sou granmoun li, manman li plis, pou tout bezwen."
}, {
  "word": "Bèbè",
  "description": "Yon moun ki pa kapab pale.  Yon moun ki pèdi pawòl.  Sanble moun ki bèbè toujou soud tou."
}, {
  "word": "Bèf",
  "description": "Yon gwo bèt ki manje zèb e ki kapab rale manje soti nan vant li pou manje lè li grangou.  Yon bèf gen de kòn, de zòrèy, yon gwo tèt, yon gwo boush, yon gwo lang, kat gwo pye avèk yon ke long.  Bèf gen yon son li fè ki sonnen tankou:  Mmmmou… "
}, {
  "word": "Bege",
  "description": "Difikilte pou mo soti nan boush yon moun ,  pou yon moun jwenn mo,  pou pale."
}, {
  "word": "Bèj",
  "description": "Yon koulè ki ant koulè jón avèk koulè gris."
}, {
  "word": "Bèk",
  "description": "Yon ògán nan tout zwazo ki jwe menm wòl boush jwe pou moun.  Yo itilize  bèk la pou manje, shante, defann tèt yo e atake énmi yo.  Boush zwazo."
}, {
  "word": "Bèlfi",
  "description": " Yon fi ki marye avèk pitit gason de paran.  Pitit fi yon mari ou byen yon madanm ki pa pitit lòt mari ou byen madanm nan."
}, {
  "word": "Beliz",
  "description": "Non yon peyi sou kontinan Amerik la e nan Amerik Santral la.  Kapital Beliz se Bèlmopan."
}, {
  "word": "Bèljik",
  "description": "Yon peyi nan nò Frans ki gen fontyè avèk Almay.  Lang yo se Flaman avèk Fransè.  Kapital peyi sa se Briksèl."
}, {
  "word": "Bèlmè",
  "description": "Manman mari ou byen madanm de moun ki marye.  Yon madanm ki pa manman pitit yon mari."
}, {
  "word": "Bèlsè",
  "description": " Sè madanm ou byen sè mari de moun ki marye.  Madanm frè yon moun."
}, {
  "word": "Benediksyon",
  "description": "Rele Bondye pou voye lespri-sen an vini sou yonn, plizyè moun."
}, {
  "word": "Benefis",
  "description": "Kòb yon moun fè anplis lè li vann yon bagay.  Nenpòt sa yon moun resevwa anplis sou yon bagay li bay pou yon lòt, li shanje."
}, {
  "word": "Benefisye",
  "description": "Resevwa yon benefis.  Resevwa yon bagay anplis pou yon bagay ki vann, ki shanje."
}, {
  "word": "Benefisyè",
  "description": " Moun ki resevwa yon bagay anplis sou yon bagay ki vann, ki shanje.  Non yon moun ki ekri nan yon kontra pou resevwa yon montan lajan yon asirans ap peye si mèt asirans la mouri pandan li te ap peye asirans sa a."
}, {
  "word": "Beni",
  "description": "Eta yon moun, yon bagay tankou manje moun ap ale manje, ki resevwa benediksyon."
}, {
  "word": "Benyen",
  "description": "Rantre yon kò nan yon likid ou byen nenpòt lòt bagay.  Yon mashin kapab pase sou yon wout epi benyen moun avèk pousyè.  Lave yon kò avèk dlo."
}, {
  "word": "Bere",
  "description": "Mete yon bagay mou sou yon bagay di epi plati bagay mou an jis li pa kapab plati ankò.  Pase bè, manba sou pen, kasav e latriye."
}, {
  "word": "Berejèn",
  "description": " Grenn vyolèt yon plant kout donnen e li fè bon legim anpil ayisyen renmen.  Gen anpil ayisyen ki pa manje li tou paske berejèn fè moun sa yo malad."
}, {
  "word": "Bese",
  "description": " Diminye wotè."
}, {
  "word": "Bèso",
  "description": "Yon kabann ki fèt pou ti bebe koushe."
}, {
  "word": "Bèt",
  "description": "Nenpòt èt vivan ki pa moun e ki pa sanble avèk moun.  Yon bèt pa kapab pale avèk moun e li pa gen menm entelijans avèk moun."
}, {
  "word": "Betiz",
  "description": "Aksyon, langaj sal yon moun ki pa sanble avèk langaj sosyete a espere de li.  Mo sosyete a pa vle tande ap soti nan boush moun.  Erè yon moun fè."
}, {
  "word": "Betize",
  "description": "Pran direksyon sosyete a pa espere, leve kanpe kont bon bagay.  Fè move shwa."
}, {
  "word": "Betizè",
  "description": "Moun ki pran direksyon sosyete a pa espere a, moun ki pran move direksyon an.  Moun ki fè move shwa a."
}, {
  "word": "Bezig",
  "description": "Yon jwèt kat ki ekzije 128 fèy kat pou jwe li.  Nan jwèt kat sa a, wa yo marye avèk rèn yo e yon jwè kapab demarye yo.  Si yon jwè kente li fè, pi gwo pwen yon jwè kapab fè yon sèl kou sa a, 250 pwen."
}, {
  "word": "Bezwen",
  "description": "Nenpòt kantite ki manke pou fè yon bagay konplè."
}, {
  "word": "Bib",
  "description": "Premye liv moun ekri, pi ansyen liv ki egziste.  Gen anpil liv nan Bib la.  Prèske shak apot Jezi Kris yo te ekri yonn nan liv sa yo.  Kèk nan liv yo se travay plizyè apot ansanm."
}, {
  "word": "Bibliyotèk",
  "description": " Yon kokennshenn liv ki rasanble ansanm yon sèl kote pou lektè jwenn pou yo li.  Lekti nan prèske tout bibliyotèk gratis.  Men, yon moun oblije gen kat yon bibliyotèk pou li kapab ale lakay li avèk yon liv.  Anpil liv yon moun ranje nan yon kwen lakay li."
}, {
  "word": "Biblo",
  "description": "Ti imaj kèk gwo bagay moun mete andedan kay yo pou fè yon pati nan kay la bèl.  Pwodiktè yo itilize materyèl tankou ajil pou fè biblo."
}, {
  "word": "Bibwon",
  "description": "Yon boutèy avèk tetin pou nouri bebe."
}, {
  "word": "Bijou",
  "description": "Yon moso metal tankou lajan, lò, dyaman yon pwofesyonèl prepare sou fòm yon bag, yon shèn, yon zanno, yon bwaslè."
}, {
  "word": "Bip",
  "description": "Yon bri sèk ki fèt, men moun ki tande li pa kapab konnen ki kote li te soti.  Repons yon bipè lè yon moun voye yon mesaj nan li.  Son yon bagay ki tonbe."
}, {
  "word": "Bipè",
  "description": "Yon ti aparèy elektwonik moun itilize pou resevwa mesaj ki soti nan yon aparèy telefòn."
}, {
  "word": "Bis",
  "description": "Repetisyon yon bagay paske yon odyans mande li yon lòt fwa anplis.  Yon gwo mashin ki sanble avèk yon kamyon, men pasaje kapab rantre andedan li pou vwayaje.  Pasaje yon bis kapab evite shanjmann nan tanperati a tankou lapli avèk solèy sho."
}, {
  "word": "Bisiklèt",
  "description": "Yon veyikil ki gen de wou, shèn avèk pedal pou li deplase.  Moun ki monte  yon bisiklèt oblije kenbe gidon li dwat pandan li ap pedale.  San sa, bisiklèt la pa kapab rete dwat sou wout li e moun nan ap tonbe."
}, {
  "word": "Biwo",
  "description": "Yon tab ki gen tiwa pou mete plim, papye, kreyon, e latriye.  Yon shanm, yon kay moun ki ap fè biznis itilize pou resevwa kliyan yo.  Yon shanm andedan yon biznis kote responsab biznis la fè tout travay li."
}, {
  "word": "Biyè",
  "description": "Lajan papye.  Yon moso papye yon moun itilize pou voye yon mesaj lè li pa prepare pou fè lèt nòmal."
}, {
  "word": "Biznis",
  "description": "Vann mashandis, sèvis pwofesyonèl.  Yon kay ki gen moun ki ap fè mashandiz, vann mashandiz, vann pwofesyonèl sèvis andedan li."
}, {
  "word": "Blag",
  "description": "Yon konvèsasyon sou anpil bagay san konsantre sou yon sijè an patikilye.  Moun bay blag avèk moun ki nan menm jenerasyon avèk yo ou byen anviwon menm laj avèk yo.  Yon diskou ki fè odyans la ri."
}, {
  "word": "Blage",
  "description": "Pale de anpil bagay san konsantre sou yonn.  Divage.  Bay blag avèk lòt moun."
}, {
  "word": "Blagè",
  "description": "Yon moun ki konnen bay blag.  Yon blagè konnen tout ti aranjman pou li fè nan yon blag pou moun shita tande e pou moun ri tou. "
}, {
  "word": "Blam",
  "description": "Responsablite ki tonbe sou do yon moun pou aksyon li."
}, {
  "word": "Blame",
  "description": "Mete responsablite sou do yon moun pou aksyon."
}, {
  "word": "Blan",
  "description": "Koulè, non yon ras moun.  Koulè nòmal dan moun.  Yonn nan kat koulè moun ki egziste sou tè a:  blan, wouj, jón, nwa.  San tash, san peshe."
}, {
  "word": "Blanshi",
  "description": "Fè yon bagay vini gen koulè blan.  Retire malpwoprete nan yon bagay."
}, {
  "word": "Blaze",
  "description": "Disparisyon vrè vizaj, koulè orijinal yon moun, yon bagay."
}, {
  "word": "Ble",
  "description": "Yon koulè ki sanble avèk koulè syèl la, koulè yon basen dlo.  Ble maren, Yon koulè ble ki prèske nwa.  Yon vejetab fèmye kiltive nan peyi Etazini e yo fè farin avèk li."
}, {
  "word": "Blese",
  "description": "Fè yon moun, yon bagay mal.  Koupe kò yon èt vivan pou san soti.  Di yon moun pawòl ki fè li mal.  Di yon moun yon verite li ap eseye evite."
}, {
  "word": "Blofe",
  "description": "Bay manti.  Di moun yon bagay ki pa vrè avèk espwa moun nan ap kwè bagay sa a vrè.  Aksyon yon jwè pokè ki pa gen kat nan men li pou li genyen yon pati pokè epi li mize plis lajan pou fè lòt jwè panse li ap genyen jwèt la."
}, {
  "word": "Bloke",
  "description": "Anpeshe yon moun, yon bagay kontenye yon bagay ki te kòmanse."
}, {
  "word": "Bo",
  "description": "Rale lè rantre nan yon boush ki kole avèk yon lòt boush, nenpòt lòt bagay tankou figi yon moun."
}, {
  "word": "Bò",
  "description": " Yon moso nan nenpòt bagay.  Yon fas nan nenpòt bagay.  Yon ekspresyon moun itilize pou montre, de bagay, yonn pi pre lòt la."
}, {
  "word": "Bobin",
  "description": " Yon bagay ki vlope avèk fil.  Yon aparèy elektwonik ki fè kouran vwayaje an won pou kreye yon jaden manyetik, konsa yon metal nan jaden manyetik la tounen leman."
}, {
  "word": "Bobine",
  "description": "Vire an won.  Aksyon yon bagay ki ap vire an won.  Vlope yon bagay avèk fil."
}, {
  "word": "Bòdi",
  "description": "Sou kote nenpòt bagay.  Nenpòt bò ki te ogmante pou fè yon bagay pi solid."
}, {
  "word": "Bòfrè",
  "description": "Mari sè yon moun.  Frè madanm yon mari."
}, {
  "word": "Bòpè",
  "description": "Mari manman yon moun lè mari a pa papa pitit manman."
}, {
  "word": "Bòkò",
  "description": "Yon gason e yon dirijan seremoni lwa tankou vodou nan peyi Ayiti.  Yon gason e yon doktè fèy ki itilize espri sinatirèl pou konpoze medikaman li.  Yon dirijan move espri ki touye moun.  Yon sèvitè lwa ki pèmèt lwa yo itilize kò li pou yo kominike avèk vivan yo, pitit fèy yo."
}, {
  "word": "Bòl",
  "description": "Yon veso won e fon pou moun mete manje.  Yon bòl pi bon pou sèvi bouyon avèk sòs paske asyèt twò plat pou djòb sa a."
}, {
  "word": "Bòlèt",
  "description": "Lotri peyi Ayiti a.  Ayisyen jwe bòlèt an kashèt nan kèk lòt peyi tankou Etazini.  Yo telefone moun nan peyi Ayiti pou konnen ki boul ki soti nan jou sa a."
}, {
  "word": "Bon",
  "description": "Tout bagay ki ale egzateman jan sosyete a espere li te dwe ale.  Tout bagay moun renmen gen nan boush li.  Yon nouriti moun renmen.  Nenpòt sa ki fè yon moun santi li byen."
}, {
  "word": "Bòn",
  "description": "Limit yon bagay.  Kote yon bagay kòmanse, fini.  Yon travayè andedan kay yon moun ki fè manje, netwaye, lave, pase rad."
}, {
  "word": "Bonm",
  "description": "Yon veso won, fon moun itilize sou dife pou fè manje pou plizyè moun manje.  Manje ki fini fèt nan bonm ale nan asyèt, bòl pou moun manje.  Yon kannistè eksplozif ki kapab fè anpil dega tankou touye moun, kraze kay."
}, {
  "word": "Bonbade",
  "description": "Lage yon kannistè eksplozif nan yon zòn pou kraze zòn nan, bagay nan zòn nan.  Fè yon gwo van nan yon shanm ki gen anpil moun; rezilta van sa a fè yon travay ki kapab konpare avèk travay yon bonb."
}, {
  "word": "Bonbon",
  "description": " Yon bagay ki tèlman bon, yon sèl mo bon pa kont pou di li bon.  Nenpòt pat farin melanje avèk dlo, sik, e latriye epi ki ale nan fou."
}, {
  "word": "Bondi",
  "description": "Eta yon bagay ki ale frape yon kote epi li retounen nan direksyon li te soti."
}, {
  "word": "Bondye",
  "description": "Espri diven tout relijye kwè ki kreye syèl la avèk tè a.  Gran frè Satan ki te shase Satan epi voye li sou tè a paske Satan te vle pran lemond nan men li.  Yon sèl espri tout relijye ap sèvi.  Yon espri ki toujou prezan."
}, {
  "word": "Bonjou",
  "description": "Yon mo moun nan ti kiminote yo itilize pou salye lòt moun yo rankontre nan maten.  Swè yon moun fè yon lòt pou jounen moun sa pase byen."
}, {
  "word": "Bonswa",
  "description": "Yon mo moun nan ti kominote yo itilize pou salye yon lòt moun lè yo rankontre li aswè, apre mitan jounen an.  Swè yon moun fè yon lòt avèk espwa sware moun nan ap ale pase byen."
}, {
  "word": "Bonte",
  "description": "Kalite yon moun genyen ki ale nan direksyon sosyete kote li ap viv konsidere kòm bon.  Eta yon moun ki renmen ede lòt moun ki nan bezwen.   "
}, {
  "word": "Bòs",
  "description": "Moun ki konnen kijan pou li fè, ranje yon bagay ki kase, ki pa fonksyone byen.  Pwofesyonèl nan ti zòn peyi Ayiti yo tankou ebenis, òfèv, e latriye. "
}, {
  "word": "Bosou",
  "description": "Pi piti nan twa timoun yon manman fè pandan yon sèl akoushman.  "
}, {
  "word": "Boubou",
  "description": " Gade bèbè."
}, {
  "word": "Bouboun",
  "description": "Pati nan kò yon fi ki pi entim pou li plis pase tout rès kò li.  Kote yon fi itilize pou pipi, koupe, pouse pitit soti nan vant li, pran plezi."
}, {
  "word": "Bouda",
  "description": "Pati nan yon pye bwa ki toushe tè a.  Pati dèyè kò moun ant do li e janm li.  Moun itilize tou ki nan mitan bouda li pou pouse poupou deyò.  Se pati sa a nan kò fi anpil gason toujou enterese gade plis."
}, {
  "word": "Bouden",
  "description": "Yon bagay fo yon moun bay yon lòt moun, san lòt moun nan pa konnen, pou yon bon bagay."
}, {
  "word": "Bouji",
  "description": " Prèske menm bagay avèk balèn.  Yon fabrikasyon ayisyen ki gen yon mèsh koton avèk lasi; konsa li kapab boule pou bay limyè.  Pè avèk pastè itilize balèn nan legliz, bòkò itilize bouji nan badji.  Kidonk bouji se yon enstriman pou rele lespri yo."
}, {
  "word": "Boujonnen",
  "description": "Lè yon plant, yon pye bwa, bransh yon pye bwa kòmanse grandi."
}, {
  "word": "Boujwa",
  "description": "Moun nan ansyen sosyete fransè yo ki te gen tout pouvwa politik, ekonomik, e latriye.  Moun nan sosyete ayisyen yo ki panse yo siperyè mas pèp la e ki gen pouvwa ekonomik e politik nan men yo.  Yon ti gwoup moun ki fè sa yo vle nan peyi a paske yo gen gwo lajan nan men yo. Boujwazi, Denominasyon gwoup boujwa yo.  Nenpòt koush nan sosyete anyisyen an ki panse li siperyè mas peyi a e ki gen pouvwa  ekonomik e politik peyi a nan men yo."
}, {
  "word": "Bouk",
  "description": "Ti vil nan peyi Ayiti.  Yon komin, pou moun andeyò ti vil sa a, ki reprezante yon gwo vil.  Yon pati nan yon sentiwon ki ede moun boukle sentiwon an.  Bouk Kabrit, Yon mal kabrit."
}, {
  "word": "Boukan",
  "description": "Yon flanm dife moun prepare pou diminye fatray, pou fè espas, pou boukannen yon bagay, pou shofaj."
}, {
  "word": "Boukannen",
  "description": "Mete, yon bagay pou moun manje, sou flanm dife pou jis li  vini mou, li kwit.  Mete yon bagay nan boukan dife."
}, {
  "word": "Bouki",
  "description": "Yon karaktè nan lejand ayisyen ki toujou gen pou li kontrekare Timalis.  Yon moun ki kapab pote anpil shay."
}, {
  "word": "Boukina Faso",
  "description": "Yon peyi nan nò lwès kontinan Afrik la."
}, {
  "word": "Boukle",
  "description": "Kole de pwent yon sentiwon ansanm pou li kapab peze yon rad sou senti moun; konsa rad la pa kapab glise desann."
}, {
  "word": "Boul",
  "description": "Nenpòt bagay ki won.  Yon bagay won moun itilize pou jwe volebòl, foutbòl, e latriye.  Pati nan yon bagay ki pouse sou deyò."
}, {
  "word": "Boulanje",
  "description": "Yon kay ki gen yon fou andedan li e moun itilize pou kwit pen, gato, bonbon, e latriye.  Nan gwo vil Ayiti yo, anpil boulanje gen yon fou an metal ki brile gaz ou byen elektrisite.  Nan vil pwovens yo, moun yo fè fou yo avèk labou e wòsh ou byen mòtye e wòsh ou byen brik.  Fou sa yo gwo anpil e yo kapab anfounen anpil plato pen an menm tan."
}, {
  "word": "Boule",
  "description": "Resevwa twòp shalè pou vini transfòme an dife.  Kole dife sou yon kò ki pa kapab tolere dife, shalè a.  Kole dife sou yon kò ki pa tolere dife pou jis li vini koulè nwa e fasil pou kraze, jis li kraze menm."
}, {
  "word": "Boulèt",
  "description": "Yon ti boul.  Yon boul ki soti nan boush yon kanno.  Yon ti boul ki fèt avèk vyann e ki fri nan lwil."
}, {
  "word": "Boulon",
  "description": "Yon moso metal avèk filyè sou kote yon tou won andedan li.  Deyò yon boulon gen kat, senk, ou byen sis kwen; konsa yon kle kapab kenbe li pou boulonnen yon vis."
}, {
  "word": "Boulonnen",
  "description": "Vise.  Mete yon boulon nan pwent yon vis epi vire li pou filyè boulon an rantre nan fliyè vis la pou jis boulon an mashe kont sou vis la."
}, {
  "word": "Boulva",
  "description": "Yon gran ri nan mitan yon vil."
}, {
  "word": "Boulvèse",
  "description": "Toumante.  Eta yon moun ki pa kapab refleshi nòmalman, ki anvi vwomi kèk.  Eta yon moun ki pa janm kontinye yon travay, yon konvèsasyon, anyen ditou lè li kòmanse li."
}, {
  "word": "Boum",
  "description": "Eklatman.  Aparisyon plisyè bagay ansanm.  Yon bri tout moun ki pre ap toujou tande kapab gen anpil dega ki kontinye apre li."
}, {
  "word": "Bourik",
  "description": "Yon bèt kout ki kapab pote anpil shay.  Yon bèt ki nan menm fanmiy avèk sheval, men li pi piti pase yon sheval e li gen zòrèy long.  Papa yon milèt.  Yon moun ki gen rayaksyon vyolan menmsi yon lòt moun byen dous avèk li.  Yon moun ki pa konnen jwe, men ki konnen goumen byen."
}, {
  "word": "Bourike",
  "description": "Travay anpil, pote anpil shay tankou yon bourik."
}, {
  "word": "Bous",
  "description": "Yon ti sak fi kenbe nan men yo lè yo soti lakay yo e ki kapab genyen kòb, fa e latriye andedan li.  Yon ti sak ki vlope an de pou gason mete tout enfòmasyon enpòtan yo bezwen kenbe nan pòsh yo avèk lajan pou yo depanse."
}, {
  "word": "Boush",
  "description": "Yon tou kote yon bagay kapab antre andedan yon lòt.  Yon tou nan figi moun e anba nen moun.  Moun itilize li pou manje bwè, pale, shante e latriye."
}, {
  "word": "Boushe",
  "description": "Elimine yon boush.  San entelijans, edikasyon, kontak avèk moun eklere, sosyete sivilize."
}, {
  "word": "Bouskile",
  "description": "Pouse moun, yon bagay soti nan yon pozisyon avèk anpil fòs."
}, {
  "word": "Bout",
  "description": "Moso nan yon bagay.  Finisman yon bagay, yon travay, yon wout, yon devwa."
}, {
  "word": "Boutèy",
  "description": "Yon resipyan boush li kapab gen lajè kont pou yon dwèt pous rantre, men anba li kapab kenbe anpil likid. "
}, {
  "word": "Bouton",
  "description": "Yon ti moso zo, metal avèk de ou byen kat ti tou nan li ki pèmèt moun fèmen rad sou yo.  Yon ti boul maladi ki grandi soti nan kò yon èt vivan.  Yon ti moso plastik, metal teknisyen mete sou deyò yon aparèy pou pèmèt moun ki ap itilize aparèy la kontwole pyès andedan aparèy sa a."
}, {
  "word": "Boutonnen",
  "description": "Rantre bouton nan yon rad nan tou ki fèt pou sa."
}, {
  "word": "Bouyi",
  "description": "Mouvman yon likid ki nan yon resipyan ap fè lè shalè toushe kò resipyan epi pouse tanperati li rive a san degre.  Mouvman anlè, sou fas yon likid ki se rezilta yon lòt mouvman ki ap fèt anba likid sa a."
}, {
  "word": "Bouyon",
  "description": "Yon manje fòtifyan ki gen legim, vyann, avèk viv nan li.  Premye tèks yon moun ekri avèk entansyon pou korije li anvan odyans li wè tèks sa a."
}, {
  "word": "Bouzen",
  "description": "Yon fi ki koushe avèk nenpòt gason san li pa shwazi gason sa yo.  Yon poul.  Yon moun ki fè lanmou avèk yon lòt moun pou lajan.  Yon moun ki vann yon pati nan kò pou lajan."
}, {
  "word": "Bòy",
  "description": "Yon boul ayisyen prepare avèk farin frans pou mete nan bouyon.  Andedan bòy pa janm fini kwit tout bon vre, men anpil ayisyen renmen manje li.  Yo mete li nan sòs vyann tou."
}, {
  "word": "Brezil",
  "description": "Yon gwo peyi nan Amerik Sid la kote moun yo pale Pòtigè.  Li kole avèk Ajantin."
}, {
  "word": "Bri",
  "description": "Nenpòt son ki an dezòd.  Yon son ki pi wo pase sa ki te egziste anvan li."
}, {
  "word": "Brik",
  "description": "Yon ti moso mòtye moun prepare avèk ajil wouj epi yo anfounen li.  Mason itilize brik pou fè mi pou kay e latriye."
}, {
  "word": "Brile",
  "description": "Gade Boule."
}, {
  "word": "Bwa",
  "description": "Pati entim nan kò yon gason.  Ponyèt yon moun.  Moso yon plant, tout kò plant la menm.   Anpil peyizan ayisyen di bwa mango fè bon plansh."
}, {
  "word": "Bwadòm",
  "description": "Yon pye bwa peyizan itilize bransh li pou fè lantouray, manshe wou e latriye.  Menm pye bwa sa boujonnen fèy kabrit renmen manje."
}, {
  "word": "Bwase",
  "description": "Rantre bwa nan yon bagay epi vire bwa a tou won andedan bagay la.  Si yon moun ap eseye vire ren li tou won, moun kapab di li ap bwase ren li. "
}, {
  "word": "Bwasè",
  "description": "Moun ki ap bwase a."
}, {
  "word": "Bwat",
  "description": "Yon bagay ki gen sis fas."
}, {
  "word": "Bwè",
  "description": "Mete yon likid nan boush pou li glise desann nan vant.  Fè likid rantre nan yon lòt kò."
}, {
  "word": "Bwòs",
  "description": " Yon moso materyèl plat ki gen anpil ti dan tankou plim ki kanpe nan li; konsa lè li pase sou yon fasad li rabote tout sa ki te sou wout li."
}, {
  "word": "Bwose",
  "description": "Pase bwòs sou yon bagay pou netwaye li, pou retire tout sa ki sou li tankou kras. "
}, {
  "word": "Bwosè",
  "description": "Moun ki pase bwòs la, ki ap bwose a."
}, {
  "word": "Byè",
  "description": "Yon bwason ki gen alkòl nan li.  Moun ki fè byè yo itilize dlo kann pou fè li."
}, {
  "word": "Byen",
  "description": "Tout sa ki bon, ki fèt jan sosyete a espere li te sipoze fèt.  Bondye."
}, {
  "word": "Byenfè",
  "description": "Yon entansyon pou fè byen ki bay satisfaksyon a moun ki benefisye byen an."
}, {
  "word": "Byenfezan",
  "description": "Moun ki fè byen."
}, {
  "word": "Byenfezans",
  "description": "Aksyon yon moun ki fè byen."
}, {
  "word": "Byenveyan",
  "description": " Yon moun ki aksepte responsablite pou siveye yon moun, yon bagay pou anyen mal pa rive."
}, {
  "word": "Byenveyans",
  "description": "Aksyon yon moun ki aksepte responsablite pou voye je sou yon bagay pou anyen mal pa rive."
}, {
  "word": "C",
  "description": "Twazyèm lèt nan alfabèt lang Kreyòl la.  Li kapab ranplase lèt \"K\" ou byen lèt \"S\" pou ekri yon mo."
}, {
  "word": "Cadillac",
  "description": "Yon konpayi, yon mak mashin ameriken moun te konsidere tankou yon gwo mak lè li te premye rantre sou mashe mondyal la.  Non an toujou rete gwo paske pa gen lòt mashin ki ranplase Cadillac tout bon vre."
}, {
  "word": "Canada",
  "description": "Yon gwo peyi nan Amerik Nò a e nan nò Etazini.  Li divize an de pati: Kebèk avèk Montreal.  Moun Montreal pale Fransè e moun Kebèk pale Anglè.  Peyi sa gen yon gouvènman rwayalis; konsa yo pa gen prezidan.  Se yon premye minis ki gouvène peyi a."
}, {
  "word": "Cap-Haïtien",
  "description": "Gade Kap-Ayisyen."
}, {
  "word": "Chevrolet",
  "description": "Yon konpayi, mak mashin ameriken ki gen yon senbòl ki senble avèk de rektang, yonn kwaze sou lòt la."
}, {
  "word": "Chrysler",
  "description": "Yon konpayi, mak mashin ameriken."
}, {
  "word": "CPU",
  "description": "Yonn nan sen pati ki fòme yon òdinatè (ekran, òdinatè, sourit, klavye, enprimè).  Abrevyasyon CPU a soti nan non Anglè a pou Central Processing Unit.  An reyalite CPU a se li menm menm ki òdinatè a.  Tout lòt pati yo sèlman ede moun avèk òdinatè kominike."
}, {
  "word": "Croix-des-Bouquets",
  "description": "Yon vil nan peyi Ayiti ki tou pre kapital peyi a, nan direksyon nò-lwès e sou wout pou ale nan depatman Sant la.  Gade Kwadèboukè."
}, {
  "word": "Croix-des-Missions",
  "description": "Gade Kwadèmisyon."
}, {
  "word": "D",
  "description": "Katriyèm lèt nan alfabèt Kreyòl la.  Li bay menm son avèk shif \"2\" ki ekri \"De\"."
}, {
  "word": "Dam",
  "description": "Fi ki nan yon bal.  Yon ki abiye yon fason respektye ki fè depi moun wè li yo deja devine li se yon madanm.  Yon fanm ki respekte tèt li."
}, {
  "word": "Damye",
  "description": "Yon jwèt ki jwe avèk 20 pyon pou shak nan de jwè yo.  Shak fwa opòtinite prezante pou yon jwè jwenn yon espas vid dèyè yon pyon opozan li a epi pase pyon pa li a lòt bò pyon opozan an, li retire yon pyon opozan an nan jwèt la.  Jwèt la kontinye konsa jis pyon yon jwè fini pran tout pyon lòt Jwè a anvan.  Jwè sa a pèdi.  Shak fwa pyon yon opozan rive nan liy ki pi pre lòt jwè a, jwè sa a fèt pou li mete yon lòt pyon sou pyon ki rive nan liy sa.  Tou de pyon sa yo kapab deplase ansanm pou retire yon lòt pyon nan nenpòt distans sou yon liy dwat."
}, {
  "word": "Damyen",
  "description": "Yon zòn nan nò Pòtoprens kote pi gwo lekòl agwonomi peyi a sitiye.  Tout moun rele lekòl la Damyen tou."
}, {
  "word": "Dan",
  "description": "Yon kantite zo ki grandi andedan boush.  Yon moun kapab genyen trant-de dan nan boush li lè li fini granmoun.  Yon timoun kapab genyen venn-kat dan nan boush li pou yon bon bout tan anvan li rive gen rès yo."
}, {
  "word": "Danje",
  "description": "Yon obstak sou wout yon moun ki kapab kòz yon mal tankou lanmò."
}, {
  "word": "Dans",
  "description": "Aksyon moun ki ap danse. Dans shèz, Yon dans kote moun ki ap danse yo a fè wonn plizyè shèz, men gen yon dansè an plis ke kantite shèz ki genyen an.  Shak fwa mizik la sispann jwe, tout moun gen pou yo shashe yon shèz pou shita.  Moun ki pa jwenn yon shèz pou li shita a ap soti nan dans la ansanm avèk yonn nan shèz yo.  Sa kontinye konsa jis yon sèl moun rete nan dans la epi li genyen."
}, {
  "word": "Danse",
  "description": "Yon fason moun souke kò yo nan ton yon mizik.  Souke kò pandan mizik ap jwe.  Souke kò tankou lè mizik ap jwe, menmsi pa gen mizik ki ap jwe."
}, {
  "word": "Dansè",
  "description": "Moun ki souke kò li lè misik ap jwe.  Moun ki souke kò li tankou lè mizik ap jwe menmsi mizik pa ap jwe."
}, {
  "word": "Danti",
  "description": "Jan dan ranje nan boush.  Moun ki gen bèl ranje dan, gen bèl danti.  Si dan yon moun fè ès (S), moun sa gen move danti."
}, {
  "word": "Dantis",
  "description": "Doktè ki te ale lekòl pou etidye dan e ki kapab analize, netwaye dan, mete fo dan pou moun."
}, {
  "word": "Dantisyon",
  "description": "Jan dan grandi nan boush yon moun.  Yon etap nan lavi moun kote dan ti bebe ap parèt nan jansib yo yonn apre lòt anvan yon gen venn-kat dan nan boush yo."
}, {
  "word": "De",
  "description": "Shif ki vini apre en an.  En ogmante sou en.  Yonn plis yon lòt.  Yon ti aparèy koutiryè mete nan pwent dwèt yo pou koud; konsa egiy la pa kapab pike dwèt yo. "
}, {
  "word": "Debake",
  "description": "Retire shay sou yon bagay.  Eta yon bagay, yon moun ki desann soti yon kote."
}, {
  "word": "Defèt",
  "description": "Shanje fòm yon bagay ki te fèt deja.  Kraze yon bagay."
}, {
  "word": "Defini",
  "description": "Bay yon bagay, yon mo yon definisyon."
}, {
  "word": "Definisyon",
  "description": "Lide ki esplike kisa yon bagay, yon mo vle di;  konsa lè moun wè mo sa, bagay sa yo kapab kole lide sa a sou mo a, bagay la."
}, {
  "word": "Degobe",
  "description": "Yon ti koush lè ki soti nan boush yon moun paske moun nan te kite tan pase apre li te santi grangou anvan li manje.  Reyaksyon gaz kabonik nan vant moun ki ap shashe kote pou yon soti e lè yo soti, yo fè yon bri moun rele gaz tou."
}, {
  "word": "Degre",
  "description": "Nivo yon moun, yon bagay rive.  Dènye klas yon moun te pase nan yon disiplin lekòl.  Yon mezi moun itilize pou kontwole tanperati.  Gen twa mezi konsa:  Celcius, Fahrenheit, Kelvin."
}, {
  "word": "Dekòde",
  "description": "Defèt yon kòd yon fason pou dekole de bransh ki rantre nan konstitisyon kòd la."
}, {
  "word": "Dekorasyon",
  "description": "Ogmante bèl bagay tankou kèk koulè remakab, flè pou fè yon bagay vini bèl tou.  Bagay ki kontribye pou dekore yon lòt bagay."
}, {
  "word": "Dekoud",
  "description": "Retire kouti ki te kenbe yon moso twal ou byen nenpòt lòt bagay ki kapab koud."
}, {
  "word": "Dekouvri",
  "description": "Enfòme moun sou egzistans yon bagay yo pate janm konnen.  Retire kouvèti sou yon bagay ki te kouvri."
}, {
  "word": "Dekrase",
  "description": "Retire kras ki sou yon bagay, yon kò."
}, {
  "word": "Delivre",
  "description": "Retire yon gwo shay, yon responsablite , yon akizasyon sou do yon moun.  Eta yon manman ki fini pouse yon pitit soti nan vant li."
}, {
  "word": "Demisyon",
  "description": "Aksyon yon mouun ki retire tout responsablite yon djòb sou do li.  Aksyon yon moun ki kite yon djòb, ki remèt patwon li yon lèt pou di li retire tèt li nan pozisyon li te okipe a."
}, {
  "word": "Demisyone",
  "description": "Kite yon djòb, bay yon patwon yon lèt demisyon."
}, {
  "word": "Demoli",
  "description": "Pèdi yon fòm solid pou kraze e vini plat atè."
}, {
  "word": "Demolisyon",
  "description": "Jan yon bagay pèdi fòm li epi kraze plat atè. Etap yon bagay pase lè li ap demoli."
}, {
  "word": "Demonstrasyon",
  "description": "Montre potansyalite yon bagay.  Montre kisa yon bagay kapab akonpli, kapab fè.  Montre kijan yon bagay fonksyone.  Mete yon bagay devan je moun, kote pou moun kapab wè li."
}, {
  "word": "Demwazèl",
  "description": "Yon fi ki sanble avèk yonn ki gen tout kalite yon fi bezwen pou li genyen mennaj epi marye.  Yon laj lè yon jèn fi rive nan li, moun kwè li kapab gen mennaj, marye.  Madmwazèl."
}, {
  "word": "Depatcha",
  "description": "Rashe yon bagay moso pa moso; konsa li ap pèdi fòm orijinal li te genyen an."
}, {
  "word": "Depatman",
  "description": "Yon seksyon, yon pati nan yon bagay ki diferan de rès bagay la, lòt pati nan bagay la.  Depatman Grandans, Yonn nan nèf depatman peyi Ayiti yo.  Li sitiye an fas Gòlf Lagonav la e nan sid-lwès peyi a.  Depatman Latibonit, Yonn nan nèf depatman peyi Ayiti yo e yonn nan twa depatman ki nan mitan peyi a tou.  Se la ayisyen kiltive plis diri e gen anpil zòn istorik nan depatman sa a.  Depatman Lwès, Yonn nan nèf depatman peyi Ayiti e yon lòt nan twa depatman ki nan mitan peyi a.  Se la kapital Ayiti a, Pòtoprens, ye.  DepatmanNò, Yonn nan nèf depatman peyi a kote dezyèm vil peyi a, Kap-Ayisyen, ye.  Se la pi gwo moniman peyi a, Sitadèl-Laferyè, ye.  Depatman Nò-Lès, Yonn nan nèf depatman peyi Ayiti ki sou kote lès Depatman Nò a.   Depatman Nò-Lwès, Yonn nan nèf depatman peyi Ayiti yo ki sou kote lwès Depatman Nò a.  Pòdepè, kapital depatman sa a, se yonn nan pi ansyen vil nan peyi a.  Depatman Sant, Yonn nan nèf depatman nan peyi Ayiti yo e se yonn tou nan twa depatman ki nan mitan peyi a.  Se la baraj flèv Latibonit la ye, yon baraj ki bay kapital peyi a elektrisite.  Kèk vil ki sou wout kote fil kouran yo pase benefisye ti kras nan elektrisite baraj sa a bay la tou.  Depatman Sid, Yonn nan nèf depatman peyi Ayiti yo ki sou yon prèskil nan sid peyi a.  Gen anpil bèl plaj nan zòn sa a.  Depatman Sid-Lès, Yonn nan nèf depatman Peyi Ayiti yo e se yonn nan twa depatman ki fòme prèskil kote Depatman Grandans avèk Depatman Sid la ye a.  Li kole avèk Repiblik Dominikèn e li gen anpil bèl plaj tankou tout lòt depatman nan peyi a ki sou kote lanmè."
}, {
  "word": "Depite",
  "description": "Yon enplwaye leta, dapre konstitisyon peyi a, moun nan yon komin eli pou ale reprezante komin nan nan Shanm peyi a kote tout depite rankontre pou diskite pwoblèm komin yo avèk lwa.  Nan moman diktati yo, gwo shèf nan depatman yo, nan kapital peyi a te konnen fè magouy pou nonmen moun pa yo nan pozisyon sa a."
}, {
  "word": "Depo",
  "description": "Yon shanm nan yon kay, yon ti kay nan lakou yon gwo kay, kote moun sere afè yo pou jwenn li lè yo bezwen li.  Kote mèt yon boutik, yon magazen, yon mashann mete mashandiz li pou jwenn lè gen anpil demand."
}, {
  "word": "Deposede",
  "description": "Retire bagay yon moun posede nan men li."
}, {
  "word": "Depoze",
  "description": "Mete yon bagay shita nan yon pozisyon.  Elimine yon lyen avèk yon moun, yon zanmi.  Mete kòb sou yon kont nan bank."
}, {
  "word": "Depozit",
  "description": "Yon bagay yon moun mete shita nan yon pozisyon.  Travay yon moun ki mete kòb an plis sou yon kont nan bank."
}, {
  "word": "Deraye",
  "description": "Soti sou yon shemen dwat pou pran yon direksyon ki pa rantre nan wout nòmal la.  Aksyon yon tren ki kite ray li pou pran wout san ray."
}, {
  "word": "Desandan",
  "description": "Moun ki soti anlè pou rive anba.  Pitit pitit de moun, de bèt, yon ras, yon peyi.  Yon milèt se desandan yon mal bourik avèk yon femèl sheval."
}, {
  "word": "Desanm",
  "description": "Douzyèm, dènye, mwa nan yon ane.  "
}, {
  "word": "Desann",
  "description": "Soti nan yon pozisyon ki pi wo pou rive nan yon pozisyon ki pi ba.  Soti anlè pou rive anba."
}, {
  "word": "Desè",
  "description": "Yon bagay tankou konfiti, fri moun manje apre yo fini manje yon gwo repa."
}, {
  "word": "Desepsyon",
  "description": "Eta yon moun santi li lè espwa li te genyen sou yon lòt moun disparèt, pa kapab kontinye egziste."
}, {
  "word": "Deshay",
  "description": "Yon likid ki soti andedan yon gason, yon mal bèt lè li voye andedan yon fi, yon femèl bèt.  Likid sa a gen plizyè milyon spèmatozoyid nan li."
}, {
  "word": "Deshennen",
  "description": "Demare yon bagay, yon moun ki te mare avèk shèn.  Yon moun ki aji yon fason ki fè lòt moun panse pa gen anyen ki te kapab anpeshe li fè bagay sa a, menm shèn."
}, {
  "word": "Deshouke",
  "description": "Retire yon shouk nan tè.  Retire yon moun nan yon pozisyon.  Mo sa te popilè anpil nan peyi a nan moman kriz politik ane 1985-90 yo."
}, {
  "word": "Deshoukè",
  "description": "Moun ki kontribye pou deshouke yon shouk, yon moun nan yon pozisyon."
}, {
  "word": "Desi",
  "description": "Eta yon moun santi li apre yon desepsyon."
}, {
  "word": "Desinatè",
  "description": "Moun ki fè desen, moun ki gen don pou fè desen.   Yon moun ki desine yon pwogram òdinatè."
}, {
  "word": "Desine",
  "description": "Fè desen.  Ranje tout fenèt, bouton, liy sèvis, kòmand nan yon pwogram òdinatè anvan pwogramè a ekri liy ki koresponn avèk desen sa yo."
}, {
  "word": "Desizyon",
  "description": "Dènye analiz yon moun fè anvan li jwenn yon konklizyon.  Jan yon moun deside."
}, {
  "word": "Destinasyon",
  "description": "Kote yon bagay gen pou li rive a."
}, {
  "word": "Destinatè",
  "description": "Moun, nan entansyon moun ki ap voye yon bagay, ki ap resevwa bagay la.  Pou moun ki ap voye yon bagay, se moun ki ap resevwa bagay la."
}, {
  "word": "Destine",
  "description": "Jan lanati te deja ranje pou yon bagay pase."
}, {
  "word": "Dèt",
  "description": "Lajan yon moun gen pou li remèt yon lòt moun paske lè li te pran lajan sa a nan men moun nan li te pwomèt pou remèt li. "
}, {
  "word": "Detant",
  "description": "Nenpòt moman plezi.  Yon bal. Yon piknik.  Yon moman anbyans."
}, {
  "word": "Detere",
  "description": "Retire yon bagay anba tè.  Rekòmanse pale de yon bagay, yon sijè."
}, {
  "word": "Detire",
  "description": "Rale shak pwent yon bagay nan de direksyon opoze epi gade bagay la ki ap vini pi long.  Tashe pwent yon bagay solid nan yon bagay epi rale lòt pwent la pandan bagay ap vini pi long."
}, {
  "word": "Detounman",
  "description": "Yon eta kote tout bagay pèdi, kite lòd yo te ap sib la, pa gen moun ki kapab kontwole anyen.   Yon bon egzanp detounman se sitiyasyon politik yon peyi, kèk minit, apre yon koudeta."
}, {
  "word": "Detri",
  "description": "Elimine tout fòs, kapasite, mwayen ki te gen nan yon bagay, yon moun.  Touye.  Disparèt.  Fè yon bagay disparèt.  Retire lavi nan yon bagay."
}, {
  "word": "Devan",
  "description": "Fasad ki pi bèl la epi se li moun toujou wè anvan.  Fasad nan yon kay ki toujou sou bò lari a.  Direksyon moun mashe a.  Fasad nan kò moun kote je, nen, boush, e latriye, ye."
}, {
  "word": "Devanjou",
  "description": "Yon moman nan maten, vè katrè konsa, anvan klate jounen an parèt. "
}, {
  "word": "Devanti",
  "description": "Pati devan nenpòt bagay."
}, {
  "word": "Devastasyon",
  "description": "Aksyon yon bagay ki devaste tankou siklòn, larivyè ki move.  Aksyon yon bagay ki kraze tout sa ki sou wout li pandan li ap pase epi kite moun nan pwoblèm pou repare sa li kraze yo."
}, {
  "word": "Devaste",
  "description": "Kraze tout sa ki yon kote san diskriminasyon epi kite moun nan pwoblèm pou repare dega yo."
}, {
  "word": "Devègonde",
  "description": "Di mo sosyete a konsidere tankou mo sal san konsidere ki moun ki ap koute mo sa yo:  timoun ou byen granmoun."
}, {
  "word": "Devine",
  "description": "Itilize konesans pèsonèl pou jwenn repons yon kesyon, solisyon yon pwoblèm, e latriye san konnen si se li vrè repons la, vrè solisyon an davans.  Lè yon moun fini devine, li bezwen yon konfimasyon pou konnen si repons la bon."
}, {
  "word": "Devire",
  "description": "Kite yon liy dwat pou vire nan yon direksyon ki pa kontinye dwat."
}, {
  "word": "Devlope",
  "description": "Retire yon kouvèti ki te vlope yon bagay.  Grandi.  Gwosi.  Pran negatif yon film epi enprime rezilta li sou papye.  Desine, pwograme, epi pibliye yon pwogram pou itilize sou òdinatè. itilize."
}, {
  "word": "Devlopè",
  "description": "Moun ki devlope yon bagay tankou yon pwogram òdinatè."
}, {
  "word": "Devlopman",
  "description": "Shak etap yon bagay ki ap devlope pase pou li rive nan dènye etap devlopman an.  Yonn nan twa pati nan yon redaksyon, yon disètasyon kote elèv la pale de sijè a prèske san limit.  Pati nan yon redaksyon, yon disètasyon ki ant entwodiksyon an avèk konklizyon an."
}, {
  "word": "Devwa",
  "description": "Responsablite ki tonbe sou do yon moun san pa gen yon fòs ki ap pouse li akonpli tash la, men si li pa akonpli tash la kapab gen pinisyon pou sa.  Si li akonpli tash la li pa oblije jwenn yon kado pou pèfòmans sa a. "
}, {
  "word": "Dewoute",
  "description": "Deraye.  Kite vrè wout la pou pran yon wout ki pa gen rapò ditou avèk vrè wout la.  Sispann sib yon objektif."
}, {
  "word": "Dèyè",
  "description": "Fasad ki pi lèd la epi se li moun toujou wè apre yo fini wè devan an.  Fasad nan yon kay ki toujou sou bò lakou a.  Fasad nan kò moun kote tou yo itilize pou poupou a ye."
}, {
  "word": "Deyò",
  "description": "Yon lòt kote.  Deyò yon kay vle di espas nan lakou li, nan lari a, nan vwazinay la, e latriye."
}, {
  "word": "Dezòd",
  "description": "Moun ki san prensip, san lòd, san respè pou regleman.  Eta moun ki evite, sispann sib prensip, lòd regleman.  Tout timoun dezòd paske yo poko konnen sa yo gen dwa fè, sa yo pa gen dwa fè."
}, {
  "word": "Dezòdone",
  "description": "Eta moun, bagay ki an dezòd.  Evite, sispann sib lòd, prensip, regleman."
}, {
  "word": "Dezole",
  "description": "Eta yon moun ki pèdi tout espwa pou reyalize yon bagay, yon objektif, anyen ditou.  Dekouraje.  Fèb."
}, {
  "word": "Di",
  "description": "Eta yon bagay ki difisil pou kase, kraze. Yon bagay ki solid e ki pa pèmèt anyen rantre andedan avèk fasilite."
}, {
  "word": "Dife",
  "description": "Rezilta limyè avèk shalè ki kole sou yon bagay sèsh, flamab."
}, {
  "word": "Diferans",
  "description": "Kantite an plis, kantite ki pi piti a ant de bagay.  Bagay ki fè yon bagay pa menm avèk yon lòt bagay."
}, {
  "word": "Diferansye",
  "description": "Montre, pale de diferans ki gen ant de ou byen plizyè bagay."
}, {
  "word": "Digo",
  "description": "Yon pwodui shimik ki kapab bay koulè ble.  Anpil lesivè nan peyi Ayiti mete li nan rad yo ap lave."
}, {
  "word": "Diksyon",
  "description": " Jan yon moun ranje boush li pwononse mo ki ap soti nan boush li."
}, {
  "word": "Diksyonè",
  "description": "Yon liv kote mo yon lang rasanble nan lòd alfabetik avèk definisyon, esplikasyon yo sou kote yo."
}, {
  "word": "Dikte",
  "description": "Pale, li avèk espwa yon moun ap ekri tout sa ki ap di yo.  Di yon moun bagay pou li fè.  Fòse yon moun fè yon bagay."
}, {
  "word": "Dimansh",
  "description": "Premye jou nan yon semèn.  Jou nan yon semèn moun legliz Katolik avèk anpil legliz pwotestan shwazi pou yo fè yon gwo seremoni nan legliz yo pou bay Bondye glwa, remèsye li pou sa li fè pou yo.  Se jou sa, jou Pak la, Jezi Kris te resisite, soti nan lanmò."
}, {
  "word": "Dire",
  "description": "Kite anpil tan pase.  Kantite tan ki pase pou yon bagay rive, fèt.  Eta yon moun ki kapab kontinye yon konvèsasyon pandan anpil tan.  Eta yon gason ki bezwen anpil tan anvan li voye."
}, {
  "word": "Dirèk",
  "description": "Eta yon kontak ant de moun, de bagay kote pa gen itilizasyon yon twazyèm moun, bagay pou fè kontak la.  Yon wout dwat yon moun ap sib tankou wout yon avyon pou ale nan yon lòt peyi san rete nan yon twazyèm peyi anvan rive li nan destinasyon an."
}, {
  "word": "Direksyon",
  "description": "Liy, shemen pou sib pou jwenn yon destinasyon.  Non yon biwo nan yon enstitisyon ki la pou gide moun ki bezwen jwenn yon depatman nan enstitisyon sa a."
}, {
  "word": "Diri",
  "description": "Grenn yon plant ki bay yon farin lè li kraze.  Repa ki pi enpòtan pou ayisyen nan yon jounen.  Plant ki bay grenn diri a."
}, {
  "word": "Dirijan",
  "description": "Moun ki ap dirije yon enstitisyon, yon gwoup moun, yon biznis."
}, {
  "word": "Dirije",
  "description": "Pase lòd.  Distribye responsablite.  Gide.  Kòmande."
}, {
  "word": "Dirijè",
  "description": "Moun ki ap pase lòd, distribye responsablite, gide, kòmande."
}, {
  "word": "Dis",
  "description": "Premye nonb ki gen de shif nan li: en (1) avèk zewo (0). 10."
}, {
  "word": "Disèt",
  "description": "Yuityèm nonb ki gen de shif nan li: en (1) avèk sèt (7).  17."
}, {
  "word": "Disètasyon",
  "description": "Ekri sou yon sijè nan klas segondè kote elèv la gen pou li pale de sijè a sou plizyè paj.  Yon disètasyon gen yon entwodiksyon, yon devlopman, e yon konklizyon."
}, {
  "word": "Diskèt",
  "description": "Yon bagay plat e kare ki kapab anrejistre son, konsève tèks, nenpòt enfòmasyon moun kapab kreye sou òdinatè.  Gen de fòm diskèt:  yonn gen twa pous edmi nan shak kwen e lòt la genyen senk pous enka nan shak kwen.  Depi teknisyen fini fè pi piti diskèt la operatè òdinatè sispann itilize pi gwo a paske pi piti diskèt la kenbe plis enfòmasyon.  Yon ti diskèt kapab kenbe de-mil paj ekriti."
}, {
  "word": "Diskou",
  "description": "Kanpe devan yon gwoup moun, yon odyans pou bay yon mesaj ki kapab pèsonèl ou byen de yon lòt moun."
}, {
  "word": "Disparèt",
  "description": "Retire yon imaj ki devan je moun nan yon fason misterye, yon fason moun pa kapab konprann ou byen esplike.  Touye.  Detri.  Ale epi pa janm retounen ankò."
}, {
  "word": "Dispozisyon",
  "description": "Desizyon final pou fè yon bagay.  Dènye desizyon pou aksepte nenpòt bagay ki ap vini an."
}, {
  "word": "Divage",
  "description": "Pale de anpil bagay an menm tan san shwazi yon sijè an patikilye.  Pale de bagay ki pa kapab fèt e ki pa ap janm fèt.  Pale san gen yon rezon pou pale."
}, {
  "word": "Divagè",
  "description": "Moun ki pale de anpil bagay an menm tan san shwazi yon sijè an patikilye.  Moun ki pale san genyen yon rezon pou yo pale."
}, {
  "word": "Divan",
  "description": "Yon kabann an plansh ki gen kat pye, yon kadran ki kloure prèske nan tèt kat pye yo avèk moso plansh pou somye, yon nat pou matla."
}, {
  "word": "Diven",
  "description": "Eta nenpòt bagay ki gen rapò avèk Bondye, syèl la.  Kote katolik yo kwè moun ki mouri gen pou yo pase anvan yo rive nan paradi.  Yon bwason alkoolize pè yo bwè nan mès legliz e moun bwè li tou anvan yon manje yon gwo repa an gwoup."
}, {
  "word": "Divèti",
  "description": "Fè, kreye bagay ki pote enpe, anpil plezi nan lavi moun.  Pran plezi nan yonn ou byen plizyè bagay."
}, {
  "word": "Divètisman",
  "description": "Bagay ki pote enpe, anpil plezi nan lavi moun."
}, {
  "word": "Divine",
  "description": "Bay siyfikasyon, deskripsyon yon bagay san konnen vrè siyfikasyon deskripsyon bagay la."
}, {
  "word": "Divinè",
  "description": "Moun ki bay siyfikasyon, deskripsyon yon bagay san konnen vrè siyfikasyon, deskripsyon bagay la. "
}, {
  "word": "Divinite",
  "description": "Tout bagay ki gen lyen dirèk avèk Bondye, syèl la.  Tout bagay ki kapab pote non Bondye menm."
}, {
  "word": "Divinò",
  "description": "Pwofesyonèl ki gen lespri ki ap itilize tout kò yo, dikte tout manb kò yo sa ki pou fèt, mete pawòl nan boush yo.  Pwofesyonèl sa yo toujou fè kliyan yo konprann yo ap itilize fèy kat, tèks nan liv, men sa ki ap soti nan boush yo pa gen pyès rapò avèk sa yo wè nan fèy kat yo, nan paj liv yo."
}, {
  "word": "Divize",
  "description": "Separe yon bagay an plizyè moso, pati.  Lè 4 divize pa 4 li ap separe an kat en."
}, {
  "word": "Divizyon",
  "description": "Yonn nan kat operasyon aritmetik yo ki montre an konbyen pati yon bagay divize.  De, se divizyon kat pa de (4 ÷ 2 = 2)"
}, {
  "word": "Diznèf",
  "description": "Dizyèm nonb ki gen de shif nan li:  en (1) avèk nèf (9).  19."
}, {
  "word": "Dizuit",
  "description": "Nevyèm nonb ki gen de shif nan li:  en (1) avèk uit (8).  18."
}, {
  "word": "Djab",
  "description": "Moun ki sèvi move lespri e ki pran plezi nan touye moun parèy yo avèk asistans move lespri yo.  Ti istwa rapòte ke djab kapab detere moun yo touye apre fanmiy moun nan fini antere li.  Yo fè kadav la tounen yon bèt; konsa moun nan ap kontinye pase mizè nan travay di."
}, {
  "word": "Djagwasil",
  "description": "Pati nan yon pye palmis ki kenbe grap la anvan li vini vizib.  Lè ayisyen ap kouvri kay avèk tash, yo koupe li an ti moso long pou mare tash yo sou do kay la."
}, {
  "word": "Djakout",
  "description": "Yon valiz peyizan ayisyen ki fèt avèk fèy sèsh yon plant ki rele latanyen.  Peyizan yo itilize valiz sa pou yo sere bagay ki enpòtan pou yo."
}, {
  "word": "Djo",
  "description": "Yon ti non ayisyen bay tout moun ki rele Jozèf.  Nan kèk zòn nan peyi a, moun di djo lè yo vle di dlo."
}, {
  "word": "Djòb",
  "description": "Responsablite yon moun aksepte pran pou li fè yon travay pou yon lòt moun, yon konpayi.  Yon devwa."
}, {
  "word": "Djòl",
  "description": "Yon mannyè byen sovaj pou di boush.  Ayisyen itilize mo sa plis lè yo fashe avèk yon moun yo ap pale de li.  Djòl Koshon, Yon fason pou di boush yon lòt moun long tankou boush koshon."
}, {
  "word": "Dlo",
  "description": "Yon likid ki okipe twa ka fas tè a sou de fòm: dous e sale.  Pati sale (lanmè) a pi plis pase pati dous (sous avèk rivyè) la.  Moun bwè dlo dous, men yo pa bwè dlo sale.  Yon likid ki gen de eleman shimik ki rantre nan konpozisyon li: oksijèn avèk idwojèn.  Djo.  Dlo Dous, Dlo ki gen bon gou nan boush e ki menm avèk dlo ravin, rivyè, sous sou tè a.  Dlo Sale, Dlo lanmè.  Li sale anpil."
}, {
  "word": "Do",
  "description": "Yonn nan sèt nòt mizik yo:  do, re, mi, fa, sòl, la, si.  Fas, dèyè, ki opoze devan, yon bagay.  Kote tout zo kòt yon èt vivan tankou moun kole ansanm."
}, {
  "word": "Dodge",
  "description": "Yon konpayi mashin ameriken."
}, {
  "word": "Dokiman",
  "description": " Yon tèks ki gen yonn, plizyè paragraf ou byen plizyè paj.  Yon tit nan liy  sèvis yon pwogram òdinatè kote ki esplike kisa yon operatè kapab fè pou kreye yon nouvo tèks, ouvri yon paj, fèmen yon paj, e latriye."
}, {
  "word": "Dokimantasyon",
  "description": "Dokiman ki kapab sèvi kòm sipò pou opinyon yon moun.  Reshèsh nan dokiman ki ekziste deja pou jwenn enfòmasyon ki nesesè pou ekri yon nouvo dokiman."
}, {
  "word": "Dokimante",
  "description": "Shashe dokiman ki kapab sèvi kòm sipò pou opinyon yon moun.  Shashe nan dokiman ki ekziste deja pou jwenn enfòmasyon pou ekri yon nouvo dokiman."
}, {
  "word": "Dokimantè",
  "description": "Moun ki ap fè reshèsh nan dokiman ki ekziste deja pou jwenn enfòmasyon pou sipòte opinyon li, ekri yon nouvo dokiman."
}, {
  "word": "Doktè",
  "description": "Yon pwofesyonèl ki etidye kèk pati, tout kò moun yon fason pou li kapab rekonèt nenpòt pati ki pa fonksyone byen e preskri medikaman pou ede òganis sa a rekòmanse fonksyone nòmal.  Yon nivo etid yon moun fè nan yon bransh tankou teoloji, medsin, filozofi, e latriye."
}, {
  "word": "Dola",
  "description": "Senk goud.  Senk-san kòb.  San santim nan lajan peyi Etazini.  Moun toujou di dola menm lè yo vle di yon dola.  Nan anpil peyi nan lemond, siy ki reprezante dola ($) ranplase kantite nan kòb peyi sa yo moun peyi a panse ki egal a yon dola.  Konsa dola ameriken reprezante yon lidè pou tout kòb nan lemond; se sou li anpil peyi shita pou yo evalye kòb yo."
}, {
  "word": "Domestik",
  "description": "Lokal.  Eta pwodui ki fèt nan yon peyi e ki rete nan peyi a pou moun nan peyi a itilize.  Eta tout bèt ki zanmi moun tankou shyen, shat e latriye."
}, {
  "word": "Dòmi",
  "description": "Yon repo moun pran kote tout kò moun nan ap repoze menmsi espri li pa ap repoze.  Nan moman repo sa a je moun nan fèmen, li pa konnen anyen ki ap pase sou kote li, e li kapab reve.  Yon ti frè lanmò.  Somèy.  Repo."
}, {
  "word": "Domine",
  "description": "Kontwole lespri, ekonomi e fizik lòt moun, peyi avèk fòs ki disponib pou fè moun sa yo, peyi sa yo obeyi."
}, {
  "word": "Dominikani",
  "description": "Yon peyi ki sou menm il avèk Ayiti.  Ayiti sou bò lwès il la e Dominikani sou bò lès il la.  Moun nan peyi sa a pale Espanyòl paske Espay se dènye peyi ki te kolonize peyi sa.  Tout mès yo, kilti yo soti an Espay.  Sen-Domeng."
}, {
  "word": "Dominiken",
  "description": "Moun ki fèt nan peyi Dominikani, nan peyi Dominik. "
}, {
  "word": "Domino",
  "description": "Yon jwèt ki gen 28 ti moso rektang nan li.  Premye moso rektang la pa gen pyès ti wonn nan li.  Dezyèm nan gen yon ti wonn nan li, twazyèm nan gen de ti wonn nan li.  Shak moso gen yon ti wonn an plis pou jis rive sou ventuityèm nan.  Ventuityèm nan gen douz ti wonn nan li.  Lè jwè ap jwe jwèt sa a, yo ap shashe kole shak ti pwent rektang yo ki gen menm kantite ti wonn yo ansanm.  Konsa, yon moso rektang ki pa gen pyès ti wonn kapab kole avèk yon lòt moso ki pa gen pyès ti wonn.  Yon moso ki gen yon ti wonn kapab kole avèk yon lòt ki gen yon ti wonn, e latriye."
}, {
  "word": "Don",
  "description": "Yon nivo entelijans nan yon bagay yon moun fèt avèk li e ki kontinye devlope nan moun nan tout tan li ap gen plis laj."
}, {
  "word": "Done",
  "description": "Tèks, imaj avèk shif yon operatè kreye sou yon òdinatè."
}, {
  "word": "Dosil",
  "description": "Yon karaktè dous ki fè yon èt vivan pa kapab aji vyolan.  Trankil.  Nayif.  Eta yon moun ki fasil pou lòt moun abize li.  Timid.  San defans."
}, {
  "word": "Dosye",
  "description": "Yon plas kote moun kapab apiye do yo.  Babay ki kapab rete kòm bon ou byen move enfòmasyon sou do yon moun."
}, {
  "word": "Doulè",
  "description": "Nenpòt bagay ki te fè, ki ap fè mal.  Yon doulè kapab fizik ou byen mantal."
}, {
  "word": "Dous",
  "description": "Yon bagay ki gen gou sik, siwo.  Yon bagay ki fè yon moun santi li byen.  Yon bagay moun renmen, ki atire repetisyon.  Yon bagay moun pran plezi nan fè li, koute li,  e latriye."
}, {
  "word": "Dousè",
  "description": "Rezilta yon bagay ki dous.  Kantite plezi yon moun pran nan fè, koute yon bagay.  Satisfakyon yon moun jwenn nan yon bagay."
}, {
  "word": "Douvan",
  "description": "Devan.  Yon mo kèk peyizan ayisyen plis itilize pou di devan."
}, {
  "word": "Douz",
  "description": "Twazyèm nonb ki gen de shif nan li:  en (1) avèk de (2).  12."
}, {
  "word": "Douzèn",
  "description": "Yon kantite ki gen douz inite nan li.  Yon douzèn ze gen douz ze nan li."
}, {
  "word": "Dra",
  "description": "Yon moso twal ki sèvi pou kouvri moun lè yo koushe sou kabann.  Yon gwoupman, yon òganizasyon moun itilize pou benefisye yon opòtinite.  Anpil moun itilize legliz pou sèvi yo dra."
}, {
  "word": "Drapo",
  "description": "Yon moso twal avèk senbòl e lejand ki reprezante yon peyi e entensyon fondatè yo pou konstriksyon peyi a.  Premye etap nan konstriksyon yon peyi sou kote konstitisyon li."
}, {
  "word": "Dwa",
  "description": "Otorite, libète yon moun pran, li resevwa nan men yon lòt moun ou byen lwa sosyete kote li ap viv la bay."
}, {
  "word": "Dwat",
  "description": "Eta yon moun ki fè tout sa lwa sosyete, Bib la ou byen Bondye, mande.  Mashe nan yon direksyon san vire nan pyès lòt direksyon."
}, {
  "word": "Dwate",
  "description": "Yon tandans pou fè tout bagay nan direksyon men dwat la.  Eta yon moun ki itilite men dwat li pou fè nenpòt bagay li bezwen yon sèl men pou fè li."
}, {
  "word": "Dwèt",
  "description": "Nenpòt nan ven pwent ki nan pye avèk men yon moun.  Anpil lòt bèt gen dwèt tou.  Pati nan kò moun ki gen zong yo."
}, {
  "word": "Dwòl",
  "description": "Yon bagay ki difisil pou konprann.  Yon mistè."
}, {
  "word": "Dyamèt",
  "description": "Distans de kwen opoze andedan yon wonn.  De reyon."
}, {
  "word": "Dyare",
  "description": "Yon poupou likid yon èt vivan santi ap soti e li pa kapab kontwole li.  Moun ki gen dyare oblije jwenn yon kote pou yo poupou rapid.   Gen yon fòs andedan moun nan ki ap pouse poupou a soti deyò."
}, {
  "word": "E",
  "description": "Senkyèm lèt nan alfabèt lang Kreyòl la.  Yon mo ki sèvi pou lyezon, adisyon ant de lòt mo tankou en, de e twa se shif."
}, {
  "word": "Èd",
  "description": "Yon fòs, yon konesans an plis yon moun pa genyen e li bezwen li pou defann tèt li ou byen mete plis fòs, plis konesans sou sa li deja genyen.  Sekou ki nesesè pou yon moun jwenn pou li kontrekare yon obstak.  Wòl yon moun ki pote sekou jwe pou yon moun ki bezwen sekou."
}, {
  "word": "Ede",
  "description": "Pote sekou, èd bay yon moun ki nan bezwen èd, sekou."
}, {
  "word": "Edmi",
  "description": "Yon pati nan yon bagay lè bagay la divize an de pati.  Mwatye nan yon bagay."
}, {
  "word": "Èdtan",
  "description": "Yon ekspresyon ki sib yon nonb pou eksplike kantite lè, kantite tan.  Pou di Trant lè, yon moun kapab di Trant èdtan."
}, {
  "word": "Efase",
  "description": "Elimine ekzistans yon bagay.  Elimine ekriti ki sou yon tablo.  Retire lavi yon èt vivan."
}, {
  "word": "Efasè",
  "description": "Moun ki kontribye a elimine yon bagay, yon ekriti sou yon tablo, lavi yon èt vivan."
}, {
  "word": "Egal",
  "description": "De ou byen plis bagay ki nan menm klas, gen menm valè, menm kantite, e menm nivo."
}, {
  "word": "Egzamen",
  "description": "Yon tès pou wè kisa yon moun aprann nan yon etid li te fè.  Yon analiz pou wè kijan eta yon bagay, sante yon moun ye.  Yon obsèvasyon ki ekzije anpil konsantrasyon."
}, {
  "word": "Egzamine",
  "description": "Shashe solisyon yon pwoblèm mantalman; san itilize bagay reyèl.  Shashe konnen eta yon bagay avèk anpil obsèvasyon."
}, {
  "word": "Egzanp",
  "description": "Yonn nan plizyè bagay ki pa gen diferans ant yo tout la."
}, {
  "word": "Egzante",
  "description": "Evite yon bagay ki nan wout ki mennen nan destinasyon an.  Shwazi yon lòt wout, lòt bagay nan plas yon wout, yon bagay."
}, {
  "word": "Egzantè",
  "description": "Moun ki shwazi yon lòt wout pou evite yon obstak sou wout li."
}, {
  "word": "Egzat",
  "description": "San retire san mete an plis sou kantite, gwosè yon bagay te dwe ye.  Li ap ale twazè egzat nan senk minit."
}, {
  "word": "Ejakile",
  "description": "Voye.  Moman lè deshay ap soti nan kanal zozo yon gason."
}, {
  "word": "Ekip",
  "description": "Yon gwoup moun ki reyini ansanm pou yo jwe kont yon lòt gwoup moun.  Yon gwoup moun ki toujou ansanm."
}, {
  "word": "Eklèsi",
  "description": "Fè yon bagay vini klè.  Esplike yon entansyon pou fè moun konpran yon mesaj.  Netwaye."
}, {
  "word": "Eklèsisman",
  "description": "Etap ki montre yon bagay ap ale eklèsi."
}, {
  "word": "Ekoloji",
  "description": "Syans ki etidye anvirónman; tout detay kijan moun adapte yo avèk zòn yo ap viv la e moun nan antouraj yo."
}, {
  "word": "Ekonomi",
  "description": "Syans ki etidye kijan biznis fèt nan yon peyi e kijan lajan pase nan men moun, soti nan yon endistri pou ale nan yon lòt, soti nan yon biznis pou ale nan yon lòt."
}, {
  "word": "Ekonomize",
  "description": "Rasanble lajan nan yon kwen, mete lajan nan bank pou depanse, pou ashte bagay ki koute anpil kòb."
}, {
  "word": "Ekran",
  "description": "Yon pyès elektwonik ki gen pwodui shimik nan li e ki pèmèt moun li enfòmasyon yon mashin bay pou kominike avèk yon operatè.  Yonn nan senk pati yon òdinatè ki pèmèt operatè a li enfòmasyon òdinatè a ap transmèt.  Pati nan yon televizyon kote moun wè imaj yo."
}, {
  "word": "Ekri",
  "description": "Mete plizyè lèt ansanm pou fòme mo.  Mete plizyè mo ansanm pou fòme fraz.  Mete plizyè fraz ansanm pou fè paragraf.  Kreye yon sijè ki gen entwodiksyon, devlopman, konklizyon. "
}, {
  "word": "Ekriti",
  "description": "Kalite bagay yon moun ekri."
}, {
  "word": "Ekriven",
  "description": "Moun ki konprann kisa ekri vle di e ki kapab pran nenpòt lide epi ekri anpil paj sou yon sèl lide sa.  Moun ki ekri yon liv."
}, {
  "word": "Ekselans",
  "description": "Gwo shèf nan yon peyi tankou yon prezidan.  Non yon moun bay yon lòt pou montre respè li gen pou moun sa a."
}, {
  "word": "Eksitan",
  "description": "Yon bagay nan anvirónman yon èt vivan ki fòse li gen yon anvi ki pa te ap ekziste san prezans bagay sa a.  Sant yon bon manje fè yon moun grangou.  Mo yon moun di yon lòt ki fè li fashe."
}, {
  "word": "Eksite",
  "description": "Eta yon èt vivan ki anba sekous eksitan.  Shyen ki ap tann manje nan men yon moun kite boush li ouvri avèk lang li deyò."
}, {
  "word": "Eksploze",
  "description": "Konsantre pandan yon bon bout tan epi gaye nan tout espas vid ki pre.  Eta yon moun ki pa kapab kenbe pwoblèm li genyen ankò epi ki kòmanse pale san rete avèk pwòp tèt li."
}, {
  "word": "Ekspoze",
  "description": "Mete yon bagay, yon kadav, travay yon pent yon kote pou moun kapab vini vizite li."
}, {
  "word": "Ekspozisyon",
  "description": "Eta yon bagay ki ekspoze.  Zanmi avèk fanmiy yon kadav kapab fè yon ekspozisyon pou moun vini wè mò a.   Menm jan an tou yon pent kapab fè ekspozisyon penti li pou moun vini wè."
}, {
  "word": "Ekzekisyon",
  "description": "Travay yon moun ki ekzekite yon aksyon, yon lòd, yon rekòmandasyon."
}, {
  "word": "Ekzekite",
  "description": "Obeyi yon lòd.  Mete yon moun kanpe yon kote epi tire sou li jis moun nan mouri."
}, {
  "word": "Ekzekitè",
  "description": "Moun ki ekzekite yon lòd, ki mete yon moun kanpe epi tire sou li jis moun nan mounri."
}, {
  "word": "Ekzile",
  "description": "Voye énmi yon sistèm politik yon peyi ale nan yon lòt peyi epi anpeshe li retounen nan peyi a pou li pa anpeshe mashin politik la kontinye wout li.  Yon moun yon lòt moun fòse ale lwen li."
}, {
  "word": "Elektrik",
  "description": "Aparèy ki bezwen elektrisite pou li fonksyone."
}, {
  "word": "Elektrisite",
  "description": "Mouvman plizyè eleman shimik ki bay kouran.  Sous enèji ki pèmèt yon aparèy elektrik, shofaj tankou anpoul, fonksyone, limen."
}, {
  "word": "Eleman",
  "description": "Yon pati nan yon kopozisyon shimik.  Yonn nan kopozisyon dlo.  De eleman dlo yo se idwojèn avèk oksijèn."
}, {
  "word": "Eli",
  "description": "Eta yon kandida ki ale nan yon eleksyon epi li jwenn kont moun vote pou li pou li jwenn djòb li te ap shashe a."
}, {
  "word": "Elikoptè",
  "description": "Yon aparèy elektwo-mekanik ki gen yon zèl nan tèt li ki pèmèt li vole, kanpe nan espas.  Li kapab monte, desann, nan direksyon vètikal e li kapab deplase nan direksyon orizontal tou."
}, {
  "word": "En",
  "description": "Dezyèm nan shif pozitif yo.  1.  Lè yon nonb divize pa en li bay menm nonb la."
}, {
  "word": "Endèks",
  "description": "Dwèt ki apre dwèt pous la e se li tout moun itilize pou montre lòt moun yon direksyon.  Lis tout enfòmasyon ki gen nan yon liv, nan lòd alfabetik."
}, {
  "word": "Endepandans",
  "description": "Kapasite pou fè nenpòt bagay nan libète, san asistans ou byen oblije pote rapò bay lòt moun.  Ayiti pran endepandans li nan men peyi Frans depi ane 1804."
}, {
  "word": "Endispoze",
  "description": "Eta yon moun ki pèdi tout konesans li.  Sèl diferans ki gen ant yon moun ki mouri avèk yon moun ki endispoze, kè moun ki endispoze a kontinye ap bat."
}, {
  "word": "Enfekte",
  "description": "Resevwa yon maladi ki soti nan yon lòt kò tankou yon moun malad, yon mikwòb."
}, {
  "word": "Enfini",
  "description": "Eta yon bagay ki ap kontinye egziste pou tout tan. Yon kantite nonb moun pa kapab janm fini konte."
}, {
  "word": "Enfòmasyon",
  "description": "Nenpòt ransèyman sou papye, nan boush ki disponib pou bay moun konesans."
}, {
  "word": "Enjenyè",
  "description": "Yon moun ki etidye jeni nan yon disiplin tankou mizik, elektwonik, sivil, e latriye."
}, {
  "word": "Enka",
  "description": "Yon pati nan yon bagay lè bagay la divize an kat pati."
}, {
  "word": "Enkyetid",
  "description": "Eta yon moun ki pè fè yon bagay paske li panse li pa kapab fè bagay sa a byen.  Eta yon moun ki pa vle yon bagay fèt anvan yon lòt.  Eta yon moun ki vle yon bagay fèt anvan yon lòt bagay fèt."
}, {
  "word": "Enpak",
  "description": "Rezilta yon aksyon tankou yon nouvèl, yon desizyon, yon gwo fòs  sou yon ti fòs, yon aksidan."
}, {
  "word": "Enpe",
  "description": "Yon divizyon, yon pati nan yon bagay ki kapab reprezante bagay la.  Yon kantite nan yon bagay moun kapab konte ou byen moun pa kapab konte."
}, {
  "word": "Enpè",
  "description": "Yon nonb lè li divize an de li ap toujou bay yon rezilta ki gen senkant (,50) apre yon vigil.  Si senk divize pa de, li ap bay 2,50.  10.005 divize an de ap bay 5.002,50."
}, {
  "word": "Enpo",
  "description": " Yon kòb leta egzije moun peye sou yon bagay moun nan posede tankou yon kay pou pran swen zòn kote kay sa a ye.  Yon kòb leta egzije patwon ritire sou kòb yo peye shak anplwaye.  Kòb sa yo ede leta peye pou fè travay piblik yo."
}, {
  "word": "Enprime",
  "description": "Kopye yon imaj ki deja egziste nan yon lòt plas, sou papye.  Ekri."
}, {
  "word": "Enprimè",
  "description": "Yonn nan senk pati nan yon òdinatè ki pèmèt operatè a enprime dokiman sou papye.  Enprimè a gen yon pwogram ki enstale sou òdinatè pou pèmèt de mashin yo kominike.  Lè òdinatè a resevwa lòd nan men operatè a li transmèt menm lòd sa yo bay enprimè a."
}, {
  "word": "Ensh",
  "description": "Hinche.  Kapital Depatman Sant."
}, {
  "word": "Enstale",
  "description": "Mete yon bagay yon kote, nan yon plas pou moun kapab wè li.  Mete yon pwogram andedan yon òdinatè pou ede moun ki ap itilize òdinatè a kominike avèk òdinatè a.  Tout pwogram gen enstriksyon pou esplike moun kijan pou yo enstale pwogram nan sou òdinatè a."
}, {
  "word": "Entènèt",
  "description": "Yon mwayen kominikasyon ki pèmèt tout moun ki posede yon òdinatè avèk yon liy telefòn kominike ant yo.   Pou kominike nan fason sa a, moun ablije ashte sèvis nan men yon konpayi ki vann sèvis sa a e yo kapab kominike avèk nenpòt moun nan nenpòt peyi.  Yon revolisyon nan mwayen moun kominike yonn avèk lòt.  Gen plisyè mwayen moun kominike sou entènèt la.  1)  Yo kapab voye yon lèt nan adrès lèt (e-mail=lèt elektwonik) moun yo vle ekri a.  Lèt sa a ale dirèkteman nan yon gwo òdinatè kote destinatè a kapab itilize òdinatè pa li pou li lèt la.  2)  Moun kapab ekri sa yo vle di a epi peze yon bouton pou yon moun wè mesaj la menm lè a (chat).  Anpil lòt moun kapab wè mesaj sa a.  3)  Yon moun kapab pale avèk yon lòt moun pandan yo tou de shita devan òdinatè yo.  4)  Dènye mwayen an gen lèt elektwonik nan li tou, men li ti kras diferan.  Yon moun, yon konpayi gen yon adrès (Home Page = Paj Kay) kote lòt moun kapab kite mesaj pou li e se mèt paj sa a sèlman ki kapab wè li.  Anpil biznis itilize mwayen sa a pou fè biznis, gwo biznis.  "
}, {
  "word": "Enterè",
  "description": "Kòb yon moun peye an plis sou yon lajan li te lwe, prete nan men yon lòt moun.  Kantite dwa pou resevwa pwofit yon envestisè genyen nan yon biznis de ou byen plizyè moun posede ansanm."
}, {
  "word": "Enterese",
  "description": "Panshan, enterè yon moun montre li genyen nan yon bagay."
}, {
  "word": "Entèwogasyon",
  "description": "Fraz ki kòmanse avèk mo tankou kisa, ki, kiyès, poukisa, èske, e latriye.  ?.  Tout kesyon gen siy sa (?) nan finisman yo pou montre yo se yon kesyon."
}, {
  "word": "Entim",
  "description": "Konesans, bagay yon sèl moun konnen de kò li tankou yon fi konnen koko li, yon gason konnnen zozo.  Relasyon Entim, Relasyon yon fi avèk yon gason genyen kote yonn konnen anpil sekrè nan lavi lòt la.  Yo tou de a konnen wè e manyen tout pati nan kò lòt la."
}, {
  "word": "Entwodiksyon",
  "description": "Premye nan twa pati yon redaksyon, yon disètasyon ki anonse odyans elèv la de kisa li ap ale pale nan devlopman an.  Prezante yon moun devan yon lòt moun."
}, {
  "word": "Envestige",
  "description": "Revize, sib travay yon moun fini fè pou wè si travay la byen fèt.  Shashe konnen ki moun ki fè yon krim pou arete moun nan."
}, {
  "word": "Envizib",
  "description": "Eta yon bagay je pa kapab wè.  Disparèt.  Eta yon bagay ki menm koulè avèk lè."
}, {
  "word": "Epesè",
  "description": "Wotè yon bagay ki gen twa kwen tankou yon wonn ou byen sis kwen tankou yon bwat."
}, {
  "word": "Epi",
  "description": "Yon mo, lè li nan mitan de lòt mo fè konprann gen de aksyon ki ap egzekite yonn apre lòt la.  Yon moun ap manje epi grangou li ap pase."
}, {
  "word": "Epis",
  "description": "Zèb moun itilize pou bay manje bon gou.  Se yonn nan zèb ki pi ansyen sou tè a."
}, {
  "word": "Ès",
  "description": "Lès. Yonn nan kat pwen kadinal yo ki nan direksyon kote solèy la leve a shak maten.  Avanse nan yon direksyon, men pa janm rete sou yon liy dwat."
}, {
  "word": "Eshèk",
  "description": "Opòtinite yon moun pèdi pou li te akonpli yon misyon, yon objektif. Defayans."
}, {
  "word": "Eshwe",
  "description": "Shwazi direksyon eshèk.  Defayi."
}, {
  "word": "Esklav",
  "description": "Moun nan ras nwa a moun nan ras blan yo te konnen ale shashe sou kontinan afriken an pou fè yo vini travay di e gratis sou plantasyon nan koloni yo.  Kèk santèn ane anvan blan yo te rantre nan tranzaksyon esklavaj sa a, nwa nan yo te konnen gen esklav blan tou."
}, {
  "word": "Esoufle",
  "description": "Eta yon moun ki bouke anpil e li pa kapab respire nòmalman.  Yon moun ki ap fè egzèsis kapab santi li esoufle e  gen plizyè maladi tankou las, tansyon-wo ki kapab fè yon moun santi li esoufle tou."
}, {
  "word": "Espas",
  "description": "Distans ki ant planèt yo:  Jipitè, Venis, Plito, Tè, e latriye.  Distans ant de bagay.  Nenpòt kote ki gen lè e yon bagay kapab jwenn plas."
}, {
  "word": "Espri",
  "description": "Lespri.  Fòs envizib ki kapab aji sou bagay ki vizib.  Bondye.  Satan."
}, {
  "word": "Estasyon",
  "description": "Plas kote yon bagay ye.  Kote bagay tankou yon mashin, yon tren kanpe pou pran pasaje, pou moun jwenn yo lè gen bezwen."
}, {
  "word": "Estasyone",
  "description": "Kanpe nan yon estasyon.  Eta yon mashin ki kanpe nan yon estasyon pou pasaje monte li.  Eta nenpòt bagay ki kanpe yon kote."
}, {
  "word": "Estidyo",
  "description": "Yon konpayi ki regle afè anrejistre mizik, sinema.  Yon konpayi radyo ou byen televizyon.  Yon biznis kote fi ale pou yon fè sheve yo, zong yo, figi yo bèl.  Yon salon bote."
}, {
  "word": "Eta",
  "description": "Yon peyi endepan ki gen yon gouvènman avèk shèf tankou yon prezidan ap dirije li.  Jan yon bagay ye:  sante, karaktè, kalite li.  Leta."
}, {
  "word": "Etazini",
  "description": "Peyi sa a nan Amerik Nò a e li nan ant Kanada avèk Meksik.  Li gen senkant eta nan li; se sa ki fè li rele Eta-z-ini.  Lang ofisyèl peyi sa se anglè, men kantite imigrant ki ap viv nan peyi a fè gen diferan moun ki pale tout lang ki gen nan lemond nan li.  Pi gwo peyi, pi gwo fòs politik, ekonomik e komèsyal nan lemond.  Kapital peyi sa rele Washington, pou pote non fondatè li:  George Washington."
}, {
  "word": "Etèn",
  "description": "Elimine kapasite yon bagay pou li kontinye jwe yon wòl tankou limyè, dife ki ap klere.  Koupe sous enèji ki pèmèt yon mashin mashe.  Retire lavi yon moun, yon bèt."
}, {
  "word": "Etènèl",
  "description": "Yon bagay ki ap toujou egziste pou tout tan. Gen de bagay ki ap toujou la pou tout tan:  Bondye, Satan."
}, {
  "word": "Etid",
  "description": "Reshèsh pou mete konesans nan yon sèvo.  Shashe konnen yon bagay, konstitisyon yon bagay.  Konesans nan yon disiplin, yon syans."
}, {
  "word": "Etidyan",
  "description": "Moun ki fè reshèsh pou mete konesans nan sèvo yo.  Moun ki shashe konnen yon bagay, konstitisyon yon bagay, konesans nan yon disiplin."
}, {
  "word": "Etidye",
  "description": "Mete konesans nan yon sèvo.  Aksyon yon moun ki ap shashe konnen yon bagay, yon disiplin, konstitisyon yon bagay, konesans nan yon disiplin."
}, {
  "word": "Etikèt",
  "description": "Valè ki kapab rete avèk moun nenpòt ki kote moun pase.  Yon non tout moun konnen pou yon pwodui, yon biznis.  Yon ti moso papye ki reprezante imaj yon konpayi, yon òganizasyon."
}, {
  "word": "Etónman",
  "description": "Yon bagay ki rive san espwa ke li te ap ale rive.  Sipriz. "
}, {
  "word": "Etwal",
  "description": "Zetwal.  Yon kò ki gen limyè sou li e ki anlè a nan syèl la.  Yon desen moun fè ki gen senk bransh.  Make yon bagay pou atire atansyon yon moun sou li, pou sonje li. Ti limyè ki parèt nan syèl la lè nyaj yo klè tankou nan moman lapli pa ap ale tonbe."
}, {
  "word": "Etyoupi",
  "description": "Yon peyi sou kontinan afriken an moun te toujou konsidere tankou peyi ki pi pòv sou tè a.  Povrete te tèlman grav tout moun nan lemond te konnen ap pale de mizè pèp ki ap viv nan peyi sa.   "
}, {
  "word": "Evolisyon",
  "description": "Etap yon bagay ki ap evolye pase.  Aranjman nan mès, koutim yon pèp, yon sosyete, yon epòk, yon ras, e latriye.  Yon eksplikasyon sou aparisyon moun sou tè a pou fè tout moun konprann Bondye pate kreye moun, men moun te evolye; sa vle di moun te pase anpil etap anvan yon te vini moun."
}, {
  "word": "Evolye",
  "description": "Pase soti nan yon etap pou rive nan yon lòt etap moun konsidere ki pi bon, pi rafine.  Kite yon pèsonalite, karaktè ki sanble avèk eta bèt ap viv."
}, {
  "word": "Ewòp",
  "description": "Yonn nan senk kontinan yo ki gen peyi tankou Almay, Frans, Bèljik, Angletè nan li.  Kontinan sa a kole avèk kontinan Azi a; sa fè kèk moun di pa gen yon kontinan ki rele Ewòp tout bon vre."
}, {
  "word": "Èzili",
  "description": "Non yon femèl lwa nan vodou ayisyen."
}, {
  "word": "F",
  "description": "Sizyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Fa",
  "description": "Yonn nan sèt nòt mizikal yo:  do, re, mi, fa, sòl, la, si."
}, {
  "word": "Faks",
  "description": "Yon moso papye avèk ekriti sou li ki soti kote yon moun itilize yon mashin ki kapab kominike avèk yon lòt mashin pou voye tèks nan mashin sa a.   Faks mashin, Yon mashin ki kapab itilize yon liy telefòn pou voye mesaj bay lòt mashin.  Yon aparèy elektwonik ki andedan yon òdinatè e ki mete ansanm avèk yon pwogram pou voye mesaj bay anpil lòt mashin."
}, {
  "word": "Falèz",
  "description": "Yon tou sou kote yon wout tankou anba yon mòn."
}, {
  "word": "Famasi",
  "description": "Yon boutik kote ki gen medikaman pou vann pou tout maladi."
}, {
  "word": "Fanm",
  "description": "Femèl e manman.  Depre Bib la, fanm se yon moun Bondye te fè avèk yon zo kòt Adan pou kapab kenbe gason konpayen.  Yon fanm fèt pou li toujou gen sheve long, gwo ou byen tete long, gwo dèyè avèk koko nan fant janb li.  Yon fi kapab mete zanno nan zòrèy li, wòb sou li, e latriye.  Li gen règ shak mwa."
}, {
  "word": "Fanmòt",
  "description": "Yon fanm ki pa gen tay nòmal yon moun sipoze genyen.  Yon ti fi."
}, {
  "word": "Fann",
  "description": "Koupe yon bagay nan direksyon longè li."
}, {
  "word": "Fant",
  "description": "Espas ant de bagay, nan mitan de bagay."
}, {
  "word": "Fantastik",
  "description": "Yon bèl bagay pyès moun pa kapab meprize bote.  Yon bagay ki bèl anpil."
}, {
  "word": "Farin",
  "description": "Poud.  Yon poud ki soti nan fri kèk pye bwa tankou bannann, manyòk.  Poud ble.  Farin frans, Yon farin blan ayisyen itilize pou fè anpil manje tankou labouyi, bòy e latriye."
}, {
  "word": "Farinay",
  "description": "Anpil ti moso nan nenpòt bagay.  Yon lapli ki ap tonbe tou piti san li pa janm bay anpil, gwo gout lapli."
}, {
  "word": "Farinen",
  "description": "Aksyon yon lapli ki ap tonbe tou piti san li pa janm bay anpil, gwo gout lapli yon sèl kou.  Aksyon yon moun ki kite krashe soti nan boush li pandan li ap pale."
}, {
  "word": "Fashe",
  "description": "Move.  Eta yon moun ki pa kontan.  Eta yon moun ki pa kapab jwenn bagay li bezwen e ki pa vle satisfè avèk sa li genyen."
}, {
  "word": "Fatra",
  "description": "Bagay ki san valè.  Tout bagay moun pa gen bezwen pou li."
}, {
  "word": "Favè",
  "description": "Yon sèvis yon moun rann yon lòt men moun nan pa merite sèvis la."
}, {
  "word": "Fay",
  "description": "Bagay ki pa gen fòs ditou e nenpòt ti van kapab leve li epi pote li ale depoze yon lòt kote.  Feblès.  Fèb."
}, {
  "word": "Fè",
  "description": "Yon eleman shimik.  Yon metal ki di anpil.  Yon aparèy shofaj moun itilize pou, repare, retire pli sou rad."
}, {
  "word": "Fèb",
  "description": "Yon bagay ki pa gen fòs.  Fay."
}, {
  "word": "Feblès",
  "description": "Eta yon bagay ki fèb.  Yon moun ki pa gen konfyans nan tèt li e ki pa gen konfyans nan pyès lòt fòs etranje."
}, {
  "word": "Fèmen",
  "description": "Elimine yon ouvèti.  Anpeshe yon mashin kontinye fonksyone.  Etèn."
}, {
  "word": "Fen",
  "description": "Yon bagay ki sanble li piti anpil pou longè li.  Yon pye sheve nan tèt yon moun se yon bagay ki fen."
}, {
  "word": "Fenèt",
  "description": "Yon ti pòt nan yon mashin, yon kay ki pèmèt lè sikile.  Yon tit nan liy sèvis yon pwogram òdinatè ki pèmèt operatè a wè tout dokiman ki ouvri yo menmsi tout pa parèt sou ekran an."
}, {
  "word": "Fènwa",
  "description": "Absans limyè.  Eta yon nuit.  Moman lè lannuit kòmanse."
}, {
  "word": "Ferari",
  "description": "Yon konpayi mashin italyen ki te konnen fè ti mashin, kèk fwa, ki pran de moun sèlman."
}, {
  "word": "Fèt",
  "description": "Kote yon gwoup moun reyini pou yo pran plezi yo, pou selebre yon okazyon.  Yon moman kote tout moun byen abiye, mizik ap jwe, yo ap bwè, yo ap danse.  Selebwasyon yon evènman ki te pase nan menm jou sa, pou pi piti, yon ane anvan dat sa.  Jou yon moun te soti andedan vant manman li."
}, {
  "word": "Fete",
  "description": "Patisipe nan yon fèt.  Selebre yon evènman ki te pase nan menm jou sa, pou pi piti, yon ane anvan dat sa a.  Selebwe jou yon moun te soti nan vant manman li."
}, {
  "word": "Fevriye",
  "description": "Dezyèm mwa nan yon ane.  Sèl mwa nan yon ane ki pote ventsuit ou byen ventnèf jou."
}, {
  "word": "Fèy",
  "description": "Pati nan yon pye bwa ki parèt apre yon boujon fini soti nan yon pwent nan yon pye bwa.  Fèy shak pye bwa gen yon fòm diferan ki depann de pye bwa.  Fèy papye, Yon moso papye ki kapab mezire 8 ½ pous nan lajè avèk 11 pous nan longè konsa.  Gen anpil lòt dimansyon fèy."
}, {
  "word": "Feyaj",
  "description": "Yon kantite fèy ou byen nenpòt bagay ki gen rapò avèk fèy.  Itilizasyon fèy pou medikaman."
}, {
  "word": "Feye",
  "description": "Yon bagay ki gen anpil fèy nan li tankou yon pye bwa."
}, {
  "word": "Feyè",
  "description": "Plisyè fèy ki melanje, kole ansanm."
}, {
  "word": "Fi",
  "description": "Yon femèl moun, yon fanm, yon manman, yon madanm, yon sè, yon kouzin, yon bèlsè.  Yon moun ki gen yon koko nan fant janb li."
}, {
  "word": "Fig",
  "description": "Yon bannann, lè li mi, moun kapab manje li san kwit li e li gen bon gou, gou dous.  Anpil moun kwè fig bon pou sante moun."
}, {
  "word": "Fikse",
  "description": "Mete yon bagay nan plas li.  Ranje yon bagay jan li te dwe ye a, jan li sipoze ye a."
}, {
  "word": "Filaman",
  "description": "Yon ti materyèl andedan yon anpoul elektrik ki fè li bay limyè lè elektrisite pase andedan anpoul la."
}, {
  "word": "Filè",
  "description": "Yon moun ki ap file, ki konnen file.  Yon kadriyaj moun mete sou teren pou jwe volebòl, pingpong avèk tenis."
}, {
  "word": "Filipin",
  "description": "Yon peyi nan lanmè Pasifik la, an fas Shin, ki te pase anpil tan anba diktati yon prezidan tankou peyi Ayiti."
}, {
  "word": "Filyè",
  "description": "De ti kanal ki separe avèk yon ti tras ki sanble avèk fil andedan tou ki andedan yon boulon.  Pwent vis gen filyè tou."
}, {
  "word": "Fini",
  "description": "Eta yon bagay ki rive nan bout li.  Fè tout sa ki te gen pou fèt nan yon travay ki te kòmanse. "
}, {
  "word": "Finisman",
  "description": "Dènye moman nan nenpòt bagay.  Dènye etap nan yon travay.  Dènye pwent nan yon wout, yon distans. Dènye moman anvan yon moun mouri.  Dènye jou nan yon gè, nan yon ane."
}, {
  "word": "Fiyansay",
  "description": "Moman, jou, seremoni ki òganize pou de moun ki te renmen e ki ap fiyanse."
}, {
  "word": "Fiyanse",
  "description": "De moun ki renmen, yon gason avèk yon fi, ki deja pran desizyon pou yo marye epi yo reyini tout moun nan antouraj yo pou fè konnen dat maryaj la."
}, {
  "word": "Fizi",
  "description": "Yon zam long avèk dèyè laj ki kapab tire ale lwen."
}, {
  "word": "Fizik",
  "description": "Yon bagay ki gen kò menmsi moun kapab ou byen pa kapab toushe.  Syans ki etidye kijan tout bagay fonksyone, relasyon yon bagay avèk yon lòt, mouvman bagay, enèjy ki gen nan shak bagay, e latriye.  Jan yon bagay fèt."
}, {
  "word": "Fizisyen",
  "description": "Moun ki etidye, fè reshèsh, fè eksperyans nan syans fizik la."
}, {
  "word": "Fizye",
  "description": "Tire sou yon moun, yon bagay avèk yon fizi."
}, {
  "word": "Flamab",
  "description": "Eta yon bagay ki limen gwo dife byen vit lè li rankontre avèk yon ti kras dife."
}, {
  "word": "Flè",
  "description": "Yon bèl boujon ki soti nan kèk pye bwa, nan kèk zèb.  Yon flè kapab gen yon sèl koulè ou byen plizyè koulè.  Yon bagay ki bèl.  Flè Disè, Yon zèb nan galèt larivyè ki kapab santi lè yon bagay toushe li epi tout fèy li koushe pandan yon bon bout tan.  Ouvè-fèmen.  Wonte."
}, {
  "word": "Fleri",
  "description": "Eta yon bagay ki gen flè nan li.  Eta yon bagay ki vini bèl.  Lè yon moun di fleri, li kapab ap pale de bote yon bagay tou."
}, {
  "word": "Flèsh",
  "description": "Dènye pwent, pwent ki pi wo a, nan wotè yon bagay.  Bal yon zam moun lontan yo te konnen itilize pou touye bèt nan sovaj, nan lagè."
}, {
  "word": "Flèv",
  "description": "Yon gwo rivyè ki soti nan yon gwo sous dlo dous.  Yon gwo rivyè ki rive fòme paske anpil lòt ti rivyè ale rankontre menm kote pou yo kapab shashe shemen lanmè.  Yon rivyè laj ki sanble avèk lanmè, men dlo li pa sale.  Nan peyi Ayiti, gen Flèv Latibonit ki nan Depatman Sant la ant Mibalè avèk Tomond."
}, {
  "word": "Foli",
  "description": "Yon gwo anvi pou fè, reyalize yon bagay.  Eta yon moun ki fou.  Pasyon.  Yon gwo anvi yon moun genyen pou reyalize, fè yon bagay san refleshi sou konsekans bagay la."
}, {
  "word": "Fòm",
  "description": "Premye imaj ki vini nan tèt yon moun lè li tande deskripsyon yon bagay.  Yon imaj moun kapab itilize pou fè rekonèt yon bagay.  Lè yon gason panse a bèl fanm li wè fòm Coca-cola."
}, {
  "word": "Fòmasyon",
  "description": "Shak etap yon bagay pase pou li fòme.  Pati ki rantre nan konstitisyon yon bagay.  Kijan yon bagay fòme."
}, {
  "word": "Fòme",
  "description": "Lè yon fi gen règ li pou premye fwa.  Mete plizyè bagay ansanm pou jwenn yon rezilta.  Ranje plizyè bagay nenpòt fason pou jwenn yon rezilta."
}, {
  "word": "Fon",
  "description": "Kote yon moun kapab pran lajan pou depanse.  Yon tou ki rive lwen nan tè.  Espas devan tèt yon moun ant sheve li avèk sousi li.  Fwon."
}, {
  "word": "Fonksyon",
  "description": "Wòl yon bagay.  Rezon ki fè yon bagay egziste.  Si pate gen rezon sa a bagay la pate ap bezwen egziste."
}, {
  "word": "Fonn",
  "description": "Soti nan fòm solid pou rive nan fòm likid."
}, {
  "word": "Fonse",
  "description": "Fè yon bagay vini fon.  Fè bòdi yon ekriti vini pi nwa ou byen kolore pou atire atansyon moun ki ap li."
}, {
  "word": "Ford",
  "description": "Yon konpayi mashin ameriken ki fè mashin tankou Taurus, Explorer, Tempo, Escort, e latriye.  Premye konpayi mashin ki te egziste nan peyi Etazini, depi kòmansman ane 1900 yo."
}, {
  "word": "Fotokopi",
  "description": "Fè yon bagay ki sanble avèk yon lòt bagay yon fason pou li vini difisil pou moun fè diferans ant orijinal la avèk kopi a.  Kopi. "
}, {
  "word": "Fou",
  "description": "Eta yon moun ki pèdi abilite, bon mwayen pou li panse.  Moun sa a pa konnen ki pawòl pou li pale avèk pawòl pou li kenbe sekrè.  Eta yon moun ki pa kapab kontwole tèt li.  Yon shanm, yon bwat ki kapab kenbe shalè pou boukannen bagay tankou pen,  gato, bonbon, e latriye."
}, {
  "word": "Foul",
  "description": "Anpil moun ki reyini ansanm."
}, {
  "word": "Foure",
  "description": "Rantre pwent yon bagay, yon bagay nan yon lòt bagay."
}, {
  "word": "Foutbòl",
  "description": "Yon jwèt ki gen onz jwè nan shak ekip sou yon teren ki kapab gen san mèt pou longè.   Gen yon boul sou teren an shak moun ap eseye mennen nan kan ekip opozan an.  Kèk moun kwè jwèt sa a soti nan peyi Angletè."
}, {
  "word": "Fran",
  "description": "Kòb moun sèvi nan peyi Frans."
}, {
  "word": "Frans",
  "description": "Yon peyi nan kontinan Ewòp la ki te posede anpil koloni tankou Ayiti.  Anpil koloni yo pran endepandans yo epi Frans vini pèdi pouvwa li nan lemond.  Moun nan peyi sa a pale Fransè."
}, {
  "word": "Fransè",
  "description": "Lang moun pale nan peyi Frans avèk anpil peyi Frans te kolonize tankou Ayiti.  Moun ki fèt nan peyi Frans.  Lang sa itilize aksan, apostwòf, atik."
}, {
  "word": "Frape",
  "description": "Leve yon bagay epi lage li sou yon lòt avèk fòs.  Dirije yon kò nan direksyon yon lòt avèk fòs jis yo rankontre."
}, {
  "word": "Frè",
  "description": "Yon pitit gason ki gen menm manman ou byen papa avèk yon lòt piti menm moun sa yo."
}, {
  "word": "Fredi",
  "description": "Yon gwo shanjman nan tanperati yon zòn kote nivo tanperati a kapab desann pi ba ke zewo degre.  Lè gen fredi moun oblije abiye avèk plizyè rad pou kenbe yo sho."
}, {
  "word": "Frèt",
  "description": "Yon bransh bwa yon moun itilize pou li frape sou yon lòt moun pou fè kò moun sa a fè li mal.  Lè kò yon moun fè li mal, moun nan kriye.  Eta moun ki ap viv nan yon zòn ki gen fredi."
}, {
  "word": "Fri",
  "description": "Eta yon bagay ki bouyi nan lwil.  Anpil grenn bwa tankou mango, rezen, zoranj moun kapab manje depi yo rive mi."
}, {
  "word": "Frijidè",
  "description": "Eta yon bagay ki frèt.  Yon mak mashin ki fè glas e ki rafreshi nenpòt bagay ki andedan li.  Anpil moun konfonn mak mashin nan avèk mashin nan menm:  yo rele mashin nan frijidè tou.  Lè yon likid rete andedan mashin sa li fè glas."
}, {
  "word": "Fwomaj",
  "description": "Yon preparasyon lèt ki fè li vini di.  Moun manje fwomaj tankou anpil manje solid.  Gen kèk fwomaj ki solid anpil, gen kèk ki mou tou e tout soti nan lèt."
}, {
  "word": "Fwon",
  "description": "Espas devan tèt yon èt vivan ki ant je li avèk sheve li, kòn li.  Devan tèt yon moun ant sheve li avèk sousi li."
}, {
  "word": "Fwonte",
  "description": "Eta yon moun ki fè yon bagay ki depase laj li.  Yon ti gason ki gen de ane konsa mande, nan yon bal, yon granmoun fi ki gen 40 ane konsa pou danse avèk li.  Eta yon moun ki renmen eseye fè nenpòt bagay menmsi li pa konnen kisa rezilta ap ye."
}, {
  "word": "Fyèl",
  "description": "Yon ògán andedan vant yon èt vivan ki anmè anpil.  Yon bagay ki anmè anpil.  Eksperyans yon move moman nan lavi yon moun."
}, {
  "word": "G",
  "description": "Setyèm lèt nan alfabèt lang Kreyòl la ki pwononse menm jan avèk pati nan kò moun ki pèmèt li wè a, je."
}, {
  "word": "Gade",
  "description": "Fikse je sou yon bagay san pyès entansyon.  Obsève."
}, {
  "word": "Gadè",
  "description": "Moun ki fikse je li sou yon bagay san pyès entansyon.  Obsèvè."
}, {
  "word": "Gadjèt",
  "description": "Yon ti pwent fè nan yo zam moun itilize pou fè yonn, plizyè bal soti nan zam nan."
}, {
  "word": "Gagè",
  "description": "Yon plas kote gason ayisyen ale pou fè kòk batay pou yo parye lajan.  Gen fi ki ale nan plas sa tou, men yo ale la pou sèvi gason ki a parye yo manje, tafya, e latriye."
}, {
  "word": "Galan",
  "description": "Eta yon gason ki toujou toupre pou sèvi fi avèk entansyon li kapab jwenn yon rekonpans pou sèvis li."
}, {
  "word": "Galèt",
  "description": "Wòsh sou kote yon rivyè ki byen ranje tankou moun te pran tan pou ranje yo, men se rivyè a menm ki pote yo mete nan plas sa pandan li ap desann."
}, {
  "word": "Galita",
  "description": "Yon espas sou anlè galri yon kay kote moun kapab rantre andedan li lè moun nan deja andedan kay la.  Pa gen mwayen pou rantre andedan galita a soti sou deyò."
}, {
  "word": "Galri",
  "description": "Yon espas nan yon kay kote moun ki ap viv nan kay la kapab shita pou pran bon van e respire bon lè.  Espas sa a toujou bay sou lari e anba galita a."
}, {
  "word": "Ganmèl",
  "description": "Yon gwo twons bwa ki gen yon tou rektang tankou yon bwat san kouvèti andedan li.  Li kapab kenbe likid.  Se peyizan ayisyen ki itilize li plis."
}, {
  "word": "Gason",
  "description": "Premye moun Bondye te mete sou tè a anvan li te fè fi.  Yon moun ki gen yon zozo nan fant janb li.  Mari yon fi, papa yon moun, e latriye.  Yon mal moun."
}, {
  "word": "Gaz",
  "description": "Yon pwodui shimik moun ki oblije fèmen andedan yon tank pou li pa evapore nan lè.  Yon likid ki kapab vini envizib menm jan avèk oksijèn.  Moun itilize gaz nan mashin, avyon, fou, e latriye."
}, {
  "word": "Gazèl",
  "description": "Yon ti femèl bèf ki poko fè pitit."
}, {
  "word": "Gazon",
  "description": "Yon kalite zèb moun prepare pou fè devan yon kay, lakou yon kay bèl. "
}, {
  "word": "Ge",
  "description": "Eta yon moun, yon timoun, ki toujou ap jwe, ki toujou anvi jwe."
}, {
  "word": "Gèmen",
  "description": "Moman lè yon grenn kòmanse grandi."
}, {
  "word": "Gen",
  "description": " Eta yon bagay ki anba kontwòl ou byen ki se pwopriyete yon moun, yon bagay ki fè pati de yon lòt."
}, {
  "word": "GMC",
  "description": "(General Motor Company) Yon konpayi mashin ameriken ki fè gwo kamyon avèk kèk ti mashin tou."
}, {
  "word": "Genyen",
  "description": "Sitiyasyon yon moun ki vini mèt,  ki gen yon bagay.  Pran premye plas nan yon jwèt, yon kous, e latriye."
}, {
  "word": "Gete",
  "description": "Eta yon moun, yon timoun ki ge.  Nenpòt kadans yon moun genyen ki fè li sanble yon moun ki ge, ki kontan."
}, {
  "word": "Gildiv",
  "description": "Yon izin nan peyi Ayiti kote yo fè kleren."
}, {
  "word": "Ginen",
  "description": " Guinee.  Yon mwayen pou di yon bagay lwen menm jan avèk esklav nwa yo ki te konnen soti nan Ginen, sou kontinan Afrik la pou ale Ayiti.  Nenpòt bagay ki lwen anpil.  Yon peyi nan kontinan afriken an kote anpil esklav nwa te soti."
}, {
  "word": "Gita",
  "description": "Yon enstriman mizikal ki gen sis kòd e mizisyen jwe li avèk prèske tou dis dwèt yo."
}, {
  "word": "Giyon",
  "description": "Yon bagay, yon moun, ki fè lavi yon lòt moun difisil.  Yon moun, yon bagay ki anmèdan."
}, {
  "word": "Giyonnen",
  "description": "Aksyon yon giyon.  Bay yon blag sou yon moun, di yon moun bagay li pa renmen tande."
}, {
  "word": "Glas",
  "description": "Yon moso materyèl, lè moun gade li, moun nan kapab wè figi li avèk tout bagay ki an fas materyèl sa.  Yon dlo moun mete nan frizè yon refrijeratè epi ki vini di tankou yon wòsh.  Glas gen yon koulè gri ou byen blan.  Shalè kapab fonn glas."
}, {
  "word": "Glase",
  "description": "Eta yon bagay ki gen glas nan li.  Yon bagay ki frèt anpil tankou glas."
}, {
  "word": "Gode",
  "description": "Yon resipyan ki fèt pou moun bwè likid tankou dlo, kafe, e latriye."
}, {
  "word": "Gòl",
  "description": "Shoute, voye yon boul rantre nan kan yon lòt ekip."
}, {
  "word": "Gonayiv",
  "description": "Pi gwo vil nan Depatman Latibonit la.  Se yonn nan pi ansyen vil nan peyi Ayiti.  Se nan vil sa fondatè peyi a te fè seremoni endepandans Ayiti.  Vil sa plase nan mitan lwès peyi Ayiti."
}, {
  "word": "Gonbo",
  "description": "Non moun nan kèk zòn peyi Ayiti bay grenn glise yon ti pye bwa donnen.  Kalalou.  Moun fè bon sòs avèk grenn sa a."
}, {
  "word": "Gou",
  "description": "Opinyon yon moun genyen de yon bagay ki andedan boush li."
}, {
  "word": "Goud",
  "description": "San santim,  san kòb nan lajan ayisyen an.  Senk goud fè yon dola."
}, {
  "word": "Gouman",
  "description": "Yon moun ki toujou vle manje e ki pa janm santi lè vant li plen.  Yon moun ki renmen manje.  Anpil timoun gen abitid sa a; kidonk se granmoun yo ki fèt pou kontwole kantite manje ki ap ale nan vant yo."
}, {
  "word": "Goumandiz",
  "description": "Eta yon èt vivan ki manje san kontwole kantite manje ki ap rantre nan vant li."
}, {
  "word": "Gous",
  "description": "Fri anpil plant tankou pwa ki donnen yon grenn ki sanble avèk yon ti baton e ki gen, soti nan twa pou rive nan dis, grenn andedan li."
}, {
  "word": "Gout",
  "description": "Yon ti pati nan yon likid ki ap soti anlè pou tonbe anba.  Lapli tonbe an gout sou tè a."
}, {
  "word": "Goute",
  "description": "Mete yon bagay nan boush pou konpare gou li avèk lòt gou."
}, {
  "word": "Goutè",
  "description": "Moun ki goute yon bagay pou konpare gou li avèk gou lòt bagay."
}, {
  "word": "Gouvènman",
  "description": "Yon prezidan avèk tout moun ki ap ede li gouvène you peyi.  Yon gwoup moun ki gen pouvwa pou gouvène.  Yon moun, gwoup moun, ki ap gouvène yon teritwa."
}, {
  "word": "Gouvènmantal",
  "description": "Tout bagay ki gen rapò avèk yon gouvènman. "
}, {
  "word": "Gouyad",
  "description": "Yon fason moun ki ap danse, fè sèks vire ren yo.  Moun sa yo gen entansyon vire ren yo pou fè yon wonn san rete, pandan yon kantite tan."
}, {
  "word": "Gouye",
  "description": "Vire ren nan fòm yon wonn."
}, {
  "word": "Goyin",
  "description": "Yon zouti ki gen anpil dan sou liy nan yon kwen li e ebenis itilize li.  Moun itilize goyin pou koupe plansh."
}, {
  "word": "Gra",
  "description": "Gwo.  Posede yon gwosè ki fè panse gen anpil grès nan vyann yon kò.  Eta yon bagay ki gen lwil nan li."
}, {
  "word": "Gradye",
  "description": "Patisipe nan yon seremoni gradyasyon."
}, {
  "word": "Gradyasyon",
  "description": "Yon seremoni reponsab lekòl yo òganize pou fè etidyan yo sonje valè travay yo soti akonpli a e bay yo yon diplòm ki reprezante nivo etid yo fè a."
}, {
  "word": "Graj",
  "description": "Yon moso metal ki gen anpil ti tou sou tout lajè li; konsa nenpòt bagay ki pi mou pase metal sa a e ki pase sou li li ap travèse ti tou yo.  Shak pase yon bagay pase sou graj la, li retire nan kò bagay sa pou diminye gwosè li."
}, {
  "word": "Graje",
  "description": "Jès yon moun fè lè li anvi leve sou yon shèz kote li shita, men gen yon bagay, tankou yon otorite, ki anpeshe li leve.  Fwote yon moso bagay sou yon graj pou jis li vini twò piti pou fwote sou graj la."
}, {
  "word": "Gramè",
  "description": "Yon liv ki esplike tou règ avèk prensip pou moun respekte nan yon lang."
}, {
  "word": "Gran",
  "description": "Yon bagay, yon moun ki gen anpil ane depi li te kòmanse egziste.  Yon bagay ki laj, ki wo, ki aje.  Gran Papa,  Papa manman ou byen papa papa yon lòt moun.  Mari yon grann.  Gran papa yo toujou gran."
}, {
  "word": "Grandè",
  "description": "Kapasite yon moun genyen pou li fè nenpòt moun respekte li, pè li.  Kalite ki ede yon moun dirije yon gwoup moun, yon kò militè nan lagè e genyen gè a.  Kalite yon moun posede pou li dirije lòt moun."
}, {
  "word": "Grandi",
  "description": "Eta yon bagay, yon moun ki ap pase etap li gen pou li pase pou li vini wo."
}, {
  "word": "Grandizè",
  "description": "Moun ki pale anpil yon fason pou shashe bay tèt li plis bon kalite, bonte, valè, grandè li pa genyen avèk espwa lòt moun ap bay li menm bagay sa yo tou."
}, {
  "word": "Grangou",
  "description": "Eta yon moun santi li lè li anvi manje.  Egzitans yon vid nan lestomak yon èt vivan.  Jan yon moun santi li shak twa èd tan apre li fini manje."
}, {
  "word": "Granmesi",
  "description": "Avèk sekou…  Avèk èd… "
}, {
  "word": "Granmoun",
  "description": "Nenpòt moun ki, fè pitit, rive nan laj lè li te dwe deja fè pitit.  Yon moun ki gen anpil ane an plis yon lòt."
}, {
  "word": "Grann",
  "description": "Yon granmoun fi ki manman manman ou byen manman papa yon lòt moun.  Madanm yon gran-papa a.  Grann Nanna, Yon granmoun fi ki gen yon mennaj, yon mari ki te kapab pitit li pou gwo diferans ant laj yo de a."
}, {
  "word": "Grannivyè",
  "description": "Yon vil nan Depatman Nò a.  Grande Rivière du Nord."
}, {
  "word": "Granvensan",
  "description": "Yon bannann moun kapab manje lè li vèt ou byen lè li mi.  Lè li mi yo rele li fig."
}, {
  "word": "Grap",
  "description": "Grenn yon pye palmis ki soti andedan djagwasil yo.  Koshon nwa yo te konnen manje grap paske li dous.  Grenn sa a te konnen angrese bèt sa tou."
}, {
  "word": "Gravite",
  "description": "Yon fòs ki rale tout kò ki toupre fas tè a tonbe sou li.  Syantis mezire fòs sa e yo jwenn li rale tout kò tonbe sou tè a avèk yon vitès ki mezire 9,8 mèt pou shak segond ki pase lè yon bagay ap tonbe."
}, {
  "word": "Grèk",
  "description": "Yon ti sak ki gen fòm yon triyang e ayisyen itilize li pou yo koule, fè kafe.  Yon lang moun pale nan peyi Grès.  Moun ki fèt nan peyi Grès."
}, {
  "word": "Grenadya",
  "description": "Yon lyann ki kapab pase plizyè ane ap grandi pandan li ap donnen anpil grenn prèske shak jou.  Fri grenadya a sanble avèk yon ti boul.  Li gen yon ji andedan li ki si anpil avèk kèk ti grenn tou.  Li fè bon ji e ayisyen renmen bwè ji sa a anpil."
}, {
  "word": "Grenn",
  "description": "Fri yon pye bwa ki pèmèt pye bwa a kontinye egziste.  Grenn yon pye bwa gen yon ti grenn andedan li.  Shak ti grenn sa yo kapab bay yon pye bwa pou kont yo lè yo gèmen, men gen anpil grenn pye bwa ki pa gèmen."
}, {
  "word": "Grip",
  "description": "Yon maladi kontajye yon mikwòb bay.  Moun ki gen grip toujou santi yon bagay nan gòj yo ki fòse yo ouvri boush yo pou pouse yon koush lè soti.  Kèk fwa malad la kòmanse anrime anvan li gen grip.  Lè yon moun gen yon grip ki dire anpil tan li fèt pou li ale wè yon doktè pou konsiltasyon."
}, {
  "word": "Gripe",
  "description": "Eta yon moun ki soufri maladi ki rele grip."
}, {
  "word": "Griye",
  "description": "Kwit yon bagay avèk shalè dife e san dlo.  Yon bagay ki ap griye gen kontak dirèk avèk dife a."
}, {
  "word": "Gwatemala",
  "description": "Yon peyi sou kontinan Amerik la nan yon zòn ki rele Amerik Santral, nan Sid Meksik.  Moun nan peyi sa pale Espanyòl."
}, {
  "word": "Gwayamouk",
  "description": "Mo sa a soti nan lang Espanyòl la:  guayamunco.  Se yon rivyè ki pase sou kote kapital Depatman Sant la, Ensh.  Gen de rivyè enpòtan ki tonbe nan  Gwayamouk, Yofri avèk Kanno epi yo tout ale tonbe nan flèv Latibonit la."
}, {
  "word": "Gwayav",
  "description": "Yon pye bwa ki bay yon fri won, ki fè bon konfiti, bon ji."
}, {
  "word": "Gwo",
  "description": "Yon dimansyon laj.  Eta yon moun ki gen anpil popilarite.  Près.  Anpil.  Yon fason mashann vann mashandiz yo genyen pou fè pri inite yo vini pi piti."
}, {
  "word": "Gwonde",
  "description": "Fè yon bri andedan gòj pou entimide lòt moun, bèt.  Yon bri shyen fè anvan yo kòmanse jape.  Bri yon loray fè e ki dire plizyè segond."
}, {
  "word": "Gwòs",
  "description": "Rezilta yon spèmatozoyid ki rankontre avèk yon ovil andedan yon fi, yon femèl.  Rankont sa bay yon ze ki ap ale bay yon timoun, yon ti bèt.  Devlopman yon timoun dire nèf mwa, pou yon fi, anvan li akoushe."
}, {
  "word": "Gwosè",
  "description": "Dimansyon egzat yon bagay genyen. "
}, {
  "word": "Gwosès",
  "description": "Moman lè yon fi ap pote yon pitit andedan vant li. Yon fi pote yon pitit andedan vant li pandan nèf mwa.  Plenn."
}, {
  "word": "Gwoup",
  "description": "Plizyè an menm tan.  Rasanbleman, reyinyon plizyè moun."
}, {
  "word": "Gwoswòsh",
  "description": "Yon plaj nan Depatman Latibonit nan Nò Sen-Mak."
}, {
  "word": "H",
  "description": "Uityèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Harley Davidson",
  "description": "Yonn nan de pi ansyen konpayi motosiklèt, sou kote Honda, ki te kòmanse fè motosiklèt nan kòmansman ane 1900 yo.  Yon konpayi motosiklèt ameriken."
}, {
  "word": "Honda",
  "description": "Yon konpayi motosiklèt japonès.  Li kòmanse fè motosiklèt nan peyi Japan epi li rantre nan peyi Etazini nan ane 1950 yo.  Se yonn nan de pi ansyen konpayi motosiklèt yo ki te kòmanse fè motosiklèt nan kòmansman ane 1900 yo.  Tout kote Honda pase, li elimine konpetisyon Harley Davidson."
}, {
  "word": "Hyundai",
  "description": "Yon konpayi mashin Koreyen.  Konpayi sa a fè ti mashin, tankou konpayi Japonè yo, e mashin sa yo pa vann shè."
}, {
  "word": "I",
  "description": "Nevyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Idantifikasyon",
  "description": "Yon mwayen pou rekonèt yon bagay, yon moun.  Yon ti kat ki gen non yon moun avèk foto moun nan sou li pou lye non an avèk foto a. "
}, {
  "word": "Ideyal",
  "description": "Yon bagay ki egzateman nan pozisyon li, plas li te dwe ye a.  Yon bagay ki sanble anpil avèk yon lide ki te nan tèt yon moun."
}, {
  "word": "Il",
  "description": "Lil.  Yon moso tè dlo antoure, dlo pase sou tout kwen li."
}, {
  "word": "Iletre",
  "description": " Eta yon moun ki pa konnen li avèk ekri.  Yon moun ki pa konprann anpil bagay nan reyalite lavi."
}, {
  "word": "Imaj",
  "description": "Kopi yon bagay.  Lonbraj yon bagay."
}, {
  "word": "Imajine",
  "description": "Kreye imaj yon bagay, yon lide nan tèt anvan li vini egziste nan reyalite."
}, {
  "word": "Imigran",
  "description": "Moun ki kite peyi yo pou vini viv nan yon peyi etranje."
}, {
  "word": "Imigrasyon",
  "description": "Aksyon moun ki kite yon peyi yo pou vini viv nan yon lòt peyi.  Biwo leta yon peyi ki regle afè moun ki ap rantre epi soti nan peyi a."
}, {
  "word": "Imigre",
  "description": "Kite yon peyi pou vini viv nan yon lòt peyi."
}, {
  "word": "Imitasyon",
  "description": "Aksyon yon moun ki gade kijan yon lòt moun fè yon bagay pou fè li tou.  Kèk fwa yon imitasyon tèlman sanble avèk orijinal la moun pa kapab konnen diferans ant yo de a. Kopi."
}, {
  "word": "Imite",
  "description": "Gade yon bagay, sa, yon moun fè pou fè menm bagay la tou.  Kopye."
}, {
  "word": "Imobilize",
  "description": "Tashe ou byen kole yon bagay yon kote byen solid pou li pa kapab souke, deplase ditou."
}, {
  "word": "Infiniti",
  "description": "Yon konpayi mashin liksye, sou kote Mercedes avèk Lexus."
}, {
  "word": "Inifòm",
  "description": "Plisyè bagay ki gen menm fòm nan.  Yon rad menm koulè, menm fòm nan plisyè moun nan yon gwoup tankou yon enstitisyon, yon ekip mete sou yo."
}, {
  "word": "Inik",
  "description": "Yon bagay ki diferan de tout lòt nan menm klas la."
}, {
  "word": "Inivè",
  "description": "Tout bagay ki egziste depi soti sou tè a pase sou tout lòt planèt yo:  Solèy, Lalin, Jipitè, e latriye."
}, {
  "word": "Inivèsite",
  "description": "Yon gwoup enstitisyon, apre lekòl segondè, ki prepare pwofesyonèl."
}, {
  "word": "Inosan",
  "description": "Yon moun ki pa konnen kijan pou li defann tèt li.  Yon moun, malgre tout akizasyon, yon tribinal pran desizyon pou li pa kondane moun li.  Moun ki genyen yon jijman."
}, {
  "word": "Inyon",
  "description": "De ou byen plizyè moun, plizyè bagay ki reyini ansanm.  Inyon Sovyetik, Yon gwoup peyi, avèk peyi Risi nan tèt yo, ki te ap pousib yon lide ki te rele Kominis.  Se te yon gwoup peyi ki te ap kontrekare lide Kapitalis la nan peyi Etazini.  Inyon an kraze nan kòmansman ane 1990 yo.  Prèske tout peyi sa yo gen lide pou ranje so kote lide Kapitalis la."
}, {
  "word": "Ipokrit",
  "description": "Moun ki kashe rayisman avèk vye lide yo gen kont yon lòt moun, lè yo devan moun nan, pou montre yo se yon zanmi li, yo renmen li.  Lè yo dèyè menm moun sa a, yo eksprime tout vrè santiman yo kont moun nan."
}, {
  "word": "Ipokrizi",
  "description": "Aksyon moun ki kashe rayisman avèk vye lide yo gen kont yon lòt moun, lè yo devan moun nan, pou montre yo se yon zanmi li, yo renmen li.  Lè yo dèyè menm moun sa a, yo eksprime tout vrè santiman yo de moun nan."
}, {
  "word": "Irak",
  "description": "Yon peyi nan kontinan Azi a e sou kote Iran, pi gwo énmi peyi sa tou, ki pa lye avèk Etazini, ki pate lye avèk Inyon-Sovyetik."
}, {
  "word": "Iran",
  "description": "Yon peyi nan kontinan Azi a e sou kote Irak, pi gwo énmi peyi sa tou, ki pa lye avèk Etazini, ki pate lye avèk Inyon-Sovyetik."
}, {
  "word": "Istoryen",
  "description": "Moun ki ekri sou istwa, tout sa ki pase deja e avèti moun:  sa ki pase deja ap retounen ankò."
}, {
  "word": "Istwa",
  "description": "Nenpòt bagay ki pase deja e moun kontinye ap pale ou byen ekri sou li.  Moun ki ap rakonte yon istwa kòmanse avèk yon entwodiksyon, yon devlopman, e fini avèk yon konklizyon."
}, {
  "word": "Isuzu",
  "description": "Yon konpayi mashin Japonè ki te plis konn fè kamyon."
}, {
  "word": "Italik",
  "description": "Nenpòt bagay ki gen rapò avèk peyi Itali.  Fòm lèt, nan yon ekriti, ki panshe."
}, {
  "word": "Itilizatè",
  "description": "Moun ki itilize yon bagay ou byen yon lòt moun."
}, {
  "word": "Itilize",
  "description": "Pran yon bagay an shaj epi kontwole.  Pran avantaj sou yon bagay, yon moun."
}, {
  "word": "Izin",
  "description": "Kèk gwo kay kote travayè itilize mashin pou transfòme pwodui natirèl yo tankou bwa pou fè papye, gonm pye bwa pou fè wou mashin, lèt bèf pou fè twal, e latriye."
}, {
  "word": "J",
  "description": "Dizyèm lèt nan alfabèt lang Kreyòl la ki pwononse menm jan avèk bwason sa a, ji."
}, {
  "word": "Jaden",
  "description": "Yon moso tè, yonn ou byen plizyè kawo tè kote yon jadinye plante, sekle, rekòlte."
}, {
  "word": "Jakmèl",
  "description": "Kapital Depatman Sid Lès la."
}, {
  "word": "Janb",
  "description": "Tout longè pye yon moun depi soti bò senti li pou jis rive anba plat pye."
}, {
  "word": "Janbe",
  "description": "Itilize janb pou soti sou yon bò yon bagay, yon moun pou travèse ale sou lòt bò bagay la, moun nan.  Yon ekspresyon moun itilize pou esplike kijan yo travèse yon bagay."
}, {
  "word": "Jandam",
  "description": "Nenpòt manb, moun nan yon kò militè."
}, {
  "word": "Jant",
  "description": "Yon moso metal won ki gen menm fòm avèk yon kawoutchou e ki rantre andedan yon kawoutchou pou pèmèt kawoutchou a kenbe van.  Prèske tout veyikil tankou bisiklèt, motosiklèt, mashin gen jant."
}, {
  "word": "Jante",
  "description": "Mete yon jant andedan yon kawoutchou."
}, {
  "word": "Janvye",
  "description": "Premye mwa nan yon ane ki pote trante-en jou.  Yon ane shanje lè premye jou nan mwa janvye a rive."
}, {
  "word": "Japan",
  "description": "Yon peyi nan kontinan Azi a ki shita sou plizyè ti il. Peyi sa trè avanse nan konesans teknoloji."
}, {
  "word": "Jape",
  "description": "Yon bri shyen fè avèk boush li ouvri, lè li bezwen fè moun pè, lè li pè."
}, {
  "word": "Je",
  "description": "Pati nan kò moun, nan tèt moun, ki pèmèt moun wè.  Yon mesaje ki pote rapò bay shèf li, se je shèf la paske li pèmèt shèf la wè sa ki ap pase.  Yon kamera se je moun tou."
}, {
  "word": "Jedi",
  "description": "Senkyèm jou nan yon semèn.  Katriyèm jou biznis nan yon semèn."
}, {
  "word": "Jedinèt",
  "description": "Yon bannann pote non sa a nan zòn Depatman Sant la.  Lè li vèt li rele jedinèt, lè li mi li rele fig.  Gen menm bannann sa a nan prèske tout zòn nan peyi a, li kapab gen lòt non tankou granvensan."
}, {
  "word": "Jeep",
  "description": "Yonn nan pi ansyen konpayi mashin ki egziste.  Yon ansyen modèl mashin konpayi sa, Willis, toujou egziste.  Jeep fè mak mashin Cheroke tou."
}, {
  "word": "Jèmen",
  "description": "Lè yon grenn kòmanse grandi."
}, {
  "word": "Jèn",
  "description": "Yon laj moun genyen kote yo gen tout enèji, fòs sou yo pou fè anpil bagay ki egzije fòs moun tankou kouri, memorize, pale, e latriye…   Jèn Jan Yon gason ki nan laj moun ki posede tout enèji, fòs pou fè anpil bagay ki egzije fòs moun tankou kouri e latriye."
}, {
  "word": "Jeneral",
  "description": "Pi gwo grad yon moun kapab genyen nan yon kò militè.  An Jeneral , Pale de yon bagay tout antye san panse a eksepsyon li."
}, {
  "word": "Jenerasyon",
  "description": "Moun ki ap viv nan yon epòk ki dire dizuit ane konsa.  Moun nan tout sosyete espere apre dizuit ane tout timoun nan tout fanmiy ap gentan fè pitit.  Tout pitit, pitit pitit granmoun nan yon fanmiy.  Nouvèl Jenerasyon, Yon tip mizik ayisyen ki parèt nan ane katreven yo.  Gwoup ki fè mizik sa yo shante an Kreyòl yon fason pou separe nouvo stil mizik yo a avèk ansyen mzik yo shantè te konnen shante nan lang Fransè."
}, {
  "word": "Jeni",
  "description": "Lespri moun genyen pou kreye bagay.  Nan tan lontan, moun te panse jeni se te yon fòs djab ki te ap ede moun.  Konnye a moun ale lekòl pou yo kapab kreye bagay. "
}, {
  "word": "Jennen",
  "description": "Eta yon moun ki wont, timid.  Eta yon moun ki vòlè yon bagay epi mèt bagay la kenbe li."
}, {
  "word": "Jenou",
  "description": "Espas ant pye avèk kuis moun ki gen yon ti boul nan li pou pèmèt janb nan pliye sou dèyè."
}, {
  "word": "Jeograf",
  "description": "Moun ki etidye epi entèprete enfòmasyon geografik."
}, {
  "word": "Jeografi",
  "description": "Syans ki pale, mezire fas tè a,  de moun ki sou tè a."
}, {
  "word": "Jeremi",
  "description": "Non yon pwofèt nan Bib la.  Jeremie.  Non kapital Depatman Grandans la.  Vil sa a sou yon prèskil nan Sid-Lwès peyi Ayiti e se zòn nan peyi ki gen plis lamveritab."
}, {
  "word": "Jès",
  "description": "Siy yon moun fè avèk yon pati, tout kò, nan kò li pou ranplase yon mo, yon mesaj li vle bay yon lòt moun."
}, {
  "word": "Jezi Kris",
  "description": "Yon pitit Bondye ki te vini sou tè a pou mouri nan plas tout lòt moun sou tè a pou efase peshe yo.  Li te viv pandan trant-twa ane sou tè a.  Tout kretyen kwè li nan syèl la konnye a e li shita sou bò dwat papa a, Bondye."
}, {
  "word": "Ji",
  "description": "Yon bwason ki fèt avèk fri yon pye bwa.  Pou fè yon ji, moun pran fri a epi yo kraze ou byen peze li pou likid soti andedan li epi yo mete dlo sou likid sa anvan yo sikre li."
}, {
  "word": "Jij",
  "description": "Shèf yon tribinal ki la pou koute de kan nan yon jijman e kontwole tout sa ki ap pase nan yon tribinal."
}, {
  "word": "Jijman",
  "description": "Moman nan yon tribinal kote gen yon jij, yon jiri, yon plentif ou byen yon pwosekitè, yon defandan, yon okton.  Konklizyon travay tout moun ki reyini nan yon tribinal."
}, {
  "word": "Jistis",
  "description": "Sib tout entansyon lwa yo nan yon jijman.  Jwenn satisfaksyon nan tribinal kont move aksyon, aksyon kriminèl yon moun komèt."
}, {
  "word": "Jiyè",
  "description": "Setyèm mwa nan yon ane.  Yonn nan de mwa ki fè plis shalè nan yon ane sou kote mwa Out la."
}, {
  "word": "Jodia",
  "description": "Konnye a menm, nan menm jou sa a.  Nan moman sa a menm."
}, {
  "word": "Jon",
  "description": "Yon baton avèk de pwent remakab yon pwofesyonèl kapab vire tou won sou men li, dwèt li, kou li, menm pye li san baton an pa janm tonbe yon kote li pate vle.  Pwofesyonèl sa a rele Majò Jon.  Majò Jon plis patisipe nan Rara."
}, {
  "word": "Jón",
  "description": "Menm koulè avèk ti boul ki nan mitan yon ze poul la."
}, {
  "word": "Jou",
  "description": "Klète.  Moman pandan solèy la klere sou tè a."
}, {
  "word": "Jounal",
  "description": "Yon papye moun ekri shak jou pou enfòme lòt moun e konsève nouvèl ki pase.  Nòt moun pran shak jou pou konsève istwa tranzaksyon gwo biznis ki pase shak jou.  Yon ti liv pou yon moun konsève bagay ki pase nan lavi li shak jou."
}, {
  "word": "Jounalye",
  "description": "Eta bagay ki pase shak jou.  Moun ki ale sekle nan jaden yon moun pou li toushe yon kòb pou jounen."
}, {
  "word": "Jounen",
  "description": "Kantite tan ki ant moman solèy leve a pou jis rive nan moman li koushe, li disparèt."
}, {
  "word": "Joure",
  "description": "Aksyon de ou plizyè moun ki kanpe fas a fas epi ki ap di yonn lòt mo yo konnen ki ap fè lòt moun nan fashe."
}, {
  "word": "Jwe",
  "description": "Pran plezi.  Fè son soti nan yon enstriman mizikal.  Jwe wòl yon moun nan yon film, yon teyat."
}, {
  "word": "Jwèt",
  "description": "Bagay ki fèt pou moun pran plezi yo.  Moun lòt moun pa pran li menm menm, sa ki soti nan boush li pou bagay serye."
}, {
  "word": "Jwi",
  "description": "Eta yon moun ap fè yon bagay ki bay anpil plezi."
}, {
  "word": "Jwisans",
  "description": "Jan yon moun santi lè li ap fè yon bagay ki bay anpil plezi."
}, {
  "word": "Jyen",
  "description": "Yon mwa ki nan mitan yon ane.  Sizyèm mwa nan yon ane.  Vennkatriyèm jou nan mwa sa a se jou ki pi long pase tout jou nan yon ane."
}, {
  "word": "K",
  "description": "Onzyèm lèt nan alfabèt lang Kreyòl la e ki pwononse tankou mo sa, ka.  Gade Ka."
}, {
  "word": "Ka",
  "description": "Yon gwo pwoblèm.  Lanmò.  Yon pwoblèm yon moun genyen e li pa konnen solisyon li, li pa gen solisyon."
}, {
  "word": "Kabrit",
  "description": "Yon bèt ki bay pitit li tete, ki gen de kòn nan tèt li, de zòrèy kanpe, boush long.  Li fè yon pitit yon sèl kou.   Kèk lè li konnen fè de ou byen twa pitit tou.  Kabrit fè yon bri tankou li ap di bè è è è … pou kominike avèk parèy li.  Gade bouk."
}, {
  "word": "Kadav",
  "description": "Kò yon èt vivan, yon moun apre li fini mouri."
}, {
  "word": "Kadejak",
  "description": "Travay yon gason ki koupe yon fi san volonte."
}, {
  "word": "Kadran",
  "description": "Kat moso materyèl avèk tout uit pwent yo kole ansanm.   Yon kadriyaj.  Tout bagay ki gen kat kwen."
}, {
  "word": "Kadriyaj",
  "description": "Yon bagay kare, solid ki bay tou yon mi sipò pou enstale yon fenèt nan mi a."
}, {
  "word": "Kafe",
  "description": "Grenn yon pye bwa moun griye, anfounen epi kraze li fè poud pou prepare yon bwason.  Poud grenn yon pye bwa moun melanje avèk dlo, sik pou bwè.  Poud, bwason grenn yon pye bwa."
}, {
  "word": "Kafetyè",
  "description": "Yon bèl resipyan ki fèt pou mete anpil kafe pou moun kapab transfere nan gode pou bwè."
}, {
  "word": "Kafou",
  "description": "Yon espas kote, pou pi piti, de ri kwaze yonn lòt.  Yon zòn nan sid kapital peyi Ayiti kote Wout Nasyonal Nimewo De a pase pou ale Okay, kapital Depatman Sid la.  Kafou Shada, Yon zòn nan nò Pòtoprens kote Wout Nasyonal Nimewo En a rankontre avèk Wout Nasyonal Nimewo Twa a.  Kalfou."
}, {
  "word": "Kaka",
  "description": "Bagay ki soti nan tou dèyè yon moun, yon bèt.  Yon fason pou di yon moun li pèdi yon avantaj.  De lèt sa yo yonn apre lòt, KK."
}, {
  "word": "Kako",
  "description": "Moun ki te konnen ap revòlte kont okipasyon ameriken lè Etazini te okipe Ayiti soti nan ane 1915 pou rive nan 1934.  Moun sa yo te konnen viv nan kashe pou ameriken yo pa jwenn yo.  Nenpòt moun ki ap viv nan kashe pou atake lè li panse moun li ap atake a ap dòmi, bliye li."
}, {
  "word": "Kalalou",
  "description": "Non moun, nan kèk zòn peyi Ayiti, bay gous glise yon ti pye bwa donnen.  Gonbo.  Yo fè bon sòs avèk li."
}, {
  "word": "Kalbas",
  "description": "Gwo grenn yon gwo pye bwa donnen e li gen po di.  Grenn sa gen yon bagay andedan li moun retire nan yon ti tou yo fouye nan yon kwen kalbas la.  Konsa yo kapab itilize andedan kalbas la pou mete lòt bagay tankou dlo.  Yo konnen fann kalbas la tou pou fè kwiy.  Shak nan de bò yon kalbas bay yon kwiy."
}, {
  "word": "Kale",
  "description": "Retire po sou yon bagay.  Frape fwèt sou yon moun."
}, {
  "word": "Kakas",
  "description": "Sa ki rete lè tout dlo yon kann soti nan kann nan:  po a avèk nannan an."
}, {
  "word": "Kalkilatè",
  "description": "Yon ti òdinatè ki kapab fè adisyon, soustraksyon, divizyon, miltiplikasyon avèk anpil lòt operasyon.  Yon ti pwogram òdinatè ki kapab fè anpil operasyon."
}, {
  "word": "Kakile",
  "description": "Abilite pou fè operasyon.  Abilite pou jwenn rezilta pwoblèm.  Analize.  Shashe lide nan memwa pou mete nan reyalite tankou ekri ou byen pale."
}, {
  "word": "Kalme",
  "description": "Elimine, diminye shalè, tansyon pou vini nan yon eta ki nòmal."
}, {
  "word": "Kalson",
  "description": "Yon bout pantalon ki fèt avèk twal mens e gason mete li anvan yo mete pantalon long sou yo."
}, {
  "word": "Kamera",
  "description": "Yon aparèy ki kapab pran imaj avèk son ki toupre li epi anrejistre yo sou kasèt pou voye sou ekran televizyon."
}, {
  "word": "Kamyon",
  "description": "Yon gwo mashin ki loud anpil e ki gen anpil fòs.  Li fèt pou pote anpil shay.  Nan peyi pòv yo, kamyon pote moun sou shay yo."
}, {
  "word": "Kamyonèt",
  "description": "Yon ti mashin ki gen yonn ou byen de plas sou kote shofè a e ki kapab pote soti sèz pou rive a ven moun nan espas dèyè li.  Yon ti kamyon."
}, {
  "word": "Kan",
  "description": " Kote yon gadyen kanpe pou pare boul lè de ekip ap jwe.  Kote yon gwoup moun kanpe pou defann tèt yo."
}, {
  "word": "Kana",
  "description": "Yon zwazo ki mashe an kadans.  Li renmen dlo sal e mal la kouri avèk zozo li deyò lè li fini bay fèmèl la parèy.  Vyann li prèske gen menm gou avèk vyann bèf.  Li konnen naje e li konnen koule nan dlo."
}, {
  "word": "Kanada",
  "description": "Yon gwo peyi nan Amerik Nò a e nan nò Etazini.  Li divize an de pati:  Quebec avèk Montreal.   Peyi sa gen yon gouvènman wayalis; konsa yo pa gen prezidan.  Se yon premye minis ki gouvène peyi a.  Canada."
}, {
  "word": "Kandida",
  "description": "Moun ki ap patisipe nan yon eleksyon avèk espwa moun ki ap vote nan eleksyon an ap ale vote pou li.  Yon moun kapab mete tèt li kòm yon kandida; konsa lòt moun kapab mete li kandida tou."
}, {
  "word": "Kanè",
  "description": "Yon ti kaye ki pa gen anpil paj kote pwofesè yon klas rapòte nòt elèv ki nan klas li."
}, {
  "word": "Kanèl",
  "description": "Po yon bwa koulè mawon ki gen yon sant moun renmen nan manje dous tankou labouyi, banana, e latriye."
}, {
  "word": "Kanif",
  "description": "Yon kouto ki kapab pliye rantre nan mansh li."
}, {
  "word": "Kanmenm",
  "description": "Eta yon bagay anyen pa kapa anpeshe li rive."
}, {
  "word": "Kann",
  "description": "Yon plant sikre moun itilize pou fè sik, siwo, rapadou  avèk kleren."
}, {
  "word": "Kannari",
  "description": "Yon resipyan ki fèt avèk ajil e ki pase nan fou pou li kapab vini, di, solid.  Yon peyi ki sou plizyè ti il nan nò kontinan Afrik la."
}, {
  "word": "Kanni",
  "description": "Eta yon bagay ki gate paske tanperati kote bagay sa a te ye a pate bon pou konsève li.  Eta dan moun ki fimen e ki gen koulè mawon.  Dan moun ki pouri."
}, {
  "word": "Kannistè",
  "description": "Mamit.  Non moun nan nò peyi Ayiti bay yon  bwat an metal ki tou won avèk de kouvèti, yonn nan shak pwent li."
}, {
  "word": "Kanno",
  "description": "Yon ansyen zam ki te konnen tire yon boul lwen e boul sa a te kapab kraze nenpòt sa li tonbe sou li a.  Lè li tonbe sou tè, li te konnen fouye yon tou.  Yon rivyè nan zòn Mayisad, Plato Santral."
}, {
  "word": "Kanpe",
  "description": "Pran yon direksyon vètikal.  Sispan avanse nan yon direksyon."
}, {
  "word": "Kanperen",
  "description": "Yon vil nan Depatman Sid la kote wout ki mennen Jeremi an pase.  Anpil moun nan zòn sa gen kavo yo nan lakou kay yo, yon koutim ki pa popilè nan lòt zòn nan peyi a."
}, {
  "word": "Kanpèsh",
  "description": "Yon pye bwa, lè li gran, mitan twons li vini gen koulè wouj.  Pati wouj sa a, si li rete nan yon likid tankou dlo, li bay likid la koulè wouj.  Yon pye bwa, lè li vèt, li gen yon sant fò.  Yon komès ki kòz lanmò fondatè peyi Ayiti a, Jean-Jacques Dessalines. "
}, {
  "word": "Kanson",
  "description": "Yon rad gason mete sou li ki gen de janb ki sanble avèk de janb moun.  Yon pantalon."
}, {
  "word": "Kansonfè",
  "description": "Yon gason ki gen abilite pou pran yon pozisyon avèk fèmte.  Yon moun ki montre kapasite pou gouvène."
}, {
  "word": "Kantin",
  "description": "Sinistre responsab kèk entitisyon prepare pou nouri moun an gwoup.  Manje responsab lekòl yo te konnen bay elèv yo pou retire lide yo sou manje lè yo andedan klas."
}, {
  "word": "Kantite",
  "description": "Yonn ou byen plizyè nan yon bagay.  Dekont.   Kontitisyon yon bagay, plizyè bagay ansanm."
}, {
  "word": "Kapab",
  "description": "Abilite, potansyalite pou fè yon bagay.  Fòs, entelijans ki disponib nan yon bagay."
}, {
  "word": "Kapasite",
  "description": "Mwayen ki disponib pou fè nenpòt bagay."
}, {
  "word": "Kap-Ayisyen",
  "description": "Dezyèm vil peyi Ayiti, nan nò peyi a.  Istwa vil sa kòmanse nan tan kolonizasyon.   Istwa rakonte anpil bagay sou wòl vil sa te jwe nan lagè pou endepandans peyi a.  Cap-Haïtien."
}, {
  "word": "Kapital",
  "description": "Vil ki pi enpòtan nan yon zòn, yon peyi.  Vil yon peyi kote prezidan yon peyi ap viv pandan prezidans li e se la li gen biwo li.  Yon gwo bagay tankou vil ki pi enpòtan nan yon peyi."
}, {
  "word": "Kaporal",
  "description": "Grad yon militè ki pa gen pwofesyon resevwa sivil, premye grad militè resevwa nan djòb yo.  Yon shèf militè ki ap mashe nan tout ri yon vil pou yo wè si pa gen dezòd.  Nenpòt moun ki vle tout bagay rete nan lòd."
}, {
  "word": "Karant",
  "description": "Kat miltipliye pa dis.  Ven plis ven.  San mwens swasant.  Katreven divize pa de.  40."
}, {
  "word": "Kare",
  "description": "Nenpòt bagay ki gen kat kwen ki gen menm dimansyon an nan shak kwen.  Moun ki renmen itilize vrè mo li bezwen an pou li eksprime lide li."
}, {
  "word": "Karese",
  "description": "Pase men sou tout kò yon moun pou fè moun sa santi tout kò li dous e sispann panse a tout lòt bagay ki pa gen rapò avèk pwòp tèt pa li ou byen moun ki ap toushe li a.  Nenpòt sa de moun fè ki anonse yo ap ale koupe apre aksyon an.  Aksyon yon moun ki ap fè yon lòt dous."
}, {
  "word": "Karyoka",
  "description": "Yon vye sandal, soulye ki demode epi yon moun kontinye mete li."
}, {
  "word": "Kasav",
  "description": "Yon manje peyizan ayisyen prepare avèk manyòk lè yo fini retire lanmidon an nan manyòk la.  Si kasav seshe nan solèy, li kapab pran anpil mwa anvan li gate.  Li gen bon gou lè li gen manba sou li."
}, {
  "word": "Kase",
  "description": "Divize an de ou byen plis moso.  Dan Kase, Eta yon moun ki pèdi yon moso nan dan li. .  Kase Koub, Kite yon direksyon dwat pou vire nan yon lòt direksyon."
}, {
  "word": "Kasèt",
  "description": "Yon ti bwat an plastik ki gen yon riban an plastik andedan li ki kapab enrejistre son, imaj."
}, {
  "word": "Kash",
  "description": "Kòb.  Lajan.  Lajan, kòb moun kapab itilize pou ashte e nenpòt moun ap aksepte resevwa li.  Kash diferan de shèk, kat kredi, nòt, e latriye paske tout moun pa aksepte bagay sa yo."
}, {
  "word": "Kashe",
  "description": "Sitiyasyon yon moun ki rete andedan yon bagay avèk espwa li ap enposib pou moun wè li.  Sere."
}, {
  "word": "Kaskad",
  "description": "Eta dlo, tankou dlo yon ravin, ki ap glise desann soti sou yon do mòn.  Jan yon moun ranje plizyè dokiman ki ouvri sou ekran yon òdinatè tankou dlo yon ravin ki ap desann soti sou do yon mòn."
}, {
  "word": "Kat",
  "description": "Senkyèm shif nan nonb pozitif yo.  De plis de, twa plis en, de miltipliye pa de, e latriye.  Yon moso katon, plastik moun sèvi pou yo jwe anpil jwèt tankou twasèt, bezig, viv-damou, solitè, pokè, e latriye.  Yon ti moso plastik ki gen longè twa pous avèk de pous pou lajè e ki gen anpil enfòmasyon sou li kèk mashin kapab li.  Kat Kredi, Yon kat ki gen enfòmasyon nan li moun pa kapab li, men yon mashin kapab li tout enfòmasyon sa yo pou pèmèt yon moun pran lajan nan anpil bank, ashte bagay nan anpil boutik, magazen."
}, {
  "word": "Katab",
  "description": "Yon bèl moso katon ki pliye an de e moun kapab rantre yon fèy papye andedan li pou li pa shifonnen.  Moun ki ap shashe djòb toujou mete rezime yo andedan yon katab pou kenbe li bèl pou patwon yo."
}, {
  "word": "Kategori",
  "description": "Plizyè bagay ki kapab gwoupe ansanm paske yo sanble."
}, {
  "word": "Katon",
  "description": "Yon materyèl tankou papye, men ki pi près e solid.  Gen plizyè gwosè katon."
}, {
  "word": "Katòz",
  "description": "Senkyèm nonb pozitif ki gen de shif nan li:  en (1) avèk kat (4).  14."
}, {
  "word": "Katreven",
  "description": "Katreventyèn nonb nan nonb pozitif yo.  Ven miltipliye pa kat.  Karant plis karant.  San mwens ven, soustraksyon ven nan san, e latriye.  80."
}, {
  "word": "Katreven-en",
  "description": "Katreven plis en.  San mwens diznèf, e latriye.  81."
}, {
  "word": "Katye",
  "description": "Yon ti vil ki pi piti pase yon bouk.  Yon vilaj, yon zòn nan yon vil kote, tout moun, yonn konnen lòt."
}, {
  "word": "Kavo",
  "description": "Yon ti kay nan yon simetyè kote fanmiy yon moun, leta mete yon sèkèy avèk moun nan andedan li lè moun sa a mouri."
}, {
  "word": "Kaw",
  "description": "Yon zwazo nwa ki bay yon son tankou li ap repete non li san rete.  Zwazo sa a renmen poze wo sou pye bwa, men moun kapab tande vwa li byen lwen."
}, {
  "word": "Kawòt",
  "description": "Yon plant ki pouse yon gwo rasin wouj e moun manje rasin sa a paske li gen bon gou, anpil vitamin."
}, {
  "word": "Kawotchou",
  "description": "Yon materyèl elastik ki fèt avèk gonm yon pye bwa ki grandi nan peyi sho yo.  Yon materyèl elastik ki fèt yon fason pou li kapab kole sou yon jant ki ede li kenbe van.  Lè yon kawotchou pase sou yon bagay ki pi di pase li, li pliye nan fòm bagay la pou pase sou li.  Yonn pa domaje lòt la paske kawotchou a reprann fòm li apre."
}, {
  "word": "Kay",
  "description": "Kote moun rete pou pwoteje yo kont shanjman tanperati e pou pwoteje bagay yo posede."
}, {
  "word": "Kaye",
  "description": "Yon ti liv san ekriti nan paj li yo ki fèt pou moun ekri."
}, {
  "word": "Kayèt",
  "description": "Yon moso tash ki vlope tou won e ki koud yon fason pou kenbe rapadou moun mete andedan li."
}, {
  "word": "Kayiman",
  "description": "Yon gwo bèt ki sanble avèk mabouya anpil e ki viv nan dlo.  Yon kayiman kapab pase anpil tan san fè mouvman, tankou li mouri."
}, {
  "word": "Kayimit",
  "description": "Fri yon pye bwa ki gen koulè vè lè li vèt, ki gen koulè mov lè li mi.  Fri sa gen yon gonm nan li ki kole nan boush moun ki ap manje li."
}, {
  "word": "Ke",
  "description": "Yon pwent long ki nan dèyè anpil bèt.  Yon mo moun mete nan diskou li pou mete plis aksan sou mo ki ap vini apre mo, Ke, a."
}, {
  "word": "Kè",
  "description": "Mitan nenpòt bagay tankou yon pye bwa.  Yon ògán andedan kò moun ki anba tete gosh li e ki sèvi tankou yon ti motè pou fè san sikile nan kò moun nan.  Yon pwent byen dwat, nan direksyon vètikal e nan mitan tèt yon pye palmis."
}, {
  "word": "Kèk",
  "description": "Yon pati nan yon bagay, men li pa tout kantite ki egziste nan bagay sa a.  Pati sa pa menm plis pase mwatye nan bagay sa a."
}, {
  "word": "Kèktan",
  "description": "Yon tan ki te pase depi anpil tan.  Yon bagay ki kòmanse, men ki bezwen plis tan pou li fini."
}, {
  "word": "Kenbe",
  "description": "Travay yon moun ki pase dwèt men li sou kote yon bagay, shak dwè nan yon kwen diferan, epi pese dwèt yo tankou yo ap ale kraze bagay la pou yo rankontre."
}, {
  "word": "Kenkay",
  "description": "Mashandiz yon mashann ki gen anpil ti kantite mashandiz diferan nan shak bagay li gen pou vann."
}, {
  "word": "Kenskòf",
  "description": "Yon zòn sou tèt yon mòn nan kapital Ayiti a, Pòtoprens, ki frèt anpil malgre Ayiti pa yon peyi frèt."
}, {
  "word": "Kenz",
  "description": "Sizyèm nonb pozitif ki gen de shif nan li:  en (1) avèk senk (5).  15."
}, {
  "word": "Kès",
  "description": "Yon bwat, yon tiwa kote moun mete lajan pou pran lè yo bezwen li.  Yon tiwa nan yon boutik."
}, {
  "word": "Kesyon",
  "description": "Jan yon moun mande pou sa li bezwen.  Yon entèwogasyon pou shashe yon repons."
}, {
  "word": "Kesyonè",
  "description": "Yon lis kesyon pou bay moun avèk espwa moun nan ap reponn kesyon yo."
}, {
  "word": "Kèt",
  "description": "Yon moman nan mès, sèvis yon legliz lè responsab nan legliz la ap mashe resevwa kòb nan men fidèl yo ou byen moman lè fidèl yo ap mashe ale depoze kòb nan yon baskèt. Moman lè yon moun ap mashe mande plizyè lòt moun kòb."
}, {
  "word": "Keyi",
  "description": "Rashe grenn yon pye bwa soti nan kòlèt li, nan pye bwa."
}, {
  "word": "Ki",
  "description": "Yon mo entèwogatwa moun mete devan yon lòt mo pou poze yon kesyon.  Yon mo moun itilize pou mete aksan sou mo ki vini apre a."
}, {
  "word": "Kilbite",
  "description": "Eta yon moun ki pèdi balans li pandan li ap mashe, kouri epi ki pati pou li ale tonbe.  Pouse yon moun pou li ale tonbe."
}, {
  "word": "Kilomèt",
  "description": "Yon inite pou mezire distans ki long anpil.  Yon kilomèt gen mil mèt nan li, twa-mil-de-san katreven-en pye, tran-nèf-mil twa-san-swasant-dis pous."
}, {
  "word": "Kilòt",
  "description": "Yon ti rad kout fi mete sou yo pou bare koko yo, pwèl yo, avèk de bò dèyè yo.  Gen yon kilòt ki pase nan fant dèyè fi e ki pa kouvri de bò dèyè yo."
}, {
  "word": "Kiltivatè",
  "description": "Moun ki kiltive tè."
}, {
  "word": "Kiltive",
  "description": "Sekle, plante e rekòlte an menm tan nan yon jaden.  Etap sa yo pran anpil tan pou reyalize.  Pou kiltive mayi, li kapab pran karant-senk jou.  Kann kapab pran yon ane pou pi piti.  Pye bwa kapab pran anpil ane."
}, {
  "word": "Kim",
  "description": "Ti boul dlo avèk lè andedan yo kèk likid fè lè yo boulvèse anpil.  Bav ki soti nan boush kèk moun, bèt.  Rezilta pat yon moun ap fwote nan boush li avèk yon bwòs."
}, {
  "word": "Kimen",
  "description": "Travay yon bagay ki fè kim."
}, {
  "word": "Kisa",
  "description": "Yon mo entèwogatwa moun itilize pou idantifye yon bagay nan yon gwoup lè moun konnen li pa ap shashe idantifye yon lòt moun.  Yon mo moun itilize pou ranplase yon lòt mo."
}, {
  "word": "Kite",
  "description": "Vire do bay yon bagay epi ale.  Yon mo moun itilize pou mande yon moun pou vire do bay li.  Sispann.  Pati, ale lwen yon moun, yon bagay."
}, {
  "word": "Kiyès",
  "description": "Yon mo entèwogatwa moun mete devan yon mo pou idantifye yon moun, yon bagay nan yon gwoup.  Moun toujou itilize kiyès lè yo konnen yo ap shashe idantifye yon moun nan yon gwoup moun.  Yon fanmiy mo, Ki, pou idantifye yon bagay nan yon gwoup."
}, {
  "word": "Kizin",
  "description": "Yon shanm nan yon kay kote kizinyè fè manje.  Shanm sa gen tout sa ki gen rapò avèk fè manje nan li tankou yon fou, shodyè, asyèt e latriye.  Nan ti vil yo, yon ti kay ki gen yonn ou byen plizyè shanm kote kizinyè fè manje.  Ti kay sa gen yon resho, yonn ou plizyè twa-pye-dife e plizyè lòt bagay ki gen rapò avèk manje, fè manje."
}, {
  "word": "Klaksonn",
  "description": "Yon ti aparèy ki andedan yon mashin e shofè a gen yon bouton li kapab peze pou fè li fè bri lè li bezwen evite yon danje."
}, {
  "word": "Klaksonnen",
  "description": "Fè yon bri avèk yon klaksonn."
}, {
  "word": "Klasik",
  "description": "Bagay ki gen rapò avèk klas, wotè moun ki pase lekòl okipe nan yon sosyete.  Yon epòk nan tan lontan lè te gen anpil règleman yon ekriven te oblije obeyi pou yo ekri yon tèks."
}, {
  "word": "Klate",
  "description": "Eta yon bagay ki klè.  Travay limyè fè sou fènwa, lannwit."
}, {
  "word": "Klavye",
  "description": "Yonn nan senk pati yon òdinatè ki gen anpil bouton ki reprezante lòd yon operatè kapab pase yon òdinatè.  Tout lèt alfabetik yo, shif yo soti nan zewo pou rive nan dis avèk tout siy ponktiyasyon yo."
}, {
  "word": "Kle",
  "description": "Yon moso materyèl ki gen menm fòm avèk yon tou kote li kapab rantre pou pouse ou byen rale lang sekirite yon pòt."
}, {
  "word": "Klere",
  "description": "Eta yon bagay ki anvayi avèk limyè.  Travay yon bagay ki anvayi yon lòt bagay avèk limyè.  Eta yon anpoul ki gen kouran ap pase nan li."
}, {
  "word": "Kleren",
  "description": "Yon bwason koulè gri ki gen anpil alkòl nan li.  Kann se yonn nan pi gwo kontitisyon kleren.  Genyen anpil kote nan peyi Ayiti ki fè kleren.  Anpil moun nan peyi a renmen bwè bwason sa tou e li fè yo sou tou."
}, {
  "word": "Klè",
  "description": "Yon bagay ki pa gen pyès malpwoprete, anjénman nan li.  Eta yon bagay ki gen klate.   Eta yon nwit ki gen lalin ap klere. "
}, {
  "word": "Klewon",
  "description": "Yon enstriman misikal ki bay son lè yon kantite van yon moun ap kontwole avèk boush li pase andedan enstriman sa a.  Yon klewon gen twa bouton ki sèvi pou shanje nòt mizikal yo:  do, re, mi, fa, sòl, la, si."
}, {
  "word": "Kò",
  "description": "Pati enpòtan nan yon bagay.  Yon pati ou byen tout pati ki rantre nan konstitisyon yon bagay, yon èt vivan."
}, {
  "word": "Kòb",
  "description": "Lajan.  Lò, lajan e anpil lòt metal leta prepare yon fason moun nan yon peyi, yon sosyete kapab ashte, shanje li pou bagay yo bezwen.  Nenpòt moso papye leta yon peyi mete an sikilasyon pou moun shanje kont sa yo bezwen."
}, {
  "word": "Kòd",
  "description": "Plizyè bout nan yon bagay ki vlope ansanm yon fason shak fwa dènye bout la te ap ale fini yon lòt pwent te gentan kòmanse vlope.  Lè pa gen lòt bout ki ogmante sou dènye bout la, kòd la fini, rive nan bout li."
}, {
  "word": "Kòk",
  "description": "Yon bèl zwazo, mal nan fanmiy li e ayisyen itilize li nan gagè pou fè de nan yo batay.  Lè de kòk ap batay nan gagè, gason ayisyen parye sou kòk yo panse ki ap genyen batay la."
}, {
  "word": "Koke",
  "description": "Aksyon yon kòk ki monte sou do yon poul pou rantre zozo li andedan koko,dèyè,  poul la.  Aksyon nenpòt mal èt vivan ki mete zozo li andedan koko yon femèl.  Pandye yon bagay, pou moun nan Depatman Latibonit la."
}, {
  "word": "Koken",
  "description": "Eta yon moun ki kapab kashe nenpòt sa li pa vle lòt moun konnen.  Eta moun ki montre yon ekspresyon sou vizaj li pou fè moun kwè pawòl ki ap soti nan boush li menmsi pawòl sa yo pa vrè."
}, {
  "word": "Kokennshenn",
  "description": "Anpil nan yon bagay.  Abondans.  Anpil."
}, {
  "word": "Kokèt",
  "description": "Eta yon fi ki toujou fè gason panse li renmen yo e moun kwè li ap koushe avèk anpil gason san li pa janm koushe avèk anpil gason tout bon vre."
}, {
  "word": "Kokoye",
  "description": "Grenn yon pye bwa ki sanble avèk pye palmis.  Kokoye gen yon bon dlo andedan li avèk yon pati blan ki gen anpil grès nan li.  Ayisyen prepare anpil manje avèk kokoye tankou dous, labouyi, e latriye."
}, {
  "word": "Kòlèt",
  "description": "Pati nan yon shemiz ki kouwonnen kou yon moun.  Yon fil ki kenbe yon grenn pou li kapab pandye nan yon pye bwa. Gwo Kòlèt, Moun ki vle montre li gen fòs pou konbat nenpòt lòt moun.  Moun ki pa janm vle obeyi lòd, lòt moun."
}, {
  "word": "Kolizyon",
  "description": "Eta de bagay fas yo tou de a frape nan yon aksidan."
}, {
  "word": "Kolon",
  "description": "Mèt esklav nan ansyen koloni yo.  Blan ki te mèt esklav yo lè Ayiti te yon koloni, anvan ane 1804."
}, {
  "word": "Kolonèl",
  "description": "Yon grad nan tout kò militè ki bay moun anpil pouvwa sou lòt militè tankou kòmandan, sèjan, kaporal, e latriye ki anba li."
}, {
  "word": "Koloni",
  "description": "Yon peyi ki sou depandans yon lòt peyi.  Tout lwa koloni a  se lwa ki soti nan lòt peyi a e koloni a peye lòt peyi a enpo.  Pandan evolisyon tout sosyete nan lemond, lòt dominasyon tankou kapitalis, sosyalis te vini ranplase koloni; kidonk pa gen koloni konsa ankò.  Anpil moun, bèt ki reyini ansanm."
}, {
  "word": "Kolonize",
  "description": "Pran yon peyi epi fè li vini yon koloni."
}, {
  "word": "Kòmand",
  "description": "Lòd yon kòmandè pase lòt moun.  Di lòt moun kisa yo dwe fè."
}, {
  "word": "Kòmandan",
  "description": "Moun ki ap kòmande lòt moun.  Yon grad nan kò militè, ki anba kolonèl, men ki anwo sèjan, kaporal e latriye."
}, {
  "word": "Kòmande",
  "description": "Aksyon yon kòmandan lè li ap ekzèse pouvwa li sou moun ki anba li.  Aksyon nenpòt moun ki ap pase lòd.  Mete moun sou wout dwa lè yo pèdi."
}, {
  "word": "Komandè",
  "description": "Moun ki gen pouvwa e ki ap kòmande."
}, {
  "word": "Komè",
  "description": "Yon fi ki batize maryaj de moun, pitit de moun avèk yon lòt moun.  Yon fason ayisyen rele vwazin yo."
}, {
  "word": "Komedyen",
  "description": "Yon moun ki fè moun ki ap koute li ri avèk nenpòt pawòl li di.  Pwofesyonèl ki konnen kijan pou li fè yon odyans ri."
}, {
  "word": "Komès",
  "description": "Shanjman mashandiz avèk moun pou lajan lè shanjman sa a bay yon pwofi."
}, {
  "word": "Komèsan",
  "description": "Yon pwofesyonèl ki fè lajan li nan fè komès."
}, {
  "word": "Komèsyal",
  "description": "Nenpòt bagay ki gen rapò avèk komès.  Eta yon bagay ki kapab vann pou lajan e ashtè anvi peye lajan pou li."
}, {
  "word": "Komik",
  "description": "Kalite yon bagay, yon moun ki fè moun ri.  Kalite yon istwa, travay yon komedyen ki fè moun ri."
}, {
  "word": "Kominikasyon",
  "description": "Shanjman pawòl, jès ant de ou byen plis èt vivan lè yonn konprann lòt la.  Mwayen moun itilize pou yo fè yon mesaj rive jwenn yon lòt moun.  Gen anpil mwayen kominikasyon tankou ekri, pale, telefòn, radyo, entènèt, telegraf, satelit, e latriye."
}, {
  "word": "Kominote",
  "description": "Yon ti gwoup moun, yon gwoup moun ki ap viv menm kote."
}, {
  "word": "Kominotè",
  "description": "Nenpòt bagay ki gen rapò avèk yon kominote.  Moun ki manb nan yon kominote."
}, {
  "word": "Kominyon",
  "description": "Yon angajman yon moun pran pou li respekte prensip yon gwoup li te kòmanse sib.  Angajman yon moun pran nan legliz katolik pou li kontinye sib Bondye san li pa retounen nan peshe, vye lavi li te konnen ap viv anvan li te rantre nan kominyon."
}, {
  "word": "Komisyon",
  "description": "Mesaj, bagay yon moun aksepte pran nan men yon moun pou pote bay yon lòt moun.  Plizyè moun yon gwoup moun bay tout dwa pou ranplase yo nenpòt kote yo te kapab ranplase pwòp tèt pa yo."
}, {
  "word": "Kòn",
  "description": "Yon zo ki soti nan tèt kèk bèt ki itilize li pou defann yo kont lòt bèt, kont moun."
}, {
  "word": "Konbatan",
  "description": "Moun ki ap konbat.  Moun ki te patisipe nan lagè ou byen ki ap patisipe nan lagè.  Moun ki pa janm dekouraje defann dwa li avèk dwa lòt moun nan yon sosyete kote gen enjistis."
}, {
  "word": "Konbit",
  "description": "Kòve.  Yon seremoni kote anpil peyisan rankontre ansanm pou fè yon travay pou yon moun, yon zanmi nan kominote kote yo ap viv la san yo pa toushe lajan pou travay sa a.  Tout moun nan konbit la espere lè yo gen konbit pa yo tou moun yo te ede a ap vini ede yo."
}, {
  "word": "Kondi",
  "description": "Mennen yon bagay, yon moun nan yon direksyon epi ede moun nan, bagay la rete sou bon direksyon an.  Kenbe volan yon mashin pandan motè li ap mashe e wou li ap woule sou tè a.  Kenbe men yon avèg pou mennen li kote li ap ale."
}, {
  "word": "Kondisyon",
  "description": "Rezon ki fè yon bagay egziste.  Yon rezon ki anpeshe yon prensip, yon règ rete jeneral, inivèsèl.  Eksepsyon."
}, {
  "word": "Konesans",
  "description": "Sa ki rete nan tèt yon moun lè li fini bliye tout sa li te aprann.  Nivo ki pi wo nan devlopman entelijans moun.  Premye rankont de, plizyè moun."
}, {
  "word": "Konfiti",
  "description": "Poud kèk materyèl ki bay yon limyè menm koulè yo ye a lè gen limyè ki ap klere yo.  Moun itilize poud sa pou voye sou lòt moun nan kèk seremoni tankou maryaj, gradyasyon e latriye.  Yon desè moun prepare avèk anpil fri tankou anana, gwayav, grenadin, zoranj-sirèt, e latriye.  Lè konfiti melanje avèk manba sou pen, kasav, li kapab ranplase yon repa nan yon jounen."
}, {
  "word": "Konfrefò",
  "description": "Kote moun sere lajan.  Yon bwat ki fèt avèk metal ki lou anpil pou fè li difisil pou moun pote li e moun kapab sere lajan andedan li.  Yon konfrefò pa gen kle, men li gen yon mo sekrè ki pèmèt moun ouvri pòt li.  Anpil moun ki pa vle moun konnen konbyen kòb yo posede toujou gen yon konfrefò andedan kay yo pou mete lajan."
}, {
  "word": "Konfwonte",
  "description": "Kanpe an fas yon moun pou repwoshe li pou sa li fè mal.  Mashe nan direksyon yon moun avèk entansyon pou goumen avèk li."
}, {
  "word": "Konfyans",
  "description": "Kwayans yon moun gen nan yon lòt moun, nan Bondye ki fè li kapab di moun nan, Bondye tout sekrè li."
}, {
  "word": "Konfye",
  "description": "Viv avèk yon moun e san kenbe sekrè pou moun sa a.  Di yon moun, Bondye tout bagay, tout sekrè. "
}, {
  "word": "Kongo",
  "description": "Yon peyi nan kontinan afriken an kote anpil esklav ki te soti pou vini nan koloni yo.  Peyi sa a sitiye nan mitan kontinan an.  Moun ki soti andeyò, mòn yon peyi epi ki vini viv nan yon gwo vil."
}, {
  "word": "Konje",
  "description": "Sispann travay pou yon kantite tan avèk garanti djòb la ap toujou la ap tann travayè a retounen."
}, {
  "word": "Konkèt",
  "description": "Travay ansyen gèrye yo ki te konnen mashe pran peyi nan men moun ki ap viv nan peyi sa yo epi kolonize peyi a."
}, {
  "word": "Konkete",
  "description": "Mashe pran peyi yonn apre lòt pou mete anba lwa, sou depandans yon lòt peyi."
}, {
  "word": "Konklizyon",
  "description": "Pati nan yon istwa ki bay yon resime de tout sa ki te di nan istwa a.  Moun ki li yon konklizyon prèske konnen tout sa ki te pase nan istwa a, men yon moun ki bezwen konnen tout istwa a oblije li devlopman an.  Yonn nan twa pati yon istwa, yon redaksyon, yon disètasyon."
}, {
  "word": "Konkou",
  "description": "Yon seremoni kote plizyè moun ap eseye montre yo kapab fè yon bagay pi byen, kijan yo kapab fè yon bagay epi plizyè jij ap evalye patisipan yo."
}, {
  "word": "Konnen",
  "description": "Egzistans yon lyen ant de ou byen plizyè moun.  Yon moun ki konprann tout sa yon moun di, tout sa moun nan fè.  Konprann yon bagay nèt ale.  Posede yon konesans san limit sou yon bagay, yon moun."
}, {
  "word": "Konpakdis",
  "description": "Yon moso plastik plat e tou won ki gen mizik  anrejistre sou li.   Lè konpakdis apèn parèt li te vini shanje jan moun koute mizik.  Mizik te konnen anrejistre sou plak e kòm son konpakdis la pi bon nan zòrèy, moun sispann ashte plak jis izin sispann fè plak."
}, {
  "word": "Konpanyen",
  "description": "Yon moun, yon bèt ki akonpaye yon moun pou rete, ale yon kote."
}, {
  "word": "Konpatriyòt",
  "description": "Yon moun ki soti nan menm peyi avèk yon lòt moun e ki toujou toupre pou defann peyi li."
}, {
  "word": "Konpè",
  "description": "Yon gason ki batize yon maryaj, yon pitit de lòt moun.  Yon gason ki ap viv sou kote kay yon lòt moun."
}, {
  "word": "Konpliman",
  "description": "Ankourajman yon moun jwenn pou yon aksyon li komèt.  Fè yon moun konnen li byen abiye, li bèl."
}, {
  "word": "Konplo",
  "description": "Antann avèk lòt moun pou asasinen, bat yon moun.   Ranje avèk lòt moun pou viktim yon moun."
}, {
  "word": "Konprann",
  "description": "Abilite pou rekonèt, entèprete yon bagay, moun ou byen aksyon moun.  Rekonèt.  Entèprete."
}, {
  "word": "Konsa",
  "description": "Yon fason pou moun di:  tankou sa a, menm jan avèk sa a.  Lè yon moun di konsa, li lonje men li sou yon bagay pou montre yon moun yon bagay."
}, {
  "word": "Konsè",
  "description": "Yon represantasyon mizikal ki kapab genyen yonn ou byen plizyè pèfòmè, atis."
}, {
  "word": "Konsepsyon",
  "description": "Definisyon yon moun bay yon bagay.  Jan yon moun konprann yon bagay."
}, {
  "word": "Konsève",
  "description": "Sere yon bagay pou jwenn li lè gen bezwen pou li.  Enrejistre yon dokiman sou yon diskèt nan yon òdinatè."
}, {
  "word": "Konsèy",
  "description": "Pawòl yon moun di yon lòt moun pou montre moun nan kisa ki pi bon pou li kapab fè.  Moun nan pa oblije aksepte konsèy la, men moun ki nayif pran tout konsèy yon moun pou yon lòd."
}, {
  "word": "Konseye",
  "description": "Pale avèk yon moun pou montre li sa ki pi bon pou li kapab fè.  Bay yon moun konsèy."
}, {
  "word": "Konsolasyon",
  "description": "Aksyon yon moun ki ap pale avèk yon lòt ki gen lapenn pou bay moun nan kouraj."
}, {
  "word": "Konstitisyon",
  "description": "Manman tout lwa nan yon peyi.  Tout bagay ki kontribye pou fè yon bagay sa li ye a.  Tout sa ki fòme yon bagay.  Dezyèm etap nan kontriksyon yon peyi sou kote drapo peyi a."
}, {
  "word": "Konstriksyon",
  "description": "Tout etap yon konstriktè pase pou li konstwi yon bagay tankou yon kay, yon bato.  Yon kay.  Yon bato."
}, {
  "word": "Konstriktè",
  "description": "Moun ki konnen ranje plizyè moso ansanm pou reyalize yon imaj nenpòt moun kapab konprann.  Moun ki fè bagay tankou kay, bato, e latriye."
}, {
  "word": "Konstwi",
  "description": "Ranje plizyè moso ansanm pou reyalize yon imaj nenpòt moun kapab gade e rekonèt kisa li ye.  Moun ki ap fè bagay tankou kay, bato, e latriye."
}, {
  "word": "Konsyans",
  "description": "Yon jij andedan tout moun ki fè moun nan santi li byen lè li fè yon bon bagay e ki fè moun nan santi li mal lè li fè yon move bagay.  Konesans sou ki byen avèk sa ki mal."
}, {
  "word": "Konsyantizasyon",
  "description": "Yon gwo mouvman edikasyon ki te kòmanse nan ane katreven yo nan peyi Ayiti pou fè ayisyen konprann kijan sistèm gouvènman peyi a move pou yo.  Mouvman sa a grandi tèlman rapid li kontribye a kraze govènman peyi a nan epòk sa.  Edike moun pou fè yo konprann lavi e rekonèt reyalite avèk ilizyon."
}, {
  "word": "Kont",
  "description": "Nan yon pozisyon opoze a pozisyon yon lòt. Yon bagay ki pa twò piti e ki pa twò gwo.  Egzateman kantite nesesè a.  Yon lis debi avèk kredi pou montre sa ki soti e sa ki rantre nan yon konfrefò."
}, {
  "word": "Kontab",
  "description": "Yon moun ki etidye syans kontablite a e ki pwatike kijan pou kenbe egzamine kont.  Anpil moun panse kontab se yon moun ki manyen lajan, men sa pa vrè.  Yon kontab fèt pou gen tout mwayen disponib pou esplike ki kòb ki rantre e ki lajan ki depanse menmsi li pa janm rankontre avèk kòb."
}, {
  "word": "Kontablite",
  "description": "Teori e sistèm ki montre kijan pou ranje kont nan kòmansman yon biznis, kenbe kont yo, envestige kont yo epi rapòte sou yo."
}, {
  "word": "Kontan",
  "description": "Ekspresyon satisfaksyon andedan yon moun ki parèt sou vizaj moun nan lè li ri."
}, {
  "word": "Kontante",
  "description": " Shashe yon mwayen pou satisfè menmsi bagay ki pou bay satisfaksyon an pa vini."
}, {
  "word": "Kontantman",
  "description": "Ekspresyon vizaj yon moun ki satisfè."
}, {
  "word": "Konte",
  "description": "Mete anpil espwa sou yon bagay, yon moun.  Soti nan yon nonb pi piti pou ale nan yon nonb pi wo. "
}, {
  "word": "Kontè",
  "description": "Moun ki konnen konte.  Aparèy ki kontwole yon kantite bagay ki ap pase tankou dlo, tan, kouran."
}, {
  "word": "Kontinan",
  "description": "Senk pati yo ki divize tout tè a:  Ewòp, Azi, Afrik, Amerik, Oseyanik."
}, {
  "word": "Kontinye",
  "description": "Ale san kanpe nan wout avèk yon bagay ki te kòmanse."
}, {
  "word": "Kontra",
  "description": "Yon moso papye lalwa pèmèt de moun ou byen plis moun siyen pou yo respekte tout sa ki ekri sou papye a.  Yon angajman de ou byen plizyè moun pran ansanm."
}, {
  "word": "Kontraksyon",
  "description": "Yon fòs yon ti bebe ki andedan vant yon manman fè manman santi lè li bezwen soti e sa fè manman an konnen li ap ale akoushe.  Yon moman kote yon bagay ap shashe wout pou soti epi yon lòt ap anpeshe li soti; konsa yo bay kò yo ap aji sou li a yon doulè."
}, {
  "word": "Kontrakte",
  "description": "Siyen yon kontra avèk yonn ou byen plizyè moun.  Travay yon ti bebe ki fè yon manman santi li lè pou li akoushe."
}, {
  "word": "Kontraktè",
  "description": "Moun ki siyen yon kontra.  Yon ti bebe ki vle soti andedan vant yon manman."
}, {
  "word": "Kontre",
  "description": "Pase sou wout yon lòt moun te ap pase, men de moun yo te ap ale nan direksyon opoze."
}, {
  "word": "Kontrè",
  "description": "Bagay siyfikasyon yo opose tankou nò avèk sid, dous avèk anmè."
}, {
  "word": "Kontrekare",
  "description": "Kanpe an fas yon moun pou fè li konprann yon bagay li te fè pate bon pou wè si moun nan te kapab evite fè bagay sa a yon lòt fwa.  Yon moun ki kontrekare yon moun kapab rankontre yon reyaksyon vyolan nan men lòt moun nan."
}, {
  "word": "Kontribisyon",
  "description": "Aksyon moun ki mete yon pati nan yon bagay anpil lòt moun, yo shak, ap mete yon pati tou.  Patisipasyon nan yon bagay pou fè li vini konplè.  Yon biwo leta ki kolekte enpo tout sitwayen avèk biznis nan peyi a peye."
}, {
  "word": "Kontribye",
  "description": "Bay patisipasyon nan yon bagay pou fè li vini konplè.  Mete yon pati nan yon bagay anpil lòt moun ap mete pa yo nan li tou."
}, {
  "word": "Kontwòl",
  "description": "Pouvwa yon moun gen pou kontwole, pou aplike lwa.  Yon òdinatè ki ap kòmande yo lòt mashin."
}, {
  "word": "Kontwole",
  "description": "Fè respekte, aplike lwa.  Pase lòd a tout moun ki anba kontwòl."
}, {
  "word": "Kontwolè",
  "description": "Moun ki gen kontwòl nan men li pou fè respekte, aplike lwa."
}, {
  "word": "Konvansyon",
  "description": "Yon antant ant tout syantis pou ede yo jwenn solisyon yon pwoblèm.  Yon moman kote anpil moun ki gen konesans nan yon bagay rankontre pou jwenn solisyon yon pwoblèm pandan yon ap koute opinyon shak moun ki pale."
}, {
  "word": "Konyen",
  "description": "Travay yon gason, yon mal bèt ki rantre zozo li nan koko yon fi, yon femèl avèk anpil fòs."
}, {
  "word": "Kopye",
  "description": "Kreye imaj yon bagay yon fason pou li difisil pou moun konnen kiyès ki orijinal la e kiyès ki kopi a.  Gade jan yon moun fè yon bagay pou fè bagay la menm jan tou."
}, {
  "word": "Koresponn",
  "description": "Konparezon ant de fòs pou wè kiyès ki pi fò. Aksyon yon moun ki reponn atak yon lòt."
}, {
  "word": "Koridò",
  "description": "Yon ti wout ki jennen anpil kote plis pase yon moun pa kapab pase yonn sou kote lòt la."
}, {
  "word": "Koshon",
  "description": "Yon bèt ki gen boush long e ki gen anpil grès nan kò li.  Ayisyen fè yon manje ki rele griyo avèk vyann koshon."
}, {
  "word": "Kòt",
  "description": "Plizyè zo nan kò tout vètebre ki fòme do yo epi ki antoure kè yo.  Se zo sa yo moun toushe lè yo manyen anba tete yo."
}, {
  "word": "Kote",
  "description": "Yon plas pou jwenn yon bagay.  Yon kwen."
}, {
  "word": "Kotri",
  "description": "Yon fi ki aksepte plase avèk mari yon lòt fi."
}, {
  "word": "Kou",
  "description": "Pati ki lye tèt yon moun avèk epòl moun nan.  Frape yon bagay sou yon lòt bagay."
}, {
  "word": "Koubèland",
  "description": "Yon magouy kèk moun fè pou rantre kouran andedan kay yo san peye pou li.  Yon moso bagay ki fèt avèk menm materyèl avèk kawotchou."
}, {
  "word": "Koud",
  "description": "Kole plizyè moso twal ansanm avèk fil ki pase andedan moso twal yo avèk yon egiy."
}, {
  "word": "Koudeta",
  "description": "Aksyon kèk moun nan yon peyi ki touye prezidan peyi ou byen mete li nan avyon epi voye li ale nan yon lòt peyi pou yo pran plas prezidan an.  Kèk lè sivil konnen pran pouvwa prezidan an tou, men se militè ki gen plis mwayen pou bay koudeta.  Nan moman yon koudeta moun nan peyi a pa konnen ki moun ki ap gouvène anvan nouvo prezidan an pale avèk pèp la.  Detoúnman politik yon peyi."
}, {
  "word": "Koukouy",
  "description": "Yon ti ensèk ki kapab vole e ki gen limyè limen nan dèyè li lè li fè nwa."
}, {
  "word": "Koule",
  "description": "Travay yon moun ki rantre nan dlo san kite pyès pati nan kò li deyò.  Eta yon resipyan ki gen yon tou nan li ki anpeshe li kenbe likid san likid la pa tonbe."
}, {
  "word": "Koulè",
  "description": "Limyè shak kò voye nan je moun ki ap gade li."
}, {
  "word": "Koulèv",
  "description": "Yon bèt long, kò glise e ki mashe pandan li ap trennen sou vant li.  Gen  plizyè diferan koulèv.  Gen koulèv ki kapab peze 400 liv."
}, {
  "word": "Kounouk",
  "description": " Yon ti kay moun ranje kò yo malman pou viv andedan."
}, {
  "word": "Koupe",
  "description": "Rantre zozo (yon gason) nan koko (yon fi).  Frape yon bagay file tankou yon manshèt sou yon lòt bagay pou jis li kase an de moso.  Kopye tèks sou yon òdinatè soti nan yon dokiman pou ale nan yon lòt e nan menm moman sa a efase dokiman an kote li te soti a.  Anpeshe yon moun fini yon pawòl li te kòmanse epi foure yon lide diferan nan konvèsasyon an."
}, {
  "word": "Koupè",
  "description": "Moun ki konnen koupe bagay, fi."
}, {
  "word": "Kouran",
  "description": "Mouvman elektrisite ki ap pase nan fil kouran.  Yon bransh likid ki ap soti sou yon nivo ki pi wo pou tonbe nan yon nivo pi ba avèk vitès.  Yon bagay ki ap pase nan yon konnye a, nan epòk sa, ane sa, moman sa."
}, {
  "word": "Kouri",
  "description": "Travay yon moun ki leve shak pye li epi mete yo atè byen vit pou avanse soti yon kote pou rive yon lòt kote byen vit."
}, {
  "word": "Kous",
  "description": "Aksyon de moun, de bèt ou byen plizyè ki ap kouri pou wè kiyès ki ap rive yon kote anvan."
}, {
  "word": "Koush",
  "description": "Anpil nan yon bagay ki parèt san moun pate ap espere li.  Kantite kras ki sou kò yon moun."
}, {
  "word": "Koushe",
  "description": "Pran yon pozisyon vètikal tankou yon matla sou yon kabann.   Koushe fi, Mete yon fi sou kabann epi rantre zozo andedan koko li.  Eta solèy lè li sispann klere tè a."
}, {
  "word": "Koushè",
  "description": "Moun ki mete moun koushe.  Yon gason ki mete yon fi koushe epi mete zozo li andedan koko fi a."
}, {
  "word": "Koushèt",
  "description": "Yon moso twal moun mete nan fant janb yo pou pare likid tankou pipi, poupou.  Yon moso twal pou mete nan fant janb ti bebe paske ti bebe pa kapab kenbe pipi avèk poupou pou lage yo lè li vle."
}, {
  "word": "Kout",
  "description": "Pase dwa bay yon moun pou li kontinye yon bagay.  Yon moun ki pa gen wotè nòmal yon moun genyen.  Yon moun ki gen mwens ke senk pye pou wotè."
}, {
  "word": "Koute",
  "description": "Tande yon bagay, yon moun ki ap pale epi bay moun sa a anpil atansyon pou konprann sa li ap di a."
}, {
  "word": "Kouti",
  "description": "Yon pati nan yon bagay ki koud.  Travay yon koutiryè, yon tayè lè li kole de moso twal ansanm."
}, {
  "word": "Koutim",
  "description": "Bagay yon moun toujou fè e refè shak fwa li gen shans pou fè li.  Abitit yon moun genyen.  Yon evènman yon sosyete fete shak ane."
}, {
  "word": "Koutiryè",
  "description": "Yon pwofesyonèl fi ki fè rad pou moun mete.  Koutiryè pi alèz nan fè rad pou fi, men gen kèk koutiryè ki fè rad pou gason tou."
}, {
  "word": "Koutize",
  "description": "Aksyon yon gason ki ap pale avèk yon fi pou wè si fi a ap aksepte renmen avèk li."
}, {
  "word": "Kouto",
  "description": "Yon moso metal ki gen yon mansh bwa ou byen plastik epi yon bò nan kò li plati yon fason lè li toushe yon lòt bagay li ap kapab rantre andedan bagay la, li ap kapab koupe bagay la."
}, {
  "word": "Koutye",
  "description": "Yon moun ki konnen kèk pwopriyetè kay ki gen kay pou lwe e ki konnen kèk lokatè tou ki ap shashe kay pou lwe epi li ede yon rankontre pou yo fè biznis.  Yon pwofesyonèl ki patisipe nan ranje biznis pou moun e ki toushe pou sèvi li."
}, {
  "word": "Kouve",
  "description": "Aksyon anpil femèl zwazo ki kapab koushe sou ze li pandan anpil jou pou shak ze rive bay yon ti zwazo.  Lè yon femèl zwazo ap kouve, li leve sou ze yo sèlman pou ale shashe manje."
}, {
  "word": "Kouvreli",
  "description": "Yon ti dra mens moun mete sou kabann nan peyi twopikal yo.  Yo itilize kouvreli tou pou kouvri paske li pa fè fredi nan peyi sa yo."
}, {
  "word": "Kouvri",
  "description": "Mete yon bagay laj sou yon lòt epi bagay laj la anpeshe li rete vizib.  Boushe yon tou."
}, {
  "word": "Kouwòn",
  "description": "Yon siy pou montre grandè yon moun tankou yon wa, yon rèn.  Flè ki ranje an won pou mete sou kavo, tonm kadav."
}, {
  "word": "Kouwonnen",
  "description": "Fè wonn yon bagay.  Mete, aliye yon bagay sou tout kwen yon lòt bagay.  Antoure yon bagay.  Mete kouwòn sou yon bagay, tèt yon moun."
}, {
  "word": "Kouzen",
  "description": "Pitit gason yon sè ou byen yon frè papa ou byen manman yon lòt moun."
}, {
  "word": "Kouzin",
  "description": "Pitit fi yon sè ou byen yon frè papa ou byen manman yon lòt moun."
}, {
  "word": "Kouvè",
  "description": "Asyèt ki ranje sou tab avèk foushèt, kouto, kiyè sou kote li pou moun kapab manje yon repa."
}, {
  "word": "Kòve",
  "description": "Travay kolon yo te konnen fè esklav yo fè nan tan koloni yo.  Konbit.  Travay san toushe pou travay ki fèt la.  Refè yon travay plizyè fwa san yon bon rezon pou refè."
}, {
  "word": "Koyo",
  "description": "Yon gason ki pa devlope seksyèlman, kont pou konprann lè yon fi vle fè lanmou avèk li.  Gason sa a pèdi anpil tan li pate ap janm bezwen pèdi pou koutize fi a si li te konprann fi.  Tan yon koyo pran pou li koutize yon fi fè fi a deja konprann li ap ale oblije montre gason sa a sa pou li fè anvan li jwenn sa li vle a; konsa li meprize avans yo lè yo vini."
}, {
  "word": "Koze",
  "description": "Pale avèk yon zanmi de plizyè bagay ki pase san rete sou yon sèl sijè.  Konvèsasyon abityèl ant plizyè zanmi shak fwa yo rankontre.  Pale avèk yon zanmi de yon bon ou byen yon move eksperyans.  Travay de moun ki ap pale."
}, {
  "word": "Kòzè",
  "description": "Moun ki konnen, ki renmen koze.  Gran Kòzè, Moun ki renmen koze anpil.  Yon gran kozè mete plis manti nan koze li pase verite pou li montre yon moun li konnen plis bagay pase lòt moun ki di yo konnen anpil bagay."
}, {
  "word": "Krab",
  "description": "Yon bèt ki rete nan yon tou kote ki gen dlo.  Li gen de kwòk dan ki sanble avèk de pye devan, men dan yo pa janm toushe a tè.  Dèyè shak de pye yo yon krab gen twa pye sou shak bò.  Pou peshè kenbe krab yo oblije foure men yo nan tou a.  Krab konnen mòde peshè yo.  Krab bay legim avèk bouyon bon gou."
}, {
  "word": "Krabye",
  "description": "Yon zwazo ki gen koulè blan, pye fen e ki renmen rete bò larivyè pou manje ti pwason e bò sheval avèk bèf pou manje vè sou kò yo."
}, {
  "word": "Krabinay",
  "description": "Anpil ti moso bagay tankou bwa, fèy, twal, zo, e latriye lavalas pote ale depoze nan yon kwen."
}, {
  "word": "Krabinen",
  "description": "Mete yon bagay, yon moun nan menm sitiyasyon avèk krabinay.   Lè yon moun fè yon gwo aksidan, li kapab krabinen."
}, {
  "word": "Krapo",
  "description": "Yon bèt ki renmen viv nan imidite, kote ki mouye, kote ki gen dlo.  Bèt sa kapab viv lontan kote ki pa gen imidite tou.  Gen krapo ki viv nan dlo e yo manje ti pwason avèk ti koulèv.  Sa ki viv sou tè yo manje ti ensèk."
}, {
  "word": "Kras",
  "description": "Pousyè ki poze sou yon kò epi ki kole sou kò sa a tankou li kontribye nan konstitisyon kò a.  Kras kapab shanje koulè yon lòt bagay.  Kras sou kò moun sanble avèk yon tash nwa.  Ti Kras, Yon ti pati nan yon bagay."
}, {
  "word": "Kraze",
  "description": "Monte sou yon bagay epi fè li pèdi fòm orijinal li te genyen an.  Sa depan de materyèl ki antre nan konstitisyon yon bagay, lè li kraze, moso yo kapab separe ou byen rete ansanm.  Mete yon bagay lou sou yon bagay ki pi fay."
}, {
  "word": "Krazè",
  "description": "Yon bagay pi lou ki okipe plas sou yon lòt bagay fay.  Lide, nan tèt moun, ki fè yo panse fi toujou anba gason lè yo koushe sou kabann."
}, {
  "word": "Krèm",
  "description": "Kèk medikaman mou pwodiktè yo mete nan yon bwat mou pou moun kapab peze bwat la lè yo bezwen yon ti kras nan medikaman an soti nan bwat la.  Yon desè ki fèt avèk lèt e plizyè fri.  Kim ki soti nan anpil  pati nan kò tankou boush moun ki pale anpil."
}, {
  "word": "Krèt",
  "description": "Yon pwent ki monte dwat anlè.  Yon do mòn gèrye itilize pou yo kapab wè énmi ki ap pwoshe sou yo.  Yon ti pwent ki sanble avèk yon ti do mòn sou anlè ouvèti koko yon femèl, yon fi."
}, {
  "word": "Kreten",
  "description": "Moun ki pa vle fè egzèsis ki ap ede yo devlope entelijans yo."
}, {
  "word": "Kretyen",
  "description": "Moun.  Tout moun nan yon sosyete.  Tout èt vivan ki gen entelijans, ki kapab devlope entelijans li e ki kapab refleshi.  Moun ki sib tout prensip Jesi Kris yo."
}, {
  "word": "Kreve",
  "description": "Rantre pwent yon bagay nan yon kò.  Fouye yon tou nan yon bagay ki te fèt pou rete san tou sa a.  Fòse zozo yon gason rantre nan koko yon femèl pou premye fwa nan lavi femèl la.  Shire."
}, {
  "word": "Krevè",
  "description": "Moun ki kreve yon femèl, yon bagay."
}, {
  "word": "Kreyatè",
  "description": "Moun ki kreye yon bagay, Bondye."
}, {
  "word": "Kreyati",
  "description": "Tout bagay Bondye, moun kreye."
}, {
  "word": "Kreye",
  "description": "Fè yon bagay vini egziste pou premye fwa.  Envante yon bagay."
}, {
  "word": "Kreyòl",
  "description": "Moun ki fèt e grandi nan yon peyi.  Plizyè lang moun pale nan plizyè peyi ki te pase anba esklavaj nan ansyen koloni yo.  Esklav yo pate kapab konprann lang mèt yo, kolon yo te ap pale; konsa yo di mo yo nan fason pa yo e tout esklav parèy yo entèprete mo yo menm jan moun ki di mo a te konprann li.  Yonn konprann lòt yo kontinye pale konsa.   Kreyòl Ayisyen, Yon lang ki soti nan defòmasyon mo twa lòt lang: Anglè, Espanyòl, Fransè.  Prèske shak santèn moun nan popilasyon peyi Ayiti a pale Kreyòl,  men lang sa a se yonn nan de lang ofisyèl peyi a, sou kote Fransè."
}, {
  "word": "Kribish",
  "description": "Yon ti bèt ki viv nan dlo, ki kapab gen koulè blan, wouj, vè e li soti nan menm fanmiy avèk krab, oma.  Li itilize senk pye dèyè li yo pou mashe.  Li bay manje bon gou e moun itilize li pou kwit anpil manje tankou sòs."
}, {
  "word": "Krim",
  "description": "Move aksyon yon moun, tankou touye yon lòt moun, vòlè bagay yon lòt moun posede, ki ale nan direksyon opoze avèk lalwa."
}, {
  "word": "Kritik",
  "description": "Opinyon yon moun sou rezilta travay yon lòt moun.  Yon kritik kapab pozitif ou byen negatif.  Yon moun ki kritike rezilta travay yon lòt moun ede moun nan fè travay la, yon lòt travay pi byen."
}, {
  "word": "Kritike",
  "description": "Shashe mete verite rezilta travay yon moun klè pou tout lòt moun kapab konprann li.  Bay yon opinyon sou travay yon moun.  Pale byen, mal de pèsonalite yon moun."
}, {
  "word": "Kriye",
  "description": "Moman yon moun gen dlo ki ap soti nan je li.  Gen anpil reson ki fè yon moun kriye tankou lapenn, doulè, kontantman e latriye."
}, {
  "word": "Kuis",
  "description": "Pati anlè nan yon janb ki ale kole nan senti yon moun, yon bèt e ki kole nan jenou moun nan, bèt la."
}, {
  "word": "Kwa",
  "description": "Mete de bagay long yonn an travè sou lòt la.  Pozisyon yon moun, yon bagay ki bare shemen yon moun pou anpeshe li kontinye wout li."
}, {
  "word": "Kwadèboukè",
  "description": "Yon vil nan peyi Ayiti ki toupre kapital peyi a nan direksyon nò-lès e sou wout pou ale nan Depatman Sant la.  Croix-des-Bouquets."
}, {
  "word": "Kwadèmisyon",
  "description": "Yon vil nan nò kapital peyi Ayiti, anvan Kwadèboukè, toupre kote de gran wout pou ale nan nò peyi a rankontre:  Wout Nasyonal Nimewo En avèk Wout Nimewo De.  Croix-Des-Missions."
}, {
  "word": "Kwasan",
  "description": "Yon varyete pen ki sanble avèk mwatye yon wonn.  Yonn nan fòm Lalin nan ki parèt shak mwa e pandan plizyè jou nan yon mwa."
}, {
  "word": "Kwasans",
  "description": "Eta yon bagay ki te piti, kout e ki ap vini gwo grandi.  Eta yon bagay ki ap soti nan yon kantite ki pi piti pou ale nan yon kantite ki pi gwo.  Konte tankou soti nan en, de, twa… pou ale pi wo."
}, {
  "word": "Kwaze",
  "description": "Eta yon bagay ki pase, koushe an travè sou, wout, yon lòt bagay.  Lè yon mal bèt monte sou do yon femèl bèt pou rantre ògán seksyèl li nan pa femèl la."
}, {
  "word": "Kwen",
  "description": "Kote.  Yon fas nan yon bagay tankou yonn nan kat fas yon bwat.  Yon pozisyon kote yon bagay ye."
}, {
  "word": "Kwenn",
  "description": "Po kò yon èt vivan melanje avèk vyann kole nan li.  Yon pati nan koshon mashann vyann koshon itilize pou fè griyo."
}, {
  "word": "Kwit",
  "description": "Itilize shalè, dife pou shofe yon bagay pou moun manje pou jis li vini mou.  Tranpe yon bagay pou moun manje nan dlo sho pou jis li vini mou."
}, {
  "word": "L",
  "description": "Douzyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "La",
  "description": "Yonn nan sèt nòt mizik yo:  do, re, mi, fa, sòl, la, si."
}, {
  "word": "Labou",
  "description": "Tè ki mouye avèk yon likid tankou dlo. Yon moso tè, pousyè ki melanje avèk yon likid tankou dlo.  Lè lapli tonbe yon kote tè a pa kouvri, li fè labou."
}, {
  "word": "Labouyi",
  "description": "Yon manje mou ayisyen fè avèk farin, dlo, kanèl sik, lèt.  Labouyi se yon soupe pou ayisyen."
}, {
  "word": "Lagonav",
  "description": "Yon il nan lwès peyi Ayiti e an fas kapital peyi a, Pòtoprens.  Lagonav sitiye nan lanmè Atlantik la."
}, {
  "word": "Lafyèv",
  "description": " Yon gwo ogmantasyon nan wotè tanperati kò yon èt vivan.  Lafyèv pa yon maladi pou kont li, men se siy pou fè konnen gen yon lòt maladi ki bezwen trete."
}, {
  "word": "Lage",
  "description": "Retire yon kòd ki te mare yon bagay pou kite bagay la ale.  Travay yon moun ki kite yon kote pakse kantite tan pou li te pase kote a fini pase.  Retire yon moun nan prizon pou li kapab vini lib.  Kite yon bagay ki te pandye anlè tonbe sou tè a."
}, {
  "word": "Lagè",
  "description": "Yon moman lè de gwoup politik, de gwoup militè ap goumen.  Gè.  Lè de diferan gwoup ap goumen, anpil moun ki pa nan gè a, timoun avèk fanm, kapab mouri tou."
}, {
  "word": "Lagon",
  "description": "Kote yon moso tè kenbe dlo, tankou lapli ki tonbe sou li, pou anpil jou anvan dlo sa rantre nan tè a."
}, {
  "word": "La Gonâve",
  "description": "Gade Lagonav."
}, {
  "word": "Lagoun",
  "description": "Gade Lagon."
}, {
  "word": "Laj",
  "description": "Kantite tan yon bagay, yon moun gen depi li egziste. Kantite tan yon bagay gen depi li te fèt, yon moun te kreye li, te envante li."
}, {
  "word": "Lajan",
  "description": "Kòb. Lò, lajan e anpil lòt metal leta prepare yon fason pou moun nan yon peyi, yon sosyete kapab ashte, shanje li kont sa yo bezwen.  Nenpòt moso papye leta yon peyi mete an sikilasyon pou moun sèvi pou shanje kont sa yo bezwen."
}, {
  "word": "Lajè",
  "description": "De kwen ki pi kout nan kat kwen yon bagay.  Dimansyon nan yon sans pèpandikilè a longè.  Gwosè yon bagay nan tout sans li, san kite yon ti moso nan bagay la deyò.  De dimansyon ki pi kout yo nan yon bagay ki gen kat kote, kat kwen.   Kontrè longè."
}, {
  "word": "Lajònis",
  "description": "Yon maladi ki gen rapò avèk yon enfeksyon nan fwa yon èt vivan tankou moun.  Li bay moun dyare ki mashe avèk plis pouse pase poupou vrèman.  Peyizan ayisyen konnen trete maladi sa a avèk feyaj."
}, {
  "word": "Lakansyèl",
  "description": "Yon pwen kote reyon limyè rankontre avèk farinay dlo epi li fòme yon imaj ki gen sèt koulè nan li:  vè, digo, ble, vyolèt, wouj, zoranj, jón."
}, {
  "word": "Lakay",
  "description": "Kay kote yon moun ap toujou retounen menm lè li ale byen lwen.  Peyi kote yon moun te fèt.  Kay."
}, {
  "word": "Lakomin",
  "description": "Yonn nan divizyon teritwa Ayiti yo.  Biwo kote majistra yon vil ye.   Gen twa majistra nan shak vil e yo twa travay nan menm biwo a."
}, {
  "word": "Lakou",
  "description": "Espas ant yon kay e antouraj ki separe li avèk lòt moso tè ki antoure li.  Yon gwoup jij nan tèt depatman jistis yon peyi."
}, {
  "word": "Lakrè",
  "description": "Yon moso bagay blan, tout koulè, moun itilize pou ekri sou tablo, bay yon desen koulè."
}, {
  "word": "Lalin",
  "description": "Yon kò nan syèl la ki ap fè wonn tè a, limyè solèy frape sou li epi li voye limyè sa vini sou tè a.  Limyè sa kapab soti nan nenpòt planèt nan syèl la.  Lalin nan rekòmanse menm mouvman yo shak 28 jou."
}, {
  "word": "Lalo",
  "description": "Yon ti pye bwa, yon legim, ki gen fèy glise e ki fè bon bouyon.  Peyizan ayisyen kwit li plis, men gen kèk moun nan vil yo ki manje li tou."
}, {
  "word": "Lalwa",
  "description": "Lwa.  Prensip.  Prensip ki gouvène yon peyi, yon sosyete e tout moun fèt pou obeyi li.  Yon plant ki gen yon fèy vè avèk nannan li blan e anmè."
}, {
  "word": "Lalwèt",
  "description": "Yon ti bransh vyann ki andedan boush moun e sou dèyè."
}, {
  "word": "Lamantasyon",
  "description": "Yonn nan liv yo ki nan Bib la.  Yon moman penitans nan lavi yon moun kote li a pote plent bay, Bondye, yon lòt moun tankou yon wa."
}, {
  "word": "Lamante",
  "description": "Plenyen.  Pote plent bay, Bondye, yon moun tankou yon wa."
}, {
  "word": "Lamveritab",
  "description": "Grenn yon pye bwa ki donnen plis nan Depatman Grandans la.  Moun nan zòn sa fè yon bagay ki rele tonmtonm avèk grenn sa."
}, {
  "word": "Lan",
  "description": "Vitès deplasman yon bagay ki fè li sanble li pa ap deplase tout bon vre.  Eta deplasman yon bagay ki dousman."
}, {
  "word": "Lanati",
  "description": "Tout bagay ki egziste."
}, {
  "word": "Lanfè",
  "description": "Yon plas kote moun panse ki gen anpil tribilasyon e se Satan ki ap gouvène kote sa a.  Yon plas tout moun relijye yo kwè ki egziste e se la tout moun ki pa sib prensip Bondye yo ap ale pou yo kapab pase penitans epi boule.  Kwayans kèk moun genyen de lavi kèk moun ap viv sou tè a."
}, {
  "word": "Lang",
  "description": "Yon moso vyann ki nan mitan boush anpil èt vivan tankou moun.  Lang ede moun pwononse mo ki ap soti nan boush li e li kondi manje ale anba ranje dan moun.  Yon konbinezon ant lèt, mo e son tout moun nan yon kominote, yon peyi konprann e yo itilize li pou kominike ant yo.  Yon pati nan kle yon pòt ki rantre yon kote pou kenbe pòt la fèmen."
}, {
  "word": "Langèt",
  "description": "Yon ti lang.  Krèt."
}, {
  "word": "Lanmè",
  "description": "Yon kantite likid ki anpil e ki okipe plis espas pase tout espas tè tout peyi nan lemond okipe.  Likid sa sale e li gen anpil bèt, gwo tankou piti, ki ap viv nan li.  Bato kapab soti de yon peyi a yon lòt pandan li ap deplase sou lanmè.  Dlo lanmè nan kèk zòn tèlman sale, pyès bagay pa kapab koule nan li si bagay sa pa lou anpil."
}, {
  "word": "Lanmen",
  "description": "Kole de men ansanm epi vlope yonn avèk lòt la pandan yo ap souke.  Yon fason pou salye yon gason.  Yon mwayen énmi yon ayisyen itilize pou mete yon pwazon, yon zonbi, nan kò énmi an."
}, {
  "word": "Lanmidon",
  "description": "Yon poud ki soti nan manyòk e ki kapab prepare pou kole kèk bagay tankou papye sou papye.  Pou fè poud sa a, moun yo kraze manyòk la epi yo retire likid li bay la.  Lè likid sa poze, gen yon bagay ki fòme anba resipyan kote li ye a.  Yo mete bagay sa seshe nan solèy.  Se lanmidon an sa."
}, {
  "word": "Lanmò",
  "description": "Moman kote yon moun soti nan lavi. Yon ka.  Yon gwo pwoblèm anpil moun, fanmiy avèk zanmi yon moun genyen lè yonn ou plizyè pwòsh moun sa yo mouri."
}, {
  "word": "Lanmou",
  "description": "Bon santiman yon moun, yon bèt gen nan kè li pou yon lòt moun, yon lòt bèt."
}, {
  "word": "Lanmourèz",
  "description": "Yon moun, yon bèt ki gen bon santiman nan kè li pou yon lòt moun, yon lòt bèt."
}, {
  "word": "Lans",
  "description": "Yon bagay moun kapab vlope avèk men li, men ki solid anpil e ki kenbe de bò yon sak, panyen e ki kenbe de bò yo an balans; konsa moun kapab tranpòte panyen an, sak la."
}, {
  "word": "Lantouray",
  "description": "Baraj nan tout kwen yon moso tè pou fè li difisil pou moun, bèt rantre sou moso tè sa a.  Lantouray fè moun konnen gen yon lòt moun ki posede yon moso tè ki antoure."
}, {
  "word": "Lapè",
  "description": "Yon eta pasifik kote tout bagay ap fèt nan lòd e pa gen vyolans, bri, detounman politik."
}, {
  "word": "Lapenn",
  "description": "Yon santiman ki anvayi kè yon moun e ki anpeshe moun sa eksprime kontantman.  Yon moun ki nan lapenn kapab kriye si li kontinye panse de sa ki anpeshe li eksprime kontantman li a.  Prezans lòt moun ki ap pale de lòt bagay ki bay kontantman kapab fè moun nan bliye lapenn li."
}, {
  "word": "Lapli",
  "description": "Yon kantite gout dlo ki soti nan espas e ki tonbe nenpòt kote sou fas tè a.  Lapli kapab tonbe pandan yon ti tan kout; konsa li kapab tonbe pandan plizyè jou."
}, {
  "word": "Laponyèt",
  "description": "Yon moman kote yon gason vlope zozo li avèk men li epi li ap fè yon mouvman soti devan ale dèyè avèk men li.  Mouvman sa bay gason an yon sansasyon ki sanble avèk sansasyon yon zozo ki ap rantre soti nan yon koko bay, epi deshay soti nan zozo li."
}, {
  "word": "Lapòs",
  "description": "Yon biwo leta nan anpil peyi kote moun bay lèt, bwat, anpil lòt komisyon pou anplwaye biwo sa a voye bay destinatè pou yo."
}, {
  "word": "Larivyè",
  "description": "Yon kouran dlo dous ki soti nan yon sous epi ki sib tout nivo tè ki pi ba pase nivo kote li soti a pou jis li rive nan lanmè.  Rivyè."
}, {
  "word": "Las",
  "description": "Yon fèy kat ki gen lèt, A, nan li pou idantifye li.  Nan kèk jwèt li reprezante yon gwo kat, nan kèk jwèt li fèb.  Yon maladi kèk moun soufri ki anpeshe yo respire nòmalman.  Kèk moun fèt avèk maladi sa, kèk moun vini genyen li pandan lavi yo.  Ayisyen itilize lalwa pou trete timoun ki fèt avèk li."
}, {
  "word": "Lashe",
  "description": "Kite yon bagay ale nan yon direksyon san kontinye kontwole kijan li ap kontinye ale."
}, {
  "word": "Lasho",
  "description": "Yon poud wòsh blan.  Pou ayisyen prepare poud sa a, yo ranje yon pil moso bwa yonn sou lòt epi yon mete wòsh blan sou bwa yo.  Yo limen dife nan bwa yo pou yo boule e shofe wòsh yo anpil.  Lè bwa yo fini boule moun vide dlo fwèt sou wòsh sho yo.  Wòsh yo fonn pou bay lasho."
}, {
  "word": "Lasi",
  "description": "Nish kote myèl ponn, fè pitit, epi mete siwo.  Yon kras ki fèt nan je moun, bèt."
}, {
  "word": "Latanyen",
  "description": "Fèy yon plant atizan ayisyen itilize pou trese makout, baskèt, panyen, djakout.  Li reziste anba domaj dlo ki mouye li pandan anpil tan."
}, {
  "word": "Laten",
  "description": "Yon lang moun pa pale ankò pou lang ofisyèl peyi yo, men se li ki manman anpil lang nan anpil peyi e legliz katolik nan tout peyi kontinye itilize lang sa nan kèk seremoni.  Anpil mo nan prèske tout lang kapab jwenn rasin yo nan laten."
}, {
  "word": "Latibonit",
  "description": "Yon flèv nan Depatman Sant la ki gen yon baraj sou li pou bay kapital peyi a elektrisite e menm flèv sa bay kont dlo pou kiltivatè nan Depatman Latibonit la wouze plantasyon diri yo."
}, {
  "word": "Latitid",
  "description": "Yon plas syantis konsidere pou distans de liy ki divize nò avèk sid tè a."
}, {
  "word": "Latriye",
  "description": "Anpil lòt bagay ki vini, ki kapab vini apre san bay non yo.  Bagay ki sib lòt bagay ki devan yo."
}, {
  "word": "Lavalas",
  "description": "Yon gwo mouvman yon rivyè fè kote dlo nan rivyè sa monte depase wotè dlo ki te konnen toujou ap pase nan shemen li.  Yon mouvman politik Jean-Bertrand Aristide te mete sou pye lè li te aksepte poze kandidati li pou prezidans peyi Ayiti."
}, {
  "word": "Lavant",
  "description": "Vann anpil nan yon kantite mashandiz ki te ap tann ashtè pou ashte yo.  Vann mashandiz."
}, {
  "word": "Lave",
  "description": "Mete, pase dlo sou yon bagay pou retire salte sou li.  Mete rad nan mashin avèk dlo e savon pou yo vini pwòp.  Mete rad nan dlo fwote savon sou yo epi fwote yo pou jis yo vini pwòp. "
}, {
  "word": "Lavi",
  "description": " Pati ki pi enpòtan nan egzistans yon èt vivan.  Li se orijin tout èt vivan, li grandi avèk kò a epi li kite kò a pandan lanmò a vini."
}, {
  "word": "Lavil",
  "description": "Vil.  Yon vil ki pi enpòtan pou moun ki ap viv nan antouraj vil sa.  Yon zòn nan yon vil kote ki gen tout gwo boutik, magazen avèk mashe kote mashann vann mashandiz yo e ashtè ale shashe sa yo bezwen ashte."
}, {
  "word": "Lè",
  "description": "Yon konpozisyon plizyè eleman, men majorite kantite a se oksijèn ki nan lanati e ki pèmèt moun viv.  Oksijèn pou kont li nesesè pou moun rete nan lavi.  Yonn nan 24 inite yon jounen.  Pou moun di yon Lè, li pa bezwen itilize lèt L la devan è.  Men tout lè nan yon jounen: Inè pou 1 lè, Dezè pou 2 lè, Twazè pou 3 lè, Katrè pou 4 lè, Senkè pou 5 lè, Sizè pou 6 lè, Setè pou 7 lè, Yuitè (uitè) pou 8 lè, Nevè pou 9 lè, Dizè pou 10 lè, Onzè pou 11 lè, Douzè (midi) pou 12 lè, Trèzè pou 13 lè, Katòzè pou 14 lè, Kenzè pou 15 lè, Sèzè pou 16 lè, Disetè pou 17 lè, Dizyuitè (dizuitè) pou 18 lè, Diznevè pou 19 lè, Ventè pou 20 lè, Venteinè pou 21 lè, Venndezè pou 22 lè, Venntwazè pou 23 lè e Vennkatrè pou 24 lè.  Yon poud pwazon énmi yon ayisyen mete yon kote  énmi an ap ale pase pou touye li."
}, {
  "word": "Legal",
  "description": "Nenpòt bagay ki rantre anba kouvèti lwa.  Tout bagay moun nan yon peyi, yon soyete fè nan obeyisans, avèk respè pou lwa ki kontwole sa yo ap fè a."
}, {
  "word": "Legalizasyon",
  "description": "Fè lwa pou yon bagay ki te deja egziste si pate gen lwa ki gouvène bagay sa a deja.  Fè shanjman nan yon lwa pou rantre yon bagay moun deja ap fè anba lwa sa a."
}, {
  "word": "Legim",
  "description": "Vejetab.  Yon bagay moun prepare avèk vejetab, vyann, kawòt, lwil pou akonpaye yon manje ayisyen tankou mayi moulen, diri, ansanm avèk pwa, sòs pwa e latriye."
}, {
  "word": "Legliz",
  "description": "Kote yon pè ou byen yon pastè avèk anpil moun ki nan yon menm relijyon rankontre pou yo priye, shante, bay Bondye glwa.  Yon kay kote yon pè ou byen yon pastè avèk anpil fidèl konnen rankontre pou yo shante, priye, bay Bondye glwa.  Yon òganizasyon relijye tankou legliz katolik, legliz pwotestan e latriye."
}, {
  "word": "Lejand",
  "description": "Istwa moun nan yon sosyete toujou ap rakonte tout jenerasyon, men ki pa vrè.  Kèk lejand sanble avèk yon istwa ki te pase tout bon vre.  Bagay ki pa vrè.  Siy ki reprezante yon konpayi."
}, {
  "word": "Lekti",
  "description": "Travay yon moun ki ap li yon ekriti tankou yon tèks, yon liv."
}, {
  "word": "Lemond",
  "description": "Tout sa ki egziste sou planèt tè a:  tout moun, tout peyi, tout dlo, tout tè avèk tout sa ki nan tout peyi, sou tout tè, nan tout dlo."
}, {
  "word": "Lendi",
  "description": "Dezyèm jou nan yon semèn e premye jou travay nan semèn nan."
}, {
  "word": "Lenmò",
  "description": "Yon kadav, yon mò.  Nenpòt bagay ki sanble avèk yon kadav ou byen yon mò.  Yon moun ki endispoze se yon lenmò menmsi li pa yon kadav."
}, {
  "word": "Lenno",
  "description": "Nenpòt bagay ki pa nan yon gwoup.  Yon bagay ki pou kont li."
}, {
  "word": "Lès",
  "description": "Ès.  Yonn nan kat pwen kadinal yo ki nan direksyon kote solèy la leve a."
}, {
  "word": "Lesiv",
  "description": " Travay yon moun ki ap lave rad nan mashin ou byen avèk men."
}, {
  "word": "Lesivè",
  "description": "Moun ki fè lesiv.  Moun ki pran rad sal, mete dlo avèk savon nan yo pou fè rad yo vini pwòp pandan li ap fwote yo, yon mashin ap fwote rad yo."
}, {
  "word": "Lespri",
  "description": "Yon fòs envizib ki kapab aji sou bagay ki vizib.  Espri.  Yon degre entelijans yon moun fèt avèk li e ki bezwen devlope pandan moun nan ap grandi.  Lwa.  Lespri-sen.  Lespri sen, Lespri ki pran nesans li nan Bondye.  Yonn nan twa pèsonalite Bondye yo:  Papa a, Pitit la, Lespri-sen an."
}, {
  "word": "Lestomak",
  "description": "Pati nan kò yon moun ki anba tete moun nan e sou andedan kote manje pase anvan li ale nan vant moun nan."
}, {
  "word": "Lèt",
  "description": "Yonn nan shak inite ki fòme alfabèt yon lang.  Senbòl ekriven itilize pou ekri tèks.  Yon mwayen moun itilize pou kominike sou papye san yo pa rankontre.   Yon likid blan ki soti nan tete kèk femèl bèt e tout moun ki nouris.  Lèt elektwonik, Yon mwayen moun itilize pou yo ekri nan òdinatè epi voye ekriti a bay destinatè li nan òdinatè li nenpòt ki kote nan lemond òdinatè lòt moun nan ye a."
}, {
  "word": "Leta",
  "description": "Yon sistèm envizib nan yon peyi ki regle tout afè peyi a.  Nan anpil peyi gouvènman avèk leta peyi a fè yon sèl kò. Konfizyon sa a anpeshe peyi konsa pwogrese paske moun nan peyi sa a pa kwè nan melanj de kò sa yo (leta avèk gouvènman)."
}, {
  "word": "Leti",
  "description": "Yon vejetab, fèy vè yon plant moun manje pou salad."
}, {
  "word": "Lètyè",
  "description": "Rezilta travay yon moun mete anpil tan avèk prekosyon pou fè li avèk entansyon travay sa a ap siperyè tout lòt travay, menm jan avèk li, lòt moun fè."
}, {
  "word": "Leve",
  "description": "Kite yon pozisyon koushe pou pran pozisyon shita ou byen kanpe.  Soti anba pou monte anwo.  Eta solèy la lè li kòmanse klere tè a.  Soti nan yon pozisyon orizontal pou pran yon pozisyon vètikal."
}, {
  "word": "Lexus",
  "description": "Yon mak mashin liksye.  Yon gwo mak mashin ki gen yon senbòl L pou lejand li."
}, {
  "word": "Li",
  "description": "Yon pwonon moun itilize lè yo ap pale avèk yon moun de yon lòt moun pou evite repete non lòt moun nan plizyè fwa.  Pase je sou yon tèks pou konprann sans li."
}, {
  "word": "Lib",
  "description": "Endepandan.  Eta peyi yo ki te soti anba esklavaj peyi kolonizatè yo.  Eta yon moun ki posede pouvwa pou pran desizyon sou bagay ki ap pase nan lavi li.  Eta moun ki kapab fè sa yo vle avèk lavi yo."
}, {
  "word": "Libète",
  "description": " Eta yon moun, yon peyi, ki lib.  Endepandans.  Aspirasyon tout pèp pou yo patisipe nan desizyon peyi yo.  Anpil moun kwè libète se yon bagay moun pran se pa yon bagay moun bay moun."
}, {
  "word": "Librèri",
  "description": "Yon biznis kote ki gen liv pou vann, anpil liv."
}, {
  "word": "Lil",
  "description": "Il.  Yon moso tè ki gen dlo antoure li nan tout kwen li."
}, {
  "word": "Lim",
  "description": "Yon moso metal ki gen anpil ti dan sou tout longè li yon fason pou li kapab grate lòt metal e diminye gwosè yo.  Yon lim se yon bon zouti pou file kouto."
}, {
  "word": "Limen",
  "description": " Fè elektrisite pase nan yon anpoul elektrik.  Fwote lim sou yon bagay.  Kòmanse yon dife yon kote tankou nan yon fou ou byen yon resho."
}, {
  "word": "Limit",
  "description": " Kote pi lwen yon bagay, yon moun kapab rive.  Itilizasyon tout enèji ki te disponip pou fè yon travay.  Fontyè yon peyi avèk yon lòt peyi."
}, {
  "word": "Limonad",
  "description": "Limonade.  Yon vil nan Depatman Nò peyi Ayiti.  Yon ji ki gen dlo, sitwon avèk sik nan li.  Sitwonad.  Kèk lè, moun ki ap fè limonad mete yon ti esans pou amelyore gou li."
}, {
  "word": "Limonade",
  "description": "Gade Limonad."
}, {
  "word": "Limyè",
  "description": "Klate ki diminye ou byen elimine fènwa.  Rezilta klate yon anpoul elektrik bay lè elektrisite pase nan filaman li.  Klate solèy la voye sou tè a.  Fè Limyè, Ede yon moun konprann yon bagay, yon lide."
}, {
  "word": "Linèt",
  "description": "De moso loup nan yon ankadreman moun mete sou nen yo pou ede yo wè byen.  Yon espas tou piti ant de mashin kote shofè yon lòt mashin degaje li epi pase nan li.  Tou nan dèyè pantalon yon gason."
}, {
  "word": "Lis",
  "description": "Plizyè bagay diferan, ki vini yonn apre lòt sou yon moso papye, ki vini an palan."
}, {
  "word": "Lisans",
  "description": "Pèmisyon yon moun resevwa pou fè yonn ou byen plizyè bagay ki pa kapab fèt san otorizasyon.  Libète pou aji, pran desizyon.  Pou yon moun kondi yon mashin, li bezwen yon lisans."
}, {
  "word": "Literati",
  "description": "Anpil ekriti ki te fèt pou eksplike kèk bagay nan yon sosyete.  Tout travay avèk zèv ekriven yon peyi tankou pwezi, romans e latriye.  Travay yon moun ki ap pale anpil pou fè moun konprann yon bagay."
}, {
  "word": "Literè",
  "description": "Tout travay ekriven nan yon peyi, yon epòk fè tankou travay romantik, poetik, melankolik e latriye.  Ekriven toujou pibliye travay sa yo nan liv, men se pa tout travay literè ki toujou rive pibliye."
}, {
  "word": "Liv",
  "description": "Anpil fèy papye avèk tèks sou yo ki kole ansanm nan yon fason byen òdone.  Lektè kapab soti sou premye paj la pou ale sou dènye a.  Moun ki ap li yon liv gen pou yo pase nan paj a gosh yo anvan paj a dwat yo.  Yon inite nan lajan peyi Angletè.  Inite pou eksprime pwa moun."
}, {
  "word": "Livre",
  "description": "Lage yon bagay yon kote ou byen nan men yon moun san enterese a sa ki ap ale pase bagay la apre moman livrezon an."
}, {
  "word": "Livrezon",
  "description": "Aksyon moun ki delivre yon bagay."
}, {
  "word": "Liy",
  "description": "Yon direksyon dwat.  Plisyè bagay ki kanpe yonn dèyè lòt.  Yon tras ki fèt avèk yon règ."
}, {
  "word": "Lokal",
  "description": "Yon zòn avèk tout bagay ki ap pase nan zòn sa a.  Pwodiksyon yon zòn, yon peyi.  Domestik."
}, {
  "word": "Lokalize",
  "description": "Shashe konnen nan ki pozisyon yon bagay ye.  Bay lokal, zòn yonn ou plizyè bagay ye."
}, {
  "word": "Lokatè",
  "description": "Moun ki ap peye mèt yon bagay, pou lwaye bagay la.  Moun ki lwe yon bagay tankou kay, lajan nan men yon lòt moun."
}, {
  "word": "Long",
  "description": "Eta de kwen nan yon bagay ki kapab bay yon dimansyon plis pase lòt de kwen yo nan menm bagay la."
}, {
  "word": "Longè",
  "description": "De kwen ki pi long nan kat kwen yon bagay. Dimansyon nan yon sans pèpandikilè a lajè.  De dimansyon ki pi long yo nan yon bagay ki gen kat kote, kwen.  Kontrè lajè. "
}, {
  "word": "Lonjitid",
  "description": "Yon distans soti nan lès ou lwès meridyen syantis yo bay yon mesi ki rele ne."
}, {
  "word": "Lonn",
  "description": "Yon moso bwa long.  Yon enstriman mashann twal itilize pou yo mezire twal."
}, {
  "word": "Lonnen",
  "description": "Pike yon moun, yon bagay avèk pwent yon lonn paske ponyèt twò kout pou rive sou moun nan, sou bagay la."
}, {
  "word": "Lontan",
  "description": "Yon gwo kantite tan ki pase.  Yon tan ki te pase, men gen anpil tan depi tan sa a te pase."
}, {
  "word": "Loray",
  "description": "Yon bri ki fèt pandan yo tonnè ap tonbe e li kapab lage anpil elektrisite nan yon zòn.  Moun kapab tande loray anvan lapli tonbe, lè lapli ap tonbe e apre lapli tou.   Yon ti kras nan elektrisite yon loray kapab fè anpil dega tankou touye moun.  Tonnè."
}, {
  "word": "Lou",
  "description": "Eta yon bagay, yon moun ki peze anpil e li difisil ou byen enposib pou pote li."
}, {
  "word": "Lougawou",
  "description": "Yon gwoup moun ki patisipe nan yon seremoni majik lannwit e ki kapab manje moun parèy yo."
}, {
  "word": "Loup",
  "description": "Yon moso glas ki ede moun wè yon bagay lwen pi pre e yon bagay pre pi lwen.  Nan kèk sitiyasyon loup ede fè diferans ant plizyè bagay ki piti anpil."
}, {
  "word": "Loushèt",
  "description": "Yon moso fè lou ki gen yon pwent plat e yon bon enstriman pou fouye yon tou nan tè."
}, {
  "word": "Lwa",
  "description": "Lalwa.  Prensip ki gouvène yon peyi, yon sosyete e tout moun fèt pou obeyi prensip sa yo.  San lwa pa gen moun ki te ap konnen kisa yo gen dwa fè, kisa yo pa gen dwa fè. Yon espri envizib ki kapab itilize kò sèvitè li pou kominike avèk lòt moun."
}, {
  "word": "Lwaye",
  "description": "Enterè yon moun peye pou yon kòb li prete.  Enterè.  Kòb yon moun peye pou itilizasyon yon bagay li lwe."
}, {
  "word": "Lwayote",
  "description": "Onèt.  Eta yon moun ki respekte tèt li e ki respekte tout lòt moun avèk tout sa yo posede."
}, {
  "word": "Lwe",
  "description": "Itilize sa yon lòt moun posede epi peye moun nan pou itilizasyon bagay la."
}, {
  "word": "Lwen",
  "description": "Anpil distans ki separe de kote."
}, {
  "word": "Lwès",
  "description": "Wès.  Yonn nan kat pwen kadinal yo ki nan direksyon kote solèy la koushe."
}, {
  "word": "Lwil",
  "description": "Yon likid ki gen grès nan li e moun mete li nan manje pou anpeshe manje a kole nan shodyè ki ap kwit li a.  Yon likid ki gen grès e anpeshe de moso fè ki ap fwote kraze."
}, {
  "word": "Lyann",
  "description": "Yon kòd natirèl kèk plant fè pandan yo ap grandi paske plant sa yo pa kapab gwosi anpil, men yo kapab alonje anpil pou jis yo mouri.  Kèk nan plant sa yo tankou grenadya grandi pandan plizyè ane."
}, {
  "word": "M",
  "description": "Trèzyèm lèt nan alfabèt lang Kreyòl la.  Abrevyasyon mo, mwen.   Mwen rele li deja = M rele li deja."
}, {
  "word": "Mabouya",
  "description": "Yon ti bèt ki gen kat pye, long ke e ki sanble li trennen sou vant li pou mashe.  Li viv nan tou tè e nan raje tankou plenn."
}, {
  "word": "Madanm",
  "description": "Yon fi ki gen ven ane konsa.  Yon fi ki marye avèk yon gason.  Yon fi ki posede pouvwa avèk respè.  Yon fi ki marye."
}, {
  "word": "Madi",
  "description": "Twazyèm jou nan yon semèn e dezyèm jou travay nan yon semèn."
}, {
  "word": "Madmwazèl",
  "description": "Yon fi ki prèke vini yon madanm; li gen anviwon kenz a ven ane konsa.  Yon fi ki pwofesè lekòl.  Yon fi ki pa janm marye nan lavi li.  Demwazèl."
}, {
  "word": "Maïssade",
  "description": "Gade Mayisad."
}, {
  "word": "Majè",
  "description": "Dwèt ki pi long e ki nan mitan lòt kat dwèt men yon moun.  Yon moun ki rive nan yon laj kote li kapab pran desizyon paske li konnen diferans ant byen avèk mal."
}, {
  "word": "Majeste",
  "description": "Yon moun ki gen anpil pouvwa tankou yon wa."
}, {
  "word": "Majestik",
  "description": "Yon moun ki gen anpil grandè tankou yon wa.  Yon moun, gwo travay yon moun ki merite anpil respè."
}, {
  "word": "Majistra",
  "description": "Shèf yon vil nan anpil peyi.  Shak vil gen majistra pa yo.  Gen twa majistra nan shak vil nan peyi Ayiti, men shak nan yo gen plis pouvwa pase lòt la."
}, {
  "word": "Majò",
  "description": "Yon grad nan anpil kò militè ki responsab administrasyon yon twoup.  Nenpòt moun ki gen responsablite pou pase lòd nan yon gwoup."
}, {
  "word": "Majorite",
  "description": "Pi gwo pati a nan yon gwo kantite.  Pi plis kantite moun ki vote pou yonn nan plizyè kandida ki te patisipe nan yon eleksyon."
}, {
  "word": "Mak",
  "description": "Yon mak mashin GMC (General Motor Company), yon konpayi mashin ameriken fè.  Yon kamyon.  Yon nan douz disip Jezi Kris yo lè li te sou tè a.  Mark.  Yon tash pou fè diferans ant plizyè bagay."
}, {
  "word": "Make",
  "description": "Fè mak yon kote, sou yon bagay.  Eseye pou pran yon boul nan men jwè yon lòt ekip.  Anpeshe jwè yon lòt ekip ale fè gòl.  Sonje yon bagay mal yon moun fè e kontinye siveye moun sa pou wè si li ap fè menm bagay la ankò."
}, {
  "word": "Makè",
  "description": "Yon jwè ki ap make yon lòt jwè nan yon match.  Yon moun ki make yon moun."
}, {
  "word": "Makiyaj",
  "description": "Pwodui shimik fi avèk aktè mete nan figi yo pou shanje aparans yo."
}, {
  "word": "Makiye",
  "description": "Mete makiyaj sou figi pou shanje yon aparans."
}, {
  "word": "Makout",
  "description": "Konbinezon de djakout ki gen menm gwosè e ayisyen yo mete sou do bèt tankou sheval pou fè yo pote shay.  Gen gwo makout pou pote anpil shay e gen ti makout ki fèt pou mete sou do sheval notab yo.  Gade atashe."
}, {
  "word": "Mal",
  "description": "Nenpòt bagay ki pa fèt byen ou byen jan sosyete a espere li te sipoze fèt.  Satan."
}, {
  "word": "Maladi",
  "description": "Shanjman nan sante yon èt vivan ki anpeshe li mennen yon lavi nòmal.  Maladi bay doulè, soufrans, feblès nan kèk ògán, pati kò."
}, {
  "word": "Malè",
  "description": "Yon move bagay ki rive san moun ki koz li a pate planifye li."
}, {
  "word": "Malere",
  "description": "Moun nan yon klas nan yon sosyete ki travay di e ki pa kapab fè anpil kòb vit.  Moun ki pa gen anpil kòb."
}, {
  "word": "Malfezan",
  "description": "Moun ki renmen fè bagay ki mal."
}, {
  "word": "Malfezans",
  "description": "Aksyon yon malfesan.  Fè yon moun, ki pa konnen kijan pou li defann tèt li, mal."
}, {
  "word": "Malis",
  "description": "Koken.  Eta yon moun ki pa janm kite tras pou moun kenbe li lè li fè yon move bagay, yon bagay mal.  Entelijan."
}, {
  "word": "Malkadi",
  "description": "Manifestasyon yon maladi kèk moun genyen ki fè yo pèdi konesans, tranble anpil e rele pandan boush yo ap fè kim."
}, {
  "word": "Malpwoprete",
  "description": "Tout bagay moun konsidere tankou bagay ki sal.  Nenpòt bagay sosyete a panse moun pa dwe fè devan lòt moun tankou mashe san rad nan lari."
}, {
  "word": "Maltrete",
  "description": "Bay move tretman tankou bat yon moun pou jis li pèdi konesans, tout kouraj li e menm mouri."
}, {
  "word": "Malveyan",
  "description": "Yon moun ki pran plezi nan fè moun ki pi fèb pase li sa ki mal."
}, {
  "word": "Mamit",
  "description": "Yon bwat long an metal e won avèk kouvèti solid kole nan de pwent li."
}, {
  "word": "Manba",
  "description": "Pistash ki kraze pou jis li fè labouyi.  Lè li kraze byen, li fè grès.  Bè pistash."
}, {
  "word": "Manbo",
  "description": "Yon fi ki sèvi lwa e ki bay lwa itilize kò li lè yo bezwen kominike avèk lòt moun, fè remèd pou pitit fèy yo, e danse nan seremoni lwa tankou vodou.  Yon bòkò fi."
}, {
  "word": "Manda",
  "description": "Yon pèmisyon sèlman yon jij kapab bay polis pou rantre andedan kay yon moun menmsi moun nan pa vle yo rantre."
}, {
  "word": "Mande",
  "description": "Reklame yon bagay nan men moun pou kado san moun nan pate pran desizyon anvan pou bay bagay la.  Pran desizyon pou resevwa yon bagay."
}, {
  "word": "Mandyan",
  "description": "Moun ki renmen mande e ki mande kado pou siviv nan lavi."
}, {
  "word": "Mango",
  "description": "Fri yon pye bwa ki gen yon gwo grenn, ji, kèk fwa fil tou e ki gen menm non avèk pye bwa ki donnen li.  Gen anpil mango tankou blan, doudous, janmari, miska, grennsi, fil, fransik e latriye."
}, {
  "word": "Manje",
  "description": "Mete yon bagay nan boush, mastike li epi vale."
}, {
  "word": "Manjè",
  "description": "Nenpòt moun, bèt, e latriye ki manje."
}, {
  "word": "Manke",
  "description": "Pèdi yon shans, yon benefis.  Rate.  Anvi pou wè yon moun."
}, {
  "word": "Manman",
  "description": "Yon fi, yon femèl bèt ki fè piti.  Lanati.  Yon peyi.  Yon fi ki adopte yon timoun."
}, {
  "word": "Mannivèl",
  "description": "Kat bransh bagay ki menm longè a sou do yon elikpotè pou ede li vole e rete anlè san li pa tonbe.  Plizyè moso plastik ou byen metal ki nan yon vantilatè e ki kreye van lè yo ap vire."
}, {
  "word": "Mansh",
  "description": "Yon pwent, yon bransh nan yon bagay.  De tou nan yon rad kote moun rantre ponyèt yo."
}, {
  "word": "Manshèt",
  "description": "Yon ti mansh.  Yon kouto laj, long ki fèt pou koupe gwo bagay yon ti kouto pa kapab koupe."
}, {
  "word": "Mantal",
  "description": "Bagay ki gen rapò avèk sa ki ap pase nan tèt moun, men ki pa oblije gen pyès lyen avèk reyalite a.  Gen moun ki toujou santi yo malad, men doktè pa ap janm kapab jwenn maladi yo paske maladi moun sa yo mantal.  Yon maladi mantal kapab vini reyèl."
}, {
  "word": "Mantè",
  "description": "Moun ki renmen e ki bay pran plezi nan bay manti.  Moun ki toujou di wi pou bagay yo te fèt pou di non."
}, {
  "word": "Manti",
  "description": "Bagay moun di moun pou verite, men ki pa vrè. "
}, {
  "word": "Manyen",
  "description": "Toushe yon bagay avèk men.  Toushe.  Travay yon doktè fèy lè li ap pase men li sou tout kò yon malad pou jwenn ki kote yon maladi ye pou preskri tretman pou maladi a."
}, {
  "word": "Manyòk",
  "description": "Yon ti pye bwa kiltivatè ayisyen plante e ki bay de rasin diferan:  yonn pwès, blan, dous e yon lòt anmè.  Moun bouyi manyòk dous la e yo manje li.   Manyòk anmè a bay lanmidon avèk kasav."
}, {
  "word": "Marande",
  "description": "Vlope yon bagay avèk kòd.  Eta yon moun ki nan yon sitiyasyon kote li pa konnen kisa pou li fè pou soti nan sitiyasyon an."
}, {
  "word": "Marasa",
  "description": "De pitit, pou pi piti, yon manman fè e ki, pou pi piti,  gen yon fi avèk yon gason nan pitit yo."
}, {
  "word": "Mare",
  "description": "Vlope yon kòd byen di sou kò yon moun, yon bèt, yon bagay avèk espwa moun nan, bèt la, bagay la pa ap kapab demare tèt li."
}, {
  "word": "Mari",
  "description": "Yon gason ki marye avèk yon fi.  Manman Jezi Kris."
}, {
  "word": "Mark",
  "description": "Yon mak mashin GMC (General Motor Company), yon konpayi mashin ameriken fè.  Yon kamyon.  Yonn nan douz disip Jezi Kris yo lè li te sou tè a.  Mak."
}, {
  "word": "Maryaj",
  "description": "Yon desizyon yon gason avèk yon fi pran anba lalwa pou yo viv ansanm e pou yo shak pran tout responsablite pou lòt la.  Yon desizyon yon gason avèk yon fi pran devan Bondye pou yo pase tout lavi yo ansanm nan nenpòt ki kondisyon.  De bagay, de moun, de bèt ki mare ansanm."
}, {
  "word": "Marye",
  "description": "Pran yon angajman devan lalwa e devan Bondye pou viv avèk yon madanm ou byen yon mari pandan tout lavi madanm nan ou byen mari a.  Pran yon angajman."
}, {
  "word": "Mas",
  "description": "Twazyèm mwa nan yon ane e dezyèm mwa ki gen 31 jou nan yon ane."
}, {
  "word": "Masak",
  "description": "Touye, ansanm, anpil moun ki pa kapab defann tèt yo."
}, {
  "word": "Masakre",
  "description": "Touye anpil moun nan yon masak.  Gate yon bon travay yon moun te ap fè."
}, {
  "word": "Masakrè",
  "description": "Moun ki kòz yon masak.  Moun ki masakre anpil moun ki pa gen mwayen pou defann tèt yo."
}, {
  "word": "Mashandiz",
  "description": "Bagay yon mashann ashte pou li revann."
}, {
  "word": "Mashann",
  "description": "Moun ki gen mashandiz pou vann."
}, {
  "word": "Mashe",
  "description": "Yon plas kote mashann mete mashandiz yo pou yo vann e ashtè ale la pou yo ashte.  Leve pye gosh e pye dwat yonn apre lòt epi depoze li pi devan pou deplase yon kò.  Avanse nan menm direksyon fas, je ap gade.  Mashe Nwa, Yon moman lè mashann ki gen yon mashandiz pwofite monte pri mashandiz la nenpòt wotè yo vle paske pa gen anpil nan mashandiz sa a e anpil moun bezwen ashte li."
}, {
  "word": "Mashin",
  "description": "Nenpòt aparèy mekanik, elektwonik ki kapab fè yon travay tankou kraze kann, kraze mayi, woule yon kasèt, e latriye.  Yon aparèy ki sèvi pou transpòtasyon moun e ki kapab genyen kat, sis, dis, menm dizuit wou.  "
}, {
  "word": "Mason",
  "description": "Yon moun ki espesyalise nan shashe konprann espri natirèl yo pou kontwole lanati.  Yon moun ki prepare mòtye pou fè kay e ki, kèk fwa, aprann fè kay tou paske li toujou ap sib travay moun ki ap fè kay."
}, {
  "word": "Masonn",
  "description": "Yon mòtye ayisyen fè avèk lasho e ajil pou yo boushe tou ant palisad e klisay kay."
}, {
  "word": "Masonnen",
  "description": "Mete masonn sou yon palisad ou byen yon klisay."
}, {
  "word": "Matematik",
  "description": "Nenpòt bagay ki gen rapò avèk syans Matematik Yo."
}, {
  "word": "Matematik Yo",
  "description": "Plizyè syans ki etidye anpil bagay ki pa fè sans e ki eksplike relasyon ki egziste ant tout bagay sa yo.   Yon syans matematik di si A se menm avèk B, B se menm bagay avèk C, A avèk C se menm bagay la ou byen  si A=B, B=C, konsa: A=C"
}, {
  "word": "Matla",
  "description": "Pati nan yon kabann ki fè kabann nan mou pou kò moun kapab kole avèk kabann nan."
}, {
  "word": "Mawon",
  "description": "Yon koulè ki sanble avèk shokola.  Nenpòt moun ki ap viv nan kashe.  Eta esklav ki pate vle rete nan esklavaj e ki te pati ale nan mòn kote yo konnen kolon yo pate kapab monte ale shashe yo.  Esklav sa yo te konnen desann sou plantasyon kolon yo lannwit pou touye yo, brile plantasyon yo."
}, {
  "word": "Mawonaj",
  "description": "Eta moun ki ap viv nan kashe.  Eta esklav nan tan koloni Sen-Domeng (Ayiti) ki te konnen viv nan kashe pou atake blan gouvènè yo lannwit."
}, {
  "word": "Mayi",
  "description": "Yon grenn jón, wouj, yon plant donnen e moun manje li.  Moun fè yon poud avèk mayi (mayi-mounlen).  Lè grenn mayi a kraze li bay yon poud ki gen de poud diferan nan li:  farin mayi a, mayi-moulen an."
}, {
  "word": "Mayisad",
  "description": "Yon vil nan Depatman Sant la ki toupre kapital depatman an, Ensh.  Maïssade."
}, {
  "word": "Mayonèz",
  "description": "Yon bagay ki fèt avèk jón ze, sitwon, vinèg, lwil e moun itilize pou prepare anpil manje, mete sou lòt manje pou bay yo pi bon gou."
}, {
  "word": "Mazda",
  "description": "Yon konpayi mashin ki te konnen fè ti mashin sèlman e ki fè mwayèn mashin konnye a."
}, {
  "word": "Me",
  "description": "Senkyèm mwa nan ane e moman nan ane a lè tout bèl flè nan tout pye bwa parèt, fleri."
}, {
  "word": "Mè",
  "description": "Yon òganizasyon fi ki sakrifye tout lavi yo pou sèvi moun avèk Bondye san kashe aksyon yo.  Mè pa marye e yo pa fè pitit."
}, {
  "word": "Medam",
  "description": "Plizyè fi an gwoup ou byen ki reyini ansanm."
}, {
  "word": "Mèg",
  "description": "Eta yon moun, yon bèt anpil zo nan kò li vizib.  Shèsh.  Yon bagay ki piti, an ti kantite."
}, {
  "word": "Megri",
  "description": "Yon bagay kantite li ap diminye, bese.  Yon moun, yon bèt ki ap vini mèg, shèsh."
}, {
  "word": "Mèkredi",
  "description": "Jou ki nan mitan yon semèn.  Katriyèm jou nan yon semèn e twazyèm jou travay nan yon semèn."
}, {
  "word": "Meksik",
  "description": "Yon peyi sou kontinan Amerik la, nan sid Etazini kote moun yo pale Espanyòl.  Etazini nan nò li epi Beliz avèk Gwatemala nan sid li."
}, {
  "word": "Melankoli",
  "description": "Eta yon moun tankou yon ekriven ki pase anpil move moman nan lavi li e ki pale de tout bagay sa yo nan liv li ekri.  Ekspresyon yon ekriven ki pale de tribilasyon moun nan liv li. "
}, {
  "word": "Melankolik",
  "description": "Travay yon ekriven kote li ap esplike mizè li, povrete li, tribilasyon li.  Eta yon bagay ki gen melankoli nan li."
}, {
  "word": "Memwa",
  "description": "Yon kote andedan tèt moun ki enrejistre tout sa yon moun kapab sonje.  Abilite pou moun sonje konesans yo fè.  Memwa Kout, Pati nan memwa moun ki kenbe enfòmasyon pou yon tan kout tankou kèk segond konsa.  Apre de moun fini rankontre epi yonn bliye non lòt la apre kèk segond, se paske moun nan te itilize memwa-kout yo pou kenbe enfòmasyon sa a.  Memwa Long, Pati nan memwa moun itilize pou kenbe enfòmasyon pou yon tan long, men yo ap bliye bagay sa yo apre kèk jou, kèk semèn konsa.  Yon elèv lekòl bliye yon leson li te aprann apre kèk jou pase leson an te nan memwa long li.  Memwa Pèmanan, Pati nan memwa moun ki kenbe enfòmasyon moun pa janm bliye tankou non moun nan menm, ane moun nan te fèt e latriye."
}, {
  "word": "Memorize",
  "description": "Mete enfòmasyon nan memwa.  Itilize memwa pou sonje bagay ki pase."
}, {
  "word": "Men",
  "description": "Dènye pwent nan de manb yon moun ki kole nan zepòl yo kote senk dwèt yo ye a.  Pati nan kò yon moun li itilize pou kenbe tout sa li bezwen.  Pran sa a.  Apre yon vigil, nan yon fraz, Men vle di:  Poze aksyon sa a e evite yon lòt aksyon."
}, {
  "word": "Menm",
  "description": "De ou byen plis bagay ki pa gen diferans ant yo.  Men'm, Men ki nan kò kò yon moun ki ap pale."
}, {
  "word": "Menmsi",
  "description": "Ekspresyon moun itilize pou diminye valè yon bagay, rezilta, konsekans ki kapab genyen nan yon bagay."
}, {
  "word": "Mennen",
  "description": "Kontwole yon moun, yon bèt, yon bagay ki soti yon kote pou jis li rive yon lòt kote."
}, {
  "word": "Mercedes",
  "description": "Yon mak mashin liksye."
}, {
  "word": "Mesaj",
  "description": "Pawòl yon moun di yon lòt moun pou li ale di yon lòt moun ki pa te kapab tande lè premye moun nan te ap di pawòl la.  Yon mesaj kapab ekri sou papye tou."
}, {
  "word": "Mesaje",
  "description": "Moun ki pote yon mesaj ale bay yon lòt moun."
}, {
  "word": "Mesajè",
  "description": "Yon fi ki pote yon mesaj ale bay yon lòt moun."
}, {
  "word": "Mèsi",
  "description": "Mo moun di moun pou montre yo renmen yon bagay yon moun fè, yon bagay moun nan bay."
}, {
  "word": "Meshan",
  "description": "Eta yon moun, yon bèt ki toujou anvi fè lòt moun, lòt bèt bagay ki ap fè yo mal, soufri."
}, {
  "word": "Mestin",
  "description": "Yon medikaman moun pran pou li kapab fè yo gen dyare e poupou tout manje ki pase twòp tan andedan vant yo e òganis la, kò a pa bezwen yo."
}, {
  "word": "Mesye",
  "description": "Mo moun itilize pou montre respè devan yon gason ki pi gran pase yo.  Yon gwoup gason, plizyè gason ansanm. "
}, {
  "word": "Mesye!",
  "description": "Mo pou montre etónman moun."
}, {
  "word": "Mèt",
  "description": "Yon inite pou mezire distans ki pa twò long.  Yon mèt gen twa pye ventsuit, trant-nèf pous trant-sèt nan li.  Moun ki posede yon bagay, yon bèt, yon moun."
}, {
  "word": "Mete",
  "description": "Depoze, rantre yon bagay, yon moun, yon kote."
}, {
  "word": "Meteyoloji",
  "description": "Syans ki etidye tan avèk shanjman nan tan an."
}, {
  "word": "Mètrès",
  "description": "Yon fi ki gen relasyon entim avèk mari yon lòt fi.  Mèt kay kote yon restavèk rete."
}, {
  "word": "Mi",
  "description": "Eta yon fri apre li fini shanje koulè e li vini gen yon bon gou tankou gou dous.  Anpil fri vini gen koulè jón, men gen kèk lòt ki gen lòt koulè tou.  Yonn nan sèt nòt mizik yo:  do, re, mi, fa, sòl, la, si."
}, {
  "word": "Miba",
  "description": "Aksyon yon bèt ki nouris,  fini pouse pitit li mete deyò vant li.  Fè pitit (pou bèt sèlman)."
}, {
  "word": "Mibalè",
  "description": "Yon vil nan Depatman Sant la kote  Wout Nasyonal Nimewo Twa a pase.  Mirbalais."
}, {
  "word": "Microwave",
  "description": "Maykwowev,  Yon mo nan lang Anglè pou yon aparèy shofaj ki shofe bagay moun manje e byen vit.  Yon Microwave kapab shofe yon plat manje glase nan mwens ke twa minit."
}, {
  "word": "Mikwo",
  "description": "Yon ti aparèy elektrik ki mete ansanm avèk yon opalè pou fè vwa moun grandi anpil pou moun ki lwen yon moun ki ap pale kapab tande moun ki ap pale a san pwoblèm."
}, {
  "word": "Mikwòb",
  "description": "Yon kantite ti bèt moun pa kapab wè avèk je yo san yon mikwoskòp, men ki egziste tout kote sou tè a.  Anpil syantis kwè mikwòb se premye èt vivan ki te egziste sou tè a."
}, {
  "word": "Mikwoskòp",
  "description": "Yon aparèy ki gen loup ranje nan li yon fason pou ede moun wè anpil bagay je pa kapab wè san yon aparèy tankou mikwòb e latriye."
}, {
  "word": "Mil",
  "description": "Yon shif en avèk twa zewo dèyè li.  1.000.  San miltipliye pa dis.  Senk-san plis senk-san."
}, {
  "word": "Milat",
  "description": "Pitit yon kolon, yon blan avèk yon fi nwa, kèk fwa, yon esklas.  Kèk ansyen esklav nan tan Sendomeng (Ayiti) ki te benefisye libète nan men kolon yo paske yo te pitit yon kolon avèk yon fi nwa.  Yon ti gwoup ayisyen ki se desandan pitit kolon nan tan koloni Sendomeng la."
}, {
  "word": "Milèt",
  "description": "Pitit yon femèl sheval avèk yon mal bourik.  Gen mal milèt e gen femèl milèt, men milèt pa fè pitit."
}, {
  "word": "Milisyen",
  "description": "Yon gwoup militè yon prezidan pou-tout-tan nan peyi Ayiti te kreye pou ede li kenbe pouvwa paske li pate kapab konte sou lame peyi a pou bay gouvènman li a tout sekirite li te bezwen.  Makout.  Milisyen yo te konnen abiye avèk yon inifòm koulè ble maren.  Milisyen te kraze nan ane 1986 lè pitit prezidan ki te kreye yo a te oblije kite pouvwa a."
}, {
  "word": "Militè",
  "description": "Plizyè òganizasyon leta nan yon peyi ki regle afè sekirite avèk pwoteksyon moun e mete lòd.  Gen òganizasyon tankou Polis ki mete lòd nan vil andedan yon peyi.  Lame ki siveye fontyè yon peyi kont envazyon lòt peyi.  Si gen lagè, se lame ki ale nan lagè.  Gen plizyè ti gwoup nan shak gwoup miltè yo.   Gwoup moun ki travay avèk leta, ki abiye avèk inifòm pou travay yo e ki toujou gen zam pou bay yo fòs pou fè travay yo."
}, {
  "word": "Militon",
  "description": "Yon vejetab ki gen anpil dlo nan nannan li e ayisyen itilize pou fè legim, bouyon."
}, {
  "word": "Miltiplikasyon",
  "description": "Yonn nan kat operasyon aritmetik yo.  De, se miltiplikasyon de pa en (2 X 1 = 2), e latriye."
}, {
  "word": "Milya",
  "description": "Yon en avèk nèf zewo dèyè li.  Mil miltipliye pa yon milyon.  1.000.000.000."
}, {
  "word": "Milye",
  "description": "Yon kantite ki gen mil (1.000) ou byen plizyè mil nan li."
}, {
  "word": "Milyon",
  "description": "Yon en avèk sis zewo dèyè li.  1.000.000.  Mil miltipliye pa mil."
}, {
  "word": "Milyonè",
  "description": "Yon moun ki posede yon milyon dola."
}, {
  "word": "Minit",
  "description": "Yonn nan swasant init yo ki gen yon lè."
}, {
  "word": "Minorite",
  "description": "Yon ti gwoup tankou mil moun konsa nan yon gwo gwoup tankou sis milyon moun konsa nan yon sosyete.  Yon gwo gwoup moun nan yon sosyete ki pa gen pyès dwa paske yon ti gwoup moun nan menm sosyete sa a kontwole e abize tout rès moun nan sosyete a."
}, {
  "word": "Mirbalais",
  "description": "Gade Mibalè."
}, {
  "word": "Mit",
  "description": "Yon ti ensèk ki fèt nan mayi lè grenn sa a rete fèmen twòp e pandan anpil tan andedan yon bagay tankou yon barik.  Pati blan andedan yon pen."
}, {
  "word": "Mitan",
  "description": "Yon pwen ki divize yon bagay an de pati egal.  Yon lide imajinè pou di:  lwen andedan yon bagay tankou mitan lanmè."
}, {
  "word": "Mitonnen",
  "description": "Frape yon bagay sou yon vejetab, yon legim pou kraze li.  Kraze bagay pou fè yon legim."
}, {
  "word": "Mitrayèz",
  "description": "Yon zam otomatik militè itilize nan lagè pou tire sou moun pi vit."
}, {
  "word": "Mitsubishi",
  "description": "Yon konpayi mashin Japonè ki fè mashin prèske tout gwosè.  Li fè vwati e li fè kamyon."
}, {
  "word": "Mize",
  "description": "Mete espwa sou yon bagay.  Mete kòb nan yon jwèt kote plizyè moun mete kòb e se yon sèl ki ap gen dwa pran tout kòb la lè li genyen jwèt la.  Yon plas kote ki gen ansyen bagay moun kapab ale vizite pou konnen, wè bagay ki te pase lontan.  Yon kay kote ki gen anpil bagay moun kapab ale gade."
}, {
  "word": "Mizè",
  "description": "Eta yon moun ki pa kapab jwenn pyès nan tout bagay yon moun bezwen pou li viv avèk satisfaksyon.  Yon moun ki pa gen yon kote pou li mize, ki pa kapab gen espwa anyen; menm yon repa nan yon jounen."
}, {
  "word": "Mizik",
  "description": " Rezilta travay plizyè enstriman mizikal ki ap jwe ansanm pandan yo ap sib prensip do, re, mi, fa, sòl, la, si a."
}, {
  "word": "Mizikal",
  "description": "Nenpòt bagay ki bay yon son tankou mizik ou byen ki fè moun panse gen mizik ki ap jwe."
}, {
  "word": "Mizisyen",
  "description": "Moun ki konnen jwe yon enstriman mizikal.  Yon pwofesyonèl ki konnen jwe mizik."
}, {
  "word": "Mòd",
  "description": "Yon bagay tout moun ap fè nan yon epòk.  Yon fòm rad tout moun mete sou yo nan yon epòk.  Jan yon moun shwazi pou li fè yon bagay."
}, {
  "word": "Mòde",
  "description": "Kole de ranje dan sou yon bagay epi peze de ranje dan yo sou li."
}, {
  "word": "Modi",
  "description": "Move shans ki sib yon moun pandan tout lavi li paske li pa gen respè pou moun ki pi gran pase li."
}, {
  "word": "Mòn",
  "description": "Kote yon moso tè leve wo.  Pati sou tè a ki pi wo pase lòt pati sou tè a."
}, {
  "word": "Moniman",
  "description": "Yon bagay moun konstwi pou reprezante yon bagay ki te egziste nan yon moman ki pase; konsa piti yon peyi, yon zòn kapab wè, toujou sonje bagay sa a.  Yon moniman kapab reprezante yon moun tou, menm yon moun vivan."
}, {
  "word": "Monitè",
  "description": "Yon elèv ki gen responsablite pou kenbe lòd nan yon klas lè pa gen pwofesè nan klas la.  Yon aparèy ki sanble avèk yon televizyon e ki pèmèt moun li bagay ki ap pase andedan yon òdinatè e pase òdinatè a lòd tou."
}, {
  "word": "Monnen",
  "description": "Lajan ki fèt avèk metal tankou lajan avèk kuiv."
}, {
  "word": "Monseyè",
  "description": "Yon shèf nan legliz katolik ki reponsab legliz nan yon depatman nan peyi Ayiti."
}, {
  "word": "Monte",
  "description": "Soti anba pou ale anwo.  Travay yon avyon ki kòmanse vwayaje.  Pase pye sou yon sheval, yon bisiklèt, yon motosiklèt."
}, {
  "word": "Montè",
  "description": "Moun ki monte yon bagay.  Moun ki soti anba pou ale anwo, anlè."
}, {
  "word": "Montre",
  "description": "Mete dwèt endèks la nan direksyon yon bagay pou yon moun kapab wè li.  Mete yon bagay kote pou moun wè li."
}, {
  "word": "Monwi",
  "description": "Yon vil sou Wout Nasyonal Nimewo En an e ki tou pre Sen-Mak, anviwon swasant kilomèt de Pòtoprens.  Mashin ki ap vwayaje soti, ale nan nò peyi a toujou kanpe Monwi pou ashte griyo, fig, e latriye."
}, {
  "word": "Mòpyon",
  "description": "Yon ti tash blan deshay fè lè li rete sou pwèl yon moun pou anpil tan.  Li pi bon si yon moun pa kite deshay rete sou pwèl li pou plis ke 24 èdtan."
}, {
  "word": "Motivasyon",
  "description": "Rezilta konsèy yon moun resevwa ki fè li panse li kapab fè yon bagay li pate ap janm panse li kapab fè si li pate janm resevwa konsèy sa yo."
}, {
  "word": "Motosiklèt",
  "description": "Yon mashin ki gen de wou avèk yon motè.  Shofè yon motosiklèt shanje vitès avèk pye li e li bay gaz avèk men dwat li."
}, {
  "word": "Mòtye",
  "description": "Yon melanj ant plizyè bagay tankou lasho, sab, siman, ajil epi dlo."
}, {
  "word": "Moulen",
  "description": "Yon mashin peyizan ayisyen fè pou kraze kann e retire dlo ki nan nannan kann yo.  Yo fè bèf rale zèl moulen pou vire li.  Yon mashin avèk motè pou kraze pistash, mayi, pitimi.  Yon mashin ki kale diri."
}, {
  "word": "Moun",
  "description": "Kretyen.  Yon èt vivan ki kòmanse viv sou tè a depi plizyè milye ane, ki gen de men, de pye e ki mashe sou de pye yo.  Yon moun kapab pale, refleshi, li, ekri, e viv nan sosyete."
}, {
  "word": "Mouri",
  "description": "Eta yon èt vivan, yon moun ki sispann respire, sispann viv."
}, {
  "word": "Moush",
  "description": "Yon ensèk ki gen zèl pou vole, ki gen sis pye e ki renmen bagay sal.  Moush kapab transpòte maladi bay moun lè li fini pran mikwòb yon kote epi vini poze sou moun, manje moun."
}, {
  "word": "Moushwa",
  "description": "Yon moso twal pou siye figi ou byen mare tèt.  Se fi ki mare tèt yo nan sosyete ayisyen yo."
}, {
  "word": "Mouton",
  "description": "Yon moun ki pa konnen kijan pou li defann tèt li.  Inosan.  Yon bèt nan fanmiy kabrit ki pa gen kòn.  Se premye bèt syantis rive fè nan repwodiksyon atifisyèl, yon eksperyans ki te fèt nan finisman ane 1990 yo."
}, {
  "word": "Mouye",
  "description": "Eta yon bagay ki gen yon likid tankou dlo sou li, andedan li."
}, {
  "word": "Mov",
  "description": "Yon koulè ki sanble avèk koulè ble ki melanje avèk koulè wouj."
}, {
  "word": "Move",
  "description": "Fashe.  Yon moun ki gen pli nan mitan fon li, ki pa kontan e ki pa ap ri pou pyès rezon."
}, {
  "word": "Mozayik",
  "description": "Bèl ti moso beton ki pase nan fou lè yo te ap fèt e konstriktè kay mete atè a andedan shanm yon kay."
}, {
  "word": "Mwa",
  "description": "Yonn nan douz pati nan yon ane.  Gen sèt mwa nan yon ane ki gen tranteen jou nan yo:  Janvye, Mas, Me, Jiyè, Out, Oktòb, Desanm.  Gen yon sèl mwa, Fevriye, ki gen 28 ou byen 29 jou nan yon ane.  Gen 4 mwa ki gen trant jou:  Avril, Jyen, Septanm, Novanm.  Malgre diferans ki gen nan kantite jou nan mwa yo, shak trant jou nan yon ane se yon mwa."
}, {
  "word": "Mwatye",
  "description": "Nenpòt nan de pati ki sou shak de bò mitan yon bagay.  Yonn nan de pati yo lè yon bagay divise an de pati egal."
}, {
  "word": "Mwayen",
  "description": "Posiblite ki gen disponib pou itilize.  Lajan moun posede pou li depanse nan sa li vle."
}, {
  "word": "Mwayèn",
  "description": "Yon kantite, gwosè ki ant pi gwo a e pi piti a.  Nòt yon pwofesè bay elèv nan klas li pou nivo rezilta travay elèv la."
}, {
  "word": "Mwayènaj",
  "description": "Yon epòk ant senkyèm e kenzyèm syèk la.  Gen anviwon mil-kat-san ane depi moman sa pase."
}, {
  "word": "Mwen",
  "description": "Yon pwonon ki ranplase moun ki ap pale a."
}, {
  "word": "Mwens",
  "description": "Retire nan…  Absans yon kantite nan yon lòt kantite ki pi gwo, laj.  Siy sa a, -."
}, {
  "word": "Myèl",
  "description": "Yon ti bèt ki viv an koloni e tout ti bèt sa yo se mal eksepte yonn nan yo, rèn nan.  Ti bèt sa yo fè yon nish pou ponn, kove ze yo.  Andedan nish sa li lage yon siwo ki rele myèl tou.  Siwo sa gen anpil vitamin nan li e moun renmen li."
}, {
  "word": "N",
  "description": "Katòzyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Naje",
  "description": "Fè mouvman nan dlo pou rete sou dlo a, san plonje."
}, {
  "word": "Najè",
  "description": "Moun ki konnen naje.  Moun ki konnen fè mouvman pou rete sou dlo, san plonje nan dlo a."
}, {
  "word": "Nan",
  "description": "Andedan.  Okipe mitan, mwatye yon bagay.  Okipe nenpòt pozisyon andedan yon bagay."
}, {
  "word": "Nanm",
  "description": "Pati envizib nan tout manb kò moun ki ede moun fè tout sa moun kapab fè tankou viv.  Potansyalite ki disponib nan yon moun.  Kwayans moun gen nan yon bagay, nan Bondye."
}, {
  "word": "Nannan",
  "description": "Bagay ki andedan yon bagay, yon fri tankou mango, zaboka, zoranj e latriye.  Se pati sa a moun manje nan fri yo."
}, {
  "word": "Nasyon",
  "description": "Yon peyi endepandan ki gen fontyè li e ki gen pwòp leta li avèk gouvènman li.  Tout bagay ki rantre nan konstitisyon yon peyi."
}, {
  "word": "Nasyonal",
  "description": "Tout bagay ki gen rapò avèk yon nasyon.  Rekonesans pitit yon peyi genyen pou li tankou ale nan lagè.  Patriyotism.  Tout bagay ki andedan yon nasyon, tout bagay ki fèt nan yon peyi."
}, {
  "word": "Nasyonalite",
  "description": "Tout kalite moun genyen ki idantifye yo avèk yon peyi.  Santiman andedan yon moun ki fè li fasil pou moun rekonèt nan ki peyi li soti.  Shanjman santiman, kont yon peyi, pou yon nouvo peyi yon moun adopte pou peyi li."
}, {
  "word": "Nati",
  "description": "Fason yon bagay ye.  Tout bagay ki egziste.  Yon bagay moun pa janm kapab shanje.  Jan tout planèt yo vire sou kote solèy la."
}, {
  "word": "Natirèl",
  "description": "Eta yon bagay ki rete tankou lè li te apèn parèt nan la nati.  Bagay ki gen rapò avèk nati a, lanati."
}, {
  "word": "Ne",
  "description": "Kote de ou plis bagay mare ansanm.  Yon mezi moun ki ap kondi bato yo itilize pou di nan ki zòn sou lanmè a yo ye."
}, {
  "word": "Nè",
  "description": "Eksitasyon yon moun santi andedan li ki pouse li anvi fè yon bagay e tout tan li pa fè bagay la ou byen yon bagay ki sanble avèk sa a li anvi fè a, eksitasyon an ap kontinye ogmante.  Pati andedan kò moun ki bay eksitasyon."
}, {
  "word": "Nèf",
  "description": "Dizyèm shif nan nonb pozitif yo.  Kat plis senk.  Yuit plis en.  9.  Yon bagay ki apèn fini fèt e moun poko janm itilize."
}, {
  "word": "Nèg",
  "description": "Tout moun koulè nwa yo.  Moun sa yo te premye parèt sou kontinan afriken an, gen moun nwa nan tout peyi sou tè a konnye a."
}, {
  "word": "Negatif",
  "description": "Yonn nan de pòl elektrisite yo (avèk pozitif) kote kouran rantre nan sous elektrisite a ankò.  Yon siy mwens operasyon (-) ki montre gen yon kantite ki ap ale soti nan yon lòt kantite."
}, {
  "word": "Nègès",
  "description": "Yon jèn fi ki gen anpil enèji nan kò li.  Vrè laj pou rele yon fi nègès, pou mojorite fi, se sèz ane.  Wanga Nègès, Yon ti zwazo ki gen bèk long e ki toujou ap manje polèn nan flè ki apèn ouvri."
}, {
  "word": "Nèj",
  "description": "Yon poud blan ki soti nan espas e ki tonbe sou tè a nan peyi ki fè frèt anpil yo.  Pou nèj tonbe, tanperati a oblije rete pi wo ke zewo degre Celcius (0ºC) ou byen trant-de degre Fareinheit (32ºF).  Lè nèj tonbe sou yon bagay tanperati li pi wo pase 0ºC, li fonn pou bay dlo; kidonk anpil nèj kapab bay anpil dlo.  Dlo nèj la ap transfòme an glas si wotè tanperati nan zòn nan pa janm monte.  Se sa ki fè moun nan peyi fredi yo konnen oblije mashe sou glas nan sezon ivè."
}, {
  "word": "Nen",
  "description": "Yon pati nan figi moun ki ant de je yo avèk boush la e ki gen de tou nan li pou pèmèt respirasyon fèt san pwoblèm.  Krèt.  Pati devan yon mashin e devan anpil lòt bagay tou."
}, {
  "word": "Nesesè",
  "description": "Yon bagay ki oblije egziste pou yon lòt bagay fèt.  Yon bagay moun pa kapab viv san li tankou lè."
}, {
  "word": "Nesesite",
  "description": "Eta yon bagay ki nesesè.  Eta yon bagay ki oblije egziste pou yon lòt bagay kapab egziste, pase, rive, pou yon kondisyon akonpli.  Eta yon bagay ki gen twòp enpòtans."
}, {
  "word": "Netwayaj",
  "description": "Aksyon yon moun pou fè yon bagay, yon kote vini pwòp.  Netwaye yon bagay, yon kote."
}, {
  "word": "Netwaye",
  "description": "Fè yon kote vini pwòp.  Retire tout bagay ki sal, ki fè yon kote sanble avèk bagay sal.  Mete pwoprete nan yon bagay, yon kote."
}, {
  "word": "New York",
  "description": "Kapital komèsyal peyi Etazini.  Pi gwo vil nan yonn nan senkant divizyon nan peyi Etazini an ki pote menm non avèk divizyon sa a.  Kapital politik leta New York se Albany."
}, {
  "word": "Nikaragwa",
  "description": "Yon peyi nan kontinan Amerik la e nan Amerik Santral kote moun yo pale Espanyòl.  Kapital peyi sa se Managwa."
}, {
  "word": "Nimewo",
  "description": "Shif.  Yon eleman matematik ki pèmèt moun fè diferans ant plizyè bagay tankou yon kantite paj nan yon jounal ki soti shak jou."
}, {
  "word": "Nimewote",
  "description": "Shak etap ki pase pou fè diferans ant plizyè nimewo.  Mete shif, nonb sou shak bagay nan yon gwoup pou fè diferans ant shak bagay nan gwoup la."
}, {
  "word": "Nissan",
  "description": "Yon konpayi mashin Japonè ki fè ti mashin, mwayèn mashin e gwo mashin."
}, {
  "word": "Nò",
  "description": "Yonn nan kat direksyon kadinal yon ki pèpandikilè a lès avèk lwès.  Si yon moun ap ale nan direksyon nò, lès sou bò dwat li e lwès sou bò gosh li; konsa sid dèyè li."
}, {
  "word": "Nòmal",
  "description": "Jan tout moun espere yon bagay, yon moun dwe ye."
}, {
  "word": "Nòmalize",
  "description": "Mete yon bagay nan eta nòmal li."
}, {
  "word": "Non",
  "description": "Yon mo ou byen plizyè mo ansanm ki ede moun idantifye yon moun.  Yon mo moun itilize pou fè yon lòt moun konnen yon bagay pa posib pou li reyalize, pou rive, pou regle e latriye.  Yon repons negatif pou yon kesyon ki te merite yonn nan de repons sa yo:  Non ou byen Wi."
}, {
  "word": "Nòt",
  "description": "Lajan papye.  Yon moso papye ki fè konnen ke yon moun gen kòb li te prete yon lòt moun.  Moun ki posede moso papye sa a kapab resevwa lajan kash pou li.  Tèks yon moun ekri nan yon kaye ou byen nenpòt lide yon moun mete sou papye pou konsève li."
}, {
  "word": "Nou",
  "description": "Yon pwonon ki ranplase yon yon gwoup moun.  Plizyè moun ansanm.  Moun ki di, Nou, rantre nan gwoup moun nan tou."
}, {
  "word": "Nouri",
  "description": "Bay yon nenpòt èt vivan manje.  Travay granmoun ki bay timoun, ti bebe manje paske yo pa kapab manje pou kont yo."
}, {
  "word": "Nouris",
  "description": "Moman apre yon femèl fini pouse yon pitit mete deyò vant li e kantite tan li pran pou repran fòm li te genyen anvan gwosès la."
}, {
  "word": "Nouriti",
  "description": "Nenpòt repa moun manje e ki bay enèji, gwosè, kwasans."
}, {
  "word": "Nouvèl",
  "description": "Yon emisyon nan radyo, televizyon ki pale de tout sa ki ap pase nan yon peyi, nan lemond.  Enfòmasyon sou yon bagay, yon moun.  Nouvèl Jenerasyon, Yon tip mizik ayisyen ki parèt nan ane katreven yo.  Gwoup ki fè mizik sa yo shante an Kreyòl yon fason pou separe nouvo stil mizik yo a avèk ansyen mzik yo shantè te konnen shante nan lang Fransè."
}, {
  "word": "Nouvo",
  "description": "Nenpòt bagay yon moun apèn konnen.  Yon bagay yon moun rankontre, wè premye fwa.  Yon bagay ki apèn fèt."
}, {
  "word": "Novanm",
  "description": "Yonn nan kat mwa nan yon ane ki gen trant jou nan li e se li ki onzyèm mwa nan yon ane tou."
}, {
  "word": "Nòvèj",
  "description": "Yon peyi sou kontinan Ewòp la ki sou kote Suèd."
}, {
  "word": "Nwa",
  "description": "Yon koulè ki idantifye moun ki soti sou kontinan afriken an.  Yon koulè ki sanble avèk koulè lannwit.  Yon koulè ki kòmanse idantifye tout bagay ki negatif avèk eksperyans esklavaj la.  Nwa te reprezante yon koulè gwo notab tankou wa yo, bondye nan antikite yo te konnen mete sou yo pou rad. "
}, {
  "word": "Nwasi",
  "description": "Fè yon bagay vini gen koulè nwa.  Moman lè klate jounen an ap disparèt pou bay lannwit plas."
}, {
  "word": "Nwaye",
  "description": "Eta yon bagay ki rete fè twòp tan anba dlo epi li toufe."
}, {
  "word": "Nwèl",
  "description": "Selebrasyon jou nesans Jezi Kris ki tonbe jou vennsenk nan mwa Desanm shak ane.  Se pi gwo fèt nan yon ane paske tout moun, nan tout klas, nan tout sosyete selebre li."
}, {
  "word": "Nyaj",
  "description": "Yon gwo kantite lè moun sou tè a kapab gade nan lespas e ki sanble yo toujou ap deplase."
}, {
  "word": "O",
  "description": "Kenzyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Obsede",
  "description": "Yon kantite kwayans yon moun genyen.  Eta yon moun ki tèlman anvi yon bagay li kapab fè nenpòt bagay pou jwenn bagay sa a.  Eta yon moun ki gen anpil pasyon pou yon bagay."
}, {
  "word": "Òdinatè",
  "description": "Yon mashin, entelijan anpil, ki fè yon revolisyon nan fason moun kominike avèk lòt moun, avèk lòt mashin e konsève tèks yo ekri.  Gen anpil diferans nan òdinatè, men se de diferans ki pi enpòtan:  Sèvitè avèk Pèsonèl.  Malgre diferans sa yo, tout òdinatè gen senk pati sa yo:  klavye, monitè, sourit, òdinatè a menm, avèk enprimè a.  Moun rele tout senk pati sa yo òdinatè, men òdinatè a se kote ki resevwa kòmand klavye a avèk sourit la epi voye kòmand sa yo nan yon diskèt, yon enprimè ou byen nenpòt lòt mashin byen lwen pandan li ap itilize yon liy telefòn.  Mashin sa pèmèt moun ekri nenpòt longè donkiman soti nan yon lèt pou rive nan plizyè milye fraz tankou yon liv.  Yon moun ki itilize òdinatè pou ekri kapab mete nenpòt imaj nan tèks la e li kapab fè lèt yo nenpòt gwosè.  Bagay yon moun ekri sou òdinatè kapab enprime sou papye ou byen konsève sou yon diskèt pou itilize yon lòt lè.  Nenpòt tèks moun ekri sou òdinatè, mashin nan kapab faks li, voye li sou fòm lèt-eletwonik bay yon lòt òdinatè, e latriye.  Moun kapab itilize òdinatè nan plas televizyon, faks mashin, aparèy telefòn, repondè telefòn e anpil lòt bagay toujou. "
}, {
  "word": "Oditè",
  "description": "Moun ki shita, rete pou koute diskou yon lòt moun.  Anplwaye kontribisyon ki ap envestige jan moun kalkile enpo yo peye pou wè si moun sa yo byen kalkile sa yo peye a.  Yon gwoup kontab ki sèlman revize travay lòt kontab pou wè si yo sib prensip kontablite nan travay yo."
}, {
  "word": "Odyans",
  "description": "Yon gwoup moun ki ap koute yon moun ki ap fè yon diskou.  Moun ki ap koute yon estasyon radyo.  Moun ki ap gade yon estasyon televizyon."
}, {
  "word": "Ofri",
  "description": "Lonje yon bagay bay yon moun san li pa mande bagay la.  Pwomèt yon moun yon bagay, sèvis san li pa mande."
}, {
  "word": "Òganizasyon",
  "description": "Plizyè moun ki reyini, ap travay ansanm, e yo ap shashe menm bagay la pou tèt yo ou byen pou yon konpayi.  Plizyè moun ki mete tèt ansanm pou pousib yon lide tankou yon lide biznis."
}, {
  "word": "Ogmantasyon",
  "description": "Yon bagay ki vini an plis sou yon lòt bagay."
}, {
  "word": "Ogmante",
  "description": "Mete yon bagay sou yon lòt pou fè li vini pi plis, pi gwo."
}, {
  "word": "Okay",
  "description": "Pi gwo vil nan Depatman Sid la e se li ki kapital depatman sa a tou."
}, {
  "word": "Òkèt",
  "description": "Yon kontraksyon nan gòj yon èt vivan ki anpeshe lè soti pou moun nan respire nòmalman.  Moun ki gen òkèt kapab santi yon ti sekous prèske shak dis segond konsa.  Sa a se rezilta lè avèk bagay ki anpeshe lè a sikile a.  Anvan kèk moun mouri yo genyen yon òkèt ki kontinye a diminye pandan moun nan ap avanse pi pre lanmò a."
}, {
  "word": "Oktòb",
  "description": "Dizyèm mwa nan yon ane.  Gen tranteen jou nan mwa Oktòb la.  Se mwa lekòl nan peyi Ayiti kòmanse ane lekòl la ki ap ale dire nèf mwa."
}, {
  "word": "Okton",
  "description": "Yon anplwaye nan yon biwo lakomin yo ki responsab ouvri pòt biwo sa a shak jou travay, fè majistra konnen gen moun ki vini kote li e fèmen pòt biwo a apre jounen travay la."
}, {
  "word": "Onbwèl",
  "description": "Parasòl.  Yon bagay ki fèt avèk saten e tou won tankou moso yon boul moun itilize pou bare solèy, pare lapli.  Dlo lapli a tonbe sou onbwèl la epi li sib fòm won a pou ale tonbe atè."
}, {
  "word": "Ond",
  "description": "Tout espas vid ki egziste, yon kote gen anpil shanjman nitirèl ki ap fèt, men je moun pa kapab wè yo."
}, {
  "word": "Ondiras",
  "description": "Yon peyi nan kontinan Amerik la kote moun yo pale Espanyòl.  Ondiras se yonn nan peyi Amerik Santral la e kapital li se Tegisigalpa."
}, {
  "word": "Onz",
  "description": "Dezyèm nonb pozitif ki gen de shif nan li apre dis.  11. Dis plis en.  Sis plis senk.  Douz mwens en."
}, {
  "word": "Opalè",
  "description": "Yon aparèy elektrik ki gen yon moso leman andedan yon woulo fil kouran ki kapab resevwa yon son de yon mikwo epi fè son an vini fò anpil."
}, {
  "word": "Operasyon",
  "description": "Tout travay ki fèt pou bay yon rezilta.  Kat mwayen aritmetik yo pou jwenn yon rezilta:  adisyon (+), soustraksyon (-), miltiplikasyon (x) avèk divizyon (÷)."
}, {
  "word": "Opoze",
  "description": "Pran yon pozisyon kont yon lòt.  Mashe nan direksyon nò sou menm liy avèk yon moun ki ap mashe nan direksyon sid.  Aji kont yon lide."
}, {
  "word": "Opozisyon",
  "description": "Politisyen ki pa gen menm lide pou devlopman yon peyi avèk prezidan an.  Pozisyon moun ki kont gouvènman yon peyi.  Aksyon moun ki pran pozisyon kont yon lòt."
}, {
  "word": "Orikilè",
  "description": "Dwèt ki pi piti a nan tout dwèt men moun.  Kòmanse konte nan dwèt pous la, li se senkyèm dwèt la."
}, {
  "word": "Orizontal",
  "description": "Pozisyon ki sanble avèk pozisyon fas yon dlo dòmi.  Yon pozisyon ki pèpandikilè a pozisyon vètikal la.  Menm pozisyon avèk koushe."
}, {
  "word": "Oseyan",
  "description": "Lanmè.  Yon kantite dlo ki sanble li pa gen finisman tèlman li laj, li anpil."
}, {
  "word": "Oseyanik",
  "description": "Yonn nan senk kontinan sou tè a ki pi piti pase  lòt kat kontinan yo.  Ostrali se pi gwo peyi e pi gwo il sou kontinan sa a ki gen plizyè il nan li.  Nenpòt bagay ki gen rapò avèk oseyan."
}, {
  "word": "Ostrali",
  "description": "Yon gwo il ki prèske fòme tout kotinan Oseyanik la pou kont li."
}, {
  "word": "Otèl",
  "description": "Yon kay ki gen anpil shanm nan li kote moun ale pou yo pase yon kantite tan lè yo pa pre kay yo.  Moun nan yon otèl peye yon kòb pou shak jou yo pase nan otèl la.  Toujou gen otèl nan tout gwo vil paske gen anpil moun ki toujou ap vizite gwo vil yo."
}, {
  "word": "Oto",
  "description": "Otomobil.  Yon bèl mashin yon moun posede pou transpòte limenm avèk rès fanmiy li.  Nenpòt mashin yon moun posede pou transpòte moun."
}, {
  "word": "Otobis",
  "description": "Yon gwo mashin ki gen shèz pou tout moun shita.  Mashin sa a pote anpil moun, men li pa pote anpil shay tankou gwo sak lou."
}, {
  "word": "Òtograf",
  "description": "Fason mo nan yon lang fèt pou ekri.  Lide, prensip pou ekri mo nan yon lang.  Yon mwayen moun itilize pou yo ekri sa moun di lè yo ap pale yon lang."
}, {
  "word": "Otomatik",
  "description": "Yon bagay yon moun bezwen fè yon sèl travay pou bagay la kontinye fèt san rete.  Shak bal nan yon revolvè bezwen yon kout gadjèt pou soti, tout bal nan yon mitrayèz bezwen yon sèl kout gadjèt; kidonk tire bal nan mitrayèz se yon bagay otomatik."
}, {
  "word": "Otomobil",
  "description": "Oto.  Yon bèl mashin yon moun posede pou transpòte limenm avèk tout rès fanmiy li.  Nenpòt mashin yon moun genyen pou transpòte moun."
}, {
  "word": "Otonomi",
  "description": "Eta yon moun, yon gwoup moun, yon òganizasyon, yon peyi ki gen yon shèf, men shèf la kite li pran kèk desizyon.  Yon nivo libète ki toupre endepandans."
}, {
  "word": "Otorite",
  "description": "Moun ki gen pouvwa pou egzèse sou lòt moun e pouvwa sa a mashe avèk kèk responsablite tou."
}, {
  "word": "Otorizasyon",
  "description": "Pèmisyon moun ki gen otorite bay moun ki pa kapab aji san pèmisyon sa a, otorite sa a pou yo aji nan tout libète posib."
}, {
  "word": "Otorize",
  "description": "Bay moun otorizasyon, pèmisyon pou yo fè bagay yo pa kapab fè san otorizasyon."
}, {
  "word": "Otowout",
  "description": "Yon wout plizyè liy mashin kapab kouri sou li yonn sou kote lòt an vitès e pa gen limyè sikilasyon sou wout sa."
}, {
  "word": "Otrefwa",
  "description": "Ekspresyon pou pale de yon epòk, yon bagay ki te pase san konnen, sonje vrèman moman lè epòk sa a, bagay sa a te pase."
}, {
  "word": "Ou",
  "description": "Yon pwonon.  Moun itilize li pou pale dirèkteman avèk yon moun.  Ou byen, De mo moun itilize ansanm pou di si se pa yon bagay se yon lòt bagay."
}, {
  "word": "Oumenm",
  "description": "Mo moun ki ap kominike avèk lòt moun itilize pou mete plis fòs nan sa yo ap di a epi fè moun yo ap eseye kominike avèk li a santi sa a."
}, {
  "word": "Out",
  "description": "Yuityèm mwa nan yon ane.  Yonn nan de mwa ki fè plis shalè sou kote mwa Jiyè a.  Yonn nan sèt mwa yon ane ki gen tranteen jou."
}, {
  "word": "Ouvè",
  "description": "Sa ki pase lè yon kouvèti, yon pòt ki te bare, fèmen yon kote soti kote li te ye a.  Devlope yon bagay ki te vlope, fèmen.  Ouvè Fèmen, Yon ti zèb ki febli e bese pi ba lè moun toushe li epi leve kanpe yon ti moman apre."
}, {
  "word": "Ouvri",
  "description": "Retire yon kouvèti, yon pòt ki te bare, fèmen yon kote.  Devlope yon bagay ki te vlope, fèmen.  Fè yon bagay, tankou boush yon moun, vini laj."
}, {
  "word": "Oval",
  "description": "Yon bagay ki gen yon fòm tankou yon wonn ki pese sou de bò, men de kwen yo pa fini rankontre.  Fòm boul ameriken yo jwe foutbòl yo a."
}, {
  "word": "Ovil",
  "description": "Yon repwodiksyon andedan kò yon femèl ki kapab vini fòme yon ze pou bay yon pitit."
}, {
  "word": "Ovile",
  "description": "Yon moman sou katozyèm jou depi yo fi te gen règ li epi yonn nan ovil li yo, sa ki pi gran an, avanse prèske nan boush koko li pou tann deshay.  Si ovil la jwenn deshay nan twa jou li pase nan boush koko fi a li ap kòmanse fòme yon ze ki ap ale bay yon pitit apre yon kantite tan."
}, {
  "word": "Ozalantou",
  "description": "Nan tout kwen yon bagay tankou dlo ki antoure yon il, yon bag sou yon dwèt yon moun."
}, {
  "word": "P",
  "description": "Sèzyèm lèt nan alfabèt lang Kreyòl la.  Li pwononse menm jan avèk mo \"pe\" ki vle di sispann pale, fèmen boush."
}, {
  "word": "Pa",
  "description": "Posesyon yon moun.  Leve pye yonn apre lòt epi depoze yo atè pou deplase yon kò.  Mo ki kanpe devan yon lòt mo pou di evite fè sa siyfikasyon mo ki vini apre a vle di."
}, {
  "word": "Paj",
  "description": "Yon bò nan shak fèy papye ant po yon liv ki gen ekriti sou li.  Yon pati nan yon istwa.  Konsa, yon fèy papye kapab gen de paj sou li."
}, {
  "word": "Pak",
  "description": "Yon fèt pou selebre Jezi Kris ki leve soti nan lanmò apre li te mouri jou Vandredi-Sen an.  Kretyen yo selebre fèt sa a jou dimansh apre Vandredi-Sen an.  Kote moun bare bèt pou yo pa ale flannen.  Kote ki gen anpil freshè, pye bwa, bèl zèb pou moun shita pran bon van, flannen avèk mennaj yo."
}, {
  "word": "Pakapala",
  "description": "Yon moun nan yon ti kominote ki toujou patisipe nan tout seremoni nan kominote a tankou maryaj, bal, vodou, kominyon san mèt seremoni an pa envite li.  Yon moun ki toujou reponn envitasyon li."
}, {
  "word": "Pakoti",
  "description": "Kèk rad mal fèt mashann twal vann nan mashe kote peyizan ki ashte rad.  Rad sa yo fèt nan rapidite."
}, {
  "word": "Pale",
  "description": "Ouvri boush epi kite mo moun kapab konprann soti nan boush la.  Bay yon mesaj, di yon moun sa li bezwen tande.  Bay yon odyans yon diskou.  Pale Anpil, Pale san rete, san rezon.  Di pawòl ki pa gen sans.  Pran anpil tan pou fini yon konvèsasyon, yon diskou."
}, {
  "word": "Palè",
  "description": "Moun ki ap pale.  Premye kay nan yon peyi kote biwo prezidan peyi a ye.  Nan kèk peyi, prezidan an rete avèk fanmiy li nan palè a tou."
}, {
  "word": "Palisad",
  "description": "Po yon twons palmis ki fann an moso long pou fè kay."
}, {
  "word": "Palmis",
  "description": "Yon pye bwa ayisyen itilize pou fè anpil bagay.  Palmis gen anpil pati nan li tankou kè a, fèy li, tash la, shou a, grap la, avèk twons la.  Li pa boujonnen apre moun koupe pye a, men shak grenn grap ki tonbe sou tè a kapab bay yon lòt pye palmis."
}, {
  "word": "Pandye",
  "description": "Mete prèske tout kò yon bagay ap balanse de bò nan lespas pandan yon ti pati nan bagay sa a kenbe li anlè e anpeshe li tonbe anba.  Koke, pou moun nan Depatman Latibonit la."
}, {
  "word": "Pans",
  "description": "Yon trip laj ki gen fòm yon boul andedan vant anpil èt vivan kote manje rete anvan yo ale nan lòt pati nan kò a ou byen ale nan poupou."
}, {
  "word": "Panse",
  "description": "Abilite moun genyen pou yo wè yon bagay nan lespri yo jan bagay la ap ale ye sou papye, nan reyalite.  Enstriksyon yon moun sib pou li fè yon bagay e enstriksyon sa soti nan lespri yon lòt moun."
}, {
  "word": "Pansè",
  "description": "Moun ki gen mwayen, kapasite pou panse e ki ap panse.  Lòt moun kapab aji avèk rezilta travay yon pansè."
}, {
  "word": "Pantalon",
  "description": "Kanson.  Yon rad gason mete sou yo e ki gen de janb menm jan avèk de janb moun."
}, {
  "word": "Panyen",
  "description": "Yon djakout ayisyen fè avèk ti moso banbou ki trese yonn nan lòt.  Plizyè ti moso banbou long ki kwaze ant yo epi lòt ki pi fèb trese ant sa ki kwaze yo.  Lè atizan fini fè anba yon panyen, li kòmanse pliye moso banbou ki te kwaze ant yo a sou anlè pou fè kwen panyen an.  Li kontinye trese pou jis li rive wotè li vle panyen ye a.  Baskèt.  Panye."
}, {
  "word": "Panyòl",
  "description": "Espanyòl.  Yon lang moun nan peyi Espay pale.  Yon lang ki itilize tout mo ki nan lang moun nan peyi Espay yo epi ki gen kèk lòt mo ogmante sou li.  Lang moun pale nan peyi tankou Dominikani, Venezwela, Ajantin, Meksik, Ondiras e latriye."
}, {
  "word": "Pap",
  "description": "Pi gwo shèf nan legliz Katolik ki ap viv nan peyi Itali, Ròm, ki kapital tout legliz katolik nan lemond."
}, {
  "word": "Papa",
  "description": "Yon gason ki te ansent yon fi epi fi a fè piti la.  Yon mari ki gen yon pitit menmsi se nan adopsyon li vini gen pitit la."
}, {
  "word": "Papay",
  "description": "Yon fri ki gen koulè vè lè li vèt e ayisyen fè legim avèk li.  Li gen koulè jón lè li mi e ayisyen fè bon ji avèk li.  Moun oblije bwè ji a apèn yo fini fè li paske li ap gate si li rete pou anpil tan.  Gen yon ti grenn nwa andedan fri sa a ki gen yon ti likid andedan."
}, {
  "word": "Papye",
  "description": "Yon fèy plat ki fèt avèk moso bwa moun prepare nan izin pou ekri, vlope kèk bagay, kouvri mi kay nan peyi frèt."
}, {
  "word": "Paradi",
  "description": "Yon kote tout moun panse yo ap ale viv apre yo fini mouri e san pwoblèm san yo pa janm mouri ankò.  Yon plas kote tout moun relijye espere yo ap ale apre yo fini mouri.  Yon plas nan syèl kote moun panse Bondye ap viv avèk zanj yo."
}, {
  "word": "Paranòy",
  "description": "Moun ki toujou panse lòt moun ap prepare pou fè yo mal, pou touye yo.  Moun fou."
}, {
  "word": "Paranoya",
  "description": "Eta yon moun ki paranòy."
}, {
  "word": "Parasòl",
  "description": "Onbwèl.  Yon bagay ki fèt pou moun mete sou tèt yo pou pare solèy.  Yon bagay ki fèt avèk saten e tou won tankou yon moso boul.  Moun itilize li pou bare solèy e pare lapli tou.  Dlo lapli a tonbe sou onbwèl la epi li sib fòm won a pou ale tonbe atè."
}, {
  "word": "Parese",
  "description": "Yon moun ki toujou panse li gen twòp tan devan li pou fè nenpòt travay li gen pou li fè.  Moun ki pa renmen travay ditou."
}, {
  "word": "Parèt",
  "description": "Soti nan yon eta envizib pou vini nan yon eta vizib.  Eta yon bagay, yon moun tout moun ap pale de li san rete nan radyo, nan televizyon; tout kote."
}, {
  "word": "Parèy",
  "description": "Yon mal avèk yon femèl bèt ki viv ansanm tankou yon gason avèk yon fi ki renmen, plase, marye.  Bay Parèy,  Aksyon yon mal bèt ki rantre zozo li andedan koko yon femèl bèt."
}, {
  "word": "Paryaj",
  "description": "Aksyon de ou byen plis moun ki mete ansanm, yo shak, yon bagay ki gen anpil valè pou yo avèk espwa yon evènman ap rive ou byen li pa ap rive.  Moun ki te prevwa evènman ap rive a gen dwa pran tout bagay yo te mete ansanm yo depi bagay la rive."
}, {
  "word": "Parye",
  "description": "Mete plizyè bagay ansanm pou reyalize yon paryaj."
}, {
  "word": "Pasan",
  "description": "Yon espas kote bagay pase.  Yon ti moso twal nan senti pantalon avèk kèk wòb kote mèt rad la pase yon sentiwon pou boukle li.  Moun ki ap pase yon kote."
}, {
  "word": "Pasay",
  "description": "Yon espas, yon pòt kote yon bagay kapab pase tankou lajè koko yon fi lè li ap pouse yon pitit."
}, {
  "word": "Pase",
  "description": "Soti lwen pou rive yon kote epi kontinye sou wout la san rete.  Fè mwayèn ki nesesè pou kite yon klas nan lekòl.  Yon mòd rad ki pa egziste ankò."
}, {
  "word": "Pasifik",
  "description": "San vyolans.  Yon pati lanmè ki nan kwen lwès kontinan Amerik la, kwen lès e nò kontinan Oseyanik la, kwen lès kontinan Ewòp e Azi."
}, {
  "word": "Pastan",
  "description": "Yon bagay yon moun kreye pou li fè pandan li ap tann yon moman rive pou li fè yon bagay ki pi enpòtan."
}, {
  "word": "Pasyon",
  "description": "Bagay yon moun vle fè san refleshi sou konsekans bagay sa, move kote bagay sa a.  Foli ki pouse moun reyalize bagay yo pate ap janm kapab reyalize si pate gen anvi sa pou reyalize bagay sa a.  Yon maladi anpil moun soufri ki kapab fè yo itil soyete ou byen detri sosyete."
}, {
  "word": "Pasyone",
  "description": "Eta yon moun ki gen pasyon, foli, anvi pou reyalize yon bagay, plizyè bagay."
}, {
  "word": "Pat",
  "description": "Yon poud ki mouye epi shak ti grenn poud yo kole yonn ansanm avèk lòt la; konsa tout vini fè yon sèl bagay.  Yon bagay mou moun itilize pou netwaye dan yo."
}, {
  "word": "Patat",
  "description": "Yon boul yon lyann donnen anba tè e moun manje li paske li dous, li gen anpil farin.  Lè lyann patat pase sou yon moso tè, rasin li rantre nan tè kote li gwosi pou fè boul la ki rele patat."
}, {
  "word": "Pati",
  "description": "Yon bò, yon kantite, yon kwen nan yon bagay.  Shak fwa jwè yon jwèt kat tankou pokè rekòmanse jwe.  Yon men kat."
}, {
  "word": "Patiraj",
  "description": "Yon teritwa kote yon shèf kòmande.   Moun itilize mo sa plis pou pale de yon pak kote yon bèt kòmande."
}, {
  "word": "Patisipan",
  "description": "Moun ki patisipe nan yon bagay tankou yon seremoni."
}, {
  "word": "Patisipasyon",
  "description": "Aksyon yon moun ki patisipe nan yon seremoni.  Aksyon yon patisipan."
}, {
  "word": "Patisipe",
  "description": "Bay kontribisyon, patisipasyon pou yon bagay kapab rive fèt.  Shak moun ki ale nan yon maryaj patisipe nan maryaj la."
}, {
  "word": "Patizan",
  "description": "Moun ki manb nan menm gwoup avèk yon lòt moun e ki kapab fè nenpòt bagay pou defann moun nan gwoup sa."
}, {
  "word": "Patriyòt",
  "description": "Sitwayen yon peyi ki toujou toupre pou defann peyi li kont nenpòt bagay tankou move pawòl lòt moun ap di kont peyi a.  Gèrye yon peyi."
}, {
  "word": "Patriyotik",
  "description": "Tout aksyon yon patriyòt pou peyi li.  Nenpòt aksyon patriyotism pou yon peyi.  Aksyon yon sitwayen pou defann peyi peyi li."
}, {
  "word": "Patriyotism",
  "description": "Lanmou pitit yon peyi gen pou peyi li e ki kapab pouse li fè nenpòt bagay, menm touye tèt li, pou sove peyi li.  Fòs andedan yon sitwayen ki pouse li ale nan lagè pou peyi li menm lè li konnen li kapab mouri."
}, {
  "word": "Pawòl",
  "description": "Nenpòt mo ki soti nan boush yon moun ki ap pale.  Pwomès yon moun bay yon lòt moun kenbe."
}, {
  "word": "Pay",
  "description": "Yon bagay ki fay tankou fèy sèsh yon pye bwa.  Anpil zèb sèsh ki rasanble yon kote."
}, {
  "word": "Pe",
  "description": "Eta yon moun ki sispann pale epi fèmen boush li pou pyès mo pa soti li."
}, {
  "word": "Pè",
  "description": "Yon nonb lè li divize pa de li ap bay yon rezilta ki pa gen pyès vigil.  Moun nan yon òganizasyon gason ki sakrifye tèt yo pou sèvi moun avèk Bondye e yo pa kashe aksyon yo.  Yon reprezantan Bondye nan legliz katolik.  De bagay ki pa gen pyès diferans ant yo de a e ki mashe ansanm.  Eta yon moun ki ap tranble pou yon bagay, yon moun."
}, {
  "word": "Pèkizisyon",
  "description": "Travay polis ki rantre andedan kay yon moun pou shashe yon bagay yo panse ki gen andedan kay moun nan.  Polis fè yon pèkizisyon lè yo panse yon moun gen zam, dwòg andedan kay yo.  Pou fè yon pèkizisyon, polis yo bezwen yon jij pou fè yon manda pou yo."
}, {
  "word": "Pèlen",
  "description": "Yon mashin moun itilize pou yo kenbe yon bèt ki pa kite moun pwoshe pre li tankou yon zwazo.  Pou kenbe yon bèt avèk pèlen, moun mete manje yo konnen bèt la renmen, yo ranje pèlen an yon fason pou li rate epi kenbe bèt la.  Pèlen Tèt, Yon liv Frank Etienne te ekri an Kreyòl pou yon pyès teyat.  Nan ane 1987, yon lòt Ayisyen ki rele Asselin Charles te tradui pyès la nan lang Anglè e film li te jwe nan New York."
}, {
  "word": "Pèsekisyon",
  "description": "Aksyon moun ki anpeshe lòt moun viv yon lavi nan lapè, san enkyetid.  Travay polis ki ale lakay yon moun prèske shak semèn pou wè si moun sa a pa gen zam andedan kay li malgre moun nan pa janm posede zam.  Travay yon kotri ki toujou ap shashe yon rezon pou joure, goumen avèk yon lòt kotri."
}, {
  "word": "Pelig",
  "description": "Yon zòn nan Depatman Sant la kote ki gen yon baraj sou flèv Latibonit la.  Tout moun rele baraj la Pelig tou.  Peligre."
}, {
  "word": "Peligre",
  "description": "Gade Pelig."
}, {
  "word": "Pèmisyon",
  "description": "Otorizasyon moun resevwa pou yo fè yon bagay yo pate ap kapab fè si yo pate resevwa otorizasyon sa a.  Libète yon moun jwenn nan men yon moun ki gen pouvwa pou kite yo fè yon bagay."
}, {
  "word": "Pen",
  "description": "Yon manje sèsh pat li fèt avèk farin, dlo, sèl, bè ou byen mantèg anvan li pase nan fou.  Kay kote pen an fèt la rele boulanje."
}, {
  "word": "Penalize",
  "description": "Pini yon moun tankou fè moun nan peye gwo kòb pou yon krim.  Anprizone yon moun ki vyole lalwa."
}, {
  "word": "Penensil",
  "description": "Yon moso tè pwent li rantre nan dlo.  Prèskil."
}, {
  "word": "Peng",
  "description": "Eta yon moun ki pa bay moun sa li posede fasil.  Jan kèk moun nan peyi a di peny."
}, {
  "word": "Pengwen",
  "description": "Yon plant peyizan ayisyen itilize pou bare plantasyon, jaden yo.  Plant sa a donnen yon grenn ki gen koulè vè lè li vèt e li gen koulè jón lè li mi.  Po grenn pengwen di anpil e andedan li gen yon ti grenn koulè mawon.  Non yon bèt."
}, {
  "word": "Pens",
  "description": "Nenpòt bagay ki gen de pwent ki gen yon fòs ap rale de pwent yo rankontre ansanm pou kenbe, peze yon bagay."
}, {
  "word": "Penso",
  "description": "Yon enstriman ki gen yon pwent, yon fas ki fèt avèk plim pou li kapab kenbe penti pou pase sou fas yon bagay tankou yon mi.  Travay yon gason ki ap pase zozo li sou koko yon fi san rantre li andedan."
}, {
  "word": "Penti",
  "description": "Yon likid travayè prepare nan izin pou shanje koulè, fè yon mi vini bèl tankou li nèf.  Yon desen ki sou yon moso twal blan ou byen yon moso papye yon moun fè avèk yon likid moun prepare nan izin.  Tablo."
}, {
  "word": "Pentire",
  "description": "Itilize yon penso, woulo pou pase penti sou fas yon bagay, yon mi, yon tablo, yon desen."
}, {
  "word": "Pentium",
  "description": "Yon pyès yon konpayi fè pou ede moun wè imaj ki kapab deplase sou ekran yon monitè, fè yon òdinatè travay pi vit e latriye.  Shak fwa yon nouvo Pentium fèt li ede moun plis avèk òdinatè.  Lè Pentium III te apèn fèt, gouvènman peyi Etazini pate vle li vann anvan konstriktè yo te fè kèk shanjman nan li."
}, {
  "word": "Peny",
  "description": "Yon enstriman plat, dan li gen lajè yon milimèt konsa e tout dan li yo sou liy.   Moun itilize li pou penyen, separe shak pye sheve yo avèk yon lòt pye sheve."
}, {
  "word": "Penyen",
  "description": "Demele plim, sheve nan tèt moun.  Pase yon peny nan plim, sheve yon moun pou dekòde, dekole pye sheve yo yonn avèk lòt."
}, {
  "word": "Pèp",
  "description": "Yon kantite moun ki ap viv nan yon zòn tankou yon vil, yon peyi.  Tout moun ki ap viv nan peyi Ayiti se pèp ayisyen an."
}, {
  "word": "Perimèt",
  "description": "Tout kwen yon bagay, soti nan yon pwent pou vire tou won epi retounen nan menm pwen an."
}, {
  "word": "Pèsiste",
  "description": "Kenbe yon pozisyon, yon lide malgre tout dekourajman pou fè li vini yon reyalite."
}, {
  "word": "Peso",
  "description": "Yon lajan moun itilize nan anpil peyi tankou Meksik, Dominikani e latriye.  Se yon kòb ki fèb anpil devan lajan ameriken an, dola."
}, {
  "word": "Pèsonèl",
  "description": "Tout moun ki ap travay nan yon biznis, yon òganizasyon e latriye.  Bagay yon sèl moun posede e kèk lè lòt moun pa menm konnen moun sa posede bagay sa a.  Pèsonèl Òdinatè, Yon ti  òdinatè moun kapab posede andedan kay yo pou fè menm travay moun kapab fè avèk yon gwo òdinatè eksepte konsève gwo dokiman nan memwa li."
}, {
  "word": "Petion-Ville",
  "description": "Gade Petyonvil."
}, {
  "word": "Petyonvil",
  "description": "Yonn nan plizyè pati ki fòme kapital Ayiti a, Pòtoprens, sou kote Kafou, Dèlma, kote milat avèk moun rish sèlman te konnen viv.  Vil sa pote non yon ansyen prezidan peyi Ayiti, Petion."
}, {
  "word": "Pewou",
  "description": "Yon peyi nan nò-lwès Amerik Sid, nan kontinan Amerik la.  Peyi sa gen fontyè avèk Bolivi, Brezil, Kolonbi e kapital li rele Lima.  Moun nan peyi sa pale Espanyòl."
}, {
  "word": "Peye",
  "description": "Bay lajan pou yon bagay. Bay yon konpayi, yon moun lajan pou sèvis li rann.  Peye Dèt, Remèt yon moun yon lajan ki te soti nan men li pou ale nan men yon lòt moun paske moun sa te pwomèt li ap remèt lajan an.  Travay yon moun ki rann yon sevis pou yon sèvis yon lòt moun te rann li."
}, {
  "word": "Peyi",
  "description": "Yon moso tè avèk fontyè kote ki gen yon prezidan, yon leta, yon gouvènman.  Yon nasyon endepandan kote moun kapab retounen shak fwa yo ale yon lòt kote."
}, {
  "word": "Peyizan",
  "description": "Moun ki ap viv nan yon peyi.  Moun nan yon peyi ki ap viv kote ki gen plantasyon, jaden lwen kapital peyi a, vil peyi a.  Moun nan yon peyi ki manke mwayen kominikasyon pou benefisye tout bote sivilizasyon."
}, {
  "word": "Piblik",
  "description": "Bagay ki fèt pou tout moun, tout moun gen dwa patisipe nan li, jwi avantaj li, itilize li tankou yon legliz, yon plas, yon pak."
}, {
  "word": "Pibliye",
  "description": "Fè yon bagay vini disponib pou piblik.  Eta yon bagay anpil moun vini konnen.  Ekri yon liv epi peye yon konpayi pou fè anpil kopi liv la pou mete li vann nan librèri.  Eta yon jounal ki disponib pou moun ashte."
}, {
  "word": "Pikan",
  "description": "Yon ti pwent file ki nan bransh anpil pye bwa.  Se yonn nan bagay peyizan ayisyen pi pè lè yo ap mashe nan raje san soulye nan pye yo paske pikan kapab rantre nan pye yo."
}, {
  "word": "Pike",
  "description": "Pouse pwent yon bagay, yon pikan nan yon pati nan kò yon moun jis pwent la rantre nan kò moun nan.  Sansasyon yon moun santi nan boush li ki tankou yon bagay ki ap rantre nan vyann boush li lè li gen yon bagay tankou piman andedan boush li."
}, {
  "word": "Pil",
  "description": "Anpil bagay, moun, ki rasanble ansanm.  Batri."
}, {
  "word": "Pilon",
  "description": "Yon twons bwa atizan ayisyen fouye yon bèl tou nan li epi moun itilize li pou kraze kèk grenn tankou mayi, pistash, kafe, pitimi e latriye."
}, {
  "word": "Pilonnen",
  "description": "Frape pye sou yon bagay avèk espwa li ap ale kraze.  Aksyon moun ki mete plat pye yo sou do pye yon moun pandan anpil moun, yon foul moun kanpe nan yon espas ki twò piti pou kantite moun yo."
}, {
  "word": "Pilòt",
  "description": "Moun ki kondi, pilote avyon.   Moun ki fè avyon, elikoptè vole."
}, {
  "word": "Pilote",
  "description": "Kodi, fè yon avyon, elikoptè vole."
}, {
  "word": "Pilye",
  "description": "Anpil bagay ki reyini, rasanble ansanm.  Plizyè pil ansanm."
}, {
  "word": "Piman",
  "description": "Grenn yon ti pye bwa kout ki kapab pike anpil.  Gen plizyè piman tankou piman-zwazon, piman-dous avèk piman-bouk.  Piman Bouk, Yon piman ki pi gwo pase piman-zwazo, men li pi piti pase piman-dous e li pike tou; yon ti kras mwens pase piman-zwazo.  Piman Dous, Yon piman ki pa pike, men moun ki ap fè manje renmen itilize li pou bay manje bon gou.  Moun manje piman-dous nan salad tou.  Piman Zwazo, Yon ti piman wouj e piti ki pike anpil."
}, {
  "word": "Pini",
  "description": "Fè yon moun soufri pou yon move bagay li fè tankou vyole lalwa, fè yon krim e latriye.  Mete yon moun nan prizon."
}, {
  "word": "Pipi",
  "description": "Yon likid jón ou byen gri ki soti nan koko, zozo yon moun, yon bèt paske kò li pa bezwen likid sa pou ede kò a devlope, rete an sante. "
}, {
  "word": "Pipirit",
  "description": "Yon bèl ti zwazo, mal la avèk femèl la kapab bo pandan yo ap vole.  Yonn toujou ale tout kote li gen pou li ale avèk parèy li."
}, {
  "word": "Pistash",
  "description": "Yon plan ki bay yon rasin ki divize an de pati:  yon pati fen e yon pati pwès.  Pati pwès la gen grenn andedan li e moun manje grenn sa yo.  Moun fè manba, bè avèk grenn nan."
}, {
  "word": "Pitimi",
  "description": "Yon plant peyizan ayisyen kiltive sou plantasyon yo.   Li bay yon grap ki gen anpil ti grenn nan li.  Gen de varyete pitimi:  yonn pye li pi kout e li gen pi bon gou pase lòt la ki pi wo.  Sa pye li pi wo a, moun ki ap kwit li gen pou yo mete anpil bagay nan li pou jwenn gou li."
}, {
  "word": "Pitit",
  "description": "Yon moun manman li avèk papa li te mete ansanm pou fè li nan moman manman an te ap ovile.  Pitit Fèy, Nenpòt moun lwa ki monte yon bòkò te trete maladi li, te touye yon moun pou li e moun oblije patisipe nan seremoni vodou bòkò a shak ane pou peye yon pati nan dèt li."
}, {
  "word": "Pitza",
  "description": "Yon manje ki fèt avèk farin e li kòmanse fèt tankou jan moun fè pat pen, men pat sa a pa gen leven nan li.  Lè moun nan fini plati pat la li mete sòs tomat sou li avèk kèk lòt bagay anvan li mete li nan fou."
}, {
  "word": "Piyajè",
  "description": "Moun ki patisipe nan yon piyay.  Moun ki pran plezi nan resevwa bagay nan men lòt moun."
}, {
  "word": "Piyay",
  "description": "Yon moman kote anpil moun resevwa libète pou yo pran tout kantite yo kapab pote nan yon kantite bagay.  Libète anpil moun pran pou yo kòmanse pran bagay lòt moun posede san moun nan pa bay otorizasyon pou pran bagay sa yo."
}, {
  "word": "Piye",
  "description": "Moman anpil moun pran anpil bagay yon moun te posede san moun nan pa bay otorizasyon pou pran bagay sa yo."
}, {
  "word": "Piyon",
  "description": "Yon vil nan Depatman Nò peyi Ayiti ki toupre Mayisad; anviwon 18 kilomèt konsa."
}, {
  "word": "Plak",
  "description": "Yon moso materyèl ki sanble avèk jansiv moun, ki gen dan nan li e ki kapab shita sou jansiv yon moun pou ranplase jansiv avèk dan moun.  Yon moso plastik tou won avèk ti tras sou ki gen mizik anrejistre sou li.  Nan ane 1980 yo konpakdis vini epi li ranplase plak."
}, {
  "word": "Plan",
  "description": "Preparasyon ki fèt pou konnen, anvan yon bagay rive, kijan li ap ale pase.  Desen sou papye pou montre kijan yon kay e anpil lòt bagay ap ale fèt."
}, {
  "word": "Plane",
  "description": "Aksyon yon bèt ki soti anlè pou desann anba, men li kite de zèl li ouvri pou ralanti vitès jan kò a ap tonbe sou tè a.  Plizyè moun te eseye plane nan fè eksperyans pou vole tankou zwazo e se eksperyans sa yo ki fè moun konprann kijan pou yo fè pou desann avyon atè.  Se zwazo avèk avyon ki vrèman kapab plane.  Aksyon yon moun ki bay yon bagay li posede nan yon biznis pou mèt biznis la kapab prete li lajan.  Moun sa ap resevwa bagay la lè li pote lajan avèk enterè retounen."
}, {
  "word": "Planèt",
  "description": "Plizyè kò nan lespas ki pa kole avèk tè a, ki pa gen limyè sou yo e ki ap vire fè wonn solèy la."
}, {
  "word": "Planifye",
  "description": "Prepare yon bagay pou li rive menm jan yon moun vle li rive.  Fè yon plan."
}, {
  "word": "Plant",
  "description": "Yon pye bwa ki piti, kout e ki kapab rete kout pou jis li seshe, mouri.  Gen anpil ti pye bwa kout tankou pye pwa, pye piman, mayi, pitimi e latriye peyizan kiltive nan jaden. Apre sezon jaden yo pase, plant la mouri epi kiltivatè yo sekle tè a pou plante menm grenn plant sa ankò. "
}, {
  "word": "Plantasyon",
  "description": "Yon tè kote moun fè jaden.  Kote ki gen plant nan tè kiltivatè ap tann yo donnen."
}, {
  "word": "Plante",
  "description": "Mete grenn yon plant nan tè pou li gèmen epi grandi.  Mete yon ti plant nan tè pou li kontinye grandi."
}, {
  "word": "Plantè",
  "description": "Moun ki mete grenn, plant nan tè.  Moun ki travay nan jaden e kiltive jaden."
}, {
  "word": "Plas",
  "description": "Nenpòt kwen ki egziste sou tè a.  Yon kote nan yon vil ki gen bèl flè, ban pou nenpòt moun shita nan kèk lè rezonab tankou soti nan sisè nan maten pou rive nan disè lannwit. "
}, {
  "word": "Plati",
  "description": "Fòse yon bagay vini plat."
}, {
  "word": "Plat",
  "description": "Asyèt.  Eta yon bagay ki pa gen gwosè.  Eta yon bagay ki gen fòm fas dlo ki pa ap souke.   Plat Pye, Pati nan pye yon moun ki toushe tè a lè li ap mashe san soulye nan pye li."
}, {
  "word": "Plato Santral",
  "description": "Yonn nan nèf divizyon nan peyi Ayiti yo e ki nan mitan peyi a avèk yon kwen li kole avèk Dominikani, yonn avèk Depatman Lwès la, yon lòt kwen avèk Depatman Latibonit e dènye kwen an kole avèk Depatman Nò a.  Kapital depatman sa a se Ensh."
}, {
  "word": "Plen",
  "description": "Mete bagay andedan yon lòt bagay pou jis anyen pa kapab antre andedan li ankò."
}, {
  "word": "Plenn",
  "description": "Moman lè yon bèt ap pote pitit andedan vant li.  Gwosès.  Kantite tan sa varye pou shak fanmiy bèt.  Yon kote ki gen anpil pye bwa, anba yo imid e li fè nwa tout tan."
}, {
  "word": "Plenyen",
  "description": "Travay yon moun ki ap rakonte mizè li, tribilasyon li bay yon moun avèk espwa moun sa a ap ede li rezoud pwoblèm sa yo.  Lamante.  Fè yon bri ki soti nan gòj san kite yon vrè mo soti.  Plenyen egzije anpil enèji."
}, {
  "word": "Plezi",
  "description": "Yon bagay yon moun renmen fè e li gen kè li kontan lè li ap fè bagay sa a.  Jwisans."
}, {
  "word": "Pli",
  "description": "Tras, mak kote yon bagay te vlope, pliye.  Tout rad ki fini lave gen pli sou li anvan moun pase li."
}, {
  "word": "Plim",
  "description": "Kèk ti bransh fil ki parèt soti nan kò moun avèk bèt.  Kèk lè tou yo grandi long sou kò moun ou byen bèt.  Sa ki pi long nan kò moun yo parèt nan tèt yo, anba zesèl yo, nan pati entim yo.  Kèk bèt tankou mouton gen anpil plim sou kò yo."
}, {
  "word": "Plis",
  "description": "Diferans, pi wo, ant kantite yon bagay te dwe ye e kantite li ye a.  Kantite ki ogmante sou yon bagay.  Ogmante de kantite, de nonb yonn sou lòt. "
}, {
  "word": "Plizyè",
  "description": "Anpil bagay ansanm e ki kapab menm bagay la ou byen diferan ant yo."
}, {
  "word": "Ploge",
  "description": "Rantre yon bagay nan pwent yon lòt pou kontinye distribye yon bagay tankou dlo, eltektrisite bay yon lòt zòn, yon lòt aparèy.  Danse avèk yon lòt moun yon fason pou tou de kò yo kole e deplase ansanm san dekole pou jis mizik la fini."
}, {
  "word": "Plonje",
  "description": "Pouse, fòse yon bagay rantre anba dlo.  Aksyon yon moun ki lage kò li nan dlo tankou yon rivyè, lanmè, pisin.  Yon moman kote yon avyon, yon zwazo, yon elikoptè kite wotè li te ap vole a pou desann pi ba e vit."
}, {
  "word": "Pò",
  "description": "Yon kwen nan lanmè kote bato rete pou yon debake e anbake mashandiz.  Anpil ti tou, kanal ki sou tout kò moun pou ede respirasyon kò a fèt."
}, {
  "word": "Pòdepè",
  "description": "Yon vil e kapital Depatman Nò Lwès peyi Ayiti.  Port-de-Paix."
}, {
  "word": "Poetik",
  "description": "Travay yon ekriven ki ekri tèks tankou poezi."
}, {
  "word": "Poezi",
  "description": "Yon fason kèk ekriven ekri plizyè ti moso tèks pou esplike yon ti moman, yon ti istwa, yon bagay imajinè.  Yon poezi sonnen tankou yon shante lè moun ap koute li."
}, {
  "word": "Pokè",
  "description": "Yon jwèt kat kote jwè yo mize lajan yon premye fwa pou kòmanse jwèt la.  Apre sa a, shak jwè ki panse yo gen kat pou genyen pati a mete plis kòb.  Jwè ki pa kapab mete plis kòb e ki konnen yo pa genyen gwo pwen nan men yo oblije kite jwèt la.  Konsa jwè ki gen anpil kòb avèk gwo pwen kapab kontinye mete plis kòb.  Kèk fwa tou moun ki gen plis kòb la konnen blofe lòt jwè a epi dekouraje li avèk lajan.  Jwè ki genyen an pa menm oblije montre kat ki te nan men li."
}, {
  "word": "Poko",
  "description": "Eta yon bagay ki bezwen plis tan pou li rive.  Yon mo ki ale devan lòt mo pou esplike yon bagay, yon shanjman ki ap ale fèt, rive, regle e latriye."
}, {
  "word": "Pòl",
  "description": "De sèl pozisyon yo ki nesesè pou bay elektrisite:  positif (+), negatif (-).  Elektrisite mashe an wonn, li soti nan pozisyon pozitif la pou ale nan pozisyon negatif la. "
}, {
  "word": "Polarizasyon",
  "description": "Yon travay shimik ki vini bay elektrisite epi dirije, rale  elektrisite a ale, vini sou yon pòl."
}, {
  "word": "Polèn",
  "description": "Yon pati jón nan lasi myèl.  Yon ti poud nan prèske tout flè e Wanga-nègès renmen manje li."
}, {
  "word": "Polis",
  "description": "Yon òganizasyon militè ki gen nan shak vil pou kenbe, mete lòd, sekirite nan vil peyi a.  Militè sa yo pa antrene pou ale nan lagè."
}, {
  "word": "Polisye",
  "description": "Yon moun ki nan gwoup militè ki fòme òganizasyon polis yo."
}, {
  "word": "Politik",
  "description": "Syans ki etidye gouvènman, kijan moun gouvène lòt moun.  Mannigans moun itilize pou montre yo se yon bon moun devan tout moun ki kandida pou yon djòb.  Aksyon moun ki ap shashe mwayen pou fè lòt moun vote pou yo nan yon eleksyon."
}, {
  "word": "Politisyen",
  "description": "Yon moun ki etidye syans ki montre moun kijan pou yo gouvène. Yon moun ki ap pratike politik.  Yon moun ki patisipe nan yon eleksyon."
}, {
  "word": "Polòy",
  "description": "Yon peyi ki nan mitan kontinan Ewòp la kote yo pale yon lang ki rele Pòtigè.  Peyi kote shèf legliz katolik la, Jan Pòl II, te fèt"
}, {
  "word": "Pòmdetè",
  "description": "Yon boul moun manje ki donnen anba tè e ki gen anpil farin nan li.  Li pran anpil tan pou kwit, men po li fen.  Moun renmen manje pòmdetè plizyè fason tankou fri, bouyi e melanje avèk lòt bagay:  bè, mayonèz, ze e latriye."
}, {
  "word": "Ponp",
  "description": "Yon mashin mekanik, elektrik ki kapab rale yon likid soti anba pou monte anlè.  Ponp mekanik la se yon bagay moun fè travay avèk fòs ponyèt, men ponp elktrik la mashe avèk elektrisite."
}, {
  "word": "Ponpye",
  "description": "Yon òganizasyon ki gen kamyon ki kapab pote dlo pou ale ede moun kay yo ap boule.  Kamyon òganizasyon sa yo itilize kapab pote anpil dlo pou voye sou dife e etèn dife a."
}, {
  "word": "Pontiac",
  "description": "Yon mak mashin e yon konpayi mashin ameriken."
}, {
  "word": "Ponyèt",
  "description": "De pati nan kò moun ki pandye nan shak zepòl moun.  Ponyèt yo kapab pliye nan direksyon do moun e sèlman nan mitan yo.  Dènye pwent ponyèt la gen pati ki rele men an."
}, {
  "word": "Popilarite",
  "description": "Sitiyasyon yon moun ki ap viv nan yon sosyete, men prèske tout moun nan sosyete sa konnen li.  Moun sa gen yon popilarite nasyonal.  Yon moun moun nan lòt sosyete konnen.  Moun sa gen yon popilarite entènasyonal.  Popilarite kapab fè anpil moun vote pou yon moun ki patisipe nan yon eleksyon."
}, {
  "word": "Popilasyon",
  "description": "Kantite moun ki ap viv yon kote tankou yon zòn, yon peyi e latriye."
}, {
  "word": "Popilè",
  "description": "Eta yon moun ki posede yon popilarite.  Yon bagay ki gen rapò avèk pèp tankou yon moun anpil moun konnen, yon pèp konnen."
}, {
  "word": "Port-de-Paix",
  "description": "Gade Pòdepè."
}, {
  "word": "Posede",
  "description": "Gen pwopriyete yon bagay.  Gen dwa pou deside sou avni yon bagay, yon moun."
}, {
  "word": "Pòsh",
  "description": "Yon tou yon koutiryè, yon tayè fè nan yon rad pou moun ki mete rad la kapab mete sa yo bezwen itilize vit tankou yon kle kay, yon bous, lajan."
}, {
  "word": "Posib",
  "description": "Eta yon bagay ki kapab pase, vini, rive e latriye e shans sa yo piti."
}, {
  "word": "Posiblite",
  "description": "Opòtinite, okazyon ki egziste pou yon bagay vini posib."
}, {
  "word": "Poste",
  "description": "Itilize Lapòs pou voye yon lèt ou byen kèk lòt bagay yon kote.  Mete yon siy yon kote pou moun wè li."
}, {
  "word": "Postitisyon",
  "description": "Aksyon moun ki bay lòt moun itilize yon pati nan kò yo tankou koko yon fi pou lajan.  Pwofesyon yon bouzen."
}, {
  "word": "Pòtatif",
  "description": "Yon bagay moun kapab kenbe avèk men yo pou pote li. "
}, {
  "word": "Pote",
  "description": "Deplase yon bagay soti nan yon plas pou ale nan yon lòt san bagay la pa toushe tè depi kote li soti pou jis kote li gen pou li rive a."
}, {
  "word": "Pòtigè",
  "description": "Yon lang ki itilize anpil mo ki sonnen menm jan avèk mo Espanyòl e moun nan peyi Brezil avèk peyi Polòy pale lang sa."
}, {
  "word": "Pòtoprens",
  "description": "Port-au-Prince.  Premye e yonn nan pi ansyen vil nan peyi Ayiti.  Se vil sa ki kapital peyi a.  Depatman kote vil sa ye a rele Depatman Lwès e se li ki kapital depatman sa tou.  Pati yo ki pi remakab nan vil sa rele Petyonvil, Dèlma, Kafou, anba lavil e latriye."
}, {
  "word": "Pòtray",
  "description": "Pati nan kò yon moun, yon bèt kote pwent zo kòt li yo vini pase anlè vant li a pou kouvri kè li avèk kèk lòt pati sou kote kè a."
}, {
  "word": "Pou",
  "description": "Lè mo sa kanpe devan yon lòt mo li vle di yon moun posede sa mo ki vini apre li a vle di.  Yon ti bèt ki renmen rete kote ki gen plim tankou sheve pou li fè pitit, miltipliye."
}, {
  "word": "Poud",
  "description": "Krabinay yon bagay kote li enposib pou rekonèt bagay sa, eksepte si li gen yon sant, yon koulè, e latriye.  Yon pwazon bòkò Ayisyen prepare e yo itilize li pou touye yon énmi yo, énmi lót moun.  Yon krabinay yon bagay moun ki ap abiye mete anba bwa yo, sou kou yo, kèk fwa sou lestomak yo pou fè yo santi bon."
}, {
  "word": "Poul",
  "description": "Yon zwazo domestik ki ponn ze, remen mashe plis pase li vole e moun renmen manje vyann li anpil.  Eta yon fi ki renmen bay gason koushe li.  Aksyon yon elèv lekòl ki ap gade sa yon lòt elèv toupre li ap fè nan yon egzamen pou li fè menm bagay la tou."
}, {
  "word": "Poule",
  "description": "Gade sa yon elèv toupre ap fè nan yon egzamen pou fè menm bagay la tou."
}, {
  "word": "Poulèt",
  "description": "Yon ti poul ki poko janm ponn ze, ki poko fè pitit.  Vyann poulèt prann mwens tan pou li kwit pase vyann poul."
}, {
  "word": "Poupou",
  "description": "Pouse enpe nan manje yon kò pa kenbe andedan li pou gwosi.  Pati nan manje andedan vant yon èt vivan li pouse soti nan tou dèyè li."
}, {
  "word": "Pous",
  "description": "Kat dwèt ki pi gwo nan ven dwèt moun gen nan pye avèk nan men yo.  Yon dimansyon ki prèske menm longè avèk espas ki ant de mak nan dwèt yon moun."
}, {
  "word": "Poushon",
  "description": "Pitit de moun ki gen anpil lajan e ki pa oblije travay pou fè lajan li bezwen pou depanse.  Yon jèn gason ki gen anpil lajan e ki pa gen pyès responsablite tankou yon fanmiy pou okipe."
}, {
  "word": "Pousib",
  "description": "Sib kijan yon moun fè yon bagay pou fè menm bagay la tou."
}, {
  "word": "Pousyè",
  "description": "Ti moso tè ki vini tèlman piti e fay, yo kapab vole e van kapab pote yo ale tonbe sou lòt bagay.  Salte ki poze sou yon kò pwòp e ki shanje koulè kò sa a.  Krabinay tè ki kapab vole."
}, {
  "word": "Pouvwa",
  "description": "Kapasite pou itilize fòs lè gen bezwen pou itilize fòs sa a.  Otorite lalwa bay yon moun."
}, {
  "word": "Pòv",
  "description": "Moun nan yon sosyete ki pa posede anyen pou li kontinye viv alèz nan sosyete a.  Kèk fwa, dekourajman avèk grangou fè yon pòv kanpe kote lòt moun ap pase pou mande yo kòb."
}, {
  "word": "Povrete",
  "description": "Eta yon moun ki pa gen lajan pou li ashte pyès nan bagay yon moun bezwen pou li kontinye viv alèz nan sosyete li ap viv."
}, {
  "word": "Poze",
  "description": "Soti anlè epi rive atè a tou dousman.  Ranje yon bagay tankou mozayik nan yon posisyon."
}, {
  "word": "Pozisyon",
  "description": "Kote yon bagay ye.  Travay yon moun ap fè nan yon biznis.  Opinyon yon moun sou yon bagay."
}, {
  "word": "Pozitif",
  "description": "Yonn nan de pòl elektrisite yo (avèk negatif la) kote kouran soti pou li ale pase nenpòt kote ki bezwen itilize kouran.  Yon siy plis (+) operasyon ki montre gen yon bagay ki ap ale ogmante sou yon lòt bagay."
}, {
  "word": "Pran",
  "description": "Itilize fòs pou retire yon bagay nan men yon moun ki te posede.  Akepte resevwa yon bagay nan men yon lòt moun."
}, {
  "word": "Predesesè",
  "description": "Yon moun ki te okipe yon pozisyon anvan moun ki vini okipe pozisyon sa a apre li."
}, {
  "word": "Premye",
  "description": "Bagay ki vini, rive anvan an.  Yon moun, yon bagay ki gen nimewo en, ki menm avèk nimewo en.  Pozisyon yon moun ki rive anvan an kote yon kous fini."
}, {
  "word": "Prepare",
  "description": "Fè tout sa ki nesesè pou kòmanse fè yon lòt bagay ki bezwen fèt."
}, {
  "word": "Près",
  "description": "Yon mashin ki itilize vapè pou retire pli sou yon rad.  Tout moun ki travay nan biznis tankou radyo, televizyon, jounal  e ki regle zafè bay nouvèl."
}, {
  "word": "Presbitè",
  "description": "Yon kay, yon biwo kote yon pè viv e fè travay legliz la ki pa kapab fèt nan legliz la menm."
}, {
  "word": "Prese",
  "description": "Fè yon bagay ki dwe fèt pi vit pase jan li te dwe fèt la.  Mete yon rad anba yon mashin ki rele près pou retire pli nan rad la."
}, {
  "word": "Prèskil",
  "description": "Yon moso tè ki gen dlo antoure li prèske tou won.  Penensil."
}, {
  "word": "Preskri",
  "description": "Ekri yon lis medikaman ki bon pou maladi bay yon malad soufri.  Bay yon moun otorizasyon avèk enstriksyon pou fè yon travay."
}, {
  "word": "Preskripsyon",
  "description": "Yon otorizasyon yon doktè bay yon moun pou ale nan yon famasi epi ashe yon medikaman leta anpeshe moun ashe san otorizasyon sa a.  Otorizasyon e enstriksyon yon moun bay yon lòt moun pou li fè yon travay."
}, {
  "word": "Prete",
  "description": "Aksepte, yon bagay, lajan nan men yon moun epi bay moun nan pwomès pou remèt li bagay la, lajan an."
}, {
  "word": "Prevwa",
  "description": "Wè yon bagay anvan li egziste nan reyalite."
}, {
  "word": "Prezan",
  "description": " Moman sa a, konnye a, tan sa a.  Eta yon moun ki yon kote, nan yon pozisyon. "
}, {
  "word": "Prezidan",
  "description": "Pi gwo shèf, premye moun nan yon peyi ki gen yon gouvènman."
}, {
  "word": "Pri",
  "description": "Kantite kòb yon mashann mande pou mashandiz li ap vann.  Yon bagay, lajan yon moun resevwa avèk konpliman pou yon bagay li fè byen."
}, {
  "word": "Privatize",
  "description": "Retire yon bagay leta te posede nan men li pou bay lòt biznis kontwole li.  Retire dwa piblik la te gen nan men li sou yon bagay."
}, {
  "word": "Prive",
  "description": "Eta yon bagay yon moun posede e se moun sa a ki gen dwa  fè sa li vle avèk li.  Sektè Prive, Nenpòt biznis nan yon peyi ki pa nan gwoup biznis, gwoup òganizasyon leta yo."
}, {
  "word": "Prizon",
  "description": "Yon kay kote yon jij voye yon moun apre jijman li pou pini li pou krim li fè, paske li vyole lalwa.  Yon plas sosyete konstwi pou mete tout kriminèl, moun ki pèdi dwa yo te genyen pou viv lib nan sosyete.  Yon mwayen sosyete itilize pou retire libète nan men moun ki pa konnen kijan pou yo itilize libète yo genyen."
}, {
  "word": "Prizonye",
  "description": "Moun ki nan prizon.  Yon moun ki pa kapab jwi libète menmsi li pa nan yon prizon.  Gèrye yon gwoup militè pran pandan yo ap goumen avèk yon lòt gwoup militè."
}, {
  "word": "Pwa",
  "description": "Yon mezi moun itilize pou konnen ki kantite lou yon bagay lou.  Plizyè grenn plizyè plant diferan donnen an gous e moun itilize grenn sa yo anpil pou prepare anpil repa tankou sòs pwa.  Pwa Frans, Yon pwa ki gen yon ti gou dous e ki pa janm shanje koulè vè li a menm lè li sèsh.   Pwa Grate, Yon pwa ki gen koulè vè lè li vèt epi vini koulè mawon pandan plim ap grandi sou li lè rèk.  Moun pa manje pwa sa e li grate moun anpil lè plim yo kole sou kò moun nan.   Pwa Jenwa, Yon pwa ki gen menm wotè avèk pye pwa wouj, ti grenn li pi piti, li gen koulè blan avèk yon ti mak nwa nan yon kwen li.   Pwa Kongo, Yon ti grenn pwa won ki donnen sou yon pye pwa ki kapab pi wo pase sis pye.  Gous li kapab genyen twa a sis grenn konsa.      Pwa Lyann, Yonn nan pwa yo ki pran plis tan anvan li kòmanse donnen e li bay anpil gous.  Li gen koulè wouj lè li sèsh men li pi piti pase pwa wouj.  Pwa Nwa, Yon pwa tout kò li gen koulè nwa e pye li menm wotè avèk pye pwa wouj la.  Pwa Pyant, Pwa sa a donnen sou yon gwo pye bwa ki bay gous yo e moun pa manje li.   Pwa Shous, Yon pwa ki laj, ki gen fòm oval e ki gen yon ti gou prèske anmè ki fè anpil moun pa renmen li.  Li fè lyann sou gwo pye bwa e li fè anpil tan ap donnen.  Pwa Wouj, Yon pwa tout koulè kò li wouj.  Pye li kout e li donnen plizyè gous anvan li seshe pou mouri."
}, {
  "word": "Pwason",
  "description": "Anpil bèt ki viv nan dlo e moun manje anpil nan yo.  Anpil pwason gen fòm oval avèk yon pwent kote boush yo, je yo avèk zòrèy yo ye.  Lòt pwent la se kote ke yo ye."
}, {
  "word": "Pwav",
  "description": "Yon ti grenn epis won e nwa ki pike anpil lè li kraze."
}, {
  "word": "Pwazon",
  "description": "Pwodui shimik ki kapab retire lavi nan yon moun, yon bèt, yon pye bwa.  Nenpòt bagay ki kapab elimine lavi, bay maladi."
}, {
  "word": "Pwèl",
  "description": "Plim ki pouse, grandi anba zesèl moun, sou do koko fi epi kote zozo yon gason pandye nan kò li.  Plim.  Plim bèt."
}, {
  "word": "Pwen",
  "description": " Pi piti divizyon nan yon bagay.  Jan yon moun ki vlope men li. "
}, {
  "word": "Pwent",
  "description": "Dènye pati nan yon bagay.  Finisman yon bagay ki te kòmanse.  Kote yon moun te vle rive a."
}, {
  "word": "Pwente",
  "description": " Pran yon direksyon tankou yon pwent.  Montre direksyon yon bagay."
}, {
  "word": "Pwenti",
  "description": "Retire nan yon materyèl ki fòme seksyon yon bagay jis seksyon sa a pa kapab diminye ankò e san afekte lajè lòt seksyon bagay sa a.  Fè yon pwent."
}, {
  "word": "Pwès",
  "description": "Eta yon bagay ki gwo, ki pi gwo pase gwosè moun panse li te dwe ye."
}, {
  "word": "Pwoblèm",
  "description": "Yon bagay, yon sitiyasyon yon moun pa kapab konprann.  Yon bagay ki twouble lespri moun.  Nenpòt bagay ki bezwen yon solisyon."
}, {
  "word": "Pwodiksyon",
  "description": "Etap, mwayen moun itilize pou fè yon bagay pou vann, pou moun itilize."
}, {
  "word": "Pwodui",
  "description": "Tout bagay moun fè.  Tout bagay yon konpayi fè nan izin li pou vann, pou moun itilize.  Tout mashandiz ki nan magazen, boutik, mashe pou vann."
}, {
  "word": "Pwofese",
  "description": "Pale moun de bagay ki gen pou fèt sou tè a jan Bondye di yo ap ale fèt."
}, {
  "word": "Pwofesè",
  "description": "Moun ki kapab pwofese.  Moun ki gen konesans e ki gen djòb pou separe konesans yo avèk elèv nan lekòl."
}, {
  "word": "Pwofèt",
  "description": "Moun ki te konnen sèvi Bondye lontan e ki te konnen resevwa mesaj nan rèv pou bay moun ki kwè nan Bondye.  Pwofèt yon te konnen avèti moun ki ap sib Bondye de bagay ki gen pou rive."
}, {
  "word": "Pwogram",
  "description": "Planifikasyon.  Jan yon moun prevwa li ap ale fè yon bagay.  Jan yon bagay ekri sou papye pou li kapab vini fèt nan reyalite.  Yon rasanbleman anpil desen, lòd, entriksyon, mesaj ki fèt pou enstale nan òdinatè; konsa moun avèk òdinatè a kapab konprann sa ki dwe fèt pou jwenn yon rezilta."
}, {
  "word": "Pwograme",
  "description": "Ekri liy pwogramè avèk òdinatè kapab konprann pou pase òdinatè lòd, kominike avèk òdinatè e moun ki ap ale itilize yon pwogram."
}, {
  "word": "Pwogramè",
  "description": "Moun ki konprann e ki ekri pwogram pou òdinatè.  Moun ki pwograme òdinatè.  Yon pwogramè aprann yon pwogram ki kapab kominike avèk òdinatè pou li ekri pwogram."
}, {
  "word": "Pwonon",
  "description": "Yon mo moun itilize pou ranplase non yon moun lè yo ap pale ou byen lè yo ap ekri pou evite repete menm non an plizyè fwa.  Mo moun mete devan lòt mo pou fè konprann ki moun ki ap aji.  Men ki pwonon ki genyen nan lang Kreyòl la:  Mwen, pou moun ki ap pale a; Ou, pou moun yon moun a pale avèk li e pou plizyè moun lè moun ki ap pale a pa nan gwoup la; Li, pou moun yon moun ap pale de li; Nou, pou plizyè moun lè moun ki ap pale andedan gwoup li ap pale de li a; Yo, pou plizyè moun lè ni moun ki ap pale a ni moun li ap pale avèk li a pa nan gwoup li ap pale de li a."
}, {
  "word": "Pwononse",
  "description": "Son yon mo fèt pou bay lè li ap soti nan boush moun."
}, {
  "word": "Pwòp",
  "description": "Eta yon bagay ki pa gen pyès salte sou li.  Bagay ki pou yon moun."
}, {
  "word": "Pwopriyete",
  "description": "Yon bagay moun posede, moun kapab posede tankou yon kay.  Eksplikasyon sou yon bagay tankou konvansyon matematik yo."
}, {
  "word": "Pwopriyetè",
  "description": "Moun ki posede pwopriyete.  Moun ki posede bagay ki kapab gen mèt."
}, {
  "word": "Pwoteje",
  "description": "Anpeshe bagay mal rive.  Bay sekirite.  Kashe yon bagay pou vòlè pa jwenn li."
}, {
  "word": "Pwoteksyon",
  "description": "Aksyon moun ki ap pwoteje yon bagay, yon moun."
}, {
  "word": "Pwovizyon",
  "description": "Bagay moun mete nan yon pozisyon pou ranplase bagay yo te genyen ki ap diminye."
}, {
  "word": "Pyan",
  "description": "Sansiblite yon moun gen nan pye li ki anpeshe li peze pye li atè pou mashe vit.  Yon boul sansib ki leve nan yon pati nan kò yon èt vivan."
}, {
  "word": "Pye",
  "description": "Pati anba nan kò yon moun ki kole avèk jenou an e ki toushe tè a lè yon moun ap mashe.  Yon bagay ki toushe tè a e ki pèmèt yon bagay kanpe anlè tè a.  Yon kantite douz pous."
}, {
  "word": "Pyès",
  "description": "Anyen.  Yon moso bagay ki kontribye nan konstitisyon yon bagay.  Absans yon bagay."
}, {
  "word": "Pyese",
  "description": "Rasanble plizyè pyès ansanm pou fè yon bagay.  Itilize yon moso yon bagay ou byen yon moso yon lòt bagay, pou ranplase moso pa bagay la."
}, {
  "word": "Pyon",
  "description": "Plizyè moso bagay jwè itilize pou yo make pozisyon yo ye nan yon jwèt.  Pwofi, avantaj yon moun gen sou yon lòt."
}, {
  "word": "R",
  "description": "Disetyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Ra",
  "description": "Eta yon bagay moun difisil pou jwenn, rankontre li.  Yon bagay moun oblije shashe li anpil pou jwenn li."
}, {
  "word": "Rabote",
  "description": "Aksyon yon bagay ki ap avanse nan yon direksyon epi li ap pouse ale tout sa li jwenn nan shemen li, sou wout li."
}, {
  "word": "Rad",
  "description": "Moso twal koutiryè avèk tayè koupe nan fòm kò moun e koud yo ansanm pou moun abiye."
}, {
  "word": "Radyo",
  "description": "Yon mwayen kominikasyon ki egziste ant yon gwo aparèy elektwo-mayetik ki voye son nan lespas e yon ti aparèy elektwo-mayetik ki ap resevwa son sa yo.  Kantite ti aparèy ki kapab resevwa son sa yo pa gen limit.  De ti aparèy de moun,  pou pi piti, kapab ititlize pou yo pale, kominike ant yo de a."
}, {
  "word": "Rafine",
  "description": "Eta yon moun ki resevwa yon edikasyon nan fanmiy li, nan zòn kote li ap viv la ki fè li konprann byen jan pou li viv avèk moun ki ap viv sou kote li."
}, {
  "word": "Rafreshisman",
  "description": "Yon bagay glase tankou krèm, dlo, kola e latriye ki kontribye nan bese shalè yon moun santi lè moun bwè bagay sa yo.  Nenpòt bagay moun bwè avèk espwa shalè yo santi ap bese."
}, {
  "word": "Rakèt",
  "description": "De plant nan peyi Ayiti:  yonn gen yon fòm varye avèk pikan e yon likid blan andedan li.  Likid sa a se yon pwazon.  Ayisyen itilize rakèt sa pou fè lantouray.  Lòt rakèt la gen yon fòm oval avèk ti pikan fèb nan tout kò li.  Ayisyen itilize plant sa pou feyaj.  Yon entriman jwè anpil jwèt itilize pou frape e voye yon boul sou bò lòt jwè a."
}, {
  "word": "Rakonte",
  "description": "Pale de yon bagay ki pase.  Bay yon kont tankou istwa Bouki avèk Timalis."
}, {
  "word": "Ran",
  "description": "Nivo ki egziste ant plizyè bagay, moun, djòb, travay, pozisyon nan yon sosyete, yon peyi.  Liy.  Plizyè moun ki kanpe yonn devan lòt pou tann yon bagay."
}, {
  "word": "Randevou",
  "description": "Yon lè, de ou byen plis moun antann yo, pou rankontre yon kote pou pale de yon bagay."
}, {
  "word": "Ranje",
  "description": "Mete plizyè bagay nan yon pozisyon ki ede jwenn yo lè gen bezwen pou yo.  Bay yon bagay yon fòm li te pèdi.   Plizyè bagay ki nan yon pozisyon."
}, {
  "word": "Rankont",
  "description": "Moman kote moun rankontre."
}, {
  "word": "Rankontre",
  "description": "Soti nan yon pozisyon, yondireksyon pou ale menm kote avèk lòt moun ki pa soti menm kote a."
}, {
  "word": "Ranmye",
  "description": "Yon bèl zwazo ki kapab fè yon gwo bri andedan gòsh li e ki toujou ap vole, rete sou yon pye bwa kote parèy li ye."
}, {
  "word": "Rann",
  "description": "Travay yon moun ki ap pouse manje soti andedan vant paske gen yon fòs ki ap pouse manje sa a soti deyò.  Rann Sèvis,  Sèvi yon moun gratis ou byen pou lajan."
}, {
  "word": "Ranpli",
  "description": "Fè, mete an plis sou yon bagay tankou mete tè nan yon tou."
}, {
  "word": "Ranyon",
  "description": "Moso twal, rad ki lave anpil, twò ansyen pou moun abiye epi moun mete yo nan yon kwen ou byen anba matla kabann."
}, {
  "word": "Rapadou",
  "description": "Yon sik solid peyizan ayisyen fè nan moulen.  Pou prepare rapadou, peyizan yo kraze kann pandan yo ap separe dlo a avèk kakas kann nan.  Yo mete dlo kann nan bouyi pou jis li vini siwo.  Nan yon moman anvan siwo a brile, yo retire li mete nan yon gwo ganmèl  epi yo brase siwo a pou jis li prèske di.  Lè sa yo mete li nan kayèt."
}, {
  "word": "Rapòte",
  "description": "Aprann yon bagay, yon istwa epi ale pale lòt moun de konesans sa yo.  Bay enfòmasyon nan yon jounal, yon radyo, yon televizyon."
}, {
  "word": "Rapòtè",
  "description": "Moun ki pran yon nouvèl epi pote li ale bay lòt moun.  Moun ki bay nouvèl nan jounal, radyo, televizyon."
}, {
  "word": "Rara",
  "description": "Yon gwoup mizikal ki gen yon majò-jon devan, kèk  dansè dèyè li, tanbouyè, banbouyè, yon bòkò, yon badjikan, avèk kèk lòt mizisyen e patisipan.  Rara kòmanse sou dènye jou madigra pou fini lè fèt Pak rive."
}, {
  "word": "Ras",
  "description": "Divizyon moun kreye pou fè diferans ant koulè moun ki ap viv sou tè a e tout kote nan lemond."
}, {
  "word": "Rasanbleman",
  "description": "Plizyè bagay, moun, bèt ki nan yon pozisyon nan yon moman.  Yon foul moun."
}, {
  "word": "Rash",
  "description": "Yon enstriman ki fèt pou koupe gwo bagay di tankou yon twons bwa.  Pou koupe yon bagay avèk rash, moun frape pati file nan rash la sou bagay la anpil fwa epi ti moso soti yonn apre lòt nan bagay la jis li fini koupe."
}, {
  "word": "Rashe",
  "description": "Rale yon bagay soti nan yon pozisyon li te ye, avèk fòs."
}, {
  "word": "Rasin",
  "description": "Yon pwent tout plant pouse nan tè a pou kenbe yo solid anlè tè a.  Moun itilize rasin plant anpil e gen anpil nan yo moun manje.  Orijin, premye kote yon bagay soti anvan moun te kòmanse tande pale de li."
}, {
  "word": "Rasyonèl",
  "description": "Eta yon desizyon moun ki pran li a te itilize entelijans epi moun nan te evite itilize kè li, sansiblite li."
}, {
  "word": "Rat",
  "description": "Yon ti bèt ki gen kat pye boush long, zòrèy kanpe e ke long ki entelijan anpil e ki gen, nan kò li, anpil pati moun gen nan kò yo.  Moun ki fè medikaman pou maladi moun soufri toujou eseye medikaman sa yo sou rat anvan yo bay moun medikaman yo.  Rat renmen viv nan tou e yo pa fè moun konfyans."
}, {
  "word": "Rate",
  "description": "Manke.  Pèdi shans ki te egziste pou reyalize, benefisye yon bagay.  Aksyon yon pèlen ki kite pozisyon yon moun te ranje li pou kenbe yon bèt."
}, {
  "word": "Ratyè",
  "description": "Yon mashin moun itilize pou kenbe rat paske bèt sa pa janm kite moun rive pre li.  Moun mete manje yo konnen rat renmen nan ratyè a epi ranje li yon fason pou li rate."
}, {
  "word": "Ratyèfè",
  "description": "Yon ratyè ki fèt an fè.  Mo kèk gason itilize lè yo ap pale de kèk madanm ki konnen kijan pou yo fè pou koushe avèk lòt gason san mari yo pa janm kenbe yo."
}, {
  "word": "Ravin",
  "description": "Yon ti kouran dlo ki sanble avèk yon rivyè, men ki plis soti nan kèk mòn pou ale tonbe nan larivyè.  Kantite dlo ravin yo pa anpil e lè lapli fè anpil tan li pa tonbe ravin yo pa gen dlo sou wout yo."
}, {
  "word": "Ray",
  "description": "Yon wout ki fèt pou tren pase.  Yon ray gen de liy fè ki koushe sou anpil moso bwa sou tout longè wout la.  De liy fè sa yo kenbe wou tren yo pou yo pa deraye."
}, {
  "word": "Rayi",
  "description": "Eta yon moun, yon bèt ki gen vye santiman nan kè li pou yon lòt moun. "
}, {
  "word": "Rayisman",
  "description": "Move santiman yon bèt, yon moun gen nan kè li pou yon lòt moun, yon lòt bèt."
}, {
  "word": "Re",
  "description": "Yonn nan sèt nòt mizikal yo:  do, re, mi, fa, sòl, la, si."
}, {
  "word": "Rebitan",
  "description": "Yon manje ki diminye apeti moun shak fwa yon moun manje li.  Nenpòt bagay yon moun gen mwens anvi pou fè li shak fwa li fè li yon fwa an plis."
}, {
  "word": "Rebitans",
  "description": "Santiman moun gen pou yon bagay ki rebitan."
}, {
  "word": "Redaksyon",
  "description": "Yon devwa pwofesè bay elèv lekòl primè kote yo gen pou yo pale de yon bagay tankou yon moman nan lavi yo, yon bèt e latriye.  Yon redaksyon gen twa pati: entwodiksyon, devlopman, konklizyon."
}, {
  "word": "Refèt",
  "description": "Remete tout bagay nan plas yo pou tout bagay vini gen menm fòm li te genyen nan yon moman pase.  Yon lòd moun pase òdinatè pou ekri ankò yon bagay moun apèn efase."
}, {
  "word": "Refrijeratè",
  "description": "Yon mashin ki gen anpil tiyo andedan li ki gen gaz pase andedan yo pou glase bagay ki andedan mashin nan.  Refrijeratè fè dlo tounen glas, li fè anpil likid vini di."
}, {
  "word": "Règ",
  "description": "Yon moso materyèl ki ede moun trase yon liy dwat.  Prensip moun fèt pou yon respekte.  San ki soti nan koko yon fi shak ventsuit jou nan yon mwa pou avèti fi a li ap ale ovile nan katòz jou. Gen kèk fi ki gen gwo doulè nan vant yo lè yo gen règ yo."
}, {
  "word": "Regrete",
  "description": "Eta yon moun ki gen lapenn pou yon bagay ki te fèt mal.  Yon moun ki regrete yon bagay ap shashe ranje li depi li kapab.  Gen bagay tankou lanmò moun regrete lè yo rive, menm jan avèk lanmò tou, gen bagay moun pa kapab shanje."
}, {
  "word": "Rejim",
  "description": "Yon gwoup moun ki gen tout pouvwa nan men yo pou pran desizyon pou yon lòt gwoup moun, yon peyi.  Yon grap nan tèt yon pye bannann, lè li rèk, moun koupe li pou manje."
}, {
  "word": "Reken",
  "description": "Yon gwo pwason nan lanmè ki manje vyann tankou vyann moun yo jwenn nan lanmè a, menmsi moun nan vivan."
}, {
  "word": "Reklam",
  "description": "Pale de yon bagay, yon mashandiz pou fè moun panse yo konnen bagay sa, mashandiz la epi yo ap ale shashe li pou ashte li."
}, {
  "word": "Rekò",
  "description": "Rezilta yon bagay moun ap mezire depi lontan epi li rive bay yon rezilta moun pa te janm wè anvan jou li rive bay nouvo rezilta sa a."
}, {
  "word": "Rekonesans",
  "description": "Konesans ki retounen nan tèt yon moun apre anpil tan te pase depi moun nan te pèdi konesans la.  Apresyasyon yon moun montre pou yon bagay yon lòt moun fè.  Konpliman yon moun resevwa pou yon bon bagay li fè."
}, {
  "word": "Rekonèt",
  "description": "Itilizasyon ansyen konesans pou sonje yon bagay.  Sonje resanblans yon bagay."
}, {
  "word": "Rekonstwi",
  "description": "Konstwi yon bagay yon dezyèm fwa.   Mèt yon ansyen kay kapab mande yon bòs pou li rekonstwi kay la pou li."
}, {
  "word": "Rèl",
  "description": "Yon liy nan mitan do yon èt vivan kote zo ki pi ansyen nan kò a rankontre.  Eta yon moun ki ap kriye fò pou fè lòt moun konnen li bezwen èd."
}, {
  "word": "Relasyon",
  "description": "Lyen yon bagay, yon moun gen avèk yon lòt bagay, yon lòt moun. Rezon ki fè de moun toujou rankontre.  Relasyon Entim, Relasyon yon fi avèk yon gason genyen kote yonn konnen anpil sekrè nan lavi lòt la, yo shak konnen wè e manyen tout pati nan kò lòt la."
}, {
  "word": "Rele",
  "description": "Travay yon moun ki kite non yon moun soti nan boush li yon fason pou moun nan vini jwenn li.  Gwo bri moun fè lè yo ap kriye."
}, {
  "word": "Relijye",
  "description": "Eta yon moun ki ale legliz shak fwa gen yon seremoni nan legliz e ki sib tout prensip legliz li."
}, {
  "word": "Ren",
  "description": "Yon ti boul andedan kò moun ki pèmèt moun nan shita san li pa santi pwa pati anlè kò li.  Pati nan mitan kò moun kote yon gason mare sentiwon li."
}, {
  "word": "Rèn",
  "description": "Yon fi ki ap gouvène nan plas yon wa.  Madanm yon wa.  Yon fi ki gen anpil pouvwa, ki gen moun anba li li pa gouvène."
}, {
  "word": "Renault",
  "description": "Yon mak mashin fransè, yon konpayi fransè ki fè mashin."
}, {
  "word": "Renesans",
  "description": "Yon moman literè, atistik, syantifik nan epòk kenzyèm avèk sèzyèm syèk yo lè moun epòk sa yo te konnen kopye byen sa moun nan tan, lontan anvan yo, te konnen fè.  Eta yon bagay ki refèt ankò."
}, {
  "word": "Renmen",
  "description": "Posede lanmou nan kè pou yon lòt moun.  Aksepte rantre nan yon relasyon entim avèk yon moun."
}, {
  "word": "Repa",
  "description": "Nenpòt nan twa plat manje yon moun fèt pou li manje shak jou pou li nouri tèt li byen."
}, {
  "word": "Repo",
  "description": "Yon pozisyon kote pa gen pyès kontraksyon sou gwo manb nan kò yon moun.  Eta yon moun ki ap dòmi."
}, {
  "word": "Repondè",
  "description": "Yon ti aparèy, yon ti aparèy andedan yon òdinatè ki reponn telefòn si pa gen moun pou reponn yon telefòn ki ap sonnen nan yon kay.  Yon moun ki reponn lè lòt moun rele li  nan telefòn."
}, {
  "word": "Repons",
  "description": "Nenpòt sa yon moun di, ekri apre yon lòt moun fini pose yon kesyon."
}, {
  "word": "Rès",
  "description": "Sa ki rete a lè yon kantite fini soti nan yon bagay."
}, {
  "word": "Resevwa",
  "description": "Aksepte pran yon bagay nan men yon moun.  Travay yon moun ki kite yon moun rantre nan lakay li. "
}, {
  "word": "Reshèsh",
  "description": "Shashe konnen yon bagay nan mitan bagay ki egziste tankou shashe enfòmasyon istorik nan anpil liv nan bibliyotèk.  Travay syantis fè pou yo kapab konprann lanati, yon prensip natirèl, shashe esplike lanati.  Travay syantifik ki mennen a dekouvèt, envansyon anpil bagay."
}, {
  "word": "Resi",
  "description": "Yon moso papye yon moun bay yon lòt moun pou fè lòt moun konnen li te resevwa yon bagay nan men moun sa.  Yon mashann bay yon ashtè yon resi pou fè konnen li te resevwa lajan nan men ashtè a."
}, {
  "word": "Resipyan",
  "description": "Yon bagay ki gen kapasite pou resevwa yon lòt bagay.  Yon bagay ki pi laj pase yon lòt; konsa sa ki pi piti a kapab antre nan sa ki pi laj la."
}, {
  "word": "Responsablite",
  "description": "Eta yon moun ki aksepte vini responsab yon shay ki vini tonbe sou do li.  Responsablite ki tonbe dirèkteman sou do yon moun tankou yon papa ki responsab piti li. "
}, {
  "word": "Restavèk",
  "description": "Yon moun (depi li te timoun) ki rete nan kay yon fanmiy e ki fè tout travay moun nan fanmiy nan mande li fè san li pa janm resevwa lajan pou travay li.  Mèt kay la bay li manje, kote pou li dòmi e rad pou li mete sou li."
}, {
  "word": "Restoran",
  "description": "Yon biznis kote se manje yo fè sèlman pou moun ale shita, manje epi paye pou bagay sa yo.  Kote mashann prepare manje pou moun ale e jwenn lòt moun pou sèvi yo byen, pou lajan."
}, {
  "word": "Rete",
  "description": "Sispann mashe, kanpe yon kote pou pran repo.  Viv yon kote, nan yon kay."
}, {
  "word": "Retire",
  "description": "Pran yon bagay nan mitan yon lòt bagay epi mete li yon lòt kote."
}, {
  "word": "Retounen",
  "description": "Pran yon bagay ki te soti nan yon pozisyon epi ale mete li nan menm pozisyon an.  Bay yon moun, yon bagay ki te soti nan men li deja tankou lajan e latriye.  Aksyon yon moun ki ale nan yon zòn kote li te ye deja."
}, {
  "word": "Rèv",
  "description": "Imaj lavi reyèl.  Yon lavi moun viv sèlman lè yo ap dòmi:  moun nan wè e fè tout sa li ta kapab fè si li pate ap dòmi.  Moun ki nan yon rèv kapab wè yon bagay ki te nan lespri yo anvan yo te ale dòmi.  Kèk fwa tou yon rèv anonse yon moun bagay ki gen pou pase nan lavi reyèl li.  Espri sinatirèl yo itilize rèv pou kominike avèk moun.  Bondye itilize rèv tou pou kominike avèk relijye yo."
}, {
  "word": "Reve",
  "description": "Fè rèv.  Wè, gade, patisipe nan imaj nan dòmi ki sanble avèk kèk moman nan lavi reyèl. "
}, {
  "word": "Revè",
  "description": "Moun ki fè rèv.  Moun ki wè, gade, patisipe nan imaj ki sanble avèk lavi reyèl nan dòmi."
}, {
  "word": "Revizyon",
  "description": "Aksyon yon moun ki itilize yon mwayen aprantisaj yon dezyèm fwa.  Aksyon yon moun ki fè moun li ap dirije, moun li ap kontwole rekòmanse avèk yon mwayen aprantisaj apre yo te fini aprann yon bagay deja.  Travay sa ede li wè si yo sonje sa yo te aprann nan."
}, {
  "word": "Revolisyon",
  "description": "Moman nan yon sosyete, yon peyi kote pèp la pran desizyon pou li sispann viv anba prensip ansyen moun ki te ap gouvène li pou li kapab ranplase ansyen moun sa yo avèk nouvo moun ki konprann tout santiman nouvo jenerasyon an.  Nan yon revolisyon, shanjman yo kontinye nèt ale e yo detri tout rasin anyen rejim yo.  Si ansyen rejim nan toujou egziste, menm an minorite, li ap enfekte revolisyon."
}, {
  "word": "Revòlt",
  "description": "Kòmansman yon revolisyon.  Menmsi revòlt se kòmansman revolisyon, tout revòlt pa rive bay yon revolisyon."
}, {
  "word": "Revolvè",
  "description": "Yon ti zam kout ki kapab kenbe plizyè bal e moun kapab tire yo yonn apre lòt."
}, {
  "word": "Reyèl",
  "description": "Yon bagay ki egziste, ki vizib, ou byen ki fè bri.  Yon bagay moun kapab toushe."
}, {
  "word": "Reyon",
  "description": "Mwatye lajè yon wonn.  Plizyè ti bout fè ki kenbe aks yon bisiklèt avèk jant li.  Kèk ansyen mashin te gen reyon tou.  Yon bwansh limyè, solèy."
}, {
  "word": "Rèz",
  "description": "Aksyon yon moun ki fè moun panse li posede abilite, fòs, resous pou fè yon bagay, men li pa genyen tout sa li fè moun panse li genyen yo tout bon vre.  Lè yon moun rive rekonèt sa li te fè konprann nan pa te vrè, li deja twò ta pou moun nan shanje lide li.  Aksyon yon jwè ki itilize lajan li genyen pou li blofe lòt jwè."
}, {
  "word": "Rezen",
  "description": "Yon fri ki donnen an grap.  Gen de diferan rezen:  yonn koulè wouj avèk yonn koulè vè.  Yon grenn rezen kapab genyen yonn ou byen de ti grenn andedan li."
}, {
  "word": "Rezilta",
  "description": "Sa yon moun jwenn lè li fini fè yon operasyon.  Bagay yon moun jwenn lè li fini fè yon travay."
}, {
  "word": "Rezistan",
  "description": "Eta yon bagay ki gen rezistans.  Eta yon gwoup gèrye ki kanpe ap goumen avèk yon lòt gwoup san fatige.  Eta yon mont dlo pa kapab antre andedan li menmsi li rantre nan dlo."
}, {
  "word": "Rezistans",
  "description": "Aksyon yon moun ki pa vle obeyi lòd.  Aksyon yon gèrye, yon gwoup gèrye ki pa janm fatige goumen."
}, {
  "word": "Rezon",
  "description": "Bon fason moun panse.  Abilite pou yon moun panse byen.  Travay yon moun ki fè moun konprann e aksepte pozisyon pa li pou bon pozisyon an.  Kapasite, abilite pou itilize entelijans pou pran desizyon, men pa sansiblite."
}, {
  "word": "Rezone",
  "description": "Itilize entelijan, men pa itilize sansiblite pou prandesizyon.  Praktike prensip matematik yo pou rive jwenn yonn ou byen plizyè rezilta."
}, {
  "word": "Rezoud",
  "description": "Jwenn, bay solisyon yon pwoblèm."
}, {
  "word": "Ri",
  "description": "Yon espas nan yon vil kote nenpòt moun gen dwa pase.  Yon zòn piblik nan yon vil.  Travay moun ki leve po boush yo pou mete dan yo deyò epi eksprime kè kontan yo. "
}, {
  "word": "Rish",
  "description": "Eta yon moun, yon peyi ki gen rishès.  Yon moun, yon peyi ki gen plis lajan pase kantite lajan li bezwen."
}, {
  "word": "Rishès",
  "description": "Bagay yon moun, yon moun rish posede.  Tout pwodiksyon yon peyi kapab ekspòte bay lòt peyi."
}, {
  "word": "Rive",
  "description": "Finisman, dènye bout yon vwayaj.  Ale jis nan yon destinasyon.   Travay yon moun ki rantre yon kote lòt moun te ap tan li."
}, {
  "word": "Rivyè",
  "description": "Yon kouran dlo dous ki soti nan yon sous epi ki sib tout nivo tè ki pi ba pase nivo kote li soti a pou jis li rive nan lanmè.  Larivyè."
}, {
  "word": "S",
  "description": "Dizuityèm lèt nan alfabèt lang Kreyòl la.  Li pwononse menm jan avèk mo, ès, ki vle di avanse nan yon direksyon, men pa janm rete nan yon liy dwat."
}, {
  "word": "Sab",
  "description": "Anpil poud, kraze ti wòsh ki sou kote lanmè, larivyè e mason itilize yo pou fè mòtye pou kontriksyon."
}, {
  "word": "Sadik",
  "description": "Eta moun ki pran plesi nan fè sa ki fè lòt moun mal. Eta anpil kriminèl."
}, {
  "word": "Saint Marc",
  "description": "Gade Sen-Mak."
}, {
  "word": "Sak",
  "description": "Nenpòt bagay fon avèk lans ki fèt pou moun pote bagay yo pa vle pote nan men yo."
}, {
  "word": "Sal",
  "description": "Yon gwo shanm kote moun nan yon kominote selebre gwo okazyon, evènman avèk fèt.  Eta yon bagay ki gen malpwoprete sou li tankou pousyè.   Eta yon rad ki gen kras swè moun, labou, pousyè kole sou li."
}, {
  "word": "Salad",
  "description": "Plizyè varyasyon nan bagay ki akonpaye manje sou yon tab.  Li kapab yon konbinezon leti, tomat, kawòt avèk yon melanj dlo, sèl, lwil.  Li kapab yon konbinezon bèt-wouj, pòmdetè, ze bouyi, mayonèz, zonyon.  Gen anpil diferan salad."
}, {
  "word": "Sale",
  "description": "Yon bagay ki gen yon kantite sèl ki depase gou tout lòt bagay ki rantre nan konstitisyon li."
}, {
  "word": "Salon",
  "description": "Yon shanm nan yon kay ki pote menm non avèk yon gwoup mèb andedan li.  Nan kèk kay shanm sa sèvi pou resevwa moun ki pa rete nan kay la.  Moun ki rete nan kay la itilize li pou divètisman tankou gade televizyon."
}, {
  "word": "Salte",
  "description": "Bagay ki fè yon lòt bagay sal.  Malpwoprete.  Pousyè ki rasanble, tonbe sou yon kò, fas yon bagay."
}, {
  "word": "Samdi",
  "description": "Setyèm e dènye jou nan yon semèn.  Apre jounen samdi a, yon lòt semèn kòmanse.  Se jou sa tout moun nan legliz Advantis yo ale legliz pou priye e bay Bondye glwa."
}, {
  "word": "San",
  "description": "Yon likid ki toujou ap sikile nan venn moun avèk èd kè moun ki sèvi tankou yon ponp pou rale e pouse san an nan tout venn yo.  San an, vrèman, divize an de pati:  san wouj avèk san blan an.  100.  Yon kantite ki gen san inite nan li.  Senkant miltipliye pa de.  Mil divize pa dis bay san.  San De, 102.  Sandezyèm inite nan nonb pozitif yo.  San plis de.  Desan-kat divize pa de.  San Dis, 110.  Sandizyèm inite a. Kat-san-ven divize pa de.  San plis dis.  San En, 101.  San plis en.  De-san-de divize pa de.  San inyèm inite nan nonb pozitif yo."
}, {
  "word": "Sandal",
  "description": "Yon soulye plat moun mete nan pye yo pou pye yo pa toushe atè, men tout pye a pa fèmen andedan li; konsa van kapab pase pou anpeshe pye a vini sho.  Sandal pi ansyen pase anpil soulye ki fèmen nèt yo.  Moun nan antikite te konnen mete sandal nan pye yo."
}, {
  "word": "Sandwish",
  "description": "Yon manje moun prepare avèk plizyè bagay tankou pen, leti, mayonèz, tomat, fwomaj avèk kèk ti moso vyann plat."
}, {
  "word": "Sann",
  "description": "Yon poud tout bagay ki fini boule kite nan plas kote yo te ap boule a.  Tè."
}, {
  "word": "Sans",
  "description": "Konprann moun gen de yon bagay.  Direksyon yon bagay sib pou li ale yon kote.  Sans Inik, Sèl direksyon yon bagay tankou yon wout, yon ri genyen.  Relasyon ki gen ant de moun kote yonn nan moun yo toujou montre li enterese a lòt la, men yonn nan moun yo montre li pa enterese a lòt la."
}, {
  "word": "Sansi",
  "description": "Yon moun ki pa vle travay e ki toujou ap mande lòt moun pou jis li santi moun nan pa genyen ankò pou bay li.  Yon bèt ki viv nan dlo epi ki renmen rale san moun pou li bwè.  Lè yon sansi ap rale san moun, li ap sispann rale sèlman lè vant li plen epi li soule."
}, {
  "word": "Sant",
  "description": "Mitan.  Yon kote ki enpòtan anpil pou yon gwoup moun e moun toujou reyini kote sa a pou diskite anpil bagay. Enfòmasyon moun kapab resevwa nan nen li pou idantifye yon bagay.  Bon Sant , Yon sant moun renmen.   Move Sant, Yon sant moun pa renmen,  yon sant moun rayi."
}, {
  "word": "Sante",
  "description": "Eta yon moun tout òganism nan kò li ap fonksyone san pwoblèm.  Yon moun ki an sante gen kouraj pou li fè tout sa li vle fè avèk tout manb nan kò li.  Yon moun ki pa an sante kabap fèb ou byen yon manb nan kò li kapab fèb."
}, {
  "word": "Santi",
  "description": "Eta yon bagay ki bay yon sant moun pa renmen, yon sant ki move.  Eta yon move kominikasyon ant plizyè manb nan kò yon moun.  Si yon bagay toushe yon moun, pati sa a nan kò a ap kominike enfòmasyon an bay yon lòt pati nan kò a; konsa moun nan ap konnen gen yon bagay ki toushe li, moun nan santi bagay la."
}, {
  "word": "Santiman",
  "description": "Kominikasyon ki genyen ant tout pati nan kò yon moun avèk kè li.  Nenpòt bagay yon moun santi pou yon lòt tankou lide pou fè byen, mal."
}, {
  "word": "Santimantalite",
  "description": "Eta yon moun ki gen santiman."
}, {
  "word": "Santre",
  "description": "Mete yon bagay nan sant, nan mitan.  Voye yon boul bay yon jwè nan mitan yon teren."
}, {
  "word": "Sashè",
  "description": "Yon ti sak ki pa gen lans e ki fèt avèk papye ou byen plastik."
}, {
  "word": "Satan",
  "description": "Yon frè Bondye ki envizib e ki ap viv sou tè a avèk moun apre Bondye te fini kouri dèyè li nan syèl la.  Mal."
}, {
  "word": "Satanik",
  "description": "Tout bagay ki mal, move.  Nenpòt bagay ki gen rapò avèk Satan."
}, {
  "word": "Saten",
  "description": "Yon twal swa moun itilize pou fè parasòl, onbwè.  Tayè itilize twal sa a anpil pou mete andedan rad ki fèt avèk lòt twa lou pou kouti twal sa yo pa fè mak sou moun ki mete yo.  Saten fè yon rad lou gen mwens fwotman avèk kò moun."
}, {
  "word": "Savann",
  "description": "Yon kokenshenn teren ki pa gen anpil gwo pye bwa sou li nan kèk peyi twopikal.  Zèb prèske pa grandi sou teren sa yo paske yo twò sho.  Gen anpil pousyè nan savann yo.  Savann Djann, Yon savann nan Depatman Latibonit la ki ant Mayisad avèk Sen-Mishèl, yon vil tou pre Gonayiv.  Savann Sahara, Pi gwo savann nan tout lemond e li sitiye nan nò kontinan Afrik la."
}, {
  "word": "Se",
  "description": "Men kisa yon bagay ye.  Mo moun mete devan yon lòt mo pou di kisa mo a vle di."
}, {
  "word": "Sè",
  "description": "Yon fi ki gen menm papa, menm manman avèk yon lòt moun.  Yon fi ki gen menm parenn, menm marenn avèk yon moun.  Yon mè.  Yon fi ki pa janm fè piti.  Yon fi ki se fidèl nan yon legliz."
}, {
  "word": "Segond",
  "description": "Yon swantantyèm nan yon minit, yon kantite tan ki egal a kantite tan yon minit genyen divize pa swasant."
}, {
  "word": "Segondè",
  "description": "Yon bagay ki vini apre, ki gen priyorite an dezyèm pozisyon.  Yon nivo lekòl nan peyi Ayiti ki vini apre lekòl primè."
}, {
  "word": "Sèjan",
  "description": "Yon grad nan yon gwoup militè ki gen plis pouvwa pase yon kaporal.  Yon sèjan kèk fwa responsab pou antrene moun ki ap rantre nan yon kò militè."
}, {
  "word": "Sekle",
  "description": "Deshouke zèb sou yon moso tè pou fè tè a bèl.  Kiltivatè sekle tè pou yo kapab plante grenn nan li.  Deshouke zèb nan mitan ti plant ki ap grandi pou bay yo libète pou yo grandi.  Travay yon kiltivatè fè pou kenbe plant li an sante."
}, {
  "word": "Sekou",
  "description": "Rèl yon moun pou mande èd lè moun nan konnen li pa kapab defann tèt li san asistans yon lòt moun.  Yonn nan lis yon moun ki ap itilize òdinatè kapab sib pou jwenn enfòmasyon li ap shashe.  Tout pwogram gen mo sekou a nan lis sèvis yo."
}, {
  "word": "Seksyon",
  "description": "Yon moso, yon pati nan yon bagay.  Seksyon Riral, Pi piti divizyon politik nan zòn peyi Ayiti yo."
}, {
  "word": "Seksyone",
  "description": "Divize yon bagay an plizyè seksyon."
}, {
  "word": "Sèl",
  "description": "Yon materyèl ki gen nan lanmè e moun retire li nan lanmè, netwaye li pou yo kapab itilize nan preparasyon manje, fonn nèj avèk glas nan peyi ki fè frèt yo.  Sèl gen yon eleman shimik ki rele sodyòm nan li.  Yon bagay ki gen fòm do bèt tankou sheval e ki pèmèt moun, ki antrene pou sa,  shita sou do yon bèt san li pa tonbe."
}, {
  "word": "Sele",
  "description": "Mete sèl nan yon bagay.  Mete sèl sou do yon bèt tankou sheval pou moun monte."
}, {
  "word": "Seleksyon",
  "description": "Shwazi nan mitan plizyè bagay pou pran sa ki bon an.  Yon travay kèk òganism nan kò moun fè pou yo shwazi manje ki fèt pou rete andedan vant moun e ki kontribye pou fè moun gwosi epi voye sa ki pa bon pou kò a deyò."
}, {
  "word": "Seleksyone",
  "description": "Aksyon yon bagay, yon moun ki ap fè yon seleksyon.  Pran sa ki bon yo epi kite rès la."
}, {
  "word": "Semèl",
  "description": "Pati anba yon bagay, tankou soulye, ki anpeshe pye moun toushe avèk tè a lè pye moun rantre nan li."
}, {
  "word": "Sen",
  "description": "Moun ki te sakrifye tout lavi yo ap sèvi moun sou tè a e legliz katolik bay yo glwa, kèk tan apre lanmò yo.  Yon moun ki pa fè pyès peshe.  Yon bagay ki pa gen pyès pati nan kò li ki gate.  Sen Domeng, Ansyen non tout il kote peyi Ayiti avèk Dominikani an ye a.  Lè peyi Espay te vini pran pati lès il la, li te bay pati sa yon non espanyòl (Santo Domingo) e Ayiti pote yon non fransè paske peyi Frans te kontinye kolonize li pou jis rive nan ane 1803 yo.  Sen Espri, Yonn nan twa pati Bondye yo sou kote papa a avèk piti.  Yon espri ki monte moun nan kèk legliz e fidèl legliz sa yo kwè se lespri Bondye ki monte moun sa yo.  Yon espri ki sen, ki soti nan Bondye.  Sen Mak, Yon vil nan Depatman Latibonit la kote Wout Nasyonal Nimewo En an pase pou ale nan nò peyi Ayiti.  Saint Marc.  Non yon pwofètè.  Sen Mishèl, Yon vil nan Depatman Latibonit la ki tou pre Gonayiv.  Non yon pwofèt. "
}, {
  "word": "Sèn",
  "description": "Yon kote andedan yon gwo sal moun ranje pou fè teyat.  Yonn nan shak pati, moun ki ap fè film,  yo kole ansanm pou bay kantite tan yon film dire.  Yon moun ki nan yon sèn pa oblije rankontre avèk moun ki nan yon lòt pati nan film nan, men moun ki ap gade film nan ap wè yo ansanm.  Plizyè moun ansanm ki kanpe nan mitan yon ri, nan ti vil yo, ki ap joure, batay."
}, {
  "word": "Senatè",
  "description": "Yon moun ki nan yonn nan de shanm lejislatif yon peyi e ki patisipe nan fè lwa pou peyi."
}, {
  "word": "Senbòl",
  "description": "Yon siy ki reprezante siyfikasyon, imaj yon bagay."
}, {
  "word": "Senk",
  "description": "Sizyèm shif nan nonb pozitif yo.  5.  Dis divize pa de.  Kat plis en."
}, {
  "word": "Senkant",
  "description": "Senk miltipliye pa dis.  50.  San divize pa de."
}, {
  "word": "Sentiwon",
  "description": "Yon moso kui kèk pwodiktè fè pou moun kapab mare rad nan senti yo.  Gason pase sentiwon nan pasan pantalon epi boukle sentiwon an; konsa li anpeshe pantalon an desan nan pye yo."
}, {
  "word": "Septanm",
  "description": "Nevyèm mwa nan yon ane e twazyèm mwa vankans pou elèv lekòl nan peyi Ayiti."
}, {
  "word": "Seramik",
  "description": "Travay yon atizan ki kreye imaj yon bagay avèk ajil.  Yon travay seramik kapab gwo tankou estati yon moun ou byen piti tankou bijou pou dekorasyon andedan kay."
}, {
  "word": "Sere",
  "description": "Mete yon bagay yon kote pou pyès lòt moun pa kapab jwenn li.  Anpeshe moun wè yon bagay.  Mare yon bagay pi di avèk yon kòd."
}, {
  "word": "Seremoni",
  "description": "Fèt moun fè pou fè sonje, selebre yon evènman ki te pase nan yon dat.  Nenpòt fèt pou nenpòt rezon."
}, {
  "word": "Sereyal",
  "description": "Kèk manje ki fay anpil e ki pa kapab plen vant moun pou anpil tan paske yon ale nan vant moun pi vit pase manje ki lou yo.  Pwodiktè yo fè sereyal avèk bagay tankou mayi, ble e latriye epi yo pase li nan fou anvan yo mete li nan bwat."
}, {
  "word": "Seriz",
  "description": "Yon grenn yon pye bwa donnen e ayisyen fè ji, konfiti avèk li.  Grenn seriz gen koulè vè lè li vèt e li gen koulè wouj lè li mi."
}, {
  "word": "Sèsh",
  "description": "Eta yon bagay ki pa gen pyès dlo nan li."
}, {
  "word": "Sèt",
  "description": "Setyèm shif nan nonb pozitif yo.   7.  Katòz divize pa de.  Dis mwens twa.  Sis plis en."
}, {
  "word": "Sètifika",
  "description": "Yon moso papye avèk ekriti sou li ki montre yon moun te etidye nan yon lekòl e li te fini etid la pou kantite tan nesesè a.  Dènye klas nan lekòl primè nan peyi Ayiti."
}, {
  "word": "Setyèm",
  "description": "Yon plas, pozisyon ki rive nan menm nivo avèk sèt.  Pou rive nan setyèm, moun ki ap di pozisyon yo soti nan premye, dezyèm, twazyèm, katriyèm, senkyèm epi sizyèm."
}, {
  "word": "Sèvant",
  "description": "Yon moun ki ap sèvi lòt moun.  Yon moun ki gen pou djòb netwaye, fè manje, lave e pase rad pou tout moun ki ap viv nan kay la."
}, {
  "word": "Sèvi",
  "description": "Fè travay yon moun pou li san toushe pou sa.  Fè yon travay pou yon moun.  Travay yon moun ki bay yon lòt moun bagay pou li bwè, manje pandan moun sa andedan kay li."
}, {
  "word": "Sèvis",
  "description": "Aksyon yon moun ki sèvi yon lòt moun.  Aksyon yon moun ki fè yon travay, yon lòt moun te gen pou li fè, san li pa toushe pou sa."
}, {
  "word": "Sèvitè",
  "description": "Yon moun ki itilize yon moso tan, tout tan nan lavi li pou sèvi lòt moun.  Yon moun, yon bagay ki ap sèvi moun.  Yon gwo òdinatè ki gen anpil lòt ti òdinatè ploge sou li pou pèmèt tout ti òdinatè sa yo itilize resous, tankou pwogram avèk memwa, gwo òdinatè a gen sou li."
}, {
  "word": "Sèvyèt",
  "description": "Yon moso twal ki kapab resevwa anpil dlo anvan li kòmanse mouye e moun itilize twal sa a pou siye kò yo lè yo fini benyen, pou siye nenpòt pati nan kò.  Gen gwo sèvyèt e gen ti sèvyèt pou tout pati nan kò moun."
}, {
  "word": "Sèz",
  "description": "Disetyèm nonb pozitif ki gen de shif nan li:  en (1) avèk sis (6).  16."
}, {
  "word": "Shadèk",
  "description": "Yon gwo grenn yon pye bwa donnen e ki sanble avèk zoranj anpil.  Yon shadèk pi gwo pase zoranj, li won menm jan avèk zoranj e yo gen menm koulè, jón.  Li difisil pou yon moun ki pa konnen de fri yo byen pou fè diferans ant gou ji yo de a."
}, {
  "word": "Shak",
  "description": "Yonn pa yonn.  Yonn nan yon pozisyon pou kont li."
}, {
  "word": "Shalè",
  "description": "Yon wotè tanperati a monte ki fè moun santi lè a sho.  Shalè fè moun swe, esoufle e malad.  Nan peyi Etazini, shalè konnen touye moun ki gen pwoblèm sante."
}, {
  "word": "Shanje",
  "description": "Mete yon bagay nan plas yon lòt.  Bay, resevwa yon bagay nan plas yon lòt.  Retire fòm koulè yon bagay te genyen pou bay li lòt fòm, lòt koulè."
}, {
  "word": "Shanjman",
  "description": "Travay moun ki shanje yon bagay.  Travay ki fèt nan yon bagay ki shanje."
}, {
  "word": "Shanm",
  "description": "Yon kote tout senatè ou byen depite yon peyi reyini pou yo travay.  Yonn nan plizyè gwo divizyon andedan yon kay.   Shanm Koushe, Yon shanm nan yon kay ki fèt sèlman pou koushe.  Li gen yon kabann, yon amwa, yon pandri e kèk fwa menm yon twalèt e latriye.  Shanm Manje, Yon shanm nan yon kay ki fèt sèlman pou manje .  Li gen nan li yon tab avèk tout bagay ki gen rapò avèk manje tankou gad-manje, asyèt, kiyè, anba-plat, kouvrepla e latriye."
}, {
  "word": "Shans",
  "description": "Avantaj, opòtinite moun benefisye, jwenn san yo pa ranpli kondisyon nesesè pou yo te benefisye, jwenn avantaj, opòtinite sa yo.  Yon rezilta moun jwenn san konnen mwayen li pase pou rive jwenn rezilta a."
}, {
  "word": "Shante",
  "description": "Yon tèks ki ekri yon fason pou moun kapab li li avèk yon vitès pi dousman pase jan moun pale e anpil moun kapab pran plezi lè yo ap koute li.  Pase anpil tan pou di yon mo e kontinye fè menm jan pou tout ou byen plizyè gwoup mo nan yon tèks pou jis rive nan finisman tèks la.  Tèks yon ekriven ekri pou li menm ou byen lòt moun pase anpil tan ap di mo yo avèk yon vitès pi dousman pase jan moun pale."
}, {
  "word": "Shantè",
  "description": "Sanba.  Moun ki fè shante, ki konnen kijan pou li shante nenpòt shante epi fè moun renmen shante a.  Moun ki toujou anvi shante li."
}, {
  "word": "Shapèl",
  "description": "Yon ti legliz katolik nan yon ti kominote.  Yon legliz katolik nan yon seksyon-riral nan peyi Ayiti."
}, {
  "word": "Shapit",
  "description": "Yonn nan shak gwo divizyon, pati yon liv kote ekriven an pale de yon sijè ki sanble li diferan de lòt pati nan liv la.  Travay yon bòkò fè pou yon moun ki vini kote li pou shashe konnen yon verite."
}, {
  "word": "Shashe",
  "description": "Fouye nan mitan plizyè bagay pou rive jwenn yon bagay.   Gade plizyè bagay byen pou rive jwenn yonn, pou pi piti, nan li."
}, {
  "word": "Shat",
  "description": "Yon bèl ti bèt ki gen zòrèy kanpe, tèt won, ki fè yon son nan gòj li tankou:  miyaw, miyaw, …  Gen yon lòt son san rete e endepandan de volonte shat la ki toujou ap fèt nan gòj li tou.  Moun ki soufri maladi, Las, gen menm son sa a nan gòj yo tou.  Koko fi."
}, {
  "word": "Shavire",
  "description": "Pran yon pozisyon tankou lè tèt la vini anba epi pye yo ale anlè.   Yon mashin ki koushe sou yon kwen li, tèt anba, nan yon falèz."
}, {
  "word": "Shèf",
  "description": "Moun ki gen pouvwa e fòs pou gouvène tankou yon prezidan, yon wa, e latriye.  Nenpòt militè.  Shèf Seksyon, Non moun ki te reponsab seksyon riral nan peyi Ayiti yo te genyen.  Shèf seksyon yon te gen anpil pouvwa nan men yo paske yo te milisyen tou."
}, {
  "word": "Shèk",
  "description": "Yon moso papye yon bank bay yon kliyan li pou fè konnen moun sa a te fè yon biznis avèk bank la pou kenbe lajan pou li epi peye nenpòt moun ki parèt devan bank la avèk moso papye sa a ki gen non moun nan, yon motan kòb la an shif e an lèt, dat jou a ou byen nenpòt dat rezonab, siyati kliyan bank la."
}, {
  "word": "Shemen",
  "description": "Wout.  Nenpòt mwayen moun itilize pou rive yon kote, jwenn yon bagay.  Jezi Kris."
}, {
  "word": "Shemiz",
  "description": "Yon rad gason mete sou yo pou kouvri kò yo soti nan kou yo pou rive nan senti yo.  Yon shemiz gen yon kòlèt, de mansh kout ou byen long, yon pòsh (pou pi piti) sou bò gosh la e sou lestomak gason a.  Yon shemiz fann sou devan epi li gen bouton pou fèmen li kote li fann nan."
}, {
  "word": "Shemizèt",
  "description": "Yon rad gason mete sou yo e anba shemiz yo.  Shemizèt pa genyen mansh menm jan avèk shemiz e yo pa ouvri devan tou."
}, {
  "word": "Sheri",
  "description": "Yon non yon moun bay yon lòt moun ki enpòtan nan lavi li tankou mennaj, mari, madanm, frè, sè e latriye.  Nan anpil sosyete se moun ki gen sèks opoze yo ki di lòt la sheri."
}, {
  "word": "Shèsh",
  "description": "Eta yon bagay, yon moun, ki piti devan gwosè nòmal moun sipose li te dwe ye.  Yon moun anpil nan zo kò li vizib. Mèg."
}, {
  "word": "Sheval",
  "description": "Yon gwo bèt ki gen ke long, kat pye, gwo tèt.  Moun fè sheval rale, pote shay e moun monte li tou.  Sheval kapab kouri vit anpil; se sa ki fè gen anpil teren kote moun prepare pou fè kous sheval.  Yon femèl sheval kapab fè yon pitit ki rele milèt lè li kwaze avèk yon mal bourik.  Shwal."
}, {
  "word": "Sheve",
  "description": "Plim.  Plim ki grandi nan tèt, anba zèsèl moun, toupre koko fi, zozo gason e sou kò anpil bèt tankou poul, sheval, e latriye."
}, {
  "word": "Shèz",
  "description": "Yon moso plansh ou byen yon kadran ki trese avèk kòd palmis, latanyen e latriye e ki gen kat pye avèk yon dosye pou moun shita."
}, {
  "word": "Shifonnen",
  "description": "Eta yon bagay ki gen anpil mak sou li, ki pate egziste lè li te nèf.  Eta yon rad ki pa pase."
}, {
  "word": "Shimi",
  "description": "Etid syantifik konpozisyon avèk reyaksyon tout eleman nan lanati.  Yon syans."
}, {
  "word": "Shimik",
  "description": "Yon materyèl ki gen pou pi piti yonn nan eleman shimi yo nan li."
}, {
  "word": "Shin",
  "description": "Pi gwo peyi nan kontinan Azi a e li gen fontyè avèk pliske dis peyi.  Kapital peyi sa a rele Bejin e moun la pale anpil lang.  Yon pa itilize alfabèt tankou alfabèt lang Kreyòl la.  Yo itilize senbòl ki sanble avèk sa yo vle di a pou ekri yon mo. Moun ki ap li tèks lang sa kòmanse li a dwat pou rive a gosh.  Gen plis pase 1.008.175.288 moun ki ap viv nan peyi Shin."
}, {
  "word": "Shire",
  "description": "Dekole moso nan yon bagay san pran prekosyon kijan bagay la ap dekole.  Aksyon yon gason ki fòse zozo li rantre nan koko yon ti fi.  Kreve."
}, {
  "word": "Shita",
  "description": "Eta yon moun ki plwaye kò li yon fason pou li kapab fè dèyè li rive sou yon bagay tankou yon shèz kote li kapab lage tout rès kò li desann."
}, {
  "word": "Sho",
  "description": "Eta yon bagay ki resevwa shalè.  Pèfòmans, yon moun, yon atis tankou yon shantè.  Aksyon yon moun ki ap shashe montre sa li genyen, kò li, yon bagay li posede."
}, {
  "word": "Shodyè",
  "description": "Resipyan moun itilize pou mete manje bouyi sou dife."
}, {
  "word": "Shofe",
  "description": "Eta yon bagay nan moman li ap resevwa shalè.  Eta yon ti gason, yon ti fi ki anvi gen mennaj.  Moun panse timoun sa gen anpil shalè (anvi fè lanmou) ki ap grandi andedan li."
}, {
  "word": "Shofè",
  "description": "Moun ki shofe yon bagay.  Yon moun ki konnen kondi yon mashin tankou yon kamyon."
}, {
  "word": "Shòfrèt",
  "description": "Malkadi.  Manifestasyon yon maladi kèk moun genyen ki fè yo pèdi konesans, tranble anpil epi rele pandan boush yo ap fè kim."
}, {
  "word": "Shose",
  "description": "Pati nan yon wout ki nan mitan de liy kote yon mashin kapab pase a.  Yon ri kapab genyen de ou byen plizyè shoshe."
}, {
  "word": "Shosèt",
  "description": "Yon ti sak moun mete nan pye yo pou anpeshe soulye fwote dirèkteman nan pye yo."
}, {
  "word": "Shou",
  "description": "Yon vejetab ki bon pou mete nan bouyon e legim.  Yon pati nan pye palmis ki kouvri avèk anpil tash.  Tash ki poko rèk pou parèt deyò.  Ti gou sikre li genyen an fè li fè bon legim tou."
}, {
  "word": "Shouk",
  "description": "Rès dèyè yon bagay tankou yon pye bwa ki kase.  Rès yon dan ki kase nan boush yon moun, yon bèt."
}, {
  "word": "Shoukèt",
  "description": "Yon ti shouk.  Yon moun ki pa grandi tankou moun nòmal grandi."
}, {
  "word": "Shwa",
  "description": "Libète yon moun genyen pou li kapab shwazi.  Plizyè bagay ki disponib pou yon moun pran nenpòt nan yo li vle."
}, {
  "word": "Shwal",
  "description": "Sheval.  Yon gwo bèt ki gen ke long, kat pye, gwo tèt.  Moun fè sheval rale, pote shay e yo monte li tou.  Sheval kapab kouri vit anpil; se sa ki fè gen anpil teren kote moun prepare pou fè kous sheval.  Yon femèl sheval kapab fè yon pitit ki rele milèt lè li kwaze avèk yon mal bourik."
}, {
  "word": "Shwazi",
  "description": "Travay yon moun ki itilize libète li genyen pou pran nenpòt nan plizyè bagay ki disponib."
}, {
  "word": "Shyen",
  "description": "Yon bèt ki bon zanmi moun lè moun nan trete li byen.  Yon shyen gen kat pye, yon ke long, boush long.  Shyen kapab meshan pou moun li pa konnen.  Li toujou vle pwoteje mèt li kont moun li kwè ki ap ale atake mèt.  Kèk shyen byen avèk tout moun menmsi se premye fwa yo wè moun nan.  Lè yon mal shyen ap kwaze yon femèl, li ap kole avèk femèl la pou jis li fini voye.  Shyen zanmi shat."
}, {
  "word": "Si",
  "description": "Eta yon bagay ki gen anpil asid nan li.  Sik kapab shanje gou yon bagay ki si.  Mo yon moun itilize pou rantre yon kondisyon nan lide li.  Yonn nan sèt nòt mizikal yo:  do, re, mi, fa, sòl, la, si."
}, {
  "word": "Sid",
  "description": "Yonn nan kat pwen kadinal yo.  Li opoze a nò."
}, {
  "word": "Sik",
  "description": "Yon preparasyon, konsantrasyon ji kann ki fè likid sa a vini fè yon poud tankou sab, men li dous e li fonn nan likid.  Nenpòt poud dous."
}, {
  "word": "Siklòn",
  "description": "Yon gwo shanjman nan fonksyónman nòmal lanati ki bay anpil van fò ki ap vire nan yon sèl plas.  Siklòn bay gwo lapli ki kapab detri anpil bagay nan yon tan kout.  Van yon siklòn kapab vire nan yon sèl plas avèk yon vitès pi vit pase 150 kilomèt shak inèdtan pandan li ap deplase avèk yon vitès 10 kilomèt shak inèdtan konsa."
}, {
  "word": "Sikre",
  "description": "Eta yon bagay ki vini dous paske li gen sik ki fonn nan yon li.  Yon bagay ki gen sik nan li."
}, {
  "word": "Siksesyon",
  "description": "Eta nenpòt bagay, moun ki ranplase, ki vini apre yon lòt bagay, moun."
}, {
  "word": "Silans",
  "description": "Absans bri, son avèk pale.  Eta yon moun ki pa vle reponn yon kesyon."
}, {
  "word": "Silvouplè",
  "description": "Ekspresyon nan boush yon moun ki vle montre li pa merite yon sèvis li ap mande.  Mo moun itilize pou sipliye yon lòt moun pou rann li yon sèvis.  Yon moun ki vle mande yon asasen pou li pa touye li kapab di asasen an:  silvouplè pa touye mwen."
}, {
  "word": "Siman",
  "description": "Yon poud koulè gri mason itilize pou yo fè mòtye ki ap vini di anpil lè li sèsh.  Yon lakòl kòdonye itilize pou yon kole moso kui nan semèl soulye."
}, {
  "word": "Simante",
  "description": "Mete mòtye ki gen siman nan li sou yon moso tè, andedan shanm yon kay."
}, {
  "word": "Simetyè",
  "description": "Yon plas kote ki gen anpil kavo pou moun mouri avèk moso tè pou antere moun mouri.  Dènye plas kote yon moun ki sou tè a gen pou yo ale.  Dènye plas kote moun mennen fanmiy yo pou ale pran dènye repo yo."
}, {
  "word": "Sinema",
  "description": "Plizyè sèn teyat ki kole ansanm e anrejistre sou yon band-mayetik pou bay imaj sèn yo menm jan yo te anrejistre a sou yon gwo ekran.  Gwo ekran sa yo bay tout gwosè aktè avèk aktris yo nòmalman tankou nan lavi reyèl.  Film.  Yon kay ki gen anpil shanm nan li kote gen yon film ap jwe nan shak shanm yo."
}, {
  "word": "Sinistre",
  "description": "Kantin.  Manje gwo peyi tankou Etazini te konnen voye bay peyi pòv yo pou separe bay moun ki pa kapab ashte manje pou swen tèt yo, pitit yo.  Shèf peyi pòv yo te konnen vann manje sa yo pou yon montan lajan ki pi piti pase kantite lajan yo kapab ashte manje nan mashe.  Eta moun nan yon zòn kote yon siklòn fini pase."
}, {
  "word": "Sipliye",
  "description": "Mande yon moun yon sèvis yon fason pou montre moun nan grandè li avèk respè li kapab jwenn si li rann sèvis sa."
}, {
  "word": "Sipò",
  "description": "Yon fòs etranje ki nesesè pou yon moun jwenn yon nivo satisfaksyon.  Aksyon yon moun ki dakò avèk yon bagay yon lòt moun fè.  Bagay ki nesesè pou yon bagay, yon moun kapab kenbe yon pozisyon.  Konvèsasyon yon moun gen avèk yon lòt moun ki gen yon moun nan fanmiy li, pwòsh li mouri."
}, {
  "word": "Sipòte",
  "description": "Aksyon yon moun, yon bagay ki bay sipò.  Bay sipò."
}, {
  "word": "Sipòtè",
  "description": "Moun ki bay sipò.  Moun ki patisipe nan yon manifestasyon pou sipòte yon desizyon politik yon moun pran."
}, {
  "word": "Sis",
  "description": "Sizyèm shif nan nonb pozitif yo.  6.  Senk plis en.  Twa miltipliye pa de."
}, {
  "word": "Sispann",
  "description": "Moman kote yon bagay kanpe pou rekòmanse ankò yon lòt lè.  Kanpe."
}, {
  "word": "Sitadèl-Laferyè",
  "description": "Pi gwo moniman nan peyi Ayiti ki nan nò peyi a e sou yon mòn nan do vil Sen-Rafayèl.  Ayisyen te konstwi li sou gouvènman Anr Kristòf ki te yon wa nan zòn sa a.  Kote batiman sa a sitiye a te ede wa a defann wayòm li kont lòt peyi e lòt pati nan peyi Ayiti a menm ki te gen yon lòt gouvènman nan tèt li.  Jodia, Sitadèl la se yonn nan pi gwo mèvèy nan lemond."
}, {
  "word": "Sitiye",
  "description": "Kote yon bagay tankou yon moso tè, ki pa janm deplase, ye."
}, {
  "word": "Sitwayen",
  "description": "Moun ki pote nasyonalite yon peyi.  Moun ki te fèt nan yon peyi e ki rete kenbe nasyonalite li te genyen nan menm peyi sa."
}, {
  "word": "Sitwon",
  "description": "Grenn yon pye bwa ki gen anpil asid nan li.  Yon grenn sitwon gen prèske menm fòm avèk yon ze poul.  Sitwon gen koulè vè anvan li mi e apre sa li vini gen koulè jón.  Yon pye sitwon gen anpil pikan sou li e li pa grandi tou dwa apre li fini rive yon wotè."
}, {
  "word": "Sitwonad",
  "description": "Limonad.  Yon ji ki gen dlo, sitwon avèk sik nan li.  Li pote non sitwonad la paske li gen sitwon nan li."
}, {
  "word": "Sitwonnen",
  "description": "Fwote moso sitwon sou yon bagay tankou vyann epi mete ji sitwon nan li."
}, {
  "word": "Siv",
  "description": "Yon epis ki gen koulè vè e ki bay manje bon gou.  Ayisyen itilize siv anpil nan manje, men li pa bon pou moun manje anpil siv lè moun nan kòmanse granmoun."
}, {
  "word": "Sivik",
  "description": "Nenpòt bagay ki gen rapò avèk yon sitwayen yon peyi tankou vote, ale nan lagè, patisipe nan jiri e latriye."
}, {
  "word": "Sivil",
  "description": "Tout moun ki pa oblije mete inifòm sou yo pou abiye, fè travay yo, patisipe nan yon òganizasyon.  Moun ki pa lye avèk yon gwoup militè."
}, {
  "word": "Siviv",
  "description": "Kontinye viv malgre tout danje, tribilasyon ki te kapab kòz lanmò."
}, {
  "word": "Siwo",
  "description": "Nenpòt likid ki gen anpil sik nan li.  Likid syantis nan bransh medikal yo prepare pou kèk maladi tankou grip.  Nenpòt bagay ki dous anpil.  Siwo Myèl, Yon siwo myèl mete nan lasi yo epi moun separe lasi a avèk siwo a."
}, {
  "word": "Siye",
  "description": "Fwote yon bagay sèsh sou fas yon bagay ki gen yon likid pou retire likid la sou fas bagay sa a.  Pase yon bagay tankou papye, twal sou pati nan yon bagay ki gen pousyè pou netwaye li, retire pousyè yo."
}, {
  "word": "Siyen",
  "description": "Travay yon moun ki ekri non li anba yon ekriti pou fè nenpòt moun ki ap li tèks sa a konnen ki moun ki te ekri li, menmsi non moun ki anba tèks la pate ekri tèks la, li aksepte pran tout responsablite tèks la lè li siyen anba li.  Anpil moun shashe envante yon senbòl yo panse lòt moun pa kapab imite pou ranplase non yo nan sitiyasyon konsa."
}, {
  "word": "Sòl",
  "description": "Yonn nan sèt nòt mizik yo:  do, re, mi, fa, sòl, la, si."
}, {
  "word": "Somèy",
  "description": "Dòmi.  Eta kote yon pa konnen anyen ki ap pase sou kote e li kapab fè rèv.  Somèy prèske menm jan avèk lanmò.  Yon moun ki sou kapab rantre nan yon somèy ki pre lanmò anpil paske li difisil pou moun sa a reveye."
}, {
  "word": "Somye",
  "description": "Yon matla ki gen resò an fè e eponj sou tèt resò yo pou pèmèt matla a fè resò lè moun koushe sou li.  Tout kote kò moun nan fè vant matla ap pouse eponj pou sipòte pati sa a nan kò moun nan."
}, {
  "word": "Son",
  "description": "Nenpòt bagay zòrèy kapab tande."
}, {
  "word": "Sonnen",
  "description": "Eta yon bagay ki fè yon gwo son ki twò fò pou moun koute.  Son yon klòsh fè."
}, {
  "word": "Sòs",
  "description": "Manje likid moun fè pou yo mete sou lòt manje ki di pou ede manje di sa yo desann pi fasil nan gòj.  Sòs ogmante gou manje di yo ki pa kapab kenbe bon gou pou anpil tan menm jan avèk sòs."
}, {
  "word": "Sosis",
  "description": "Vyann moulen ki ranje nan yon moso trip, nan kèk ti sak ki prepare avèk materyèl ki gen prèske menm gou avèk trip bèt.  Sosis kapab long anpil, men mashann koupe yo nenpòt longè moun ki ap ashte yo vle mashann nan koupe yo.  Gen sosis ki fèt avèk vyann anpil diferan bèt."
}, {
  "word": "Sosyete",
  "description": "Gwoup moun ki antann yo pou yo viv ansanm;  konsa yo fè lwa pou esplike dwa avèk devwa shak moun.  Shak moun fèt pou konnen kijan pou yo konpòte yo pou pyès moun pa anniye moun ki ap viv sou kote yo.  Kapab gen plizyè sosyete nan yon peyi, men nòmalman yon peyi se yon sosyete."
}, {
  "word": "Sòt",
  "description": "Eta yon moun entelijans li pa devlope, ki pa gen menm konesans moun ki gen menm laj avèk li genyen."
}, {
  "word": "Soti",
  "description": "Kite andedan yon bagay epi ale.  Sib shemen pou ale deyò yon bagay tankou yon kay.  Aksyon yon moun ki pran wout ale kite yon espas fèmen, andedan yon bagay kote li te ye tankou dlo. "
}, {
  "word": "Sou",
  "description": "Okipe pozisyon anlè yon bagay, men toupre bagay la e kèk fwa kole anlè bagay la.  Bwè bwason ki gen alkòl nan li e ki fè moun nan pèdi ekilib mashe li.  Yon moun ki sou pa gen bon konsyans e li pale anpil.  Sou Do, Yon langaj moun itilize pou di yo ap pote yon bagay, yon responsablite sou do yo."
}, {
  "word": "Soudan",
  "description": "Yon peyi nan lès e mitan kontinan afriken an.  Kapital peyi sa rele Katoum."
}, {
  "word": "Souf",
  "description": "Sous lavi.  Yon bagay envizib nan kò moun ki kenbe li nan lavi.  Yon pwodui shimik lè li boule ki disparèt e ki pa men kite sann. Yon pati andedan kèk bèt.  Souf kapab evapore nan dife."
}, {
  "word": "Soufrans",
  "description": "Eta yon moun ki ap soufri.  Yon soufrans kapab fizik, imajinè e latriye.  Doulè."
}, {
  "word": "Soufri",
  "description": "Eta yon moun ki santi yon pati nan kò li tankou men li, pye li, pozisyon yon pò ap fè li mal.  Lè se kè yon moun ki ap fè li mal soufrans moun nan kapab imajinè paske nenpòt pati nan kò yon moun kapab transmèt yon doulè, menmsi li pa vrè bay kè moun nan.  Moun ki pè pou li pa gen yon maladi kapab santi li vini gen maladi a."
}, {
  "word": "Soulaje",
  "description": "Eta yon moun soufrans li, doulè li pase.  Eta yon moun ki sispann soufri.  Jan yon moun santi li lè responsablite li te genyen soti sou do li, ale kite li."
}, {
  "word": "Soulajman",
  "description": "Bagay moun itilize pou retire doulè, soufrans, shay ki te sou do yo."
}, {
  "word": "Souliye",
  "description": "Pase yon liy anba yon bagay tankou yon mo nan yon tèks."
}, {
  "word": "Soulye",
  "description": "Yon bagay moun itilize pou kouvri pati anba nan pye yo pou li pa toushe atè e evite frape pati sa a ki enpòtan anpil pou yo mashe.  Gen plizyè diferan soulye:  kèk nan yo kout, kèk nan yo wo e yo kouvri plis pati nan pye moun pou pwoteje li plis."
}, {
  "word": "Soupe",
  "description": "Yon repa tankou labouyi, banana, avwán ayisyen manje lannwit anvan yo ale koushe pou nwit la."
}, {
  "word": "Soupoudre",
  "description": "Yon bagay ki sanble avèk sosis mashann vyann ki vann vyann koshon prepare.  Li bay manje bon gou.  Mashann sa yo prann trip koshon apre yo fini touye li, yo prepare epis pou mete nan li, yo melanje li avèk kèk ti moso vyann avèk trip ki pi piti yo pou mete andedan yon bransh trip ki pi gwo.  Malgre soupoudre a pa andedan refrijeratè pou konsève, ayisyen panse li pi bon e tout tan li pi santi anpil ayisyen pi renmen li nan manje."
}, {
  "word": "Sourit",
  "description": "Yon ti bèt tèt koupe avèk rat ki gen ke long, fèy zòrèy kanpe, boush long.  Li renmen viv nan tou tè e li renmen anpil nan manje moun renmen yo.  Syantis nan bransh medikal yo itilize ti bèt sa a pou eseye medikaman anvan yo bay moun li paske konstitisyon kò moun menm jan avèk kò li.  Yonn nan senk pati yon òdinatè operatè a itilize pou shwazi yon bagay sou ekran an epi kòmande òdinatè a.  Moun deplase li menm jan avèk yon sourit ki ap mashe."
}, {
  "word": "Sous",
  "description": "Premye kote yon bagay soti.  Rasin, orijin yon bagay.  Tou kote dlo ki fòme yon rivyè soti.  Tout rivyè soti nan yon sous."
}, {
  "word": "Souse",
  "description": "Mete pwent yon bagay andedan boush pou rale yon likid ki andedan li tou dousman.  Mete pwent yon bagay, yon bagay nan boush epi fè tankou li gen likid andedan li ki ap soti tou dousman pandan krashe ap mouye bagay la."
}, {
  "word": "Sousè",
  "description": "Moun ki ap souse, moun ki konnen kijan pou li souse yon bagay.  Sousè San, Sansi.  Yon lougawou ki ale nan kwen kay yon moun epi ki ap rale san yon moun vini nan boush li san li pa rantre andedan kay la."
}, {
  "word": "Sousi",
  "description": "Yon ti liy sheve ki anlè je moun, men li pa sheve.  Shak moun gen sousi sou tou de je li.  Eta yon moun ki santi li gen yon responsablite sou do li."
}, {
  "word": "Soustraksyon",
  "description": "Yonn nan kat operasyon aritmetik yo:  adisyon, soustraksyon, miltiplikasyon, divizyon.  Soustraksyon de nan kat ap bay de (4 - 2 = 2)."
}, {
  "word": "Souvan",
  "description": " Eta yon bagay repetisyon li fèt avèk rapidite.  Mè yo priye pi souvan pase tout relijye."
}, {
  "word": "Spèmatozoyid",
  "description": "Yonn nan plizyè milyon ti bèt ki nan deshay yo gason, yon mal bèt.  Lè yon spèmatozoyid rankontre avèk yon ovil andedan yon fi, li fòme yon ze ki ap ale vini yon timoun."
}, {
  "word": "Spò",
  "description": "Anpil disiplin kote moun sib kèk prensip pandan yo ap fè egzèsis pou ogmante enèji nan manm kò yo.  Moun fè spò anpil pou ede yo kontinye jwe anpil jwèt tankou foubòl, volebòl, bezbòl e latriye."
}, {
  "word": "Spòtif",
  "description": "Eta yon moun ki fè spò.  Nenpòt bagay ki gen rapò avèk spò."
}, {
  "word": "Stil",
  "description": "Jan yon moun ye, jan li abiye, jan li fè tout bagay li konnen fè.  Mwayen yon moun itilize pou li fè yon bagay."
}, {
  "word": "Suiv",
  "description": "Gade sib."
}, {
  "word": "Suzuki",
  "description": "Yon konpayi mashin Japonè."
}, {
  "word": "Swasant",
  "description": "Swasantyèm nonb pozitif la.  60.  San-ven divize pa de.  Senkant plis dis.  Swasant Dis, Swansant-dizyèm nonb pozitif la.  70.  Senkant plis ven.  San mwens trant.  San-karant divize pa de."
}, {
  "word": "Swe",
  "description": "Eta yon moun ki rete anpil nan solèy, ki ap fè anpil egzèsis avèk kò li epi yon likid sale vini ap soti nan pò nan kò li.  Eta yon moun ki kanpe devan yon odyans pou premye nan lavi li epi, menmsi likid sale pa ap soti nan pò li yo, li santi likid la ap soti."
}, {
  "word": "Swis",
  "description": "Yon peyi nan kontinan Ewòp la, nan nò-lwès Nòvèj e ki gen yon konstitisyon tankou tout peyi kote ki gen wa yo.  Kapital li rele Stokòlm e lang moun nan peyi sa rele Swis tou."
}, {
  "word": "Syans",
  "description": "Konesans ki shita sou reyalite.  Yon bransh konesans byen defini.  Konesans sou lwa lanati.  Tout kò ki pre fas tè a ap toujou tonbe sou li; sa a a se yon lwa lanati ki rele gravite."
}, {
  "word": "Syantifik",
  "description": "Tout bagay ki gen rapò avèk syans.  Travay yon syantis tankou yon reshèsh."
}, {
  "word": "Syèk",
  "description": "Yon kantite san ane ki pase.  San ane."
}, {
  "word": "Syèl",
  "description": "Espas vid moun kapab wè anlè a kote zetwal, lalin avèk tout lòt planèt yo ye. "
}, {
  "word": "T",
  "description": "Diznevyèm lèt nan alfabèt lang Kreyòl la.  Li pwononse menm jan avèk mo, te, ki vle di fèy bouyi nan dlo epi ki sikre ou byen sele pou moun bwè."
}, {
  "word": "Tab",
  "description": "Yon moso plansh rektang, kare ou byen kèk lòt materyèl ki kanpe sou yonn ou byen plizyè pye kote moun manje, jwe kat e latriye.  Yon fason pou di de ou plis moun pa depase lòt la nan nivo, wotè."
}, {
  "word": "Tablo",
  "description": " Yon moso materyèl ki kole nan yon mi ou byen mi an menm ki prepare yon fason pou lakrè kapab ekri sou li.  Yon desen ki fèt sou yon materyèl di tankou yon mi e desinatè a fè li avèk penti.  Penti."
}, {
  "word": "Tafya",
  "description": "Bwason ki gen alkòl nan li e ki fè moun sou.  Gen plizyè tafya tankou kleren, byè, wiski, wonm e latriye.  Shak bwason gen plis alkòl pase yon lòt."
}, {
  "word": "Tafyatè",
  "description": "Moun ki bwè tafya san kontwole kantite yo ap bwè e san shwazi lè e kote pou yo bwè.   Moun ki kapab bwè anpil tafya san li pa sou.  Lè yon moun bwè tafya ajen, li fè li sou pi vit pase si li te manje anvan li bwè.  Yon tafyatè kapab bwè tafya li nenpòt lè nan yon jounen, menm nan maten."
}, {
  "word": "Taksi",
  "description": "Yon vwati piblik ki pran pasaje yon kote epi ale depoze yo yon lòt kote epi yo peye shofè a kòb.  Gen de gwoup taksi:  yon gwoup pote yon sèl moun ou byen plizyè moun ki konnen yonn avèk lòt e lòt gwoup la pote plizyè moun menmsi yonn pa konnen lòt.  Premye gwoup la fèt pou moun ki pa vle monte yon mashin avèk moun yon pa konnen e se diferan pou dezyèm gwoup la."
}, {
  "word": "Talon",
  "description": "Yon pati nan yon soulye ki fè pwent dèyè soulye a pi wo pase devan soulye a.  Talon soulye fi yo kapab long anpil e li fè dèyè soulye sa yo wo anpil."
}, {
  "word": "Tan",
  "description": "Lè.  Yon kantite lè, jou, mwa, ane e latriye ki pase. Yon epòk ki pase.  Eta tanperati ye.  Tan Lontan, Yon kantite tan ki te pase, men gen anpil tan depi tan sa a te pase. "
}, {
  "word": "Tanbou",
  "description": "Yon enstriman mizikal ki fèt avèk yon moso bwa tankou yon mamit, yon twons bwa.  Li kouvri avèk yon moso po bèt ou byen yon materyèl ki kapab tranble menm jan avèk po bèt nan yon pwent.  Lòt pwent la rete san kouvri pou kite son pase.  Mizisyen, gwoup mizikal nan tout peyi itilize tanbou nan mizik yo.  Fòm tanbou a kapab shanje soti nan yon peyi pou ale nan yon lòt, men tout jwe menm wòl la."
}, {
  "word": "Tanbourinè",
  "description": "Mizisyen ki renmen bat tanbou, se sèl enstriman sa li konnen jwe e li jwe li byen anpil.  Li difisil pou jwenn yon lòt moun ki bat tanbou tankou yon tanbourinè paske se djòb li, pwofesyon li."
}, {
  "word": "Tanbouyè",
  "description": "Yon moun ki konnen bat tanbou, men bat tanbou se yon bagay li fè pou yon okazyon.  Bat tanbou pa pwofesyon yon tanbouyè.  Li fasil pou ranplase yon tanbouyè paske prèske nenpòt lòt moun kapab bat tanbou menm jan avèk li."
}, {
  "word": "Tandans",
  "description": "Direksyon, pozisyon yon moun, yon bagay gen entansyon ale, pran.   Si pa gen yon rezon ki pi enpòtan pase rezon moun nan, bagay la deja genyen pou li ale nan direksyon sa a li ap kontinye ale."
}, {
  "word": "Tande",
  "description": "Pati andedan zòrèy yon moun ki ede li idantifye son. Tande son san bay son sa enpòtans ou byen kenbe li nan yonn nan twa memwa yo."
}, {
  "word": "Tank",
  "description": "Yon mashin gèrye itilize pou ale nan lagè e mashin sa a itilize shèn pou li deplase.  Li pote kanno, li tire kanno e bal ti zam pa kapab rantre andedan li pou touye moun li ap pote yo.  Yon bwat an metal ki kenbe gaz pou motè yon mashin brile, rezèvwa."
}, {
  "word": "Tann",
  "description": " Travay moun ki rete ap gade pou wè ki kote yon bagay ap soti pou li rive jwenn moun ki rete ap gade a."
}, {
  "word": "Tanperati",
  "description": "Shanjman nan lanati ki kapab fè moun sho, frèt ou byen nan mitan yo de a, ant sho e frèt.  Nan peyi twopikal yo tanperati a toujou nan mitan shalè avèk fredi.  Nan peyi tankou Etazini, gen twa tanperati yonn frèt anpil, yonn sho anpil, yon lòt ant sho avèk frèt. "
}, {
  "word": "Tant",
  "description": "Sè manman, sè papa yon lòt moun.  Yon ti kay moun fè pou pase yon ti tan kout nan yon zòn."
}, {
  "word": "Tante",
  "description": "Sa yon bagay ki devan je yon moun fè li santi andedan li ki kapab fè moun nan aji yon fason ou byen yon lòt fason.  Yon bagay yon moun eseye fè e li pa rive fè bagay la jan li te dwe fèt la."
}, {
  "word": "Tash",
  "description": "Pwent anba fèy yon pye palmis.   Peyizan ayisyen itilize tash pou kouvri kay, fè kayèt."
}, {
  "word": "Tchit",
  "description": "Yon ti zwazo ki fè yon ti bri tankou li ap di non li tanzantan:  tchit! tchit! …"
}, {
  "word": "Te",
  "description": "Fèy bouyi nan dlo epi ki sikre ou byen sele pou moun bwè."
}, {
  "word": "Tè",
  "description": "Planèt kote tout peyi nan lemond ye, kote tout moun nan lemond ap viv.  Pati sou planèt Tè a ki pa gen dlo kouvri li."
}, {
  "word": "Tèks",
  "description": "Konbinezon plizyè mo ki fòme plizyè fraz lektè kapab li epi yo ap konprann sa ekriven an te vle di a.  Yonn, plizyè paragraf ki rasanble ansanm.  Yon liv."
}, {
  "word": "Teleco",
  "description": "Premye e sèl konpayi telefòn nan peyi Ayiti pandan anpil ane pou jis lè kèk ti konpayi kòmanse rantre nan peyi a,  nan finisman ane katreven-dis yo.  Konpayi sa a te gen monopòl tele-kominikasyon nan peyi a e li pate kapab reponn a bezwen telefòn moun nan peyi a."
}, {
  "word": "Telefòn",
  "description": "Yon mwayen kominikasyon ki pèmèt de ou plis moun kominike de lwen depi yo gen yon aparèy telefòn ki lye avèk yonn nan santral telefonik yon konpayi ki bay sèvis telefonik.  Nan kòmansman evolisyon telefòn konpayi yo te konnen itilize fil sèlman pou lye shak aparèy nan yon kay avèk santral la.  Nan dezyèm pati ventyèm syèk la, te vini gen aparèy telefòn san fil ki sèvi tankou jan gwo santral yo te konnen pèmèt moun nan yon peyi kominike avèk lòt moun nan lòt peyi."
}, {
  "word": "Telefone",
  "description": "Itilize yon aparèy telefòn pou kominike avèk yon moun nan yon lòt kay, yon lòt peyi.  Fè nimewo telefòn yon moun pou kominike avèk li."
}, {
  "word": "Televizyon",
  "description": "Yon ti aparèy moun gen andedan kay ki bay son ansanm avèk imaj; konsa moun kapab wè moun sou ekran ti aparèy la.  Yon gwo aparèy ki voye imaj avèk son nan yon ti aparèy; konsa moun ki ap travay kote gwo aparèy sa yo ye a kapab voye nenpòt imaj tankou sinema nan ti aparèy yo, nan kay moun.  Tout sa ki fèt nan radyo kapab fèt nan televizyon, men nan televizyon moun pa tande sèlman; yo kapab wè sa yo tande a.  Gwo aparèy televizyon yo itilize ond ki bezwen antèn pou kominike avèk ti aparèy ki resevwa son avèk imaj yo.  Gwo aparèy yo itilize kamera pou sous son avèk imaj.  Kamera kapab pran son avèk imaj yo nenpòt kote epi ale transmèt yo bay gwo aparèy la ki ap ale itilize antèn pou voye son ansanm avèk imaj nan lespas kote ti aparèy yo jwenn son avèk imaj sa yo pou mete sou ekran yo."
}, {
  "word": "Temwayaj",
  "description": "Pawòl yon moun ap di de yon bagay li te wè avèk je li.  Yon diskou fidèl nan yon legliz bay pou fè konnen kijan Bonbye te bon pou li nan yon bèl moman nan lavi li."
}, {
  "word": "Temwaye",
  "description": "Bay yon temwayaj.  Shita sou yon shèz nan yon jijman pou pale de yon aksyon tankou yon krim yon moun te fè pou ede yon avoka defann yon lòt moun."
}, {
  "word": "Temwen",
  "description": "Yon moun ki te wè lè yon bagay te ap pase.  Yon moun yon bagay te pase devan li e li kapab ede mete yon kriminèl nan prizon paske li se pi bon moun ki kapab pale de sa ki te pase a."
}, {
  "word": "Tenten",
  "description": "Bagay ki pa gen pyès valè, ki pa kapab vann pou lajan paske pa gen moun ki ap bay kòb pou li.  Yon tenten pa kapab itilize pou fè anyen.  Mo moun itilize pou di yon moun li pa gen pyès valè."
}, {
  "word": "Tenis",
  "description": "Yon soulye ki fèt avèk plastik e twal, ki fè pye moun dous.  Se soulye sa jwè anpil jwèt spòtif itilize paske li pa ap peze pye yo.  Yon jwèt ki gen de ekip, men shak ekip yo gen yonn ou byen de moun nan yo.  Shak ekip kanpe nan yon bò yon filè avèk yon rakèt nan men yo pou frape sou  yon ti boul.  Shak fwa yon ekip kite lòt ekip la frape boul la yonn a de fwa nan bò teren pa li a, lòt ekip la make pwen an plis sou li."
}, {
  "word": "Teritoryal",
  "description": "Nenpòt bagay ki gen rapò avèk yon teritwa."
}, {
  "word": "Teritwa",
  "description": "Yon espas tè avèk fontyè ki gen yon shèf ki ap gouvène li avèk tout sa ki nan li."
}, {
  "word": "Tèt",
  "description": "Pati ki pi wo nan yon bagay.  Pati kote boush, je, nen e zòrèy yon èt vivan tankou moun ye.  Premye gwoup moun ki kanpe nan yon liy moun.  Tèt Anba, Pran yon moun, yon bagay epi mete pati anlè a anba epi mete pati anba anlè.   Tèt Kale, Eta tèt yon moun ki koupe tout sheve nan tèt li.  Eta yon moun tout sheve nan tèt li rashe lè li soufri yon maladi tankou kansè.  Eta yon gason ki pèdi tout sheve nan tèt li paske li ap rantre nan laj."
}, {
  "word": "Tete",
  "description": "Pati nan kò moun ki sanble avèk yon bouton ki sou lestomak moun nan.  Pati nan kò yon fi ki gwosi lè li ap fòme e ki fè lèt lè li nouris.  Fi santi yo byen lè yon gason, ki mennaj yo, mari yo ap manyen tete yo."
}, {
  "word": "Tetin",
  "description": "Yon pati nan yon bibwon ki fèt an plastik pou rantre nan boush yon bebe san li pa fè ti bebe a mal lè bebe a peze sou li pou vale nouriti a. "
}, {
  "word": "Teyat",
  "description": "Pèfòmans plizyè aktè sou yon sèn pandan odyans la ap gade yo dirèkteman.  Pèfòmans plizyè aktè sou yon sèl sèn ki gen shanjman pou fè li sanble avèk plizyè sèn diferan, men ki anrejistre sou yon band-mayetik."
}, {
  "word": "Thomassique",
  "description": "Gade Tomasik."
}, {
  "word": "Ti",
  "description": "Eta yon bagay kantite li pa anpil, gwosè li pa gwo anpil, yon bagay ki poko grandi pou rive nan wotè nòmal li."
}, {
  "word": "Tibèf",
  "description": "Moman nan karès de moun pandan yonn ap souse koko ou byen zozo lòt moun nan."
}, {
  "word": "Tijan",
  "description": "Non yon lwa gason ki konnen itilize kò bòkò pou kominike avèk pitit fèy li yo."
}, {
  "word": "Tikal",
  "description": "Yon kantite bagay yon moun ap mande ou byen li ap bay, men li pa vle resevwa, bay yon gwo kantite nan li."
}, {
  "word": "Tikè",
  "description": "Jan yon moun rele mennaj li pou montre mennaj la li enpòtan pou li tankou kè li.  Yon moso papye yon moun resevwa ki bay li yon otorizasyon  pou yon kòb li peye yon moun, yon konpayi."
}, {
  "word": "Timalis",
  "description": "Yon karaktè nan lejand ayisyen ki toujou parèt pou pi entelijan pase Bouki lè li konfwonte Bouki, yon lejand tou."
}, {
  "word": "Timid",
  "description": "Tanperaman yon moun ki renmen rete pou kont li paske li pa renmen rete menm kote avèk lòt moun.  Eta yon moun ki pa kapab gade moun nan je, menm lè li ap pale avèk yon moun.  Timoun ki grandi avèk granmoun ki toujou ap entimide yo kapab grandi timid e mwen entelijan tou."
}, {
  "word": "Timidite",
  "description": "Eta yon moun ki timid."
}, {
  "word": "Timoun",
  "description": "Yon moun ki ap viv lakay manman li avèk papa li paske li poko kapab responsab tèt li.  Yon moun ki poko gen dizuit ane, ki pa kapab vote nan yon eleksyon, ki poko fè pitit e sosyete a ap difisil pou aksepte li deja fè pitit.  Moun ki sou responsablite paran yo."
}, {
  "word": "Tinèl",
  "description": "Yon tou anba tè ki kòmanse yon kote pou mennen moun yon lòt kote.  Yon tinèl kapab pase anba yon rivyè e mashin kapab itilize li pou travèse rivyè sa a."
}, {
  "word": "Tip",
  "description": "Pati nan yon bagay ki fè moun konprann pi byen kisa bagay la ye, aksyon yon moun ki fè konnen pi byen ki moun moun nan ye."
}, {
  "word": "Tire",
  "description": "Eta yon moun ki resevwa yon bagay nan yon bagay li ap fè tankou li yon liv.  Rale yon bagay vini nan yon direksyon.  Mete yon zam tankou yon revolvè dwat sou yon bagay, yon moun epi rale gajdèt la."
}, {
  "word": "Tirivyè",
  "description": "Yonn nan vil ki pi ansyen nan peyi Ayiti kote ki te gen yon gwo kay ki te gen 365 pòt.  Kay sa a fini kraze, men mi yo toujou la.  Kay sa se te palè yon prezidan ayisyen."
}, {
  "word": "Tit",
  "description": "Yon non ki dekri pozisyon yon moun okipe san li pa dekri moun nan.  Gen anpil tit tankou, majistra, kontab, prezidan e latriye."
}, {
  "word": "Titanic",
  "description": "Yon bato ki te soti nan peyi Angletè epi li te ap ale nan peyi Etazini epi li fè aksidan e prèske tout moun ki te nan bato sa a te mouri.  Bato a te gen 2220 moun nan li ki te soti nan Peyi Angletè, men 1513 te mouri nan aksidan an.  Yon sinema sou aksidan bato ki te rele Titanic la ki te soti nan ane 1999.  Aksidan bato a te pase nan ane 1912.  Malgre moun ki te fè bato sa a te di li pa gen dwa janm fè aksidan, sou premye vwayaj li, bato a te koule anba lanmè.  Titanic se yon mize li ye konnye a kote moun kapab ale vizite li anba lanmè a."
}, {
  "word": "Titato",
  "description": "Yon jwèt ki jwe avèk twa ou byen dis pyon.  Nan jwèt sa, moun pyon li yo fini anvan pèdi pati a.  Pou yon jwè pèdi yon pyon fò li gen yon pyon an fas pyon lòt jwè a e gen yon plas dèyè pyon pa li a pou pyon lòt jwè a travèse ale."
}, {
  "word": "Tivoudra",
  "description": "Yon pou majik bòkò prepare pou yon fi ou byen yon gason pou li bay yon lòt moun nan manje avèk espwa moun sa ap vini renmen li.  Poud sa pa touye moun ki manje li a vit, men li touye moun ki manje li a tou dousman avèk doulè vant, vomisman e latriye."
}, {
  "word": "Tiwa",
  "description": "Yon bwat ki gen senk kwen.  Fas anlè a, ki te ap sizyèm kwen an pa kouvri; konsa bwat sa a kapab rantre nan yon tou pou moun rale li, mete bagay nan li epi pouse li rantre nan tou sa a ankò."
}, {
  "word": "Tiyo",
  "description": "Nenpòt bagay tankou yon moso fè long ki gen yon kanal andedan li pou likid pase avèk anpil lòt bagay pase pou ale jis kote dènye pwent bagay sa a rive."
}, {
  "word": "Tizán",
  "description": "Yon medikaman ayisyen prepare avèk fèy, rasin, po kèk fri tankou zoranj-sirèt e latriye."
}, {
  "word": "Tomasik",
  "description": "Yon vil nan Depatman Sant la ki toupre fontyè Dominikani an avèk Ayiti.  Moun nan zòn sa konnen ale ashte sa yo bezwen nan peyi vwazen an.  Thomassique."
}, {
  "word": "Tomat",
  "description": "Yon grenn yon ti plant donnen.  Li gen koulè vè lè li vèt e li gen koulè wouj lè li mi.  Grenn sa gen likid avèk ti grenn nan plizyè shanm ki andedan li.  Moun manje tomat nan salad e nan anpil lòt manje tankou konfiti-tomat."
}, {
  "word": "Tomond",
  "description": "Yon vil nan Depatman Sant la e sou Wout Nasyonal Nimewo Twa a.  Se dènye vil anvan yon moun rive nan kapital depatman an, Ensh.  Thomonde."
}, {
  "word": "Ton",
  "description": "Jan yon moun shwazi pou li pale, shante tankou wotè vwa li, vitès li ap di mo yo e shanjman nan wotè vwa li."
}, {
  "word": "Tonbe",
  "description": "Soti anlè pou rive atè avèk libète.  Lè yon bagay ap tonbe gravite rale li desann vit.  Trip bèt moun manje yo ayisyen bouyon avèk li."
}, {
  "word": "Tonmtonm",
  "description": "Yon manje moun Jeremi fè avèk lamveritab.  Yo bouyi gonbo a ansanm avèk lamveritab la.  Lè tout bagay fini kwit, yo mitonnen yo ansanm epi yo mete enpe dlo - nan  dlo ki te bouyi lamveritab la avèk gonbo a - nan lamveritab la avèk gonbo a pou yo pa rete twò di.  Tonmtonm nan bon pou manje."
}, {
  "word": "Tonnè",
  "description": "Pati nan yon loray ki gen anpil elektrisite mashe avèk li.  Loray.  Bagay kèk ayisyen konnen rele pou touye yo, nan sèman, si yon moun pa vle kwè yon pawòl yo di."
}, {
  "word": "Tonton",
  "description": "Frè manman, frè papa yon moun.   Mo anpil jèn ayisyen itilize pou rele yon moun ki pi gran pase yo; konsa yo kwè yo bay moun nan anpil respè pou moun sa.  Moun sa a pa frè manman yo ou byen papa yo."
}, {
  "word": "Tòt",
  "description": "Yonn nan twa zwazo ki sanble anpil:  toutrèl, ranmye."
}, {
  "word": "Tòti",
  "description": "Yon bèt ki viv nan dlo, ki kapab viv dèyò dlo pandan anpil tan tou e ki mashe dousman anpil.  Eta pa yon moun ki mashe dousman."
}, {
  "word": "Tòtòt",
  "description": "Yon bagay ki gen yon tou nan li pou yon moun, yon bèt rale likid ki andedan li.  Travay yon moun ki kraze yon mango epi fè yon ti tou nan pwent li pou rale ji mango a."
}, {
  "word": "Tou",
  "description": "Yon ouvèti nan yon bagay ki pa nòmal nan fòm bagay sa.  Kote yon moso soti nan yon bagay."
}, {
  "word": "Toufe",
  "description": "Eta yon èt vivan lè pa kapab rantre e soti andedan li pou jis li mouri."
}, {
  "word": "Toumante",
  "description": "Eta yon moun ki gen anpil bagay ki ap pase nan lespri li epi bagay sa yo fè moun nan pa konnen ki bagay pou li fè anvan nan tout sa li gen pou li fè.  Yon moun ki kòmanse pèdi konsyans anvan li vini fou."
}, {
  "word": "Tounvis",
  "description": "Yon moso fè ki gen fòm tèt vis e moun itilize li pou ede moun kenbe yon vis pou vise li nan yon bagay.  Tounvis Plat, Yon tounvis ki gen fòm pou li rantre nan tèt vis ki gen yon ti tras nan tèt yo.  Tounvis Etwal, Yon tounvis ki kapab rantre nan tèt vis ki gen yon ti kwa nan tèt yo."
}, {
  "word": "Toupre",
  "description": "Eta yon bagay ki pa lwen yon lòt bagay.  Toupre se yon konsepsyon, li pa reprezante menm distans la pou tout moun.  Sa ki lwen nan yon sitiyasyon kapab pre nan yon lòt sitiyasyon.  Eta yon bagay ki prèske rive tankou yon nouvèl, yon mesaj."
}, {
  "word": "Touse",
  "description": "Eta yon bagay ki te long epi yon moun pliye pou li vini kout epi li vini gen pli.  Yon bri ki soti tanzantan nan gòj yon moun ki gripe."
}, {
  "word": "Toushe",
  "description": "Resevwa lajan pou yon travay apre kontra, kòmansman, finisman yon travay.  Kole yon pati nan yon kò sou menm kò a, sou yon lòt kò.  Travay yon doktè fèy lè li ap pase men li sou tout kò yon malad pou jwenn kote yon maladi ye, pou preskri medikaman pou maladi a.  Manyen."
}, {
  "word": "Tout",
  "description": "Kantite yon bagay, yon gwoup san retire nan bagay la, gwoup la."
}, {
  "word": "Toutrèl",
  "description": "Yonn nan twa bèl zwazo ki sanble anpil yo:  ranmye, tòt."
}, {
  "word": "Touye",
  "description": "Retire lavi nan yon èt vivan.  Fè bagay ki kòz yon moun, nenpòt lòt bagay mouri."
}, {
  "word": "Toyota",
  "description": "Yon mak mashin yon konpayi Japonè fè.   Se yon mashin ki dire anpil tan.  Toyota fè tout gwosè mashin."
}, {
  "word": "Trafik",
  "description": "Eta bagay ki ap avanse nan yon direksyon, plizyè direksyon tankou anpil moun nan yon ri, mashin sou yon wout."
}, {
  "word": "Traka",
  "description": "Difikilte moun rankontre pou yo fè yon travay, nenpòt bagay.  Bagay ki reprezante yon pwoblèm."
}, {
  "word": "Tranble",
  "description": "Eta yon bagay ki ap souke tankou gen yon gwo van ki ap souke li.  Eta yon moun ki pè yon bagay, yon moun."
}, {
  "word": "Tranpe",
  "description": "Aksyon dlo tankou lapli lè li tonbe sou yon bagay epi dlo a mouye bagay la, rantre nan li.  Eta yon bagay, yon moun ki rantre nan mitan dlo epi li rete nan dlo a pandan lontan."
}, {
  "word": "Transfere",
  "description": "Fòse, pran yon bagay epi mete li yon lòt kote, nan yon lòt pozisyon.  Fòse, fè yon moun ale yon lòt kote.  Retire yon moun nan yon djòb, yon travay epi mete li nan yon lòt travay pandan li toujou ap travay pou menm patwon an."
}, {
  "word": "Transh",
  "description": "Yon moso ki koupe soti nan yon bagay moun kapab manje."
}, {
  "word": "Transhe",
  "description": "Koupe transh nan yon bagay.  Yon moso bagay ki te koupe soti nan yon bagay tankou yon moso kasav, yon moso pen e latriye."
}, {
  "word": "Trant",
  "description": "Trantyèm nonb nan nonb pozitif yo.  Twa miltipliye pa dis.  Dis plis dis, plis dis ankò.  30.  Ven plis dis."
}, {
  "word": "Travay",
  "description": "Nenpòt bagay yon moun fè ki itil nenpòt sosyete sou tè a.  Kontribisyon yon moun bay pou yon bagay rive fèt nan yon biznis, yon òganizasyon e nenpòt lòt kote moun nan ye."
}, {
  "word": "Travayè",
  "description": "Moun ki ap travay, ki gen kouray pou travay e ki renmen travay."
}, {
  "word": "Tray",
  "description": "Pwoblèm yon moun rankontre nan yon travay li ap fè epi moun sa dekouraje lè li rankontre avèk pwoblèm nan.  Pwoblèm yon moun genyen e li ap rakonte lòt moun li paske li panse pwoblèm nan twòp pou li."
}, {
  "word": "Tren",
  "description": "Yon mashin ki long anpil e ki deplase sèlman sou ray.  Yon tren sanble avèk yon koulèv ki ap trennen sou vant li paske wou li yon kashe.  Tren kapab pote anpil moun, anpil shay tankou vwati avèk kamyon."
}, {
  "word": "Trepase",
  "description": "Deplase soti nan lavi.  Moman lè yon moun ap pèdi tout fòs ki te disponib andedan li pou li kapab mouri.  Anpil moun gen yon gwo òkèt ki diminye piti piti pou jis moun nan mouri epi òkèt la disparèt."
}, {
  "word": "Très",
  "description": "Shak bransh nan yon bagay ki trese.  Shak gwo bransh sheve nan tèt yon moun ki gen twa ti gwoup sheve."
}, {
  "word": "Trese",
  "description": "Aksyon plizyè bagay tankou twa bransh fil, sheve ki ap deplase soti a dwat epi ale a gosh san rete pandan yonn ap rantre nan lòt la."
}, {
  "word": "Tretman",
  "description": "Etap yon moun pase anvan maladi li rive trete,  geri.  Jan yon moun viv avèk yon lòt moun."
}, {
  "word": "Trèz",
  "description": "Katriyèm nonb nan nonb pozitif yo ki gen de shif nan li:  en (1) avèk twa (3).  13."
}, {
  "word": "Tribilasyon",
  "description": "Pwoblèm moun genyen e ki sanble yo pa ap janm rezoud.  Moun ki gen pwoblèm konsa ap vini abitye avèk li tankou li pa yon vrè pwoblèm pou moun nan."
}, {
  "word": "Tribinal",
  "description": "Yon kay leta kote jijman fèt.  Kote yon jij, yon jiri,  de avoka ou plis, avèk yon gwoup moun reyini pou fè yon jijman.  Tout moun sa yo pa oblije patisipe nan yon jijman, men lè yo tout la gen mwens shans pou gen magouy fèt nan jijman an."
}, {
  "word": "Trip",
  "description": "Tiyo vyann moun avèk anpil lòt bèt gen andedan vant yo kote manje gen pou yo pase anvan yo ale nan poupou.  Manje ki pa ale nan poupou yo ap rete andedan vant moun nan ou byen bèt la, nan kèk trip, anvan yo rantre nan vyann kò a."
}, {
  "word": "Tripòt",
  "description": "Yon moun ki renmen pale, di bagay ki pa vrè sou lòt moun."
}, {
  "word": "Tripotay",
  "description": "Koze yon moun pale, di sou lòt moun epi bagay sa yo pa vrè."
}, {
  "word": "Twa",
  "description": "Katriyèm shif nan nonb pozitif yo.  Sis divize pa de.  De plis en.  3."
}, {
  "word": "Twal",
  "description": "Yon materyèl koutiryè avèk tayè itilize pou fè rad.  Pwodiktè ki fè twal yo te konnen itilize fil pou fè twal.  Konnye a yo fè twal avèk anpil lòt bagay, menm avèk likid tankou lèt bèf."
}, {
  "word": "Twalèt",
  "description": "Yon shanm nan yon kay kote moun benyen, lave yonn ou plizyè pati nan kò yo.  Gen twalèt ki gen kote pou moun poupou e bwose dan yo."
}, {
  "word": "Twasèt",
  "description": "Yon jwèt ki jwe avèk ventsuit fèy kat.  Nan jwèt sa, nimewo sèt la pi piti pase tout kat yo e las la pi gwo pase tout kat yo.  Soti nan pi piti a pou rive nan pi gwo a, men non tout kat yo:  sèt, uit, nèf, dis, onz (J), douz (Q), trèz (K), las (A).  Lè plizyè moun ap jwe pi gwo kat yo bay moun ki genyen  yo a dwa pou pran kat ki pi piti yo atè a."
}, {
  "word": "Twons",
  "description": "Yon moso bwa byen mezire ki koupe soti nan yon pye bwa.  Yon pye bwa kapab genyen plizè twons nan li."
}, {
  "word": "Twòp",
  "description": "Kantite ki an plis la nan yon bagay.  Diferans ki genyen ant kantite yon bagay te dwe ye avèk kantite bagay la ye."
}, {
  "word": "U",
  "description": "Ventyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Uit",
  "description": "Gade Yuit."
}, {
  "word": "Uityèm",
  "description": "Gade Yuityèm."
}, {
  "word": "V",
  "description": "Venteinyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Vag",
  "description": "Eta yon bagay ki pa fasil pou konpran paske shak moun kapab konprann li nan fason pa yo e fason yon moun konprann li a pa menm jan yon lòt moun konprann li.  Eta yon moun ki pa bay pyès bagay valè, menm lavi.    Pati nan yon kantite dlo tankou lanmè, rivyè ki shita yon kote epi van ap pouse li ale sou tè ki sou kote dlo sa a."
}, {
  "word": "Vaksen",
  "description": "Medikaman doktè bay moun pou prepare kò moun nan kont maladi yo konnen moun nan ap genyen kanmenm si li pa pran medikaman sa a.  Gen de maladi moun toujou pran vaksen pou yo:  tibèkiloz avèk polyo."
}, {
  "word": "Vaksinen",
  "description": "Bay yon moun yon vaksen pou prepare moun nan kont yon maladi ki toujou atake tou moun nan lavi yo kanmenm."
}, {
  "word": "Valanten",
  "description": "Mennaj gason, mari yon fi,  yon gason ki pase jou katòz Fevriye nan yon ane renmen, marye, plase avèk yon fi."
}, {
  "word": "Valantin",
  "description": "Mennaj fi, madanm yon gason, yon fi ki pase jou katòz Fevriye nan yon ane renmen, marye, plase avèk yon gason."
}, {
  "word": "Vale",
  "description": "Mete yon bagay tankou manje, dlo nan boush epi kite li desann nan gòj.  Aksyon yon gwo bagay ki kite yon ti bagay rantre andedan li."
}, {
  "word": "Valè",
  "description": "Enpòtans yon bagay genyen, sa yon bagay reprezante pou moun ki posede li a.  Kantite lajan moun ki ap ashte yon bagay vle bay pou li.  Nenpòt bagay yon moun vle bay pou jwenn yon lòt bagay."
}, {
  "word": "Van",
  "description": "Mouvman envizib ki fèt nan lanati ki gen anpil fòs pou deplase, souke, kraze nenpòt bagay.  Fòs van depann de vitès van an.  Yon van kapab kouri soti nan vitès zewo pou rive nan vitès san-swasant kilomèt pou shak inèdtan e menm plis.  Lè sa a, van vini rele siklòn."
}, {
  "word": "Vandredi",
  "description": "Sizyèm jou nan yon semèn, senkyèm e dènye jou travay nan yon semèn.  Vandredi Sen, Yon jou tout relijye kwè Jezi Kris te mouri apre anpil tribilasyon anba men Jwif yo.  Jou moun nan legliz katolik yo selebre lanmò Jezi Kris pandan yo ap rekreye moman tribilasyon Jezi te pase anvan li mouri."
}, {
  "word": "Vanje",
  "description": " Travay yon moun ki fè yon lòt moun yon bagay ki mal paske menm moun sa te fè li yon bagay mal anvan li te deside fè moun nan sa.  Travay yon moun ki fè yon moun yon bagay mal paske moun sa te fè yon fanmiy li, yon zanmi li yon bagay mal e fanmiy sa a, zanmi sa a pate gen fòs pou defann tèt li."
}, {
  "word": "Vanjè",
  "description": "Moun ki vanje pwòp tèt li ou byen ki vanje yon lòt moun."
}, {
  "word": "Vann",
  "description": "Aksyon yon moun ki kite lòt moun pran sa li posede depi moun nan bay kòb pou bagay li pran an.  Travay mashann ki andedan yon mashe.  Travay yon fi ki kite gason koushe li pou kòb."
}, {
  "word": "Vant",
  "description": "Pati nan kò tout èt vivan kote manje li manje ale rete anvan yo ale nan kèk lòt pati kò a ou byen anvan yo ale nan poupou.  Nenpòt bagay ki gen fòm yon bagay plat epi de pwent li wo, men mitan li desann pi ba.  Vant Mennen, Yon poupou likid ki soti nan dèyè moun lè yo manje yon manje kò yo pa renmen.  Eta yon moun ki pran yon mestin."
}, {
  "word": "Vante",
  "description": "Eta yon bagay ki gen fòm vant.  Travay van fè lè vitès li plis pase zewo.  Pawòl ki soti nan boush yon moun pou montre li gen plis valè pase valè li genyen tout bon vre."
}, {
  "word": "Vantilatè",
  "description": "Yon aparèy elektwo-mayetik ki gen yon mannivèl ki bay van e van sa kapab sho ou byen frèt paske aparèy sa a bay van nan wotè tanperati toupre kote li ye a. "
}, {
  "word": "Ve",
  "description": "Yonn nan lèt ki fòme alfabèt lang Kreyòl la.  V."
}, {
  "word": "Vè",
  "description": "Tout bagay ki gen menm koulè ou byen prèske menm koulè avèk koulè fèy vèt yon pye bwa.  Yonn nan sèt koulè yo ki gen nan yon lakansyèl.  Yon ti bèt long ki sanble avèk yon ti moso trip.  Li konnen fòme andedan vant moun e li bay plizyè pwoblèm sante tankou doulè vant."
}, {
  "word": "Vèb",
  "description": "Anpil mo nan yon lang moun kapab mete pwonon devan yo pou fè konnen ki moun ki ap fè sa mo a vle di a.  Men tout fason yon moun kapab itilize yon vèb tankou,  Fè.  Yon moun ki ap pale de tèt li kapab di:  Mwen fè…  Yon moun ki ap pale avèk yon lòt moun, plizyè lòt moun e li pa nan gwoup moun sa yo li kapab di:  Ou fè…  Yon moun ki ap pale de yon lòt moun li kapab di:  Li fè…  Yon moun ki ap pale de plizyè lòt moun e li nan gwoup moun yo, li kapab di:  Nou fè…  Yon moun ki ap pale de plizyè lòt moun e ni li ni moun li ap pale avèk li a pa nan gwoup moun li ap pale de yo a, li kapab di:  Yo fè…"
}, {
  "word": "Vejetab",
  "description": "Fèy moun kapab manje paske yo bon nan boush, yo bon pou sante e yo pa fè moun malad.  Moun fè legim avèk anpil vejetab."
}, {
  "word": "Velo",
  "description": " Yon mashin ki gen de wou tankou bisiklèt, men limenm li gen motè tou.  Pou fè motè a kòmanse mashe, montè a gen pou li pedale pandan yon kantite tan epi apre sa li sèlman bay gaz pou ogmante vitès velo a."
}, {
  "word": "Ven",
  "description": "Ventyèm nonb nan nonb pozitif yo.  20. Dis plis dis.  Dis miltipliye pa de.  Karant divize pa de."
}, {
  "word": "Venn",
  "description": "Tiyo nan kò tout èt vivan ki sèvi tankou yon wout pou san pase.  Kè a sèvi tankou yon ponp pou pouse san nan venn yo e rale san ki fini pase nan venn yo tou.   Venn De, Venndezyèm nonb nan nonb pozitif yo.  Onz miltipliye pa de.  22.  Venn Kat, Venkatriyèm nonb nan nonb pozitif yo.  Douz miltipliye pa de.  24."
}, {
  "word": "Vennvendeng",
  "description": "Yon gwoup moun avèk lwa nan tèt yo ki plannen pandan lannwit pou pran plezi yo e si yo rankontre avèk yon moun ki pa nan gwoup yo a yo kapab deshire moun nan, manje li ou byen fè li tounen yon bèt.  Yon gwoup lougawou ki vyolan anpil."
}, {
  "word": "Venteen",
  "description": "Venteinyèm nonb nan nonb pozitif yo.  Ven plis en.  21.  Kanrant-de divize pa de."
}, {
  "word": "Ventnèf",
  "description": "Ventnevyèm nonb nan nonb pozitif yo.  Ven plis nèf.  Trant mwens en.  29."
}, {
  "word": "Vèrèt",
  "description": "Yonn nan pi ansyen vil nan peyi Ayiti yo ki nan Depatman Latibonit la e ki te fonde depi nan tan koloni."
}, {
  "word": "Verite",
  "description": "Yon pawòl ki vrè, ki gen fondman, ki reyèl.  Yon pawòl moun kapab verifye sous li, ki kote li soti."
}, {
  "word": "Vèt",
  "description": "Eta yon fri ki gen koulè vè e ki gen move gou paske li pa mi."
}, {
  "word": "Vètikal",
  "description": "Bagay ki kanpe nan menm pozisyon avèk yon moun ki kanpe dwat.  Yon pozisyon ki pèpandikilè a fas tè a.  Liy tout bagay ki ap tonbe sib depi kote yo soti a pou jis yo rive sou fas tè a."
}, {
  "word": "Vid",
  "description": "Eta nenpòt bagay ki pa gen anyen andedan li.  Eta yon moun ki sòt, yon fason pou di moun nan pa gen anyen nan tèt li.  Eta yon wout ki pa gen pyès trafik sou li."
}, {
  "word": "Vidanj",
  "description": "Yon bagay ki gen yon likid ap soti nan li pou tonbe e moun ki ap sib kapab panse likid la pa ap janm fini tonbe.  Eta yon bagay ki tonbe anpil."
}, {
  "word": "Vide",
  "description": "Soti anlè pou tonbe anba tankou likid ki ap tonbe.  Pran yon resipyan ki gen yon bagay nan li epi mete li tèt anba pou bagay la soti nan li epi tonbe."
}, {
  "word": "Viktwa",
  "description": "Bat yon moun, yon gwoup énmi nan yon batay, nan lagè.  Aksyon yon moun ki rezoud yon gwo pwoblèm."
}, {
  "word": "Vil",
  "description": "Lavil.  Yon kote nan yon peyi ki gen anpil kay rasanble nan yon sèl zòn e gen anpil moun ki ap viv nan zòn sa a."
}, {
  "word": "Vinèg",
  "description": "Yon melanj piman avèk sitwon ou byen zoranj si.   Vinèg sa a pike.  Yon preparasyon shimik avèk yon asid ki bon pou mete nan preparasyon vyann pou kwit li."
}, {
  "word": "Vini",
  "description": "Soti nan yon distans epi mashe nan direksyon pou diminye distans ki te genyen an.  Eta yon lide, yon solisyon yon moun jwenn pou li rezoud yon pwoblèm."
}, {
  "word": "Vis",
  "description": "Yon moso metal ki gen filyè nan yon pwent kote li kapab itilize pou rantre nan lòt bagay tankou yon boulon.  Lòt pwent la sèvi tankou baz li, tèt li e boulon an pa kapab pase sou pwent sa a.  Nenpòt bagay ki ant baz, tèt vis la avèk boulon an ap ale peze ant yo de a.  Vis Prezidan, Dezyèm shèf nan yon peyi, yon konpayi,  apre prezidan peyi a, prezidan konpayi a.  Se vis-prezidan ki gen dwa ranplase prezidan an lè prezidan kite peyi a, konpayi pou ale yon lòt kote.  Lè yon prezidan ap kite peyi li pou ale nan yon lòt peyi, li remèt pouvwa peyi a nan men vis-prezidan an."
}, {
  "word": "Vise",
  "description": "Depoze filyè yon boulon sou filyè vis pou vis la rantre nan boulon a; konsa boulon an kapab mashe de yon pwent a yon lòt sou vis la."
}, {
  "word": "Vitès",
  "description": "Jan yon bagay deplase soti yon kote pou ale yon lòt kote.  Yon pati nan yon mashin shofè a ou byen motè mashin nan menm kontwole pou ogmante, diminye rapidite mashin nan."
}, {
  "word": "Viv",
  "description": "Eta yon èt vivan ki kontinye egziste paske li gen souf, sous lavi."
}, {
  "word": "Vivan",
  "description": "Eta yon bagay ki gen lavi nan li.  Eta yon bagay tankou moun ki ap viv."
}, {
  "word": "Vizib",
  "description": "Eta yon bagay ki egziste nan reyalite e je kapab wè li. Yon bagay ki nan yon pozisyon pou je kapab wè li.  Eta yon bagay je kapab wè san itilize aparèy tankou mikwoskòp."
}, {
  "word": "Viziblite",
  "description": "Mwayen pou wè yon bagay.  Eta yon bagay ki vizib.  Kantite ditans moun bezwen pou wè yon bagay depann de jan tan an ye."
}, {
  "word": "Vizyon",
  "description": "Yon bagay moun kapab wè devan je yo, men bagay sa a pa egziste nan reyalite, tout bon vre.  Yon bagay yon moun kapab wè devan je li anvan bagay la vini egziste nan reyalite.  Eksperyans yon pwofèt fè kote li resevwa yon mesaj nan men Bondye."
}, {
  "word": "Vle",
  "description": "Anvi, obeyisans moun genyen pou fè yon bagay.  Volonte."
}, {
  "word": "Vlòpèt",
  "description": "Yon moun ki pa bay bagay tankou yon rad ki sou li enpòtans.  Yon rad ki twò laj sou yon moun ki mete li epi li oblije vlope li pou fè rad la kole sou kò li."
}, {
  "word": "Vo",
  "description": "Kantite valè yon bagay lè moun konpare avèk valè yon lòt bagay. Rezon ki fè yon bagay egziste.  Kantite lajan moun ki vle ashte ap bay pou yon bagay."
}, {
  "word": "Vodou",
  "description": "Yon gwo seremoni lwa yon bòkò òganize e dirije pandan plizyè jou pou bay lwa yo glwa pou sa yo fè pou tout pitit fèy yo.  Tout pitit fèy  fèt pou patisipe nan seremoni sa a pou peye yon pati nan dèt yo.  Gen plizyè ti seremoni nan yon vodou pou tout moun pran plezi yo.  Gen jwèt kat tankou twasèt, jwèt domino, jwèt zo e latriye.  Gen bal, konkou, dans-shèz.  Nan dènye jou yon vodou gen yon liy pitit fèy ki sib bòkò a ale nan yon kalfou pou remèsye lwa yo epi voye yo ale."
}, {
  "word": "Volay",
  "description": "Nenpòt bèt, zwazo ki gen zèl e ki konnen vole."
}, {
  "word": "Vole",
  "description": "Soti atè epi ale nan lespas san pandye nan anyen.  Mwayen zwazo itilize pou leve kò yo atè epi kenbe kò yo anlè pou ale nenpòt kote yo vle.  Soti nan yon pozisyon epi ale tonbe nan yon lòt pozisyon san mashe."
}, {
  "word": "Vòlè",
  "description": "Moun ki pran bagay ki te pou yon lòt moun san otorizasyon, pèmisyon moun nan.  Moun ki renmen pran bagay lòt moun posede pou yo kapab vini posede anpil bagay."
}, {
  "word": "Volebòl",
  "description": "Yon jwèt jwè yo jwe avèk yon boul yo ap voye pase anlè yon filè.  Shak nan de ekip ki ap jwe yo kanpe nan yon bò filè a pou tann lè lòt ekip la voye boul la sou bò pa li a.  Yon ekip fè gòl lè lòt ekip la kite boul la tonbe sou bò pa li a, de fwa."
}, {
  "word": "Volim",
  "description": "Yon kantite nan yon bagay.  Wotè yon son moun ap koute.  Yon bouton nan yon aparèy tankou radyo, televizyon ki kontwole wotè son aparèy la ap bay."
}, {
  "word": "Volonte",
  "description": "Anvi moun genyen pou yo fè yon bagay.  Vle.  Fòs yon moun genyen pou li kapab fè yon bagay."
}, {
  "word": "Voras",
  "description": "Yon moun ki manje anpil manje, ki pa kontwole kantite manje li ap manje e ki kontinye ap mande manje menm lè vant li fini plen."
}, {
  "word": "Vouzan",
  "description": " Pawòl yon pou di yon lòt moun ale e pa janm vini toupre li ankò.  Moun di lòt moun vouzan lè li fashe avèk moun nan."
}, {
  "word": "Voye",
  "description": "Pouse yon bagay nan direksyon anlè pou li ale tonbe yon lòt kote.  Aksyon yon gason ki santi li tèlman byen lè zozo li andedan koko yon fi epi li lage deshay andedan koko fi a.  Ejakile."
}, {
  "word": "Vwati",
  "description": "Yon mashin ki fèt pou pote moun sèlman, men li pa fèt pou pote anpil shay.  Yon vwati gen plas pou pote senk ou byen sis pasaje."
}, {
  "word": "Vwayaje",
  "description": "Kite yon zòn, yon plas pou ale nan yon lòt zòn, yon lòt plas.  Kite tè a pou ale yon lòt kote.  Mouri.  Aksyon yon moun ki kite peyi li e ki ale nan yon lòt peyi."
}, {
  "word": "Vwazen",
  "description": "Yon gason ki ap viv sou kote kay yon lòt moun."
}, {
  "word": "Vwazin",
  "description": "Yon fi ki ap viv sou kote kay yon lòt moun."
}, {
  "word": "Vyann",
  "description": "Pati mou nan kò yon èt vivan, tankou yon koshon, ki kouvri zo yo e ki ant po avèk zo yo."
}, {
  "word": "Vye",
  "description": "Eta yon bagay, yon moun ki egziste depi anpil ane.  Bagay ki pa bon ankò, ki pa gen valè, ki pa vo anyen.  Yon bagay, menmsi li te nan mashe ou byen pou vann, moun pate ap bay lajan pou li."
}, {
  "word": "Vyole",
  "description": "Aksyon yon moun ki aji nan sans kontrè jan li te dwe aji.  Aksyon yon gason ki fòse zozo li rantre nan koko yon fi san volonte fi a.  Yon gason ki gen plis pase dizuit ane epi ki koupe yon ti fi ki gen mwen pase dizuit ane.  Vyole Lalwa, Fè bagay lalwa anpeshe sitwayen yon peyi, sitwayen lemond fè."
}, {
  "word": "Vyolèt",
  "description": "Yon koulè ki sanble avèk koulè woz ki kouvri avèk yon ti kras koulè ble klè.  Koulè jansiv kèk moun."
}, {
  "word": "Vyolon",
  "description": "Yon enstriman mizikal ki gen kat fil nan li pou bay son lè gen yon baton avèk fil nan li ki ap pase sou fil enstriman an.  Mizisyen itilize vyolon pou jwe mizik klasik anpil. "
}, {
  "word": "W",
  "description": "Venndezyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Wa",
  "description": "Shèf yon peyi, nan tan lontan, moun te panse ki reprezante Bondye sou tè a.  Nan anpil wayòm,  premye pitit gason wa ranplase li lè li mouri. "
}, {
  "word": "Wanga",
  "description": "Yon travay majik yon bòkò fè pou yon pitit fèy li ki bezwen aji sou yon moun ou byen bagay moun posede tankou voye zonbi pran lajan yon moun nenpòt kote li sere lajan an.   Wanga Nègès, Yon ti zwazo ki gen bèk long e ki renmen manje polèn flè."
}, {
  "word": "Wayal",
  "description": "Eta tout bagay ki gen rapò avèk yon wa, fanmiy wa a.  Angletè gen yon sistèm politik wayal.  Kasav shèsh ki bere avèk manba.  "
}, {
  "word": "Wayòm",
  "description": "Yon peyi kote yon wa ap gouvène.  Kote yon wa reye.  Yon kote yon moun gen pouvwa pou dirije li tankou yon wa."
}, {
  "word": "Wiski",
  "description": "Yon bwason koulè jón ki gen anpil alkòl nan li e ki fè moun ki bwè anpil nan li sou byen vit."
}, {
  "word": "Wòb",
  "description": "Rad koutiryè fè pou fi mete sou yo.  Yon rad ki gen yon kòsaj avèk yon jip ki kole ansanm.  Yon rad pè yo avèk kèk pastè mete sou yo pou fè seremoni nan legliz yo."
}, {
  "word": "Woman",
  "description": "Yon gwoup liv kote ekriven yo pale plis de lanmou, relasyon fi avèk gason.  Nan kòmansman ventyèm syèk la anpil moun, nan tout lemond, te enterese nan li liv sa yo anpil paske yo te espere aprann anpil bagay sou relasyon fanm avèk gason nan liv sa yo."
}, {
  "word": "Womans",
  "description": "Aksyon de moun ki gen relasyon entim.  De moun sa yo kapab ale mashe nan yon pak pandan yo kenbe men, yo ap bo tanzantan.  Yo kapab ale nan bal, ale nan sinema.   Viv yon lavi ki sanble avèk lavi womantik yo esplike nan liv yo."
}, {
  "word": "Womantik",
  "description": "Ekriven ki pale de relasyon entim yo avèk fi nan tout liv avèk tèks yo ekri.  Yon ekriven ki ekri woman."
}, {
  "word": "Womantism",
  "description": "Eta yon ekriven ki pale de sa li santi, de sa ki soti nan fon kè li.  Ekriven sa yo pale de fanmiy yo, relasyon yo avèk lòt moun, pwoblèm yo, kontantman yo."
}, {
  "word": "Won",
  "description": "Fòm yon bagay ki sanble avèk yon boul ki koupe an de moso e nan mitan.  Yon bagay ki gen menm fòm avèk yon lalin antye."
}, {
  "word": "Wonn",
  "description": "Eta yon bagay ki won.  Soti nan yon kwen yon bagay,  epi pase nan tout kwen li san pase yon kote de fwa, pou jis rive nan pwen kòmansman an."
}, {
  "word": "Wonpwen",
  "description": "Yon kalfou kote pliske de ri rankontre epi moun ki responsab sikilasyon nan zòn sa oblije kontwi yon wonn nan mitan kalfou sa pou fè tout mashin ki rive nan kalfou sa a sib menm direksyon an pou evite aksidan.  Nenpòt kote anpil bagay, moun rankontre ansanm pou yo diskite yon lide."
}, {
  "word": "Wòsh",
  "description": "Yon boul ki fòme nan tè, men ki pi di pase tè.  Wòsh rasanble plis nan rivyè, bò lanmè."
}, {
  "word": "Wou",
  "description": "Nenpòt bagay won ki kole nan yon bagay lou pou pèmèt bagay la deplase lè yo ap vire san yo pa deplase kite pwen kote mitan yo kole a."
}, {
  "word": "Wouj",
  "description": "Yon koulè ki menm koulè avèk pati nan san yon èt vivan ki pa blan an."
}, {
  "word": "Woule",
  "description": "Eta yon moun, yon bagay yon moun ap vire tou won san li pa janm deplase kite pwen kote mitan li kole a.  Eta yon wou ki ap vire."
}, {
  "word": "Woulèt",
  "description": "Ti wou ki anba yon bagay pou fè deplasman bagay la vini pi fasil.  Moun kapab deplase yon bagay ki gen woulèt anba li san moun nan pa leve bagay la."
}, {
  "word": "Woulib",
  "description": "Benefis yon moun jwenn nan men yon lòt moun san san li pa depanse anyen pou sa.  Aksyon yon moun ki gen yon mashin epi li aksepte yon lòt moun vini monte andedan li san peye mèt mashin nan pou transpòtasyon an."
}, {
  "word": "Woulo",
  "description": "Yon moso bagay won ki fèt an bwa, an plastik e moun kapab kenbe li pou woule sou yon lòt bagay pou plati bagay sa a."
}, {
  "word": "Wout",
  "description": "Shemen.   Tras sou tè a moun kapab itilize pou yo ale kote yo bezwen ale.  Nenpòt mwayen yon moun, yon bèt itilize pou rive yon kote."
}, {
  "word": "Wouze",
  "description": " Lage, voye dlo sou yon bagay tankou lapli pou li kapab mouye.  Kiltivatè wouze plantasyon yo pou ranplase travay lapli, nòmalman, fè pou jaden."
}, {
  "word": "Y",
  "description": "Venntwazyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Yè",
  "description": "Yon jou ki te deja pase, men gen sèlman vennkat èdtan,  yon jou, depi jou sa te pase.   Yon jou ki pase anvan dènye jou a te pase."
}, {
  "word": "Yo",
  "description": "Yon pwonon moun ki ap ekri ou byen moun ki ap pale itilize pou yo pale de aksyon plizyè lòt moun lè ni moun ki ap pale ou byen ki ap ekri a pa patisipe nan aksyon an."
}, {
  "word": "Yofri",
  "description": "(Rio Frio), Non yon rivyè nan Depatman Sant la ki pase sou kote Mayisad e dlo li toujou frèt, kèk lè li frèt tankou yon dlo ki soti nan refrijeratè.  Non an se yon konbinezon de mo lang Espanyòl moun nan zòn nan pate kapab pwononse."
}, {
  "word": "Yon",
  "description": "En.  Mo moun ki ap pale ou byen ekri mete devan lòt mo pou fè konnen yo ap pale de yonn nan gwoup bagay sa a.  Yonn."
}, {
  "word": "Yonn",
  "description": "Mo moun itilize lè yo ap pale ou byen ekri pou fè konnen yo ap pale de yon sèl bagay nan yon gwoup.  Yon."
}, {
  "word": "Yoyo",
  "description": "Yon jwèt ki gen de moso materyèl won ki gen epesè yon santimèt avèk mitan yo kole ansanm pou yon fil kapab vlope nan espas an yo de a.  Fil sa gen yon longè ki kapab soti nan wotè senti yon moun pou rive atè.  Yon jwè kapab mare yon pwent fil la nan de moso materyèl yo epi mare lòt pwent la nan dwèt majè li.  Pou kòmanse jwèt sa, yon jwè gen pou li vlope fil la nan mitan de moso materyèl yo, lage yo pou yo desann nan direksyon tè a epi rale yo monte.  Li kontinye fè menm bagay la san rete."
}, {
  "word": "Yuit",
  "description": "Yuityèm nonb nan nonb pozitif yo.  8.  Sèz divize pa de.  Kat plis kat.  Sis plis de.  Dis mwens de."
}, {
  "word": "Yuityèm",
  "description": "Pozisyon ki sib setyèm nan lè moun ki ap bay pozisyon an kòmanse nan premye, dezyèm, twazyèm, katriyèm, senkyèm, sizyèm, setyèm, pou rive nan yuityèm pozisyon an."
}, {
  "word": "Z",
  "description": "Vennkatriyèm lèt nan alfabèt lang Kreyòl la."
}, {
  "word": "Zaboka",
  "description": "Grenn yon gwo pye bwa ki gen po li koulè vè e koulè sa pa janm shanje.  Moun manje pati andedan zaboka a ki ant po a avèk yon gwo grenn ki nan mitan li.  Lè zaboka mi, nannan li vini tankou yon bè.  Ayisyen mete nannan sa andedan pen e vlope li avèk kasav pou manje li epi yo fè tchanpan avèk li."
}, {
  "word": "Zòbòy",
  "description": "Yon aksidan ki rive kote yon moun frape yon pati nan kò li epi pati sa vini gonfle tankou yon gwo bouton."
}, {
  "word": "Zafè",
  "description": "Yon bagay, yon travay, yon aksyon ki konsène yon sèl moun."
}, {
  "word": "Zam",
  "description": "Yon bagay moun itilize pou atake ou byen pou defann tèt yo.  Yon aparèy ki kapab tire bal."
}, {
  "word": "Zandolit",
  "description": "Yon ti bèt ki gen nan peyi twopikal yo e ki kapab shanje koulè lè li resevwa kou.  Yon zandolit soti nan menm fanmiy avèk mabouya, kayiman.  Boush li laj anpil pou gwosè kò li, ke li long e ke li, tankou tout kò li, kapab repouse apre li fini kase.  Sanble ti bèt sa kapab resisite apre yon lanmò vyolan, si tout kò li pate kraze.  Shat renmen manje ti bèt sa."
}, {
  "word": "Zanj",
  "description": "Kreyati ki ap viv nan syèl la e ki tankou sa moun sou tè a te kapab rele yon lame e mesaje Bondye.  Gen anpil moun relijye ki di yo konnen wè Bondye avèk zanj kouwonnen li."
}, {
  "word": "Zanmi",
  "description": "Yon moun ki reprezante sous enfòmasyon avèk konsèy pou yon lòt moun.   Yon zanmi rakonte zanmi li tout bèl, move eksperyans nan lavi li.  Yon moun yon lòt moun fè anpil konfyans e moun sa toujou toupre pou sipòte li nan bon e nan move moman."
}, {
  "word": "Zanmitay",
  "description": "Relasyon ki egziste ant de moun kote yonn fè lòt la konfyans e pale tout bagay yo konnen de tèt yo e de lòt moun."
}, {
  "word": "Zannanna",
  "description": "Yon bagay, yon fri ki bon nan boush tankou anana.  Zannanna Kon Pengwen, Ni bon moun ni move, yo tout te prezan.  Yon ekspresyon ayisyen itilize pou esplike prezans anpil moun nan yon seremoni.  Nan ekspresyon sa zannanna reprezante tout moun ki bon e pengwen reprezante tout moun ki pa bon."
}, {
  "word": "Zannimo",
  "description": "Yon mo ki opoze a tout gwoup moun ki egziste sou tè a e ki reprezante bèt.  Aksyon yon moun ki aji tankou li pa ap viv andedan sosyete moun, aksyon li sanble avèk aksyon bèt."
}, {
  "word": "Zanno",
  "description": "Yon bijou fi mete nan zòrèy yo pou fè figi yo bèl.   Anpil gason panse yo se fi e yo mete zanno tou.  Kèk lòt gason ki wè enpe gason ap mete zanno, kòmanse mete zanno nan zòrèy yo tou pou jis anpil moun vini pèdi sans zanno.  Anpil gason mete zanno nan zòrèy yo.  Gen fi ki mete zanno nan lang yo, nan lonbrit yo, nan pwent tete yo e latriye.  Gen fi ki mete menm dis zanno nan yon sèl zòrèy."
}, {
  "word": "Zansèt",
  "description": "Jenerasyon nan yon fanmiy ki mouri depi lontan.  Premye jenerasyon yo nan yon fanmiy, yon peyi."
}, {
  "word": "Zantray",
  "description": "Tout moun ki gen lyen familyal tankou menm siyati avèk yon moun menmsi lyen sa egziste antravè anpil jenerasyon."
}, {
  "word": "Zèb",
  "description": "Ti plant ki pa bezwen moun plante yo pou yo kòmanse grandi yon kote.  Prèske tout zèb rete kout, men gen kèk nan yon ki wo.   Zèb Ginen, Yon zèb ki kapab gen yon wotè ki mezire de ou twa mèt konsa.  Sheval renmen manje zèb ginen."
}, {
  "word": "Zebi",
  "description": "Yon bèf ki gwo anpil e ki gen plis fòs pase lòt ras bèf yo.  Li gen anpil grès nan kò li epi li gen yon boul sou do li.  Yon fi ki gwo anpil."
}, {
  "word": "Zegiy",
  "description": "Yon ti moso metal, long ki gen yon tou nan yon pwent epi lòt pwent la file anpil.  Moun itilize zegiy pou fè fil pase nan yon bagay tankou twal; konsa yo kapab fè plizyè moso twal vini fè yon sèl moso ou byen bay moso twal nenpòt fòm yo vle."
}, {
  "word": "Zeklè",
  "description": "Yon limyè ki flashe nan syèl la anvan yon loray gonde.  Yon bagay ki parèt epi retire kò li byen vit."
}, {
  "word": "Zèl",
  "description": "Yon manb, nan kò prèske tout zwazo, ki pèmèt yo vole e plane.  Abilite yon moun genyen pou rantre nan nenpòt gwoup epi kòmanse kontwole moun ki te nan gwoup la anvan li."
}, {
  "word": "Zele",
  "description": "Eta yon bagay, yon bèt, yon moun ki gen zèl.  Eta yon moun ki entelijan anpil, ki kapab pran moun nan yon gwoup epi kòmanse kontwole yo byen vit."
}, {
  "word": "Zen",
  "description": "Yon moman kote anpil moun rankontre ansanm epi yo fòme de ou plizyè gwoup pou yonn joure lòt.  Non yon gwoup mizikal ayisyen ki jwe yon tip mizik ayisyen rele Nouvèl Jenerasyon."
}, {
  "word": "Zenglendo",
  "description": "Moun nan peyi Ayiti ki te milisyen lè moman diktati yo e ki te vini pèdi pouvwa yo te genyen apre gouvènman pa yo a te tonbe.  Apre gouvènman an tonbe, kò milisyen sa yo te kraze, men anpil ansyen milisyen te toujou gen zam nan men yo.  Milisyen sa yo te òganize plizyè ti gwoup pou ale rantre andedan kay moun mande kòb epi, lè yo fini jwenn sa yo te vle a, yo touye mèt kay la."
}, {
  "word": "Zepina",
  "description": "Yon ti plant ki boujonnen yon fèy ki gen bon gou lè li kwit e ayisyen itilize li pou fè bouyon, legim."
}, {
  "word": "Zepòl",
  "description": "Pati nan kò moun kote de ponyèt yo pandye.  Pati nan kò moun ki gen kou a nan mitan li.  Kout Zepòl,  Èd yon moun bay yon lòt."
}, {
  "word": "Zepon",
  "description": "Yon pwent file ki grandi nan pye kòk.    Zepon an kapab blese lòt kòk; konsa kòk itilize zepon yo pou goumen avèk lòt zwazo parèy yo."
}, {
  "word": "Zès",
  "description": "Yon gaz ki soti nan po zoranj, sitwon avèk shadèk."
}, {
  "word": "Zesèl",
  "description": "Espas sou anba zepòl yon moun kote ki gen anpil plim.  Fi renmen koupe plim sa yo paske moun nan anpil sosyete kwè li lèd pou yon fi kite moun wè plim sa yo."
}, {
  "word": "Zetwal",
  "description": "Etwal.  Yon kò ki gen limyè sou li e ki nan syèl la.  Yon desen moun fè ki gen senk bransh.  Make yon bagay pou atire atansyon moun sou li, pou sonje li."
}, {
  "word": "Zetwale",
  "description": "Yon bagay tankou syèl la ki gen plizyè zetwal nan li."
}, {
  "word": "Zigzag",
  "description": "Avanse nan yon direksyon, men sib wout la nan menm fòm avèk plizyè lèt zèd (Z) kole ansanm, yonn sou lòt."
}, {
  "word": "Ziltik",
  "description": "Yon kote ki lwen anpil.  Yon vwayaj ki pa gen destinasyon, finisman."
}, {
  "word": "Zimbabwe",
  "description": "Yon peyi nan sid-lès kontinan afriken an.  Kapital peyi sa rele Arare.  Lang ofisyèl peyi a se Anglè, men moun yo pale plizyè lòt lang."
}, {
  "word": "Zo",
  "description": "Pati andedan vyann kò tout yon vètebre pou bay vètebre a fòm.  San zo, moun te ap sanble avèk yon boul vyann.  Nenpòt bagay ki kenbe yon lòt bagay pou li kanpe.  Jwèt Zo, Yon jwèt moun jwe avèk de ti bwat ki gen sis bò, yo shak, e ki gen mak ki reprezante pwen:  yon pwen, de pwen jis rive sou sis. "
}, {
  "word": "Zoklo",
  "description": "Aksyon yon moun ki pliye tout dwèt li epi frape yonn nan dwèt sa yo nan mitan tèt yon lòt moun.  Aksyon yon moun ki gen madanm ou byen ki gen mari epi ki aksepte koupe avèk yon lòt gason ou byen yon lòt fi.  Adiltè."
}, {
  "word": "Zoklote",
  "description": "Bay yon moun plizyè zoklo.  Aksyon yon moun ki jwenn madanm ou byen mari yon lòt moun pou li koupe avèk li."
}, {
  "word": "Zòn",
  "description": "Yon moso tè kote ki gen plizyè kay toupre e tout moun ki ap viv nan kay sa yon toujou ap rankontre.  Kèk fwa tout moun sa yo, yonn konnen lòt.  Yon destinasyon. "
}, {
  "word": "Zonbi",
  "description": "Yon espri ki pote mesaj e ale fè nenpòt travay yon bòkò voye li fè.  Zonbi kapab fè nenpòt bagay paske bòkò voye li fè paske li pa vizib.  Yon moun ki sispann grandi twò bonè nan lavi."
}, {
  "word": "Zong",
  "description": "Pati nan dwèt pye, dwèt men moun ki gen koulè blan e ki pa janm sispann grandi."
}, {
  "word": "Zonyon",
  "description": "Yon boul yon plant donnen anba tè, men pye li grandi sou tè a tankou yon pye siv.  Li bay manje bon gou, li pike tankou yon piman anvan li bouyi nan dlo.  Lè li bouyi li pèdi gou li paske li bay manje a tout gou li.  Moun manje zonyon san kwit tou, nan salad."
}, {
  "word": "Zoranj",
  "description": "Yon grenn yon pye bwa donnen e grenn sa tou won, li gen plizyè transh, nannan avèk ji.  Gen anpil varyete zoranj, men de pi gran kategori yo se zoranj-si avèk zoranj dous.  Zoranj Dous, Yon zoranj ki dous e moun itilize li pou fè ji ou byen pou manje lè yo fini retire po a.  Zoranj Si, Yon zoranj ki prèske gen asid menm jan avèk sitwon e moun itilize li pou lave vyann.   Zoranj Sirèt, Yon zoranj ki pa janm dous tankou sik, men li pa janm twò si tou.  Ayisyen itilize li pou fè konfiti, tizán e latriye. Peyizan ayisyen kwè zoranj sa bay moun apeti."
}, {
  "word": "Zòrèy",
  "description": "Pati nan kò moun ki kanpe sou de kwen tèt li e ki gen yon tou nan shak bò tèt la pou moun kapab tande son."
}, {
  "word": "Zòtèy",
  "description": "Senk dwèt moun gen nan shak pye li yo.  Pi gwo a rele pous epi lòt yo rele ti zòtèy."
}, {
  "word": "Zotobre",
  "description": "Yon moun ki posede anpil lajan e ki itilize lajan li posede yo pou kontwole lòt moun ki gen konesans, pouvwa e nenpòt lòt bagay li kapab peye moun pou resevwa li."
}, {
  "word": "Zòtolan",
  "description": "Yon zwazo koulè gri ki renmen rete sou kote ravin avèk larivyè paske se nan dlo sa yo li kapab jwenn bagay pou li manje, tankou ti pwason."
}, {
  "word": "Zouti",
  "description": "Bagay moun itilize pou ede li fè yon travay.  Gen kèk travay moun pa kapab fè san zouti paske zouti a nesesè.  Yonn nan liy sèvis yon pwogramè itilize pou li mete tout kòmand ki sanble avèk zouti moun ki ap itilize pwogram nan bezwen pou yo fè travay yo."
}, {
  "word": "Zozo",
  "description": "Yon bagay long ki nan mitan janb tout gason, tout mal bèt.  Moun, bèt itilize zozo yo pou mete deshay andedan fi, femèl bèt."
}, {
  "word": "Zwazo",
  "description": "Yon bèt ki gen anpil plim sou prèske tout kò li, ki gen yon bèk avèk zèl li kapab itilize pou li vole.  Gen zwazo ki piti anpil e gen zwazo ki gwo anpil.  Zwazo pa pouse pitit yo tou vivan, men ponn ze epi yo kouve ze yo.  Moun manje vyann, prèske, tout zwazo.  Yon ekspresyon moun itilize pou di yon moun sanble avèk yon ti zwazo ki ap vole e nenpòt moun ki vle kapab tire sou li pou touye li.  Yon inosan."
}, {
  "word": "Zwen",
  "description": "Yon moun tankou yon ti bebe ki toujou ap kriye, tout tan.  Yon moun ki pa janm fatige anniye lòt moun."
}];
exports.WORDS = WORDS;
},{}],"src/pwa-egzanp.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PwaEgzanp = exports.NO_WORD = void 0;

var _litElement = require("lit-element");

require("./autocomplete-intput");

var _suggestions = require("./suggestions");

var _words = require("./words");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

const NO_WORD = ')-:';
exports.NO_WORD = NO_WORD;
const NO_DEFINTION = 'Pa gen definisyon pou mou ou chèche a.';
let PwaEgzanp = class PwaEgzanp extends _litElement.LitElement {
  constructor() {
    super(...arguments);
    this.name = 'there';
    this.store = {
      suggestions: _suggestions.SUGGESTIONS,
      word: NO_WORD,
      description: NO_DEFINTION,
      noWord: NO_WORD,
      noDescription: NO_DEFINTION,
      showSearch: true,
      showResult: false,
      showNoResult: false
    };
  }

  onSearch(e) {
    const search = (e.detail.search || '').trim().toLowerCase();

    const definition = _words.WORDS.find(x => x.word.toLowerCase() === search);

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

  updateSearchParam(definition) {
    const params = new URLSearchParams(window.location.search);
    params.set('search', definition.word);
    let url = window.location.href + '?' + params.toString();

    if (window.location.search) {
      url = window.location.href.replace(window.location.search, params.toString());
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
    return _litElement.html`
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

};
exports.PwaEgzanp = PwaEgzanp;

__decorate([(0, _litElement.query)('autocomplete-input')], PwaEgzanp.prototype, "autoCompleteElement", void 0);

__decorate([(0, _litElement.property)({
  type: String
})], PwaEgzanp.prototype, "name", void 0);

__decorate([(0, _litElement.property)({
  type: Object
})], PwaEgzanp.prototype, "store", void 0);

exports.PwaEgzanp = PwaEgzanp = __decorate([(0, _litElement.customElement)('pwa-egzanp')], PwaEgzanp);
},{"lit-element":"node_modules/lit-element/lit-element.js","./autocomplete-intput":"src/autocomplete-intput.ts","./suggestions":"src/suggestions.ts","./words":"src/words.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61845" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/pwa-egzanp.ts"], null)
//# sourceMappingURL=/pwa-egzanp.888939f6.js.map