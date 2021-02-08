const apiurl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
document.getElementById('search-btn').addEventListener('click', () => {
  let foodName = document.getElementById('food-input').value.trim();
  if (foodName) {
    fetch(apiurl + foodName).then(response => response.json()).then(data => {
      showMeals(data.meals);
    })
  } else {
    showNotFound(foodName);
  }
})



document.getElementById('food-item-area').addEventListener('click', event => {
  const h3 = event.target.parentNode.children['1'];
  if (h3.tagName == 'H3') {
    fetch(apiurl + h3.innerText).then(response => response.json()).then(data => {
      showincredient(data.meals[0]);
    });
  }
})





function showMeals(foodlist) {
  const foodCase = document.getElementById('food-item-area');
  foodCase.innerHTML = '';
  document.getElementById('ingredient-area').style.display = 'none';
  foodlist.forEach(meal => {
    const foodBox = createfoodBox(meal.strMeal, meal.strMealThumb);
    foodCase.appendChild(foodBox);
    foodCase.style.display = 'grid';
  });
}



function createfoodBox(foodName, foodPicture) {
  const foodDiv = document.createElement('div');
  const foodPic = document.createElement('img');
  const foodH3 = document.createElement('h3');
  foodDiv.className = 'item';
  foodPic.src = foodPicture;
  foodPic.alt = foodName;
  foodH3.innerText = foodName;
  foodDiv.appendChild(foodPic);
  foodDiv.appendChild(foodH3);
  return foodDiv
}




function showincredient(meal) {
  document.getElementById('ingredient-area').style.display = 'block';
  document.getElementById('target-meal-img').src = meal.strMealThumb;
  document.getElementById('food-name').innerText = meal.strMeal;
  const ingredientsContainer = document.getElementById('incredient');
  ingredientsContainer.innerHTML = '';
  const ingredientsList = getIngredients(meal);
  ingredientsList.forEach(item => {
    ingredientsContainer.appendChild(item);
  })
}




function getIngredients(meal) {
  const ingredientsNameList = [];
  for (let i = 1; i <= 30; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (!ingredient) {
      break;
    } else {
      const measureOfIngredient = meal[`strMeasure${i}`];
      const listItem = createListItem(ingredient, measureOfIngredient);
      ingredientsNameList.push(listItem);
    }
  }
  return ingredientsNameList;
}





function createListItem(ingredient, measurement) {
  let p = document.createElement('p');
  let icon = document.createElement('i');
  let span = document.createElement('span');
  icon.className = 'fas fa-utensils';
  span.innerText = measurement.trim() + ' ' + ingredient;
  p.appendChild(icon);
  p.appendChild(span);
  return p;
}