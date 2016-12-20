/**
 * Created by GodaiYuusaku on 12/20/16.
 */
function EditableFieldController($scope, $element, $attrs) {
    // var ctrl = this;
    this.editingList = false;

    this.handleModeChange = function() {
        // if (this.editingList) {
        //     this.onUpdate({value: this.fieldValue});
        //     this.fieldValueCopy = this.fieldValue;
        // }
        this.editingList = false;
    };

    this.reset = function() {
        this.fieldValue = this.fieldValueCopy;
    };

    this.$onInit = function() {
        // Make a copy of the initial value to be able to reset it later
        this.oldName = this.fieldValue;

        // Set a default fieldType
        // if (!this.fieldType) {
        //     this.fieldType = 'text';
        // }
    };
}

angular.module('heroApp').component('editableField', {
    templateUrl: 'html/editableField.html',
    controller: EditableFieldController,
    controllerAs: "vm",
    bindings: {
        fieldValue: '<',
        fieldType: '@?',
        onUpdate: '&'
    }
});