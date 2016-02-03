var module = angular.module('Eggly',[]);

module.controller('MainCtrl',function($scope){

    $scope.hello='world2';

    $scope.categories =[
        {"id":0, "name": "Development"},
        {"id":1, "name": "Design"},
        {"id":2, "name": "Exercise"},
        {"id":3, "name": "Humor"}
    ];

    $scope.bookmarks =[
        {"id":0, "title":"AngularJS", "url":"http://angularjs.org", "category":"Development"},
        {"id":1, "title":"Egghead.io", "url":"http://angularjs.org", "category":"Development"},
        {"id":2, "title":"A list Apart", "url":"http://alistapart.com", "category":"Design"},
        {"id":3, "title":"One Page Love", "url":"http://onepagelove.com", "category":"Design"},
        {"id":4, "title":"MobilityWOD", "url":"http://www.mobilitywod.com", "category":"Exercise"},
        {"id":5, "title":"Robb Wolf", "url":"http://robbwolf.com", "category":"Exercise"},
        {"id":6, "title":"AngularJS", "url":"http://angularjs.org", "category":"Exercise"},
        {"id":7, "title":"AngularJS", "url":"http://angularjs.org", "category":"Humor"},
        {"id":8, "title":"AngularJS", "url":"http://angularjs.org", "category":"Humor"},
        {"id":9, "title":"AngularJS", "url":"http://angularjs.org", "category":"Humor"}
    ];

    //-----------------------------------------
    // Category set, is
    //-----------------------------------------
    $scope.currentCategory = null;

    // private?
    function setCurrentCategory(category) {
        console.log('set category : ' + category);
        $scope.currentCategory = category;

        // create, edit
        cancelCreating();
        cancelEditing();
    }

    function isCurrentCategory(category) {
        return $scope.currentCategory != null && category.name == $scope.currentCategory.name;
    }

    // public?
    $scope.setCurrentCategory = setCurrentCategory;
    $scope.isCurrentCategory = isCurrentCategory;
    //-----------------------------------------
    // CRUD
    //-----------------------------------------

    // created

    function resetCreateForm() {
        $scope.newBookmark = {
            title: '',
            url : '',
            category: $scope.currentCategory
        }
    }
    function createBookmark(bookmark) {
        // get the max
        bookmark.id = $scope.bookmarks.length;
        bookmark.category = $scope.currentCategory;

        $scope.bookmarks.push(bookmark);

        //console.log('id:'+bookmark.id);
        //console.log('title:'+bookmark.title);
        //console.log('url:'+bookmark.url);
        //console.log('category:'+bookmark.category);
        // reset
        resetCreateForm();
    }
    // public
    $scope.createBookmark = createBookmark;

    // edited

    $scope.editedBookmark = null;

    function setEditedBookmark(bookmark) {
        $scope.editedBookmark = angular.copy(bookmark);
    }

    function updateBookmark(bookmark) {

        var index = _.findIndex($scope.bookmarks, function(b) {
            return b.id == bookmark.id;
        });
        console.log('findIndex:'+ index);
        $scope.bookmarks[index] = bookmark;

        $scope.editedBookmark = null;
        $scope.isEditing = false;
    }
    function isSelectedBookmark(bookmarkId) {
        return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
    }

    $scope.setEditedBookmark = setEditedBookmark;
    $scope.updateBookmark = updateBookmark;
    $scope.isSelectedBookmark = isSelectedBookmark;

    function deleteBookmark(bookmark) {
        _.remove( $scope.bookmarks, function(b) {
            return b.id == bookmark.id;
        } );
    }
    $scope.deleteBookmark = deleteBookmark;
    //-----------------------------------------
    // Creating and Edition states
    //-----------------------------------------
    $scope.isCreating = false;
    $scope.isEditing = false;

    function startCreating() {
        $scope.isCreating =true;
        $scope.isEditing = false;
        //reset
        resetCreateForm();
    }

    function cancelCreating() {
        $scope.isCreating = false;
    }

    function startEditing() {
        $scope.isCreating = false;
        $scope.isEditing = true;
    }

    function cancelEditing() {
        $scope.isEditing = false;
    }

    function shouldShowCreating() {
        return $scope.currentCategory && !$scope.isEditing;
    }

    function shouldShowEditing() {
        return $scope.isEditing && !$scope.isCreating;
    }

    // to public
    $scope.startCreating = startCreating;
    $scope.cancelCreating = cancelCreating;
    $scope.startEditing = startEditing;
    $scope.cancelEditing = cancelEditing;
    $scope.shouldShowCreating = shouldShowCreating;
    $scope.shouldShowEditing = shouldShowEditing;

});