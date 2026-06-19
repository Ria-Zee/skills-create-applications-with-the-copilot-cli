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

function calculate(op, a, b) {
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
    default:
      throw new Error('Unknown operation');
  }
}

function printUsage() {
  console.error('Usage: node src/calculator.js <add|sub|mul|div> <num1> <num2>');
  console.error('Example: node src/calculator.js add 2 3');
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    printUsage();
    process.exit(2);
  }

  const [op, a, b] = args;
  try {
    const result = calculate(op, a, b);
    // Print as-is; keep integer format when appropriate
    console.log(result);
    process.exit(0);
  } catch (err) {
    if (err.message === 'Division by zero') {
      console.error('Error: Division by zero');
      process.exit(3);
    }
    if (err.message === 'Unknown operation') {
      console.error('Error: Unknown operation. Supported: add, sub, mul, div');
      printUsage();
      process.exit(4);
    }
    console.error('Error:', err.message);
    printUsage();
    process.exit(1);
  }
}

// export for programmatic use / tests
module.exports = { calculate };
