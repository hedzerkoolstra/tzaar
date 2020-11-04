let old = {a: {b: 2}}

let history = Object.assign({}, old)

old.a.b = 3

console.log('Hello', old.a, history.a)