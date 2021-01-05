'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data - one object for each account, format the same as would be coming from a web api (in object form)
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// array containing all objects
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = (movements, sort = false) => {
  // clear the existing html of the element
  containerMovements.innerHTML = '';
  // forEach looping statement
  movements.forEach((mov, i) => {
    // ternary operator
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // creating the edited html to be added
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    // insertAdjacentHTML method - takes two parameters , positioning and the html to be added
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}`;
  acc.balance = balance;
};

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => {
      return mov > 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `${incomes}$`;

  const expenditures = acc.movements
    .filter(mov => {
      return mov < 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  labelSumOut.textContent = `${Math.abs(expenditures)}$`;

  const interest = acc.movements
    .filter(mov => {
      return mov > 0;
    })
    .map(deposit => {
      return (deposit * acc.interestRate) / 100;
    })
    .filter(int => {
      return int >= 1;
    })
    .reduce((acc, int) => {
      return acc + int;
    }, 0);
  labelSumInterest.textContent = `${interest}$`;
};

const createUserName = accs => {
  // loop through each account in the accounts array, and create a username propery for each account object and the value for each username will be the account name in lowercase, split by spaces, mapped over and the first index returned then joined.
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(el => {
        return el[0];
      })
      .join(''); //join
  });
};
createUserName(accounts);

const updateUI = acc => {
  // Display movements
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

// EVENT HANDLERS
let currentAccount; //defined outside as will be needed later also for when sending money

// LOG IN
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  inputClosePin.value = inputCloseUsername.value = '';

  // find account from accounts array from username property
  // NOTE: IF WANT TO KEEP CURLY BRACKETS - NEED TO RETURN THE OUTPUT
  // IF WANT TO REMOVE THE CURLY BRACKTS OR NOT USE RETURN THEN NEED TO REMOVE BOTH
  currentAccount = accounts.find(
    //will return undefined if no element found
    acc => acc.username === inputLoginUsername.value //reading input value
  );

  //optinal chaining -pin propery read if currentAccount exists
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0] //split from spaces and take first index of array
    }`;

    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = ''; // clear input fields

    inputLoginPin.blur(); //removes focus after logging in

    updateUI(currentAccount);
  }
});

// TRANSFER AMOUNT
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const revceiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // clears the input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    // check if amount is positive number
    amount > 0 &&
    revceiverAccount &&
    // check if current user has enough money
    amount <= currentAccount.balance &&
    // cannot send to self and check if account exists
    revceiverAccount?.username !== currentAccount.username
  ) {
    // Doing Transfer
    currentAccount.movements.push(-amount);
    revceiverAccount.movements.push(amount);

    updateUI(currentAccount);
  } else {
    console.log('Invalid Transfer');
  }
});

// APPLY FOR A LOAN
// grants loan if there is one deposit in the account with 10% of requested loan amount
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  // console.log('Loan');
  if (
    +inputLoanAmount.value > 0 &&
    currentAccount.movements.some(mov => {
      return mov >= +inputLoanAmount.value * 0.1;
    })
  )
    currentAccount.movements.push(+inputLoanAmount.value);
  else {
    console.log('Loan denied');
  }
  updateUI(currentAccount);

  inputLoanAmount.value = '';
});

// DELETE USER
btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(acc => {
      return acc.username === currentAccount.username;
    });

    // delete user  data
    accounts.splice(index, 1); //splice mutates underlying array

    // log out/hide UI
    containerApp.style.opacity = 0;
  } else {
    console.log('Invalid Details');
  }
  inputClosePin.value = inputCloseUsername.value = '';

  // delete user data
  // log out - hide UI
});

//
//
//
//
//
//
//
//
//
//
//
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movementss = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroTOusd = 1.1;

// fill(), Array.from()
const x = Array.from({ length: 100 }, () => {
  return Math.floor(Math.random() * 100);
});

console.log(x);

// Sort() - mutates the original array. does sorting based on strings
const names = ['tarel', 'sarah', 'anja'];
console.log(names.sort());

const movements3 = movementss;
movements3.sort((a, b) => {
  // return b - a;
  return a - b;
});
console.log(movements3);

// deeper nested arrays
const arr7 = [[1, 2], [3, [4, 5], 6], 7, 8];
console.log(arr7.flat());
console.log(arr7.flat(2));

// real example for pooling and grouping and then summing nested arrays
// const allMovementsArr = accounts.map(acc => {
//   return acc.movements;
// });
// console.log(allMovementsArr);

// const allMovements = allMovementsArr.flat();
// console.log(allMovements);

// const sumAllMovements = allMovements.reduce((acc, n) => {
//   return acc + n;
// }, 0);
// console.log(sumAllMovements);

// make it a chain
const sumAllMovements = accounts
  .map(acc => {
    return acc.movements;
  })
  .flat()
  .reduce((acc, n) => {
    return acc + n;
  }, 0);
console.log(sumAllMovements);

// flatMap() combines the two functions/methods into one
const sumAllMovements2 = accounts
  .flatMap(acc => {
    return acc.movements;
  })
  .reduce((acc, n) => {
    return acc + n;
  }, 0);
console.log(sumAllMovements2);

// flat() - 2019 ES - creates one new array - no callback function here
// only goes one level deep
const arr5 = [1, 2, 2, [4, 5], [6, 7]];
console.log(arr5.flat());

// EVERY() method - only if all elements pass the test
const test2 = movementss.every(mov => {
  return mov > 0;
});

console.log(test2);

// includes method - tests for equality returns true false
console.log(movementss);
console.log(movementss.includes(-130));
// some() - testing for a condition
const test = movementss.some(mov => {
  return mov > 1000;
});
console.log(test);

// finding an element
// const twoHundred = movementss.filter(mov => {
//   return mov === 200;
// });
// console.log(twoHundred);
// console.log(twoHundred.length);

// FIND METHOD
const firstWithdrawal = movementss.find(mov => {
  return mov < 0;
});

console.log(movementss);
console.log(firstWithdrawal);

// finding a user within the data objects using find()
console.log(accounts);
const account = accounts.find(acc => {
  return acc.owner === 'Jessica Davis';
});
console.log(account);

const pin = accounts.find(acc => {
  return acc.pin === 11223;
});
console.log(pin);

// same can be done with forOf loop
for (const accountName of accounts) {
  accountName.owner === 'Jessica Davis'
    ? console.log(accountName)
    : 'Name Does not exist';
}

// same can be done with ethe forEach loop
const accountFind = accs => {
  accs.forEach(acc => {
    acc.owner === 'Jessica Davis' ? console.log(acc) : 'Sorry';
  });
};

accountFind(accounts);

// map over the accounts array. return each elements.owner value in a new array
const owners = accounts.map(mov => {
  return mov.owner;
});
console.log(owners);

// Chaining Methods - can only chain on returned arrays
const totalDepositsInUSD = Math.round(
  movementss
    .filter(mov => {
      return mov > 0;
    })
    .map(mov => {
      return mov * euroTOusd;
    })
    .reduce((acc, mov) => {
      //only returns a value
      return acc + mov;
    }, 0)
);

console.log(totalDepositsInUSD);

// REDUCE METHOD - alwyas think of accumulator and the current value

console.log(movementss);
const balance = movementss.reduce((acc, cur, i, arr) => {
  return acc + cur;
}, 0);

console.log(balance);

// CALC MAX VALUE
const max = movementss.reduce((acc, mov) => {
  return acc > mov ? acc : mov;
});
console.log(max);

// CAL MIN VALUE
const min = movementss.reduce((acc, mov) => {
  return acc < mov ? acc : mov;
});
console.log(min);

// FILTER
const deposits = movementss.filter(mov => {
  return mov > 0;
});

console.log(deposits);

const withdrawals = movementss.filter(mov => {
  return mov < 0;
});
console.log(withdrawals);

/////////////////////////////////////////////////
// Working with Map() method - use function to create a new array - FUNCTIONAL PROGRAMMING
// use arrow function for small callback function no need to write return but importnat to know this callback function returns something
const converted = movementss.map(mov => mov * euroTOusd);
console.log(converted);

// USING FOR LOOP - loop over array and create a new one /OLD way
const usd = [];
for (const mov of movementss) {
  usd.push(mov * euroTOusd);
}
console.log(usd);

const movementssDescription = movementss.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )} `
);

// created an array of strings returned by the callback function above
console.log(movementssDescription);

/////////////////////////////////////////////////

// Arrays are object. Arrays have methods. Useful built in methods/tools.

// SLICE - DOES NOT MUTATE ORIGINAL ARRAY
let arr = ['a', 'b', 'c', 'd'];
console.log('SLICING');
console.log(arr.slice(1));
console.log(arr.slice(0, 2)); //does not include second parameter
console.log(arr.slice(-1));
console.log(arr.slice(-2));
console.log(arr.slice(-3));
console.log(arr.slice(1, -1)); // does not include second parameter
console.log(arr.slice()); //making a shadow copy
console.log([...arr]); // same as using spread operator on orray

// SPLICE - MUTATES ORIGINAL ARRAY
let arr2 = ['a', 'b', 'c', 'd'];
console.log('SPLICING');
console.log(arr2); //mutated original array
// console.log(arr2.splice(1)); //logs the removed elements
console.log(arr2); //mutated original array
// arr2.splice(-1); //removes last element from the array
console.log(arr2); //mutated original array
console.log(arr2.splice(0, 1));
console.log(arr2);

// REVERSE - MUTATES ORIGINAL ARRAY
let arr3 = ['a', 'b', 'c', 'd'];
arr3.reverse();
console.log(arr3);

// CONCAT ARRAYS - DOES NOT MUTATE ORIGINAL ARRAY
const joined = arr.concat(arr3);
console.log(joined);

// does same thing
console.log([...arr, ...arr3]);
console.log(...arr, ...arr3);

// JOIN
console.log(joined.join(', '));

// FOR EACH
console.log('============= FOR OF LOOP =============');
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  //entries returns an array of arrays, the firs elemtn being the index and then the value itself
  if (movement > 0) {
    console.log(`Transaction ${i + 1}: you deposited ${movement}`);
  } else {
    console.log(`Transaction ${i + 1}: you withdrew ${movement}`);
  }
}
console.log('============= FOR EACH METHOD =============');
movements.forEach((mov, i, arr) => {
  //first always must be current element, second the index and last the array we are looping over
  if (mov > 0) {
    console.log(`Transaction ${i + 1}: you deposited ${mov}`);
  } else {
    console.log(`Transaction ${i + 1}: you withdrew ${mov}`);
  }
});

// cannot break out of a foreach loop. No using continue or break. If need to use that then use for of loop
