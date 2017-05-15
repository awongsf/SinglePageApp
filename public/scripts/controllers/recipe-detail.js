(function () {

	'use strict';

	angular.module('app')
	.controller('RecipeDetailController', function(dataService, $location) {
		
		var vm = this;

		vm.getCategoriesAndFoodItems = function() {

			dataService.getCategories(function(response) {

				vm.categoriesList = response.data;
				var categoryIndex = vm.categoriesList.findIndex(x => x.name === vm.category);
				vm.category = vm.categoriesList[categoryIndex];

				dataService.getFoodItems(function(response) {

					vm.foodItemsList = response.data;
				});
			});
		};

		vm.addRecipe = function() {
			
			var newRecipe = {};
			
			newRecipe.name = vm.name;
			newRecipe.description = vm.description;
			newRecipe.category = vm.category;
			newRecipe.prepTime = vm.prepTime;
			newRecipe.cookTime = vm.cookTime;
			
			dataService.addRecipe(newRecipe);
		};

		vm.updateRecipe = function() {
			
			var latestRecipe = {};
			latestRecipe.name = vm.name;
			latestRecipe.description = vm.description;
			latestRecipe.category = vm.category;
			latestRecipe.prepTime = vm.prepTime;
			latestRecipe.cookTime = vm.cookTime;
			latestRecipe.ingredients = vm.ingredients;
			latestRecipe.steps = vm.steps;

			if ($location.absUrl().includes('add')) {
				dataService.addRecipe(latestRecipe);
			} else {
				dataService.updateRecipeByID(vm.recipeID, latestRecipe);	
			}

			$location.url('/');
		};

		vm.addAnotherIngredient = function() {
			var newIngredient = {
				foodItem: "",
				condition: "",
				amount: ""
			};
	    	vm.ingredients.push(newIngredient);
		};

		vm.deleteIngredient = function(ingredient, $index) {
			vm.ingredients.splice($index, 1);
		};

		vm.addAnotherStep = function() {
			var newStep = { description: "" };
			vm.steps.push(newStep);
		};

		vm.deleteStep = function(step, $index) {
			vm.steps.splice($index, 1);
		};

		if ($location.absUrl().includes('add')) {
			vm.title = 'Add New Recipe';
			vm.ingredients = [];
			vm.steps = [];

			vm.getCategoriesAndFoodItems();
			vm.addAnotherIngredient();
			vm.addAnotherStep();

		} else {
			vm.recipeID = $location.url().replace('/edit/', '');

			dataService.getRecipeByID(function(response) {

				var recipe = response.data;

				vm.title = recipe.name;
				vm.name = recipe.name;
				vm.description = recipe.description;
				vm.category = recipe.category;
				vm.prepTime = recipe.prepTime;
				vm.cookTime = recipe.cookTime;
				vm.ingredients = recipe.ingredients;
				vm.steps = recipe.steps;

				vm.getCategoriesAndFoodItems();
			}, vm.recipeID);
		}
	});

})();