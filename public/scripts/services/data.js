'use strict';

anuglar.module('app')
.service('dataService', function($http) {

	var baseURL = 'http://localhost:5000';

	this.getRecipes = function() {
		$http.get(baseURL + '/api/recipes');
	};

	this.getCategories = function() {
		$http.get(baseURL + '/api/categories');
	};

	this.getFoodItems = function() {
		$http.get(baseURL + '/api/fooditems');
	};

	this.getRecipesByCategory = function(categoryName) {
		$http.get(baseURL + '/api/recipes?category=' + categoryName);
	};

	this.getRecipeByID = function(id) {
		$http.get(baseURL + '/api/recipes/' + id);
	};

	this.updateRecipeByID = function(id, update) {
		$http.put(baseURL + '/api/recipes/' + id, update);
	};

	this.addRecipe = function(recipe) {
		$http.post(baseURL + '/api/recipes', recipe);
	};

	this.deleteRecipeByID = function(id) {
		$http.delete(baseURL + '/api/recipes/' + id);
	};

});