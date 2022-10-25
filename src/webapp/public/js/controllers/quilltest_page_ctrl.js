var quilltestPage = angular.module('quilltestCtrl',[]);

quilltestPage.controller('quilltestPageController', function($scope){

  $scope.preview = function(){
    console.log('preview');
  }
  $scope.save = function(){
      console.log('save');
  }

  // Quill editor controller
  $scope.quillData = "hahaha";
  $scope.quillConfig = "hahaConfig";

  $scope.changeData = function() {
    $scope.quillData = "config";
  };
  $scope.clickMe = function() {
    alert("thanks!");
  };
})
.directive('quillEditor', function($compile) {
  return {
    restrict: 'E',
    link: function($scope, $element) {
     var template= '<div id="editor">' +
              '<p>Hello World!</p>' +
              '<p>Some initial <strong>bold</strong> text</p>' +
              '<p><br></p>'
        '</div>';
      var linkFunc = $compile(template);
      var content = linkFunc($scope);
      $element.append(content);

      // setup quill config after adding to DOM
      var quill = new Quill('#editor', {
        modules: {
          // ImageResize: {},
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            // [{ 'header': 1 }, { 'header': 2 }],
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'link'],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],
            ['clean'],                                         // remove formatting button
            ['blockquote', 'code-block'],
            ['video', 'image'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
      });

      quill.on('text-change', function() {
        var delta = quill.getContents();
        var text = quill.getText();
        var justHtml = quill.root.innerHTML;

        console.log(JSON.stringify(delta));

        // THIS WOULD NOT WORK WITHOUT SCOPE.APPLY
        $scope.$apply(function() {
          console.log($scope);
          $scope.quillDataJSON = JSON.stringify(delta);
          $scope.quillDataText = text;
          $scope.quillDataHTML = justHtml;
        });
      });
    }
  };
});
