// let myArr = [2, 4, 5, 6];
// const anyfunction1 = (currentItem, index) => {
//   return currentItem * 2;
// };
// const myMap = (arr, anyfunction) => {
//   let returnArray = [];
//   for (var i = 0; i < arr.length; i++) {
//     returnArray.push(anyfunction(arr[i], i));
//   }
//   return returnArray;
// };

// console.log(myMap(myArr, anyfunction1));

// myArr.map(item => {
//   return item * 2;
// });

// // const users = [
// //   {
// //     name: 'Giri',
// //   },
// //   {
// //     name: 'Nishant',
// //   },
// // ];

// const anyFunction = (item, index) => {
//   return item * 2;
// };

// const count = [1, 2, 3];

// const genericMap = (users, functionAny) => {
//   let newArray = [];
//   users.forEach((element, index) => {
//     newArray.push(functionAny(element, index));
//   });
//   return newArray;
// };

// console.log(genericMap(count, anyFunction));

// const numbers = [100, -175, 50, 25, -80, 500];
// numbers.reduce(myFunc);

// function myFunc(total, num) {
//   console.log('check total and num', total, num);
//   return total - num;
// }

// const map1 = new Map([
//   ['country', 'Chile'],
//   ['name', 'Tom'],
// ]);

// // 👇️ {'country' => 'Chile', 'name' => 'Tom'}
// console.log(map1);

// console.log(a);
// let a = 10;

function printPattern() {
  let height = 3;

  let width = 12;

  let S = '';

  for (var i = 0; i < height; i++) {
    let printLine = i % 2 === 0;

    for (var j = 0; j < width; j++) {
      if (printLine) {
        if (j === 0 || j === width - 1) {
          S += '+';
        } else {
          if (j % 2 === 1) {
            S += '/';
          } else {
            S += '\\';
          }
        }
      } else {
        if (j === 0 || j === width - 1) {
          S += '|';
        } else {
          S += ' ';
        }
      }
    }

    console.log(S);

    S = '';
  }
}

printPattern();
