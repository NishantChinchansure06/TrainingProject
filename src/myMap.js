let myArr = [2, 4, 5, 6];
const anyfunction1 = (currentItem, index) => {
  return currentItem * 2;
};
const myMap = (arr, anyfunction) => {
  let returnArray = [];
  for (var i = 0; i < arr.length; i++) {
    returnArray.push(anyfunction(arr[i], i));
  }
  return returnArray;
};

console.log(myMap(myArr, anyfunction1));

myArr.map(item => {
  return item * 2;
});

// const users = [
//   {
//     name: 'Giri',
//   },
//   {
//     name: 'Nishant',
//   },
// ];

const anyFunction = (item, index) => {
  return item * 2;
};

const count = [1, 2, 3];

const genericMap = (users, functionAny) => {
  let newArray = [];
  users.forEach((element, index) => {
    newArray.push(functionAny(element, index));
  });
  return newArray;
};

console.log(genericMap(count, anyFunction));
