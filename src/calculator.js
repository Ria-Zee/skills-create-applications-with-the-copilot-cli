#!/usr/bin/env node
'use strict';

/**
 * Simple Node.js CLI Calculator
 * Supported operations:
 *  - Addition (add)
 *  - Subtraction (sub)
 *  - Multiplication (mul)
 *  - Division (div)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3    -> 5
 *   node src/calculator.js sub 5 2    -> 3
 *   node src/calculator.js mul 4 6    -> 24
 *   node src/calculator.js div 10 2   -> 5
 *
 * The script validates numeric input and checks for division by zero.
 * On invalid usage it prints a short help message and exits with a non-zero code.
 */

// Helper: modulo (remainder)
function modulo(a, b) {
  const x = Number(a);
  const y = Number(b);
  if (Number.isNaN(x) || Number.isNaN(y)) {
    throw new Error('Operands must be valid numbers');
  }
  if (y === 0) throw new Error('Division by zero');
  return x % y;
}

// Helper: power (exponentiation)
function power(base, exponent) {
  const b = Number(base);
  const e = Number(exponent);
  if (Number.isNaN(b) || Number.isNaN(e)) {
    throw new Error('Operands must be valid numbers');
  }
  return Math.pow(b, e);
}

// Helper: square root with validation for negative numbers
function squareRoot(n) {
  const x = Number(n);
  if (Number.isNaN(x)) {
    throw new Error('Operands must be valid numbers');
  }
  if (x < 0) throw new Error('Square root of negative number');
  return Math.sqrt(x);
}

function calculate(op, a, b) {
  // 'sqrt' is a single-operand operation
  if (op === 'sqrt') {
    const x = Number(a);
    if (Number.isNaN(x)) throw new Error('Operands must be valid numbers');
    if (x < 0) throw new Error('Square root of negative number');
    return squareRoot(x);
  }

  const x = Number(a);
  const y = Number(b);
  if (Number.isNaN(x) || Number.isNaN(y)) {
    throw new Error('Operands must be valid numbers');
  }

  switch (op) {
    case 'add':
      return x + y;
    case 'sub':
      return x - y;
    case 'mul':
      return x * y;
    case 'div':
      if (y === 0) throw new Error('Division by zero');
      return x / y;
    case 'mod':
      if (y === 0) throw new Error('Division by zero');
      return x % y;
    case 'pow':
      return power(x, y);
    default:
      throw new Error('Unknown operation');
  }
}

function printUsage() {
  console.error('Usage: node src/calculator.js <add|sub|mul|div|mod|pow|sqrt> <num1> <num2?>');
  console.error('Examples:');
  console.error('  node src/calculator.js add 2 3');
  console.error('  node src/calculator.js sqrt 25');
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const op = args[0];

  // support: sqrt (1 operand) or other ops (2 operands)
  if (!op || (op === 'sqrt' ? args.length !== 2 : args.length !== 3)) {
    printUsage();
    process.exit(2);
  }

  const [, a, b] = args;
  try {
    const result = calculate(op, a, b);
    console.log(result);
    process.exit(0);
  } catch (err) {
    if (err.message === 'Division by zero') {
      console.error('Error: Division by zero');
      process.exit(3);
    }
    if (err.message === 'Square root of negative number') {
      console.error('Error: Square root of negative number');
      process.exit(5);
    }
    if (err.message === 'Unknown operation') {
      console.error('Error: Unknown operation. Supported: add, sub, mul, div, mod, pow, sqrt');
      printUsage();
      process.exit(4);
    }
    console.error('Error:', err.message);
    printUsage();
    process.exit(1);
  }
}

// export for programmatic use / tests
module.exports = { calculate, modulo, power, squareRoot };
