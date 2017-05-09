'use strict';

angular.module('app')
.controller('RecipeDetailController', function(dataService) {
	
	var vm = this;

	vm.addRecipe = function() {
		
		var newRecipe = {};
		
		newRecipe.name = vm.name;
		newRecipe.description = vm.description;
		newRecipe.category = vm.category;
		newRecipe.prepTime = vm.prepTime;
		newRecipe.cookTime = vm.cookTime;
		
		dataService.addRecipe(newRecipe);
	};

	vm.updateRecipe = function(recipeID) {
		
		dataService.getRecipeByID(function(response) {
			var recipe = response.data;
		}, recipeID);
		
		recipe.name = vm.name;
		recipe.description = vm.description;
		recipe.category = vm.category;
		recipe.prepTime = vm.prepTime;
		recipe.cookTime = vm.cookTime;

		dataService.updateRecipeByID(recipeID, recipe);
	};

	vm.addAnotherIngredient = function() {

	};

	vm.addAnotherStep = function() {

	};
});