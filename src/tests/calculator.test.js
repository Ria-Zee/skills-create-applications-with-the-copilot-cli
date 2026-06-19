const { calculate } = require('../calculator');

describe('Calculator - basic operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(calculate('add', 2, 3)).toBe(5);
    expect(calculate('add', '2', '3')).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(calculate('sub', 10, 4)).toBe(6);
    expect(calculate('sub', '10', '4')).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(calculate('mul', 45, 2)).toBe(90);
    expect(calculate('mul', '45', '2')).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(calculate('div', 20, 5)).toBe(4);
    expect(calculate('div', '20', '5')).toBe(4);
  });
});

describe('Calculator - edge cases and validation', () => {
  test('division by zero throws', () => {
    expect(() => calculate('div', 10, 0)).toThrow('Division by zero');
  });

  test('invalid operands throw', () => {
    expect(() => calculate('add', 'foo', 2)).toThrow('Operands must be valid numbers');
    expect(() => calculate('mul', 2, 'bar')).toThrow('Operands must be valid numbers');
  });

  test('unknown operation throws', () => {
    expect(() => calculate('pow', 2, 3)).toThrow('Unknown operation');
  });
});
