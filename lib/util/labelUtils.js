// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var elementType = require("jsx-ast-utils").elementType;
var getPropValue = require("jsx-ast-utils").getPropValue;
var getProp = require("jsx-ast-utils").getProp;
const { hasNonEmptyProp } = require("./hasNonEmptyProp");

/**
 * Checks if the element is nested within a Label tag.
 * e.g.
 *       <Label>
 *           Sample input
 *           <Input {...props} />
 *       </Label>
 * @param {*} context
 * @returns
 */
function isInsideLabelTag(context) {
    return context
        .getAncestors()
        .some(
            node =>
                node.type === "JSXElement" && (elementType(node.openingElement) === "Label" || elementType(node.openingElement) === "label")
        );
}

/**
 * Checks if there is a Label component inside the source code with a htmlFor attribute matching that of the id parameter.
 * e.g.
 * id=parameter, <Label htmlFor={parameter}>Hello</Label>
 * @param {*} idValue
 * @param {*} context
 * @returns boolean for match found or not.
 */
function hasLabelWithHtmlForId(idValue, context) {
    if (idValue === "") {
        return false;
    }
    const sourceCode = context.getSourceCode();
    const regex = /<Label[^>]*htmlFor[^>]*=[^>]*[{"|{'|"|']([^>'"}]*)['|"|'}|"}][^>]*>/gim;
    const matches = regex.exec(sourceCode.text);
    return !!matches && matches.some(match => match === idValue);
}

/**
 * Checks if there is a Label component inside the source code with an id matching that of the id parameter.
 * e.g.
 * id=parameter, <Label id={parameter}>Hello</Label>
 * @param {*} idValue value of the props id e.g. <Label id={'my-value'} />
 * @param {*} context
 * @returns boolean for match found or not.
 */
function hasLabelWithHtmlId(idValue, context) {
    if (idValue === "") {
        return false;
    }
    const sourceCode = context.getSourceCode();
    const regex = /<Label[^>]*id[^>]*=[^>]*[{"|{'|"|']([^>'"}]*)['|"|'}|"}][^>]*>/gim;

    const matches = regex.exec(sourceCode.text);
    return !!matches && matches.some(match => match === idValue);
}

/**
 * Determines if the element has a label with the matching id associated with it via aria-labelledby.
 * e.g.
 * <Label id={labelId}>Sample input</Label>
 * <Input aria-labelledby={labelId} />
 * @param {*} openingElement
 * @param {*} context
 * @returns boolean for match found or not.
 */
function hasAssociatedLabelViaAriaLabelledBy(openingElement, context) {
    const hasAssociatedLabelViaAriaLabelledBy = hasNonEmptyProp(openingElement.attributes, "aria-labelledby");
    const idValue = getPropValue(getProp(openingElement.attributes, "aria-labelledby"));
    const hasHtmlId = hasLabelWithHtmlId(idValue, context);

    return hasAssociatedLabelViaAriaLabelledBy && hasHtmlId;
}

/**
 * Determines if the element has a label assiciated with it via htmlFor
 * e.g.
 * <Label htmlFor={inputId}>Sample input</Label>
 * <Input id={inputId} />
 * @param {*} openingElement
 * @param {*} context
 * @returns boolean for match found or not.
 */
function hasAssociatedLabelViaHtmlFor(openingElement, context) {
    const idValue = getPropValue(getProp(openingElement.attributes, "id"));
    const hasHtmlFor = hasLabelWithHtmlForId(idValue, context);
    return hasHtmlFor;
}

module.exports = {
    isInsideLabelTag,
    hasLabelWithHtmlForId,
    hasLabelWithHtmlId,
    hasAssociatedLabelViaAriaLabelledBy,
    hasAssociatedLabelViaHtmlFor
};
