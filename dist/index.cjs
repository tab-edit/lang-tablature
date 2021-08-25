'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lr = require('@lezer/lr');
var common = require('@lezer/common');
var highlight = require('@codemirror/highlight');
var language = require('@codemirror/language');

// This file was generated by lezer-generator. You probably shouldn't edit it.
const newline$1 = 22,
  newlineEmpty = 23,
  eof = 24,
  incomingNewline = 25,
  incomingEOF = 26,
  stafflineSep = 27;

const newline = 10,
  carriageReturn = 13,
  space = 32,
  tab = 9;

const newlines = new lr.ExternalTokenizer((input) => {
  if (input.next < 0) {
    input.acceptToken(eof);
  } else if (input.next != newline && input.next != carriageReturn) ; else {
    // this if statement handles the CRLF line ending
    if (input.next == carriageReturn) {
      input.advance();
      if (input.next != newline) return;
    }
    input.advance();
    while (input.next == space || input.next == tab) {
      input.advance();
    }
    let empty = input.next == newline || input.next == carriageReturn;
    input.acceptToken(empty ? newlineEmpty : newline$1, empty ? 1 : 0);
  }
});

const lookaheads = new lr.ExternalTokenizer((input) => {
  if (input.next < 0) {
    input.acceptToken(incomingEOF);
  } else if (input.next == newline || input.next == carriageReturn) {
    input.acceptToken(incomingNewline);
  }
}, {fallback:true});

const stafflineSeparator = new lr.ExternalTokenizer((input) => {
  if (input.next == space || input.next == tab || input.next == newline || input.next == carriageReturn || input.next < 0) {
    input.acceptToken(stafflineSep);
  } else {
    let prevChar = input.peek(-1);
    if (prevChar == space || prevChar == tab) {
      input.acceptToken(stafflineSep);
    }
  }
}, {fallback:true});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = lr.LRParser.deserialize({
  version: 13,
  states: "'bOYQXOOOhQPO'#CaOpQQO'#CaOOQW'#Ck'#CkO!OQXO'#C`OOQS'#C`'#C`O!^QTO'#C_O!iQTOOOpQQO,58{OOQO'#Ce'#CeO!qQPO'#CfO!qQPO'#CgOOQO'#C}'#C}O!vQQO'#C|OOQO'#C|'#C|OOQO'#Cm'#CmO#bQQO'#CcOOQ`'#Cl'#ClO#sQbO,58{OOQW-E6i-E6iOOQS,58z,58zOYQXO'#CnO$XQTO,58yO$dQ]O'#CoO!iQTOOQOQPOOO$xQbO1G.gO%^QPO,59QOOQO,59R,59ROsQQO,59OOsQQO,59SOsQQO,59TOOQO-E6k-E6kOOQ`,58},58}OOQ`-E6j-E6jOOQW1G.g1G.gOOQS,59Y,59YOOQS-E6l-E6lOOQ['#Cp'#CpO$dQ]O,59ZOOQS,59Z,59ZOOQS-E6m-E6mOOQW7+$R7+$ROOQO1G.l1G.lOOQO1G.j1G.jOOQO1G.n1G.nOOQO1G.o1G.oOOQ[-E6n-E6nOOQS1G.u1G.u",
  stateData: "%c~OmOSPOS~OUPOiTOjTOnQO~OnWOoWO~Oo_OrXOsYOuZO~OUPOidOjdOnQO~OfeOgRXhRX~OggOhiO~OrXO~OvmOwnOxoOnpXopXrpXspXupX~OnqOo_OrXOsYOuZO~O^sOksOo_OrXOsYOuZO~OfeOgRahRa~OUPOfvOgvOiTOjTOnQO~O^zOkzOo_OrXOsYOuZO~Ot{O~O",
  goto: "$srPPPs|!UP!]!c!m!}!}!c!cP#X#b#l#u#{$RPPPPPPPPPPP$X$iQVOQxgR!QwUUOgwRteZROSegwXaQWbja^QW`bjmno`[QW`bjmnoQkYRlZa[QW`bjmnoWSOegwRcSQbQQjWTrbjW`QWbjRp`QfURufQhVRyhQwgR!PwY_QW`bjQ|mQ}nR!Ooa]QW`bjmno",
  nodeNames: "⚠ Comment Tablature Staves StaffLineGroup StaffLine MeasureLineName MeasureLine Hammer Fret Harmonic Grace Pull Slide Multiplier",
  maxTerm: 40,
  nodeProps: [
    [common.NodeProp.group, -3,8,12,13,"MeasureComponentGroup",-3,9,10,11,"MeasureComponent"]
  ],
  skippedNodes: [0,1],
  repeatNodeCount: 6,
  tokenData: "%[~RlXY!ypq!yst#O}!O#^!P!Q#c!Q![#h![!]#u!c!d$V!d!e$V!f!g$V!g!h$V!i!j$[!j!k$c!r!s$h!z!{$m!}#O$x#O#P#c#P#Q$}#T#U$V#U#V$V#W#X$V#X#Y$V#Z#[$[#[#]%S#d#e$h#g#h#c#l#m$m#p#q#u~#OOm~~#TRP~OY#OZ]#O^~#O~#cOo~~#hOx~~#mPr~!Q![#p~#uOr~~#zQn~![!]$Q#p#q$Q~$VOn~P$[OUPR$cOUPuQQ$hOvQ~$mOw~~$pP!Q![$s~$xO^~~$}Os~~%SOt~R%XPvQ#]#^$V",
  tokenizers: [0, 1, newlines, lookaheads, stafflineSeparator],
  topRules: {"Tablature":[0,2]},
  tokenPrec: 0
});

//to know how to set up the style tags and code completion, see
//https://codemirror.net/6/examples/lang-package/

let parserWithMetadata = parser.configure({
  props: [
    highlight.styleTags({
      Fret: highlight.tags.integer,
      MeasureLineName: highlight.tags.name,
      Comment: highlight.tags.comment
    }),
  ],
});

const tablatureLanguage = language.LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: { line: "#" },
  },
});

function tablature() {
  return new language.LanguageSupport(tablatureLanguage);
}

exports.tablature = tablature;
exports.tablatureLanguage = tablatureLanguage;
