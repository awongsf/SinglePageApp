(function () {

	'use strict';

	angular.module('app')
	.controller('RecipesController', function(dataService, $location, $window) {

		var vm = this;

		vm.updateRecipeList = function() {
			dataService.getRecipes(function(response) {   
		      vm.recipes = response.data;
		    });
		};

		vm.updateRecipeList();

	    dataService.getCategories(function(response) {
			vm.categories = response.data;
		});
		
		vm.filterRecipes = function(categoryName) {
			if (categoryName != null) {
				dataService.getRecipesByCategory(function(response) {
					vm.recipes = response.data;	
				}, categoryName);
			} else {
				vm.updateRecipeList();
			}
		};

		vm.deleteRecipe = function(id) {
			if ($window.confirm('Are you sure?')) {
		    	dataService.deleteRecipeByID(id);
				vm.updateRecipeList();  
		    }
		};

		vm.addRecipe = function(newRecipe) {
	    	dataService.addRecipe(newRecipe);
	    	vm.updateRecipeList();
		};
	});

})();